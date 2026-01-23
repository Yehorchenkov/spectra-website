<script>
    import { Button } from "bits-ui";
    import { twMerge } from "tailwind-merge";
    // import FM_CU_BL from "$lib/images/FM_CU_BL.png?enhanced";
    // import FM_CU_WT from "$lib/images/FM_CU_WT.png?enhanced";

    let { class: className = "hidden md:flex" } = $props();
</script>

<Button.Root 
    href="https://www.fm.uniba.sk/" 
    target="_blank" rel="noopener noreferrer"
    class={twMerge("items-center h-12 [&>img]:h-full [&>img]:w-auto", className)}
>
    <img src="/FM_CU_BL.png" alt="Comenius University Faculty of Management logo" class="block dark:hidden h-full w-auto hover:opacity-80" />
    <img src="/FM_CU_WH.png" alt="Comenius University Faculty of Management logo" class="hidden dark:block h-full w-auto hover:opacity-80" />
</Button.Root>