import type { DraftProject, Media, Project, Variety } from "./types";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * PROJECTS — single source of truth for the home index and the case studies.
 *
 * Every fact here comes from the PDFs in /source-material/pdfs. Nothing is
 * invented: undocumented fields are `null` and listed in
 * docs/CONTENT_TO_CONFIRM.md. Images are referenced by key (see
 * scripts/asset-sources.mjs) and each declares what it is (`kind`).
 *
 * Order of the array = order on the home page.
 * To add a project: append an object, add its images to asset-sources.mjs,
 * run `npm run assets:build`. The route /projects/<slug> is generated.
 * ─────────────────────────────────────────────────────────────────────────────
 */

const m = (key: Media["key"], alt: string, kind: Media["kind"], extra: Partial<Media> = {}): Media => ({ key, alt, kind, ...extra });

// ════════════════════════════════════════════════════════════════════════════
// VALHALLA
// ════════════════════════════════════════════════════════════════════════════
/** Shared by the family matrix and the variety switcher. */
const valhallaVarieties: Variety[] = [
  {
    id: "beer",
    name: "Valhalla Beer",
    tagline: "La principal",
    description: "La cerveza principal de la gama, de sabor suave. Beige y azul noche.",
    theme: { bg: "#EADCBF", ink: "#1C2C3E", accent: "#1C2C3E" },
    colors: [
      { name: "Beige", hex: "#EADCBF", cmyk: "C10 M13 Y29 K0", rgb: "234 220 191" },
      { name: "Azul noche", hex: "#1C2C3E", cmyk: "C93 M74 Y48 K55", rgb: "28 44 62" },
    ],
    labels: [
      m("valhalla/beer-etiqueta-cabeza", "Etiqueta frontal de Valhalla Beer con una cabeza vikinga en azul sobre beige.", "flat"),
      m("valhalla/beer-etiqueta-barco", "Etiqueta frontal de Valhalla Beer con un drakkar en azul sobre beige.", "flat"),
      m("valhalla/beer-etiqueta-dorsal", "Etiqueta dorsal de Valhalla Beer con cenefas nórdicas, información nutricional y código de barras.", "flat"),
    ],
    cap: m("valhalla/beer-tapon", "Etiqueta de tapón de Valhalla Beer: nudo celta azul sobre beige.", "flat"),
    bottles: m("valhalla/beer-botellas", "Cuatro vistas 3D de la botella de Valhalla Beer: frontal, lateral, dorsal y tres cuartos.", "render"),
    box: m("valhalla/beer-caja-3d", "Tres vistas 3D de la caja de dos botellas de Valhalla Beer.", "render"),
    dieline: m("valhalla/beer-troquel", "Troquel desplegado de la caja de Valhalla Beer.", "flat"),
    scene: m("valhalla/beer-ambiente", "Caja y botellas de Valhalla Beer sobre una mesa de picnic junto a una barbacoa.", "ambient"),
  },
  {
    id: "gold",
    name: "Valhalla Gold",
    tagline: "La intensa",
    description: "Sabor más fuerte. El dorado resalta las ilustraciones sobre un negro intenso.",
    theme: { bg: "#0A0A0A", ink: "#CBAD4E", accent: "#CBAD4E" },
    colors: [
      { name: "Negro", hex: "#000000", cmyk: "C91 M79 Y62 K97", rgb: "0 0 0" },
      { name: "Oro", hex: "#CBAD4E", cmyk: "C21 M27 Y76 K6", rgb: "203 173 78" },
    ],
    labels: [
      m("valhalla/gold-etiqueta-cabeza", "Etiqueta frontal de Valhalla Gold con la cabeza vikinga en dorado sobre negro.", "flat"),
      m("valhalla/gold-etiqueta-barco", "Etiqueta frontal de Valhalla Gold con el drakkar en dorado sobre negro.", "flat"),
      m("valhalla/gold-etiqueta-dorsal", "Etiqueta dorsal de Valhalla Gold en negro con cenefas doradas.", "flat"),
    ],
    cap: m("valhalla/gold-tapon", "Etiqueta de tapón de Valhalla Gold: nudo celta dorado sobre negro.", "flat"),
    bottles: m("valhalla/gold-botellas", "Cuatro vistas 3D de la botella de Valhalla Gold.", "render"),
    box: m("valhalla/gold-caja-3d", "Tres vistas 3D de la caja negra y dorada de Valhalla Gold.", "render"),
    dieline: m("valhalla/gold-troquel", "Troquel desplegado de la caja de Valhalla Gold.", "flat"),
    scene: m("valhalla/gold-ambiente", "Caja y botellas de Valhalla Gold sobre una mesa de madera en un bosque.", "ambient"),
  },
  {
    id: "radler",
    name: "Valhalla Radler",
    tagline: "La de limón",
    description: "Sabor a limón. Amarillo limón de fondo y negro para las ilustraciones.",
    theme: { bg: "#F7EE8B", ink: "#000000", accent: "#000000" },
    colors: [
      { name: "Limón", hex: "#F7EE8B", cmyk: "C7 M0 Y57 K0", rgb: "247 238 139" },
      { name: "Negro", hex: "#000000", cmyk: "C91 M79 Y62 K97", rgb: "0 0 0" },
    ],
    labels: [
      m("valhalla/radler-etiqueta-cabeza", "Etiqueta frontal de Valhalla Radler con la cabeza vikinga en negro sobre amarillo limón.", "flat"),
      m("valhalla/radler-etiqueta-barco", "Etiqueta frontal de Valhalla Radler con el drakkar en negro sobre amarillo limón.", "flat"),
      m("valhalla/radler-etiqueta-dorsal", "Etiqueta dorsal de Valhalla Radler en amarillo con cenefas negras.", "flat"),
    ],
    cap: m("valhalla/radler-tapon", "Etiqueta de tapón de Valhalla Radler: nudo celta negro sobre amarillo.", "flat"),
    bottles: m("valhalla/radler-botellas", "Cuatro vistas 3D de la botella de Valhalla Radler.", "render"),
    box: m("valhalla/radler-caja-3d", "Tres vistas 3D de la caja amarilla de Valhalla Radler.", "render"),
    dieline: m("valhalla/radler-troquel", "Troquel desplegado de la caja de Valhalla Radler.", "flat"),
    scene: m("valhalla/radler-ambiente", "Un grupo de amigos en una barbacoa con la caja de Valhalla Radler en primer plano.", "ambient"),
  },
];

