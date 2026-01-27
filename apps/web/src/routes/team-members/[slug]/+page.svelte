<script>
    import ButtonLink from '$lib/ui/components/ButtonLink.svelte';
    import Avatar from '$lib/ui/components/Avatar.svelte';
    import RichTextRenderer from '$lib/RichTextRenderer.svelte';
    import ProjectStateBadge from '$lib/ui/components/ProjectStateBadge.svelte';
    import SocialIcon from '$lib/ui/components/SocialIcon.svelte';
    import SEO from '$lib/SEO.svelte';

    import { Button } from 'bits-ui';
    import { Tabs } from 'bits-ui';

    // Import Phosphor icons for social media platforms
    import Envelope from 'phosphor-svelte/lib/Envelope';
    import Building from 'phosphor-svelte/lib/Building';
    import Globe from 'phosphor-svelte/lib/Globe';
    import Link from 'phosphor-svelte/lib/Link';
    import FunnelSimple from 'phosphor-svelte/lib/FunnelSimple';

    let { data } = $props();

    let teamMember = $derived(data.teamMember);

    // Filter state: 'active' or 'all'
    let projectFilter = $state('active');

    // Responsibility filter: 'responsible' or 'all'
    let responsibilityFilter = $state('all');

    // Check if the team member is responsible for a project
    const isResponsibleForProject = (project) => {
        if (!project.projectParticipants) return false;
        return project.projectParticipants.some((participant) => {
            // participantName contains the team member ID reference
            const participantId = typeof participant.participantName === 'object'
                ? participant.participantName.id
                : participant.participantName;
            return participantId === teamMember.id && participant.isResponsible;
        });
    };

    // Sort projects by start date (newest first) and filter by state and responsibility
    const filteredProjects = $derived(() => {
        const projects = teamMember.projects?.docs ?? [];

        let filtered = projects;

        // Filter by project state
        if (projectFilter === 'active') {
            filtered = filtered.filter((p) => p.projectState === 'active');
        }

        // Filter by responsibility
        if (responsibilityFilter === 'responsible') {
            filtered = filtered.filter((p) => isResponsibleForProject(p));
        }

        return filtered.slice().sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
    });
</script>

<SEO
    title={teamMember.meta?.title || teamMember?.name || 'Team Member'}
    description={teamMember.meta?.description || `Profile of ${teamMember?.name || 'our team member'}`}
    collection={teamMember.meta?.label || 'Team Members'}
/>

