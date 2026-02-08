export const prerender = false;

import { safeFetch, buildQuery } from '$lib/utils/apiHandler.js';
import { buildSeoQuery } from '$lib/utils/seoFactory.js';

export async function load() {
    const subcentresParams = buildQuery({
        select: ['title', 'slug', 'logo'],
        limit: 100,
        sort: 'title'
    });

    const seoParams = buildSeoQuery('subcentres');

    const [subcentres, seoData] = await Promise.all([
        safeFetch('subcentres', subcentresParams),
        safeFetch('seo-settings', seoParams)
    ]);

    return {
        subcentres,
        seoSettings: seoData?.docs?.[0] || null
    };
}
