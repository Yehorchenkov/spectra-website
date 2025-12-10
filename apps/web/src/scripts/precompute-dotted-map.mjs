import dottedMap from 'dotted-map';
const { getMapJSON } = dottedMap;
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Tune these once; you’ll still be able to add pins later at runtime.
 * - height or width: pick one to preserve aspect ratio
 * - grid: 'vertical' or 'diagonal' (diagonal pairs nicely with hexagons)
 */
const mapJsonString = getMapJSON({
  height: 60,
  grid: 'vertical'
});

const outPath = `${__dirname}/../lib/maps/world-60-vertical.json`;
mkdirSync(`${__dirname}/../lib/maps`, { recursive: true });
writeFileSync(outPath, mapJsonString, 'utf8');

console.log(`✔ Precomputed map saved: ${outPath}`);
