<script>
    import Badge from "$lib/ui/components/Badge.svelte";

    let { state, class: className = '' } = $props();

    const stateClasses = $derived(state === 'completed'
        ? 'bg-destructive/10 text-destructive'
        : 'bg-success/10 text-success');
</script>

{#if state}
    <Badge className={`px-3 py-1 text-sm capitalize ${stateClasses} ${className}`}>
        {state}
    </Badge>
{/if}