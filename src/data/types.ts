import type { T } from "@/lib/i18n";
import type assets from "./assets.generated.json";

export type AssetKey = keyof typeof assets;

export type Category = "identidad" | "packaging" | "editorial";

/**
 * What an image IS — shown as a small label so visitors can tell a 3D render
 * from a mockup, a flat artwork, an AI image or someone else's work.
 */
export type ImageKind =
  | "render" // 3D render made by Iván (Esko Studio)
  | "mockup" // design placed in a photographic mockup
  | "flat" // final artwork (labels, dielines, pages)
  | "process" // screenshot of the working process
  | "manual" // page/section of a brand manual
  | "photo" // original photograph
  | "ambient" // presentation scene; origin to confirm (possible AI) — see docs/CONTENT_TO_CONFIRM.md
  | "ai" // confirmed AI-generated image
  | "reference" // third-party work (references, other authors)
  | "art-direction" // example photo used to define photographic direction
  | "detail"; // enlarged crop of one of the artworks above (same pixels, closer)

export interface Media {
  key: AssetKey;
  alt: T;
  caption?: T;
  kind: ImageKind;
  /** `contain` keeps artwork/dielines uncropped on a tinted ground. */
  fit?: "cover" | "contain";
  /** Ground behind `contain` images. Defaults to the section's soft colour. */
  ground?: string;
}

export interface Swatch {
  name: T;
  hex: string;
  cmyk?: string;
  rgb?: string;
  pms?: string;
  use?: T;
}

export interface Specimen {
  name: string;
  role: T;
  /** CSS font-family to render a live sample (only for fonts available on the web). */
  family?: string;
  weights?: string;
  sample?: string;
}

export type Block =
  | { type: "media"; layout: "full" | "wide" | "inset" | "pair" | "trio" | "grid" | "offset-left" | "offset-right" | "tall-pair"; items: Media[]; ratio?: string }
  | { type: "palette"; colors: Swatch[]; note?: T }
  | { type: "specimen"; fonts: Specimen[]; media?: Media }
  | { type: "steps"; steps: { title: T; body: T; media?: Media[] }[] }
  | { type: "facts"; items: { label: T; value: T }[] }
  | { type: "quote"; text: T; cite?: T }
  | { type: "dodont"; items: { media: Media; label: T; ok: boolean }[] }
  | { type: "spreads"; items: Media[]; folios?: T[] }
  | { type: "varieties"; varieties: Variety[] }
  | { type: "words"; words: string[] }
  | { type: "compare"; before: Media; after: Media; beforeLabel: T; afterLabel: T }
  | { type: "annotated"; media: Media; notes: { title: T; body: T }[] }
  /** The whole family at a glance: one row per variant, one column per piece. */
  | { type: "matrix"; columns: T[]; rows: { label: T; ground?: string; ink?: string; items: Media[] }[]; note?: T }
  /** Detail crops: the artwork small, and enlarged regions of it (normalised [x0, y0, x1, y1]). */
  | { type: "detail"; media: Media; crops: { rect: [number, number, number, number]; caption?: T }[] };

export interface Variety {
  id: string;
  name: string;
  tagline: T;
  description: T;
  theme: { bg: string; ink: string; accent: string };
  colors: Swatch[];
  labels: Media[];
  cap: Media;
  bottles: Media;
  box: Media;
  dieline: Media;
  scene?: Media;
}

export interface Section {
  id: string;
  title: T;
  /** Optional original-language heading (e.g. Catalan chapter titles of a manual). */
  original?: string;
  lead?: T;
  body?: T[];
  blocks?: Block[];
  /** Surface: project ground, its alternate, neutral paper, or ink (dark). */
  surface?: "project" | "alt" | "paper" | "ink";
}

export interface ProjectTheme {
  /** Main ground of the case study */
  bg: string;
  /** Text on bg */
  ink: string;
  /** Project accent (used for the "ink plate" on hover, rules, links) */
  accent: string;
  /** Alternate ground for contrast sections */
  alt: string;
  /** Text on alt */
  altInk: string;
  /** Soft ground behind contained artwork */
  soft: string;
  /** CSS font-family for project headings (the project's own documented type, if web-available) */
  display?: string;
  /**
   * The brand face, used only for the project's name (its sheet, the case
   * opening, the menu preview) — set as the brand sets it: `upper` for a
   * capitals logotype, `weight` when the family has several.
   */
  brand?: { family: string; upper?: boolean; weight?: number };
}

export interface TeamMember {
  name: string;
  role?: T | null;
  me?: boolean;
}

export interface Project {
  slug: string;
  title: string;
  /** One line under the title. */
  tagline: T;
  /** Card copy on the home index (≤ 160 characters). */
  summary: T;
  categories: Category[];
  /** Exhibition group, exclusive, so counts always add up to the number of projects. */
  group: "destacados" | "identidad" | "editorial";
  /** Discipline label shown with the title, e.g. "Identidad y packaging". */
  label: T;
  disciplines: T[];
  /** Only if documented. */
  year: string | null;
  context: T;
  authorship: "individual" | "team";
  /** Iván's documented role. `null` → shown as "por confirmar" only in docs, not on the site. */
  role: T | null;
  team?: TeamMember[];
  tools: string[];
  theme: ProjectTheme;
  /** Ink patches for the hero control strip (2–3 documented brand colours). */
  inks: string[];
  /** Social-card image (public/og/<slug>.jpg is cropped from it, see scripts/asset-sources.mjs → OG) and its alt text. */
  cover: Media;
  /** Photograph for the home cover story, when it should differ from `cover` (which also feeds the social card). */
  poster?: Media;
  /** The one image that stands for the project everywhere it is "printed". */
  visual: KeyVisual;
  sections: Section[];
  credits: T[];
  published: true;
}

/**
 * KEY VISUAL — the project's printed sheet.
 * The same image is used by the hero proof, the project's sheet in the
 * index, the case-study opening and the "next project" sheet. Because it is
 * the *same* element on every page, the browser can morph it from the index
 * into the case study (React <ViewTransition>, shared name).
 */
export interface KeyVisual {
  media: Media;
  /** object: a product, printed piece or cut-out shown whole on the project's ground · photo: fills its frame. */
  mode: "object" | "photo";
  /** behind: title set behind the object, magazine-cover style · masthead: title across the top of a bleed photograph. */
  layout: "behind" | "masthead";
  /** Horizontal placement of an object. */
  align?: "left" | "center" | "right";
  /** Vertical placement: centred on the title, or standing at the foot of the sheet (covers only the bottom of the letters). */
  valign?: "center" | "bottom";
  /** Small tilt for printed pieces lying on the sheet (degrees). */
  tilt?: number;
  /** Object height as a share of the sheet's free height (default 0.78). */
  scale?: number;
  /** Shadow for printed pieces and cut-outs that carry none of their own. */
  shadow?: "paper" | "drop";
  /** Title colour when it is not the project's ink. */
  titleColor?: string;
  /** object-position for photo crops. */
  focus?: string;
  /** object-position when the visual fills a pile sheet as its faint backdrop (defaults to `focus`). */
  backdropFocus?: string;
  /** Width of the title's longest word in em, measured in the project's display face (fits the title to the measure). */
  fitEm: number;
}

/** Projects named in the brief whose source material has not been supplied yet. Never rendered. */
export interface DraftProject {
  slug: string;
  title: string;
  note: string;
  published: false;
}
