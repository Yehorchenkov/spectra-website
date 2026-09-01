import { json } from '@sveltejs/kit';
import qs from 'qs';
import { safeFetch, buildQuery } from '$lib/utils/apiHandler.js';
import { NEWS_PAGINATION_LIMIT, NEWS_DEFAULT_FIELDS } from '$lib/config/constants.js';

export async function GET({ url }) {
	// Normalize client-provided `select` (array or object form) into a plain field list
	const parsedSelect = qs.parse(url.searchParams.toString()).select;
	const requestedFields = Array.isArray(parsedSelect)
		? parsedSelect
		: parsedSelect && typeof parsedSelect === 'object'
			? Object.keys(parsedSelect)
			: [];

	const queryParams = buildQuery({
		baseParams: url.searchParams,
		sort: url.searchParams.has('sort') ? undefined : '-publishDate',
		limit: url.searchParams.has('limit') ? undefined : NEWS_PAGINATION_LIMIT,
		select: requestedFields.length ? requestedFields : NEWS_DEFAULT_FIELDS
	});

	const data = await safeFetch('news', queryParams);

	if (!data) {
		return json({ error: 'Failed to fetch news' }, { status: 500 });
	}

	return json(data);
}
