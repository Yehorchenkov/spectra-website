<script lang="ts">
	import { page } from '$app/state';
	import House from 'phosphor-svelte/lib/House';
	import CaretRight from 'phosphor-svelte/lib/CaretRight';
	import ArrowLeft from 'phosphor-svelte/lib/ArrowLeft';
	import { twMerge } from 'tailwind-merge';

	let {
		class: className,
		currentPageTitle = null,
		// Pass an array of paths that should keep query params (e.g., ['/projects', '/users'])
		preservePaths = [] as string[]
	} = $props();

	// Parse URL segments derived from current state
	let segments = $derived.by(() => {
		const parts = page.url.pathname.split('/').filter(Boolean);

		return parts.map((part, idx) => {
			const href = '/' + parts.slice(0, idx + 1).join('/');
			const isLastSegment = idx === parts.length - 1;

			let name: string;
			if (isLastSegment && currentPageTitle) {
				name = currentPageTitle;
			} else {
				// Capitalize first letter and replace hyphens/underscores with spaces
				name = part.charAt(0).toUpperCase() + part.slice(1).replace(/[_-]/g, ' ');
			}
			return { name, href };
		});
	});

	// Helper to handle query param preservation based on the passed prop
	const getHrefWithQuery = (href: string) => {
		if (preservePaths.includes(href)) {
			return href + page.url.search;
		}
		return href;
	};

	// Determine the "Previous Page" for the mobile back button
	let previousSegment = $derived(
		segments.length > 1 ? segments[segments.length - 2] : null
	);
</script>

<nav class={twMerge('w-full', className)} aria-label="Breadcrumb">
	<!-- 
		MOBILE VIEW (< 768px): 
		Shows a "Back" button. Hidden on medium screens and up.
	-->
	<div class="flex md:hidden">
		{#if segments.length <= 1}
			<!-- If at root or only 1 deep, go Home -->
			<a href="/" class="text-foreground hover:text-primary inline-flex items-center font-medium transition-colors">
				<ArrowLeft class="me-2 h-4 w-4" weight="bold" />
				Back to Home
			</a>
		{:else if previousSegment}
			<!-- Go back to parent level -->
			<a
				href={getHrefWithQuery(previousSegment.href)}
				class="text-foreground hover:text-primary inline-flex items-center font-medium transition-colors"
			>
				<ArrowLeft class="me-2 h-4 w-4" weight="bold" />
				<span class="max-w-[200px] truncate">
					Back to {previousSegment.name}
				</span>
			</a>
		{/if}
	</div>

	<!-- 
		DESKTOP VIEW (>= 768px): 
		Shows full breadcrumbs. Hidden on small screens.
	-->
	<ol class="hidden items-center space-x-1 rtl:space-x-reverse md:flex md:space-x-2">
		<li class="inline-flex items-center">
			<a href="/" class="text-foreground hover:text-primary inline-flex items-center font-medium transition-colors">
				<House class="me-2.5 h-4 w-4" weight="fill" />
				Home
			</a>
		</li>

		{#each segments as segment, i (segment.href)}
			<li class="flex items-center">
				<CaretRight class="text-muted-foreground mr-1 h-4 w-4 md:mr-2" weight="bold" />

				{#if i === segments.length - 1}
					<!-- Current Page (Non-clickable) -->
					<span
						class="text-muted-foreground ms-1 max-w-[150px] truncate font-medium md:ms-2 lg:max-w-[300px]"
						aria-current="page"
						title={segment.name}
					>
						{segment.name}
					</span>
				{:else}
					<!-- Link -->
					<a
						href={getHrefWithQuery(segment.href)}
						class="text-foreground hover:text-primary ms-1 max-w-[100px] truncate font-medium transition-colors md:ms-2 lg:max-w-[200px]"
						title={segment.name}
					>
						{segment.name}
					</a>
				{/if}
			</li>
		{/each}
	</ol>
</nav>