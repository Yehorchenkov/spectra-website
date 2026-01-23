<script>
    import MagnifyingGlass from "phosphor-svelte/lib/MagnifyingGlass";
    import { Button } from "bits-ui";
</script>

<Button.Root
    onclick={() => console.log("Search")}
    role="search"
    aria-label="Search"
    title="Search"
    class="relative inline-flex h-8 w-8 justify-center items-center rounded-lg px-2 transition-colors hover:bg-muted dark:hover:bg-gray-700 focus:outline-none"
>
    <div class="absolute inline-flex h-full w-full items-center justify-center">
        <MagnifyingGlass class="size-5 text-foreground hover:text-primary" aria-label="Search"/>
    </div>
</Button.Root>
