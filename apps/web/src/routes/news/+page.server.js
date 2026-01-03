import { NEWS_PAGINATION_LIMIT } from '$lib/config/constants.js';
import { safeFetch, buildQuery, buildSelectQuery } from '$lib/utils/apiHandler.js';
import { buildSeoQuery } from '$lib/utils/seoFactory.js';

export async function load({ fetch, url }) {
	const page = url.searchParams.get('page') || '1';

	const newsSelectFields = ['title', 'slug', 'excerpt', 'publishDate', 'image', 'tags', 'projects'];

	const newsParams = buildQuery({
		baseParams: url.searchParams,
		page,
		select: newsSelectFields
	});

	const projectParams = buildSelectQuery(['acronym', 'id'], 100);

	const seoParams = buildSeoQuery('news-archive');

	const [news, projects, seoData] = await Promise.all([
		safeFetch(fetch, `/api/news?${newsParams.toString()}`),
		safeFetch(fetch, `/api/projects?${projectParams.toString()}`),
		safeFetch(fetch, `/api/seo-settings?${seoParams.toString()}`)
	]);

	return {
		news,
		projects,
		// Return the first document found, or null if not configured in CMS
		seoSettings: seoData.docs?.[0] || null
	};
}
