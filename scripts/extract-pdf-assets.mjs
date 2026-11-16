// ─────────────────────────────────────────────────────────────────────────────
// extract-pdf-assets.mjs
// Pulls the visuals the website needs out of the original project PDFs.
//
//   npm run assets:extract
//
// Two kinds of job:
//   { rect: [x0,y0,x1,y1] }  → renders the page at high resolution and crops a
//                               normalised region (0–1). Used for vector artwork
//                               (labels, dielines, grids) and for renders whose
//                               transparency masks are lost on raw extraction.
//   { image: n }             → saves the n-th embedded raster image (1-based)
//                               at its native resolution.
//
// Output: source-material/_extracted/<project>/<name>.png  (derived files —
// the PDFs in source-material/pdfs are never modified).
// Uses mupdf (AGPL) as a local dev tool only; nothing from it ships to the site.
// ─────────────────────────────────────────────────────────────────────────────
import * as mupdf from "mupdf";
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const PDF_DIR = path.join(ROOT, "source-material", "pdfs");
const OUT = path.join(ROOT, "source-material", "_extracted");

const R = (name, page, rect, width = 2200) => ({ name, page, rect, width });
const I = (name, page, image) => ({ name, page, image });
const FULL = [0, 0, 1, 1];

const JOBS = {
  "CREMA.pdf": {
    project: "be-star",
    jobs: [
      R("be-star-silueta-tarro", 2, [0.06, 0.4, 0.86, 0.97], 1800),
      I("be-star-esko-tarro", 3, 3),
      R("be-star-troquel-caja", 4, [0.04, 0.44, 0.96, 0.97]),
      I("be-star-esko-caja-plegado", 5, 2),
      I("be-star-esko-caja-3d", 5, 4),
      I("be-star-esko-simulacion-1", 6, 2),
      I("be-star-esko-simulacion-2", 6, 3),
      R("be-star-tipografia", 9, [0.05, 0.2, 0.95, 0.9], 1800),
      R("be-star-etiqueta-plano", 10, [0.06, 0.5, 0.95, 0.87], 2600),
      R("be-star-etiqueta-acabados", 11, [0.03, 0.17, 0.97, 0.98], 2400),
      R("be-star-tarro-vistas", 12, [0.04, 0.14, 0.96, 0.87], 2400),
      R("be-star-tapas-flotantes-estudio", 13, [0.2, 0.07, 0.8, 0.97], 1800),
      R("be-star-caja-tres-vistas", 15, [0.02, 0.4, 0.98, 0.95], 2400),
      R("be-star-caja-acabados", 16, [0.03, 0.13, 0.97, 0.97], 2400),
      R("be-star-caja-seis-vistas", 17, [0.06, 0.12, 0.93, 0.94], 2400),
      R("be-star-normativas", 20, [0.08, 0.3, 0.92, 0.8], 1800),
      R("be-star-camisa-plano", 21, [0.09, 0.42, 0.91, 0.75], 2400),
      R("be-star-camisa-3d", 22, [0.03, 0.1, 0.97, 0.93], 2400),
    ],
  },
  "CERVEZA.pdf": {
    project: "valhalla",
    jobs: [
      R("valhalla-moodboard", 7, [0.04, 0.13, 0.96, 0.95], 2200),
      R("valhalla-tipografia", 9, [0.06, 0.14, 0.94, 0.95], 1800),
      I("valhalla-beer-etiqueta-dorsal", 10, 1),
      I("valhalla-beer-etiqueta-barco", 10, 2),
      I("valhalla-beer-etiqueta-cabeza", 10, 3),
      I("valhalla-beer-tapon", 10, 4),
      R("valhalla-beer-botellas-cabeza", 11, [0.06, 0.215, 0.94, 0.9]),
      R("valhalla-beer-botellas-barco", 12, [0.06, 0.215, 0.94, 0.9]),
      I("valhalla-gold-etiqueta-dorsal", 14, 1),
      I("valhalla-gold-etiqueta-barco", 14, 2),
      I("valhalla-gold-etiqueta-cabeza", 14, 3),
      I("valhalla-gold-tapon", 14, 4),
      R("valhalla-gold-botellas-cabeza", 15, [0.06, 0.215, 0.94, 0.9]),
      I("valhalla-radler-etiqueta-dorsal", 18, 1),
      I("valhalla-radler-etiqueta-barco", 18, 2),
      I("valhalla-radler-etiqueta-cabeza", 18, 3),
      I("valhalla-radler-tapon", 18, 4),
      R("valhalla-radler-botellas-cabeza", 19, [0.06, 0.215, 0.94, 0.9]),
      I("valhalla-beer-troquel-caja", 22, 1),
      I("valhalla-gold-troquel-caja", 23, 1),
      I("valhalla-radler-troquel-caja", 23, 2),
      R("valhalla-beer-caja-3d", 24, [0.02, 0.2, 0.95, 0.95]),
      R("valhalla-gold-caja-3d", 25, [0.02, 0.2, 0.95, 0.95]),
      R("valhalla-radler-caja-3d", 26, [0.02, 0.2, 0.95, 0.95]),
      R("valhalla-beer-caja-y-botellas", 27, [0.03, 0.21, 0.95, 0.95]),
      I("valhalla-beer-ambiente-barbacoa", 28, 1),
      I("valhalla-gold-ambiente-barbacoa", 30, 1),
      I("valhalla-radler-ambiente-grupo", 32, 1),
      I("valhalla-brindis-tres-variedades", 33, 1),
    ],
  },
  "CIRQUERA.pdf": {
    project: "cirquera",
    jobs: [
      R("cirquera-logotipo", 7, [0.36, 0.28, 0.98, 0.75], 2000),
      R("cirquera-logotipo-contorno", 8, [0.36, 0.28, 0.98, 0.75], 2000),
      R("cirquera-reticula", 9, [0.33, 0.25, 0.98, 0.85], 2000),
      R("cirquera-reproduccion-color", 10, [0.33, 0.08, 0.98, 0.92], 2000),
      R("cirquera-usos-incorrectos", 14, [0.33, 0.12, 0.98, 0.92], 2000),
      R("cirquera-tipografia", 18, FULL, 2400),
      R("cirquera-iconografia", 28, [0.33, 0, 1, 1], 2000),
      R("cirquera-iconografia-interaccion", 29, [0.33, 0, 1, 1], 2000),
      I("cirquera-ilustracion-columpios", 27, 2),
      I("cirquera-fotografia-correcta", 31, 1),
      I("cirquera-fotografia-incorrecta", 31, 2),
      I("cirquera-cartel-vertical", 33, 1),
      I("cirquera-cartel-horizontal", 34, 1),
      I("cirquera-tarjetas-mesa", 36, 1),
      I("cirquera-tarjetas-madera", 37, 1),
      I("cirquera-tarjetas-rojas", 38, 1),
      I("cirquera-post-instagram", 41, 1),
      I("cirquera-app-acceso", 42, 1),
      I("cirquera-app-perfil", 42, 2),
      R("cirquera-portada-degradado", 43, FULL, 2400),
    ],
  },
  "INDOMITA.pdf": {
    project: "indomita",
    jobs: [
      R("indomita-portada-manual", 1, FULL, 2400),
      I("indomita-construccion", 6, 3),
      I("indomita-area-proteccion", 8, 3),
      R("indomita-medidas-serigrafia", 10, [0, 0.15, 1, 0.97], 2000),
      R("indomita-medidas-digital", 11, [0, 0.15, 1, 0.97], 2000),
      R("indomita-colores", 13, [0, 0.15, 1, 0.97], 2000),
      R("indomita-tipografia-principal", 16, [0, 0.15, 1, 0.97], 2000),
      R("indomita-tipografia-secundaria", 17, [0, 0.15, 1, 0.97], 2000),
      I("indomita-variante-fotografia", 19, 3),
      I("indomita-variante-apilada-fotografia", 19, 4),
      I("indomita-variante-apilada-verde", 19, 5),
      I("indomita-variante-naranja-vertical", 19, 6),
      I("indomita-variante-naranja-apilada", 19, 7),
      I("indomita-variante-negro", 19, 8),
      I("indomita-app-pantalla", 20, 3),
      I("indomita-app-icono", 20, 4),
      I("indomita-incorrecto-color-negro", 22, 3),
      I("indomita-incorrecto-simbolo-girado", 22, 4),
      I("indomita-incorrecto-rotacion", 22, 5),
      I("indomita-incorrecto-color-verde", 22, 6),
      I("indomita-incorrecto-tipografia", 22, 7),
      I("indomita-incorrecto-composicion", 22, 8),
    ],
  },
  "Revista_Fernando_Alonso.pdf": {
    project: "hotrace",
    jobs: [
      R("hotrace-portada", 1, FULL, 1800),
      R("hotrace-pliego-formula-1", 2, FULL, 2800),
      R("hotrace-pliego-temporada", 3, FULL, 2800),
      R("hotrace-pliego-aston-martin", 4, FULL, 2800),
      R("hotrace-pliego-fallows", 5, FULL, 2800),
    ],
  },
  "herb_lubalin.pdf": {
    project: "herb-lubalin",
    jobs: [
      R("herb-lubalin-portada", 1, FULL, 1800),
      R("herb-lubalin-pliego-biografia", 2, FULL, 2800),
      R("herb-lubalin-pliego-disenos", 3, FULL, 2800),
    ],
  },
  "Portfolio_reducido.pdf": {
    project: "portfolio-pdf",
    jobs: [
      I("portfolio-textura-papel", 4, 1),
      R("portfolio-contacto-check", 2, [0.0, 0.85, 1, 1], 2400),
      I("be-star-gama-piedra", 17, 1),
      I("be-star-caja-marmol", 18, 1),
      I("hotrace-marquesina", 7, 1),
      I("hotrace-revistas-pila", 7, 2),
      I("hotrace-pliego-aston-martin-mockup", 6, 5),
      I("cirquera-acrobata-escenario", 28, 1),
      I("cirquera-carpa-noche", 29, 1),
    ],
  },
};

