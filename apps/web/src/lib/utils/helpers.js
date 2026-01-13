export const getLinkUrl = (linkData) => {
	const { type, reference, route, url } = linkData;

	switch (type) {
		case 'reference':
			// Internal specific page
			return reference?.value?.slug ? `/${reference.value.slug}` : '#'; // fallback

		case 'route':
			// The new System Route option
			return route || '#';

		case 'custom':
			// External link
			return url || '#';

		default:
			return '#';
	}
};
