import { PROJECTS_PAGINATION_LIMIT, PROJECTS_SEO_SLUG } from '$lib/config/constants.js';
import { safeFetch, buildQuery, buildSelectQuery } from '$lib/utils/apiHandler.js';
import { buildSeoQuery } from '$lib/utils/seoFactory.js';

export async function load({ url }) {
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
		select: projectSelectFields,
		limit: PROJECTS_PAGINATION_LIMIT || 10
	});

	const programParams = buildSelectQuery(['title', 'id'], 100);

	const seoParams = buildSeoQuery(PROJECTS_SEO_SLUG);

	const [projects, programs, seoData] = await Promise.all([
		safeFetch('projects', projectParams),
		safeFetch('programs', programParams),
		safeFetch('seo-settings', seoParams)
	]);

	return {
		projects,
		programs,
		seoSettings: seoData.docs?.[0] || null
	};
}
