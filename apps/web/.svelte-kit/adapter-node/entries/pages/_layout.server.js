import { s as safeFetch } from "../../chunks/apiHandler.js";
async function load() {
  const footerData = await safeFetch("globals/footer");
  return {
    footerData
  };
}
export {
  load
};
