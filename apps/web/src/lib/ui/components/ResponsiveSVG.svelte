<script>
	import { twMerge } from 'tailwind-merge';
	import { d3zoom } from '$lib/actions.svelte.js';

	let {
		width = $bindable(),
		height = $bindable(),
		// scale = $bindable(1),
		onZoom = undefined,
		mainClass = '',
		children
	} = $props();

	let svgElement = $state(null);
	let panGroup = $state(null);
	let zoomAction = $state(null);
	// let currentTransform = $state({ k: 1, x: 0, y: 0 });

	function initZoom(node) {
		zoomAction = d3zoom(node, {
			width,
			height,
			panGroup,
			onZoom,
			// onZoom: (transform) => {
			// 	// Update currentTransform when zoom happens
			// 	currentTransform = transform;
			// }
		});
		return zoomAction;
	}

	$effect(() => {
		// Update the action when these dependencies change
		if (zoomAction && svgElement) {
			zoomAction.update({
				width,
				height,
				panGroup,
				// onZoom: (transform) => {
				// 	// Update currentTransform when zoom happens
				// 	currentTransform = transform;
				// }
			});
		}
	});

	export function zoomToFeature(bounds) {
		if (zoomAction?.zoomToFeature) {
			zoomAction.zoomToFeature(bounds);
		}
	}

	export function zoomIn() {
		if (zoomAction?.zoomIn) {
			zoomAction.zoomIn();
		}
	}

	export function zoomOut() {
		if (zoomAction?.zoomOut) {
			zoomAction.zoomOut();
		}
	}

	export function resetZoom() {
		if (zoomAction?.resetZoom) {
			zoomAction.resetZoom();
		}
	}

	// export function getScale() {
	// 	// Return the current zoom scale
	// 	return currentTransform.k;
	// }
</script>

<div
	class={twMerge('relative block h-full w-full overflow-hidden', mainClass)}
	bind:clientWidth={width}
	bind:clientHeight={height}
>
	{#if width && height}
		<svg bind:this={svgElement} {width} {height} use:initZoom>
			<g bind:this={panGroup} class="panning-layer">
				{@render children()}
			</g>
		</svg>
	{/if}
</div>
