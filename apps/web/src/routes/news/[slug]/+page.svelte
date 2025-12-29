<script>
	import CalendarDots from 'phosphor-svelte/lib/CalendarDots';
	import Folder from 'phosphor-svelte/lib/Folder';
	import Tag from 'phosphor-svelte/lib/Tag';

	import Badge from '$lib/ui/components/Badge.svelte';
	import ProjectBadge from '$lib/ui/components/ProjectBadge.svelte';
	import RichTextRenderer from '$lib/RichTextRenderer.svelte';
    import { NEWS_PLACEHOLDER } from '$lib/config/constants.js';
	import SEO from '$lib/seo.svelte';

	let { data } = $props();

	let newsItem = $derived(data.news);

	// Always show a header image: use the article image when available, otherwise a placeholder.
	// NOTE: Update this path if your placeholder lives elsewhere.
	const headerImageUrl = $derived(newsItem?.image?.url ?? NEWS_PLACEHOLDER);
	const headerImageAlt = $derived(newsItem?.image?.alt ?? newsItem?.title ?? 'News');

	const publishDateLabel = $derived(
		newsItem?.publishDate ? new Date(newsItem.publishDate).toLocaleDateString() : null
	);
</script>

<SEO
	title={newsItem.meta.title}
	description={newsItem.meta?.description}
	collection="News Article"
/>

{#if newsItem}
	<div class="w-full max-w-screen-xl mx-auto p-4 md:p-8 font-sans">
		<article class="space-y-8">
			<!-- Header (title + meta + image) -->
			<header class="border-b-2 border-primary pb-4">
				<div class="grid gap-6 md:grid-cols-[1fr_360px] md:items-start">
					<div class="space-y-4">
						<h1 class="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
							{newsItem.title}
						</h1>

						<div class="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
							{#if newsItem.publishDate}
								<div class="flex items-center gap-2">
									<CalendarDots class="size-5 flex-shrink-0" />
									<time datetime={newsItem.publishDate}>{publishDateLabel}</time>
								</div>
							{/if}

							{#if newsItem.projects?.length > 0}
								<div class="flex items-center gap-2 flex-wrap">
									<Folder class="size-5 flex-shrink-0" />
									{#each newsItem.projects as project}
										<ProjectBadge
											label={project.acronym}
											href={`/projects/${project.slug}`}
											class="text-xs"
										/>
									{/each}
								</div>
							{/if}

							{#if newsItem.tags?.length > 0}
								<div class="flex items-center gap-2 flex-wrap">
									<Tag class="size-5 shrink-0" />
									{#each newsItem.tags as t}
										{@const tagLabel = typeof t === 'string' ? t : (t.name ?? t.title ?? t.slug)}
										<Badge className="bg-secondary/50 text-secondary-foreground px-2 py-0.5 text-xs">
											{tagLabel}
										</Badge>
									{/each}
								</div>
							{/if}
						</div>
					</div>

					<!-- Image first on mobile, on the right on desktop -->
					<figure class="order-first md:order-0 md:justify-self-end">
						<img
							src={headerImageUrl}
							alt={headerImageAlt}
							class="w-full md:w-[360px] aspect-16/10 rounded-xl border border-border object-cover shadow-sm"
							loading="lazy"
						/>
					</figure>
				</div>
			</header>

			<!-- Content -->
			<section class="space-y-4">
				<div class="max-w-none text-foreground leading-relaxed">
					<RichTextRenderer content={newsItem.content} />
				</div>
			</section>
		</article>
	</div>
{:else}
	<div class="flex justify-center items-center h-64">
		<p class="text-muted-foreground">News article not found.</p>
	</div>
{/if}
