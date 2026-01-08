import { a as ensure_array_like, e as escape_html } from "../../../chunks/index.js";
import { A as Avatar } from "../../../chunks/Avatar.js";
import { S as SEO } from "../../../chunks/SEO.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    let teamMembers = data.teamMembers.docs ?? [];
    SEO($$renderer2, {
      title: data.seoSettings?.meta?.title || "Our Team",
      description: data.seoSettings?.meta?.description || "Meet the members of our team",
      collection: data.seoSettings?.label || "Team Members"
    });
    $$renderer2.push(`<!----> <div class="flex w-full flex-col items-center"><h1 class="text-foreground mt-8 mb-2 text-3xl font-bold tracking-tight">Our Team</h1> <p class="text-foreground mb-8 text-2xl">Meet the members of our team</p> <div class="grid w-full max-w-screen-xl gap-8 px-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-16 md:px-0"><!--[-->`);
    const each_array = ensure_array_like(teamMembers);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let member = each_array[$$index];
      $$renderer2.push(`<div class="text-center">`);
      Avatar($$renderer2, {
        photo: member.photo,
        class: "mx-auto mb-4 h-36 w-36",
        href: "/team-members/" + member.slug,
        hoverScale: true,
        ariaLabel: "View " + member.name
      });
      $$renderer2.push(`<!----> <p class="text-foreground mb-1 text-xl font-bold tracking-tight">${escape_html(member.name)}</p> <p class="text-muted-foreground">${escape_html(member.title)}</p></div>`);
    }
    $$renderer2.push(`<!--]--></div></div>`);
  });
}
export {
  _page as default
};
