import { error } from "@sveltejs/kit";
import { b as buildQuery, s as safeFetch } from "../../../../chunks/apiHandler.js";
const prerender = false;
async function load({ params, url }) {
  const { slug } = params;
  const queryParams = buildQuery({
    baseParams: url.searchParams,
    where: {
      slug: { equals: slug }
    }
  });
  const data = await safeFetch("team-members", queryParams);
  if (!data || !data.docs || data.docs.length === 0) {
    throw error(404, "Team member not found");
  }
  return {
    teamMember: data.docs[0]
  };
}
export {
  load,
  prerender
};
