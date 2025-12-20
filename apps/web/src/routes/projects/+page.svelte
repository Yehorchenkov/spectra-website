<script>
	import Coins from 'phosphor-svelte/lib/Coins';
	import CalendarDots from 'phosphor-svelte/lib/CalendarDots';
	import FunnelSimple from 'phosphor-svelte/lib/FunnelSimple';
	import SortAscending from 'phosphor-svelte/lib/SortAscending';
	import Avatar from '$lib/ui/components/Avatar.svelte';
	import ButtonLink from '$lib/ui/components/ButtonLink.svelte';
	import Order from '$lib/ui/components/Order.svelte';
	import Filter from '$lib/ui/components/Filter.svelte';
	import ProjectLogo from '$lib/ui/components/ProjectLogo.svelte';
	import ProjectStateBadge from '$lib/ui/components/ProjectStateBadge.svelte';
	import Badge from '$lib/ui/components/Badge.svelte';
	import FilterSortBar from '$lib/ui/components/FilterSortBar.svelte';

	let { data } = $props();

	const numProjects = $derived(data.projects?.docs?.length ?? 0);

	const programFilterItems = $derived(data.programs.docs.map((program) => ({
		value: program.id,
		label: program.title
	})));

	const stateFilterItems = [
		{ value: 'active', label: 'Active' },
		{ value: 'completed', label: 'Completed' }
	];

	// Helper function to get responsible person from participants
	function getResponsiblePerson(project) {
		return project.projectParticipants?.find((p) => p.isResponsible);
	}
</script>

<div class="flex w-full flex-col items-center overflow-x-hidden">
	<h1 class="text-foreground mt-8 mb-2 text-3xl font-bold tracking-tight">Projects</h1>
	<p class="text-foreground mb-8 text-2xl">The list of project we are involved in</p>

	<!-- Filter and Sort Controls -->
	<FilterSortBar
		count={numProjects}
		countLabel="project"
		resetParams={[
			'where[program.id][equals]',
			'where[projectState][equals]',
			'sort',
			]}
	>

		{#snippet filters()}
			<div class="flex items-center gap-2">
				<FunnelSimple class="text-primary size-5" weight="bold" />
				<span class="text-muted-foreground text-sm font-medium">Filter:</span>
			</div>

			<Filter
				items={programFilterItems}
				classTrigger="w-full sm:w-[200px]"
				classContent="w-[200px]"
				placeholder="All Programs"
				filterField="program.id"
			/>
			<Filter
				items={stateFilterItems}
				classTrigger="w-full sm:w-[140px]"
				classContent="w-[140px]"
				placeholder="All States"
				filterField="projectState"
			/>
		{/snippet}

		{#snippet sort()}
			<div class="flex items-center gap-2">
				<SortAscending class="text-primary size-5" weight="bold" />
				<span class="text-muted-foreground text-sm font-medium">Sort:</span>
			</div>

			<Order
				items={[
					{ value: '-publishDate', label: 'Newest First' },
					{ value: 'publishDate', label: 'Oldest First' },
					{ value: 'title', label: 'Title A-Z' },
					{ value: '-title', label: 'Title Z-A' }
				]}
				defaultOrder="-publishDate"
				placeholder="Select order"
				classTrigger="w-full sm:w-[180px]"
				classContent="w-[180px]"
			/>
		{/snippet}
	</FilterSortBar>


	<div class="flex w-full max-w-screen-xl flex-col gap-6 px-4 lg:px-2">
        {#if numProjects > 0}
            {#each data.projects.docs as project, index (project.slug)}
                {@const responsiblePerson = getResponsiblePerson(project)}
                <div
                    class="text-foreground flex w-full flex-col items-stretch gap-4 md:flex-row md:items-center md:justify-items-start md:gap-0"
                >
                    <div
                        class="flex flex-shrink-0 items-center justify-center gap-3 rounded-lg bg-transparent md:mr-8 md:h-48 md:w-48"
                    >
                        <ProjectLogo {project} />
                    </div>
                    <div class="flex w-full flex-col justify-between p-2 leading-normal md:p-4">
                        <ButtonLink
                            class="mb-2 text-left text-xl font-bold tracking-tight"
                            href="/projects/{project.slug}"
                        >
                            {project.title}
                        </ButtonLink>
                        <div class="mb-2 flex flex-wrap items-center gap-2 text-left text-2xl font-bold text-primary">
                            {project.acronym}
                            {#if project.projectState}
                                <ProjectStateBadge state={project.projectState} />
                            {/if}
                        </div>
                        <div class="mb-2 flex flex-wrap items-center gap-x-8 gap-y-2">
                            <div class="flex items-center gap-2">
                                <Coins class="text-muted-foreground size-5 flex-shrink-0" />
                                <p class="text-muted-foreground text-left text-base">
                                    {project.program.title}
                                </p>
                            </div>

                            {#if responsiblePerson}
                                <div class="flex items-center gap-2">
                                    {#if responsiblePerson.participantName?.slug}
                                        <ButtonLink
                                            class="text-muted-foreground text-left text-base"
                                            href="/team-members/{responsiblePerson.participantName.slug}"
                                        >
											{#snippet icon()}
												<Avatar photo={responsiblePerson.participantName.photo} variant="thumbnail" class="size-5" />
											{/snippet}
                                            {responsiblePerson.participantName.name}
                                        </ButtonLink>
                                    {:else}
                                        <p class="text-muted-foreground text-left text-base">
                                            {responsiblePerson.participantName?.name || 'Unknown'}
                                        </p>
                                    {/if}
                                </div>
                            {/if}

                            {#if project.startDate || project.finishDate}
                                <div class="flex items-center gap-2">
                                    <CalendarDots class="text-muted-foreground size-5 flex-shrink-0" />
                                    <p class="text-muted-foreground text-left text-base">
                                        {project.startDate ? new Date(project.startDate).toLocaleDateString() : '?'}
                                        -
                                        {project.finishDate
                                            ? new Date(project.finishDate).toLocaleDateString()
                                            : 'Present'}
                                    </p>
                                </div>
                            {/if}
                        </div>
                        <p class="text-foreground mb-3 text-justify font-normal">
                            {project.excerpt}
                        </p>
                    </div>
                </div>
                {#if index < numProjects - 1}
                    <!-- Beautiful divider -->
                    <div class="flex w-full justify-center">
                        <div class="bg-primary my-4 h-0.5 w-3/4 rounded-full md:w-2/3"></div>
                    </div>
                {/if}
            {/each}
        {/if}
    </div>
</div>
