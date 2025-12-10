<script>
    import { photoswipe } from '$lib/actions.svelte';
    import { convertContentToHTML } from '$lib/convertHtml';
    import { twMerge } from "tailwind-merge";

    let { class: className, content } = $props();

    $effect(() => {
        const galleries = document.querySelectorAll('[data-pswp-gallery]');
        galleries.forEach(gallery => {
            photoswipe(gallery);
        });
    });
</script>

<div class={twMerge(
    "prose dark:prose-invert max-w-none text-justify prose-a:text-primary prose-a:no-underline prose-img:rounded-lg", 
    className
    )}>
    {@html convertContentToHTML(content)}
</div>