import { json } from '@sveltejs/kit';
import { safeFetch, buildQuery } from '$lib/utils/apiHandler.js';

export async function GET({ params, url }) {
    const { slug } = params;

    const queryParams = buildQuery({
        baseParams: url.searchParams, // Pass existing params if you want to allow ?limit=5 etc.
        where: {
            slug: { equals: slug } // Assuming Payload CMS syntax
        }
    });

    const data = await safeFetch('team-members', queryParams);

    if (!data) {
        return json({ error: 'Team member not found' }, { status: 404 });
    }

    return json(data);
}