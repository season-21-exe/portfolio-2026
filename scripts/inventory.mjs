// Prints a markdown table of every web asset: key, source file, size, the
// image-type label it carries on the site, and transparency. Used to keep
// docs/ASSET_INVENTORY.md in sync:  node scripts/inventory.mjs > table.md
import fs from "node:fs";
import path from "node:path";
import { ASSETS } from "./asset-sources.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const man = JSON.parse(fs.readFileSync(path.join(ROOT, "src/data/assets.generated.json"), "utf8"));
const src = fs.readFileSync(path.join(ROOT, "src/data/projects.ts"), "utf8");

const used = {};
const re = /m\(\s*"([^"]+)",\s*"(?:[^"\\]|\\.)*",\s*"([a-z-]+)"/g;
for (const mm of src.matchAll(re)) (used[mm[1]] ??= new Set()).add(mm[2]);
const extra = { "personal/retrato-polaroid": "photo (About)", "personal/textura-papel": "texture (paper surfaces)" };

const rows = ["| Key | Source (in /source-material) | Size (px) | Label on site | Alpha |", "|---|---|---|---|---|"];
const unused = [];
for (const [k, rel] of Object.entries(ASSETS)) {
  const a = man[k];
  const kinds = used[k] ? [...used[k]].join(", ") : extra[k];
  if (!kinds) unused.push(k);
  rows.push(`| \`${k}\` | \`${rel}\` | ${a ? `${a.width}×${a.height}` : "?"} | ${kinds ?? "— (not used)"} | ${a?.alpha ? "yes" : ""} |`);
}
console.log(rows.join("\n"));
console.error(`${Object.keys(ASSETS).length} assets; unused: ${unused.join(", ") || "none"}`);
