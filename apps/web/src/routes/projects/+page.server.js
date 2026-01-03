import { PROJECTS_PAGINATION_LIMIT } from '$lib/config/constants.js';
import { safeFetch, buildQuery, buildSelectQuery } from '$lib/utils/apiHandler.js';
import { buildSeoQuery } from '$lib/utils/seoFactory.js';

export async function load({ fetch, url }) {
	const page = url.searchParams.get('page') || '1';

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
		'projectState'
	];

	const projectParams = buildQuery({
		baseParams: url.searchParams,
		page,
		select: projectSelectFields
	});

	const programParams = buildSelectQuery(['title', 'id'], 100);

	const seoParams = buildSeoQuery('projects-archive');

	const [projects, programs, seoData] = await Promise.all([
		safeFetch(fetch, `/api/projects?${projectParams.toString()}`),
		safeFetch(fetch, `/api/programs?${programParams.toString()}`),
		safeFetch(fetch, `/api/seo-settings?${seoParams.toString()}`)
	]);

	return {
		projects,
		programs,
		seoSettings: seoData.docs?.[0] || null
	};
}
