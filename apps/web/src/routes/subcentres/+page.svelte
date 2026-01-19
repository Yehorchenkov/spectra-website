<script>
	import ButtonLink from '$lib/ui/components/ButtonLink.svelte';
    // import Avatar from '$lib/ui/components/Avatar.svelte';
    import SEO from '$lib/SEO.svelte';

	let { data } = $props();

    let subcentres = $derived(
        data.subcentres.docs ?? []
    );

</script>

<SEO 
    title={data.seoSettings?.meta?.title || 'Subcentres'}
    description={data.seoSettings?.meta?.description || 'Subcentres of SPECTRA CE EU'}
    collection={data.seoSettings?.label || 'Subcentres'}
/>

<div class="flex w-full flex-col items-center">
    <h1 class="text-foreground mt-8 mb-2 text-3xl font-bold tracking-tight">Subcentres</h1>
    <p class="text-foreground mb-8 text-2xl">Subcentres of SPECTRA CE EU</p>

    <div
        class="grid w-full max-w-screen-xl gap-8 px-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-16 md:px-0"
    >
        {#each subcentres as subcentre (subcentre.id)}
            <div class="text-center">
                <a href={"/subcentres/" + subcentre.slug}>
                    <img 
                        src={subcentre.logo?.url} alt={subcentre.logo?.alt || subcentre.title + " logo"} 
                        class="mx-auto mb-4 h-36 w-full object-contain hover:scale-105 transition-transform duration-200" 
                    />
                </a>
                <p
                    class="text-foreground mb-1 text-xl font-bold tracking-tight"
                >
                    {subcentre.title}
                </p>
            </div>
        {/each}
    </div>
</div>


