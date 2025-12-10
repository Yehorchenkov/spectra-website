<script>
	import '$lib/styles/main-menu-hover.css';
	import { NavigationMenu } from 'bits-ui';
	import { twMerge } from 'tailwind-merge';
	import { page } from '$app/state';
	import { navMenu } from '$lib/config/navMenu';

	let currentPath = $derived(page.url.pathname);
	$effect(() => {
		console.log('Current path:', currentPath);
		for (const item of navMenu) {
			if (currentPath.startsWith(item.slug)) {
				console.log('Current item:', item.title);
			}
		}
	});

	// const txtMenuClass = `relative py-2 text-foreground hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all duration-200 animation-hover`;
	const txtMenuClass = `relative py-2 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary`;
</script>

<NavigationMenu.Root class="hidden md:flex">
	<NavigationMenu.List
		class="snip1226 group flex flex-1 list-none items-center justify-center space-x-6 text-xl font-medium lg:space-x-12"
	>
		{#each navMenu as item}
			<NavigationMenu.Item>
				<NavigationMenu.Link
					data-hover={item.title}
					class={twMerge(txtMenuClass, currentPath.startsWith(item.slug) && 'current')}
					href={item.slug}
				>
					{item.title}
				</NavigationMenu.Link>
			</NavigationMenu.Item>
		{/each}
	</NavigationMenu.List>
	<NavigationMenu.Viewport />
</NavigationMenu.Root>
