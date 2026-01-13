import { safeFetch } from '$lib/utils/apiHandler.js';

export async function load() {
    // safeFetch automatically handles API_BASE and returns null on error
    const footerData = await safeFetch('globals/footer');
    const headerData = await safeFetch('globals/header');

    return {
        footerData,
        headerData,
    };
}