<script>
	import emblaCarouselSvelte from 'embla-carousel-svelte';
	import Tag from 'phosphor-svelte/lib/Tag';
	import User from 'phosphor-svelte/lib/User';
	import CalendarBlank from 'phosphor-svelte/lib/CalendarBlank';
	import placeholderNews from '$lib/images/night-city-2-placeholder.png';
	import ButtonLink from '$lib/ui/components/ButtonLink.svelte';
	import ButtonRefAnim from '$lib/ui/components/ButtonRefAnim.svelte';
	import { Button } from 'bits-ui';
	import CaretCircleLeft from 'phosphor-svelte/lib/CaretCircleLeft';
	import CaretCircleRight from 'phosphor-svelte/lib/CaretCircleRight';

	let { data } = $props();

	// console.log('news data', data);

	// Embla Carousel options
	let options = { align: 'center', dragFree: true };

	let emblaApi;
	let prevButtonDisabled = $state();
	let nextButtonDisabled = $state();

	function scrollPrev() {
		if (emblaApi) {
			emblaApi.scrollPrev();
			updateButtonStates();
		}
	}

	function scrollNext() {
		if (emblaApi) {
			emblaApi.scrollNext();
			updateButtonStates();
		}
	}

	function onInit(event) {
		emblaApi = event.detail;

		if (emblaApi) {
			updateButtonStates();
		}
	}

	function updateButtonStates() {
		console.log('updateButtonStates, prev, next', emblaApi.canScrollPrev(), emblaApi.canScrollNext());
		prevButtonDisabled = !emblaApi.canScrollPrev();
		nextButtonDisabled = !emblaApi.canScrollNext();
	}

</script>

<div class="embla container mx-auto p-4">
	<div
		class="embla__viewport overflow-hidden"
		use:emblaCarouselSvelte={{ options }}
		onemblaInit={onInit}
	>
		<div class="embla__container flex backface-hidden">
			{#each data.docs as item}
				<div class="embla__slide min-w-0 shrink-0 grow-0 basis-full px-2 md:basis-1/2 lg:basis-1/3">
					<div
						class="group border-border bg-card mx-auto flex h-full max-w-sm flex-col overflow-hidden rounded-lg border shadow-sm"
					>
						<div class="overflow-hidden">
							<img 
								class="aspect-[3/2] w-full object-cover transition-transform duration-300 group-hover:scale-105" 
								src={item.image ? item.image.url : placeholderNews} 
								alt={item.image ? item.image.alt : "news placeholder image"} 
							/>
						</div>

						<div class="flex flex-grow flex-col p-5">
							<h5 class="text-foreground mb-2 font-bold tracking-tight line-clamp-3">
								{item.title}
							</h5>

							<p class="text-foreground mb-3 flex-grow font-normal">
								{item.excerpt}
							</p>
							<ButtonLink class="mb-2 mt-auto text-left" href="/news/{item.slug}">
								{"Read More"}
							</ButtonLink>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
	<div class="mt-4 flex items-center justify-center lg:justify-start">
		<Button.Root
			class="embla__prev text-primary hover:text-foreground disabled:text-muted-foreground px-2 py-2 disabled:cursor-not-allowed"
			onclick={scrollPrev}
			disabled={prevButtonDisabled}
		>
			<CaretCircleLeft class="h-10 w-10" />
		</Button.Root>
		<Button.Root
			class="embla__next text-primary hover:text-foreground disabled:text-muted-foreground px-2 py-2 disabled:cursor-not-allowed"
			onclick={scrollNext}
			disabled={nextButtonDisabled}
		>
			<CaretCircleRight class="h-10 w-10" />
		</Button.Root>
		<ButtonRefAnim class="ml-4 w-36" href="/news" text="View all news" />
	</div>
</div>