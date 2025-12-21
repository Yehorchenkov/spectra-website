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

    // 1. Derive the current sort order directly from the URL.
    // This ensures the UI stays in sync if the user hits the "Back" button.
    const sortOrder = $derived(page.url.searchParams.get('sort') || defaultOrder);

    // 2. Handle the update explicitly when the user changes the selection.
    function handleUpdate(newValue) {
        if (newValue === sortOrder) return;

        const url = new URL(page.url);

        // Update the sort parameter
        url.searchParams.set('sort', newValue);

        url.searchParams.delete('page');

        goto(url.toString(), { 
            keepFocus: true, 
            noScroll: true, 
            replaceState: true 
        });
    }
</script>

<div class={twMerge("flex items-center justify-start gap-1.5", classMain)}>
    <Select
        {items}
        value={sortOrder}
        onValueChange={handleUpdate}
        {placeholder}
        {classTrigger}
        {classContent}
        id="sort-order"
        type="single"
    />
</div>