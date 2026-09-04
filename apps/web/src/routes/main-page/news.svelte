<script>
	import qs from 'qs';

	import Carousel from '$lib/ui/components/Carousel.svelte';
	import ButtonRefAnim from '$lib/ui/components/ButtonRefAnim.svelte';

	import { NEWS_CAROUSEL_LIMIT, NEWS_PLACEHOLDER } from '$lib/config/constants.js';
	import { formatDateLong } from '$lib/utils/dateHelpers';

	import CalendarDots from 'phosphor-svelte/lib/CalendarDots';

	let { newsData } = $props();

	let newsItems = $state([]);
	let hasNextPage = $state(false);

	$effect(() => {
  		newsItems = [...(newsData?.docs ?? [])];
  		hasNextPage = newsData?.hasNextPage ?? false;
	});

	async function loadMore() {
		if (!hasNextPage) return;

		const nextPage = Math.ceil(newsItems.length / NEWS_CAROUSEL_LIMIT) + 1;

		const queryString = new URLSearchParams({ page: String(nextPage) });

		try {
			const res = await fetch(`/api/news?${queryString}`);

			if (!res.ok) {
				throw new Error('Failed to load news');
			}

			const data = await res.json();

			if (data.docs?.length) {
				newsItems = [...newsItems, ...data.docs];
				hasNextPage = data.hasNextPage ?? false;
			} else {
				hasNextPage = false;
			}
		} catch (error) {
			console.error('Error loading more news:', error);
		}
	}
</script>

{#if newsItems.length > 0}
	<Carousel
		items={newsItems}
		getKey={(item) => item.id ?? item.slug}
		hasMore={hasNextPage}
		onLoadMore={loadMore}
		slideClass="min-w-0 shrink-0 grow-0 basis-full pl-6 md:basis-1/2 lg:basis-1/3"
	>
		{#snippet item(item)}
			<div class="group border-border bg-card flex h-full flex-col overflow-hidden rounded-lg border shadow-sm">
				<div class="overflow-hidden">
					<img
						class="aspect-3/2 w-full object-cover transition-all duration-500 group-hover:scale-105"
						src={item.image?.sizes?.card?.url || item.image?.url || NEWS_PLACEHOLDER}
						alt={item.image?.alt || 'News image'}
						loading="lazy"
					/>
				</div>

				<div class="flex grow flex-col p-5">
					<h5 class="text-foreground mb-2 line-clamp-3 text-lg font-bold">
						<a
							href="/news/{item.slug}"
							class="hover:text-primary focus-visible:ring-ring rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-2"
						>
							{item.title}
						</a>
					</h5>

					{#if item.publishDate}
						<div class="mb-2 flex items-center gap-2">
							<CalendarDots class="text-muted-foreground size-5 shrink-0" />

							<time
								datetime={item.publishDate}
								class="text-muted-foreground text-left text-sm"
							>
								{formatDateLong(item.publishDate)}
							</time>
						</div>
					{/if}

					<p class="text-foreground mb-4 line-clamp-3 text-sm">
						{item.excerpt}
					</p>
				</div>
			</div>
		{/snippet}

		{#snippet afterControls()}
			<ButtonRefAnim class="w-40" href="/news" text="View all news" />
		{/snippet}
	</Carousel>
{/if}