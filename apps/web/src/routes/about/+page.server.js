import { safeFetch, buildQuery } from '$lib/utils/apiHandler.js';

export async function load() {
    const query = buildQuery({
        where: { slug: { equals: 'about-spectra' } },
        limit: 1
    });
    const res = await safeFetch('pages', query);
    const aboutData = res?.docs?.[0] ?? null;

    return { aboutData };
}