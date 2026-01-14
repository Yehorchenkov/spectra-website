<script>
	import { Drawer } from 'vaul-svelte';
	import { Button } from 'bits-ui';
	import List from 'phosphor-svelte/lib/List';
	import X from 'phosphor-svelte/lib/X';
	import ButtonLink from '$lib/ui/components/ButtonLink.svelte';
	import IconNav from '$lib/ui/header/icon-nav.svelte';
	import { getLinkUrl } from '$lib/utils/helpers';

	// Svelte 5 Props
	let { data } = $props();

	// Safety check: ensure navItems is an array
	const navItems = $derived(data?.navItems || []);
</script>

<div data-vaul-drawer-wrapper class="flex md:hidden items-center justify-center">
	<Drawer.Root direction="left">
		<Drawer.Trigger class="text-foreground z-10 flex items-center p-2">
			<List class="size-6" aria-hidden="true" />
		</Drawer.Trigger>
		<Drawer.Portal>
			<Drawer.Overlay class="fixed inset-0 bg-black/40 dark:bg-white/40" />
			<Drawer.Content
				class="fixed right-0 bottom-0 left-0 z-50 mt-24 flex h-full w-[75%] flex-col border-b border-border bg-background p-4 shadow-lg dark:shadow-slate-500/20"
			>
				<Drawer.Close class="absolute top-4 left-4 text-foreground">
					<X class="size-6" aria-hidden="true" />
				</Drawer.Close>
				
				<Drawer.Title>
					<Button.Root href="/" class="flex items-center justify-center z-10 mb-6">
						<IconNav class="flex! h-10" />
					</Button.Root>
				</Drawer.Title>

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

					<!-- Right narrow column for the figure -->
					<div class="flex items-center justify-center pl-4">
						<div class="mx-auto mb-8 h-20 w-1.5 shrink-0 rounded-full bg-zinc-300"></div>
					</div>
				</div>
			</Drawer.Content>
		</Drawer.Portal>
	</Drawer.Root>
</div>