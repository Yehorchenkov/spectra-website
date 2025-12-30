import { PROJECTS_PAGINATION_LIMIT } from '$lib/config/constants.js';
import { buildQuery, buildSelectQuery } from '$lib/utils/apiHandler.js';
import { buildSeoQuery } from '$lib/utils/seoFactory.js';

export async function load({ fetch, url }) {
	const page = url.searchParams.get('page') || '1';
	const limit = url.searchParams.get('limit') || PROJECTS_PAGINATION_LIMIT.toString();

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
		limit,
		select: projectSelectFields
	});

	const programParams = buildSelectQuery(['title', 'id'], 100);

	const seoParams = buildSeoQuery('projects-archive');

	const [projectRes, programRes, seoRes] = await Promise.all([
		fetch(`/api/projects?${projectParams.toString()}`),
		fetch(`/api/programs?${programParams.toString()}`),
		fetch(`/api/seo-settings?${seoParams.toString()}`)
	]);

	const [projects, programs, seoData] = await Promise.all([
		projectRes.json(),
		programRes.json(),
		seoRes.json()
	]);

	return {
		projects,
		programs,
		seoSettings: seoData.docs?.[0] || null
	};
}
