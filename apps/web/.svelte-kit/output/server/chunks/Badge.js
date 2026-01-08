import { ai as element, h as attr, t as attr_class, u as clsx } from "./index.js";
import { twMerge } from "tailwind-merge";
function Badge($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { as = "span", href, className = "", children } = $$props;
    element(
      $$renderer2,
      as,
      () => {
        $$renderer2.push(`${attr("href", href)}${attr_class(clsx(twMerge("inline-flex items-center rounded-full font-medium ", className)))}`);
      },
      () => {
        children?.($$renderer2);
        $$renderer2.push(`<!---->`);
      }
    );
  });
}
export {
  Badge as B
};
