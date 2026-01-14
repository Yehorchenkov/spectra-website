export const getLinkUrl = (linkData) => {
	if (!linkData) return '#';

	const { type, reference, route, url } = linkData;

	switch (type) {
		case 'reference':
			if (!reference?.value?.slug) return '#';
			
			const slug = reference.value.slug;
			const collection = reference.relationTo; // Payload provides this for polymorphic relations

			// Define your URL prefixes here
			switch (collection) {
				case 'pages':
					// If your home page slug is 'home', return root '/'
					return slug === 'home' ? '/' : `/${slug}`;
				
				case 'team-members':
					return `/team-members/${slug}`;

				case 'projects':
					return `/projects/${slug}`;

				case 'news':
					return `/news/${slug}`;

				case 'events':
					return `/events/${slug}`;

				default:
					// Fallback if collection isn't mapped above
					return `/${slug}`;
			}

		case 'route':
			return route || '#';

		case 'custom':
			return url || '#';

		default:
			return '#';
	}
};
