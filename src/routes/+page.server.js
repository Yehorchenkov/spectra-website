import { API_BASE } from '$lib/config/backendApi.js';

export async function load({ fetch }) {
    try {
        // Fetch both hero and news data
        const resHero = await fetch(`${API_BASE}/globals/hero`);
        const resNews = await fetch(`/api/news?sort=-publishDate`);
        const resPartners = await fetch(`/api/partners`);
        const resTeamMembers = await fetch(`/api/team-members`);

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

        const heroData = await resHero.json();
        const newsData = await resNews.json();
        const partnersData = await resPartners.json();
        const teamMembersData = await resTeamMembers.json();

        return {
            heroData,
            newsData,
            partnersData,
            teamMembersData
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