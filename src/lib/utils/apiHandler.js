import { json } from '@sveltejs/kit';
import { API_BASE } from '$lib/config/backendApi.js';

/**
 * Generic API fetch handler for GET requests
 * @param {string} resource - API resource path (e.g., 'projects', 'programs')
 * @param {Function} fetch - Fetch function from SvelteKit
 * @param {URL} url - URL object from the request
 * @param {Object} options - Additional options (headers, etc.)
 * @returns {Promise<Response>} JSON response
 */
export async function fetchResource(resource, fetch, url, options = {}) {
    const fullUrl = `${API_BASE}/${resource}${url.search}`;
    // console.log(`Fetching ${resource} from:`, url.search);

    try {
        const response = await fetch(fullUrl, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            }
        });

        if (!response.ok) {
            throw new Error(`Error fetching ${resource}: ${response.status}`);
        }

        const data = await response.json();
        return json(data);
    } catch (err) {
        console.error(`Failed to fetch ${resource}:`, err);
        return json({ error: `Failed to fetch ${resource}`, message: err.message }, { status: 500 });
    }
}