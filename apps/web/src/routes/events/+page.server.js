import { EVENTS_PAGINATION_LIMIT, EVENTS_SEO_SLUG } from '$lib/config/constants.js';
import { safeFetch, buildQuery, buildSelectQuery } from '$lib/utils/apiHandler.js';
import { buildSeoQuery } from '$lib/utils/seoFactory.js';

export async function load({ url }) {

    const eventsSelectFields = ['title', 'subtitle', 'slug', 'excerpt', 'tags', 'projects', 'eventState', 'startDate', 'finishDate'];

    const eventsParams = buildQuery({
        baseParams: url.searchParams,
        select: ['title', 'subtitle', 'slug', 'excerpt', 'tags', 'projects', 'eventState', 'startDate', 'finishDate'],
        limit: EVENTS_PAGINATION_LIMIT || 10
    });

    const projectParams = buildSelectQuery(['acronym', 'id'], 100);

    const seoParams = buildSeoQuery(EVENTS_SEO_SLUG);

    const [events, projects, seoData] = await Promise.all([
        safeFetch('/events', eventsParams),
        safeFetch('projects', projectParams),
        safeFetch('seo-settings', seoParams)
    ]);

    return {
        events,
        projects,
        // Return the first document found, or null if not configured in CMS
        seoSettings: seoData.docs?.[0] || null
    };
}
