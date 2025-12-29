import { NEWS_PAGINATION_LIMIT } from '$lib/config/constants.js';
import { buildQuery, buildSelectQuery } from '$lib/utils/apiHandler.js';
import { buildSeoQuery } from '$lib/utils/seoFactory.js';

export async function load({ fetch, url }) {
    const page = url.searchParams.get('page') || '1';
    const limit = url.searchParams.get('limit') || NEWS_PAGINATION_LIMIT.toString();
    
    const newsSelectFields = [
        'title',
        'slug',
        'excerpt',
        'publishDate',
        'image',
        'tags',
        'projects',
    ];

    const newsParams = buildQuery({
        baseParams: url.searchParams,
        page,
        limit,
        select: newsSelectFields,
    });

    const projectParams = buildSelectQuery(['acronym', 'id'], 100);

    const seoParams = buildSeoQuery('news-archive');

    const [newsRes, projectsRes, seoRes] = await Promise.all([
		fetch(`/api/news?${newsParams.toString()}`),
		fetch(`/api/projects?${projectParams.toString()}`),
		fetch(`/api/seo-settings?${seoParams.toString()}`)
	]);

	const [news, projects, seoData] = await Promise.all([
		newsRes.json(),
		projectsRes.json(),
		seoRes.json()
	]);

    return {
		news,
		projects,
		// Return the first document found, or null if not configured in CMS
		seoSettings: seoData.docs?.[0] || null
	};
}