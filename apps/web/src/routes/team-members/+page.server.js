import { safeFetch, buildSelectQuery } from '$lib/utils/apiHandler.js';
import { buildSeoQuery } from '$lib/utils/seoFactory.js';

export async function load({ fetch, url }) {

	const teamMembersParams = buildSelectQuery(['name', 'title', 'slug', 'photo', 'order'], 100);
	teamMembersParams.set('sort', 'order');
	
	const seoParams = buildSeoQuery('team-members');

	const [teamMembers, seoData] = await Promise.all([
		safeFetch(fetch, `/api/team-members?${teamMembersParams.toString()}`),
		safeFetch(fetch, `/api/seo-settings?${seoParams.toString()}`)
	]);

	return {
		teamMembers,
		seoSettings: seoData.docs?.[0] || null
	};
}
