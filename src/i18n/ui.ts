import type { Locale } from "@/lib/i18n";

/** Interface copy. Spanish is complete; English is ready to be filled in. */
const es = {
  skip: "Saltar al contenido",
  nav: { work: "Trabajo", about: "Sobre mí", contact: "Contacto", menu: "Menú", close: "Cerrar", index: "Índice", home: "Inicio" },
  hero: {
    scroll: "Desplázate",
    stripLabel: "Tira de control: un parche de tinta por proyecto",
  },
  work: {
    title: "Trabajo seleccionado",
    all: "Todo",
    viewGrid: "Pliegos",
    viewList: "Lista",
    viewLabel: "Vista del índice",
    filterLabel: "Filtrar por disciplina",
    open: "Ver proyecto",
    individual: "Individual",
    team: "En equipo",
    count: (n: number) => (n === 1 ? "1 proyecto" : `${n} proyectos`),
  },
  categories: { identidad: "Identidad", packaging: "Packaging", editorial: "Editorial" },
  imageKinds: {
    render: "Render 3D",
    mockup: "Mockup",
    flat: "Arte final",
    process: "Proceso",
    manual: "Página del manual",
    photo: "Fotografía",
    ambient: "Ambientación",
    ai: "Imagen generada con IA",
    reference: "Obra de terceros",
    "art-direction": "Referencia de dirección fotográfica",
  },
  meta: { disciplines: "Disciplinas", context: "Contexto", role: "Mi papel", team: "Equipo", tools: "Herramientas", year: "Año" },
  case: { next: "Siguiente proyecto", back: "Volver al índice", credits: "Créditos", progress: "Progreso de lectura", contents: "En esta página" },
  contact: { copy: "Copiar email", copied: "Email copiado", write: "Escribir un email" },
  footer: { top: "Volver arriba", rights: "Todos los derechos reservados sobre el diseño. Las obras y fotografías de terceros pertenecen a sus autores." },
  notFound: { title: "Página no impresa", body: "Esta página no existe o ha cambiado de dirección.", cta: "Volver al inicio" },
};

export type UI = typeof es;

const dictionaries: Record<Locale, UI> = {
  es,
  en: es, // TODO(en): replace with an English dictionary when the translation is ready.
};

export const ui = (locale: Locale) => dictionaries[locale];
