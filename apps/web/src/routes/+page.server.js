import { API_BASE } from '$lib/config/backendApi.js';
import { NEWS_CAROUSEL_LIMIT } from '$lib/config/constants.js';
import { buildQuery, buildSelectQuery } from '$lib/utils/apiHandler.js';
import { buildSeoQuery } from '$lib/utils/seoFactory.js';

export async function load({ fetch }) {
	try {
		// Fetch both hero and news data
		const newsParams = buildQuery({
			page: 1,
			limit: NEWS_CAROUSEL_LIMIT,
			sort: '-publishDate'
		});

		const teamMembersParams = buildSelectQuery(
			['name', 'title', 'slug', 'photo'],
			100
		);

		// Only members shown on landing page
        teamMembersParams.set('where[showOnLandingPage][equals]', 'true');
        // Optional: ensure ordering
        teamMembersParams.set('sort', 'order');

		// const seoParams = buildSeoQuery('home-page');

		const [resHero, resNews, resPartners, resTeamMembers] = await Promise.all([
			fetch(`${API_BASE}/globals/hero`),
			fetch(`/api/news?${newsParams.toString()}`),
			fetch(`/api/partners`),
			fetch(`/api/team-members?${teamMembersParams.toString()}`),
		]);

		if (!resHero.ok) throw new Error(`HTTP error! status: ${resHero.status}`);

		if (!resNews.ok) throw new Error(`HTTP error! status: ${resNews.status}`);

		if (!resPartners.ok) throw new Error(`HTTP error! status: ${resPartners.status}`);

		if (!resTeamMembers.ok) throw new Error(`HTTP error! status: ${resTeamMembers.status}`);

		return {
			heroData: await resHero.json(),
			newsData: await resNews.json(),
			partnersData: await resPartners.json(),
			teamMembersData: await resTeamMembers.json()
		};
	} catch (error) {
		console.error('Failed to load page data:', error);
		return {
			heroData: null,
			newsData: null,
			partnersData: null,
			teamMembersData: null
		};
	}
}
