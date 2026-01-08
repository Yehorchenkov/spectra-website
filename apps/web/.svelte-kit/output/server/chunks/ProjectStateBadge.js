import { l as escape_html } from "./index.js";
import { B as Badge } from "./Badge.js";
import { twMerge } from "tailwind-merge";
function ProjectStateBadge($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { state, class: className = "" } = $$props;
    const stateStyles = {
      active: "bg-success/10 text-success border-success/20",
      completed: "bg-destructive/10 text-destructive border-destructive/20"
    };
    const stateClasses = stateStyles[state] ?? "bg-muted text-muted-foreground";
    if (state) {
      $$renderer2.push("<!--[-->");
      Badge($$renderer2, {
        className: twMerge(`px-3 py-1 text-sm capitalize ${stateClasses}`, className),
        children: ($$renderer3) => {
          $$renderer3.push(`<!---->${escape_html(state)}`);
        }
      });
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
export {
  ProjectStateBadge as P
};
