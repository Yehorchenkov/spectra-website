import { a as ensure_array_like, b as attr, e as escape_html } from "../../../chunks/index.js";
import { C as CalendarDots } from "../../../chunks/CalendarDots.js";
import { F as FilterSortBar, P as Pagination_1, a as FunnelSimple, b as Filter, S as SortAscending, O as Order } from "../../../chunks/Pagination.js";
import { F as Folder, P as ProjectBadge, T as Tag } from "../../../chunks/ProjectBadge.js";
import { B as ButtonLink } from "../../../chunks/buttonLink.js";
import { B as Badge } from "../../../chunks/Badge.js";
import { b as NEWS_PAGINATION_LIMIT, c as NEWS_PLACEHOLDER } from "../../../chunks/constants.js";
import { p as page } from "../../../chunks/index2.js";
import { S as SEO } from "../../../chunks/SEO.js";
import { g as getPageParam, a as getFilterContext, r as resolveSeo } from "../../../chunks/seoFactory.js";
import { a as formatDateLong } from "../../../chunks/dateHelpers.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    const totalNews = data.news?.totalDocs ?? 0;
    const perPage = data.news?.limit ?? NEWS_PAGINATION_LIMIT;
    const paginatedDocs = data.news?.docs ?? [];
    const projectFilterItems = data.projects.docs.map((project) => ({ value: project.id, label: project.acronym }));
    const qs = page.url.searchParams;
    const currentPageNum = getPageParam(qs);
    const seo = (() => {
      const filterText = getFilterContext(qs, data);
      return resolveSeo(data.seoSettings, {
        url: page.url,
        context: {
          filters: filterText,
          // Used in "{{filter}}" template
          page: currentPageNum
        },
        allowParams: ["where[projects][equals]"]
        // Keep project filter in canonical
      });
    })();
    SEO($$renderer2, {
      title: seo.title,
      description: seo.description,
      canonical: seo.canonical,
      noindex: seo.noindex,
      collection: data.seoSettings?.label || "News Archive"
    });
    $$renderer2.push(`<!----> <div class="flex w-full flex-col items-center overflow-x-hidden"><h1 class="text-foreground mt-8 mb-2 text-3xl font-bold tracking-tight">News</h1> <p class="text-foreground mb-8 text-2xl">Our news and updates</p> `);
    {
      let filters = function($$renderer3) {
        $$renderer3.push(`<div class="flex items-center gap-2">`);
        FunnelSimple($$renderer3, { class: "text-primary size-5", weight: "bold" });
        $$renderer3.push(`<!----> <span class="text-muted-foreground text-sm font-medium">Filter:</span></div> `);
        Filter($$renderer3, {
          items: projectFilterItems,
          classTrigger: "w-full sm:w-[200px]",
          classContent: "w-[200px]",
          placeholder: "All Projects",
          filterField: "projects",
          includeNone: true,
          noneLabel: "Unassigned"
        });
        $$renderer3.push(`<!---->`);
      }, sort = function($$renderer3) {
        $$renderer3.push(`<div class="flex items-center gap-2">`);
        SortAscending($$renderer3, { class: "text-primary size-5", weight: "bold" });
        $$renderer3.push(`<!----> <span class="text-muted-foreground text-sm font-medium">Sort:</span></div> `);
        Order($$renderer3, {
          items: [
            { value: "-publishDate", label: "Newest First" },
            { value: "publishDate", label: "Oldest First" },
            { value: "title", label: "Title A-Z" },
            { value: "-title", label: "Title Z-A" }
          ],
          defaultOrder: "-publishDate",
          placeholder: "Select order",
          classTrigger: "w-full sm:w-[180px]",
          classContent: "w-[180px]"
        });
        $$renderer3.push(`<!---->`);
      };
      FilterSortBar($$renderer2, {
        count: totalNews,
        countLabel: "news item",
        resetParams: ["where[projects][equals]", "where[projects][exists]", "sort"],
        filters,
        sort
      });
    }
    $$renderer2.push(`<!----> <div class="flex w-full max-w-screen-xl flex-col gap-6 px-4 lg:px-2">`);
    if (totalNews > 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<!--[-->`);
      const each_array = ensure_array_like(paginatedDocs);
      for (let index = 0, $$length = each_array.length; index < $$length; index++) {
        let item = each_array[index];
        $$renderer2.push(`<div class="text-foreground flex w-full flex-col items-stretch gap-4 md:flex-row md:items-center md:justify-items-start md:gap-0"><div class="flex shrink-0 items-center justify-center rounded-lg bg-transparent md:mr-8 md:h-48 md:w-48">`);
        if (item.image?.url) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<img${attr("src", item.image.url)}${attr("alt", item.title)} class="size-32 rounded-lg object-cover md:size-40 shadow-sm"/>`);
        } else {
          $$renderer2.push("<!--[!-->");
          $$renderer2.push(`<img${attr("src", NEWS_PLACEHOLDER)} alt="News placeholder" class="size-32 rounded-lg object-cover md:size-40 shadow-sm"/>`);
        }
        $$renderer2.push(`<!--]--></div> <div class="flex w-full flex-col justify-between p-2 leading-normal md:p-4">`);
        ButtonLink($$renderer2, {
          class: "mb-2 text-left text-xl font-bold tracking-tight",
          href: `/news/${item.slug}${page.url.search}`,
          children: ($$renderer3) => {
            $$renderer3.push(`<!---->${escape_html(item.title)}`);
          }
        });
        $$renderer2.push(`<!----> <div class="mb-2 flex flex-wrap items-center gap-x-8 gap-y-2">`);
        if (item.publishDate) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="flex items-center gap-2">`);
          CalendarDots($$renderer2, { class: "text-muted-foreground size-5 shrink-0" });
          $$renderer2.push(`<!----> <time${attr("datetime", item.publishDate)} class="text-muted-foreground text-left text-base">${escape_html(formatDateLong(item.publishDate))}</time></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--> `);
        if (item.projects?.length > 0) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="flex items-center gap-2 flex-wrap">`);
          Folder($$renderer2, { class: "text-muted-foreground size-4 shrink-0" });
          $$renderer2.push(`<!----> <!--[-->`);
          const each_array_1 = ensure_array_like(item.projects);
          for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
            let project = each_array_1[$$index];
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
        $$renderer2.push(`<!--]--></div> <p class="text-foreground mb-3 text-justify font-normal">${escape_html(item.excerpt)}</p> `);
        if (item?.tags?.length ?? 0) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="flex flex-wrap items-center gap-2">`);
          Tag($$renderer2, { class: "text-muted-foreground size-4 shrink-0" });
          $$renderer2.push(`<!----> <!--[-->`);
          const each_array_2 = ensure_array_like(item.tags);
          for (let $$index_1 = 0, $$length2 = each_array_2.length; $$index_1 < $$length2; $$index_1++) {
            let tag = each_array_2[$$index_1];
            Badge($$renderer2, {
              className: "bg-secondary/50 text-secondary-foreground px-2 py-0.5 text-xs",
              children: ($$renderer3) => {
                $$renderer3.push(`<!---->${escape_html(tag.name || tag)}`);
              }
            });
          }
          $$renderer2.push(`<!--]--></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></div></div> `);
        if (index < totalNews - 1) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="flex w-full justify-center"><div class="bg-primary my-4 h-0.5 w-3/4 rounded-full md:w-2/3"></div></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]--> `);
      if (totalNews > perPage) {
        $$renderer2.push("<!--[-->");
        Pagination_1($$renderer2, {
          count: totalNews,
          perPage,
          itemLabel: "news item",
          itemLabelPlural: "news items"
        });
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]-->`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></div>`);
  });
}
export {
  _page as default
};
