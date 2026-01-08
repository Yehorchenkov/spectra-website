import { f as head, e as escape_html, b as attr } from "./index.js";
import { s as siteConfig, n as normalizePath } from "./seoFactory.js";
import { p as page } from "./index2.js";
function SEO($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      title,
      description = siteConfig.description,
      canonical,
      noindex = false,
      manualOgImage,
      collection = "Page",
      keywords = siteConfig.keywords,
      type = "website"
    } = $$props;
    const baseUrl = siteConfig.url.replace(/\/$/, "");
    const finalCanonical = (() => canonical ?? `${baseUrl}${normalizePath(page.url.pathname)}`)();
    const finalTitle = (() => title ?? siteConfig.name)();
    const ogImageUrl = (() => {
      if (manualOgImage) return manualOgImage;
      const params = new URLSearchParams();
      const cleanTitle = finalTitle.split(siteConfig.brandSuffix)[0];
      params.set("title", cleanTitle);
      params.set("category", collection);
      return `${baseUrl}/api/og?${params.toString()}`;
    })();
    head("1hmofv0", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>${escape_html(finalTitle)}</title>`);
      });
      $$renderer3.push(`<meta name="description"${attr("content", description)}/> `);
      if (noindex) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<meta name="robots" content="noindex,nofollow"/>`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> <meta name="keywords"${attr("content", keywords)}/> <link rel="canonical"${attr("href", finalCanonical)}/> <meta property="og:site_name"${attr("content", siteConfig.name)}/> <meta property="og:url"${attr("content", finalCanonical)}/> <meta property="og:title"${attr("content", finalTitle)}/> <meta property="og:description"${attr("content", description)}/> <meta property="og:type"${attr("content", type)}/> <meta property="og:image"${attr("content", ogImageUrl)}/> <meta property="og:image:width" content="1200"/> <meta property="og:image:height" content="630"/> <meta name="twitter:card" content="summary_large_image"/> <meta name="twitter:title"${attr("content", finalTitle)}/> <meta name="twitter:description"${attr("content", description)}/> <meta name="twitter:image"${attr("content", ogImageUrl)}/>`);
    });
  });
}
export {
  SEO as S
};
