import * as server from '../entries/pages/projects/_slug_/_page.server.js';

export const index = 16;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/projects/_slug_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/projects/[slug]/+page.server.js";
export const imports = ["_app/immutable/nodes/16.DmGWuWrp.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/8KyAVGcc.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/CnwNqbP9.js","_app/immutable/chunks/CrX_5bIz.js","_app/immutable/chunks/BCw_ERVW.js","_app/immutable/chunks/DOLqR-ip.js","_app/immutable/chunks/CqMGIWnz.js","_app/immutable/chunks/BKbeAEyT.js","_app/immutable/chunks/5srouxCf.js","_app/immutable/chunks/CfxwsBGh.js","_app/immutable/chunks/CXJPeod_.js","_app/immutable/chunks/Dg0zSyQh.js","_app/immutable/chunks/_rpVNRZa.js","_app/immutable/chunks/CQh4Aywr.js","_app/immutable/chunks/BANXEXIJ.js","_app/immutable/chunks/CRrrBWUl.js","_app/immutable/chunks/bQzDeAD-.js","_app/immutable/chunks/CMYjxaLY.js","_app/immutable/chunks/B6Y5NRg_.js","_app/immutable/chunks/C6Xn_E6c.js","_app/immutable/chunks/BfVcfSZ6.js","_app/immutable/chunks/DrCTykka.js","_app/immutable/chunks/r6kVtVFu.js","_app/immutable/chunks/RC0bJpZC.js","_app/immutable/chunks/CXqSyNW_.js","_app/immutable/chunks/CZITrl2y.js","_app/immutable/chunks/bL6W5LhC.js","_app/immutable/chunks/BXJ53y5c.js","_app/immutable/chunks/PPVm8Dsz.js","_app/immutable/chunks/CLjeFcdy.js"];
export const stylesheets = ["_app/immutable/assets/RichTextRenderer.DZU1WGtr.css"];
export const fonts = [];
