export const prerender = false;

import { safeFetch, buildQuery } from '$lib/utils/apiHandler.js';
import { buildSeoQuery } from '$lib/utils/seoFactory.js';

export async function load() {
    // We use buildQuery instead of buildSelectQuery so we can pass 'sort' directly
    const teamMembersParams = buildQuery({
        select: ['title', 'slug', 'logo'],
        limit: 100,
        sort: 'title'
    });

    const seoParams = buildSeoQuery('subcentres');

    const [subcentres, seoData] = await Promise.all([
        safeFetch('subcentres', teamMembersParams),
        safeFetch('seo-settings', seoParams)
    ]);

    return {
        subcentres,
        seoSettings: seoData?.docs?.[0] || null
    };
}
