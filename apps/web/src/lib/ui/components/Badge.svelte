<script>
    import { twMerge } from 'tailwind-merge';

    let {
        as = 'span',
        href,
        className = '',
        children
    } = $props();
</script>

<svelte:element
    this={as}
    href={href}
    class={twMerge("inline-flex items-center rounded-full font-medium ", className)}
>
    {@render children?.()}
</svelte:element>