const valhalla: Project = {
  slug: "valhalla",
  title: "Valhalla",
  tagline: "Una marca, tres temperamentos. Identidad y packaging para una gama de cervezas de inspiración nórdica.",
  summary: "Identidad, etiquetas y cajas para tres cervezas —Beer, Gold y Radler— que comparten lenguaje visual y se distinguen por el color.",
  categories: ["packaging", "identidad"],
  group: "destacados",
  label: "Identidad y packaging",
  disciplines: ["Identidad visual", "Packaging", "Diseño estructural", "Visualización 3D"],
  year: null,
  context: "Proyecto académico · Escola del Treball de Barcelona · Diseño estructural de envase y embalaje",
  authorship: "individual",
  role: "Proyecto individual: identidad, diseño de etiquetas y cajas, desarrollo estructural y visualización 3D.",
  tools: ["Adobe Illustrator", "Esko Studio", "ArtiosCAD (vía Esko)"],
  theme: { bg: "#1C2C3E", ink: "#EADCBF", accent: "#CBAD4E", alt: "#EADCBF", altInk: "#1C2C3E", soft: "#F3EEE2", display: "var(--font-montserrat)", brand: { family: "var(--font-njord)", upper: true } },
  inks: ["#1C2C3E", "#CBAD4E", "#F7EE8B"],
  poster: m("valhalla/grifos", "Tres grifos de cerveza con los medallones de nudo celta de Valhalla en dorado, plateado y negro.", "mockup"),
  cover: m("valhalla/cajas-tres-variedades", "Las tres cajas de Valhalla —Beer, Gold y Radler— con sus botellas sobre la barra de un bar.", "mockup"),
  visual: { media: m("valhalla/cajas-tres-variedades", "Las tres cajas de Valhalla —Beer, Gold y Radler— con sus botellas sobre la barra de un bar.", "mockup"), mode: "photo", layout: "masthead", focus: "50% 62%", fitEm: 5.6 },
  sections: [
    {
      id: "encargo",
      title: "El punto de partida",
      body: [
        "Quería alejarme de la botella de cerveza de siempre. Investigué botellas y cajas nórdicas, ilustraciones, ornamentaciones y tipografías hasta definir un lenguaje propio: símbolos vikingos, composiciones geométricas y elementos ornamentales.",
        "El nombre viene de ese mismo universo. Valhalla habla de reunión, de compañía y de disfrutar el tiempo libre con quien más te importa.",
      ],
      blocks: [
        { type: "media", layout: "inset", items: [m("valhalla/moodboard", "Moodboard de Valhalla: ornamentos, paleta, tipografías y referencias de packaging de cerveza nórdica.", "reference", { fit: "contain", caption: "Moodboard de investigación. Incluye referencias de otras marcas, recogidas como inspiración." })] },
      ],
      surface: "project",
    },
    {
      id: "sistema",
      title: "Un sistema, tres variedades",
      lead: "Beer, Gold y Radler comparten estructura, tipografía e ilustración. El color hace el resto.",
      body: [
        "Cada variedad tiene dos etiquetas frontales —una con una cabeza vikinga y otra con un drakkar—, una etiqueta dorsal con la información nutricional y una etiqueta circular para el tapón con un nudo celta. Cambia la paleta; el sistema se mantiene.",
      ],
      blocks: [
        {
          type: "matrix",
          columns: ["Frontal · cabeza vikinga", "Frontal · drakkar", "Dorsal", "Tapón"],
          rows: valhallaVarieties.map((v) => ({ label: v.name.replace("Valhalla ", ""), ground: v.theme.bg, ink: v.theme.ink, items: [...v.labels, v.cap] })),
          note: "Las cuatro etiquetas de cada variedad: dos frontales, la dorsal y la del tapón.",
        },
        {
          type: "varieties",
          varieties: valhallaVarieties,
        },
      ],
      surface: "paper",
    },
    {
      id: "identidad",
      title: "Tipografía y color",
      body: [
        "Njord Alternate firma la marca: geométrica, con rasgos rúnicos. Montserrat, en sus pesos Light, Medium y SemiBold, resuelve la información de etiquetas y cajas.",
        "La paleta parte de materiales naturales y tonos metálicos. Cada variedad toma una pareja de colores; el negro es común a Gold y Radler.",
      ],
      blocks: [
        {
          type: "specimen",
          fonts: [
            { name: "Njord Alternate", role: "Marca y nombres de variedad", family: "var(--font-njord)", sample: "VALHALLA · BEER · GOLD · RADLER" },
            { name: "Montserrat", role: "Información de producto · Light, Medium, SemiBold", family: "var(--font-montserrat)", weights: "300 500 600", sample: "Cerveza nórdica · 33 cl · 5% vol." },
          ],
          media: m("valhalla/tipografia", "Muestrario tipográfico de Valhalla: Njord Alternate y Montserrat en tres pesos.", "flat", { fit: "contain" }),
        },
        {
          type: "palette",
          colors: [
            { name: "Beige", hex: "#EADCBF", cmyk: "C10 M13 Y29 K0", rgb: "234 220 191", use: "Beer" },
            { name: "Azul noche", hex: "#1C2C3E", cmyk: "C93 M74 Y48 K55", rgb: "28 44 62", use: "Beer" },
            { name: "Oro", hex: "#CBAD4E", cmyk: "C21 M27 Y76 K6", rgb: "203 173 78", use: "Gold" },
            { name: "Limón", hex: "#F7EE8B", cmyk: "C7 M0 Y57 K0", rgb: "247 238 139", use: "Radler" },
            { name: "Negro", hex: "#000000", cmyk: "C91 M79 Y62 K97", rgb: "0 0 0", use: "Gold y Radler" },
          ],
        },
      ],
      surface: "project",
    },
    {
      id: "estructura",
      title: "De la silueta al volumen",
      lead: "Botella y caja se dibujaron en 2D y se levantaron en 3D dentro de Illustrator con Esko Studio.",
      blocks: [
        {
          type: "steps",
          steps: [
            {
              title: "Silueta y etiquetas",
              body: "Dibujé el perfil de la botella en Illustrator para fijar las proporciones de las tres etiquetas: frontal, dorsal y tapón.",
            },
            {
              title: "Botella en 3D",
              body: "Con Esko Studio (Girar y añadir etiquetas) generé la botella, elegí el material de cristal y tapón y coloqué las tres etiquetas. El programa devuelve un archivo con sus medidas exactas para diseñar sobre ellas.",
              media: [m("valhalla/beer-botellas-barco", "Cuatro vistas 3D de la botella de Valhalla Beer con la etiqueta del drakkar.", "render", { fit: "contain" })],
            },
            {
              title: "Caja para dos botellas",
              body: "Una caja-portabotellas con asa y dos ventanas. El diseño se aplica al troquel antes de plegarlo en 3D con Esko (Doblar archivo ArtiosCAD): panel base, material y montaje.",
              media: [
                m("valhalla/beer-troquel", "Troquel desplegado de la caja de Valhalla Beer, con información de producto e iconos de normativa.", "flat", { fit: "contain" }),
                m("valhalla/beer-caja-3d", "La caja de Valhalla Beer montada en 3D desde tres ángulos.", "render", { fit: "contain" }),
              ],
            },
          ],
        },
        {
          type: "facts",
          items: [
            { label: "Normativa", value: "Etiquetas y cajas incluyen los iconos de normativa de etiquetado." },
            { label: "Apta para veganos", value: "La marca incorpora el sello de certificación vegana." },
            { label: "Formato", value: "Botella de 33 cl · caja para dos unidades." },
          ],
        },
      ],
      surface: "paper",
    },
    {
      id: "resultado",
      title: "En la barra",
      blocks: [
        { type: "media", layout: "full", items: [m("valhalla/grifos", "Tres grifos de cerveza con los medallones de nudo celta de Valhalla en dorado, plateado y negro.", "mockup")] },
        {
          type: "media",
          layout: "pair",
          items: [
            m("valhalla/gama-seis-botellas", "La gama completa en fila: dos Gold, dos Radler y dos Beer.", "mockup"),
            m("valhalla/cubo-hielo", "Botellas de las tres variedades en un cubo metálico con hielo.", "mockup", { fit: "contain", ground: "#24364B" }),
          ],
        },
        { type: "media", layout: "inset", items: [m("valhalla/brindis", "Tres manos brindan con una botella de cada variedad.", "mockup", { fit: "contain", ground: "#FFFFFF" })] },
      ],
      surface: "ink",
    },
  ],
  credits: ["Proyecto individual de Iván Ordóñez García.", "El moodboard recoge referencias de terceros como material de investigación."],
  published: true,
};

