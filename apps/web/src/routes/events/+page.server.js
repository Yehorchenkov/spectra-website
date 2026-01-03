import { EVENTS_PAGINATION_LIMIT } from '$lib/config/constants.js';
import { safeFetch, buildQuery, buildSelectQuery } from '$lib/utils/apiHandler.js';
import { buildSeoQuery } from '$lib/utils/seoFactory.js';

export async function load({ fetch, url }) {
    const page = url.searchParams.get('page') || '1';

    const eventsSelectFields = ['title', 'subtitle', 'slug', 'excerpt', 'tags', 'projects', 'eventState', 'startDate', 'finishDate'];

    const eventsParams = buildQuery({
        baseParams: url.searchParams,
        page,
        select: eventsSelectFields
    });

    const projectParams = buildSelectQuery(['acronym', 'id'], 100);

    const seoParams = buildSeoQuery('events-archive');

    const [events, projects, seoData] = await Promise.all([
        safeFetch(fetch, `/api/events?${eventsParams.toString()}`),
        safeFetch(fetch, `/api/projects?${projectParams.toString()}`),
        safeFetch(fetch, `/api/seo-settings?${seoParams.toString()}`)
    ]);

    return {
        events,
        projects,
        // Return the first document found, or null if not configured in CMS
        seoSettings: seoData.docs?.[0] || null
    };
}
