import { N as NEWS_CAROUSEL_LIMIT } from "../../chunks/constants.js";
import { b as buildQuery, s as safeFetch } from "../../chunks/apiHandler.js";
async function load() {
  const newsParams = buildQuery({
    limit: NEWS_CAROUSEL_LIMIT,
    select: ["title", "slug", "image", "excerpt", "publishDate"]
  });
  const teamMembersParams = buildQuery({
    select: ["name", "title", "slug", "photo"],
    limit: 100,
    sort: "order",
    where: {
      showOnLandingPage: { equals: "true" }
    }
  });
  const [heroData, newsData, partnersData, teamMembersData] = await Promise.all([
    safeFetch("globals/hero"),
    safeFetch("news", newsParams),
    safeFetch("partners"),
    safeFetch("team-members", teamMembersParams)
  ]);
  return {
    heroData,
    newsData,
    partnersData,
    teamMembersData
  };
}
export {
  load
};
