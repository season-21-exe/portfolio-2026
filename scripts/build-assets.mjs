// ─────────────────────────────────────────────────────────────────────────────
// build-assets.mjs — responsive, optimised images for the website.
//
//   npm run assets:build            (incremental: skips unchanged sources)
//   npm run assets:build -- --force (rebuild everything)
//
// For every key in scripts/asset-sources.mjs it writes
//   public/assets/<group>/<name>-<width>.avif|webp   (several widths)
// and a manifest at src/data/assets.generated.json with intrinsic size,
// available widths, a tiny blurred placeholder and the dominant colour —
// so every <img> ships explicit dimensions (no layout shift).
// Also writes 1200×630 social cards to public/og/.
// ─────────────────────────────────────────────────────────────────────────────
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";
import { ASSETS, OG } from "./asset-sources.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "source-material");
const PUB = path.join(ROOT, "public");
const MANIFEST = path.join(ROOT, "src", "data", "assets.generated.json");
const FORCE = process.argv.includes("--force");
const WIDTHS = [480, 800, 1200, 1800, 2400];

sharp.cache(false);
sharp.concurrency(4);

const outBase = (key) => {
  const [group, name] = key.split("/");
  const dir = group === "personal" ? "global" : `projects/${group}`;
  return { dir: path.join(PUB, "assets", dir), url: `/assets/${dir}/${name}`, name };
};

const old = fs.existsSync(MANIFEST) ? JSON.parse(fs.readFileSync(MANIFEST, "utf8")) : {};
const manifest = {};

async function processKey(key, rel) {
  const src = path.join(SRC, rel);
  if (!fs.existsSync(src)) throw new Error(`missing source ${rel}`);
  const { dir, url, name } = outBase(key);
  fs.mkdirSync(dir, { recursive: true });

  const meta = await sharp(src, { limitInputPixels: false }).metadata();
  const w0 = meta.width, h0 = meta.height;
  let widths = WIDTHS.filter((w) => w < w0);
  if (w0 <= 2400) widths.push(w0);
  widths = [...new Set(widths)].sort((a, b) => a - b);
  if (!widths.length) widths = [Math.min(w0, 2400)];
  if (widths[widths.length - 1] > 2400) widths = widths.filter((w) => w <= 2400);

  const largest = path.join(dir, `${name}-${widths[widths.length - 1]}.webp`);
  const fresh = !FORCE && old[key] && fs.existsSync(largest) && fs.statSync(largest).mtimeMs > fs.statSync(src).mtimeMs;
  if (fresh) {
    manifest[key] = old[key];
    return "cached";
  }

  // Real transparency? (alpha channel with at least some non-opaque pixels)
  let alpha = false;
  if (meta.hasAlpha) {
    const st = await sharp(src, { limitInputPixels: false }).stats();
    alpha = st.channels[3] && st.channels[3].min < 250;
  }

  for (const w of widths) {
    const base = sharp(src, { limitInputPixels: false }).resize({ width: w, withoutEnlargement: true });
    const img = alpha ? base : base.flatten({ background: "#ffffff" });
    await img.clone().avif({ quality: 52, effort: 3 }).toFile(path.join(dir, `${name}-${w}.avif`));
    await img.clone().webp({ quality: 80, alphaQuality: 90 }).toFile(path.join(dir, `${name}-${w}.webp`));
  }

  const ph = await sharp(src, { limitInputPixels: false }).resize({ width: 24 }).webp({ quality: 40 }).toBuffer();
  const { dominant } = await sharp(src, { limitInputPixels: false }).resize({ width: 64 }).stats();
  const h = Math.round((h0 * Math.min(w0, widths[widths.length - 1])) / w0);
  manifest[key] = {
    src: url,
    width: Math.min(w0, widths[widths.length - 1]),
    height: h,
    widths,
    alpha,
    placeholder: `data:image/webp;base64,${ph.toString("base64")}`,
    color: `rgb(${dominant.r},${dominant.g},${dominant.b})`,
  };
  return "built";
}

const entries = Object.entries(ASSETS);
let i = 0, built = 0, cached = 0, failed = 0;
async function worker() {
  while (i < entries.length) {
    const [key, rel] = entries[i++];
    try {
      const r = await processKey(key, rel);
      r === "built" ? built++ : cached++;
      if (r === "built") console.log(`✓ ${key}`);
    } catch (e) {
      failed++;
      console.error(`✗ ${key}: ${e.message}`);
    }
  }
}
await Promise.all([worker(), worker(), worker()]);

const sorted = Object.fromEntries(Object.keys(ASSETS).filter((k) => manifest[k]).map((k) => [k, manifest[k]]));
fs.mkdirSync(path.dirname(MANIFEST), { recursive: true });
fs.writeFileSync(MANIFEST, JSON.stringify(sorted, null, 2));

// ── Social cards ────────────────────────────────────────────────────────────
const OG_DIR = path.join(PUB, "og");
fs.mkdirSync(OG_DIR, { recursive: true });
for (const [slug, key] of Object.entries(OG)) {
  const src = path.join(SRC, ASSETS[key]);
  const out = path.join(OG_DIR, `${slug}.jpg`);
  if (slug === "default") {
    // Paper card: name set big, red plate out of register, polaroid on the right.
    const portrait = await sharp(src).resize({ height: 470 }).rotate(4, { background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
    const pm = await sharp(portrait).metadata();
    const type = (fill, dx, dy) => `
      <text x="${60 + dx}" y="${250 + dy}" font-family="Arial Black, Archivo, sans-serif" font-size="128" font-weight="900" fill="${fill}" letter-spacing="-4">IVÁN</text>
      <text x="${60 + dx}" y="${370 + dy}" font-family="Arial Black, Archivo, sans-serif" font-size="128" font-weight="900" fill="${fill}" letter-spacing="-4">ORDÓÑEZ</text>`;
    const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="630" fill="#E8E7E2"/>
      <g style="mix-blend-mode:multiply">${type("#FF3D17", 7, -5)}</g>
      ${type("#1A1918", 0, 0)}
      <text x="64" y="450" font-family="Arial, sans-serif" font-size="30" fill="#1A1918">Diseño gráfico — identidad, packaging y editorial</text>
      <text x="64" y="560" font-family="Arial Narrow, Arial, sans-serif" font-size="20" fill="#4B4A47">ivan-ordonez_portfolio.indd</text>
      <rect x="64" y="585" width="40" height="14" fill="#FF3D17"/><rect x="104" y="585" width="40" height="14" fill="#1A1918"/><rect x="144" y="585" width="40" height="14" fill="#8B8984"/>
    </svg>`;
    await sharp(Buffer.from(svg))
      .composite([{ input: portrait, left: 1200 - pm.width - 30, top: Math.round((630 - pm.height) / 2) }])
      .jpeg({ quality: 84, mozjpeg: true })
      .toFile(out);
  } else {
    await sharp(src, { limitInputPixels: false })
      .flatten({ background: "#1A1918" })
      .resize(1200, 630, { fit: "cover", position: "attention" })
      .jpeg({ quality: 80, mozjpeg: true })
      .toFile(out);
  }
}

console.log(`\nassets: ${built} built, ${cached} cached, ${failed} failed → ${path.relative(ROOT, MANIFEST)}`);
if (failed) process.exitCode = 1;
