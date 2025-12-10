<script>
    import { Button } from "bits-ui";
    import logoLight from "$lib/images/SPECTRA_logo_light.png?enhanced";
    import logoDark from "$lib/images/SPECTRA_logo_dark.png?enhanced";

    let { class: className = "hidden md:flex" } = $props();
</script>

<Button.Root href="/" class="items-center {className}">
    <enhanced:img src={logoLight} alt="Spectra CE EU logo" class="block dark:hidden h-12 w-full hover:opacity-80" />
    <enhanced:img src={logoDark} alt="Spectra CE EU logo" class="hidden dark:block h-12 w-full hover:opacity-80" />
</Button.Root>