// ─────────────────────────────────────────────────────────────────────────────
// Every image used on the website, keyed by a stable id.
// key → source file (relative to /source-material).
//   images/…      original files supplied by Iván (renders, mockups, photos)
//   _extracted/…  crops generated from the PDFs by `npm run assets:extract`
// Alt text, captions and image-type labels live with the content in
// src/data/projects.ts — this file only says where the pixels come from.
// To add an image: add a line here, run `npm run assets:build`, reference the key.
// ─────────────────────────────────────────────────────────────────────────────
const X = (p, f) => `_extracted/${p}/${f}.png`;

export const ASSETS = {
  // ── Personal ──────────────────────────────────────────────────────────────
  "personal/retrato-polaroid": "images/personal/ivan-ordonez-retrato-polaroid.png",
  "personal/textura-papel": X("portfolio-pdf", "portfolio-textura-papel"),

  // ── Be Star ───────────────────────────────────────────────────────────────
  "be-star/caja-y-tarro-render": "images/crema/be-star-caja-y-tarro-render.png",
  "be-star/escena-tapas": "images/crema/be-star-tapas-flotantes-escena.png",
  "be-star/lifestyle-modelo": "images/crema/be-star-lifestyle-modelo.png",
  "be-star/gama-piedra": X("portfolio-pdf", "be-star-gama-piedra"),
  "be-star/caja-marmol": X("portfolio-pdf", "be-star-caja-marmol"),
  "be-star/silueta-tarro": X("be-star", "be-star-silueta-tarro"),
  "be-star/esko-tarro": X("be-star", "be-star-esko-tarro"),
  "be-star/troquel-caja": X("be-star", "be-star-troquel-caja"),
  "be-star/esko-caja-plegado": X("be-star", "be-star-esko-caja-plegado"),
  "be-star/esko-caja-3d": X("be-star", "be-star-esko-caja-3d"),
  "be-star/esko-simulacion-1": X("be-star", "be-star-esko-simulacion-1"),
  "be-star/esko-simulacion-2": X("be-star", "be-star-esko-simulacion-2"),
  "be-star/tipografia": X("be-star", "be-star-tipografia"),
  "be-star/etiqueta-plano": X("be-star", "be-star-etiqueta-plano"),
  "be-star/etiqueta-acabados": X("be-star", "be-star-etiqueta-acabados"),
  "be-star/tarro-vistas": X("be-star", "be-star-tarro-vistas"),
  "be-star/tapas-flotantes-estudio": X("be-star", "be-star-tapas-flotantes-estudio"),
  "be-star/caja-tres-vistas": X("be-star", "be-star-caja-tres-vistas"),
  "be-star/caja-acabados": X("be-star", "be-star-caja-acabados"),
  "be-star/caja-seis-vistas": X("be-star", "be-star-caja-seis-vistas"),
  "be-star/normativas": X("be-star", "be-star-normativas"),
  "be-star/camisa-plano": X("be-star", "be-star-camisa-plano"),
  "be-star/camisa-3d": X("be-star", "be-star-camisa-3d"),

  // ── Valhalla ──────────────────────────────────────────────────────────────
  "valhalla/cajas-tres-variedades": "images/cerveza/valhalla-cajas-tres-variedades.jpg",
  "valhalla/gama-seis-botellas": "images/cerveza/valhalla-gama-seis-botellas.jpg",
  "valhalla/grifos": "images/cerveza/valhalla-grifos-cerveza.jpg",
  "valhalla/cubo-hielo": "images/cerveza/valhalla-cubo-hielo-render.png",
  "valhalla/moodboard": X("valhalla", "valhalla-moodboard"),
  "valhalla/tipografia": X("valhalla", "valhalla-tipografia"),
  "valhalla/brindis": X("valhalla", "valhalla-brindis-tres-variedades"),
  "valhalla/beer-caja-y-botellas": X("valhalla", "valhalla-beer-caja-y-botellas"),
  "valhalla/beer-ambiente": X("valhalla", "valhalla-beer-ambiente-barbacoa"),
  "valhalla/gold-ambiente": X("valhalla", "valhalla-gold-ambiente-barbacoa"),
  "valhalla/radler-ambiente": X("valhalla", "valhalla-radler-ambiente-grupo"),
  ...Object.fromEntries(
    ["beer", "gold", "radler"].flatMap((v) => [
      [`valhalla/${v}-etiqueta-dorsal`, X("valhalla", `valhalla-${v}-etiqueta-dorsal`)],
      [`valhalla/${v}-etiqueta-barco`, X("valhalla", `valhalla-${v}-etiqueta-barco`)],
      [`valhalla/${v}-etiqueta-cabeza`, X("valhalla", `valhalla-${v}-etiqueta-cabeza`)],
      [`valhalla/${v}-tapon`, X("valhalla", `valhalla-${v}-tapon`)],
      [`valhalla/${v}-botellas`, X("valhalla", `valhalla-${v}-botellas-cabeza`)],
      [`valhalla/${v}-troquel`, X("valhalla", `valhalla-${v}-troquel-caja`)],
      [`valhalla/${v}-caja-3d`, X("valhalla", `valhalla-${v}-caja-3d`)],
    ]),
  ),
  "valhalla/beer-botellas-barco": X("valhalla", "valhalla-beer-botellas-barco"),

  // ── Cirquera ──────────────────────────────────────────────────────────────
  "cirquera/columna-morris": "images/cirquera/cirquera-columna-morris-mockup.png",
  "cirquera/valla": "images/cirquera/cirquera-valla-publicitaria-mockup.png",
  "cirquera/mupi": "images/cirquera/cirquera-mupi-mockup.jpg",
  "cirquera/tote-bag": "images/cirquera/cirquera-tote-bag-mockup.png",
  "cirquera/fotografia-carpa": "images/cirquera/cirquera-fotografia-carpa.jpg",
  "cirquera/ilustracion-red": "images/cirquera/cirquera-ilustracion-red-rombos.jpg",
  "cirquera/ilustracion-equilibrista": "images/cirquera/cirquera-ilustracion-equilibrista.jpg",
  "cirquera/ilustracion-trapecio": "images/cirquera/cirquera-ilustracion-trapecio-rombos.jpg",
  "cirquera/ilustracion-columpios": X("cirquera", "cirquera-ilustracion-columpios"),
  "cirquera/logotipo": X("cirquera", "cirquera-logotipo"),
  "cirquera/logotipo-contorno": X("cirquera", "cirquera-logotipo-contorno"),
  "cirquera/reticula": X("cirquera", "cirquera-reticula"),
  "cirquera/reproduccion-color": X("cirquera", "cirquera-reproduccion-color"),
  "cirquera/usos-incorrectos": X("cirquera", "cirquera-usos-incorrectos"),
  "cirquera/tipografia": X("cirquera", "cirquera-tipografia"),
  "cirquera/iconografia": X("cirquera", "cirquera-iconografia"),
  "cirquera/iconografia-interaccion": X("cirquera", "cirquera-iconografia-interaccion"),
  "cirquera/fotografia-correcta": X("cirquera", "cirquera-fotografia-correcta"),
  "cirquera/fotografia-incorrecta": X("cirquera", "cirquera-fotografia-incorrecta"),
  "cirquera/cartel-vertical": X("cirquera", "cirquera-cartel-vertical"),
  "cirquera/cartel-horizontal": X("cirquera", "cirquera-cartel-horizontal"),
  "cirquera/tarjetas-mesa": X("cirquera", "cirquera-tarjetas-mesa"),
  "cirquera/tarjetas-madera": X("cirquera", "cirquera-tarjetas-madera"),
  "cirquera/tarjetas-rojas": X("cirquera", "cirquera-tarjetas-rojas"),
  "cirquera/post-instagram": X("cirquera", "cirquera-post-instagram"),
  "cirquera/app-acceso": X("cirquera", "cirquera-app-acceso"),
  "cirquera/app-perfil": X("cirquera", "cirquera-app-perfil"),
  "cirquera/portada-degradado": X("cirquera", "cirquera-portada-degradado"),
  "cirquera/acrobata-escenario": X("portfolio-pdf", "cirquera-acrobata-escenario"),

  // ── Indómita ──────────────────────────────────────────────────────────────
  "indomita/logotipo-verde": "images/indomita/indomita-logotipo-verde.png",
  "indomita/escocia-gaitero": "images/indomita/indomita-escocia-cartel-gaitero.jpg",
  "indomita/escocia-viaducto": "images/indomita/indomita-escocia-cartel-viaducto.jpg",
  "indomita/portada-manual": X("indomita", "indomita-portada-manual"),
  "indomita/construccion": X("indomita", "indomita-construccion"),
  "indomita/area-proteccion": X("indomita", "indomita-area-proteccion"),
  "indomita/medidas-serigrafia": X("indomita", "indomita-medidas-serigrafia"),
  "indomita/medidas-digital": X("indomita", "indomita-medidas-digital"),
  "indomita/tipografia-principal": X("indomita", "indomita-tipografia-principal"),
  "indomita/tipografia-secundaria": X("indomita", "indomita-tipografia-secundaria"),
  "indomita/variante-fotografia": X("indomita", "indomita-variante-fotografia"),
  "indomita/variante-apilada-fotografia": X("indomita", "indomita-variante-apilada-fotografia"),
  "indomita/variante-apilada-verde": X("indomita", "indomita-variante-apilada-verde"),
  "indomita/variante-naranja-vertical": X("indomita", "indomita-variante-naranja-vertical"),
  "indomita/variante-naranja-apilada": X("indomita", "indomita-variante-naranja-apilada"),
  "indomita/variante-negro": X("indomita", "indomita-variante-negro"),
  "indomita/app-pantalla": X("indomita", "indomita-app-pantalla"),
  "indomita/app-icono": X("indomita", "indomita-app-icono"),
  "indomita/incorrecto-color-negro": X("indomita", "indomita-incorrecto-color-negro"),
  "indomita/incorrecto-simbolo-girado": X("indomita", "indomita-incorrecto-simbolo-girado"),
  "indomita/incorrecto-rotacion": X("indomita", "indomita-incorrecto-rotacion"),
  "indomita/incorrecto-color-verde": X("indomita", "indomita-incorrecto-color-verde"),
  "indomita/incorrecto-tipografia": X("indomita", "indomita-incorrecto-tipografia"),
  "indomita/incorrecto-composicion": X("indomita", "indomita-incorrecto-composicion"),

  // ── HOTRACE ───────────────────────────────────────────────────────────────
  "hotrace/quiosco": "images/revista_alonso/hotrace-quiosco-mockup.png",
  "hotrace/portada-y-pliego-mockup": "images/revista_alonso/hotrace-portada-y-doble-pagina-mockup.png",
  "hotrace/pliego-mockup": "images/revista_alonso/hotrace-doble-pagina-mockup.png",
  "hotrace/marquesina": X("portfolio-pdf", "hotrace-marquesina"),
  "hotrace/revistas-pila": X("portfolio-pdf", "hotrace-revistas-pila"),
  "hotrace/aston-martin-mockup": X("portfolio-pdf", "hotrace-pliego-aston-martin-mockup"),
  "hotrace/portada": X("hotrace", "hotrace-portada"),
  "hotrace/pliego-formula-1": X("hotrace", "hotrace-pliego-formula-1"),
  "hotrace/pliego-temporada": X("hotrace", "hotrace-pliego-temporada"),
  "hotrace/pliego-aston-martin": X("hotrace", "hotrace-pliego-aston-martin"),
  "hotrace/pliego-fallows": X("hotrace", "hotrace-pliego-fallows"),

  // ── Herb Lubalin ──────────────────────────────────────────────────────────
  "herb-lubalin/portada": X("herb-lubalin", "herb-lubalin-portada"),
  "herb-lubalin/pliego-biografia": X("herb-lubalin", "herb-lubalin-pliego-biografia"),
  "herb-lubalin/pliego-disenos": X("herb-lubalin", "herb-lubalin-pliego-disenos"),
  "herb-lubalin/fasciculo-pliegos": "images/herb_lubalin/herb-lubalin-fasciculo-pliegos.png",
  "herb-lubalin/revista-manos": "images/herb_lubalin/herb-lubalin-revista-mockup-manos.png",
  "herb-lubalin/ref-playstreet": "images/herb_lubalin/referencia-lubalin-playstreet.jpg",
  "herb-lubalin/ref-no-more-war": "images/herb_lubalin/referencia-lubalin-no-more-war.jpg",
  "herb-lubalin/ref-first-harvest": "images/herb_lubalin/referencia-lubalin-first-harvest.jpg",
  "herb-lubalin/ref-pbs": "images/herb_lubalin/referencia-lubalin-pbs.jpg",
  "herb-lubalin/ref-fact": "images/herb_lubalin/referencia-lubalin-fact.jpg",
  "herb-lubalin/ref-saturday-evening-post": "images/herb_lubalin/referencia-lubalin-saturday-evening-post.jpg",
};

/** Social cards (1200×630) cropped from one image per project. */
export const OG = {
  default: "personal/retrato-polaroid",
  "be-star": "be-star/gama-piedra",
  valhalla: "valhalla/cajas-tres-variedades",
  cirquera: "cirquera/columna-morris",
  indomita: "indomita/variante-fotografia",
  hotrace: "hotrace/quiosco",
  "herb-lubalin": "herb-lubalin/revista-manos",
};
