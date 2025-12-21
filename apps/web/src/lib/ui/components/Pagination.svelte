<script lang="ts">
	import { Pagination } from "bits-ui";
	import CaretLeft from "phosphor-svelte/lib/CaretLeft";
	import CaretRight from "phosphor-svelte/lib/CaretRight";
	import DotsThree from "phosphor-svelte/lib/DotsThree";
	import { goto } from '$app/navigation';
	import { page } from '$app/state';

	let { 
		count, 
		perPage = 10, 
		itemLabel = 'item',        // e.g. "project"
		itemLabelPlural = undefined, // e.g. "news" (if different from simple +s)
		summary                      // Optional snippet for custom summary
	} = $props();

	// For custom wording:
	// <Pagination 
	// 	count={totalEvents} 
	// 	perPage={limit}
	// >
	// 	{#snippet summary({ range, count })}
	// 		<p class="text-xs uppercase tracking-widest text-blue-500">
	// 			Viewing {range.start}-{range.end} of {count} Upcoming Events
	// 		</p>
	// 	{/snippet}
	// </Pagination>

  

	const currentPage = $derived(Number(page.url.searchParams.get('page')) || 1);

	// Basic pluralization logic
	const displayLabel = $derived(() => {
		if (count === 1) return itemLabel;
		return itemLabelPlural || `${itemLabel}s`;
	});

	function handlePageChange(newPage: number) {
		const newUrl = new URL(page.url);
		newUrl.searchParams.set('page', newPage.toString());
		goto(newUrl.toString(), { keepFocus: true, noScroll: false });
	}
</script>

<Pagination.Root
	{count}
	{perPage}
	page={currentPage}
	onPageChange={handlePageChange}
>
	{#snippet children({ pages, range })}
		<div class="mt-10 mb-20 flex flex-col items-center gap-4">
			<div class="flex items-center">
				<Pagination.PrevButton
					class="mr-4 inline-flex size-10 items-center justify-center rounded-md border border-transparent transition-all hover:bg-secondary disabled:opacity-50"
				>
					<CaretLeft class="size-5" weight="bold" />
				</Pagination.PrevButton>

				<div class="flex items-center gap-2">
					{#each pages as p (p.key)}
						{#if p.type === "ellipsis"}
							<div class="flex size-10 items-center justify-center text-muted-foreground">
								<DotsThree weight="bold" />
							</div>
						{:else}
							<Pagination.Page
								page={p}
								class="inline-flex size-10 items-center justify-center rounded-md border text-sm font-medium transition-all
                                       bg-background border-input hover:bg-secondary 
                                       data-[selected]:bg-primary data-[selected]:text-primary-foreground data-[selected]:border-primary"
							>
								{p.value}
							</Pagination.Page>
						{/if}
					{/each}
				</div>

				<Pagination.NextButton
					class="ml-4 inline-flex size-10 items-center justify-center rounded-md border border-transparent transition-all hover:bg-secondary disabled:opacity-50"
				>
					<CaretRight class="size-5" weight="bold" />
				</Pagination.NextButton>
			</div>

			<!-- Summary Text Logic -->
			{#if summary}
				{@render summary({ range, count })}
			{:else}
				<p class="text-sm text-muted-foreground">
					Showing <span class="font-medium text-foreground">{range.start}</span> 
					to <span class="font-medium text-foreground">{range.end}</span> 
					of <span class="font-medium text-foreground">{count}</span> {displayLabel()}
				</p>
			{/if}
		</div>
	{/snippet}
</Pagination.Root>