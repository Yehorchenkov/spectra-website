import { b as buildQuery } from "./apiHandler.js";
const siteConfig = {
  name: "SPECTRA CE EU",
  url: "https://spectra-perseus.org",
  brandSuffix: " - ",
  description: "Spectra Centre of Excellence EU, Slovakia",
  keywords: `Spectra Centre of Excellence EU, Spatial Planning, Urban Development, Climate Change, Territory Management, European Projects, Horizon 2020, Erasmus+, Interreg`
};
const BRAND = siteConfig.name;
const SEP = siteConfig.brandSuffix;
function normalizePath(path) {
  const p = path || "";
  return (p.endsWith("/") ? p : `${p}/`).replace(/\/+/g, "/");
}
function buildTitle(core) {
  const c = (core || "").trim();
  if (!c) return BRAND;
  if (c.toLowerCase().includes(BRAND.toLowerCase())) return c;
  return `${c}${SEP}${BRAND}`;
}
function joinFilters(items) {
  const arr = (items ?? []).filter(Boolean);
  if (arr.length <= 1) return arr[0] ?? "";
  return `${arr.slice(0, -1).join(", ")} and ${arr[arr.length - 1]}`;
}
function formatTemplate(template, context = {}) {
  if (!template) return "";
  const str = typeof template === "string" ? template : String(template);
  if (str === "[object Object]") return "";
  return str.replace(/{{(\w+)}}/g, (match, key) => {
    return context[key]?.toString() || "";
  });
}
function resolveSeo(seoDoc, opts = {}) {
  const options = opts instanceof URL ? { url: opts } : opts;
  const doc = seoDoc || {};
  const context = options.context ?? {};
  const allowParams = options.allowParams ?? [];
  const pathname = options.pathname ?? options.url?.pathname;
  const rawSearchParams = options.searchParams ?? options.url?.searchParams;
  const searchParams = rawSearchParams instanceof URLSearchParams ? rawSearchParams : rawSearchParams ? new URLSearchParams(rawSearchParams) : new URLSearchParams();
  const isDynamic = !!context.filters || context.page && context.page > 1;
  let title = isDynamic ? doc?.filteredTemplates?.titleTemplate || doc?.label || "" : doc?.meta?.title || doc?.label || "";
  let description = isDynamic ? doc?.filteredTemplates?.descriptionTemplate || doc?.meta?.description : doc?.meta?.description;
  title = formatTemplate(title, context);
  description = formatTemplate(description, context);
  return {
    title: buildTitle(title),
    description: description || siteConfig.description,
    image: doc?.meta?.image?.url,
    // only compute canonical when we know the path
    canonical: pathname ? buildCanonical(pathname, searchParams, allowParams) : void 0,
    // safe even if searchParams was missing
    noindex: (context.page || 1) > 1 || !!searchParams.get("sort")
  };
}
function buildCanonical(pathname, searchParams, allow = []) {
  const base = siteConfig.url.replace(/\/$/, "");
  const path = normalizePath(pathname);
  const kept = new URLSearchParams();
  for (const key of allow) {
    const v = searchParams.get(key);
    if (v) kept.set(key, v);
  }
  const q = kept.toString();
  return q ? `${base}${path}?${q}` : `${base}${path}`;
}
function getFilterContext(qs, data) {
  const filters = [];
  const entities = [
    { param: "projects", source: "projects", label: "acronym" },
    { param: "program.id", source: "programs", label: "title" },
    { param: "coordinator", source: "coordinators", label: "name" }
  ];
  for (const { param, source, label } of entities) {
    const id = qs.get(`where[${param}][equals]`);
    if (id && data?.[source]?.docs) {
      const item = data[source].docs.find((d) => String(d.id) === id);
      if (item?.[label]) {
        filters.push(item[label]);
      }
    }
  }
  const mappings = [
    {
      param: "projectState",
      map: { active: "Active", completed: "Completed" }
    },
    {
      param: "eventState",
      map: { upcoming: "Upcoming", ongoing: "Ongoing", past: "Past" }
    }
  ];
  for (const { param, map } of mappings) {
    const val = qs.get(`where[${param}][equals]`);
    if (val) {
      filters.push(map[val] || val);
    }
  }
  return joinFilters(filters);
}
function getPageParam(qs, key = "page") {
  const n = parseInt(qs.get(key) || "1", 10);
  return isNaN(n) ? 1 : Math.max(1, n);
}
function buildSeoQuery(key) {
  return buildQuery({
    where: { key: { equals: key } },
    limit: 1
  });
}
export {
  getFilterContext as a,
  buildSeoQuery as b,
  getPageParam as g,
  normalizePath as n,
  resolveSeo as r,
  siteConfig as s
};
