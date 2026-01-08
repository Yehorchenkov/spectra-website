import { e as escape_html, b as attr, a as ensure_array_like } from "../../../../chunks/index.js";
import { C as CalendarDots } from "../../../../chunks/CalendarDots.js";
import { F as Folder, P as ProjectBadge, T as Tag } from "../../../../chunks/ProjectBadge.js";
import { B as Badge } from "../../../../chunks/Badge.js";
import { R as RichTextRenderer } from "../../../../chunks/RichTextRenderer.js";
import { c as NEWS_PLACEHOLDER } from "../../../../chunks/constants.js";
import { a as formatDateLong } from "../../../../chunks/dateHelpers.js";
import { S as SEO } from "../../../../chunks/SEO.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    let newsItem = data.news;
    const headerImageUrl = newsItem?.image?.url ?? NEWS_PLACEHOLDER;
    const headerImageAlt = newsItem?.image?.alt ?? newsItem?.title ?? "News";
    const publishDateLabel = newsItem?.publishDate ? formatDateLong(newsItem.publishDate) : null;
    SEO($$renderer2, {
      title: newsItem.meta.title,
      description: newsItem.meta?.description,
      collection: "News Article"
    });
    $$renderer2.push(`<!----> `);
    if (newsItem) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="w-full max-w-screen-xl mx-auto p-4 md:p-8 font-sans"><article class="space-y-8"><header class="border-b-2 border-primary pb-4"><div class="grid gap-6 md:grid-cols-[1fr_360px] md:items-start"><div class="space-y-4"><h1 class="text-3xl md:text-4xl font-bold tracking-tight text-foreground">${escape_html(newsItem.title)}</h1> <div class="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted-foreground">`);
      if (newsItem.publishDate) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="flex items-center gap-2">`);
        CalendarDots($$renderer2, { class: "size-5 flex-shrink-0" });
        $$renderer2.push(`<!----> <time${attr("datetime", newsItem.publishDate)}>${escape_html(publishDateLabel)}</time></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (newsItem.projects?.length > 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="flex items-center gap-2 flex-wrap">`);
        Folder($$renderer2, { class: "size-5 flex-shrink-0" });
        $$renderer2.push(`<!----> <!--[-->`);
        const each_array = ensure_array_like(newsItem.projects);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let project = each_array[$$index];
          ProjectBadge($$renderer2, {
            label: project.acronym,
            href: `/projects/${project.slug}`,
            class: "text-xs"
          });
        }
        $$renderer2.push(`<!--]--></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (newsItem.tags?.length > 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="flex items-center gap-2 flex-wrap">`);
        Tag($$renderer2, { class: "size-5 shrink-0" });
        $$renderer2.push(`<!----> <!--[-->`);
        const each_array_1 = ensure_array_like(newsItem.tags);
        for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
          let t = each_array_1[$$index_1];
          const tagLabel = typeof t === "string" ? t : t.name ?? t.title ?? t.slug;
          Badge($$renderer2, {
            className: "bg-secondary/50 text-secondary-foreground px-2 py-0.5 text-xs",
            children: ($$renderer3) => {
              $$renderer3.push(`<!---->${escape_html(tagLabel)}`);
            }
          });
        }
        $$renderer2.push(`<!--]--></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div></div> <figure class="order-first md:order-0 md:justify-self-end"><img${attr("src", headerImageUrl)}${attr("alt", headerImageAlt)} class="w-full md:w-[360px] aspect-16/10 rounded-xl border border-border object-cover shadow-sm" loading="lazy"/></figure></div></header> <section class="space-y-4"><div class="max-w-none text-foreground leading-relaxed">`);
      RichTextRenderer($$renderer2, { content: newsItem.content });
      $$renderer2.push(`<!----></div></section></article></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="flex justify-center items-center h-64"><p class="text-muted-foreground">News article not found.</p></div>`);
    }
    $$renderer2.push(`<!--]-->`);
  });
}
export {
  _page as default
};
