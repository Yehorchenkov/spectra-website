<script>
	import Carousel from '$lib/ui/components/Carousel.svelte';
	import ButtonRefAnim from '$lib/ui/components/ButtonRefAnim.svelte';
	import Avatar from '$lib/ui/components/Avatar.svelte';

	let { data } = $props();

	let teamMembers = $derived(data?.docs ?? []);
</script>

<div class="mx-auto w-full text-center">
	<!-- <div class="mx-auto mb-8 max-w-screen-sm lg:mb-16">
		<p class="text-foreground font-light sm:text-xl">
			We are a dynamic research team dedicated to advancing knowledge and innovation through
			interdisciplinary projects that address real-world challenges.
		</p>
	</div> -->

	<Carousel
		items={teamMembers}
		getKey={(member) => member.id ?? member.slug}
		slideClass="min-w-0 shrink-0 grow-0 basis-full pl-6 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
		wrapperClass="w-full py-4"
	>
		{#snippet item(member)}
			<div class="text-center">
				<Avatar
					photo={member.photo}
					variant="thumbnail"
					class="mx-auto mb-4 h-36 w-36"
					href={"/team-members/" + member.slug}
					hoverScale
					ariaLabel={"View " + member.name}
				/>

				<p class="text-foreground mb-1 text-xl font-bold tracking-tight">
					{member.name}
				</p>

				<p class="text-muted-foreground">
					{member.title}
				</p>
			</div>
		{/snippet}

		{#snippet afterControls()}
			<ButtonRefAnim
				class="w-56"
				href="/team-members"
				text="View all team members"
			/>
		{/snippet}
	</Carousel>
</div>