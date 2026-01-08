import { ofetch } from "ofetch";
import qs from "qs";
const API_BASE = "http://localhost:3000/api";
const api = ofetch.create({
  baseURL: API_BASE,
  retry: 1,
  headers: {
    "Content-Type": "application/json"
  },
  // Optional: Global error logger
  async onResponseError({ request, response, options }) {
    console.error(`[API Error] ${request}`, response.status, response.statusText);
  }
});
function buildQuery({ baseParams = null, page, limit, select = [], sort, where = {} } = {}) {
  let baseObj = {};
  if (baseParams) {
    const paramString = baseParams.toString();
    baseObj = qs.parse(paramString, { ignoreQueryPrefix: true });
  }
  const selectObj = {};
  if (Array.isArray(select)) {
    select.forEach((field) => selectObj[field] = "true");
  }
  const queryObj = {
    ...baseObj,
    ...page && { page },
    ...limit && { limit },
    ...sort && { sort },
    // Merge select: combine base URL selects with code-defined selects if needed, 
    // or simply overwrite. Here we overwrite to ensure consistency.
    ...Object.keys(selectObj).length > 0 && { select: selectObj },
    // Merge where: Deep merge is safer, but usually we just want to add new filters
    where: {
      ...baseObj.where || {},
      ...where
    }
  };
  return qs.stringify(queryObj, {
    encode: true,
    skipNulls: true,
    arrayFormat: "brackets"
  });
}
function buildSelectQuery(fields = [], limit = 100) {
  return buildQuery({ select: fields, limit });
}
async function safeFetch(endpoint, queryParams = "") {
  try {
    const cleanEndpoint = endpoint.startsWith("/") ? endpoint.slice(1) : endpoint;
    return await api(cleanEndpoint + (queryParams ? `?${queryParams}` : ""));
  } catch (err) {
    return null;
  }
}
export {
  buildSelectQuery as a,
  buildQuery as b,
  safeFetch as s
};
