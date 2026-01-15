<script>
    import { Button } from 'bits-ui';
    import { twMerge } from 'tailwind-merge';

    let {
        class: className,
        href,
        external = false,
        variant = 'default',
        size = 'md',
        icon,
        children
    } = $props();

    const variants = {
        default: 'text-primary hover:text-primary/80',
        muted: 'text-muted-foreground hover:text-foreground',
        accent: 'text-accent-foreground hover:text-accent-foreground/80'
    };

    const underlineVariants = {
        default: 'after:bg-primary',
        muted: 'after:bg-foreground',
        accent: 'after:bg-accent-foreground'
    };

    const sizes = {
        sm: 'text-sm gap-1',
        md: 'text-base gap-1.5',
        lg: 'text-lg gap-2'
    };
</script>

<Button.Root
    {href}
    target={external ? '_blank' : undefined}
    rel={external ? 'noopener noreferrer' : undefined}
    class={twMerge(
        'group inline-flex items-center font-medium transition-colors duration-200 no-underline',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm',
        variants[variant],
        sizes[size],
        className
    )}
>
    {#if icon}
        {@render icon()}
    {/if}
    {#if children}
        <span
            class={twMerge(
                "relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-0 after:transition-all after:duration-300 group-hover:after:w-full",
                underlineVariants[variant]
            )}
        >
            {@render children()}
        </span>
    {/if}
</Button.Root>