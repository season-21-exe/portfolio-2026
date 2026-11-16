# Iván Ordóñez — Portfolio 2026

Personal portfolio of **Iván Ordóñez García**, graphic designer (identity, packaging, editorial). Spanish first, with English-ready content architecture.

Next.js 16 (App Router, static export) · React 19 · TypeScript · Tailwind CSS 4 · GSAP 3 (ScrollTrigger, Flip).

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
```

## Build & deploy

```bash
npm run build        # static site in /out
npm start            # serves /out at http://localhost:3000 (via `serve`)
```

`npm run build` = `next build` + `scripts/postbuild-export.mjs`. The post-build step works around a Next 16 static-export quirk: prefetch segment files can be written as nested folders while the router requests flat names. It only adds files.

Set the public URL when building, for canonical links, the sitemap and social cards:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com npm run build
```

The `/out` folder deploys to any static host:
- **Vercel**: import the repo; framework "Next.js"; set `NEXT_PUBLIC_SITE_URL`.
- **Netlify / Cloudflare Pages**: build command `npm run build`, publish directory `out`.
- **GitHub Pages**: upload `out/`. Under a sub-path you also need `basePath` in `next.config.ts`.

## Where to edit things

| What | File |
|---|---|
| Name, bio, education, experience, skills, email, socials, hero statement | `src/config/site.ts` |
| Projects (text, credits, images, palette, layout, order) | `src/data/projects.ts` |
| Interface copy (menu, buttons, labels) | `src/i18n/ui.ts` |
| Colours, type roles, surfaces | `src/app/globals.css` |
| Image sources (key → file) | `scripts/asset-sources.mjs` |

Anything set to `null` (year, role, LinkedIn…) is simply not rendered. The open items are listed in **`docs/CONTENT_TO_CONFIRM.md`**.

## Images

```bash
npm run assets:extract   # crops figures out of the PDFs → source-material/_extracted/ (derived, git-ignored)
npm run assets:build     # → public/assets/*.avif|webp (480–2400 px) + src/data/assets.generated.json + public/og/*.jpg
```

To add an image: put the file in `source-material/images/<project>/`, add a key in `scripts/asset-sources.mjs`, run `npm run assets:build`, then reference the key in `projects.ts` with alt text and a `kind` (`render`, `mockup`, `flat`, `process`, `manual`, `photo`, `ambient`, `ai`, `reference`, `art-direction`). The kind is shown to visitors as a label.

The asset scripts use `sharp` and `mupdf` (AGPL) as **local dev tools only**; neither ships to the browser.

## Add a project

1. Add the material to `source-material/` (PDFs in `pdfs/`, images in `images/<slug>/`).
2. Add its images to `scripts/asset-sources.mjs` and run `npm run assets:build`.
3. Append a `Project` object to `projects` in `src/data/projects.ts`. Copy an existing one, then set:
   - `theme`: the project's inks and typeface;
   - `visual`: the **key visual**, the single image that represents the project on its sheet in the pile, in the hero proof and in the case-study opening;
   - `sections`.

   For the key visual, choose `layout: "behind"` (title behind a cut-out or printed piece) or `"masthead"` (title over a bleed photograph). Set `fitEm` to the width of the title's longest word in em, in the project's own typeface, so the title fills the sheet edge to edge: measure it in the browser, or start at about 0.9 × the number of letters and adjust.

   The route `/projects/<slug>/`, the sheet in the pile, the menu entry, the control-strip patch, the "next project" sheet and the sitemap are all generated from it.

`draftProjects` holds **La Torcida** and **DYNA Creative Lab**, which are waiting for their material. They are never rendered.

## Add English

The content is typed for translation: every text field is a `T` (`string` = Spanish, or `{ es, en }`).

1. Fill `en` in `src/i18n/ui.ts` (currently a copy of `es`).
2. Turn the strings you translate into `{ es: "…", en: "…" }` in `site.ts` / `projects.ts`. Untranslated fields fall back to Spanish.
3. Add `src/app/en/page.tsx` and `src/app/en/projects/[slug]/page.tsx` rendering the same components with `locale="en"` (every component already accepts a `locale` prop). Then add `alternates.languages` to the metadata and a language switch to the header.

## Structure

```
src/
  app/                  layout (fonts, metadata), home, projects/[slug], sitemap, robots, icon
  components/
    home/               Hero, Marquee, ProjectIndex (the pile / list / filters), About, ContactSection (tear-off tabs)
    project/            ProjectCover (a project's sheet: index / case opening / next), MiniCover (the same sheet in miniature)
    case/               CaseStudy, Blocks, Figure, Palette, Varieties, Spreads, Compare, Words, RunningHead
    layout/             Header (+ index menu), Footer, Slug
    motion/             PageTransition (TransitionLink with transition types), PageSheet (page-level view transition), Reveal
    print/              CropMarks, RegMark, TornEdge
    ui/                 Picture (AVIF/WebP, explicit size, placeholder)
  config/site.ts        personal data
  data/                 projects.ts, types.ts, assets.generated.json
  i18n/ui.ts            interface strings
  lib/                  gsap, i18n, color
scripts/                asset extraction / optimisation / inventory / post-build
docs/                   audit, analysis, inventory, credits, items to confirm, creative direction
source-material/        original PDFs and images (never modified)
```

## Page transitions

Navigation uses native view transitions (React `<ViewTransition>` with `<Link transitionTypes>`). No library is involved, and browsers without support simply navigate.
- **Forward links** (`TransitionLink`, default `direction="forward"`) tag the navigation `nav-forward`. A project's sheet, title and key visual share names (`vt-sheet-*`, `vt-title-*`, `vt-visual-*`), so a sheet that is on screen when clicked morphs into the case-study opening.
- **Back links** use `direction="back"`.
- **Page motion** comes from `PageSheet`, because React leaves the document root static. The CSS lives at the end of `globals.css`.
- React only pairs shared elements that are **visible** at the moment of the click. That's why an off-screen sheet (for example from the hero proof or the menu) gets the "laid on top" page transition instead of the morph.

## Quality notes

- Accessibility: semantic landmarks and heading order, skip link, visible focus (signal-red ring), keyboard tabs on the Valhalla switcher (arrow keys / Home / End), range input for the comparison slider, an inert background behind the menu, Esc to close, and text-contrast checks on every theme.
- `prefers-reduced-motion` turns off every non-essential animation; all content stays visible.
- Every image has explicit dimensions and a placeholder: no layout shift.
- QA done on the production build at 390, 768, 1024, 1440 and 1920 px: no horizontal overflow, all internal links return 200, 60 fps while scrolling.
