import * as server from '../entries/pages/events/_page.server.js';

export const index = 9;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/events/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/events/+page.server.js";
export const imports = ["_app/immutable/nodes/9.CscDrZaC.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/8KyAVGcc.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/CnwNqbP9.js","_app/immutable/chunks/CrX_5bIz.js","_app/immutable/chunks/DOLqR-ip.js","_app/immutable/chunks/CqMGIWnz.js","_app/immutable/chunks/bQzDeAD-.js","_app/immutable/chunks/5srouxCf.js","_app/immutable/chunks/CfxwsBGh.js","_app/immutable/chunks/C2S1q-fj.js","_app/immutable/chunks/BCw_ERVW.js","_app/immutable/chunks/CXJPeod_.js","_app/immutable/chunks/iILqskmx.js","_app/immutable/chunks/Bj4alOaX.js","_app/immutable/chunks/CogrlDW6.js","_app/immutable/chunks/Dg0zSyQh.js","_app/immutable/chunks/_rpVNRZa.js","_app/immutable/chunks/CQh4Aywr.js","_app/immutable/chunks/r6kVtVFu.js","_app/immutable/chunks/B6Y5NRg_.js","_app/immutable/chunks/CMYjxaLY.js","_app/immutable/chunks/C6Xn_E6c.js","_app/immutable/chunks/Bs9W9nVx.js","_app/immutable/chunks/RC0bJpZC.js","_app/immutable/chunks/CXqSyNW_.js","_app/immutable/chunks/CRrrBWUl.js","_app/immutable/chunks/DFYrfbaM.js","_app/immutable/chunks/CbkwNNpe.js","_app/immutable/chunks/BliNflKu.js","_app/immutable/chunks/CZITrl2y.js"];
export const stylesheets = ["_app/immutable/assets/Pagination.CV-KWLNP.css"];
export const fonts = [];
