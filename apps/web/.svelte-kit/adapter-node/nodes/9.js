import * as server from '../entries/pages/events/_page.server.js';

export const index = 9;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/events/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/events/+page.server.js";
export const imports = ["_app/immutable/nodes/9.GKqAklgd.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/8KyAVGcc.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/CnwNqbP9.js","_app/immutable/chunks/CrX_5bIz.js","_app/immutable/chunks/y6D_K5Ur.js","_app/immutable/chunks/kDUFIcJd.js","_app/immutable/chunks/BMBS6qFy.js","_app/immutable/chunks/5srouxCf.js","_app/immutable/chunks/CfxwsBGh.js","_app/immutable/chunks/DWmMm98h.js","_app/immutable/chunks/BCw_ERVW.js","_app/immutable/chunks/CmVZsBon.js","_app/immutable/chunks/DCy9LLSs.js","_app/immutable/chunks/C5Yi7TeB.js","_app/immutable/chunks/CZagUx-0.js","_app/immutable/chunks/3nlihoLS.js","_app/immutable/chunks/CYc49tpD.js","_app/immutable/chunks/Cl_uV8Wu.js","_app/immutable/chunks/CY5pVUOm.js","_app/immutable/chunks/B6Y5NRg_.js","_app/immutable/chunks/shSaBFU1.js","_app/immutable/chunks/C6Xn_E6c.js","_app/immutable/chunks/7LbAVmuj.js","_app/immutable/chunks/CzH25q2p.js","_app/immutable/chunks/CXqSyNW_.js","_app/immutable/chunks/DisEtRgg.js","_app/immutable/chunks/B3qnSIIg.js","_app/immutable/chunks/CbkwNNpe.js","_app/immutable/chunks/BI8NAQA_.js","_app/immutable/chunks/CZITrl2y.js"];
export const stylesheets = ["_app/immutable/assets/Pagination.CV-KWLNP.css"];
export const fonts = [];