// ════════════════════════════════════════════════════════════════════════════
// CIRQUERA
// ════════════════════════════════════════════════════════════════════════════
const cirquera: Project = {
  slug: "cirquera",
  title: "Cirquera",
  tagline: "Todo el circo en un solo lugar. Identidad visual para una plataforma digital del mundo circense.",
  summary: "Manual de identidad para una plataforma que conecta perfiles, oficios y disciplinas del circo: logotipo, color, ilustración, iconografía y piezas.",
  categories: ["identidad"],
  group: "identidad",
  label: "Identidad visual",
  disciplines: ["Identidad visual", "Manual de marca", "Ilustración", "Iconografía", "Piezas publicitarias"],
  year: null,
  context: "Proyecto académico en equipo · Escola del Treball de Barcelona · Marca ficticia",
  authorship: "team",
  role: null,
  team: [{ name: "Iván Ordóñez", me: true }, { name: "Oscar Garcia" }, { name: "Alex López" }, { name: "Sindri Faldmo" }],
  tools: [],
  theme: { bg: "#37101C", ink: "#F6ECC9", accent: "#E53131", alt: "#F6ECC9", altInk: "#37101C", soft: "#F1E5BE", display: "var(--font-aquavit)", brand: { family: "var(--font-aquavit)", weight: 800 } },
  inks: ["#37101C", "#E53131", "#F6ECC9"],
  poster: m("cirquera/ilustracion-equilibrista", "Ilustración de Cirquera: un equilibrista con pértiga roja sobre la cuerda floja y carpas al fondo.", "flat"),
  cover: m("cirquera/columna-morris", "Columna publicitaria con el cartel vertical de Cirquera: una acróbata bajo un foco y el lema «Todo el circo, en un solo lugar».", "mockup"),
  visual: { media: m("cirquera/columna-morris", "Columna publicitaria con el cartel vertical de Cirquera: una acróbata bajo un foco y el lema «Todo el circo, en un solo lugar».", "mockup"), mode: "object", layout: "behind", align: "center", scale: 0.92, shadow: "drop", fitEm: 4.2 },
  sections: [
    {
      id: "encargo",
      title: "La plataforma",
      lead: "Cirquera es una marca ficticia concebida como plataforma digital que conecta perfiles, oficios y disciplinas del mundo del circo.",
      body: [
        "El reto era trasladar la magia, el oficio y la nostalgia del circo a un entorno digital claro, accesible y profesional —una plataforma de empleo— sin perder la emoción por el camino.",
      ],
      blocks: [
        { type: "quote", text: "Todo el circo en un solo lugar.", cite: "Eslogan de la marca. «Circo» se destaca en Poppins Bold." },
      ],
      surface: "project",
    },
    {
      id: "concepto",
      title: "Tradición digital",
      lead: "El concepto combina el imaginario del circo clásico con una estética contemporánea y funcional.",
      body: [
        "El rombo es el elemento constructivo de todo el sistema. Viene del patrón de los trajes y las carpas, y simboliza la comunidad y la red de contactos que la plataforma quiere tejer.",
      ],
      blocks: [
        {
          type: "media",
          layout: "pair",
          items: [
            m("cirquera/ilustracion-red", "Ilustración de Cirquera: una red de rombos burdeos con acentos rojos sobre beige.", "flat"),
            m("cirquera/ilustracion-trapecio", "Ilustración de Cirquera: trapecios y una guirnalda de rombos sobre beige.", "flat"),
          ],
        },
      ],
      surface: "alt",
    },
    {
      id: "logotipo",
      title: "Logotipo",
      body: [
        "El logotipo usa la tipografía Aquavit con una variación en la «e» que aporta movimiento y un dinamismo que remite al circo. No hay símbolo: un elemento gráfico sobrecargaría la marca. La única variante es un contorno de 2 puntos.",
        "Se construye sobre una retícula modular cuya unidad X es el grosor de la «i», la «r» y la «q». La misma X define el área de seguridad. Tamaño mínimo: 100 mm / 591 px en impresión y 295 px en digital.",
      ],
      blocks: [
        { type: "media", layout: "pair", items: [m("cirquera/logotipo", "Logotipo de Cirquera en burdeos sobre beige.", "manual", { fit: "contain" }), m("cirquera/logotipo-contorno", "Variante en contorno del logotipo de Cirquera.", "manual", { fit: "contain" })] },
        { type: "media", layout: "wide", items: [m("cirquera/reticula", "Construcción del logotipo de Cirquera sobre una retícula modular basada en la medida X.", "manual", { fit: "contain" })] },
        {
          type: "media",
          layout: "pair",
          items: [
            m("cirquera/reproduccion-color", "Combinaciones de color permitidas para el logotipo de Cirquera, incluido un degradado.", "manual", { fit: "contain" }),
            m("cirquera/usos-incorrectos", "Usos incorrectos del logotipo de Cirquera: efectos, distorsión, colores y tipografías no corporativas.", "manual", { fit: "contain" }),
          ],
        },
      ],
      surface: "paper",
    },
    {
      id: "color-tipografia",
      title: "Color y tipografía",
      blocks: [
        {
          type: "palette",
          colors: [
            { name: "Burdeos Cirquera", hex: "#37101C", rgb: "55 16 28", cmyk: "C52 M89 Y51 K78", pms: "PMS 4975", use: "Profundidad, elegancia y tradición: los telones, las butacas, la atmósfera teatral. Fondo y tipografía." },
            { name: "Rojo Cirquera", hex: "#E53131", rgb: "229 49 49", cmyk: "C1 M91 Y80 K0", pms: "PMS 1788", use: "Energía, espectáculo y acción. Llamadas a la acción, titulares y elementos clave en la app y las redes." },
            { name: "Beige Cirquera", hex: "#F6ECC9", rgb: "246 236 201", cmyk: "C5 M6 Y27 K0", pms: "PMS 600", use: "Calma y equilibrio. Compensa los tonos saturados y facilita la lectura en interfaces." },
          ],
        },
        {
          type: "specimen",
          fonts: [
            { name: "Aquavit", role: "Logotipo y títulos · Extrabold, Semibold. Formas orgánicas, contraste marcado y un eco de la cartelería clásica.", family: "var(--font-aquavit)", sample: "Cirquera" },
            { name: "Poppins", role: "Textos · Regular, Medium, Semibold, Italic. Geométrica y cómoda en pantalla.", family: "var(--font-poppins)", weights: "400 500 600", sample: "Todo el circo en un solo lugar." },
          ],
          media: m("cirquera/tipografia", "Página del manual con las familias Aquavit y Poppins.", "manual", { fit: "contain" }),
        },
      ],
      surface: "project",
    },
    {
      id: "universo",
      title: "Universo gráfico",
      body: [
        "Ilustración plana con textura: formas vectoriales con un grano sutil que aporta calidez. El color se limita a la paleta —beige para fondos y luces, burdeos para masas y contornos, rojo para acentos y acción— y el tono es realista y profesional, lejos de la caricatura infantil.",
        "Los iconos están pensados para la interfaz: geometría pura y formas rellenas, con el rombo integrado en su anatomía —remates de carpa, cabezas de usuario, marcos de objetos—. El rojo se reserva para estados activos o hover.",
      ],
      blocks: [
        { type: "media", layout: "full", items: [m("cirquera/ilustracion-equilibrista", "Ilustración de Cirquera: un equilibrista con pértiga roja sobre la cuerda floja y carpas al fondo.", "flat")] },
        {
          type: "media",
          layout: "pair",
          items: [
            m("cirquera/iconografia", "Iconografía de Cirquera en beige y burdeos: carpa, mazas, trapecio, usuario, monociclo y estrella.", "manual", { fit: "contain" }),
            m("cirquera/iconografia-interaccion", "Iconografía de Cirquera en rojo para estados activos o hover.", "manual", { fit: "contain" }),
          ],
        },
      ],
      surface: "alt",
    },
    {
      id: "fotografia",
      title: "Dirección fotográfica",
      body: [
        "Estética cinematográfica, iluminación teatral y temperatura cálida, con predominio de beiges y dorados. Tres categorías: talento —concentración, sin posados forzados—, entornos —espacios escénicos y carpas— y detalle —herramientas y gestos técnicos—. Nada de flash frontal ni de stock frío.",
      ],
      blocks: [
        {
          type: "compare",
          before: m("cirquera/fotografia-incorrecta", "Uso incorrecto: una malabarista posando sonriente a cámara en un estudio con luz fría.", "art-direction"),
          after: m("cirquera/fotografia-correcta", "Uso correcto: una artista concentrada preparando sus manos entre bastidores, con luz cálida.", "art-direction"),
          beforeLabel: "Incorrecto: posado y luz fría",
          afterLabel: "Correcto: oficio y luz teatral",
        },
        { type: "media", layout: "wide", items: [m("cirquera/fotografia-carpa", "Interior vacío de una carpa de circo con un foco cálido sobre la pista.", "art-direction")] },
      ],
      surface: "ink",
    },
    {
      id: "aplicaciones",
      title: "Aplicaciones",
      body: [
        "En carteles verticales la imagen manda y el texto vive en las zonas de respiro; en horizontales, imagen y texto se separan en lados opuestos. El manual aplica la marca a tarjetas de visita, cartelería, tote bag, redes sociales y una propuesta de pantallas para la app.",
      ],
      blocks: [
        {
          type: "media",
          layout: "tall-pair",
          items: [
            m("cirquera/cartel-vertical", "Cartel vertical de Cirquera: una acróbata aérea bajo un foco, con el lema «Todo el circo, en un solo lugar».", "flat"),
            m("cirquera/cartel-horizontal", "Cartel horizontal de Cirquera: un artista en monociclo ante el público a un lado y el logotipo con un código QR al otro.", "flat", { fit: "contain" }),
          ],
        },
        { type: "media", layout: "full", items: [m("cirquera/valla", "Valla publicitaria de Cirquera con el lema «Tu equilibrio perfecto te espera» y un código QR.", "mockup")] },
        {
          type: "media",
          layout: "trio",
          items: [
            m("cirquera/tarjetas-rojas", "Tarjetas de visita rojas de Cirquera junto a una cuerda y una maza de malabares.", "mockup"),
            m("cirquera/tarjetas-madera", "Tarjetas de visita beige de Cirquera sobre una bandeja de madera, con la pregunta «¿Buscas talento o buscas pista?».", "mockup"),
            m("cirquera/mupi", "Mupi de Cirquera en la calle con un artista sobre la cuerda floja.", "mockup"),
          ],
        },
        {
          type: "media",
          layout: "trio",
          items: [
            m("cirquera/post-instagram", "Móvil con un post de Instagram de Cirquera en degradado rojo.", "mockup"),
            m("cirquera/app-acceso", "Móvil con la pantalla de acceso de la app de Cirquera en burdeos, con el saludo «Benvingut!».", "mockup", { caption: "Propuesta de interfaz (mockup). No es una app funcional." }),
            m("cirquera/app-perfil", "Mano sosteniendo un móvil con la pantalla de perfil de la app de Cirquera.", "mockup", { caption: "Propuesta de interfaz (mockup)." }),
          ],
        },
        { type: "media", layout: "wide", items: [m("cirquera/tote-bag", "Tote bag de Cirquera con el logotipo y el eslogan.", "mockup")] },
      ],
      surface: "project",
    },
  ],
  credits: [
    "Manual de identidad corporativa desarrollado en equipo por Iván Ordóñez, Oscar Garcia, Alex López y Sindri Faldmo.",
    "Las fotografías que ilustran la dirección fotográfica son ejemplos de referencia.",
  ],
  published: true,
};

