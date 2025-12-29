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

/**
 * Generic helper to convert an object into URLSearchParams.
 * It can merge with existing params or start fresh.
 */

export function buildQuery({ baseParams = null, page, limit, select = [], sort, where = {} } = {}) {
	// Start with existing params (like filters) or a fresh object
	const params = baseParams ? new URLSearchParams(baseParams) : new URLSearchParams();

	// Set Pagination
	if (page) params.set('page', String(page));
	if (limit) params.set('limit', String(limit));
    if (sort) params.set('sort', sort);

	// Set Field Selection (Handles the select[field]=true logic)
	if (Array.isArray(select)) {
		for (const field of select) {
			params.set(`select[${field}]`, 'true');
		}
	}

    // Set Where Filters
    for (const [key, value] of Object.entries(where)) {
        if (value !== undefined && value !== null) {
            params.set(key, String(value));
        }
    }

	return params;
}

/**
 * Specialized helper for fetching lists with specific field selections.
 * Useful for dropdowns, badges, and filters.
 */
export function buildSelectQuery(fields = [], limit = 100) {
	return buildQuery({ select: fields, limit });
}
