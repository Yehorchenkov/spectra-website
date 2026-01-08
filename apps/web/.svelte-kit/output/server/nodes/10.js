import * as server from '../entries/pages/events/_slug_/_page.server.js';

export const index = 10;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/events/_slug_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/events/[slug]/+page.server.js";
export const imports = ["_app/immutable/nodes/10.RjmVBFZI.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/8KyAVGcc.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/CnwNqbP9.js","_app/immutable/chunks/CrX_5bIz.js","_app/immutable/chunks/DOLqR-ip.js","_app/immutable/chunks/CqMGIWnz.js","_app/immutable/chunks/bQzDeAD-.js","_app/immutable/chunks/5srouxCf.js","_app/immutable/chunks/CfxwsBGh.js","_app/immutable/chunks/DFYrfbaM.js","_app/immutable/chunks/r6kVtVFu.js","_app/immutable/chunks/B6Y5NRg_.js","_app/immutable/chunks/bL6W5LhC.js","_app/immutable/chunks/BXJ53y5c.js","_app/immutable/chunks/PPVm8Dsz.js","_app/immutable/chunks/ldHzUBZ5.js","_app/immutable/chunks/C6Xn_E6c.js","_app/immutable/chunks/BliNflKu.js","_app/immutable/chunks/CZITrl2y.js","_app/immutable/chunks/RC0bJpZC.js","_app/immutable/chunks/CXqSyNW_.js"];
export const stylesheets = ["_app/immutable/assets/RichTextRenderer.DZU1WGtr.css"];
export const fonts = [];
