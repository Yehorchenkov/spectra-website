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
    import { EXPERT_OPINIONS_PLACEHOLDER } from '$lib/config/constants.js';
    import { EXPERT_OPINIONS_PAGINATION_LIMIT } from '$lib/config/constants.js';
    import { page } from '$app/state';
    import SEO from '$lib/SEO.svelte';
    import { resolveSeo, getFilterContext, getPageParam } from '$lib/utils/seoFactory';
    import { formatDateLong } from '$lib/utils/dateHelpers';

    let { data } = $props();

    const totalExpertOpinions = $derived(data.expertOpinions?.totalDocs ?? 0);
    const perPage = $derived(data.expertOpinions?.limit ?? EXPERT_OPINIONS_PAGINATION_LIMIT);
    const paginatedDocs = $derived(data.expertOpinions?.docs ?? []);

    // console.log('paginatedDocs:', paginatedDocs);
    const tagsFilterItems = $derived(data.tags?.docs?.map((tag) => ({
		value: tag.id,
		label: tag.name
	})) || []);

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

<SEO 
    title={seo.title}
    description={seo.description}
    canonical={seo.canonical}
    noindex={seo.noindex}
    collection={data.seoSettings?.label || 'Expert Opinions'}
/>

<div class="flex w-full flex-col items-center overflow-x-hidden">
    <h1 class="text-foreground mt-8 mb-2 text-3xl font-bold tracking-tight">Expert Opinions</h1>
    <p class="text-foreground mb-8 text-2xl">Our expert opinions and insights</p>

    <!-- Filter and Sort Controls -->
	<FilterSortBar
		count={totalExpertOpinions}
		countLabel="expert opinion"
		resetParams={[
			'where[tags][equals]',
			'where[tags][exists]',
			'sort',
			]}
	>

		{#snippet filters()}
			<div class="flex items-center gap-2">
				<FunnelSimple class="text-primary size-5" weight="bold" />
				<span class="text-muted-foreground text-sm font-medium">Filter:</span>
			</div>

			<Filter
                items={tagsFilterItems}
                classTrigger="w-full sm:w-[200px]"
                classContent="w-[200px]"
                placeholder="All Tags"
                filterField="tags"
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
                    { value: '-publishDate', label: 'Newest First' },
                    { value: 'publishDate', label: 'Oldest First' },
                    { value: 'title', label: 'Title A-Z' },
                    { value: '-title', label: 'Title Z-A' }
                ]}
                defaultOrder={'-publishDate'}
                placeholder={'Select order'}
                classTrigger="w-full sm:w-[180px]"
                classContent="w-[180px]"
            />
		{/snippet}
	</FilterSortBar>

    <div class="flex w-full max-w-screen-xl flex-col gap-6 px-4 lg:px-2">
        {#if totalExpertOpinions > 0}
            {#each paginatedDocs as item, index (item.slug)}
                <div
                    class="text-foreground flex w-full flex-col items-stretch gap-4 md:flex-row md:items-center md:justify-items-start md:gap-0"
                >
                    <div
                        class="flex shrink-0 items-center justify-center rounded-lg bg-transparent md:mr-8 md:h-48 md:w-48"
                    >
                        {#if item.image?.url}
                            <img
                                src={item.image.sizes?.thumbnail?.url || item.image.url}
                                alt={item.title}
                                width="160" 
                                height="160"
                                class="size-32 rounded-lg object-cover md:size-40 shadow-sm"
                            />
                        {:else}
                            <img
                                src={EXPERT_OPINIONS_PLACEHOLDER}
                                alt="Expert opinions placeholder"
                                class="size-32 rounded-lg object-cover md:size-40 shadow-sm"
                            />
                        {/if}
                    </div>
                    <div class="flex w-full flex-col justify-between p-2 leading-normal md:p-4">
                        <ButtonLink
                            class="mb-2 text-left text-xl font-bold tracking-tight"
                            href={`/expert-opinions/${item.slug}${page.url.search}`}
                        >
                            {item.title}
                        </ButtonLink>

                        <div class="mb-2 flex flex-wrap items-center gap-x-8 gap-y-2">
                            {#if item.publishDate}
                                <div class="flex items-center gap-2">
                                    <CalendarDots class="text-muted-foreground size-5 shrink-0" />
                                    <time datetime={item.publishDate} class="text-muted-foreground text-left text-base">
                                        {formatDateLong(item.publishDate)}
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
                {#if index < totalExpertOpinions - 1}
                    <!-- Beautiful divider -->
                    <div class="flex w-full justify-center">
                        <div class="bg-primary my-4 h-0.5 w-3/4 rounded-full md:w-2/3"></div>
                    </div>
                {/if}
            {/each}
            {#if totalExpertOpinions > perPage}
                <Pagination 
                    count={totalExpertOpinions} 
                    perPage={perPage} 
                    itemLabel="expert opinion"
                    itemLabelPlural="expert opinions"
                />
            {/if}
        {/if}
    </div>
</div>
