import * as server from '../entries/pages/_page.server.js';

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.js";
export const imports = ["_app/immutable/nodes/6.CcorCFN_.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/8KyAVGcc.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/CnwNqbP9.js","_app/immutable/chunks/y6D_K5Ur.js","_app/immutable/chunks/kDUFIcJd.js","_app/immutable/chunks/BCw_ERVW.js","_app/immutable/chunks/5srouxCf.js","_app/immutable/chunks/CfxwsBGh.js","_app/immutable/chunks/shSaBFU1.js","_app/immutable/chunks/B6Y5NRg_.js","_app/immutable/chunks/C6Xn_E6c.js","_app/immutable/chunks/YSkpnpXC.js","_app/immutable/chunks/BXJ53y5c.js","_app/immutable/chunks/PPVm8Dsz.js","_app/immutable/chunks/CrX_5bIz.js","_app/immutable/chunks/CbkwNNpe.js","_app/immutable/chunks/BMBS6qFy.js","_app/immutable/chunks/CZITrl2y.js","_app/immutable/chunks/DCy9LLSs.js","_app/immutable/chunks/C5Yi7TeB.js","_app/immutable/chunks/CZagUx-0.js","_app/immutable/chunks/3nlihoLS.js","_app/immutable/chunks/CmVZsBon.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/VlwfgRRh.js","_app/immutable/chunks/CzH25q2p.js","_app/immutable/chunks/CXqSyNW_.js"];
export const stylesheets = ["_app/immutable/assets/RichTextRenderer.DZU1WGtr.css"];
export const fonts = [];
