// news-image-20261125 — entry program (Node 22, standard library only).
//
// The entry is a newspaper front page, entry.png, summarising the world's
// news of Wednesday 25 November 2026. It lives beside this file. All this
// program does is carry those exact bytes to the grader's output
// directory, after proving the file is a real PNG and that the copy came
// out identical. It writes no timestamps and no random data, so running
// it twice produces the same bytes, as the rules require.
//
// Run it locally with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { createHash } from 'node:crypto';
import { copyFileSync, mkdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const PNG_MAGIC = Buffer.from([
  0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
]);
const IHDR_TAG = Buffer.from('IHDR', 'ascii');
const SOURCE_NAME = 'entry.png';

function sha256Hex(bytes: Buffer): string {
  return createHash('sha256').update(bytes).digest('hex');
}

// A file is a PNG worth shipping only when it opens with the 8-byte PNG
// signature and its first chunk is IHDR. Anything else is refused loudly
// instead of being handed to the judge.
function assertPng(bytes: Buffer, label: string): void {
  if (bytes.length < 33) {
    throw new Error(`${label} is too short to be a PNG (${bytes.length} bytes)`);
  }
  if (!bytes.subarray(0, 8).equals(PNG_MAGIC)) {
    throw new Error(`${label} does not start with the PNG signature`);
  }
  if (!bytes.subarray(12, 16).equals(IHDR_TAG)) {
    throw new Error(`${label} has no IHDR chunk where a PNG must have one`);
  }
}

function main(): void {
  const here = dirname(fileURLToPath(import.meta.url));
  const source = join(here, SOURCE_NAME);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
  const target = join(outDir, SOURCE_NAME);

  const bytes = readFileSync(source);
  assertPng(bytes, SOURCE_NAME);

  mkdirSync(outDir, { recursive: true });
  copyFileSync(source, target);

  // The copy must be exact: same size and same SHA-256 on both sides.
  const copied = readFileSync(target);
  if (copied.length !== bytes.length || sha256Hex(copied) !== sha256Hex(bytes)) {
    throw new Error(`${SOURCE_NAME} copy is not byte-identical`);
  }

  console.log(
    `${SOURCE_NAME}: ${bytes.length} bytes, sha256 ${sha256Hex(bytes)}, written to ${target}`,
  );
}

main();