function renderCrop(doc, job) {
  const page = doc.loadPage(job.page - 1);
  const [X0, Y0, X1, Y1] = page.getBounds();
  const W = X1 - X0, H = Y1 - Y0;
  const [rx0, ry0, rx1, ry1] = job.rect;
  const scale = Math.min(60, job.width / ((rx1 - rx0) * W));
  const pix = page.toPixmap(mupdf.Matrix.scale(scale, scale), mupdf.ColorSpace.DeviceRGB, false, true);
  const pw = pix.getWidth(), ph = pix.getHeight();
  const crop = [Math.round(rx0 * pw), Math.round(ry0 * ph), Math.round(rx1 * pw), Math.round(ry1 * ph)];
  return { png: pix.asPNG(), crop, pw, ph };
}

function nthImage(doc, job) {
  const page = doc.loadPage(job.page - 1);
  let i = 0, found = null;
  page.toStructuredText("preserve-images").walk({
    onImageBlock(b, m, img) {
      if (++i === job.image) found = img;
    },
  });
  if (!found) throw new Error(`image ${job.image} not found on page ${job.page}`);
  let pix = found.toPixmap();
  const n = pix.getNumberOfComponents() - (pix.getAlpha() ? 1 : 0);
  if (n !== 3) pix = pix.convertToColorSpace(mupdf.ColorSpace.DeviceRGB);
  return pix.asPNG();
}

const sharp = (await import("sharp")).default;

for (const [file, { project, jobs }] of Object.entries(JOBS)) {
  const doc = mupdf.Document.openDocument(fs.readFileSync(path.join(PDF_DIR, file)), "application/pdf");
  const dir = path.join(OUT, project);
  fs.mkdirSync(dir, { recursive: true });
  for (const job of jobs) {
    const out = path.join(dir, `${job.name}.png`);
    try {
      if (job.rect) {
        const { png, crop } = renderCrop(doc, job);
        await sharp(png, { limitInputPixels: false })
          .extract({ left: crop[0], top: crop[1], width: crop[2] - crop[0], height: crop[3] - crop[1] })
          .png()
          .toFile(out);
      } else {
        fs.writeFileSync(out, nthImage(doc, job));
      }
      const m = await sharp(out).metadata();
      console.log(`✓ ${project}/${job.name}.png  ${m.width}×${m.height}`);
    } catch (e) {
      console.error(`✗ ${project}/${job.name}: ${e.message}`);
    }
  }
}
