import { error } from "@sveltejs/kit";
import { b as buildQuery, s as safeFetch } from "../../../../chunks/apiHandler.js";
async function load({ params, url }) {
  const { slug } = params;
  const queryParams = buildQuery({
    baseParams: url.searchParams,
    where: {
      slug: { equals: slug }
    }
  });
  const data = await safeFetch("projects", queryParams);
  if (!data || !data.docs || data.docs.length === 0) {
    throw error(404, "Project not found");
  }
  return {
    project: data.docs[0]
  };
}
export {
  load
};
