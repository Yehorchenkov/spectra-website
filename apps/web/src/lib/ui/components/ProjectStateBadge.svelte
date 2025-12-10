<script>
    /**
     * @type {{ state: 'ongoing' | 'finished' | string, class?: string }}
     */
    let { state, class: className = '' } = $props();
</script>

{#if state}
    <span
        class="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium capitalize {state === 'finished' ? 'bg-destructive/10 text-destructive' : 'bg-success/10 text-success'} {className}"
    >
        {state}
    </span>
{/if}