// ════════════════════════════════════════════════════════════════════════════
// BE STAR
// ════════════════════════════════════════════════════════════════════════════
const beStar: Project = {
  slug: "be-star",
  title: "Be Star",
  tagline: "Del plano al volumen. Identidad y packaging para Hydrastar, una crema hidratante facial natural.",
  summary: "Identidad y sistema de envase para una marca de cosmética natural: tarro, caja con ventana troquelada, camisa y acabados de impresión.",
  categories: ["packaging", "identidad"],
  group: "destacados",
  label: "Identidad y packaging",
  disciplines: ["Identidad visual", "Packaging", "Diseño estructural", "Acabados", "Visualización 3D"],
  year: null,
  context: "Proyecto académico · Escola del Treball de Barcelona · Diseño estructural de envase y embalaje",
  authorship: "individual",
  role: "Proyecto individual: identidad, diseño de etiqueta, caja y camisa, desarrollo estructural y visualización 3D.",
  tools: ["Adobe Illustrator", "Esko Studio", "Esko Studio Toolkit", "ArtiosCAD (vía Esko)"],
  theme: { bg: "#E4E1DA", ink: "#22301A", accent: "#6A8157", alt: "#324425", altInk: "#EEEBE3", soft: "#D9D5CC", display: "var(--font-bricolage)", brand: { family: "var(--font-valentine)" } },
  inks: ["#324425", "#6A8157", "#EACF4B"],
  cover: m("be-star/gama-piedra", "Dos tarros de Hydrastar apilados, la caja verde abierta y un tercer tarro sobre una piedra, con luz natural.", "ambient"),
  visual: { media: m("be-star/caja-y-tarro-render", "Render de la caja verde de Hydrastar abierta junto a un tarro de crema Be Star, con su reflejo.", "render"), mode: "object", layout: "behind", align: "right", valign: "bottom", scale: 0.74, titleColor: "#324425", fitEm: 3.2 },
  sections: [
    {
      id: "encargo",
      title: "La marca",
      body: [
        "El objetivo era una presentación coherente que transmitiera naturalidad, bienestar y elegancia, uniendo el diseño gráfico con el desarrollo estructural de los envases: tarro, caja exterior y camisa.",
        "Partí de una búsqueda de cremas hidratantes de estética minimalista y sencilla para definir el diseño y la identidad final.",
      ],
      blocks: [
        {
          type: "facts",
          items: [
            { label: "Producto", value: "Hydrastar, crema hidratante facial · 80 ml" },
            { label: "Ingredientes clave", value: "Aloe vera, aceite de jojoba y extracto de pepino" },
            { label: "Valores", value: "Natural · Sostenible · Bienestar" },
          ],
        },
      ],
      surface: "project",
    },
    {
      id: "concepto",
      title: "Una estrella",
      lead: "El nombre nace de la idea de representar el bienestar de las personas. La estrella es el elemento gráfico principal.",
      body: [
        "Su forma aporta personalidad y sofisticación, y construye un símbolo fácil de reconocer que funciona como imagotipo y como isotipo.",
      ],
      blocks: [
        {
          type: "palette",
          colors: [
            { name: "Verde bosque", hex: "#324425", cmyk: "C76 M48 Y89 K55", rgb: "50 68 37", use: "Tipografía del tarro en la zona de cristal y color de la caja." },
            { name: "Verde salvia", hex: "#6A8157", cmyk: "C61 M32 Y71 K17", rgb: "106 129 87", use: "Etiqueta del tarro." },
            { name: "Amarillo estrella", hex: "#EACF4B", cmyk: "C11 M15 Y80 K1", rgb: "234 207 75", use: "La estrella y la palabra HYDRASTAR." },
          ],
        },
        {
          type: "specimen",
          fonts: [
            { name: "Sparkling Valentine", role: "Solo para el nombre de la marca: una manuscrita que aporta cercanía y personalidad.", family: "var(--font-valentine)", sample: "Be Star" },
            { name: "Bricolage Grotesque", role: "Todo lo demás: información técnica limpia y legible.", family: "var(--font-bricolage)", weights: "400 600", sample: "Una fórmula ligera que hidrata y suaviza profundamente." },
          ],
          media: m("be-star/tipografia", "Muestrario tipográfico de Be Star: Sparkling Valentine y Bricolage Grotesque.", "flat", { fit: "contain" }),
        },
      ],
      surface: "alt",
    },
    {
      id: "proceso",
      title: "Del plano al volumen",
      lead: "Todo el sistema se dibujó en 2D y se levantó en 3D dentro de Illustrator con el plugin Esko Studio.",
      blocks: [
        {
          type: "steps",
          steps: [
            {
              title: "Silueta del tarro",
              body: "Dibujé la forma del tarro en Illustrator para fijar las proporciones de la etiqueta. Tres partes: tapón de metal, crema —líquido espeso— y cuerpo de cristal.",
              media: [m("be-star/silueta-tarro", "Silueta 2D del tarro con sus tres partes: tapón, crema y cuerpo.", "process", { fit: "contain" })],
            },
            {
              title: "Tarro en 3D",
              body: "Con Esko Studio (Girar y añadir etiquetas) generé el volumen, asigné materiales a cuerpo, crema y tapón y coloqué una etiqueta frontal.",
              media: [m("be-star/esko-tarro", "Ventana de Esko Studio con el tarro en 3D y los parámetros de la etiqueta frontal.", "process", { fit: "contain" })],
            },
            {
              title: "Caja con ventana",
              body: "Partí de la caja habitual de los tarros de crema y le abrí una ventana frontal para que el producto se vea. Dibujé el troquel en 2D y lo plegué en 3D (Doblar archivo ArtiosCAD): panel base, material y montaje.",
              media: [
                m("be-star/troquel-caja", "Troquel de la caja de Be Star: parte externa e interna, con líneas de corte y de hendido.", "flat", { fit: "contain" }),
                m("be-star/esko-caja-3d", "La caja plegada en 3D en Esko Studio, con la ventana frontal.", "process", { fit: "contain" }),
              ],
            },
            {
              title: "Simulación final",
              body: "Con Esko Studio Toolkit monté caja y tarro para generar simulaciones realistas: ajustar la colocación de los elementos, comprobar la legibilidad y equilibrar envase y embalaje antes de producción.",
              media: [
                m("be-star/esko-simulacion-1", "Simulación 3D de la caja y el tarro sin texturas finales.", "process", { fit: "contain" }),
                m("be-star/esko-simulacion-2", "Simulación 3D de la caja abierta con dos tarros.", "process", { fit: "contain" }),
              ],
            },
          ],
        },
      ],
      surface: "paper",
    },
    {
      id: "etiqueta",
      title: "Etiqueta y acabados",
      body: [
        "Verdes para la frescura y la conexión con el entorno; dorado para el toque premium. La información técnica se ordena en una grotesca limpia y el nombre de la marca en manuscrita.",
      ],
      blocks: [
        { type: "media", layout: "wide", items: [m("be-star/etiqueta-plano", "Etiqueta desplegada del tarro Hydrastar, en verde salvia, con la estrella dorada y la información de producto.", "flat", { fit: "contain" })] },
        {
          type: "annotated",
          media: m("be-star/etiqueta-acabados", "Etiqueta de Be Star con anotaciones de acabados: corte y laminado dorado.", "flat", { fit: "contain" }),
          notes: [
            { title: "Corte", body: "Aplicado a la mayor parte de la etiqueta: crea transparencia y hace que parte del diseño destaque sobre el cristal." },
            { title: "Scodix Foil Gold", body: "Laminado dorado en tres elementos: la estrella y los detalles que elevan la percepción del producto." },
          ],
        },
        { type: "media", layout: "full", items: [m("be-star/tarro-vistas", "Ocho vistas 3D del tarro Be Star: cenital de la crema, frontal, laterales, dorsal y la tapa verde.", "render", { fit: "contain" })] },
      ],
      surface: "project",
    },
    {
      id: "caja",
      title: "Caja y camisa",
      body: [
        "En el troquel, el nombre del producto ocupa el frente y los laterales recogen ingredientes, modo de uso y datos técnicos. La ventana troquelada aporta transparencia y funcionalidad.",
        "La camisa —el envoltorio exterior— lleva la promesa de una crema 100% orgánica a una ilustración de hojas en acuarela.",
      ],
      blocks: [
        {
          type: "annotated",
          media: m("be-star/caja-acabados", "Troquel de la caja con anotaciones de acabados: tinta metalizada, laminado dorado y papel mate con máscara.", "flat", { fit: "contain" }),
          notes: [
            { title: "Tinta metalizada colorida", body: "Para los elementos gráficos de la cara superior." },
            { title: "Scodix Foil Gold", body: "Laminado dorado en la estrella y el nombre del producto." },
            { title: "Papel mate", body: "Con revestimiento y máscara." },
          ],
        },
        { type: "media", layout: "full", items: [m("be-star/caja-seis-vistas", "Seis vistas 3D de la caja verde de Hydrastar.", "render", { fit: "contain" })] },
        { type: "media", layout: "wide", items: [m("be-star/normativas", "Iconos de normativa de la etiqueta: cantidad estimada, vegano, reciclable, PAO de 9 meses, Punto Verde, conformidad europea, leer el prospecto, cruelty free y código de barras.", "flat", { fit: "contain", caption: "Normativa de etiquetado." })] },
        {
          type: "media",
          layout: "pair",
          items: [
            m("be-star/camisa-plano", "Camisa de Be Star desplegada: ramas y hojas en acuarela verde y dorada con la estrella.", "flat", { fit: "contain" }),
            m("be-star/camisa-3d", "La camisa de Be Star envolviendo el pack, en 3D.", "render", { fit: "contain" }),
          ],
        },
      ],
      surface: "paper",
    },
    {
      id: "resultado",
      title: "Resultado",
      blocks: [
        { type: "media", layout: "full", items: [m("be-star/caja-marmol", "La caja de Hydrastar y un tarro abierto sobre mármol, con una rama de olivo.", "ambient")] },
        {
          type: "media",
          layout: "offset-left",
          items: [
            m("be-star/tapas-flotantes-estudio", "Render del tarro con cuatro tapas verdes flotando en vertical.", "render", { fit: "contain" }),
            m("be-star/escena-tapas", "El tarro sobre un pedestal de piedra con las tapas flotando ante un aro de luz.", "ambient"),
          ],
        },
        { type: "media", layout: "inset", items: [m("be-star/lifestyle-modelo", "Una modelo se aplica crema en la mejilla junto al tarro abierto de Be Star.", "ambient", { fit: "contain", ground: "#EFEFEC" })] },
      ],
      surface: "alt",
    },
  ],
  credits: ["Proyecto individual de Iván Ordóñez García."],
  published: true,
};

