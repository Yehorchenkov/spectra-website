import { E as EVENTS_PAGINATION_LIMIT, a as EVENTS_SEO_SLUG } from "../../../chunks/constants.js";
import { b as buildQuery, a as buildSelectQuery, s as safeFetch } from "../../../chunks/apiHandler.js";
import { b as buildSeoQuery } from "../../../chunks/seoFactory.js";
const prerender = false;
async function load({ url }) {
  const eventsParams = buildQuery({
    baseParams: url.searchParams,
    select: ["title", "subtitle", "slug", "excerpt", "tags", "projects", "eventState", "startDate", "finishDate"],
    limit: EVENTS_PAGINATION_LIMIT
  });
  const projectParams = buildSelectQuery(["acronym", "id"], 100);
  const seoParams = buildSeoQuery(EVENTS_SEO_SLUG);
  const [events, projects, seoData] = await Promise.all([
    safeFetch("/events", eventsParams),
    safeFetch("projects", projectParams),
    safeFetch("seo-settings", seoParams)
  ]);
  return {
    events,
    projects,
    // Return the first document found, or null if not configured in CMS
    seoSettings: seoData.docs?.[0] || null
  };
}
export {
  load,
  prerender
};
