import { s as safeFetch } from "../../../chunks/apiHandler.js";
async function load({ fetch }) {
  const privacyData = await safeFetch("globals/privacy-policy");
  return {
    privacyData
  };
}
export {
  load
};