// ════════════════════════════════════════════════════════════════════════════
// HOTRACE
// ════════════════════════════════════════════════════════════════════════════
const hotrace: Project = {
  slug: "hotrace",
  title: "Hotrace",
  tagline: "Una revista de Fórmula 1 con Fernando Alonso como protagonista. Maquetación de portada y cuatro dobles páginas.",
  summary: "Diseño editorial de una revista de motor: portada, jerarquía tipográfica, tratamiento de imagen y ritmo de lectura en cuatro dobles páginas.",
  categories: ["editorial"],
  group: "editorial",
  label: "Diseño editorial",
  disciplines: ["Diseño editorial", "Maquetación", "Tratamiento de imagen", "Mockups"],
  year: null,
  context: "Proyecto de diseño editorial",
  authorship: "individual",
  role: "Maquetación completa: organización del contenido, tipografía, tratamiento de las imágenes, composición y mockups.",
  tools: [],
  theme: { bg: "#151A1D", ink: "#F1F1EE", accent: "#2FA88F", alt: "#0B5E50", altInk: "#F1F1EE", soft: "#E6E6E2", display: "var(--font-archivo)", brand: { family: "var(--font-bebas)", upper: true } },
  inks: ["#0B5E50", "#2B3A42", "#F1F1EE"],
  cover: m("hotrace/quiosco", "Una mano coge la revista HOTRACE del expositor de un quiosco, entre otras revistas de motor.", "mockup"),
  visual: { media: m("hotrace/portada", "Portada de HOTRACE: Fernando Alonso con el mono de Aston Martin y el casco en la mano.", "flat"), mode: "object", layout: "behind", align: "left", tilt: -4, scale: 0.84, shadow: "paper", fitEm: 2.82 },
  sections: [
    {
      id: "encargo",
      title: "La revista",
      body: [
        "El trabajo consistía en organizar mucho texto de entrevista —declaraciones, datos de temporada, protagonistas del equipo— en una publicación atractiva y fácil de leer. Trabajé la jerarquía, la tipografía, el tratamiento de las imágenes y la composición de cada página.",
        "Cierro con mockups fotorrealistas que acercan la presentación al resultado impreso.",
      ],
      surface: "project",
    },
    {
      id: "paginas",
      title: "Página a página",
      lead: "Una cabecera condensada y rotunda, citas destacadas en verde Aston Martin y un ritmo que alterna imagen a sangre, columnas de texto y una página de respiro con el emblema del equipo.",
      blocks: [
        {
          type: "spreads",
          folios: ["Portada", "Págs. 2–3", "Págs. 4–5", "Págs. 6–7", "Págs. 8–9"],
          items: [
            m("hotrace/portada", "Portada de HOTRACE con Fernando Alonso.", "flat"),
            m("hotrace/pliego-formula-1", "Páginas 2 y 3: «Fórmula 1», con fotografías de Alonso, columnas de texto y citas en verde.", "flat"),
            m("hotrace/pliego-temporada", "Páginas 4 y 5: la temporada 2023, con Alonso en el podio y un primer plano de su casco.", "flat"),
            m("hotrace/pliego-aston-martin", "Páginas 6 y 7: página verde con el emblema de Aston Martin y el reportaje sobre Dan Fallows.", "flat"),
            m("hotrace/pliego-fallows", "Páginas 8 y 9: retratos del equipo, el monoplaza AMR23 y una columna lateral destacada.", "flat"),
          ],
        },
        {
          type: "detail",
          media: m("hotrace/pliego-formula-1", "Páginas 2 y 3 de HOTRACE: «Fórmula 1».", "flat"),
          crops: [
            { rect: [0.025, 0.035, 0.255, 0.5], caption: "Cabecera condensada, capitular y entrada de texto." },
            { rect: [0.785, 0.03, 0.985, 0.4], caption: "Columna sobre la imagen y cita destacada en verde." },
          ],
        },
      ],
      surface: "paper",
    },
    {
      id: "impreso",
      title: "Fuera de la pantalla",
      blocks: [
        { type: "media", layout: "offset-right", items: [m("hotrace/marquesina", "Marquesina de autobús con la portada de HOTRACE como cartel.", "mockup"), m("hotrace/revistas-pila", "Pila de revistas HOTRACE con luz de ventana.", "mockup")] },
        {
          type: "media",
          layout: "pair",
          items: [
            m("hotrace/portada-y-pliego-mockup", "Mockup de la portada y la doble página «Fórmula 1».", "mockup", { fit: "contain", ground: "#22292D" }),
            m("hotrace/pliego-mockup", "Mockup de una doble página interior abierta.", "mockup", { fit: "contain", ground: "#22292D" }),
          ],
        },
        { type: "media", layout: "wide", items: [m("hotrace/aston-martin-mockup", "Mockup de la doble página con el emblema de Aston Martin.", "mockup", { fit: "contain", ground: "#FFFFFF" })] },
      ],
      surface: "project",
    },
  ],
  credits: [
    "Diseño editorial y maquetación de Iván Ordóñez García.",
    "Los textos periodísticos, las fotografías y las marcas que aparecen (Fernando Alonso, Aston Martin y patrocinadores) pertenecen a sus autores y titulares; se usan con fines académicos.",
  ],
  published: true,
};

