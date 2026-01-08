import { e as escape_html, b as attr, a as ensure_array_like } from "../../../../chunks/index.js";
import { C as CalendarDots } from "../../../../chunks/CalendarDots.js";
import { F as Folder, P as ProjectBadge, T as Tag } from "../../../../chunks/ProjectBadge.js";
import { B as Badge } from "../../../../chunks/Badge.js";
import { R as RichTextRenderer } from "../../../../chunks/RichTextRenderer.js";
import { T as TableOfContents } from "../../../../chunks/TableOfContents.js";
import { E as EventStateBadge, D as DateBadge } from "../../../../chunks/EventStateBadge.js";
import { f as formatDateRange } from "../../../../chunks/dateHelpers.js";
import { S as SEO } from "../../../../chunks/SEO.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    let event = data.event;
    SEO($$renderer2, {
      title: event.meta.title,
      description: event.meta?.description,
      collection: "Event"
    });
    $$renderer2.push(`<!----> `);
    if (event) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="w-full max-w-screen-xl mx-auto p-4 md:p-8 font-sans"><header class="border-b-2 border-primary pb-4 mb-4"><div class="flex flex-col md:flex-row gap-6 md:items-start justify-between"><div class="space-y-4 flex-1">`);
      if (event.eventState) {
        $$renderer2.push("<!--[-->");
        EventStateBadge($$renderer2, { state: event.eventState, size: "md" });
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <h1 class="text-3xl md:text-4xl font-bold tracking-tight text-foreground">${escape_html(event.title)}</h1> <div class="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted-foreground">`);
      if (event.startDate) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="flex items-center gap-2">`);
        CalendarDots($$renderer2, { class: "size-5 shrink-0" });
        $$renderer2.push(`<!----> <time${attr("datetime", event.startDate)} class="text-muted-foreground text-left text-base">${escape_html(formatDateRange(event.startDate, event.finishDate))}</time></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (event.projects?.length > 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="flex items-center gap-2 flex-wrap">`);
        Folder($$renderer2, { class: "size-5 flex-shrink-0" });
        $$renderer2.push(`<!----> <!--[-->`);
        const each_array = ensure_array_like(event.projects);
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
      if (event.tags?.length > 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="flex items-center gap-2 flex-wrap">`);
        Tag($$renderer2, { class: "size-5 shrink-0" });
        $$renderer2.push(`<!----> <!--[-->`);
        const each_array_1 = ensure_array_like(event.tags);
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
      $$renderer2.push(`<!--]--></div></div> <div class="order-first md:order-last shrink-0">`);
      DateBadge($$renderer2, { startDate: event.startDate || event.publishDate });
      $$renderer2.push(`<!----></div></div></header> <div class="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8"><main>`);
      RichTextRenderer($$renderer2, { content: event.content });
      $$renderer2.push(`<!----></main> <aside class="order-first lg:order-last"><div class="lg:sticky lg:top-28">`);
      TableOfContents($$renderer2, { content: event.content });
      $$renderer2.push(`<!----></div></aside></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="flex justify-center items-center h-64"><p class="text-muted-foreground">Event not found.</p></div>`);
    }
    $$renderer2.push(`<!--]-->`);
  });
}
export {
  _page as default
};
