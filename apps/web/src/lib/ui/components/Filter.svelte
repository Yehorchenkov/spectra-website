<script>
    import { twMerge } from 'tailwind-merge';
    import { goto } from '$app/navigation';
    import { page } from '$app/state';
    import Select from '$lib/ui/components/Select.svelte';

    let {
        items,
        placeholder,
        classMain,
        classTrigger,
        classContent,
        filterField,
        includeNone = false,
        noneLabel = 'None',
        noneValue = '__none__',
    } = $props();

    const filterItems = $derived([
        { value: 'all', label: placeholder },
        ...(includeNone ? [{ value: noneValue, label: noneLabel }] : []),
        ...items
    ]);

    const equalsKey = $derived(`where[${filterField}][equals]`);
    const noneKey   = $derived(`where[${filterField}][exists]`);

    // 1. Derive the value directly from the URL.
    // This makes the UI automatically react to the URL (Back/Forward buttons)
    // without needing an $effect.
    const currentValue = $derived.by(() => {
        if (page.url.searchParams.get(noneKey) === 'false') return noneValue;
        return page.url.searchParams.get(equalsKey) || 'all';
    });

    // 2. Handle changes by updating the URL.
    // This is called only when the user interacts with the Select.
    function handleUpdate(newValue) {
        if (newValue === currentValue) return;

        const url = new URL(page.url);

        if (newValue === 'all') {
            url.searchParams.delete(equalsKey);
            url.searchParams.delete(noneKey);
        } else if (newValue === noneValue) {
            url.searchParams.delete(equalsKey);
            url.searchParams.set(noneKey, 'false');
        } else {
            url.searchParams.delete(noneKey);
            url.searchParams.set(equalsKey, newValue);
        }

        goto(url.toString(), { 
            replaceState: true, 
            noScroll: true, 
            keepFocus: true 
        });
    }
</script>

<div class={twMerge('flex items-center justify-start', classMain)}>
    <Select
        value={currentValue}
        onValueChange={handleUpdate}
        items={filterItems}
        placeholder={placeholder}
        classTrigger={classTrigger}
        classContent={classContent}
        id={filterField}
        type="single"
    />
</div>