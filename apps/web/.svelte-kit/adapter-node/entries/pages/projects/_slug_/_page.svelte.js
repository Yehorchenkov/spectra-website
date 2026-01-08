import { e as escape_html, s as stringify, a as ensure_array_like, b as attr } from "../../../../chunks/index.js";
import { P as ProjectLogo, C as Coins } from "../../../../chunks/ProjectLogo.js";
import { L as Link } from "../../../../chunks/Link.js";
import { C as CalendarDots } from "../../../../chunks/CalendarDots.js";
import { B as ButtonLink } from "../../../../chunks/buttonLink.js";
import { A as Avatar } from "../../../../chunks/Avatar.js";
import { P as ProjectStateBadge } from "../../../../chunks/ProjectStateBadge.js";
import { S as SEO } from "../../../../chunks/SEO.js";
import { f as formatDateRange, a as formatDateLong } from "../../../../chunks/dateHelpers.js";
import "photoswipe/lightbox";
import { R as RichTextRenderer } from "../../../../chunks/RichTextRenderer.js";
import { T as Tabs, a as Tabs_list, b as Tabs_trigger, c as Tabs_content } from "../../../../chunks/tabs-trigger.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    let project = data.project;
    const coordinator = project.projectParticipants?.find((p) => p.isResponsible);
    const projectParticipants = project.projectParticipants?.filter((p) => !p.isResponsible);
    SEO($$renderer2, {
      title: project.meta.title,
      description: project.meta?.description,
      collection: "Project Profile"
    });
    $$renderer2.push(`<!----> `);
    if (project) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="w-full max-w-screen-xl mx-auto p-4 md:p-8 font-sans"><article class="grid grid-cols-1 lg:grid-cols-3 gap-8"><aside class="lg:col-span-1 flex flex-col items-center lg:items-start space-y-6">`);
      ProjectLogo($$renderer2, { project });
      $$renderer2.push(`<!----> <div class="text-center lg:text-left w-full"><h1 class="text-xl font-bold text-foreground">${escape_html(project.title)}</h1> <div class="flex flex-col lg:flex-row items-center lg:items-center gap-3 mt-1"><p class="text-2xl font-bold text-primary">${escape_html(project.acronym)}</p> `);
      if (project.projectState) {
        $$renderer2.push("<!--[-->");
        ProjectStateBadge($$renderer2, { state: project.projectState });
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div></div> <div class="w-full space-y-3 pt-4 border-t border-border">`);
      if (coordinator) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<h3 class="text-md font-semibold text-muted-foreground uppercase tracking-wider">${escape_html(coordinator.participantRole.roleName)}</h3> `);
        {
          let icon = function($$renderer3) {
            Avatar($$renderer3, { photo: coordinator.participantName.photo, class: "size-8" });
          };
          ButtonLink($$renderer2, {
            class: "gap-3",
            href: `/team-members/${stringify(coordinator.participantName.slug)}`,
            icon,
            children: ($$renderer3) => {
              $$renderer3.push(`<!---->${escape_html(coordinator.participantName.name)}`);
            }
          });
        }
        $$renderer2.push(`<!---->`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<h3 class="text-md font-semibold text-muted-foreground uppercase tracking-wider">Project Coordinator</h3> <p class="text-muted-foreground">No coordinator information available.</p>`);
      }
      $$renderer2.push(`<!--]--></div> `);
      if (projectParticipants?.length > 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="w-full space-y-3 pt-4 border-t border-border"><h3 class="text-md font-semibold uppercase tracking-wider text-muted-foreground">Project Participants</h3> <ul class="space-y-1"><!--[-->`);
        const each_array = ensure_array_like(projectParticipants);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let participant = each_array[$$index];
          $$renderer2.push(`<li class="text-md">`);
          {
            let icon = function($$renderer3) {
              Avatar($$renderer3, {
                photo: participant.participantName.photo,
                variant: "thumbnail",
                class: "size-8"
              });
            };
            ButtonLink($$renderer2, {
              class: "gap-3",
              href: `/team-members/${stringify(participant.participantName.slug)}`,
              icon,
              children: ($$renderer3) => {
                $$renderer3.push(`<!---->${escape_html(participant.participantName.name)}`);
              }
            });
          }
          $$renderer2.push(`<!----></li>`);
        }
        $$renderer2.push(`<!--]--></ul></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <div class="w-full space-y-3 pt-4 border-t border-border"><h3 class="text-md font-semibold text-muted-foreground uppercase tracking-wider">Project Information</h3> <ul class="space-y-2">`);
      if (project.projectWebsite) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<li>`);
        {
          let icon = function($$renderer3) {
            Link($$renderer3, { class: "text-xl" });
          };
          ButtonLink($$renderer2, {
            class: "gap-3",
            external: true,
            href: project.projectWebsite,
            icon,
            children: ($$renderer3) => {
              $$renderer3.push(`<!---->${escape_html(project.projectWebsite)}`);
            }
          });
        }
        $$renderer2.push(`<!----></li>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (project.program) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<li><p class="flex gap-3 group">`);
        Coins($$renderer2, { class: "text-xl" });
        $$renderer2.push(`<!----> <span>${escape_html(project.program.title)}</span></p></li>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (project.startDate) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<li><p class="flex gap-3 group">`);
        CalendarDots($$renderer2, { class: "text-xl" });
        $$renderer2.push(`<!----> <time${attr("datetime", project.startDate)}>${escape_html(formatDateRange(project.startDate, project.finishDate))}</time></p></li>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></ul></div> `);
      if (project.projectAcknowledgement?.length > 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="w-full space-y-3 pt-4 border-t border-border"><h3 class="text-md font-semibold text-muted-foreground uppercase tracking-wider">Project Acknowledgement</h3> <ul class="space-y-1"><!--[-->`);
        const each_array_1 = ensure_array_like(project.projectAcknowledgement);
        for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
          let acknowledgement = each_array_1[$$index_1];
          $$renderer2.push(`<li>`);
          if (acknowledgement.acknowledgementLogo) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<img${attr("src", acknowledgement.acknowledgementLogo.url)}${attr("alt", acknowledgement.acknowledgementLogo.alt)} class="max-h-12 object-contain"/>`);
          } else {
            $$renderer2.push("<!--[!-->");
            $$renderer2.push(`<span>${escape_html(acknowledgement.acknowledgementFormula)}</span>`);
          }
          $$renderer2.push(`<!--]--></li>`);
        }
        $$renderer2.push(`<!--]--></ul></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></aside> <main class="lg:col-span-2 space-y-8"><!---->`);
      Tabs($$renderer2, {
        value: "description",
        class: "w-full",
        children: ($$renderer3) => {
          $$renderer3.push(`<!---->`);
          Tabs_list($$renderer3, {
            class: "flex w-full justify-start border-b border-border/40 bg-transparent p-0",
            children: ($$renderer4) => {
              $$renderer4.push(`<!---->`);
              Tabs_trigger($$renderer4, {
                value: "description",
                class: "cursor-pointer relative h-12 px-6 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-[state=active]:text-foreground data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:h-[2px] data-[state=active]:after:w-full data-[state=active]:after:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                children: ($$renderer5) => {
                  $$renderer5.push(`<!---->Description`);
                },
                $$slots: { default: true }
              });
              $$renderer4.push(`<!----> <!---->`);
              Tabs_trigger($$renderer4, {
                value: "news",
                class: "cursor-pointer relative h-12 px-6 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-[state=active]:text-foreground data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:h-[2px] data-[state=active]:after:w-full data-[state=active]:after:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                children: ($$renderer5) => {
                  $$renderer5.push(`<!---->News`);
                },
                $$slots: { default: true }
              });
              $$renderer4.push(`<!----> <!---->`);
              Tabs_trigger($$renderer4, {
                value: "events",
                class: "cursor-pointer relative h-12 px-6 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-[state=active]:text-foreground data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:h-[2px] data-[state=active]:after:w-full data-[state=active]:after:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                children: ($$renderer5) => {
                  $$renderer5.push(`<!---->Events`);
                },
                $$slots: { default: true }
              });
              $$renderer4.push(`<!---->`);
            },
            $$slots: { default: true }
          });
          $$renderer3.push(`<!----> <!---->`);
          Tabs_content($$renderer3, {
            value: "description",
            class: "mt-6 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            children: ($$renderer4) => {
              $$renderer4.push(`<section><h2 class="text-2xl font-bold text-foreground border-b-2 border-primary pb-2 mb-4">Project Description</h2> <div class="max-w-none text-foreground">`);
              RichTextRenderer($$renderer4, { content: project.content });
              $$renderer4.push(`<!----></div></section>`);
            },
            $$slots: { default: true }
          });
          $$renderer3.push(`<!----> <!---->`);
          Tabs_content($$renderer3, {
            value: "news",
            class: "mt-6 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            children: ($$renderer4) => {
              $$renderer4.push(`<section><h2 class="text-2xl font-bold text-foreground border-b-2 border-primary pb-2 mb-4">Project News</h2> `);
              if (project.news.docs && project.news.docs.length > 0) {
                $$renderer4.push("<!--[-->");
                const sortedNews = [...project.news.docs].sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
                $$renderer4.push(`<div class="space-y-4"><!--[-->`);
                const each_array_2 = ensure_array_like(sortedNews);
                for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
                  let newsItem = each_array_2[$$index_2];
                  $$renderer4.push(`<article class="border-l-2 border-primary pl-4 py-2"><div class="flex items-center gap-2 text-sm text-muted-foreground mb-1">`);
                  CalendarDots($$renderer4, { class: "size-4" });
                  $$renderer4.push(`<!----> ${escape_html(formatDateLong(newsItem.publishDate))}</div> `);
                  ButtonLink($$renderer4, {
                    href: "/news/" + newsItem.slug,
                    class: "text-lg font-semibold hover:text-primary transition-colors",
                    children: ($$renderer5) => {
                      $$renderer5.push(`<!---->${escape_html(newsItem.title)}`);
                    }
                  });
                  $$renderer4.push(`<!----> `);
                  if (newsItem.excerpt) {
                    $$renderer4.push("<!--[-->");
                    $$renderer4.push(`<p class="text-muted-foreground mt-1 line-clamp-2">${escape_html(newsItem.excerpt)}</p>`);
                  } else {
                    $$renderer4.push("<!--[!-->");
                  }
                  $$renderer4.push(`<!--]--></article>`);
                }
                $$renderer4.push(`<!--]--></div>`);
              } else {
                $$renderer4.push("<!--[!-->");
                $$renderer4.push(`<p class="text-muted-foreground">No news available yet.</p>`);
              }
              $$renderer4.push(`<!--]--></section>`);
            },
            $$slots: { default: true }
          });
          $$renderer3.push(`<!----> <!---->`);
          Tabs_content($$renderer3, {
            value: "events",
            class: "mt-6 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            children: ($$renderer4) => {
              $$renderer4.push(`<section><h2 class="text-2xl font-bold text-foreground border-b-2 border-primary pb-2 mb-4">Project Events</h2> `);
              if (project.events.docs && project.events.docs.length > 0) {
                $$renderer4.push("<!--[-->");
                const sortedEvents = [...project.events.docs].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                $$renderer4.push(`<div class="space-y-4"><!--[-->`);
                const each_array_3 = ensure_array_like(sortedEvents);
                for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
                  let event = each_array_3[$$index_3];
                  $$renderer4.push(`<article class="border-l-2 border-primary pl-4 py-2"><div class="flex items-center gap-2 text-sm text-muted-foreground mb-1">`);
                  CalendarDots($$renderer4, { class: "size-4" });
                  $$renderer4.push(`<!----> <time${attr("datetime", event.date)}>${escape_html(formatDateRange(event.startDate, event.finishDate))}</time></div> `);
                  ButtonLink($$renderer4, {
                    href: "/events/" + event.slug,
                    class: "text-lg font-semibold hover:text-primary transition-colors",
                    children: ($$renderer5) => {
                      $$renderer5.push(`<!---->${escape_html(event.title)}`);
                    }
                  });
                  $$renderer4.push(`<!----> `);
                  if (event.subtitle) {
                    $$renderer4.push("<!--[-->");
                    $$renderer4.push(`<p class="mb-2 text-md font-medium line-clamp-2">${escape_html(event.subtitle)}</p>`);
                  } else {
                    $$renderer4.push("<!--[!-->");
                  }
                  $$renderer4.push(`<!--]--></article>`);
                }
                $$renderer4.push(`<!--]--></div>`);
              } else {
                $$renderer4.push("<!--[!-->");
                $$renderer4.push(`<p class="text-muted-foreground">No events available yet.</p>`);
              }
              $$renderer4.push(`<!--]--></section>`);
            },
            $$slots: { default: true }
          });
          $$renderer3.push(`<!---->`);
        },
        $$slots: { default: true }
      });
      $$renderer2.push(`<!----></main></article></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="flex justify-center items-center h-64"><p class="text-muted-foreground">Team member not found.</p></div>`);
    }
    $$renderer2.push(`<!--]-->`);
  });
}
export {
  _page as default
};
