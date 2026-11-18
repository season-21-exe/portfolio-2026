import type { Locale } from "@/lib/i18n";

/** Interface copy. Spanish is complete; English is ready to be filled in. */
const es = {
  skip: "Saltar al contenido",
  nav: {
    work: "Trabajo",
    about: "Sobre mí",
    contact: "Contacto",
    menu: "Menú",
    close: "Cerrar",
    index: "Índice",
    home: "Inicio",
    back: "Volver al trabajo",
    primary: "Principal",
  },
  hero: {
    scroll: "Ver el trabajo",
    cover: "Proyecto en portada",
  },
  work: {
    title: "Trabajo",
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
    detail: "Detalle",
  },
  meta: { disciplines: "Disciplinas", context: "Contexto", role: "Mi papel", team: "Equipo", tools: "Herramientas", year: "Año" },
  case: { scroll: "Desplázate", next: "Siguiente proyecto", back: "Volver al trabajo", credits: "Créditos", progress: "Progreso de lectura", contents: "En esta página" },
  contact: { copy: "Copiar email", copied: "Email copiado", write: "Escribir un email" },
  zoom: { open: "Ampliar", close: "Cerrar", hint: "Arrastra o desplázate para leer", read: "Ampliar para leer", contents: "En este número", detail: "Detalle" },
  footer: { top: "Volver arriba", rights: "Diseño y desarrollo: Iván Ordóñez. Las obras y fotografías de terceros pertenecen a sus autores." },
  notFound: { title: "Esta página no existe", body: "Puede que la dirección haya cambiado.", cta: "Volver al inicio" },
};

export type UI = typeof es;

const dictionaries: Record<Locale, UI> = {
  es,
  en: es, // TODO(en): replace with an English dictionary when the translation is ready.
};

export const ui = (locale: Locale) => dictionaries[locale];
