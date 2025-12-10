import { json } from '@sveltejs/kit';
import { API_BASE, QUERY_SLUG_EQUALS_PREFIX } from '$lib/config/backendApi.js';

export async function GET({ params, fetch }) {
	const { slug } = params;
	const encodedSlug = encodeURIComponent(slug);
	const projectUrl = `${API_BASE}/projects${QUERY_SLUG_EQUALS_PREFIX}${encodedSlug}`;

	try {
		const response = await fetch(projectUrl);

		if (!response.ok) {
			return json({ error: response.statusText }, { status: response.status });
		}

		const data = await response.json();

		return json(data);
	} catch (err) {
		console.error('Error fetching project:', err);
		return json({ error: 'Failed to fetch data' }, { status: 500 });
	}
}
