export const prerender = false;

import { safeFetch, buildQuery } from '$lib/utils/apiHandler.js';
import { buildSeoQuery } from '$lib/utils/seoFactory.js';

export async function load() {
    // We use buildQuery instead of buildSelectQuery so we can pass 'sort' directly
    const partnersParams = buildQuery({
        select: ['name', 'slug', 'website', 'description'],
        limit: 100,
        sort: 'name'
    });

    const seoParams = buildSeoQuery('partners');

    const [partners, seoData] = await Promise.all([
        safeFetch('partners', partnersParams),
        safeFetch('seo-settings', seoParams)
    ]);

    return {
        partners,
        seoSettings: seoData?.docs?.[0] || null
    };
}