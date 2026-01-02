<script>
	import ButtonLink from '$lib/ui/components/ButtonLink.svelte';
	import ButtonRefAnim from '$lib/ui/components/ButtonRefAnim.svelte';
	import Avatar from '$lib/ui/components/Avatar.svelte';
	let { data } = $props();

	// filter and order team members
	// let teamMembers = $derived(
	// 	(data?.docs ?? [])
	// 		.filter((member) => member.showOnLandingPage)
	// 		.sort((a, b) => a.order - b.order)
	// );

	let teamMembers = $derived(
		data?.docs ?? []
	);

	console.log('teamMembers', data);
</script>

<div class="mx-auto w-full text-center">
	<div class="mx-auto mb-8 max-w-screen-sm lg:mb-16">
		<p class="text-foreground font-light sm:text-xl">
			We are a dynamic research team dedicated to advancing knowledge and innovation through
			interdisciplinary projects that address real-world challenges.
		</p>
	</div>
	<div class="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-16">
		{#each teamMembers as member}
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
	<div class="mx-auto py-4 lg:py-8">
		<ButtonRefAnim class="ml-4 w-56" href="/team-members" text="View all team members" />
	</div>
</div>
