export async function load({ fetch, url }) {
    const newsParams = new URLSearchParams(url.searchParams);
    
    const newsSelectFields = [
        'title',
        'slug',
        'excerpt',
        'publishDate',
        'image',
    ];

    newsSelectFields.forEach((field) => {
        newsParams.set(`select[${field}]`, 'true');
    });

    const newsQuery = newsParams.toString();
    const newsRes = await fetch(`/api/news?${newsQuery}`);
    const news = await newsRes.json();
    
    return { news }
}