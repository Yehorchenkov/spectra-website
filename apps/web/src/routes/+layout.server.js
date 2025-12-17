import { API_BASE } from '$lib/config/backendApi.js';

export async function load({ fetch }) {
    try {
        const resFooter = await fetch(`${API_BASE}/globals/footer`);

        if (!resFooter.ok) {
            throw new Error(`HTTP error! status: ${resFooter.status}`);
        }

        const footerData = await resFooter.json();

        return {
            footerData
        };
    } catch (error) {
        console.error('Failed to load footer data:', error);
        return {
            footerData: null
        };
    }
}