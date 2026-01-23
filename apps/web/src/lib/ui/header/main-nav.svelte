<script>
	import '$lib/styles/main-menu-hover.css';
	import { NavigationMenu } from 'bits-ui';
	import { twMerge } from 'tailwind-merge';
	import { page } from '$app/state';
	// import { navMenu } from '$lib/config/navMenu';
	import { getLinkUrl } from '$lib/utils/helpers';
	import ModeToggler from './mode-toggler.svelte';

	let { data } = $props();
	const navItems = $derived(data?.navItems || []);

	let currentPath = $derived(page.url.pathname);

	// const txtMenuClass = `relative py-2 text-foreground hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all duration-200 animation-hover`;
	const txtMenuClass = `relative py-2 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary`;
</script>

<NavigationMenu.Root class="hidden md:flex">
	<NavigationMenu.List
		class="snip1226 group flex flex-1 list-none items-center justify-center space-x-6 text-md font-medium lg:space-x-12"
	>
		{#each navItems as item (item.id)}
			<NavigationMenu.Item>
				{#if item.type === 'link' && item.link}
					<NavigationMenu.Link
						data-hover={item.link.label}
						class={twMerge(txtMenuClass, currentPath.startsWith(getLinkUrl(item.link)) && 'current')}
						href={getLinkUrl(item.link)}
						target={item.link.newTab ? '_blank' : undefined}
						rel={item.link.newTab ? 'noopener noreferrer' : undefined}
					>
						{item.link.label}
					</NavigationMenu.Link>
				{/if}
			</NavigationMenu.Item>
		{/each}
	</NavigationMenu.List>
	<!-- <NavigationMenu.List class="ml-6 lg:ml-12">
		<NavigationMenu.Item>
			<ModeToggler />
		</NavigationMenu.Item>
	</NavigationMenu.List> -->
	<NavigationMenu.Viewport />
</NavigationMenu.Root>
