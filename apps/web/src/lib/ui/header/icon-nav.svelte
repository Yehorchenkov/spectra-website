<script>
    import { Button } from "bits-ui";
    import logoLight from "$lib/images/SPECTRA_logo_light.png?enhanced";
    import logoDark from "$lib/images/SPECTRA_logo_dark.png?enhanced";
    import { twMerge } from "tailwind-merge";

    let { class: className = "hidden md:flex" } = $props();
</script>

<Button.Root href="/" class={twMerge("items-center h-12 [&>picture]:h-full [&>picture]:w-auto", className)}>
    <enhanced:img src={logoLight} alt="Spectra CE EU logo" class="block dark:hidden h-full w-auto hover:opacity-80" />
    <enhanced:img src={logoDark} alt="Spectra CE EU logo" class="hidden dark:block h-full w-auto hover:opacity-80" />
</Button.Root>