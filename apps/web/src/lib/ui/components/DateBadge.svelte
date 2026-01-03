<script>
    /* Svelte 5 uses destructuring for props */
    let { startDate = null, fallback } = $props();

    /* Reactive derivations using the $derived rune */
    const dateObj = $derived(startDate ? new Date(startDate) : null);
    
    const dateParts = $derived.by(() => {
        if (!dateObj) return null;
        return {
            month: dateObj.toLocaleDateString('en-GB', { month: 'short' }),
            day: dateObj.getDate(),
            year: dateObj.getFullYear()
        };
    });

    
</script>

<!-- Usage with the custom icon snippet -->
<!-- <DateBadge startDate={null}>
    {#child fallback}
        <CalendarDots class="text-muted-foreground size-12 md:size-16 opacity-20" />
    {/child}
</DateBadge> -->

<div class="flex flex-row md:flex-col items-center justify-center md:justify-start md:pt-1 shrink-0 w-full md:w-32 text-center gap-2 md:gap-0">
    {#if dateParts}
        <!-- Month -->
        <span class="text-lg font-bold uppercase text-muted-foreground tracking-wider">
            {dateParts.month}
        </span>

        <!-- Day -->
        <span class="text-3xl md:text-5xl font-extrabold text-primary leading-none md:my-2">
            {dateParts.day}
        </span>

        <!-- Year -->
        <span class="text-base text-muted-foreground font-medium">
            {dateParts.year}
        </span>
    {:else}
        {#if fallback}
            {@render fallback()}
        {:else}
            <!-- Default fallback if no snippet is provided -->
            <div class="text-muted-foreground size-12 md:size-16 opacity-20 border-2 border-dashed border-current rounded-md flex items-center justify-center">
                ?
            </div>
        {/if}
    {/if}
</div>