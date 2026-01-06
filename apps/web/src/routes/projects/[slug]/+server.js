import { fetchResource, buildQuery } from '$lib/utils/apiHandler.js';

export async function GET({ params, fetch, url }) {
	const { slug } = params;

	const queryParams = buildQuery({
		baseParams: url.searchParams, // Pass existing params if you want to allow ?limit=5 etc.
		where: {
			slug: { equals: slug } // Assuming Payload CMS syntax
		}
	});

	// We create a dummy base because fetchResource handles the API_BASE
	const modifiedUrl = new URL(url); 
	modifiedUrl.search = queryParams.toString();

	// This handles errors, JSON parsing, and the trailing slash fix automatically
	return fetchResource('projects', fetch, modifiedUrl);
}