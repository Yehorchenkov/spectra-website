<script>
    import CalendarDots from 'phosphor-svelte/lib/CalendarDots';
    import SortAscending from 'phosphor-svelte/lib/SortAscending';
    import Tag from 'phosphor-svelte/lib/Tag';
    import Folder from 'phosphor-svelte/lib/Folder';
    import ButtonLink from '$lib/ui/components/ButtonLink.svelte';
    import Order from '$lib/ui/components/Order.svelte';
    import placeholderNews from '$lib/images/night-city-2-placeholder.png';

    let { data } = $props();

    console.log('news data', data);
</script>

<div class="flex w-full flex-col items-center overflow-x-hidden">
    <h1 class="text-foreground mt-8 mb-2 text-3xl font-bold tracking-tight">News</h1>
    <p class="text-foreground mb-8 text-2xl">Our news and updates</p>

    <!-- Sort Controls -->
    <div class="mb-8 w-full max-w-screen-xl px-4 lg:px-2">
        <div class="bg-muted/30 border-border flex flex-col gap-4 rounded-xl border p-4 shadow-sm backdrop-blur-sm sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
            <!-- Sorting -->
            <div class="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
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
            </div>
        </div>

        <!-- Results count badge -->
        <div class="mt-3 flex items-center gap-2">
            <span class="bg-primary/10 text-primary inline-flex items-center rounded-full px-3 py-1 text-sm font-medium">
                {data.news.docs.length} news item{data.news.docs.length !== 1 ? 's' : ''} found
            </span>
        </div>
    </div>

    <div class="flex w-full max-w-screen-xl flex-col gap-6 px-4 lg:px-2">
        {#if data.news.docs.length > 0}
            {#each data.news.docs as item, index (item.slug)}
                <div
                    class="text-foreground flex w-full flex-col items-stretch gap-4 md:flex-row md:items-center md:justify-items-start md:gap-0"
                >
                    <div
                        class="flex flex-shrink-0 items-center justify-center rounded-lg bg-transparent md:mr-8 md:h-48 md:w-48"
                    >
                        {#if item.image?.url}
                            <img 
                                src={item.image.url} 
                                alt={item.title} 
                                class="size-32 rounded-lg object-cover md:size-40" 
                            />
                        {:else}
                            <img 
                                src={placeholderNews} 
                                alt="News placeholder" 
                                class="size-32 rounded-lg object-cover md:size-40" 
                            />
                        {/if}
                    </div>
                    <div class="flex w-full flex-col justify-between p-2 leading-normal md:p-4">
                        <ButtonLink
                            class="mb-2 text-left text-xl font-bold tracking-tight"
                            href="/news/{item.slug}"
                        >
                            {item.title}
                        </ButtonLink>
                        
                        <div class="mb-2 flex flex-wrap items-center gap-x-8 gap-y-2">
                            {#if item.publishDate}
                                <div class="flex items-center gap-2">
                                    <CalendarDots class="text-muted-foreground size-5 flex-shrink-0" />
                                    <time datetime={item.publishDate} class="text-muted-foreground text-left text-base">
                                        {new Date(item.publishDate).toLocaleDateString('en-GB', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric'
                                        })}
                                    </time>
                                </div>
                            {/if}

                            {#if item.projects?.length > 0}
                                <div class="flex items-center gap-2 flex-wrap">
                                    <Folder class="text-muted-foreground size-4 flex-shrink-0" />
                                    {#each item.projects as project}
                                        <ButtonLink 
                                            href="/projects/{project.slug}"
                                            class="bg-primary/10 text-primary inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium hover:bg-primary/20"
                                        >
                                            {project.acronym || project.title}
                                        </ButtonLink>
                                    {/each}
                                </div>
                            {/if}

                            {#if item.tags?.length > 0}
                                <div class="flex items-center gap-2 flex-wrap">
                                    <Tag class="text-muted-foreground size-4 flex-shrink-0" />
                                    {#each item.tags as tag}
                                        <span 
                                            class="bg-secondary/50 text-secondary-foreground inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium"
                                        >
                                            {tag.name || tag}
                                        </span>
                                    {/each}
                                </div>
                            {/if}
                        </div>

                        <p class="text-foreground mb-3 text-justify font-normal">
                            {item.excerpt}
                        </p>
                    </div>
                </div>
                {#if index < data.news.docs.length - 1}
                    <!-- Beautiful divider -->
                    <div class="flex w-full justify-center">
                        <div class="bg-primary my-4 h-0.5 w-3/4 rounded-full md:w-2/3"></div>
                    </div>
                {/if}
            {/each}
        {/if}
    </div>
</div>
