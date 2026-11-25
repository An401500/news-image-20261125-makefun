// news-image-20261125 entry (Node 22, standard library only).
// The front page for Wednesday 25 November 2026 is entry.png, rendered
// beside this file. This program copies it, byte for byte, to the
// grader's output directory, so the judge sees exactly those bytes.
//
// Local run:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, readFileSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, 'entry.png');
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const target = join(outDir, 'entry.png');

// Fail loudly on a corrupt source instead of shipping a bad image.
const header = readFileSync(source, { encoding: null }).subarray(0, 8);
const pngMagic = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
if (!header.equals(pngMagic)) {
  throw new Error('entry.png is not a PNG file');
}

copyFileSync(source, target);

// The copy must be exact: same byte count in, same byte count out.
// No timestamps or random data are written, so two runs produce
// identical bytes, as the rules require.
if (statSync(source).size !== statSync(target).size) {
  throw new Error('entry.png copy is not byte-identical');
}
