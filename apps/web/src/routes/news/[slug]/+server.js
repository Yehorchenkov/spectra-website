import { json } from '@sveltejs/kit';
import { safeFetch, buildQuery } from '$lib/utils/apiHandler.js';

export async function GET({ params, url }) {
    const { slug } = params;

    const queryParams = buildQuery({
        baseParams: url.searchParams, // Preserves external params like ?draft=true
        where: {
            slug: { equals: slug }
        }
    });

    const data = await safeFetch('news', queryParams);

    if (!data) {
        return json({ error: 'News item not found' }, { status: 404 });
    }

    return json(data);
}