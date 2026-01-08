import { P as PROJECTS_PAGINATION_LIMIT, e as PROJECTS_SEO_SLUG } from "../../../chunks/constants.js";
import { b as buildQuery, a as buildSelectQuery, s as safeFetch } from "../../../chunks/apiHandler.js";
import { b as buildSeoQuery } from "../../../chunks/seoFactory.js";
const prerender = false;
async function load({ url }) {
  const projectSelectFields = [
    "title",
    "acronym",
    "slug",
    "excerpt",
    "projectLogo",
    "program",
    "startDate",
    "finishDate",
    "publishDate",
    "projectParticipants",
    "projectState"
  ];
  const projectParams = buildQuery({
    baseParams: url.searchParams,
    select: projectSelectFields,
    limit: PROJECTS_PAGINATION_LIMIT
  });
  const programParams = buildSelectQuery(["title", "id"], 100);
  const seoParams = buildSeoQuery(PROJECTS_SEO_SLUG);
  const [projects, programs, seoData] = await Promise.all([
    safeFetch("projects", projectParams),
    safeFetch("programs", programParams),
    safeFetch("seo-settings", seoParams)
  ]);
  return {
    projects,
    programs,
    seoSettings: seoData.docs?.[0] || null
  };
}
export {
  load,
  prerender
};
