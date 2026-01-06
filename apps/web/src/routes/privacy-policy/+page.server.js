import { API_BASE } from '$lib/config/backendApi.js';
import { safeFetch } from '$lib/utils/apiHandler.js';

export async function load({ fetch }) {
    // safeFetch handles the try/catch, 404/500 checks, and JSON parsing automatically.
    const privacyData = await safeFetch(fetch, `${API_BASE}/globals/privacy-policy`);

    return {
        privacyData
    };
}