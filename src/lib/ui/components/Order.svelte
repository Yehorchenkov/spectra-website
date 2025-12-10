<script>
    import { twMerge } from 'tailwind-merge';
    import { goto } from '$app/navigation';
    import { page } from '$app/state';
    import Select from '$lib/ui/components/Select.svelte';

    let { 
        items, 
        defaultOrder = '-startDate', 
        placeholder, 
        classMain, 
        classTrigger, 
        classContent 
    } = $props();

    // Initialize state from URL or default
    let sortOrder = $state(page.url.searchParams.get('sort') || defaultOrder);

    // Sync URL when sortOrder changes
    $effect(() => {
        const currentSortInUrl = page.url.searchParams.get('sort');

        if (sortOrder !== currentSortInUrl) {
            const params = new URLSearchParams(page.url.searchParams);
            params.set('sort', sortOrder);
            goto(`?${params.toString()}`, { keepFocus: true, noScroll: true, replaceState: true });
        }
    });
</script>

<div class={twMerge("flex items-center justify-start gap-1.5", classMain)}>
    <Select
        {items}
        bind:value={sortOrder}
        {placeholder}
        {classTrigger}
        {classContent}
        id="sort-order"
        type="single"
    />
</div>