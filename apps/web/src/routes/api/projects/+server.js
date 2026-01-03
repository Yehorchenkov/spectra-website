import { fetchResource, buildQuery } from '$lib/utils/apiHandler.js';
import { PROJECTS_PAGINATION_LIMIT, PROJECTS_DEFAULT_FIELDS } from '$lib/config/constants.js';

export async function GET({ fetch, url }) {
    // Check if the incoming request already has field selections
    const hasFields = Array.from(url.searchParams.keys()).some(k => k.startsWith('select['));

    // Use buildQuery to merge incoming params with defaults
    const params = buildQuery({
        baseParams: url.searchParams,
        // Only apply defaults if the incoming request is missing these keys
        sort: url.searchParams.has('sort') ? undefined : '-startDate',
        limit: url.searchParams.has('limit') ? undefined : PROJECTS_PAGINATION_LIMIT,
        select: hasFields ? [] : PROJECTS_DEFAULT_FIELDS
    });

    // CLONE the URL to make it mutable
    const modifiedUrl = new URL(url);
    modifiedUrl.search = params.toString();

    return fetchResource('projects', fetch, modifiedUrl);
}
