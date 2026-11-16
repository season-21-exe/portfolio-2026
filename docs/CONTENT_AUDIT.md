# Content audit

Audit of everything supplied in `/source-material` (and the 32 images attached to the brief), carried out before any design work. Date: 16 Nov 2026.

## 1. What was supplied

| File | Pages / size | What it is | Language |
|---|---|---|---|
| `pdfs/Portfolio_reducido.pdf` | 35 slides, 1920×1080 pt | Iván's own condensed portfolio: cover, "Quién soy", CV slide, and 2–4 slides per project. **Primary source for bio, CV, contact and the personal visual identity** (black + paper + red, torn paper, polaroid, extended display type). | ES |
| `pdfs/CREMA.pdf` | 24 pages, A4 landscape | **Be Star / Hydrastar** process document — module "1483 Diseño Estructural Envase y Embalaje", task RA5.A9.T1 "Representación 2D y 3D". Silhouettes, Esko Studio steps, palette, type, label, finishes, box, sleeve ("camisa"), regulation icons, renders. | ES |
| `pdfs/CERVEZA.pdf` | 33 pages, A4 landscape | **Valhalla** process document, same module/task. Bottle + box process, moodboard, palette, type, three varieties (labels, caps, 3D bottles), dielines, 3D boxes, presentation scenes. | ES |
| `pdfs/CIRQUERA.pdf` | 43 pages, A4 landscape | **Cirquera** corporate identity manual (team of 4). Logo, grid, colour reproduction, minimum size, safety area, misuse, slogan, typography, colour system, illustration, iconography, photography, ad structure, applications. Escola del Treball logo on the back cover. | ES |
| `pdfs/INDOMITA.pdf` | 23 pages (small page units) | **Indómita** "Manual d'identitat corporatiu" (team of 3). Construction, protection area, minimum sizes, colours, typography, variants, incorrect uses. | **CA** |
| `pdfs/Revista_Fernando_Alonso.pdf` | 5 pages: cover + 4 spreads | **HOTRACE** magazine layout (cover + pp. 2–9). Journalistic text and photographs are third-party. | ES |
| `pdfs/herb_lubalin.pdf` | 3 pages: cover + 2 spreads | **Herb Lubalin** editorial fascicle. Reproduces Lubalin's own works as reference material. | ES (one heading in CA) |
| `images/*` (folders `cerveza`, `cirquera`, `crema`, `herb_lubalin`, `indomita`, `revista_alonso`) | — | **Empty** when the audit started. | — |
| `references/`, `videos/` | — | **Empty.** No video material was supplied. | — |
| 32 images attached to the brief | 0.2–28 MB each | Renders, mockups, illustrations, the personal polaroid, a torn-paper texture and six reproductions of Herb Lubalin's work. Copied (never moved) into `source-material/images/<project>/` with descriptive names. See `ASSET_INVENTORY.md`. | — |

### Projects named in the brief but **not** in the material

- **LA TORCIDA**: no PDF, no images.
- **DYNA CREATIVE LAB**: no PDF, no images.

Neither has a page on the site. Both are kept as draft stubs in `src/data/projects.ts → draftProjects`, which are never rendered, ready to be completed when the material arrives. Nothing about them was invented.

### Projects in the material but **not** named in the brief

- **INDÓMITA** (identity manual), **HOTRACE** (magazine) and **HERB LUBALIN** (fascicle) were added because they are real, documented work, and they give the portfolio an editorial discipline that the brief's list lacked.

## 2. How the material was read

1. **Text** was extracted from every PDF (`pdftotext -layout`, UTF-8).
2. **Visuals**: every page of every PDF was rendered (mupdf) and reviewed on contact sheets. Every embedded raster image was then extracted and reviewed.
3. **Crops for the web** come from `scripts/extract-pdf-assets.mjs`. It renders pages at high resolution and crops either the exact bounding box of an embedded image (this keeps renders whose transparency masks are lost on raw extraction) or a normalised region (for vector artwork: labels, dielines, grids). The PDFs are never modified.

## 3. What belongs on the website

| Project | Weight on the site | Why |
|---|---|---|
| Valhalla | **Lead** (first, largest card) | Strongest individual project: a complete system (3 varieties × labels, caps, bottles, boxes, dielines) with clear storytelling: *one system, colour as the variable*. |
| Cirquera | **High** | The most complete identity manual, with the widest range of applications. It is team work, so it is credited as such. |
| Be Star | **High** | Shows structural packaging, print finishes and the 2D→3D process step by step. |
| HOTRACE | Medium | Editorial layout; the strongest editorial piece visually. Third-party content noted. |
| Herb Lubalin | Medium | Typographic and editorial thinking; a good fit with Iván's stated interest in expressive type. |
| Indómita | Medium–low | A solid manual with fewer applications; team work; in Catalan. |

**Kept out of the site:** academic headers ("RA5.A9.T1…") and step-by-step software instructions (condensed into one sentence per step), lorem-ipsum blocks in the Cirquera manual (pp. 20), and the dot-based software ratings from the CV slide (the brief asks for no proficiency ratings).

## 4. Personal information found

From `Portfolio_reducido.pdf`, pp. 2–3:

- Name: **Iván Ordóñez García** (written "Ivan Ordoñez Garcia" on the cover, without accents).
- Age 25. *Not shown on the site.*
- Education 2024–2026: "Diseño y edición de publicaciones impresas y multimedia", Escola del Treball de Barcelona. (The bio paragraph calls the same studies "Diseño Gráfico en la Escuela del Trabajo"; see `CONTENT_TO_CONFIRM.md`.)
- Experience 2025: internship in layout and design at **agencia Anverso**, Barcelona (magazines and Instagram posts in InDesign; retouching in Photoshop).
- Software: Photoshop, Illustrator, InDesign, After Effects, Premiere Pro. Esko Studio / ArtiosCAD is documented in the packaging PDFs.
- Interests: grunge textures, brutalist design, compositions with character, visual experimentation.
- Contact: email, Instagram `season_xxv_` (icon verified on the slide), and phone. **The phone is configured but hidden** (`site.contact.showPhone = false`).

## 5. Design decisions to preserve from the sources

- Iván's **own identity** from the PDF portfolio became the portfolio's visual language: black / paper / red, heavy extended capitals, torn paper, the taped red polaroid, tilted discipline bands with a circular glyph, and the outlined repeat in "Quién soy".
- **Each project keeps its documented palette and, where available on the web, its documented typeface**: Bricolage Grotesque (Be Star), Montserrat (Valhalla), Poppins (Cirquera, Indómita). Fonts that are not web-available (Sparkling Valentine, Njord Alternate, Aquavit, RL Aqva, Alfarn 2) are shown through the original specimen pages, never imitated.
- Cirquera's rule *"red only for active / hover states"* and its correct/incorrect photography guidance are presented as interactive comparisons.
- Valhalla's rule *"same system, colour per variety"* is the interaction: a switcher that re-inks the block.
