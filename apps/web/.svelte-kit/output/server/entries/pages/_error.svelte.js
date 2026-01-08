import { l as escape_html } from "../../chunks/index.js";
import { p as page } from "../../chunks/index2.js";
import { a as ButtonLink } from "../../chunks/buttonLink.js";
function _error($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<div class="grid h-screen place-content-center px-4"><div class="text-center"><h1 class="text-9xl font-bold text-primary">${escape_html(page.status)}</h1> <p class="text-lg mb-6">${escape_html(page.error.message)}</p> `);
    ButtonLink($$renderer2, {
      href: "/",
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->Go back to home`);
      }
    });
    $$renderer2.push(`<!----></div></div>`);
  });
}
export {
  _error as default
};
