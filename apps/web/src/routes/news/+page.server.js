export async function load({ fetch, url }) {
    const newsParams = new URLSearchParams(url.searchParams);
    
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