// ════════════════════════════════════════════════════════════════════════════
// HERB LUBALIN
// ════════════════════════════════════════════════════════════════════════════
const herbLubalin: Project = {
  slug: "herb-lubalin",
  title: "Herb Lubalin",
  tagline: "Un fascículo editorial sobre el tipógrafo neoyorquino, contado con su propio lenguaje visual.",
  summary: "Fascículo dedicado a Herb Lubalin: retícula modular, jerarquía tipográfica marcada y una paleta reducida a rojo, negro y blanco.",
  categories: ["editorial"],
  group: "editorial",
  label: "Tipografía y diseño editorial",
  disciplines: ["Diseño editorial", "Tipografía", "Maquetación"],
  year: null,
  context: "Proyecto de diseño editorial",
  authorship: "individual",
  role: "Diseño y maquetación del fascículo: portada y dos dobles páginas.",
  tools: [],
  theme: { bg: "#F6F5F2", ink: "#121212", accent: "#E2231A", alt: "#121212", altInk: "#F6F5F2", soft: "#E9E7E2", display: "var(--font-archivo)" },
  inks: ["#E2231A", "#121212", "#F6F5F2"],
  cover: m("herb-lubalin/revista-manos", "Dos manos sostienen el fascículo abierto por la doble página «Biografía» y «Tipografías».", "mockup"),
  visual: { media: m("herb-lubalin/portada", "Portada del fascículo «I ♥ Herb Lubalin»: el corazón y la palabra «love» sobre su retrato, en rojo y negro.", "flat"), mode: "object", layout: "behind", align: "right", valign: "bottom", tilt: 3, scale: 0.6, shadow: "paper", fitEm: 5.67 },
  sections: [
    {
      id: "encargo",
      title: "El fascículo",
      body: [
        "Lubalin (Nueva York, 1918–1981) rechazó el funcionalismo europeo en favor de un estilo ecléctico y exuberante. Diseñar sobre él pedía tipografía protagonista, no tipografía de acompañamiento.",
      ],
      blocks: [{ type: "words", words: ["innovador", "audaz", "visionario", "tipográfico", "creativo", "influyente", "revolucionario", "experimental"] }],
      surface: "project",
    },
    {
      id: "sistema",
      title: "Retícula y jerarquía",
      body: [
        "Una retícula modular sostiene una composición dinámica y una jerarquía tipográfica muy marcada. La paleta se reduce a rojo, negro y blanco para conseguir una identidad fuerte y coherente.",
        "La combinación de textos, fotografías y ejemplos de sus tipografías hace la lectura clara sin perder carácter editorial.",
      ],
      blocks: [
        {
          type: "spreads",
          folios: ["Biografía · Tipografías", "Dissenys editorials"],
          items: [
            m("herb-lubalin/pliego-biografia", "Doble página «Biografía» y «Tipografías»: retrato de Lubalin, texto a tres columnas y una composición de sus alfabetos.", "flat"),
            m("herb-lubalin/pliego-disenos", "Doble página «Dissenys editorials»: portadas, carteles y logotipos de Lubalin con fichas explicativas.", "flat"),
          ],
        },
        {
          type: "detail",
          media: m("herb-lubalin/pliego-biografia", "Doble página «Biografía» y «Tipografías».", "flat"),
          crops: [
            { rect: [0.055, 0.06, 0.36, 0.86], caption: "Cabecera «Biografía» sobre la banda roja y texto a una columna." },
            { rect: [0.525, 0.11, 0.69, 0.66], caption: "Columna «Ecléctico y exuberante», con los destacados en rojo." },
          ],
        },
      ],
      surface: "paper",
    },
    {
      id: "obra",
      title: "La obra de Lubalin",
      lead: "El fascículo reproduce piezas clave de su carrera como material de referencia.",
      blocks: [
        {
          type: "media",
          layout: "grid",
          items: [
            m("herb-lubalin/ref-no-more-war", "Cartel «No More War» de Herb Lubalin para la revista Avant Garde, 1968.", "reference", { caption: "No More War, 1968 — Herb Lubalin" }),
            m("herb-lubalin/ref-playstreet", "Logotipo de Playstreet Inc. con letras tridimensionales de colores.", "reference", { caption: "Playstreet Inc., 1968 — estudio de Herb Lubalin" }),
            m("herb-lubalin/ref-fact", "Portada de la revista Fact con un ojo dibujado y un titular sobre brutalidad policial.", "reference", { caption: "Revista Fact, 1964 — Herb Lubalin" }),
            m("herb-lubalin/ref-first-harvest", "Portada ilustrada del libro «First Harvest» de Vladimir Pozner.", "reference", { caption: "First Harvest, 1943 — Herb Lubalin" }),
            m("herb-lubalin/ref-saturday-evening-post", "Portada del Saturday Evening Post de 1961 con una ilustración de Norman Rockwell.", "reference", { caption: "Saturday Evening Post, 1961" }),
            m("herb-lubalin/ref-pbs", "Logotipo en blanco y negro para Public Broadcasting Service.", "reference", { caption: "Public Broadcasting Service (PBS), 1970 — Lubalin, Smith, Carnase" }),
          ],
        },
      ],
      surface: "alt",
    },
    {
      id: "resultado",
      title: "Resultado",
      body: ["Con este trabajo reforcé maquetación, composición tipográfica y diseño editorial, buscando el equilibrio entre funcionalidad y expresión gráfica."],
      blocks: [
        { type: "media", layout: "full", items: [m("herb-lubalin/revista-manos", "El fascículo abierto entre dos manos.", "mockup")] },
        { type: "media", layout: "wide", items: [m("herb-lubalin/fasciculo-pliegos", "Portada, doble página interior y contraportada del fascículo en secuencia.", "flat", { fit: "contain", ground: "#121212" })] },
      ],
      surface: "project",
    },
  ],
  credits: [
    "Diseño y maquetación de Iván Ordóñez García.",
    "Las obras, logotipos y fotografías reproducidos pertenecen a Herb Lubalin, sus colaboradores y sus titulares; se muestran como material de referencia.",
  ],
  published: true,
};

