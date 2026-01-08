import { b as NEWS_PAGINATION_LIMIT, d as NEWS_SEO_SLUG } from "../../../chunks/constants.js";
import { b as buildQuery, a as buildSelectQuery, s as safeFetch } from "../../../chunks/apiHandler.js";
import { b as buildSeoQuery } from "../../../chunks/seoFactory.js";
const prerender = false;
async function load({ url }) {
  const newsParams = buildQuery({
    baseParams: url.searchParams,
    limit: NEWS_PAGINATION_LIMIT,
    select: ["title", "slug", "excerpt", "publishDate", "image", "tags", "projects"]
  });
  const projectParams = buildSelectQuery(["acronym", "id"], 100);
  const seoParams = buildSeoQuery(NEWS_SEO_SLUG);
  const [news, projects, seoData] = await Promise.all([
    safeFetch("news", newsParams),
    safeFetch("projects", projectParams),
    safeFetch("seo-settings", seoParams)
  ]);
  return {
    news,
    projects,
    // Return the first document found, or null if not configured in CMS
    seoSettings: seoData.docs?.[0] || null
  };
}
export {
  load,
  prerender
};
