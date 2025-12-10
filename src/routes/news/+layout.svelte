<script>
    import { page } from "$app/state";
	import Breadcrumb from "$lib/ui/components/Breadcrumb.svelte";

    let { children } = $props();

    let currentPageTitle = $derived(page.data.news?.title);

    $effect(() => {
        console.log("Current page data:", page);
    });

</script>

<div class="bg-background flex w-full flex-col items-center">
    <div class="flex max-w-screen-xl w-full justify-start px-2 mt-4">
        <Breadcrumb class="" currentPageTitle={currentPageTitle} />
    </div>
    <div class="self-center">
        {@render children()}
    </div>
</div>