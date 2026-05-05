<script>
	import emblaCarouselSvelte from 'embla-carousel-svelte';
	import { Button } from 'bits-ui';
	import { tick, onDestroy } from 'svelte';

	import CaretCircleLeft from 'phosphor-svelte/lib/CaretCircleLeft';
	import CaretCircleRight from 'phosphor-svelte/lib/CaretCircleRight';
	import CircleNotch from 'phosphor-svelte/lib/CircleNotch';

	let {
		items = [],
		getKey = (item, index) => item?.id ?? item?.slug ?? index,

		hasMore = false,
		onLoadMore,
		loadMoreThreshold = 0.9,
		autoLoad = true,

		options = {
			align: 'start',
			slidesToScroll: 1,
			dragFree: true,
			containScroll: 'trimSnaps'
		},

		wrapperClass = 'w-full py-4',
		viewportClass = 'overflow-hidden',
		containerClass = 'flex -ml-6',
		slideClass = 'min-w-0 shrink-0 grow-0 basis-full pl-6',
		footerClass = 'mt-8 flex items-center justify-between',
		controlsClass = 'flex items-center gap-4',
		buttonClass = 'text-primary disabled:opacity-30 enabled:hover:text-primary/80',

		item: renderItem,
		afterControls
	} = $props();

	let emblaApi = $state(null);
	let isLoadingMore = $state(false);
	let scrollStates = $state({
		canPrev: false,
		canNext: false
	});

	const events = ['select', 'scroll', 'reInit'];

	const prevDisabled = $derived(!scrollStates.canPrev);
	const nextDisabled = $derived(isLoadingMore || (!scrollStates.canNext && !hasMore));

	function updateScrollStates() {
		if (!emblaApi) return;

		scrollStates = {
			canPrev: emblaApi.canScrollPrev(),
			canNext: emblaApi.canScrollNext()
		};
	}

	async function loadMoreAndScroll() {
		if (isLoadingMore || !hasMore || !onLoadMore) return;

		isLoadingMore = true;

		try {
			await onLoadMore();

			await tick();

			emblaApi?.reInit();
			updateScrollStates();
			emblaApi?.scrollNext();
		} catch (error) {
			console.error('Carousel load more failed:', error);
		} finally {
			isLoadingMore = false;

			await tick();

			updateScrollStates();
		}
	}

	function onMove() {
		if (!emblaApi) return;

		updateScrollStates();

		if (autoLoad && emblaApi.scrollProgress() > loadMoreThreshold && hasMore) {
			loadMoreAndScroll();
		}
	}

	function scrollNextOrLoad() {
		if (emblaApi?.canScrollNext()) {
			emblaApi.scrollNext();
		} else {
			loadMoreAndScroll();
		}
	}

	function onInit(event) {
		if (emblaApi) {
			events.forEach((eventName) => emblaApi.off(eventName, onMove));
		}

		emblaApi = event.detail;

		events.forEach((eventName) => emblaApi.on(eventName, onMove));

		onMove();
	}

	$effect(() => {
		const itemsCount = items.length;

		if (!emblaApi) return;

		tick().then(() => {
			emblaApi?.reInit();
			updateScrollStates();
		});
	});

	onDestroy(() => {
		if (!emblaApi) return;

		events.forEach((eventName) => emblaApi.off(eventName, onMove));
	});
</script>

{#if items.length > 0}
	<div class={wrapperClass}>
		<div
			class={viewportClass}
			use:emblaCarouselSvelte={options}
			onemblaInit={onInit}
		>
			<div class={containerClass}>
				{#each items as currentItem, index (getKey(currentItem, index))}
					<div class={slideClass}>
						{@render renderItem?.(currentItem, index)}
					</div>
				{/each}
			</div>
		</div>

		<div class={footerClass}>
			<div class={controlsClass}>
				<Button.Root
					class={buttonClass}
					onclick={() => emblaApi?.scrollPrev()}
					disabled={prevDisabled}
					aria-label="Previous slide"
				>
					<CaretCircleLeft class="size-10" />
				</Button.Root>

				<Button.Root
					class={buttonClass}
					onclick={scrollNextOrLoad}
					disabled={nextDisabled}
					aria-label="Next slide"
				>
					{#if isLoadingMore}
						<CircleNotch class="size-10 animate-spin text-primary" />
					{:else}
						<CaretCircleRight class="size-10" />
					{/if}
				</Button.Root>
			</div>

			{@render afterControls?.()}
		</div>
	</div>
{/if}