<script>
    import Coins from 'phosphor-svelte/lib/Coins';
    import Link from 'phosphor-svelte/lib/Link';
    import CalendarDots from 'phosphor-svelte/lib/CalendarDots';
    import ButtonLink from '$lib/ui/components/ButtonLink.svelte';
    // import ProjectPlaceholder from '$lib/ui/components/ProjectPlaceholder.svelte';
    import Avatar from '$lib/ui/components/Avatar.svelte';
    import ProjectLogo from '$lib/ui/components/ProjectLogo.svelte';
    import ProjectStateBadge from '$lib/ui/components/ProjectStateBadge.svelte';
    import { Tabs } from "bits-ui";

    import { convertContentToHTML } from '$lib/convertHtml';
    import RichTextRenderer from '$lib/RichTextRenderer.svelte';

    let { data } = $props();

    let project = $derived(data.project);

    const coordinator = $derived(
        project.projectParticipants?.find((p) => p.isResponsible)
    );

    const projectParticipants = $derived(
        project.projectParticipants?.filter((p) => !p.isResponsible)
    );

    console.log('Project Data:', data);

</script>

{#if project}
    <div class="w-full max-w-screen-xl mx-auto p-4 md:p-8 font-sans">
        <article class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Left Column: Photo, Contact, Links -->
            <aside class="lg:col-span-1 flex flex-col items-center lg:items-start space-y-6">
                <ProjectLogo {project} />
                <div class="text-center lg:text-left w-full">
                    <h1 class="text-xl font-bold text-foreground">{project.title}</h1>
                    <div class="flex flex-col lg:flex-row items-center lg:items-center gap-3 mt-1">
                        <p class="text-2xl font-bold text-primary">{project.acronym}</p>
                        {#if project.projectState}
                            <ProjectStateBadge state={project.projectState} />
                        {/if}
                    </div>
                </div>


                <div class="w-full space-y-3 pt-4 border-t border-border">
                    {#if coordinator}
                        <h3 class="text-md font-semibold text-muted-foreground uppercase tracking-wider">{coordinator.participantRole.roleName}</h3>
                        <ButtonLink
                            class="gap-3"
                            href="/team-members/{coordinator.participantName.slug}"
                        >
                            {#snippet icon()}
                                <Avatar photo={coordinator.participantName.photo} class="size-8" />
                            {/snippet}
                            {coordinator.participantName.name}
                        </ButtonLink>
                    {:else}
                        <h3 class="text-md font-semibold text-muted-foreground uppercase tracking-wider">Project Coordinator</h3>
                        <p class="text-muted-foreground">No coordinator information available.</p>
                    {/if}
                </div>

                {#if projectParticipants?.length > 0}
                    <div class="w-full space-y-3 pt-4 border-t border-border">
                        <h3 class="text-md font-semibold uppercase tracking-wider text-muted-foreground">
                            Project Participants
                        </h3>
                        <ul class="space-y-1">
                            {#each projectParticipants as participant}
                                <li class="text-md">
                                    <ButtonLink
                                        class="gap-3"
                                        href="/team-members/{participant.participantName.slug}"
                                    >
                                        {#snippet icon()}
                                            <Avatar photo={participant.participantName.photo} variant="thumbnail" class="size-8" />
                                        {/snippet}
                                        {participant.participantName.name}
                                    </ButtonLink>
                                </li>
                            {/each}
                        </ul>
                    </div>
                {/if}


                <div class="w-full space-y-3 pt-4 border-t border-border">
                    <h3 class="text-md font-semibold text-muted-foreground uppercase tracking-wider">
                            Project Information
                    </h3>
                    <ul class="space-y-2">
                        {#if project.projectWebsite}
                            <li>
                                <ButtonLink
                                    class="gap-3"
                                    external={true}
                                    href={project.projectWebsite}
                                >
                                    {#snippet icon()}
                                        <Link class="text-xl" />
                                    {/snippet}
                                    {project.projectWebsite}
                                </ButtonLink>
                            </li>
                        {/if}
                        {#if project.program}
                            <li>
                                <p
                                    class="flex gap-3 group"
                                >
                                    <Coins class="text-xl" />
                                    <span>{project.program.title}</span>
                                </p>
                            </li>
                        {/if}
                        {#if project.startDate}
                            <li>
                                <p
                                    class="flex gap-3 group"
                                >
                                    <CalendarDots class="text-xl" />
                                    <span>
                                        {new Date(project.startDate).toLocaleDateString()} - 
                                        {#if project.finishDate}
                                            {new Date(project.finishDate).toLocaleDateString()}
                                        {:else}
                                            unknown
                                        {/if}
                                    </span>
                                </p>
                            </li>
                        {/if}
                    </ul>
                </div>
                {#if project.projectAcknowledgement?.length > 0}
                    <div class="w-full space-y-3 pt-4 border-t border-border">
                        <h3 class="text-md font-semibold text-muted-foreground uppercase tracking-wider">
                            Project Acknowledgement
                        </h3>
                        <ul class="space-y-1">
                            {#each project.projectAcknowledgement as acknowledgement}
                                <li>
                                    {#if acknowledgement.acknowledgementLogo}
                                        <img
                                            src={acknowledgement.acknowledgementLogo.url}
                                            alt={acknowledgement.acknowledgementLogo.alt}
                                            class="max-h-12 object-contain"
                                        />
                                    {:else}
                                        <span>{acknowledgement.acknowledgementFormula}</span>
                                    {/if}
                                </li>
                            {/each}
                        </ul>
                    </div>
                {/if}

            </aside>

            <!-- Right Column: Profile, Additional Info -->
            <main class="lg:col-span-2 space-y-8">
                <Tabs.Root value="description" class="w-full">
                    <Tabs.List class="flex w-full justify-start border-b border-border/40 bg-transparent p-0">
                        <Tabs.Trigger
                            value="description"
                            class="cursor-pointer relative h-12 px-6 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-[state=active]:text-foreground data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:h-[2px] data-[state=active]:after:w-full data-[state=active]:after:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                            Description
                        </Tabs.Trigger>
                        <Tabs.Trigger
                            value="news"
                            class="cursor-pointer relative h-12 px-6 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-[state=active]:text-foreground data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:h-[2px] data-[state=active]:after:w-full data-[state=active]:after:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                            News
                        </Tabs.Trigger>
                        <Tabs.Trigger
                            value="events"
                            class="cursor-pointer relative h-12 px-6 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-[state=active]:text-foreground data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:h-[2px] data-[state=active]:after:w-full data-[state=active]:after:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                            Events
                        </Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content value="description" class="mt-6 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                        <section>
                            <h2 class="text-2xl font-bold text-foreground border-b-2 border-primary pb-2 mb-4">
                                Project Description
                            </h2>
                            <div class="prose dark:prose-invert max-w-none text-foreground">
                                <RichTextRenderer content={project.content} />
                            </div>
                        </section>
                    </Tabs.Content>
                    <Tabs.Content value="news" class="mt-6 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                        <section>
                            <h2 class="text-2xl font-bold text-foreground border-b-2 border-primary pb-2 mb-4">
                                Project News
                            </h2>
                            {#if project.news.docs && project.news.docs.length > 0}
                                {@const sortedNews = [...project.news.docs].sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())}
                                <div class="space-y-4">
                                    {#each sortedNews as newsItem}
                                        <article class="border-l-2 border-primary pl-4 py-2">
                                            <div class="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                                                <CalendarDots class="size-4" />
                                                <time datetime={newsItem.publishDate}>
                                                    {new Date(newsItem.publishDate).toLocaleDateString()}
                                                </time>
                                            </div>
                                            <ButtonLink 
                                                href={"/news/" + newsItem.slug}
                                                class="text-lg font-semibold hover:text-primary transition-colors"
                                            >
                                                {newsItem.title}
                                            </ButtonLink>
                                            {#if newsItem.excerpt}
                                                <p class="text-muted-foreground mt-1 line-clamp-2">
                                                    {newsItem.excerpt}
                                                </p>
                                            {/if}
                                        </article>
                                    {/each}
                                </div>
                            {:else}
                                <p class="text-muted-foreground">No news available yet.</p>
                            {/if}
                        </section>
                    </Tabs.Content>
                    <Tabs.Content value="events" class="mt-6 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                        <section>
                            <h2 class="text-2xl font-bold text-foreground border-b-2 border-primary pb-2 mb-4">
                                Project Events
                            </h2>
                            {#if project.events && project.events.length > 0}
                                {@const sortedEvents = [...project.events].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())}
                                <div class="space-y-4">
                                    {#each sortedEvents as event}
                                        <article class="border-l-2 border-primary pl-4 py-2">
                                            <div class="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                                                <CalendarDots class="size-4" />
                                                <time datetime={event.date}>
                                                    {new Date(event.date).toLocaleDateString()}
                                                </time>
                                            </div>
                                            <ButtonLink 
                                                href={event.url}
                                                external={true}
                                                class="text-lg font-semibold hover:text-primary transition-colors"
                                            >
                                                {event.title}
                                            </ButtonLink>
                                            {#if event.description}
                                                <p class="text-muted-foreground mt-1 line-clamp-2">
                                                    {event.description}
                                                </p>
                                            {/if}
                                        </article>
                                    {/each}
                                </div>
                            {:else}
                                <p class="text-muted-foreground">No events available yet.</p>
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
