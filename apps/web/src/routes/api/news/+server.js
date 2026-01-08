import { json } from '@sveltejs/kit';
import { safeFetch, buildQuery } from '$lib/utils/apiHandler.js';
import { NEWS_PAGINATION_LIMIT, NEWS_DEFAULT_FIELDS } from '$lib/config/constants.js';

export async function GET({ url }) {
    // Check if the incoming request already has field selections
    const hasFields = Array.from(url.searchParams.keys()).some(k => k.startsWith('select['));

    // Use buildQuery to merge incoming params with defaults
    // This returns a string (e.g., "limit=10&sort=-date...")
    const queryParams = buildQuery({
        baseParams: url.searchParams,
        sort: url.searchParams.has('sort') ? undefined : '-publishDate',
        limit: url.searchParams.has('limit') ? undefined : NEWS_PAGINATION_LIMIT,
        select: hasFields ? [] : NEWS_DEFAULT_FIELDS
    });

    // Pass the query string directly to safeFetch
    // safeFetch handles the Base URL and error catching internally
    const data = await safeFetch('news', queryParams);

    if (!data) {
        return json({ error: 'Failed to fetch news' }, { status: 500 });
    }

    return json(data);
}