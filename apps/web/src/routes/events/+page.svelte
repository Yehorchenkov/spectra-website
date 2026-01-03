<script>
    import CalendarDots from 'phosphor-svelte/lib/CalendarDots';
    import FunnelSimple from 'phosphor-svelte/lib/FunnelSimple';
    import SortAscending from 'phosphor-svelte/lib/SortAscending';
    import Tag from 'phosphor-svelte/lib/Tag';
    import Folder from 'phosphor-svelte/lib/Folder';
    import ButtonLink from '$lib/ui/components/ButtonLink.svelte';
    import Order from '$lib/ui/components/Order.svelte';
    import Filter from '$lib/ui/components/Filter.svelte';
    import Badge from '$lib/ui/components/Badge.svelte';
    import ProjectBadge from '$lib/ui/components/ProjectBadge.svelte';
    import FilterSortBar from '$lib/ui/components/FilterSortBar.svelte';
    import Pagination from '$lib/ui/components/Pagination.svelte';
    import { NEWS_PLACEHOLDER } from '$lib/config/constants.js';
    import { NEWS_PAGINATION_LIMIT } from '$lib/config/constants.js';
    import { page } from '$app/state';
    import SEO from '$lib/SEO.svelte';
    import { resolveSeo, getFilterContext, getPageParam } from '$lib/utils/seoFactory';

    let { data } = $props();

    console.log('Events page data:', data);

    const totalEvents = $derived(data.events?.totalDocs ?? 0);
    const perPage = $derived(data.events?.limit ?? NEWS_PAGINATION_LIMIT);
    const paginatedDocs = $derived(data.events?.docs ?? []);

    // console.log('paginatedDocs:', paginatedDocs);
    const projectFilterItems = $derived(data.projects.docs.map((project) => ({
		value: project.id,
		label: project.acronym
	})));

    // 1. URL State
    const qs = $derived(page.url.searchParams);
    const currentPageNum = $derived(getPageParam(qs));

    // 2. Compute SEO
    const seo = $derived.by(() => {
        const filterText = getFilterContext(qs, data);

        return resolveSeo(data.seoSettings, {
            url: page.url,
            context: {
                filters: filterText, // Used in "{{filter}}" template
                page: currentPageNum,
            },
            allowParams: ['where[projects][equals]'] // Keep project filter in canonical
        })
    });
</script>

<!-- <SEO 
    title={seo.title}
    description={seo.description}
    canonical={seo.canonical}
    noindex={seo.noindex}
    collection={data.seoSettings?.label || 'Events Archive'}
/> -->

<div class="flex w-full flex-col items-center overflow-x-hidden">
    <h1 class="text-foreground mt-8 mb-2 text-3xl font-bold tracking-tight">Events</h1>
    <p class="text-foreground mb-8 text-2xl">Events we are organizing and participating in</p>

    <!-- Filter and Sort Controls -->
	<!-- <FilterSortBar
		count={totalEvents}
		countLabel="event"
		resetParams={[
			'where[projects][equals]',
			'where[projects][exists]',
			'sort',
			]}
	>

		{#snippet filters()}
			<div class="flex items-center gap-2">
				<FunnelSimple class="text-primary size-5" weight="bold" />
				<span class="text-muted-foreground text-sm font-medium">Filter:</span>
			</div>

			<Filter
                items={projectFilterItems}
                classTrigger="w-full sm:w-[200px]"
                classContent="w-[200px]"
                placeholder="All Projects"
                filterField="projects"
                includeNone={true}
                noneLabel="Unassigned"
			/>
		{/snippet}

		{#snippet sort()}
			<div class="flex items-center gap-2">
				<SortAscending class="text-primary size-5" weight="bold" />
				<span class="text-muted-foreground text-sm font-medium">Sort:</span>
			</div>

			<Order
                items={[
                    { value: '-startDate', label: 'Newest First' },
                    { value: 'startDate', label: 'Oldest First' },
                    { value: 'title', label: 'Title A-Z' },
                    { value: '-title', label: 'Title Z-A' }
                ]}
                defaultOrder={'-startDate'}
                placeholder={'Select order'}
                classTrigger="w-full sm:w-[180px]"
                classContent="w-[180px]"
            />
		{/snippet}
	</FilterSortBar>

    <div class="flex w-full max-w-screen-xl flex-col gap-6 px-4 lg:px-2">
        {#if totalEvents > 0}
            {#each paginatedDocs as item, index (item.slug)}
                <div
                    class="text-foreground flex w-full flex-col items-stretch gap-4 md:flex-row md:items-center md:justify-items-start md:gap-0"
                >
                    <div
                        class="flex shrink-0 items-center justify-center rounded-lg bg-transparent md:mr-8 md:h-48 md:w-48"
                    >
                        {#if item.image?.url}
                            <img
                                src={item.image.url}
                                alt={item.title}
                                class="size-32 rounded-lg object-cover md:size-40 shadow-sm"
                            />
                        {:else}
                            <img
                                src={NEWS_PLACEHOLDER}
                                alt="Event placeholder"
                                class="size-32 rounded-lg object-cover md:size-40 shadow-sm"
                            />
                        {/if}
                    </div>
                    <div class="flex w-full flex-col justify-between p-2 leading-normal md:p-4">
                        <ButtonLink
                            class="mb-2 text-left text-xl font-bold tracking-tight"
                            href={`/news/${item.slug}${page.url.search}`}
                        >
                            {item.title}
                        </ButtonLink>

                        <div class="mb-2 flex flex-wrap items-center gap-x-8 gap-y-2">
                            {#if item.startDate}
                                <div class="flex items-center gap-2">
                                    <CalendarDots class="text-muted-foreground size-5 shrink-0" />
                                    <time datetime={item.startDate} class="text-muted-foreground text-left text-base">
                                        {new Date(item.startDate).toLocaleDateString('en-GB', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric'
                                        })}
                                    </time>
                                </div>
                            {/if}

                            {#if item.projects?.length > 0}
                                <div class="flex items-center gap-2 flex-wrap">
                                    <Folder class="text-muted-foreground size-4 shrink-0" />
                                    {#each item.projects as project}
                                        <ProjectBadge
                                            label={project.acronym}
                                            href={`/projects/${project.slug}`}
                                            class="text-xs"
                                        />
                                    {/each}
                                </div>
                            {/if}
                        </div>

                        <p class="text-foreground mb-3 text-justify font-normal">
                            {item.excerpt}
                        </p>

                        {#if item?.tags?.length ?? 0}
                            <div class="flex flex-wrap items-center gap-2">
                                <Tag class="text-muted-foreground size-4 shrink-0" />
                                {#each item.tags as tag}
                                    <Badge className="bg-secondary/50 text-secondary-foreground px-2 py-0.5 text-xs">
                                        {tag.name || tag}
                                    </Badge>
                                {/each}
                            </div>
                        {/if}
                    </div>
                </div>
                {#if index < totalEvents - 1}
                    <div class="flex w-full justify-center">
                        <div class="bg-primary my-4 h-0.5 w-3/4 rounded-full md:w-2/3"></div>
                    </div>
                {/if}
            {/each}
            {#if totalEvents > perPage}
                <Pagination 
                    count={totalEvents} 
                    perPage={perPage} 
                    itemLabel="event"
                    itemLabelPlural="events"
                />
            {/if}
        {/if}
    </div> -->
</div>
