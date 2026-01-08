import { a as ensure_array_like, e as escape_html, b as attr } from "../../../chunks/index.js";
import { C as CalendarDots } from "../../../chunks/CalendarDots.js";
import { F as FilterSortBar, P as Pagination_1, a as FunnelSimple, b as Filter, S as SortAscending, O as Order } from "../../../chunks/Pagination.js";
import { F as Folder, P as ProjectBadge, T as Tag } from "../../../chunks/ProjectBadge.js";
import { B as ButtonLink } from "../../../chunks/buttonLink.js";
import { B as Badge } from "../../../chunks/Badge.js";
import { E as EVENTS_PAGINATION_LIMIT } from "../../../chunks/constants.js";
import { p as page } from "../../../chunks/index2.js";
import { S as SEO } from "../../../chunks/SEO.js";
import { D as DateBadge, E as EventStateBadge } from "../../../chunks/EventStateBadge.js";
import { g as getPageParam, a as getFilterContext, r as resolveSeo } from "../../../chunks/seoFactory.js";
import { f as formatDateRange } from "../../../chunks/dateHelpers.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    const totalEvents = data.events?.totalDocs ?? 0;
    const perPage = data.events?.limit ?? EVENTS_PAGINATION_LIMIT;
    const paginatedDocs = data.events?.docs ?? [];
    const projectFilterItems = data.projects.docs.map((project) => ({ value: project.id, label: project.acronym }));
    const stateFilterItems = [
      { value: "upcoming", label: "Upcoming" },
      { value: "ongoing", label: "Ongoing" },
      { value: "past", label: "Past" }
    ];
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
        allowParams: ["where[projects][equals]", "where[eventState][equals]"]
        // Keep project filter in canonical
      });
    })();
    SEO($$renderer2, {
      title: seo.title,
      description: seo.description,
      canonical: seo.canonical,
      noindex: seo.noindex,
      collection: data.seoSettings?.label || "Events Archive"
    });
    $$renderer2.push(`<!----> <div class="flex w-full flex-col items-center overflow-x-hidden"><div class="w-full max-w-screen-xl px-4 lg:px-2 text-center"><h1 class="text-foreground mt-8 mb-2 text-3xl font-bold tracking-tight">Events</h1> <p class="text-foreground mb-8 text-2xl">Events we are organizing and participating in</p></div> `);
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
        $$renderer3.push(`<!----> `);
        Filter($$renderer3, {
          items: stateFilterItems,
          classTrigger: "w-full sm:w-[140px]",
          classContent: "w-[140px]",
          placeholder: "All States",
          filterField: "eventState"
        });
        $$renderer3.push(`<!---->`);
      }, sort = function($$renderer3) {
        $$renderer3.push(`<div class="flex items-center gap-2">`);
        SortAscending($$renderer3, { class: "text-primary size-5", weight: "bold" });
        $$renderer3.push(`<!----> <span class="text-muted-foreground text-sm font-medium">Sort:</span></div> `);
        Order($$renderer3, {
          items: [
            { value: "-startDate", label: "Newest First" },
            { value: "startDate", label: "Oldest First" },
            { value: "title", label: "Title A-Z" },
            { value: "-title", label: "Title Z-A" }
          ],
          defaultOrder: "-startDate",
          placeholder: "Select order",
          classTrigger: "w-full sm:w-[180px]",
          classContent: "w-[180px]"
        });
        $$renderer3.push(`<!---->`);
      };
      FilterSortBar($$renderer2, {
        count: totalEvents,
        countLabel: "event",
        resetParams: [
          "where[projects][equals]",
          "where[projects][exists]",
          "where[eventState][equals]",
          "sort"
        ],
        filters,
        sort
      });
    }
    $$renderer2.push(`<!----> <div class="flex w-full max-w-screen-xl flex-col gap-6 px-4 lg:px-2">`);
    if (totalEvents > 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<!--[-->`);
      const each_array = ensure_array_like(paginatedDocs);
      for (let index = 0, $$length = each_array.length; index < $$length; index++) {
        let item = each_array[index];
        $$renderer2.push(`<div class="text-foreground flex w-full flex-col items-stretch gap-4 md:flex-row md:items-center md:justify-items-start md:gap-0"><div class="flex flex-col items-center justify-center pt-1 shrink-0 w-full md:w-32 text-center">`);
        DateBadge($$renderer2, { startDate: item.startDate });
        $$renderer2.push(`<!----></div> <div class="flex w-full flex-col justify-between p-2 leading-normal md:p-4"><div class="mb-2">`);
        ButtonLink($$renderer2, {
          class: "text-left text-xl font-bold tracking-tight",
          href: `/events/${item.slug}${page.url.search}`,
          children: ($$renderer3) => {
            $$renderer3.push(`<!---->${escape_html(item.title)}`);
          }
        });
        $$renderer2.push(`<!----> `);
        if (item.subtitle) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<p class="text-muted-foreground mb-3 text-lg font-medium">${escape_html(item.subtitle)}</p>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></div> <div class="mb-2 flex flex-wrap items-center gap-x-8 gap-y-2">`);
        if (item.eventState) {
          $$renderer2.push("<!--[-->");
          EventStateBadge($$renderer2, { state: item.eventState });
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--> `);
        if (item.startDate) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="flex items-center gap-2">`);
          CalendarDots($$renderer2, { class: "text-muted-foreground size-5 shrink-0" });
          $$renderer2.push(`<!----> <time${attr("datetime", item.startDate)} class="text-muted-foreground text-left text-base">${escape_html(formatDateRange(item.startDate, item.finishDate))}</time></div>`);
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
        if (index < totalEvents - 1) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="flex w-full justify-center"><div class="bg-primary my-4 h-0.5 w-3/4 rounded-full md:w-2/3"></div></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]--> `);
      if (totalEvents > perPage) {
        $$renderer2.push("<!--[-->");
        Pagination_1($$renderer2, {
          count: totalEvents,
          perPage,
          itemLabel: "event",
          itemLabelPlural: "events"
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
