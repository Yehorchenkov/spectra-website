export const prerender = false;

import { NEWS_PAGINATION_LIMIT, NEWS_SEO_SLUG, NEWS_DEFAULT_FIELDS } from '$lib/config/constants.js';
import { safeFetch, buildQuery, buildSelectQuery } from '$lib/utils/apiHandler.js';
import { buildSeoQuery } from '$lib/utils/seoFactory.js';

export async function load({ url }) {

	const newsParams = buildQuery({
		baseParams: url.searchParams,
		limit: NEWS_PAGINATION_LIMIT || 10,
		select: NEWS_DEFAULT_FIELDS
	});

	const projectParams = buildSelectQuery(['acronym', 'id'], 100);

	const seoParams = buildSeoQuery(NEWS_SEO_SLUG);

	const [news, projects, seoData] = await Promise.all([
		safeFetch('news', newsParams),
		safeFetch('projects', projectParams),
		safeFetch('seo-settings', seoParams)
	]);

	return {
		news,
		projects,
		// Return the first document found, or null if not configured in CMS
		seoSettings: seoData.docs?.[0] || null
	};
}