{#if teamMember}
    <div class="w-full max-w-screen-xl mx-auto p-4 md:p-8 font-sans">
        <article class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Left Column: Photo, Contact, Links -->
            <aside class="lg:col-span-1 flex flex-col items-center lg:items-start space-y-6">
                <Avatar 
                    photo={teamMember.photo} 
                    variant="large" 
                    class="w-48 h-48 md:w-64 md:h-64" 
                />
                <div class="text-center lg:text-left w-full">
                    <h1 class="text-3xl font-bold text-foreground">{teamMember.name}</h1>
                    <p class="text-lg text-primary">{teamMember.title}</p>
                </div>

                <div class="w-full space-y-3 pt-4 border-t border-border">
                    <h3 class="text-md font-semibold text-muted-foreground uppercase tracking-wider">Contact</h3>
                    <ul class="space-y-2">
                        <li class="">
                            <ButtonLink
                                class="gap-3 group"
                                href={`mailto:${teamMember.email}`}
                                text="Send Email"
                            >
                                {#snippet icon()}
                                    <Envelope class="text-xl" />
                                {/snippet}
                                <span>{teamMember.email}</span>
                            </ButtonLink>
                        </li>
                        {#if teamMember.address}
                            <li class="gap-3 flex group">
                                <Building class="text-xl" />
                                <span class="text-muted-foreground">{teamMember.address}</span>
                            </li>
                        {/if}
                    </ul>
                </div>

                {#if teamMember.scientificLinks?.length > 0}
                    <div class="w-full space-y-3 pt-4 border-t border-border">
                        <h3 class="text-md font-semibold text-muted-foreground uppercase tracking-wider">
                            Scientific Profiles
                        </h3>
                        <ul class="space-y-2">
                            {#each teamMember.scientificLinks as link}
                                <li class="">
                                    <span class="font-semibold text-foreground">{link.platform.platformName}:</span>
                                    <span class="text-muted-foreground break-all"> {link.url}</span>
                                </li>
                            {/each}
                        </ul>
                    </div>
                {/if}

                <!-- {#if teamMember.socialLinks?.length > 0}
                    <div class="w-full space-y-3 pt-4 border-t border-border">
                        <h3 class="text-md font-semibold text-muted-foreground uppercase tracking-wider">
                            Social Media
                        </h3>
                        <ul class="space-y-2">
                            {#each teamMember.socialLinks as link}
                                <li>
                                    <ButtonLink
                                        class="gap-3 group"
                                        external={true}
                                        href={link.url}
                                    >
                                        {#snippet icon()}
                                            <SocialIcon platform={link.platform.platformName} class="text-xl" />
                                        {/snippet}
                                        <span>{link.platform.platformName}</span>
                                    </ButtonLink>
                                </li>
                            {/each}
                        </ul>
                    </div>
                {/if} -->
                {#if teamMember.socialLinks?.length > 0}
                    <div class="w-full space-y-3 pt-4 border-t border-border">
                        <h3 class="text-md font-semibold text-muted-foreground uppercase tracking-wider">
                            Social Media
                        </h3>
                        <div class="flex items-center gap-3 pt-2">
                            {#each teamMember.socialLinks as social}
                                <a
                                    href={social.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    class="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                                    aria-label={social.platform.platformName}
                                >
                                    <SocialIcon platform={social.platform.platformName} class="text-lg" />
                                </a>
                            {/each}
                        </div>
                    </div>
                {/if}
            </aside>

            <!-- Right Column: Profile, Additional Info, Projects moved into Tabs -->
            <main class="lg:col-span-2 space-y-8">
                <Tabs.Root value="profile" class="w-full">
                    <Tabs.List class="flex w-full justify-start border-b border-border/40 bg-transparent p-0">
                        <Tabs.Trigger
                            value="profile"
                            class="cursor-pointer relative h-12 px-6 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-[state=active]:text-foreground data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:h-[2px] data-[state=active]:after:w-full data-[state=active]:after:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                            Profile
                        </Tabs.Trigger>

                        <Tabs.Trigger
                            value="additional"
                            class="cursor-pointer relative h-12 px-6 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-[state=active]:text-foreground data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:h-[2px] data-[state=active]:after:w-full data-[state=active]:after:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                            Additional Information
                        </Tabs.Trigger>

                        <Tabs.Trigger
                            value="projects"
                            class="cursor-pointer relative h-12 px-6 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-[state=active]:text-foreground data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:h-[2px] data-[state=active]:after:w-full data-[state=active]:after:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                            Projects
                        </Tabs.Trigger>
                    </Tabs.List>

                    <Tabs.Content value="profile" class="mt-6 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                        <section>
                            <h2 class="text-2xl font-bold text-foreground border-b-2 border-primary pb-2 mb-4">
                                Profile
                            </h2>
                            <div class="prose dark:prose-invert max-w-none text-foreground">
                                <RichTextRenderer content={teamMember.profile} />
                            </div>
                        </section>
                    </Tabs.Content>

                    <Tabs.Content value="additional" class="mt-6 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                        {#if teamMember.additionalInfo}
                            <section>
                                <h2 class="text-2xl font-bold text-foreground border-b-2 border-primary pb-2 mb-4">
                                    Additional Information
                                </h2>
                                <div class="prose dark:prose-invert max-w-none text-foreground">
                                    <RichTextRenderer content={teamMember.additionalInfo} />
                                </div>
                            </section>
                        {:else}
                            <p class="text-muted-foreground">No additional information available.</p>
                        {/if}
                    </Tabs.Content>

                    <Tabs.Content value="projects" class="mt-6 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                        <section>
                            <div class="flex flex-wrap items-center justify-between gap-4 border-b-2 border-primary pb-2 mb-4">
                                <h2 class="text-2xl font-bold text-foreground">
                                    Projects
                                </h2>
                                <div class="flex flex-wrap gap-4">
                                    <!-- Project State Filter -->
                                    <div class="flex gap-2 items-center">
                                        <span class="text-sm text-muted-foreground">Status:</span>
                                        <Button.Root
                                            class="px-3 py-1 text-sm font-medium rounded-full transition-colors cursor-pointer {projectFilter === 'active' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}"
                                            onclick={() => projectFilter = 'active'}
                                        >
                                            Active
                                        </Button.Root>
                                        <Button.Root
                                            class="px-3 py-1 text-sm font-medium rounded-full transition-colors cursor-pointer {projectFilter === 'all' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}"
                                            onclick={() => projectFilter = 'all'}
                                        >
                                            All
                                        </Button.Root>
                                    </div>

                                    <!-- Responsibility Filter -->
                                    <div class="flex gap-2 items-center">
                                        <span class="text-sm text-muted-foreground">Role:</span>
                                        <Button.Root
                                            class="px-3 py-1 text-sm font-medium rounded-full transition-colors cursor-pointer {responsibilityFilter === 'responsible' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}"
                                            onclick={() => responsibilityFilter = 'responsible'}
                                        >
                                            Responsible
                                        </Button.Root>
                                        <Button.Root
                                            class="px-3 py-1 text-sm font-medium rounded-full transition-colors cursor-pointer {responsibilityFilter === 'all' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}"
                                            onclick={() => responsibilityFilter = 'all'}
                                        >
                                            All Roles
                                        </Button.Root>
                                    </div>
                                </div>
                            </div>

                            {#if filteredProjects().length > 0}
                                <div class="space-y-4">
                                    {#each filteredProjects() as project}
                                        <article class="border-l-2 pl-4 py-3 {project.projectState === 'complited' ? 'border-destructive/50' : 'border-primary'}">
                                            <div class="flex flex-col gap-2">
                                                <div class="flex items-center gap-2">
                                                    <span class="font-bold text-lg text-primary">{project.acronym}</span>
                                                    <ProjectStateBadge state={project.projectState} />
                                                    {#if isResponsibleForProject(project)}
                                                        <span class="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-accent text-accent-foreground">
                                                            Responsible
                                                        </span>
                                                    {/if}
                                                </div>
                                                <ButtonLink
                                                    href={`/projects/${project.slug}`}
                                                >
                                                    {project.title}
                                                </ButtonLink>
                                                {#if project.startDate || project.finishDate}
                                                    <p class="text-sm text-muted-foreground">
                                                        {project.startDate ? new Date(project.startDate).toLocaleDateString() : '?'}
                                                        {#if project.projectState === 'finished' && project.finishDate}
                                                            - {new Date(project.finishDate).toLocaleDateString()}
                                                        {:else}
                                                            - Present
                                                        {/if}
                                                    </p>
                                                {/if}
                                            </div>
                                        </article>
                                    {/each}
                                </div>
                            {:else}
                                <p class="text-muted-foreground">No {projectFilter === 'active' ? 'active ' : ''}{responsibilityFilter === 'responsible' ? 'projects where responsible ' : 'projects '}found.</p>
                            {/if}
                        </section>
                    </Tabs.Content>
                </Tabs.Root>
            </main>
        </article>
    </div>
{:else}
    <div class="flex justify-center items-center h-64">
        <p class="text-muted-foreground">Team member not found.</p>
    </div>
{/if}

