import type { T } from "@/lib/i18n";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * SITE CONFIGURATION — all personal information lives here.
 * Source: Portfolio_reducido.pdf (pp. 2–3). Anything not documented there is
 * `null` and simply doesn't render. See docs/CONTENT_TO_CONFIRM.md.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const site = {
  /** Public URL, used for canonical links, sitemap and social cards. Set NEXT_PUBLIC_SITE_URL when deploying. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  name: "Iván Ordóñez García",
  shortName: "Iván Ordóñez",
  /** Used in the hero: one word per printed line. */
  heroLines: ["Iván", "Ordóñez"],
  title: "Diseñador gráfico" as T,
  location: "Barcelona" as T,
  disciplines: ["Identidad", "Packaging", "Editorial"] as T[],

  /** Hero statement — derived from the three disciplines the projects actually show. */
  statement: "Diseño marcas que se reconocen, envases que se abren y páginas que se leen." as T,
  /** The same statement, split so each clause opens the index on its discipline. */
  statementParts: [
    { text: "Diseño " as T },
    { text: "marcas que se reconocen" as T, filter: "identidad" },
    { text: ", " as T },
    { text: "envases que se abren" as T, filter: "packaging" },
    { text: " y " as T },
    { text: "páginas que se leen" as T, filter: "editorial" },
    { text: "." as T },
  ] as { text: T; filter?: "identidad" | "packaging" | "editorial" }[],

  /** Meta description (≈155 characters). */
  description:
    "Portfolio de Iván Ordóñez García, diseñador gráfico en Barcelona: identidad visual, packaging y diseño editorial. Valhalla, Be Star, Cirquera y más." as T,

  bio: [
    "Soy diseñador gráfico en Barcelona. Acabo de terminar Diseño y edición de publicaciones impresas y multimedia en la Escola del Treball y he hecho prácticas de maquetación y diseño en la agencia Anverso.",
    "Me considero creativo, curioso, trabajador y resolutivo. Me inspiro tanto en artistas contemporáneos como en referentes de otras épocas, y esa mezcla me ayuda a seguir ampliando mi forma de entender el diseño.",
    "Me atraen las texturas grunge, el diseño brutalista y las composiciones con carácter: propuestas que transmiten personalidad y fuerza. Quiero seguir creciendo en proyectos donde aportar creatividad, compromiso y atención al detalle.",
  ] as T[],

  education: [
    {
      period: "2024 — 2026",
      title: "Diseño y edición de publicaciones impresas y multimedia" as T,
      place: "Escola del Treball de Barcelona",
    },
  ],

  experience: [
    {
      period: "2025",
      title: "Prácticas de maquetación y diseño" as T,
      place: "Agencia Anverso, Barcelona",
      tasks: [
        "Maquetación de revistas y posts de Instagram con InDesign.",
        "Retoque y edición de imágenes con Photoshop.",
      ] as T[],
    },
  ],

  /** Skills split as the brief asks: what the work demonstrates vs. tools vs. interests. No proficiency ratings. */
  skills: {
    disciplines: [
      { name: "Identidad visual y manuales de marca" as T, projects: ["cirquera", "indomita", "valhalla", "be-star"] },
      { name: "Packaging y diseño estructural" as T, projects: ["be-star", "valhalla"] },
      { name: "Diseño editorial y maquetación" as T, projects: ["hotrace", "herb-lubalin"] },
      { name: "Visualización 3D y mockups de producto" as T, projects: ["be-star", "valhalla", "hotrace"] },
      { name: "Comunicación y piezas publicitarias" as T, projects: ["cirquera"] },
    ],
    software: ["Adobe InDesign", "Adobe Illustrator", "Adobe Photoshop", "Adobe After Effects", "Adobe Premiere Pro", "Esko Studio (packaging 3D en Illustrator)"],
    interests: ["Tipografía expresiva", "Texturas grunge", "Diseño brutalista", "Experimentación visual", "Publicaciones impresas"] as T[],
  },

  contact: {
    email: "ivanordonez2013@gmail.com",
    /** Phone appears in the PDF portfolio. Hidden on the web by default — set `showPhone: true` to publish it. */
    phone: "+34 656 86 72 50",
    showPhone: false,
    invitation: "¿Tienes un proyecto de marca, packaging o editorial? Escríbeme y lo hablamos." as T,
  },

  /** Only profiles that exist. `null` = not rendered. */
  socials: {
    instagram: { handle: "season_xxv_", url: "https://www.instagram.com/season_xxv_/" },
    linkedin: null as null | { handle: string; url: string },
    behance: null as null | { handle: string; url: string },
  },

  /** InDesign-style slug line shown in section margins. */
  slugFile: "ivan-ordonez_portfolio-2026.indd",
} as const;

export type Site = typeof site;
