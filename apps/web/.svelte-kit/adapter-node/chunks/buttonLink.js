import { i as element, o as bind_props, c as attributes, j as attr_class, k as clsx } from "./index.js";
import { twMerge } from "tailwind-merge";
function Button($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      href,
      type,
      children,
      disabled = false,
      ref = null,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    element(
      $$renderer2,
      href ? "a" : "button",
      () => {
        $$renderer2.push(`${attributes({
          "data-button-root": true,
          type: href ? void 0 : type,
          href: href && !disabled ? href : void 0,
          disabled: href ? void 0 : disabled,
          "aria-disabled": href ? disabled : void 0,
          role: href && disabled ? "link" : void 0,
          tabindex: href && disabled ? -1 : 0,
          ...restProps
        })}`);
      },
      () => {
        children?.($$renderer2);
        $$renderer2.push(`<!---->`);
      }
    );
    bind_props($$props, { ref });
  });
}
function ButtonLink($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      class: className,
      href,
      external = false,
      variant = "default",
      size = "md",
      icon,
      children
    } = $$props;
    const variants = {
      default: "text-primary hover:text-primary/80",
      muted: "text-muted-foreground hover:text-foreground",
      accent: "text-accent-foreground hover:text-accent-foreground/80"
    };
    const underlineVariants = {
      default: "after:bg-primary",
      muted: "after:bg-foreground",
      accent: "after:bg-accent-foreground"
    };
    const sizes = {
      sm: "text-sm gap-1",
      md: "text-base gap-1.5",
      lg: "text-lg gap-2"
    };
    $$renderer2.push(`<!---->`);
    Button($$renderer2, {
      href,
      target: external ? "_blank" : void 0,
      rel: external ? "noopener noreferrer" : void 0,
      class: twMerge("group inline-flex items-center font-medium transition-colors duration-200 no-underline", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm", variants[variant], sizes[size], className),
      children: ($$renderer3) => {
        if (icon) {
          $$renderer3.push("<!--[-->");
          icon($$renderer3);
          $$renderer3.push(`<!---->`);
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]--> `);
        if (children) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<span${attr_class(clsx(twMerge("relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-0 after:transition-all after:duration-300 group-hover:after:w-full", underlineVariants[variant])))}>`);
          children($$renderer3);
          $$renderer3.push(`<!----></span>`);
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]-->`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!---->`);
  });
}
export {
  ButtonLink as B,
  Button as a
};
