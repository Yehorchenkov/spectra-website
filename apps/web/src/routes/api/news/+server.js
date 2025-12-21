import { fetchResource } from '$lib/utils/apiHandler.js';
import { NEWS_LIMIT } from '$lib/config/constants.js';

export async function GET({ fetch, url }) {
    // 1. Check if specific parameters exist, otherwise set defaults
    // This ensures that even if called without params, it returns the newest items
    if (!url.searchParams.has('sort')) {
        url.searchParams.set('sort', '-publishDate');
    }
    
    if (!url.searchParams.has('limit')) {
        url.searchParams.set('limit', NEWS_LIMIT.toString());
    }

    // 2. Pass the modified url object to your existing handler
    // fetchResource will take the 'news' slug and append the searchParams to the API_BASE
    return fetchResource('news', fetch, url);
}