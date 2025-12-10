<script>
    import { page } from '$app/state';
    import ButtonLink from '$lib/ui/components/ButtonLink.svelte';
</script>

<div class="grid h-screen place-content-center px-4">
    <div class="text-center">
        <h1 class="text-9xl font-bold text-primary">{page.status}</h1>
        <p class="text-lg mb-6">{page.error.message}</p>
        <ButtonLink
            href="/"
        >
            {"Go back to home"}
        </ButtonLink>
    </div>
</div>