import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';

import { select } from 'd3-selection';
import { zoom, zoomIdentity } from 'd3-zoom';

export function photoswipe(node, options) {
	$effect(() => {
		let lightbox = new PhotoSwipeLightbox({
			gallery: node,
			children: 'a',
			pswpModule: () => import('photoswipe'),
			showHideAnimationType: 'zoom',
			...options
		});
		lightbox.init();

		return () => {
			lightbox.destroy();
			lightbox = null;
		};
	});
}

export function d3zoom(node, { width, height, panGroup, onZoom = undefined }) {
	let zoomBehavior;
	const svg = select(node);

	function setup() {
		if (!width || !height || !panGroup) return null;

		zoomBehavior = zoom()
			.scaleExtent([1, 12])
			.translateExtent([
				[0, 0],
				[width, height]
			])
			.on('zoom', (event) => {
				const { transform } = event;
				select(panGroup).attr('transform', transform);
				if (onZoom) onZoom(event);
			});

		svg.call(zoomBehavior).call(zoomBehavior.transform, zoomIdentity);

		return zoomBehavior;
	}

	let behavior = setup();

	function zoomToFeature(bounds) {
		if (!behavior) return;
		const [[x0, y0], [x1, y1]] = bounds;
		const scale = Math.min(width / (x1 - x0), height / (y1 - y0)) * 0.8;
		const translate = [width / 2 - (scale * (x0 + x1)) / 2, height / 2 - (scale * (y0 + y1)) / 2];
		select(node)
			.transition()
			.duration(1500)
			.call(behavior.transform, zoomIdentity.translate(translate[0], translate[1]).scale(scale));
	}

	function zoomIn() {
		if (!behavior) return;
		svg.transition().duration(250).call(behavior.scaleBy, 1.2);
	}

	function zoomOut() {
		if (!behavior) return;
		svg
			.transition()
			.duration(250)
			.call(behavior.scaleBy, 1 / 1.2);
	}

	function resetZoom() {
		if (!behavior) return;
		svg.transition().duration(750).call(behavior.transform, zoomIdentity);
	}

	// Update when parameters change
	$effect(() => {
		if (behavior) {
			svg.on('.zoom', null); // Remove existing zoom
		}
		behavior = setup();
	});

	return {
		update(params) {
			width = params.width;
			height = params.height;
			panGroup = params.panGroup;
			onZoom = params.onZoom;

			if (behavior) {
				behavior.translateExtent([
					[0, 0],
					[width, height]
				]);
			}
		},
		destroy() {
			if (behavior) {
				svg.on('.zoom', null);
			}
		},
		zoomToFeature,
		zoomIn,
		zoomOut,
		resetZoom
	};
}
