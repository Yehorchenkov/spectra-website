export const prerender = false;

import { safeFetch, buildQuery } from '$lib/utils/apiHandler.js';
import { buildSeoQuery } from '$lib/utils/seoFactory.js';

export async function load() {
    // We use buildQuery instead of buildSelectQuery so we can pass 'sort' directly
    const teamMembersParams = buildQuery({
        select: ['name', 'title', 'slug', 'photo', 'order'],
        limit: 100,
        sort: 'order'
    });

    const seoParams = buildSeoQuery('team-members');

    const [teamMembers, seoData] = await Promise.all([
        safeFetch('team-members', teamMembersParams),
        safeFetch('seo-settings', seoParams)
    ]);

    return {
        teamMembers,
        seoSettings: seoData?.docs?.[0] || null
    };
}
