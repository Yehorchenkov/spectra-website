export const prerender = false;

import { OUTPUTS_PAGINATION_LIMIT, OUTPUTS_SEO_SLUG, OUTPUTS_DEFAULT_FIELDS } from '$lib/config/constants.js';
import { safeFetch, buildQuery, buildSelectQuery } from '$lib/utils/apiHandler.js';
import { buildSeoQuery } from '$lib/utils/seoFactory.js';

export async function load({ url }) {

    const outputsParams = buildQuery({
        baseParams: url.searchParams,
        limit: OUTPUTS_PAGINATION_LIMIT || 30,
        select: OUTPUTS_DEFAULT_FIELDS
    });

    const projectParams = buildSelectQuery(['acronym', 'id'], 100);

    const teamMembersParams = buildSelectQuery(['name', 'id'], 100);

    const seoParams = buildSeoQuery(OUTPUTS_SEO_SLUG);

    const [outputs, projects, teamMembers, seoData] = await Promise.all([
        safeFetch('outputs', outputsParams),
        safeFetch('projects', projectParams),
        safeFetch('team-members', teamMembersParams),
        safeFetch('seo-settings', seoParams)
    ]);

    return {
        outputs,
        projects,
        teamMembers,
        // Return the first document found, or null if not configured in CMS
        seoSettings: seoData.docs?.[0] || null
    };
}
