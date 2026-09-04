import { json } from '@sveltejs/kit';
import { safeFetch, buildQuery } from '$lib/utils/apiHandler.js';
import { NEWS_CAROUSEL_LIMIT } from '$lib/config/constants.js';

const CAROUSEL_FIELDS = ['title', 'slug', 'image', 'excerpt', 'publishDate'];

export async function GET({ url }) {
	const page = Math.max(1, Number.parseInt(url.searchParams.get('page') ?? '1', 10) || 1);

	const queryParams = buildQuery({
		page,
		limit: NEWS_CAROUSEL_LIMIT,
		sort: '-publishDate',
		select: CAROUSEL_FIELDS
	});

	const data = await safeFetch('news', queryParams);

	if (!data) {
		return json({ error: 'Failed to fetch news' }, { status: 500 });
	}

	return json(data);
}
