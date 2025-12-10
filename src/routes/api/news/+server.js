import { fetchResource } from '$lib/utils/apiHandler.js';

export async function GET({ fetch, url }) {
    return fetchResource('news', fetch, url);
}