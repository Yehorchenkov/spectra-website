import { NEWS_CAROUSEL_LIMIT } from '$lib/config/constants.js';
import { safeFetch, buildQuery, buildSelectQuery } from '$lib/utils/apiHandler.js';

export async function load() {
	const newsParams = buildQuery({
        limit: NEWS_CAROUSEL_LIMIT,
        select: ['title', 'slug', 'image', 'excerpt', 'publishDate'] 
    });

    const teamMembersParams = buildQuery({
        select: ['name', 'title', 'slug', 'photo'],
        limit: 100,
        sort: 'order',
        where: {
            showOnLandingPage: { equals: 'true' }
        }
    });

    const [heroData, newsData, partnersData, teamMembersData] = await Promise.all([
        safeFetch('/globals/hero'),
        safeFetch('news', newsParams),
        safeFetch('partners'),
        safeFetch('team-members', teamMembersParams),
    ]);

    return {
        heroData,
        newsData,
        partnersData,
        teamMembersData
    };
}
