// import { json } from '@sveltejs/kit';
import { ofetch } from 'ofetch';
import qs from 'qs';
import { API_BASE } from '$lib/config/backendApi.js';

/**
 * Create a pre-configured fetch instance.
 * - Base URL set automatically
 * - Retries failed requests 1 time by default
 * - Throws automatically on 4xx/5xx errors
 */
const api = ofetch.create({
	baseURL: API_BASE,
	retry: 1,
	headers: {
		'Content-Type': 'application/json'
	},
    // Optional: Global error logger
	async onResponseError({ request, response, options }) {
		console.error(`[API Error] ${request}`, response.status, response.statusText);
	}
});

/**
 * Helper to build complex query strings using 'qs'.
 * Handles nested 'where' filters and 'select' arrays automatically.
 */
export function buildQuery({ baseParams = null, page, limit, select = [], sort, where = {} } = {}) {
    // 1. Parse baseParams using qs to ensure nested keys (like filters) are objects, not flat strings.
    // baseParams can be URLSearchParams or a string
    let baseObj = {};
    if (baseParams) {
        const paramString = baseParams.toString();
        // ignoreQueryPrefix handles the leading '?' if present
        baseObj = qs.parse(paramString, { ignoreQueryPrefix: true });
    }

    // 2. Prepare Select fields
    const selectObj = {};
    if (Array.isArray(select)) {
        select.forEach(field => selectObj[field] = 'true');
    }

    // 3. Merge params. 
    // Explicit arguments (page, limit, sort) override baseParams.
    const queryObj = {
        ...baseObj,
        ...(page && { page }),
        ...(limit && { limit }),
        ...(sort && { sort }),
        // Merge select: combine base URL selects with code-defined selects if needed, 
        // or simply overwrite. Here we overwrite to ensure consistency.
        ...(Object.keys(selectObj).length > 0 && { select: selectObj }),
        // Merge where: Deep merge is safer, but usually we just want to add new filters
        where: {
            ...(baseObj.where || {}),
            ...where
        }
    };

    return qs.stringify(queryObj, { 
        encode: true, 
        skipNulls: true,
        arrayFormat: 'brackets' 
    });
}


/**
 * Helper for selection only (dropdowns, etc)
 */
export function buildSelectQuery(fields = [], limit = 100) {
	return buildQuery({ select: fields, limit });
}

/**
 * Safely fetches data from an endpoint. 
 * Returns null instead of throwing an error if the request fails.
 */
export async function safeFetch(endpoint, queryParams = '') {
	try {
        const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
        // api() automatically handles the base URL
		return await api(cleanEndpoint + (queryParams ? `?${queryParams}` : ''));
	} catch (err) {
        // Error is already logged by onResponseError above
		return null;
	}
}