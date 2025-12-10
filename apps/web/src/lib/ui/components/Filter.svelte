<script>
	import { twMerge } from 'tailwind-merge';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import Select from '$lib/ui/components/Select.svelte';

	let { items, placeholder, classMain, classTrigger, classContent, filterField } = $props();

    const filterItems = $derived([{ value: 'all', label: placeholder }, ...items]);

	// Updated query parameter key
	const queryParamKey = `where[${filterField}][equals]`;

	// Initialize filter state from the new query parameter key
	let value = $state(page.url.searchParams.get(queryParamKey) ?? 'all');

	// Effect to update URL when filter changes
	$effect(() => {
		const newVal = value;
		const url = new URL(page.url);

		if (newVal === 'all') {
			url.searchParams.delete(queryParamKey); // Remove the parameter if 'all' is selected
		} else {
			url.searchParams.set(queryParamKey, newVal); // Set the new filter value
		}

		const fullUrl = url.toString();

		if (fullUrl !== page.url.toString()) {
			console.log('filter changed, updating URL to: ', fullUrl);
			goto(fullUrl, {
				replaceState: true,
				noScroll: true,
				keepFocus: true
			});
		}
	});
</script>

<div class={twMerge('flex items-center justify-start', classMain)}>
    <Select
        bind:value
        items={filterItems}
        placeholder={placeholder}
        classTrigger={classTrigger}
        classContent={classContent}
        id="filter"
        type="single"
    />
</div>
