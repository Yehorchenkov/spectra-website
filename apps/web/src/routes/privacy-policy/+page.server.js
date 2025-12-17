import { API_BASE } from '$lib/config/backendApi.js';

export async function load({ fetch }) {
    try {
        const res = await fetch(`${API_BASE}/globals/privacy-policy`);

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const privacyData = await res.json();

        return {
            privacyData
        };
    } catch (error) {
        console.error('Failed to load privacy policy:', error);
        return {
            privacyData: null
        };
    }
}