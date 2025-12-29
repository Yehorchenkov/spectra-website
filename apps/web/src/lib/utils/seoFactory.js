import { siteConfig } from '$lib/config/site';
import { buildQuery } from './apiHandler';

const BRAND = siteConfig.name;
const SEP = siteConfig.brandSuffix || ' - ';

/** Ensure URL has trailing slash and no double slashes */
export function normalizePath(path) {
    // If path is null or undefined, default to empty string
    const p = path || '';
	return (p.endsWith('/') ? p : `${p}/`).replace(/\/+/g, '/');
}

/** Build Title: "Page Name - Brand" */
export function buildTitle(core) {
	const c = (core || '').trim();
	if (!c) return BRAND;
	// If the title already contains the brand, don't append it again
	if (c.toLowerCase().includes(BRAND.toLowerCase())) return c;
	return `${c}${SEP}${BRAND}`;
}

export function joinFilters(items) {
	const arr = (items ?? []).filter(Boolean);
	if (arr.length <= 1) return arr[0] ?? '';
	return `${arr.slice(0, -1).join(', ')} and ${arr[arr.length - 1]}`;
}

/**
 * Replaces {{key}} with values from a context object
 */
export function formatTemplate(template, context = {}) {
	if (!template) return '';

	// Ensure we are working with a string.
	// If val is an object (e.g. from a CMS rich text or i18n field), convert it or fall back.
	const str = typeof template === 'string' ? template : String(template);

	if (str === '[object Object]') return ''; // Safety check for CMS objects

	return str.replace(/{{(\w+)}}/g, (match, key) => {
		return context[key]?.toString() || '';
	});
}

/**
 * Resolves SEO metadata from a CMS doc, applying template context and defaults.
 */
export function resolveSeo(seoDoc, opts = {}) {
	// allow calling resolveSeo(doc, page.url)
	const options = opts instanceof URL ? { url: opts } : opts;

	const doc = seoDoc || {};
	const context = options.context ?? {};
	const allowParams = options.allowParams ?? [];

	// Prefer url, but still accept pathname/searchParams (backwards compatible)
	const pathname = options.pathname ?? options.url?.pathname;
	const rawSearchParams = options.searchParams ?? options.url?.searchParams;

	const searchParams =
		rawSearchParams instanceof URLSearchParams
			? rawSearchParams
			: rawSearchParams
				? new URLSearchParams(rawSearchParams)
				: new URLSearchParams();

	const isDynamic = !!context.filters || (context.page && context.page > 1);

	let title = isDynamic
		? doc?.filteredTemplates?.titleTemplate || doc?.label || ''
		: doc?.meta?.title || doc?.label || '';

	let description = isDynamic
		? doc?.filteredTemplates?.descriptionTemplate || doc?.meta?.description
		: doc?.meta?.description;

	title = formatTemplate(title, context);
	description = formatTemplate(description, context);

	return {
		title: buildTitle(title),
		description: description || siteConfig.description,
		image: doc?.meta?.image?.url,

		// only compute canonical when we know the path
		canonical: pathname ? buildCanonical(pathname, searchParams, allowParams) : undefined,

		// safe even if searchParams was missing
		noindex: (context.page || 1) > 1 || !!searchParams.get('sort')
	};
}
// export function resolveSeo(
// 	seoDoc,
// 	{ context = {}, pathname, searchParams = new URLSearchParams(), allowParams = [] } = {}
// ) {
//     // Fallback if seoDoc is null/undefined
//     const doc = seoDoc || {};
// 	const isDynamic = !!context.filters || (context.page && context.page > 1);

// 	// 1. Determine base title/description from CMS or labels
// 	let title = isDynamic
// 		? doc?.filteredTemplates?.titleTemplate || doc?.label || ''
// 		: doc?.meta?.title || doc?.label || '';

// 	let description = isDynamic
// 		? doc?.filteredTemplates?.descriptionTemplate || doc?.meta?.description
// 		: doc?.meta?.description;

// 	title = formatTemplate(title, context);
// 	description = formatTemplate(description, context);

// 	return {
// 		title: buildTitle(title),
// 		description: description || siteConfig.description,
// 		image: doc?.meta?.image?.url,
// 		canonical: buildCanonical(pathname, searchParams, allowParams),
// 		// SEO logic: noindex if we are on a filtered/sorted page beyond the basics
// 		noindex: (context.page || 1) > 1 || !!searchParams.get('sort')
// 	};
// }

/** Generate canonical URL with specific allowed query params */
export function buildCanonical(pathname, searchParams, allow = []) {
	const base = siteConfig.url.replace(/\/$/, '');
	const path = normalizePath(pathname);

	const kept = new URLSearchParams();
	for (const key of allow) {
		const v = searchParams.get(key);
		if (v) kept.set(key, v);
	}

	const q = kept.toString();
	return q ? `${base}${path}?${q}` : `${base}${path}`;
}

/** Helper to extract readable filter names */
export function getFilterContext(qs, data) {
	const list = [];
	const projectId = qs.get('where[projects][equals]');
	if (projectId && data.projects?.docs) {
		const project = data.projects.docs.find((p) => String(p.id) === projectId);
		if (project) list.push(project.acronym);
	}

	const programId = qs.get('where[program][equals]');
	if (programId && data.programs?.docs) {
		const program = data.programs.docs.find((p) => String(p.id) === programId);
		if (program) list.push(program.name);
	}

	const coordId = qs.get('where[coordinator][equals]');
	if (coordId && data.coordinators?.docs) {
		const coord = data.coordinators.docs.find((c) => String(c.id) === coordId);
		if (coord) list.push(coord.name);
	}

	return joinFilters(list);
}

export function getPageParam(qs, key = 'page') {
	const n = parseInt(qs.get(key) || '1', 10);
	return isNaN(n) ? 1 : Math.max(1, n);
}

export function buildSeoQuery(key) {
    return buildQuery({
        where: { 'where[key][equals]': key },
        limit: 1
    });
}