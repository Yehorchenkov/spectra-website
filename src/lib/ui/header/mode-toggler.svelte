<script>
    import Sun from "phosphor-svelte/lib/Sun";
    import Moon from "phosphor-svelte/lib/Moon";
    import { mode, toggleMode } from "mode-watcher";
    import { Button } from "bits-ui";
    import { scale } from "svelte/transition";
	import { cubicOut } from "svelte/easing";

</script>

<Button.Root
    onclick={toggleMode}
    role="switch"
    aria-label="Mode toggler"
    aria-checked={mode.current === "light"}
	title="Toggle {mode.current === 'dark' ? 'Dark' : 'Light'} Mode"
    class="relative inline-flex h-10 w-10 justify-center items-center rounded-lg px-2 transition-colors hover:bg-muted focus:outline-none"
>
    {#if mode.current === "dark"}
        <div
            class="absolute inline-flex h-full w-full items-center justify-center"
            transition:scale={{
                delay: 50,
                duration: 200,
                start: 0.7,
                easing: cubicOut,
            }}
        >
            <Sun class="size-6 text-foreground hover:text-primary" aria-label="Sun" />
        </div>
    {:else}
        <div
            class="absolute inline-flex h-full w-full items-center justify-center"
            transition:scale={{
                delay: 50,
                duration: 200,
                start: 0.7,
                easing: cubicOut,
            }}
        >
            <Moon class="size-6 text-foreground hover:text-primary" aria-label="Moon" />
        </div>
    {/if}
</Button.Root>