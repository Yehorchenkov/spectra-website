import { c as attributes, e as escape_html, a as ensure_array_like, b as attr, s as stringify, j as attr_class } from "../../../../chunks/index.js";
import { B as ButtonLink, a as Button } from "../../../../chunks/buttonLink.js";
import { A as Avatar } from "../../../../chunks/Avatar.js";
import { R as RichTextRenderer } from "../../../../chunks/RichTextRenderer.js";
import { P as ProjectStateBadge } from "../../../../chunks/ProjectStateBadge.js";
import { S as SocialIcon, E as Envelope } from "../../../../chunks/SocialIcon.js";
import { S as SEO } from "../../../../chunks/SEO.js";
import { g as getIconContext } from "../../../../chunks/context.js";
import { T as Tabs, a as Tabs_list, b as Tabs_trigger, c as Tabs_content } from "../../../../chunks/tabs-trigger.js";
function Building($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const ctx = getIconContext();
    let { children, $$slots, $$events, ...props } = $$props;
    let weight = props.weight ?? ctx.weight ?? "regular";
    let color = props.color ?? ctx.color ?? "currentColor";
    let size = props.size ?? ctx.size ?? "1em";
    let mirrored = props.mirrored ?? ctx.mirrored ?? false;
    function svgAttr(obj) {
      let { weight: weight2, color: color2, size: size2, mirrored: mirrored2, ...attrs } = obj;
      return attrs;
    }
    $$renderer2.push(`<svg${attributes(
      {
        xmlns: "http://www.w3.org/2000/svg",
        role: "img",
        width: size,
        height: size,
        fill: color,
        transform: mirrored ? "scale(-1, 1)" : void 0,
        viewBox: "0 0 256 256",
        ...svgAttr(ctx),
        ...svgAttr(props)
      },
      void 0,
      void 0,
      void 0,
      3
    )}>`);
    if (children) {
      $$renderer2.push("<!--[-->");
      children($$renderer2);
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--><rect width="256" height="256" fill="none"></rect>`);
    if (weight === "bold") {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<path d="M232,220H212V36h4a12,12,0,0,0,0-24H40a12,12,0,0,0,0,24h4V220H24a12,12,0,0,0,0,24H232a12,12,0,0,0,0-24ZM68,36H188V220H164V184a12,12,0,0,0-12-12H104a12,12,0,0,0-12,12v36H68Zm72,184H116V196h24ZM84,64A12,12,0,0,1,96,52h12a12,12,0,0,1,0,24H96A12,12,0,0,1,84,64Zm52,0a12,12,0,0,1,12-12h12a12,12,0,0,1,0,24H148A12,12,0,0,1,136,64ZM84,104A12,12,0,0,1,96,92h12a12,12,0,0,1,0,24H96A12,12,0,0,1,84,104Zm52,0a12,12,0,0,1,12-12h12a12,12,0,0,1,0,24H148A12,12,0,0,1,136,104ZM84,144a12,12,0,0,1,12-12h12a12,12,0,0,1,0,24H96A12,12,0,0,1,84,144Zm52,0a12,12,0,0,1,12-12h12a12,12,0,0,1,0,24H148A12,12,0,0,1,136,144Z"></path>`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (weight === "duotone") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<path d="M200,24V232H152V184H104v48H56V24Z" opacity="0.2"></path><path d="M232,224H208V32h8a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16h8V224H24a8,8,0,0,0,0,16H232a8,8,0,0,0,0-16ZM64,32H192V224H160V184a8,8,0,0,0-8-8H104a8,8,0,0,0-8,8v40H64Zm80,192H112V192h32ZM88,64a8,8,0,0,1,8-8h16a8,8,0,0,1,0,16H96A8,8,0,0,1,88,64Zm48,0a8,8,0,0,1,8-8h16a8,8,0,0,1,0,16H144A8,8,0,0,1,136,64ZM88,104a8,8,0,0,1,8-8h16a8,8,0,0,1,0,16H96A8,8,0,0,1,88,104Zm48,0a8,8,0,0,1,8-8h16a8,8,0,0,1,0,16H144A8,8,0,0,1,136,104ZM88,144a8,8,0,0,1,8-8h16a8,8,0,0,1,0,16H96A8,8,0,0,1,88,144Zm48,0a8,8,0,0,1,8-8h16a8,8,0,0,1,0,16H144A8,8,0,0,1,136,144Z"></path>`);
      } else {
        $$renderer2.push("<!--[!-->");
        if (weight === "fill") {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<path d="M232,224H208V32h8a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16h8V224H24a8,8,0,0,0,0,16H232a8,8,0,0,0,0-16ZM88,56h24a8,8,0,0,1,0,16H88a8,8,0,0,1,0-16Zm0,40h24a8,8,0,0,1,0,16H88a8,8,0,0,1,0-16Zm-8,48a8,8,0,0,1,8-8h24a8,8,0,0,1,0,16H88A8,8,0,0,1,80,144Zm72,80H104V184h48Zm16-72H144a8,8,0,0,1,0-16h24a8,8,0,0,1,0,16Zm0-40H144a8,8,0,0,1,0-16h24a8,8,0,0,1,0,16Zm0-40H144a8,8,0,0,1,0-16h24a8,8,0,0,1,0,16Z"></path>`);
        } else {
          $$renderer2.push("<!--[!-->");
          if (weight === "light") {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<path d="M232,226H206V30h10a6,6,0,0,0,0-12H40a6,6,0,0,0,0,12H50V226H24a6,6,0,0,0,0,12H232a6,6,0,0,0,0-12ZM62,30H194V226H158V184a6,6,0,0,0-6-6H104a6,6,0,0,0-6,6v42H62Zm84,196H110V190h36ZM90,64a6,6,0,0,1,6-6h16a6,6,0,0,1,0,12H96A6,6,0,0,1,90,64Zm48,0a6,6,0,0,1,6-6h16a6,6,0,0,1,0,12H144A6,6,0,0,1,138,64ZM90,104a6,6,0,0,1,6-6h16a6,6,0,0,1,0,12H96A6,6,0,0,1,90,104Zm48,0a6,6,0,0,1,6-6h16a6,6,0,0,1,0,12H144A6,6,0,0,1,138,104ZM96,150a6,6,0,0,1,0-12h16a6,6,0,0,1,0,12Zm42-6a6,6,0,0,1,6-6h16a6,6,0,0,1,0,12H144A6,6,0,0,1,138,144Z"></path>`);
          } else {
            $$renderer2.push("<!--[!-->");
            if (weight === "regular") {
              $$renderer2.push("<!--[-->");
              $$renderer2.push(`<path d="M232,224H208V32h8a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16h8V224H24a8,8,0,0,0,0,16H232a8,8,0,0,0,0-16ZM64,32H192V224H160V184a8,8,0,0,0-8-8H104a8,8,0,0,0-8,8v40H64Zm80,192H112V192h32ZM88,64a8,8,0,0,1,8-8h16a8,8,0,0,1,0,16H96A8,8,0,0,1,88,64Zm48,0a8,8,0,0,1,8-8h16a8,8,0,0,1,0,16H144A8,8,0,0,1,136,64ZM88,104a8,8,0,0,1,8-8h16a8,8,0,0,1,0,16H96A8,8,0,0,1,88,104Zm48,0a8,8,0,0,1,8-8h16a8,8,0,0,1,0,16H144A8,8,0,0,1,136,104ZM88,144a8,8,0,0,1,8-8h16a8,8,0,0,1,0,16H96A8,8,0,0,1,88,144Zm48,0a8,8,0,0,1,8-8h16a8,8,0,0,1,0,16H144A8,8,0,0,1,136,144Z"></path>`);
            } else {
              $$renderer2.push("<!--[!-->");
              if (weight === "thin") {
                $$renderer2.push("<!--[-->");
                $$renderer2.push(`<path d="M232,228H204V28h12a4,4,0,0,0,0-8H40a4,4,0,0,0,0,8H52V228H24a4,4,0,0,0,0,8H232a4,4,0,0,0,0-8ZM60,28H196V228H156V184a4,4,0,0,0-4-4H104a4,4,0,0,0-4,4v44H60Zm88,200H108V188h40ZM92,64a4,4,0,0,1,4-4h16a4,4,0,0,1,0,8H96A4,4,0,0,1,92,64Zm48,0a4,4,0,0,1,4-4h16a4,4,0,0,1,0,8H144A4,4,0,0,1,140,64ZM92,104a4,4,0,0,1,4-4h16a4,4,0,0,1,0,8H96A4,4,0,0,1,92,104Zm48,0a4,4,0,0,1,4-4h16a4,4,0,0,1,0,8H144A4,4,0,0,1,140,104ZM96,148a4,4,0,0,1,0-8h16a4,4,0,0,1,0,8Zm44-4a4,4,0,0,1,4-4h16a4,4,0,0,1,0,8H144A4,4,0,0,1,140,144Z"></path>`);
              } else {
                $$renderer2.push("<!--[!-->");
                $$renderer2.push(`${escape_html((console.error('Unsupported icon weight. Choose from "thin", "light", "regular", "bold", "fill", or "duotone".'), ""))}`);
              }
              $$renderer2.push(`<!--]-->`);
            }
            $$renderer2.push(`<!--]-->`);
          }
          $$renderer2.push(`<!--]-->`);
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></svg>`);
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    let teamMember = data.teamMember;
    let projectFilter = "active";
    let responsibilityFilter = "all";
    const isResponsibleForProject = (project) => {
      if (!project.projectParticipants) return false;
      return project.projectParticipants.some((participant) => {
        const participantId = typeof participant.participantName === "object" ? participant.participantName.id : participant.participantName;
        return participantId === teamMember.id && participant.isResponsible;
      });
    };
    const filteredProjects = () => {
      const projects = teamMember.projects?.docs ?? [];
      let filtered = projects;
      if (projectFilter === "active") {
        filtered = filtered.filter((p) => p.projectState === "active");
      }
      if (responsibilityFilter === "responsible") {
        filtered = filtered.filter((p) => isResponsibleForProject(p));
      }
      return filtered.slice().sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
    };
    SEO($$renderer2, {
      title: teamMember.meta?.title || teamMember?.name || "Team Member",
      description: teamMember.meta?.description || `Profile of ${teamMember?.name || "our team member"}`,
      collection: teamMember.meta?.label || "Team Members"
    });
    $$renderer2.push(`<!----> `);
    if (teamMember) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="w-full max-w-screen-xl mx-auto p-4 md:p-8 font-sans"><article class="grid grid-cols-1 lg:grid-cols-3 gap-8"><aside class="lg:col-span-1 flex flex-col items-center lg:items-start space-y-6">`);
      Avatar($$renderer2, { photo: teamMember.photo, class: "w-48 h-48 md:w-64 md:h-64" });
      $$renderer2.push(`<!----> <div class="text-center lg:text-left w-full"><h1 class="text-3xl font-bold text-foreground">${escape_html(teamMember.name)}</h1> <p class="text-lg text-primary">${escape_html(teamMember.title)}</p></div> <div class="w-full space-y-3 pt-4 border-t border-border"><h3 class="text-md font-semibold text-muted-foreground uppercase tracking-wider">Contact</h3> <ul class="space-y-2"><li>`);
      {
        let icon = function($$renderer3) {
          Envelope($$renderer3, { class: "text-xl" });
        };
        ButtonLink($$renderer2, {
          class: "gap-3 group",
          href: `mailto:${teamMember.email}`,
          icon,
          children: ($$renderer3) => {
            $$renderer3.push(`<span>${escape_html(teamMember.email)}</span>`);
          }
        });
      }
      $$renderer2.push(`<!----></li> `);
      if (teamMember.address) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<li class="gap-3 flex group">`);
        Building($$renderer2, { class: "text-xl" });
        $$renderer2.push(`<!----> <span class="text-muted-foreground">${escape_html(teamMember.address)}</span></li>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></ul></div> `);
      if (teamMember.scientificLinks?.length > 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="w-full space-y-3 pt-4 border-t border-border"><h3 class="text-md font-semibold text-muted-foreground uppercase tracking-wider">Scientific Profiles</h3> <ul class="space-y-2"><!--[-->`);
        const each_array = ensure_array_like(teamMember.scientificLinks);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let link = each_array[$$index];
          $$renderer2.push(`<li><span class="font-semibold text-foreground">${escape_html(link.platform.platformName)}:</span> <span class="text-muted-foreground break-all">${escape_html(link.url)}</span></li>`);
        }
        $$renderer2.push(`<!--]--></ul></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (teamMember.socialLinks?.length > 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="w-full space-y-3 pt-4 border-t border-border"><h3 class="text-md font-semibold text-muted-foreground uppercase tracking-wider">Social Media</h3> <div class="flex items-center gap-3 pt-2"><!--[-->`);
        const each_array_1 = ensure_array_like(teamMember.socialLinks);
        for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
          let social = each_array_1[$$index_1];
          $$renderer2.push(`<a${attr("href", social.url)} target="_blank" rel="noreferrer" class="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"${attr("aria-label", social.platform.platformName)}>`);
          SocialIcon($$renderer2, { platform: social.platform.platformName, class: "text-lg" });
          $$renderer2.push(`<!----></a>`);
        }
        $$renderer2.push(`<!--]--></div></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></aside> <main class="lg:col-span-2 space-y-8"><!---->`);
      Tabs($$renderer2, {
        value: "profile",
        class: "w-full",
        children: ($$renderer3) => {
          $$renderer3.push(`<!---->`);
          Tabs_list($$renderer3, {
            class: "flex w-full justify-start border-b border-border/40 bg-transparent p-0",
            children: ($$renderer4) => {
              $$renderer4.push(`<!---->`);
              Tabs_trigger($$renderer4, {
                value: "profile",
                class: "cursor-pointer relative h-12 px-6 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-[state=active]:text-foreground data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:h-[2px] data-[state=active]:after:w-full data-[state=active]:after:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                children: ($$renderer5) => {
                  $$renderer5.push(`<!---->Profile`);
                },
                $$slots: { default: true }
              });
              $$renderer4.push(`<!----> <!---->`);
              Tabs_trigger($$renderer4, {
                value: "additional",
                class: "cursor-pointer relative h-12 px-6 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-[state=active]:text-foreground data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:h-[2px] data-[state=active]:after:w-full data-[state=active]:after:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                children: ($$renderer5) => {
                  $$renderer5.push(`<!---->Additional Information`);
                },
                $$slots: { default: true }
              });
              $$renderer4.push(`<!----> <!---->`);
              Tabs_trigger($$renderer4, {
                value: "projects",
                class: "cursor-pointer relative h-12 px-6 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-[state=active]:text-foreground data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:h-[2px] data-[state=active]:after:w-full data-[state=active]:after:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                children: ($$renderer5) => {
                  $$renderer5.push(`<!---->Projects`);
                },
                $$slots: { default: true }
              });
              $$renderer4.push(`<!---->`);
            },
            $$slots: { default: true }
          });
          $$renderer3.push(`<!----> <!---->`);
          Tabs_content($$renderer3, {
            value: "profile",
            class: "mt-6 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            children: ($$renderer4) => {
              $$renderer4.push(`<section><h2 class="text-2xl font-bold text-foreground border-b-2 border-primary pb-2 mb-4">Profile</h2> <div class="prose dark:prose-invert max-w-none text-foreground">`);
              RichTextRenderer($$renderer4, { content: teamMember.profile });
              $$renderer4.push(`<!----></div></section>`);
            },
            $$slots: { default: true }
          });
          $$renderer3.push(`<!----> <!---->`);
          Tabs_content($$renderer3, {
            value: "additional",
            class: "mt-6 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            children: ($$renderer4) => {
              if (teamMember.additionalInfo) {
                $$renderer4.push("<!--[-->");
                $$renderer4.push(`<section><h2 class="text-2xl font-bold text-foreground border-b-2 border-primary pb-2 mb-4">Additional Information</h2> <div class="prose dark:prose-invert max-w-none text-foreground">`);
                RichTextRenderer($$renderer4, { content: teamMember.additionalInfo });
                $$renderer4.push(`<!----></div></section>`);
              } else {
                $$renderer4.push("<!--[!-->");
                $$renderer4.push(`<p class="text-muted-foreground">No additional information available.</p>`);
              }
              $$renderer4.push(`<!--]-->`);
            },
            $$slots: { default: true }
          });
          $$renderer3.push(`<!----> <!---->`);
          Tabs_content($$renderer3, {
            value: "projects",
            class: "mt-6 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            children: ($$renderer4) => {
              $$renderer4.push(`<section><div class="flex flex-wrap items-center justify-between gap-4 border-b-2 border-primary pb-2 mb-4"><h2 class="text-2xl font-bold text-foreground">Projects</h2> <div class="flex flex-wrap gap-4"><div class="flex gap-2 items-center"><span class="text-sm text-muted-foreground">Status:</span> <!---->`);
              Button($$renderer4, {
                class: `px-3 py-1 text-sm font-medium rounded-full transition-colors cursor-pointer ${stringify(projectFilter === "active" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80")}`,
                onclick: () => projectFilter = "active",
                children: ($$renderer5) => {
                  $$renderer5.push(`<!---->Active`);
                },
                $$slots: { default: true }
              });
              $$renderer4.push(`<!----> <!---->`);
              Button($$renderer4, {
                class: `px-3 py-1 text-sm font-medium rounded-full transition-colors cursor-pointer ${stringify(projectFilter === "all" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80")}`,
                onclick: () => projectFilter = "all",
                children: ($$renderer5) => {
                  $$renderer5.push(`<!---->All`);
                },
                $$slots: { default: true }
              });
              $$renderer4.push(`<!----></div> <div class="flex gap-2 items-center"><span class="text-sm text-muted-foreground">Role:</span> <!---->`);
              Button($$renderer4, {
                class: `px-3 py-1 text-sm font-medium rounded-full transition-colors cursor-pointer ${stringify(responsibilityFilter === "responsible" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80")}`,
                onclick: () => responsibilityFilter = "responsible",
                children: ($$renderer5) => {
                  $$renderer5.push(`<!---->Responsible`);
                },
                $$slots: { default: true }
              });
              $$renderer4.push(`<!----> <!---->`);
              Button($$renderer4, {
                class: `px-3 py-1 text-sm font-medium rounded-full transition-colors cursor-pointer ${stringify(responsibilityFilter === "all" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80")}`,
                onclick: () => responsibilityFilter = "all",
                children: ($$renderer5) => {
                  $$renderer5.push(`<!---->All Roles`);
                },
                $$slots: { default: true }
              });
              $$renderer4.push(`<!----></div></div></div> `);
              if (filteredProjects().length > 0) {
                $$renderer4.push("<!--[-->");
                $$renderer4.push(`<div class="space-y-4"><!--[-->`);
                const each_array_2 = ensure_array_like(filteredProjects());
                for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
                  let project = each_array_2[$$index_2];
                  $$renderer4.push(`<article${attr_class(`border-l-2 pl-4 py-3 ${stringify(project.projectState === "complited" ? "border-destructive/50" : "border-primary")}`)}><div class="flex flex-col gap-2"><div class="flex items-center gap-2"><span class="font-bold text-lg text-primary">${escape_html(project.acronym)}</span> `);
                  ProjectStateBadge($$renderer4, { state: project.projectState });
                  $$renderer4.push(`<!----> `);
                  if (isResponsibleForProject(project)) {
                    $$renderer4.push("<!--[-->");
                    $$renderer4.push(`<span class="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-accent text-accent-foreground">Responsible</span>`);
                  } else {
                    $$renderer4.push("<!--[!-->");
                  }
                  $$renderer4.push(`<!--]--></div> `);
                  ButtonLink($$renderer4, {
                    href: `/projects/${project.slug}`,
                    children: ($$renderer5) => {
                      $$renderer5.push(`<!---->${escape_html(project.title)}`);
                    }
                  });
                  $$renderer4.push(`<!----> `);
                  if (project.startDate || project.finishDate) {
                    $$renderer4.push("<!--[-->");
                    $$renderer4.push(`<p class="text-sm text-muted-foreground">${escape_html(project.startDate ? new Date(project.startDate).toLocaleDateString() : "?")} `);
                    if (project.projectState === "finished" && project.finishDate) {
                      $$renderer4.push("<!--[-->");
                      $$renderer4.push(`- ${escape_html(new Date(project.finishDate).toLocaleDateString())}`);
                    } else {
                      $$renderer4.push("<!--[!-->");
                      $$renderer4.push(`- Present`);
                    }
                    $$renderer4.push(`<!--]--></p>`);
                  } else {
                    $$renderer4.push("<!--[!-->");
                  }
                  $$renderer4.push(`<!--]--></div></article>`);
                }
                $$renderer4.push(`<!--]--></div>`);
              } else {
                $$renderer4.push("<!--[!-->");
                $$renderer4.push(`<p class="text-muted-foreground">No ${escape_html(projectFilter === "active" ? "active " : "")}${escape_html(responsibilityFilter === "responsible" ? "projects where responsible " : "projects ")}found.</p>`);
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