// ════════════════════════════════════════════════════════════════════════════
// INDÓMITA
// ════════════════════════════════════════════════════════════════════════════
const indomita: Project = {
  slug: "indomita",
  title: "Indómita",
  tagline: "Manual de identidad corporativa para una agencia de viajes de aventura.",
  summary: "Identidad y manual corporativo, en catalán, para una agencia de viajes exóticos y de aventura: construcción, color, tipografía y variantes.",
  categories: ["identidad"],
  group: "identidad",
  label: "Identidad corporativa",
  disciplines: ["Identidad corporativa", "Manual de marca"],
  year: null,
  context: "Proyecto en equipo · Manual d'identitat corporatiu (en catalán)",
  authorship: "team",
  role: null,
  team: [{ name: "Sindri Faldmo" }, { name: "Iván Ordóñez", me: true }, { name: "Anely Silva" }],
  tools: [],
  theme: { bg: "#345131", ink: "#FFFFFF", accent: "#C6C6C5", alt: "#F1F2EE", altInk: "#24391F", soft: "#E8EAE4", display: "var(--font-poppins)" },
  inks: ["#345131", "#C6C6C5", "#575756"],
  poster: m("indomita/portada-manual", "Portada del manual de identidad de Indómita: el logotipo en blanco sobre verde.", "manual"),
  cover: m("indomita/variante-fotografia", "Logotipo de Indómita en blanco sobre la fotografía aérea de una casa en un árbol en plena selva.", "manual"),
  visual: { media: m("indomita/variante-fotografia", "Logotipo de Indómita en blanco sobre la fotografía aérea de una casa en un árbol en plena selva.", "manual"), mode: "photo", layout: "masthead", focus: "50% 48%", fitEm: 4.92 },
  sections: [
    {
      id: "introduccio",
      title: "Introducción",
      original: "01 Introducció",
      lead: "Indómita planifica y gestiona viajes exóticos y de aventura para clientes que buscan experiencias vitales y extremas.",
      body: [
        "Viajes a medida —del deporte extremo a la escapada romántica— diseñados desde Barcelona con expertos locales, con la idea de un turismo innovador, responsable y comprometido. El manual, en catalán, fija las normas para aplicar la marca con coherencia.",
      ],
      blocks: [
        { type: "media", layout: "full", items: [m("indomita/portada-manual", "Portada del Manual d'identitat corporatiu de Indómita: el logotipo en blanco sobre verde, con los nombres de Sindri Faldmo, Iván Ordóñez y Anely Silva.", "manual")] },
      ],
      surface: "project",
    },
    {
      id: "construccio",
      title: "Construcción",
      original: "02 Construcció i modulació · 03 Àrea de protecció · 04 Mides mínimes",
      body: [
        "El logotipo se construye sobre una superficie proporcional a la unidad X, que asegura la proporción en cualquier soporte. La misma X fija el área de protección, libre de otras marcas o textos, y el manual establece tamaños mínimos de reproducción para el logotipo compuesto y el simple, en serigrafía y en digital.",
      ],
      blocks: [
        { type: "media", layout: "wide", items: [m("indomita/construccion", "Construcción del logotipo de Indómita: 39 unidades X de ancho por 8 de alto.", "manual", { fit: "contain", ground: "#FFFFFF" })] },
        {
          type: "media",
          layout: "pair",
          items: [
            m("indomita/area-proteccion", "Área de protección del logotipo definida por la unidad X.", "manual", { fit: "contain", ground: "#2B4429" }),
            m("indomita/medidas-digital", "Tamaños mínimos del logotipo compuesto y simple en digital.", "manual", { fit: "contain", ground: "#2B4429" }),
          ],
        },
      ],
      surface: "alt",
    },
    {
      id: "colors",
      title: "Color y tipografía",
      original: "05 Colors corporatius i usos · 06 Tipografia",
      body: [
        "Un verde principal, que debe predominar, y dos grises secundarios. Si la impresión no permite tintas planas, el logotipo puede imprimirse en cuatricromía o en negro.",
        "RL Aqva es la familia corporativa para comunicación interna, señalética y comunicación externa. En soportes y aplicaciones se apoya en Alfarn 2 para títulos, Poppins para texto y Bitter para numeración.",
      ],
      blocks: [
        {
          type: "palette",
          colors: [
            { name: "Verde Indómita", hex: "#345131", cmyk: "C82 M41 Y89 K43", rgb: "52 81 49", use: "Tinta plana principal." },
            { name: "Gris claro", hex: "#C6C6C5", cmyk: "C0 M0 Y0 K30", rgb: "198 198 197", use: "Secundario." },
            { name: "Gris oscuro", hex: "#575756", cmyk: "C0 M0 Y0 K80", rgb: "87 87 86", use: "Secundario." },
          ],
        },
        {
          type: "specimen",
          media: m("indomita/tipografia-principal", "Página del manual con la familia corporativa RL Aqva Black: mayúsculas, minúsculas, números y signos.", "manual", { fit: "contain", ground: "#2B4429" }),
          fonts: [
            { name: "RL Aqva", role: "Familia corporativa principal" },
            { name: "Alfarn 2", role: "Títulos en aplicaciones" },
            { name: "Poppins", role: "Texto · Regular y Light Italic", family: "var(--font-poppins)", weights: "400", sample: "Experiències vitals, turisme responsable." },
            { name: "Bitter", role: "Numeración" },
          ],
        },
      ],
      surface: "alt",
    },
    {
      id: "variants",
      title: "Variantes",
      original: "07 Variants i altres usos",
      body: ["Versión horizontal y apilada, sobre fotografía, en negativo y como icono de app."],
      blocks: [
        {
          type: "media",
          layout: "grid",
          items: [
            m("indomita/variante-apilada-verde", "Logotipo apilado «INDÓ / MITA» en blanco sobre verde.", "manual"),
            m("indomita/variante-apilada-fotografia", "Logotipo apilado sobre la fotografía de una casa en un árbol.", "manual"),
            m("indomita/variante-negro", "Logotipo apilado en blanco sobre negro.", "manual"),
            m("indomita/variante-naranja-vertical", "Logotipo vertical con símbolo blanco y texto azul sobre naranja.", "manual"),
            m("indomita/variante-naranja-apilada", "Logotipo apilado con texto azul sobre naranja.", "manual"),
            m("indomita/app-icono", "Icono de app: el símbolo de Indómita en blanco sobre un cuadrado verde redondeado.", "manual"),
          ],
        },
      ],
      surface: "project",
    },
    {
      id: "incorrectes",
      title: "Usos incorrectos",
      original: "08 Usos incorrectes",
      blocks: [
        {
          type: "dodont",
          items: [
            { media: m("indomita/variante-apilada-verde", "Uso correcto: logotipo apilado en blanco sobre verde.", "manual"), label: "Apilado, en blanco sobre verde", ok: true },
            { media: m("indomita/incorrecto-color-negro", "Uso incorrecto: logotipo en rojo sobre negro.", "manual"), label: "Colores no corporativos", ok: false },
            { media: m("indomita/incorrecto-color-verde", "Uso incorrecto: logotipo en rosa sobre verde lima.", "manual"), label: "Colores no corporativos", ok: false },
            { media: m("indomita/incorrecto-simbolo-girado", "Uso incorrecto: el símbolo girado respecto al texto.", "manual"), label: "Símbolo girado", ok: false },
            { media: m("indomita/incorrecto-rotacion", "Uso incorrecto: el logotipo rotado en diagonal.", "manual"), label: "Rotación", ok: false },
            { media: m("indomita/incorrecto-tipografia", "Uso incorrecto: el texto del logotipo deformado.", "manual"), label: "Tipografía deformada", ok: false },
          ],
        },
      ],
      surface: "alt",
    },
    {
      id: "aplicacio",
      title: "En campaña",
      body: ["La marca aplicada a dos carteles de destino: «Escocia. Tierras legendarias, experiencias inolvidables»."],
      blocks: [
        {
          type: "media",
          layout: "pair",
          items: [
            m("indomita/escocia-gaitero", "Cartel «Escocia» de Indómita: un gaitero con kilt frente al castillo de Edimburgo.", "flat"),
            m("indomita/escocia-viaducto", "Cartel «Escocia» de Indómita: un tren de vapor cruzando el viaducto de Glenfinnan.", "flat"),
          ],
        },
      ],
      surface: "project",
    },
  ],
  credits: ["Manual de identidad corporativa desarrollado en equipo por Sindri Faldmo, Iván Ordóñez y Anely Silva."],
  published: true,
};

