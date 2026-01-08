import { l as escape_html } from "./index.js";
import { B as Badge } from "./Badge.js";
import { twMerge } from "tailwind-merge";
function DateBadge($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { startDate = null, fallback } = $$props;
    const dateObj = startDate ? new Date(startDate) : null;
    const dateParts = (() => {
      if (!dateObj) return null;
      return {
        month: dateObj.toLocaleDateString("en-GB", { month: "short" }),
        day: dateObj.getDate(),
        year: dateObj.getFullYear()
      };
    })();
    $$renderer2.push(`<div class="flex flex-row md:flex-col items-center justify-center md:justify-start md:pt-1 shrink-0 w-full md:w-32 text-center gap-2 md:gap-0">`);
    if (dateParts) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<span class="text-lg font-bold uppercase text-muted-foreground tracking-wider">${escape_html(dateParts.month)}</span> <span class="text-3xl md:text-5xl font-extrabold text-primary leading-none md:my-2">${escape_html(dateParts.day)}</span> <span class="text-base text-muted-foreground font-medium">${escape_html(dateParts.year)}</span>`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (fallback) {
        $$renderer2.push("<!--[-->");
        fallback($$renderer2);
        $$renderer2.push(`<!---->`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<div class="text-muted-foreground size-12 md:size-16 opacity-20 border-2 border-dashed border-current rounded-md flex items-center justify-center">?</div>`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
function EventStateBadge($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { state, size = "sm", class: className = "" } = $$props;
    const stateStyles = {
      past: "bg-destructive/10 text-destructive border-destructive/20",
      ongoing: "bg-warning/10 text-warning border-warning/20",
      // Or 'bg-primary/10 text-primary border-primary/20' 'bg-amber-500/10 text-amber-600 border-amber-500/20'
      upcoming: "bg-success/10 text-success border-success/20"
    };
    const sizeStyles = {
      sm: "px-3 py-1 text-sm",
      md: "px-4 py-2 text-base"
      // one size bigger
    };
    const stateClasses = stateStyles[state] ?? "bg-muted text-muted-foreground";
    const sizeClasses = sizeStyles[size] ?? sizeStyles.sm;
    if (state) {
      $$renderer2.push("<!--[-->");
      Badge($$renderer2, {
        className: twMerge(`${sizeClasses} capitalize ${stateClasses}`, className),
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
  DateBadge as D,
  EventStateBadge as E
};
