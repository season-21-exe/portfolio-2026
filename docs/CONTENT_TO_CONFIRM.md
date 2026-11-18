# Content to confirm

Everything the site needs from you, in priority order. Each item says **where to edit it**. Nothing below was invented; wherever information was missing, the site omits it.

## 🔴 Before publishing

1. **Image origins (AI / stock / own).** These presentation scenes are labelled *"Ambientación"* until you confirm what they are:
   - Be Star: `escena-tapas`, `lifestyle-modelo`, `gama-piedra`, `caja-marmol`
   - Valhalla: `beer-ambiente`, `gold-ambiente`, `radler-ambiente` (barbecue / forest scenes)
   - Note: attachment 27 (`valhalla-beer-bar-escena-ia.jpg`) carries a **Gemini watermark** and is **not used**. The similar bar shots inside CERVEZA.pdf (pp. 13, 17, 21) were left out for the same reason.
   - → In `src/data/projects.ts`, change `"ambient"` to `"ai"`, `"mockup"` or `"photo"` as appropriate.
2. **Your role in team projects**: Cirquera (4 people) and Indómita (3 people). → `role` and `team[].role` in `projects.ts`. Template in `PROJECT_CREDITS.md`.
3. **Valhalla illustrations** (Viking head, drakkar, Celtic knot): did you draw them, adapt them or license them? The PDF says you searched for resources "such as typefaces or illustrations". The site currently does **not** credit illustration.
4. **Third-party material.** HOTRACE uses press photos and interview texts about Fernando Alonso and Aston Martin; Herb Lubalin reproduces his work. Both are credited, but decide whether you're comfortable publishing them on a public site.
5. **Site URL** for canonical links, sitemap and social cards → set `NEXT_PUBLIC_SITE_URL` when building (see README).

## 🟠 Missing material

6. **LA TORCIDA** and **DYNA CREATIVE LAB**: no files were supplied. The redesign brief allows LA TORCIDA only if your contribution can be honestly identified; with no material there is nothing to identify, so neither is on the site. To publish them, add their PDFs and images to `source-material/`, say what you did in each, and convert the stubs in `draftProjects` (end of `projects.ts`) into full projects. Keep them as **two separate identities**.
7. **Years** of every project (all `year: null`, so the "Año" line is hidden).
8. **Indómita**: real client or academic brief? Who made the "ESCOCIA" posters and where are the photos from? Why do the variants use orange and navy, which the colour chapter doesn't list?
9. **HOTRACE / Herb Lubalin**: academic or personal? Software used? (InDesign is likely, but it isn't stated, so no tools are shown.)
10. **Profiles**: LinkedIn and Behance URLs → `src/config/site.ts → socials`. They stay hidden while `null`.
11. **Phone**: it's in your PDF portfolio, but hidden on the web by default → `site.contact.showPhone`.

## 🟡 Wording to approve

12. **Cover lines.** The site is in Spanish, so the brief's suggested English lines were set in Spanish: *IVÁN ORDÓÑEZ / DISEÑADOR GRÁFICO / IDENTIDAD · PACKAGING · EDITORIAL*, and the statement *"Diseño identidades visuales, packaging y publicaciones con carácter."* (`site.title`, `site.disciplines`, `site.statement`). If you'd rather have the English *GRAPHIC DESIGNER*, change `site.title`; the type refits itself.
12b. **Pull line in "Sobre mí"**: *"Composiciones con carácter: propuestas que transmiten personalidad y fuerza."* It's taken word for word from your third bio paragraph and set large (`About.tsx`). Approve it or pick another sentence of yours.
13. **Contact invitation**: *"¿Tienes un proyecto de marca, packaging o editorial? Escríbeme y lo hablamos."* (`site.contact.invitation`). It doesn't promise availability; adjust if you're actively looking for a job.
14. **Bio** (`site.bio`): rewritten from your PDF. Your PDF calls your studies both "Diseño Gráfico" and "Diseño y edición de publicaciones impresas y multimedia"; the site uses the latter, the official title from your CV slide. Please confirm.
15. **School name**: the site uses "Escola del Treball de Barcelona" (as on the logo); your text says "Escuela del Trabajo".
16. **Internship**: "agencia Anverso, Barcelona". Confirm the exact name, and whether you'd like a link.

## Contradictions found in the sources (not resolved silently)

| Where | What | What the site does |
|---|---|---|
| CERVEZA.pdf pp. 10 / 18 | Beer is "suave a diferencia de las otras"; Radler is "mucho más suave que la principal" | Avoids comparing smoothness: Beer "la principal", Gold "más intensa", Radler "con limón" |
| INDOMITA.pdf pp. 16–17 | "Alfarn 2" (text) vs "Alfarm 2" (specimen) | Uses "Alfarn 2". Confirm |
| INDOMITA.pdf p. 19 | Orange / navy variants are not in the colour chapter | Shows the variants as documented; colours not added to the palette |
| CIRQUERA.pdf index | Two sections numbered "2"; dividers run 01–08; "3149" page number | Not reproduced |
| Portfolio p. 2 | "Diseño Gráfico" vs "Diseño y edición de publicaciones…" | See item 14 |
| Source spelling | "¿Porque…?", "Ilusctraciones", "TIPOGRAIFA COORPORATIVA", "Colaboarción" | Corrected in the site copy; the PDFs are untouched |
