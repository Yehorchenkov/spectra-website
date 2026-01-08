import * as server from '../entries/pages/news/_slug_/_page.server.js';

export const index = 13;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/news/_slug_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/news/[slug]/+page.server.js";
export const imports = ["_app/immutable/nodes/13.CY5p87K5.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/8KyAVGcc.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/CnwNqbP9.js","_app/immutable/chunks/CrX_5bIz.js","_app/immutable/chunks/DOLqR-ip.js","_app/immutable/chunks/CqMGIWnz.js","_app/immutable/chunks/bQzDeAD-.js","_app/immutable/chunks/5srouxCf.js","_app/immutable/chunks/CfxwsBGh.js","_app/immutable/chunks/DFYrfbaM.js","_app/immutable/chunks/r6kVtVFu.js","_app/immutable/chunks/B6Y5NRg_.js","_app/immutable/chunks/bL6W5LhC.js","_app/immutable/chunks/BXJ53y5c.js","_app/immutable/chunks/PPVm8Dsz.js","_app/immutable/chunks/CbkwNNpe.js","_app/immutable/chunks/CZITrl2y.js","_app/immutable/chunks/RC0bJpZC.js","_app/immutable/chunks/CXqSyNW_.js"];
export const stylesheets = ["_app/immutable/assets/RichTextRenderer.DZU1WGtr.css"];
export const fonts = [];
