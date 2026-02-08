<script>
    import { page } from "$app/state";
	import Breadcrumb from "$lib/ui/components/Breadcrumb.svelte";

    let { children } = $props();

    let currentPageTitle = $derived(page.data.teamMember?.name ?? null);

    // console.log("currentPageTitle", currentPageTitle);

</script>

<div class="bg-background flex w-full flex-col items-center mb-8">
    <div class="flex max-w-screen-xl w-full justify-start px-2 mt-4">
        <Breadcrumb currentPageTitle={currentPageTitle} />
    </div>
    <div class="w-full flex justify-center">
        {@render children()}
    </div>
</div>