<script>
	import Drawer from '$lib/ui/components/Drawer.svelte';
	import { Button } from 'bits-ui';
	import List from 'phosphor-svelte/lib/List';
	import ButtonLink from '$lib/ui/components/ButtonLink.svelte';
	import IconNav from '$lib/ui/header/icon-nav.svelte';
	import { getLinkUrl } from '$lib/utils/helpers';
	import X from 'phosphor-svelte/lib/X';

	// Svelte 5 Props
	let { data } = $props();
	let open = $state(false);

	// Safety check: ensure navItems is an array
	const navItems = $derived(data?.navItems || []);
</script>

<div class="flex md:hidden items-center justify-center">
	<Drawer
		bind:open
		side="left"
		swipeEnabled
		swipeOpenFromEdge
		showIndicator
		contentClass="rounded-r-lg border-border bg-background"
		headerClass="border-b-0 pb-0"
		bodyClass="px-4 pt-2 pb-4"
		showCloseButton={false}
	>

		{#snippet trigger()}
			<span class="text-foreground z-10 flex items-center p-2">
				<List class="size-6" aria-hidden="true" />
			</span>
		{/snippet}

		{#snippet title()}
			<Button.Root href="/" class="flex items-center justify-center z-10 mb-6">
				<IconNav class="flex! h-10" />
			</Button.Root>
		{/snippet}

		<div class="flex flex-1 overflow-y-auto">
			<!-- Left wide column -->
			<ul class="ml-4 flex flex-col grow space-y-4">
				{#each navItems as item (item.id)}
					
					<!-- CASE 1: Single Link -->
					{#if item.type === 'link' && item.link}
						<li>
							<ButtonLink 
								href={getLinkUrl(item.link)} 
								external={item.link.newTab ? true : false}
							>
								{item.link.label}
							</ButtonLink>
						</li>

					<!-- CASE 2: Sub-menu (Group) -->
					{:else if item.type === 'subData'}
						<li class="flex flex-col items-start gap-2">
							<!-- Group Label -->
							<span class="text-xs font-bold text-foreground tracking-wider pl-4">
								{item.groupLabel}
							</span>

							<!-- Indented Sub-items -->
							<ul class="flex flex-col gap-2 border-l border-zinc-200 dark:border-zinc-800 ml-2 pl-3">
								{#each item.subItems || [] as subItem (subItem.id)}
									{#if subItem.link}
										<li>
											<ButtonLink 
												href={getLinkUrl(subItem.link)}
												external={subItem.link.newTab ? true : false}
											>
												{subItem.link.label}
											</ButtonLink>
										</li>
									{/if}
								{/each}
							</ul>
						</li>
					{/if}

				{/each}
			</ul>
		</div>

		{#snippet footer()}
			<div class="flex justify-end">
				<button
					type="button"
					class="text-muted-foreground hover:text-foreground inline-flex items-center"
					onclick={() => (open = false)}
					aria-label="Close navigation menu"
				>
					<X class="size-6" aria-hidden="true" />
				</button>
			</div>
		{/snippet}
	</Drawer>
</div>
