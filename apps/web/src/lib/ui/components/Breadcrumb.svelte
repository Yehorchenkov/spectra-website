<script lang="ts">
	import { page } from '$app/state';
	import House from 'phosphor-svelte/lib/House';
	import CaretRight from 'phosphor-svelte/lib/CaretRight';
	import ArrowLeft from 'phosphor-svelte/lib/ArrowLeft';
	import { browser } from '$app/environment';
	import { twMerge } from 'tailwind-merge';

	import { truncateString } from '$lib/utils.js';

	let { class: className, currentPageTitle = null } = $props();

	// Helper function to determine truncation length based on width
	const calculateMaxLength = (width: number): number => {
		if (width >= 1024) return 100; // Tailwind 'lg'
		if (width >= 768) return 50; // Tailwind 'md'
		return 0; // Small screens - triggers "back button" mode
	};

	// Initialize maxLength:
	// - If in browser, calculate based on current window.innerWidth.
	// - If SSR, default to a non-small screen value (e.g., 100) to avoid SSRing the "back" button
	//   if the typical view is the full breadcrumb. Adjust SSR default as needed.
	let maxLength = $state(browser ? calculateMaxLength(window.innerWidth) : 100);

	$effect(() => {
		if (!browser) {
			return; // Effect logic is client-side only
		}

		// Ensure maxLength is correctly set on client-side mount
		// This also handles cases where the initial browser value might differ or for pure CSR.
		maxLength = calculateMaxLength(window.innerWidth);

		const onResize = () => {
			maxLength = calculateMaxLength(window.innerWidth);
		};

		window.addEventListener('resize', onResize);
		// Cleanup on unmount
		return () => window.removeEventListener('resize', onResize);
	});

	let segments = $derived(
		page.url.pathname
			.split('/')
			.filter(Boolean)
			.map((part, idx, all) => {
				const href = '/' + all.slice(0, idx + 1).join('/');
				let name: string;
				const isLastSegment = idx === all.length - 1;

				if (isLastSegment && currentPageTitle) {
					// If it's the last segment and currentPageTitle is provided, use it
					name = currentPageTitle;
				} else {
					// Otherwise, derive from slug
					name = part.charAt(0).toUpperCase() + part.slice(1).replace(/[_-]/g, ' ');
				}
				return { name, href };
			})
	);

  $effect(() => {
    console.log('current page title:', currentPageTitle);
  });

	// The commented out $effect for segments is not needed due to $derived.
	// The older $effect for maxLength is also superseded by the refined one above.
</script>

<nav class={twMerge('flex', className)} aria-label="Breadcrumb">
	{#if maxLength === 0}
		{#if segments.length === 0 || segments.length === 1}
			<a href="/" class="text-foreground hover:text-primary inline-flex items-center font-medium">
				<ArrowLeft class="me-2 h-4 w-4" weight="bold" />
				Back to Home
			</a>
		{:else if segments.length > 1}
			<a
				href={segments[segments.length - 2].href}
				class="text-foreground hover:text-primary inline-flex items-center font-medium"
			>
				<ArrowLeft class="me-2 h-4 w-4" weight="bold" />
				Back to {segments[segments.length - 2].name}
			</a>
		{/if}
	{:else}
		<ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
			<li class="inline-flex items-center">
				<a href="/" class="text-foreground hover:text-primary inline-flex items-center font-medium">
					<House class="me-2.5 h-4 w-4" weight="fill" />
					Home
				</a>
			</li>
			{#each segments as segment, i (segment.href)}
				<div class="flex items-center">
					<CaretRight class="text-muted-foreground mr-1 h-4 w-4 md:mr-2" weight="bold" />
					{#if i === segments.length - 1}
						<span class="text-muted-foreground ms-1 font-medium md:ms-2" aria-current="page">
							{truncateString(segment.name, maxLength)}
						</span>
					{:else}
						<a
							href={segment.href}
							class="text-foreground hover:text-primary ms-1 font-medium transition-colors md:ms-2"
						>
							{truncateString(segment.name, maxLength)}
						</a>
					{/if}
				</div>
			{/each}
		</ol>
	{/if}
</nav>
