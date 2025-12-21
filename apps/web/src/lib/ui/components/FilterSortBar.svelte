<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { Button } from 'bits-ui';
	import Badge from '$lib/ui/components/Badge.svelte';
	import { twMerge } from 'tailwind-merge';
	import Broom from 'phosphor-svelte/lib/Broom'; // Fixed import path to match your others

	let {
		count,
		countLabel = 'item',
		className = '',
		filters,
		sort,
		showReset = true,
		resetLabel = undefined,
		resetParams = [] 
	} = $props();

	const label = (n) => (n === 1 ? countLabel : `${countLabel}s`);

	// The button is active if any resetParams exist OR if we are not on page 1
	const canReset = $derived(
		showReset && (
			resetParams.some((k) => page.url.searchParams.has(k)) || 
			(page.url.searchParams.has('page') && page.url.searchParams.get('page') !== '1')
		)
	);

	function onReset() {
		const url = new URL(page.url);

		// 1. Always remove the page parameter on reset
		url.searchParams.delete('page');

		// 2. Remove all specific filter/sort params
		for (const key of resetParams) {
			url.searchParams.delete(key);
		}

		// 3. Navigate back to the clean URL
		const next = url.searchParams.toString()
			? `${url.pathname}?${url.searchParams.toString()}`
			: url.pathname;

		goto(next, { replaceState: true, noScroll: true, keepFocus: true });
	}
</script>

<div class={twMerge("mb-8 w-full max-w-screen-xl mx-auto px-4 lg:px-2 ", className)}>
	<div
		class="bg-muted/30 border-border w-full flex flex-col gap-4 rounded-xl border p-4 shadow-sm backdrop-blur-sm sm:flex-row sm:flex-wrap sm:items-center sm:justify-between"
	>
		<!-- Left side: Filters -->
		<div class="flex flex-1 flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
			{@render filters?.()}
		</div>

		<!-- Divider -->
		<div class="bg-border hidden h-8 w-px lg:block"></div>

		<!-- Right side: Sorting + Reset -->
		<div class="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
			{@render sort?.()}

			{#if showReset}
				<Button.Root
					type="button"
					disabled={!canReset}
					onclick={onReset}
					class={twMerge(
						"inline-flex h-9 items-center justify-center rounded-full border border-border bg-background text-sm font-medium text-foreground shadow-sm hover:bg-muted/50 disabled:opacity-50 disabled:pointer-events-none transition-colors",
						// If there's a label, use horizontal padding (pill)
						// If no label, make it a perfect square/circle (size-9)
						resetLabel ? "px-4 gap-2" : "w-9 p-0"
					)}
				>
					<Broom class="size-4" weight="bold" />
					{#if resetLabel}
						<span>{resetLabel}</span>
					{/if}
				</Button.Root>
			{/if}
		</div>
	</div>

	{#if typeof count === 'number'}
		<div class="mt-3 flex items-center gap-2">
			<Badge className="bg-primary/10 text-primary px-3 py-1 text-sm border-none">
				{count} {label(count)} found
			</Badge>
		</div>
	{/if}
</div>