<script>
	import { Dialog } from "bits-ui";
	import { fade } from "svelte/transition";
	import { quintOut } from "svelte/easing";

	let { 
		open = $bindable(false), 
		side = "left", 
		children 
	} = $props();

	// Custom transition to handle percentage-based sliding
	function slide(node, { delay = 0, duration = 300, easing = quintOut, axis = 'x' }) {

		return {
			delay,
			duration,
			easing,
			css: (t) => {
				// Determine direction based on side
				const translateDir = side === 'left' ? -100 : 100;
				const translate = (1 - t) * translateDir;
				return `transform: translate${axis.toUpperCase()}(${translate}%);`;
			}
		};
	}
</script>

<Dialog.Root bind:open>
	<Dialog.Portal>
		<!-- Overlay: Fades in/out -->
		<Dialog.Overlay forceMount class="fixed inset-0 z-50 bg-black/80">
			{#snippet child({ props, open })}
				{#if open}
					<div {...props} transition:fade={{ duration: 200 }}></div>
				{/if}
			{/snippet}
		</Dialog.Overlay>

		<!-- Content: Slides in from left or right -->
		<Dialog.Content forceMount class="fixed bottom-0 top-0 z-50 h-full w-[300px] max-w-[85vw] bg-white p-6 shadow-xl focus:outline-none {side === 'left' ? 'left-0 border-r' : 'right-0 border-l'}">
			{#snippet child({ props, open })}
				{#if open}
					<div 
						{...props} 
						transition:slide={{ duration: 300, axis: 'x' }}
					>
						{@render children?.()}
						
						<!-- Accessible Close Button -->
						<Dialog.Close class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>
							<span class="sr-only">Close</span>
						</Dialog.Close>
					</div>
				{/if}
			{/snippet}
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>