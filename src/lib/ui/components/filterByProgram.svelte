<script>
	import { twMerge } from 'tailwind-merge';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import Select from '$lib/ui/components/Select.svelte';

	let { items, placeholder, classMain, classSelect, filterField = 'program' } = $props();

	console.log('items:', items);

	// Updated query parameter key
	const queryParamKey = `where[${filterField}][id]`;

	// Initialize filter state from the new query parameter key
	let filter = $state(page.url.searchParams.get(queryParamKey) ?? 'all');

	// Effect to update URL when filter changes
	$effect(() => {
		const currentFilterUrl = page.url.searchParams.get(queryParamKey) ?? 'all';

		if (filter !== currentFilterUrl) {
			console.log('filter changed, updating URL to: ', filter);
			const url = new URL(page.url);
			if (filter === 'all') {
				url.searchParams.delete(queryParamKey); // Remove the parameter if 'all' is selected
			} else {
				url.searchParams.set(queryParamKey, filter); // Set the new filter value
			}
			goto(url.toString(), {
				replaceState: true,
				noScroll: true,
				keepFocus: true
			});
		}
	});
</script>

<div class={twMerge('flex items-center justify-start', classMain)}>
	<Select
		{items}
		bind:value={filter}
		{placeholder}
		classTrigger={classSelect}
		id="filter"
		type="single"
	/>
</div>
