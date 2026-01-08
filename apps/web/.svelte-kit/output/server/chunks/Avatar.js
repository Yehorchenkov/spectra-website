import { h as attr, t as attr_class, u as clsx } from "./index.js";
const placeholderAvatar = "/_app/immutable/assets/cat_placeholder.CJneT-0v.jpg";
const placeholderAvatarThumbnail = "data:image/jpeg;base64,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";
function Avatar($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      class: className,
      photo,
      variant = "full",
      // 'full' | 'thumbnail'
      // NEW: optional link + optional hover scaling
      href = void 0,
      target = void 0,
      rel = void 0,
      hoverScale = false,
      ariaLabel = "Avatar"
    } = $$props;
    let src = variant === "thumbnail" ? photo?.thumbnailURL ?? placeholderAvatarThumbnail : photo?.url ?? placeholderAvatar;
    let defaultSize = variant === "thumbnail" ? "size-[100px]" : "size-32";
    let imgBaseClass = "rounded-full shadow-lg object-cover transition-transform duration-200 " + (className ?? defaultSize) + (hoverScale ? " hover:scale-105" : "");
    let imgClass = href && hoverScale ? imgBaseClass.replace(" hover:scale-105", " group-hover:scale-105") : imgBaseClass;
    if (href) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<a class="group inline-block"${attr("href", href)}${attr("target", target)}${attr("rel", rel)}${attr("aria-label", ariaLabel)}><img${attr_class(clsx(imgClass))}${attr("src", src)}${attr("alt", photo?.url ? "Avatar" : "Avatar placeholder")}/></a>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<img${attr_class(clsx(imgClass))}${attr("src", src)}${attr("alt", photo?.url ? "Avatar" : "Avatar placeholder")}/>`);
    }
    $$renderer2.push(`<!--]-->`);
  });
}
export {
  Avatar as A
};
