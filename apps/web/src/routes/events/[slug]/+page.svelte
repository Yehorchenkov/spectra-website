<script>
	import CalendarDots from 'phosphor-svelte/lib/CalendarDots';
	import Folder from 'phosphor-svelte/lib/Folder';
	import Tag from 'phosphor-svelte/lib/Tag';

	import Badge from '$lib/ui/components/Badge.svelte';
	import ProjectBadge from '$lib/ui/components/ProjectBadge.svelte';
	import RichTextRenderer from '$lib/RichTextRenderer.svelte';
	import TableOfContents from '$lib/ui/components/TableOfContents.svelte';
	import DateBadge from '$lib/ui/components/DateBadge.svelte';
	import EventStateBadge from '$lib/ui/components/EventStateBadge.svelte';
	import { formatDateRange } from '$lib/utils/dateHelpers.js';
	import SEO from '$lib/seo.svelte';

	let { data } = $props();

	let event = $derived(data.event);
</script>

<SEO
	title={event.meta.title}
	description={event.meta?.description}
	collection="Event"
/>

{#if event}
	<div class="w-full max-w-screen-xl mx-auto p-4 md:p-8 font-sans">
		<!-- Header -->
		<header class="border-b-2 border-primary pb-4 mb-4">
			<div class="flex flex-col md:flex-row gap-6 md:items-start justify-between">
				<div class="space-y-4 flex-1">
					{#if event.eventState}
						<EventStateBadge state={event.eventState} size="md"/>
					{/if}

					<h1 class="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
						{event.title}
					</h1>

					<div class="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
						{#if event.startDate}
							<div class="flex items-center gap-2">
								<CalendarDots class="size-5 shrink-0" />
								<time datetime={event.startDate} class="text-muted-foreground text-left text-base">
									{formatDateRange(event.startDate, event.finishDate)}
								</time>
							</div>
						{/if}

						{#if event.projects?.length > 0}
							<div class="flex items-center gap-2 flex-wrap">
								<Folder class="size-5 flex-shrink-0" />
								{#each event.projects as project}
									<ProjectBadge
										label={project.acronym}
										href={`/projects/${project.slug}`}
										class="text-xs"
									/>
								{/each}
							</div>
						{/if}

						{#if event.tags?.length > 0}
							<div class="flex items-center gap-2 flex-wrap">
								<Tag class="size-5 shrink-0" />
								{#each event.tags as t}
									{@const tagLabel = typeof t === 'string' ? t : (t.name ?? t.title ?? t.slug)}
									<Badge className="bg-secondary/50 text-secondary-foreground px-2 py-0.5 text-xs">
										{tagLabel}
									</Badge>
								{/each}
							</div>
						{/if}
					</div>
				</div>

				<!-- DateBadge replacing Image -->
				<div class="order-first md:order-last shrink-0">
					<DateBadge startDate={event.startDate || event.publishDate} />
				</div>
			</div>
		</header>

		<!-- Content Grid -->
		<div class="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
			<main>
				<RichTextRenderer content={event.content} />
			</main>

			<aside class="order-first lg:order-last">
				<div class="lg:sticky lg:top-28">
					<TableOfContents content={event.content} />
				</div>
			</aside>
		</div>
	</div>
{:else}
	<div class="flex justify-center items-center h-64">
		<p class="text-muted-foreground">Event not found.</p>
	</div>
{/if}
