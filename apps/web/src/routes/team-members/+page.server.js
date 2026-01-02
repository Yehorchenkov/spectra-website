import { buildSelectQuery } from '$lib/utils/apiHandler.js';
import { buildSeoQuery } from '$lib/utils/seoFactory.js';

export async function load({ fetch, url }) {

	const teamMembersParams = buildSelectQuery(['name', 'title', 'slug', 'photo', 'order'], 100);
	teamMembersParams.set('sort', 'order');
	
	const seoParams = buildSeoQuery('team-members');

	const [teamMembersRes, seoRes] = await Promise.all([
		fetch(`/api/team-members?${teamMembersParams.toString()}`),
		fetch(`/api/seo-settings?${seoParams.toString()}`)
	]);

	const [teamMembers, seoData] = await Promise.all([teamMembersRes.json(), seoRes.json()]);

	return {
		teamMembers,
		seoSettings: seoData.docs?.[0] || null
	};
}
