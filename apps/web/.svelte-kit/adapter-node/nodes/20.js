import * as server from '../entries/pages/team-members/_slug_/_page.server.js';

export const index = 20;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/team-members/_slug_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/team-members/[slug]/+page.server.js";
export const imports = ["_app/immutable/nodes/20.BQWcs1fD.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/8KyAVGcc.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/CnwNqbP9.js","_app/immutable/chunks/CrX_5bIz.js","_app/immutable/chunks/BCw_ERVW.js","_app/immutable/chunks/y6D_K5Ur.js","_app/immutable/chunks/kDUFIcJd.js","_app/immutable/chunks/shSaBFU1.js","_app/immutable/chunks/5srouxCf.js","_app/immutable/chunks/B6Y5NRg_.js","_app/immutable/chunks/C6Xn_E6c.js","_app/immutable/chunks/VlwfgRRh.js","_app/immutable/chunks/YSkpnpXC.js","_app/immutable/chunks/BXJ53y5c.js","_app/immutable/chunks/PPVm8Dsz.js","_app/immutable/chunks/CoAdJhCN.js","_app/immutable/chunks/CY5pVUOm.js","_app/immutable/chunks/A2lC8QCw.js","_app/immutable/chunks/CfxwsBGh.js","_app/immutable/chunks/OOcVVdCb.js","_app/immutable/chunks/DisEtRgg.js","_app/immutable/chunks/DCy9LLSs.js","_app/immutable/chunks/CzH25q2p.js","_app/immutable/chunks/CXqSyNW_.js","_app/immutable/chunks/-Q8iA4Ec.js"];
export const stylesheets = ["_app/immutable/assets/RichTextRenderer.DZU1WGtr.css"];
export const fonts = [];
