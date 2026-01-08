import { b as buildQuery, s as safeFetch } from "../../../chunks/apiHandler.js";
import { b as buildSeoQuery } from "../../../chunks/seoFactory.js";
async function load() {
  const teamMembersParams = buildQuery({
    select: ["name", "title", "slug", "photo", "order"],
    limit: 100,
    sort: "order"
  });
  const seoParams = buildSeoQuery("team-members");
  const [teamMembers, seoData] = await Promise.all([
    safeFetch("team-members", teamMembersParams),
    safeFetch("seo-settings", seoParams)
  ]);
  return {
    teamMembers,
    seoSettings: seoData?.docs?.[0] || null
  };
}
export {
  load
};
