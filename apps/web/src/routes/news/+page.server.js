import { NEWS_PAGINATION_LIMIT } from '$lib/config/constants.js';

export async function load({ fetch, url }) {
    const page = url.searchParams.get('page') || '1';
    const limit = url.searchParams.get('limit') || NEWS_PAGINATION_LIMIT.toString();
    
    const newsParams = new URLSearchParams(url.searchParams);
    newsParams.set('page', page);
    newsParams.set('limit', limit);
    
    const newsSelectFields = [
        'title',
        'slug',
        'excerpt',
        'publishDate',
        'image',
        'tags',
        'projects',
    ];

    newsSelectFields.forEach((field) => {
        newsParams.set(`select[${field}]`, 'true');
    });

    const newsQuery = newsParams.toString();
    const newsRes = await fetch(`/api/news?${newsQuery}`);
    const news = await newsRes.json();

    // --- Project Fetching ---
    const projectParams = new URLSearchParams();
    projectParams.set('select[acronym]', 'true');
    projectParams.set('select[id]', 'true');

    const projectQuery = projectParams.toString();
    const projectsRes = await fetch(`/api/projects?${projectQuery}`);
    const projects = await projectsRes.json();
    
    return { news, projects }
}