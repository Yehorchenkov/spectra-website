import { PROJECTS_PAGINATION_LIMIT } from '$lib/config/constants.js';

export async function load({ fetch, url }) {
    const page = url.searchParams.get('page') || '1';
    const limit = url.searchParams.get('limit') || PROJECTS_PAGINATION_LIMIT.toString();

    // --- Project Fetching ---
    const projectParams = new URLSearchParams(url.searchParams);
    projectParams.set('page', page);
    projectParams.set('limit', limit);

    // Define the specific fields you want in the final response,
    // PLUS any fields required by your backend hooks (like 'projectParticipants').
    const projectSelectFields = [
        'title',
        'acronym',
        'slug',
        'excerpt',
        'projectLogo',
        'program',
        'startDate',
        'finishDate',
        'publishDate',
        'projectParticipants',
        'projectState',
    ];

    projectSelectFields.forEach((field) => {
        projectParams.set(`select[${field}]`, 'true');
    });

    // Depth is still needed to populate 'projectParticipants' before the hook runs
    // projectParams.set('depth', '2');

    const projectQuery = projectParams.toString();
    const projectsRes = await fetch(`/api/projects?${projectQuery}`);
    const projects = await projectsRes.json();

    // --- Program Fetching ---
    const programParams = new URLSearchParams();
    programParams.set('select[title]', 'true');
    programParams.set('select[id]', 'true');

    const programQuery = programParams.toString();
    const programsRes = await fetch(`/api/programs?${programQuery}`);
    const programs = await programsRes.json();

    return { projects, programs };
}