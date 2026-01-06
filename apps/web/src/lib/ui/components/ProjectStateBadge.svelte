<script>
    import Badge from "$lib/ui/components/Badge.svelte";
    import { twMerge } from "tailwind-merge";

    let { state, class: className = '' } = $props();
    
    const stateStyles = {
        active: 'bg-success/10 text-success border-success/20',
        completed: 'bg-destructive/10 text-destructive border-destructive/20',
    };
    // Derive the classes based on the current state
    const stateClasses = $derived(stateStyles[state] ?? 'bg-muted text-muted-foreground');
</script>

{#if state}
    <Badge className={twMerge(`px-3 py-1 text-sm capitalize ${stateClasses}`, className)}>
        {state}
    </Badge>
{/if}