<script>
	import { Button } from 'bits-ui';
    import { twMerge } from 'tailwind-merge';
	import ArrowCircleRight from 'phosphor-svelte/lib/ArrowCircleRight';

    let { class: className, href, text, external = false } = $props();
</script>

<Button.Root
    href={href}
    class={twMerge("inline-flex relative text-center justify-center items-center text-primary-foreground bg-primary hover:opacity-90 focus:ring-ring font-medium rounded-lg text-sm px-4 py-2.5 focus:outline-none transition-all duration-300 ease-in-out group", className)}
>
    <span class="absolute left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <ArrowCircleRight class="size-6" />
    </span>
    <span class="transition-transform duration-300 group-hover:translate-x-4">
        {text}
    </span>
</Button.Root>

<!-- class={twMerge("inline-block rounded-lg w-full text-center font-medium bg-primary text-primary-foreground py-4 px-10 hover:opacity-90 transition-all duration-300 ease-in-out md:w-48 group", className)} -->