/** Order = hierarchy: featured packaging projects, then identity, then editorial. Every number on the site derives from it. */
export const projects: Project[] = [valhalla, beStar, cirquera, indomita, hotrace, herbLubalin];

/** The exhibition is grouped; each project belongs to exactly one group (2 + 2 + 2). */
export const groups: { id: Project["group"]; title: string; note: string }[] = [
  { id: "destacados", title: "Destacados", note: "Identidad y packaging" },
  { id: "identidad", title: "Identidad", note: "Sistemas de marca y manuales" },
  { id: "editorial", title: "Editorial", note: "Revista y fascículo" },
];

/**
 * Named in the brief, but no source material was supplied yet.
 * Fill in a full `Project` object (and add the files) to publish them.
 */
export const draftProjects: DraftProject[] = [
  { slug: "la-torcida", title: "La Torcida", note: "Proyecto multidisciplinar sostenible (identidad, mobiliario de cartón, packaging reutilizable, app con QR y puntos, audiovisual). Faltan PDFs e imágenes.", published: false },
  { slug: "dyna", title: "DYNA Creative Lab", note: "Identidad del estudio creativo asociado al desarrollo de La Torcida. Identidad distinta: no fusionar. Faltan PDFs e imágenes.", published: false },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

/** "01"–"06": the project's number everywhere (exhibition, menu, feature, next project). */
export const projectNumber = (p: Project) => String(projects.indexOf(p) + 1).padStart(2, "0");

export const nextProject = (slug: string) => {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
};
