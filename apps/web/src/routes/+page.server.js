import { API_BASE } from '$lib/config/backendApi.js';
import { NEWS_CAROUSEL_LIMIT } from '$lib/config/constants.js';
import { safeFetch, buildQuery, buildSelectQuery } from '$lib/utils/apiHandler.js';
import { buildSeoQuery } from '$lib/utils/seoFactory.js';

export async function load({ fetch }) {
	const newsParams = buildQuery({
        limit: NEWS_CAROUSEL_LIMIT,
        select: ['title', 'slug', 'image', 'excerpt', 'publishDate'] 
    });

    const teamMembersParams = buildSelectQuery(['name', 'title', 'slug', 'photo'], 100);
    teamMembersParams.set('where[showOnLandingPage][equals]', 'true');
    teamMembersParams.set('sort', 'order');

    const [heroData, newsData, partnersData, teamMembersData] = await Promise.all([
        safeFetch(fetch, `${API_BASE}/globals/hero`),
        safeFetch(fetch, `/api/news?${newsParams.toString()}`),
        safeFetch(fetch, `/api/partners`),
        safeFetch(fetch, `/api/team-members?${teamMembersParams.toString()}`),
    ]);

    return {
        heroData,
        newsData,
        partnersData,
        teamMembersData
    };
}
