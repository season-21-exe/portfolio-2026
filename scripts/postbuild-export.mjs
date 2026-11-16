// ─────────────────────────────────────────────────────────────────────────────
// postbuild-export.mjs
// Next 16's static export can write route-segment prefetch files as nested
// folders (e.g. `__next.projects/$d$slug/__PAGE__.txt`, notably on Windows)
// while the client router requests the flat, dotted name
// (`__next.projects.$d$slug.__PAGE__.txt`). This copies every nested segment
// file to its flat name so client-side navigation prefetches don't 404.
// Safe to run on any OS: it only adds files that are missing.
// ─────────────────────────────────────────────────────────────────────────────
import fs from "node:fs";
import path from "node:path";

const OUT = path.resolve(import.meta.dirname, "..", "out");
let added = 0;

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name.startsWith("__next.")) flatten(dir, full, entry.name);
      else walk(full);
    }
  }
}

function flatten(parent, nestedRoot, prefix) {
  for (const entry of fs.readdirSync(nestedRoot, { withFileTypes: true })) {
    const full = path.join(nestedRoot, entry.name);
    const name = `${prefix}.${entry.name}`;
    if (entry.isDirectory()) flatten(parent, full, name);
    else {
      const target = path.join(parent, name);
      if (!fs.existsSync(target)) {
        fs.copyFileSync(full, target);
        added++;
      }
    }
  }
}

if (fs.existsSync(OUT)) {
  walk(OUT);
  console.log(`postbuild: ${added} flattened segment file(s) written`);
}
