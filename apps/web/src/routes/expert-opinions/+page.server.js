export const prerender = false;

import { EXPERT_OPINIONS_PAGINATION_LIMIT, EXPERT_OPINIONS_SEO_SLUG, EXPERT_OPINIONS_DEFAULT_FIELDS } from '$lib/config/constants.js';
import { safeFetch, buildQuery, buildSelectQuery } from '$lib/utils/apiHandler.js';
import { buildSeoQuery } from '$lib/utils/seoFactory.js';

export async function load({ url }) {

    const expertOpinionsParams = buildQuery({
        baseParams: url.searchParams,
        limit: EXPERT_OPINIONS_PAGINATION_LIMIT || 10,
        select: EXPERT_OPINIONS_DEFAULT_FIELDS
    });

    const tagsParams = buildSelectQuery(['name', 'id'], 100);

    const seoParams = buildSeoQuery(EXPERT_OPINIONS_SEO_SLUG);

    const [expertOpinions, tags, seoData] = await Promise.all([
        safeFetch('expert-opinions', expertOpinionsParams),
        safeFetch('tags', tagsParams),
        safeFetch('seo-settings', seoParams)
    ]);

    return {
        expertOpinions,
        tags,
        // Return the first document found, or null if not configured in CMS
        seoSettings: seoData.docs?.[0] || null
    };
}
