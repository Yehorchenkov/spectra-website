<script>
    import Badge from "$lib/ui/components/Badge.svelte";
    import { twMerge } from "tailwind-merge";

    let { state, size = 'sm', class: className = '' } = $props();

    const stateStyles = {
        past: 'bg-destructive/10 text-destructive border-destructive/20',
        ongoing: 'bg-warning/10 text-warning border-warning/20', // Or 'bg-primary/10 text-primary border-primary/20' 'bg-amber-500/10 text-amber-600 border-amber-500/20'
        upcoming: 'bg-success/10 text-success border-success/20'
    };

    const sizeStyles = {
        sm: 'px-3 py-1 text-sm',
        md: 'px-4 py-2 text-base' // one size bigger
    };

    // Derive the classes based on the current state and size
    const stateClasses = $derived(stateStyles[state] ?? 'bg-muted text-muted-foreground');
    const sizeClasses = $derived(sizeStyles[size] ?? sizeStyles.sm);
</script>

{#if state}
    <Badge className={twMerge(`${sizeClasses} capitalize ${stateClasses}`, className)}>
        {state}
    </Badge>
{/if}