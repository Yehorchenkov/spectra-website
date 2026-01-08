import { p as page } from "../../../chunks/index2.js";
import { B as Breadcrumb } from "../../../chunks/Breadcrumb.js";
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { children } = $$props;
    let currentPageTitle = page.data.events?.title;
    $$renderer2.push(`<div class="bg-background flex w-full flex-col items-center"><div class="flex max-w-screen-xl w-full justify-start px-2 mt-4">`);
    Breadcrumb($$renderer2, { class: "", currentPageTitle });
    $$renderer2.push(`<!----></div> <div class="w-full flex justify-center">`);
    children($$renderer2);
    $$renderer2.push(`<!----></div></div>`);
  });
}
export {
  _layout as default
};
