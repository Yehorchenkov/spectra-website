<script>
	import emblaCarouselSvelte from 'embla-carousel-svelte';
	import { Button } from 'bits-ui';
	import CaretCircleLeft from 'phosphor-svelte/lib/CaretCircleLeft';
	import CaretCircleRight from 'phosphor-svelte/lib/CaretCircleRight';
	import CircleNotch from 'phosphor-svelte/lib/CircleNotch';
	import ButtonLink from '$lib/ui/components/ButtonLink.svelte';
	import ButtonRefAnim from '$lib/ui/components/ButtonRefAnim.svelte';
	import { NEWS_LIMIT } from '$lib/config/constants.js';
	import { NEWS_PLACEHOLDER } from '$lib/config/constants.js';

	let { newsData } = $props();

	// --- 1. Consolidated News State ---
	let newsItems = $derived(newsData?.docs || []);
	let hasNextPage = $derived(newsData?.hasNextPage || false);
	let isLoading = $state(false);

	// --- 2. Carousel UI State ---
	let emblaApi = $state(null);
	let scrollStates = $state({ canPrev: false, canNext: false });

	// Simplified derived logic
	const prevDisabled = $derived(!scrollStates.canPrev);
	const nextDisabled = $derived(!scrollStates.canNext && !hasNextPage);

	// --- 3. Core Logic ---
	async function loadMore() {
		if (isLoading || !hasNextPage) return;
		isLoading = true;

		const nextPage = Math.ceil(newsItems.length / NEWS_LIMIT) + 1;
		const res = await fetch(`/api/news?page=${nextPage}&limit=${NEWS_LIMIT}`);
		const data = await res.json();

		if (data.docs) {
			newsItems.push(...data.docs);
			hasNextPage = data.hasNextPage;
			setTimeout(() => {
				emblaApi?.reInit();
				emblaApi?.scrollNext();
			}, 20);
		}
		isLoading = false;
	}

	const onMove = () => {
		if (!emblaApi) return;
		scrollStates = { canPrev: emblaApi.canScrollPrev(), canNext: emblaApi.canScrollNext() };
		
		// Auto-load if near the end
		if (emblaApi.scrollProgress() > 0.9 && hasNextPage) loadMore();
	};

	const onInit = (e) => {
		emblaApi = e.detail;
		['select', 'scroll', 'reInit'].forEach(evt => emblaApi.on(evt, onMove));
		onMove();
	};

	// Reset state if newsData prop changes (navigation/refresh)
	$effect(() => {
		newsItems = newsData?.docs || [];
		hasNextPage = newsData?.hasNextPage || false;
	});
</script>

{#if newsItems.length > 0}
	<div class="container mx-auto p-4">
		<div class="overflow-hidden" use:emblaCarouselSvelte={{ align: 'start', dragFree: true }} onemblaInit={onInit}>
			<div class="flex">
				{#each newsItems as item (item.id)}
					<div class="min-w-0 shrink-0 grow-0 basis-full px-2 md:basis-1/2 lg:basis-1/3">
						<div class="group border-border bg-card flex h-full flex-col overflow-hidden rounded-lg border shadow-sm">
							<div class="overflow-hidden">
								<img 
									class="aspect-3/2 w-full object-cover transition-all duration-500 group-hover:scale-105" 
									src={item.image?.url || NEWS_PLACEHOLDER} 
									alt={item.title} 
								/>
							</div>
							<div class="flex grow flex-col p-5">
								<h5 class="text-foreground mb-2 font-bold line-clamp-2 text-lg">{item.title}</h5>
								<p class="text-muted-foreground mb-4 line-clamp-3 text-sm">{item.excerpt}</p>
								<ButtonLink class="mt-auto" href="/news/{item.slug}">Read More</ButtonLink>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<div class="mt-8 flex items-center justify-between">
			<div class="flex items-center gap-4">
				<Button.Root class="text-primary disabled:opacity-30" onclick={() => emblaApi?.scrollPrev()} disabled={prevDisabled}>
					<CaretCircleLeft class="size-10" />
				</Button.Root>
				
				<Button.Root class="text-primary disabled:opacity-30" onclick={() => emblaApi?.canScrollNext() ? emblaApi.scrollNext() : loadMore()} disabled={nextDisabled}>
					{#if isLoading}
						<CircleNotch class="size-10 animate-spin text-primary" />
					{:else}
						<CaretCircleRight class="size-10" />
					{/if}
				</Button.Root>
			</div>
			<ButtonRefAnim class="w-40" href="/news" text="View all news" />
		</div>
	</div>
{/if}