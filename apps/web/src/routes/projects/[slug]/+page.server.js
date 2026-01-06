import { error } from '@sveltejs/kit';
import { safeFetch, buildQuery } from '$lib/utils/apiHandler.js';

export async function load({ params, url }) {
    const { slug } = params;

    // 1. Build the query for the CMS
    const queryParams = buildQuery({
        baseParams: url.searchParams,
        where: {
            slug: { equals: slug }
        }
    });

    // 2. Fetch directly from CMS (bypassing internal API)
    const data = await safeFetch('projects', queryParams);

    // 3. Handle 404s
    if (!data || !data.docs || data.docs.length === 0) {
        throw error(404, 'Project not found');
    }

    // 4. Return the specific document
    return {
        project: data.docs[0]
    };
}