import { e as escape_html } from "../../../chunks/index.js";
import { R as RichTextRenderer } from "../../../chunks/RichTextRenderer.js";
import { T as TableOfContents } from "../../../chunks/TableOfContents.js";
import { C as CalendarDots } from "../../../chunks/CalendarDots.js";
import { S as SEO } from "../../../chunks/SEO.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    const formatDate = (dateString) => {
      if (!dateString) return null;
      return new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    };
    SEO($$renderer2, {
      title: data.privacyData?.meta?.title || "Privacy Policy",
      description: data.privacyData?.meta?.description || "Read our privacy policy to understand how we handle your data.",
      collection: "Privacy Policy"
    });
    $$renderer2.push(`<!----> `);
    if (data.privacyData) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="w-full max-w-screen-xl mx-auto p-4 md:p-8 font-sans"><header class="space-y-4 mb-4 border-b-2 border-primary pb-2"><h1 class="text-2xl font-bold text-primary">${escape_html(data.privacyData.title)}</h1> `);
      if (data.privacyData.lastUpdated) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<p class="flex items-center gap-2 text-sm text-muted-foreground">`);
        CalendarDots($$renderer2, { class: "text-lg" });
        $$renderer2.push(`<!----> <span>Last updated: ${escape_html(formatDate(data.privacyData.lastUpdated))}</span></p>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></header> <div class="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8"><main>`);
      RichTextRenderer($$renderer2, {
        content: data.privacyData.content,
        class: "text-left prose dark:prose-invert"
      });
      $$renderer2.push(`<!----></main> <aside class="order-first lg:order-last"><div class="lg:sticky lg:top-28">`);
      TableOfContents($$renderer2, { content: data.privacyData.content });
      $$renderer2.push(`<!----></div></aside></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="flex justify-center items-center h-64"><p class="text-muted-foreground">Privacy policy not available.</p></div>`);
    }
    $$renderer2.push(`<!--]-->`);
  });
}
export {
  _page as default
};
