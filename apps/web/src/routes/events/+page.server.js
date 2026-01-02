import { EVENTS_PAGINATION_LIMIT } from '$lib/config/constants.js';
import { buildQuery, buildSelectQuery } from '$lib/utils/apiHandler.js';
import { buildSeoQuery } from '$lib/utils/seoFactory.js';

export async function load({ fetch, url }) {
    const page = url.searchParams.get('page') || '1';
    const limit = url.searchParams.get('limit') || EVENTS_PAGINATION_LIMIT.toString();

    const eventsSelectFields = ['title', 'slug', 'excerpt', 'tags', 'projects', 'eventState', 'startDate', 'finishDate'];

    const eventsParams = buildQuery({
        baseParams: url.searchParams,
        page,
        limit,
        select: eventsSelectFields
    });

    const projectParams = buildSelectQuery(['acronym', 'id'], 100);

    const seoParams = buildSeoQuery('events-archive');

    const [eventsRes, projectsRes, seoRes] = await Promise.all([
        fetch(`/api/events?${newsParams.toString()}`),
        fetch(`/api/projects?${projectParams.toString()}`),
        fetch(`/api/seo-settings?${seoParams.toString()}`)
    ]);

    const [events, projects, seoData] = await Promise.all([
        eventsRes.json(),
        projectsRes.json(),
        seoRes.json()
    ]);

    return {
        events,
        projects,
        // Return the first document found, or null if not configured in CMS
        seoSettings: seoData.docs?.[0] || null
    };
}
