<script>
	import ButtonLink from '$lib/ui/components/ButtonLink.svelte';
    import Avatar from '$lib/ui/components/Avatar.svelte';
    import SEO from '$lib/SEO.svelte';

	let { data } = $props();

    // filter and order team members
	// let teamMembers = $derived(
	// 	(data.teamMembers.docs ?? [])
	// 		.sort((a, b) => a.order - b.order)
	// );

    let teamMembers = $derived(
        data.teamMembers.docs ?? []
    );

</script>

<SEO 
    title={data.seoSettings?.meta?.title || 'Our Team'}
    description={data.seoSettings?.meta?.description || 'Meet the members of our team'}
    collection={data.seoSettings?.label || 'Team Members'}
/>

<div class="flex w-full flex-col items-center">
    <h1 class="text-foreground mt-8 mb-2 text-3xl font-bold tracking-tight">Our Team</h1>
    <p class="text-foreground mb-8 text-2xl">Meet the members of our team</p>

    <div
        class="grid w-full max-w-screen-xl gap-8 px-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-16 md:px-0"
    >
        {#each teamMembers as member (member.id)}
            <div class="text-center">
                <Avatar
					photo={member.photo}
					class="mx-auto mb-4 h-36 w-36"
					href={"/team-members/" + member.slug}
					hoverScale
					ariaLabel={"View " + member.name}
				/>
                <p
                    class="text-foreground mb-1 text-xl font-bold tracking-tight"
                >
                    {member.name}
                </p>
                <p class="text-muted-foreground">{member.title}</p>
            </div>
        {/each}
    </div>
</div>


