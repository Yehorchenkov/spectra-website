import { fetchResource, buildQuery } from '$lib/utils/apiHandler.js';

export async function GET({ fetch, url }) {
    const params = buildQuery({
        baseParams: url.searchParams,
        limit: 1, // Ensure we only get 1 result
    });
    
    const modifiedUrl = new URL(url);
    
    modifiedUrl.search = params.toString();
    
    return fetchResource('seo-settings', fetch, modifiedUrl);
}