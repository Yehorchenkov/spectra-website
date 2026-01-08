import { a as ensure_array_like, e as escape_html, b as attr, s as stringify } from "../../../chunks/index.js";
import { P as ProjectLogo, C as Coins } from "../../../chunks/ProjectLogo.js";
import { C as CalendarDots } from "../../../chunks/CalendarDots.js";
import { F as FilterSortBar, P as Pagination_1, a as FunnelSimple, b as Filter, S as SortAscending, O as Order } from "../../../chunks/Pagination.js";
import { A as Avatar } from "../../../chunks/Avatar.js";
import { B as ButtonLink } from "../../../chunks/buttonLink.js";
import { P as ProjectStateBadge } from "../../../chunks/ProjectStateBadge.js";
import { p as page } from "../../../chunks/index2.js";
import { P as PROJECTS_PAGINATION_LIMIT } from "../../../chunks/constants.js";
import { S as SEO } from "../../../chunks/SEO.js";
import { g as getPageParam, a as getFilterContext, r as resolveSeo } from "../../../chunks/seoFactory.js";
import { f as formatDateRange } from "../../../chunks/dateHelpers.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    const totalProjects = data.projects?.totalDocs ?? 0;
    const perPage = data.projects?.limit ?? PROJECTS_PAGINATION_LIMIT;
    const paginatedDocs = data.projects?.docs ?? [];
    const programFilterItems = data.programs.docs.map((program) => ({ value: program.id, label: program.title }));
    const stateFilterItems = [
      { value: "active", label: "Active" },
      { value: "completed", label: "Completed" }
    ];
    function getResponsiblePerson(project) {
      return project.projectParticipants?.find((p) => p.isResponsible);
    }
    const qs = page.url.searchParams;
    const currentPageNum = getPageParam(qs);
    const seo = (() => {
      const filterText = getFilterContext(qs, data);
      return resolveSeo(data.seoSettings, {
        url: page.url,
        context: {
          filters: filterText,
          // Used in "{{filters}}" template
          page: currentPageNum
        },
        allowParams: ["where[program.id][equals]", "where[projectState][equals]"]
        // Keep filters in canonical
      });
    })();
    SEO($$renderer2, {
      title: seo.title,
      description: seo.description,
      canonical: seo.canonical,
      noindex: seo.noindex,
      collection: data.seoSettings?.label || "Projects Archive"
    });
    $$renderer2.push(`<!----> <div class="flex w-full flex-col items-center overflow-x-hidden"><h1 class="text-foreground mt-8 mb-2 text-3xl font-bold tracking-tight">Projects</h1> <p class="text-foreground mb-8 text-2xl">The list of project we are involved in</p> `);
    {
      let filters = function($$renderer3) {
        $$renderer3.push(`<div class="flex items-center gap-2">`);
        FunnelSimple($$renderer3, { class: "text-primary size-5", weight: "bold" });
        $$renderer3.push(`<!----> <span class="text-muted-foreground text-sm font-medium">Filter:</span></div> `);
        Filter($$renderer3, {
          items: programFilterItems,
          classTrigger: "w-full sm:w-[200px]",
          classContent: "w-[200px]",
          placeholder: "All Programs",
          filterField: "program.id"
        });
        $$renderer3.push(`<!----> `);
        Filter($$renderer3, {
          items: stateFilterItems,
          classTrigger: "w-full sm:w-[140px]",
          classContent: "w-[140px]",
          placeholder: "All States",
          filterField: "projectState"
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
        count: totalProjects,
        countLabel: "project",
        resetParams: [
          "where[program.id][equals]",
          "where[projectState][equals]",
          "sort"
        ],
        filters,
        sort
      });
    }
    $$renderer2.push(`<!----> <div class="flex w-full max-w-screen-xl flex-col gap-6 px-4 lg:px-2">`);
    if (totalProjects > 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<!--[-->`);
      const each_array = ensure_array_like(paginatedDocs);
      for (let index = 0, $$length = each_array.length; index < $$length; index++) {
        let project = each_array[index];
        const responsiblePerson = getResponsiblePerson(project);
        $$renderer2.push(`<div class="text-foreground flex w-full flex-col items-stretch gap-4 md:flex-row md:items-center md:justify-items-start md:gap-0"><div class="flex shrink-0 items-center justify-center gap-3 rounded-lg bg-transparent md:mr-8 md:h-48 md:w-48">`);
        ProjectLogo($$renderer2, { project });
        $$renderer2.push(`<!----></div> <div class="flex w-full flex-col justify-between p-2 leading-normal md:p-4">`);
        ButtonLink($$renderer2, {
          class: "mb-2 text-left text-xl font-bold tracking-tight",
          href: `/projects/${project.slug}${page.url.search}`,
          children: ($$renderer3) => {
            $$renderer3.push(`<!---->${escape_html(project.title)}`);
          }
        });
        $$renderer2.push(`<!----> <div class="mb-2 flex flex-wrap items-center gap-2 text-left text-2xl font-bold text-primary">${escape_html(project.acronym)}</div> <div class="mb-2 flex flex-wrap items-center gap-x-8 gap-y-2">`);
        if (project.projectState) {
          $$renderer2.push("<!--[-->");
          ProjectStateBadge($$renderer2, { state: project.projectState });
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--> `);
        if (project.startDate) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="flex items-center gap-2">`);
          CalendarDots($$renderer2, { class: "text-muted-foreground size-5 shrink-0" });
          $$renderer2.push(`<!----> <time${attr("datetime", project.startDate)} class="text-muted-foreground text-left text-base">${escape_html(formatDateRange(project.startDate, project.finishDate))}</time></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--> <div class="flex items-center gap-2">`);
        Coins($$renderer2, { class: "text-muted-foreground size-5 shrink-0" });
        $$renderer2.push(`<!----> <p class="text-muted-foreground text-left text-base">${escape_html(project.program.title)}</p></div> `);
        if (responsiblePerson) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="flex items-center gap-2">`);
          if (responsiblePerson.participantName?.slug) {
            $$renderer2.push("<!--[-->");
            {
              let icon = function($$renderer3) {
                Avatar($$renderer3, {
                  photo: responsiblePerson.participantName.photo,
                  variant: "thumbnail",
                  class: "size-5"
                });
              };
              ButtonLink($$renderer2, {
                class: "text-muted-foreground text-left text-base",
                href: `/team-members/${stringify(responsiblePerson.participantName.slug)}`,
                icon,
                children: ($$renderer3) => {
                  $$renderer3.push(`<!---->${escape_html(responsiblePerson.participantName.name)}`);
                }
              });
            }
          } else {
            $$renderer2.push("<!--[!-->");
            $$renderer2.push(`<p class="text-muted-foreground text-left text-base">${escape_html(responsiblePerson.participantName?.name || "Unknown")}</p>`);
          }
          $$renderer2.push(`<!--]--></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></div> <p class="text-foreground mb-3 text-justify font-normal">${escape_html(project.excerpt)}</p></div></div> `);
        if (index < totalProjects - 1) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="flex w-full justify-center"><div class="bg-primary my-4 h-0.5 w-3/4 rounded-full md:w-2/3"></div></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]--> `);
      if (totalProjects > perPage) {
        $$renderer2.push("<!--[-->");
        Pagination_1($$renderer2, { count: totalProjects, perPage, itemLabel: "project" });
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
