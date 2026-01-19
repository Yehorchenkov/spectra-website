<script>
    import { Button } from "bits-ui";
    import { twMerge } from "tailwind-merge";

    let { class: className = "hidden md:flex" } = $props();
</script>

<Button.Root href="/" class={twMerge("items-center h-12 [&>img]:h-full [&>img]:w-auto", className)}>
    <img src="/logo_Spectra.svg" alt="Spectra CE EU logo" class="block dark:hidden h-full w-auto hover:opacity-80" />
    <img src="/logo_Spectra_dark.svg" alt="Spectra CE EU logo" class="hidden dark:block h-full w-auto hover:opacity-80" />
</Button.Root>