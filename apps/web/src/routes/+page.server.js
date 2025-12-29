import { API_BASE } from '$lib/config/backendApi.js';
import { NEWS_LIMIT } from '$lib/config/constants.js';
import { buildQuery } from '$lib/utils/apiHandler.js';
import { buildSeoQuery } from '$lib/utils/seoFactory.js';

export async function load({ fetch }) {
	try {
		// Fetch both hero and news data
		const newsParams = buildQuery({
			page: 1,
			limit: NEWS_LIMIT,
			sort: '-publishDate'
		});

		const seoParams = buildSeoQuery('home-page');

		const [resHero, resNews, resPartners, resTeamMembers] = await Promise.all([
			fetch(`${API_BASE}/globals/hero`),
			fetch(`/api/news?${newsParams.toString()}`),
			fetch(`/api/partners`),
			fetch(`/api/team-members`)
		]);

		if (!resHero.ok) {
			throw new Error(`HTTP error! status: ${resHero.status}`);
		}

		if (!resNews.ok) {
			throw new Error(`HTTP error! status: ${resNews.status}`);
		}

		if (!resPartners.ok) {
			throw new Error(`HTTP error! status: ${resPartners.status}`);
		}

		if (!resTeamMembers.ok) {
			throw new Error(`HTTP error! status: ${resTeamMembers.status}`);
		}

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
