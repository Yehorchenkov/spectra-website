import { ag as hasContext, ah as getContext } from "./index.js";
let contextKey = Symbol("phosphor-svelte");
function getIconContext() {
  if (hasContext(contextKey)) {
    return getContext(contextKey);
  }
  return {};
}
export {
  getIconContext as g
};
