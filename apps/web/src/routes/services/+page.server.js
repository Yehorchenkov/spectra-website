import { safeFetch, buildQuery } from '$lib/utils/apiHandler.js';

export async function load() {
    // fetch first page with slug = privacy-policy
    const query = buildQuery({
        where: { slug: { equals: 'services' } },
        limit: 1
    });
    const res = await safeFetch('pages', query);
    const servicesData = res?.docs?.[0] ?? null;

    return { servicesData };
}