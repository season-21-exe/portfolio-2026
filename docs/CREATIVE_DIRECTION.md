# Creative direction: "Prueba de imprenta"

## 1. Strategy

**Positioning.** A graphic designer from Barcelona whose work ends up printed: labels, boxes, magazines, manuals. Disciplines on show: **identity, packaging, editorial**. The site presents a recent graduate with an internship and a strong point of view. It doesn't pretend to be a studio and lists no clients that don't exist.

**Narrative** (first impression → curiosity → exploration → understanding → contact):

1. **Hero**: the name *printed*, with a red plate sliding into register (horizontally, the way a press misregisters). A statement whose three clauses open the work by discipline. A proof that runs through every project's sheet in miniature, with the control strip showing which sheet is on the press.
2. **Discipline band**: Identidad ⊕ Packaging ⊕ Editorial, the device from Iván's PDF portfolio.
3. **Work, the pile**: each project is a full-screen sheet printed in its own inks and typeface, composed like a magazine cover: title behind the object, or a masthead over a bleed photograph. On wide screens the sheets are sticky, so each proof is laid on top of the last. On phones each cover stacks (masthead on top, object below). Filterable by discipline, with a dense list view as an alternative.
4. **About**: polaroid, bio, education and experience, and a spec sheet of what the work demonstrates (no skill bars).
5. **Contact**: the last sheet, a street poster printed solid in signal red with tear-off tabs. Tearing one copies the email. Real profiles only; no fake form.

**Project order:** Valhalla → Cirquera → Be Star → HOTRACE → Herb Lubalin → Indómita. The strongest individual system leads; team work is credited as team work; editorial balances packaging.

**Navigation:** two header tabs that stay legible on any surface (name, and the section links + "Índice"), and a full-screen index menu with a preview of each project. Case studies add a reading-progress hairline and a running-head chip (current section / jump menu).

## 2. Concept

Almost everything Iván designs is meant for print, and his own portfolio already speaks in black, paper and red. So the site is treated as a **press proof**:

- registration marks ⊕, crop marks and **InDesign slug lines** (`file.indd  folio  date time`) in the margins, showing the visitor's local time like a proof just printed
- a **control strip** whose ink patches are the documented palettes of each project
- **overprint**: display type printed as two plates (carbon and red, multiplied), so misregistration becomes the signature motion
- **torn paper** between surfaces, and the paper texture from Iván's own PDF

The portfolio is the press; each project is printed in **its own inks and typeface** (Be Star in Bricolage Grotesque, Valhalla in Montserrat, Cirquera and Indómita in Poppins), so no project is forced into the house style.

## 3. System

| Token | Value | Use |
|---|---|---|
| Carbón | `#1A1918` | Ink, dark surfaces |
| Papel | `#E8E7E2` | Paper surfaces: cool offset stock, deliberately not cream |
| Gris | `#8B8984` · text greys `#5C5A56` (on paper) / `#A8A6A0` (on carbon) | Secondary text (≥ 4.5:1) |
| Señal | `#FF3D17` | The red plate: accents, focus rings, contact sheet. Used as text only on carbon (4.9:1) |

**Type**: one variable family, **Archivo**, at three widths:
- *Expanded black* (wdth 125, 900) for display: name, section titles, project titles
- *Normal* (wdth 100) for reading
- *Condensed* (wdth 62–75) for slugs, captions and metadata: the voice of the margins

Display sizes are **fitted to the measure** (e.g. the name is `(100vw − 2·gutter) / 6.6`), so the type fills the sheet edge to edge on any screen without overflowing.

**Layout**: 12-column grid; left-aligned text; asymmetric placement by position, so any filtered subset still composes; case-study sections are numbered (they are a sequence) with headings on columns 4–12.

**Image honesty**: every figure carries a small label saying what it is (Render 3D, Mockup, Arte final, Proceso, Página del manual, Ambientación, Obra de terceros…).

## 4. Motion language

One orchestrated moment per page, then motion only as a response to the visitor.

| Where | What | Why |
|---|---|---|
| Home hero (load) | Name rises line by line; red plate slides into register horizontally; proof wipes up; ink chips print in | The site's signature, in a single sequence (~2 s); the page is usable immediately |
| Home hero (pointer) | The red plate drifts slightly out of register with the cursor | Feedback that the page is "live" ink |
| Hero proof | Every 4.2 s the next project's sheet is pulled up over the last (clip wipe); the active strip patch shows the timer. Holds on hover or focus, pauses off-screen, off with reduced motion | Shows the range of the work in the first screen without asking for a click |
| Discipline band | Slow drift; speeds up or reverses with scroll velocity | From Iván's PDF, made physical |
| The pile | Sticky sheets: each proof is laid over the previous one as you scroll (CSS only, native scroll). On hover the title prints its accent plate and the object lifts slightly | Each project is met in its own world, one at a time |
| Filters / view | The filtered pile is laid down again (short rise) | Shows that the selection changed |
| Opening a project | Native view transition. The clicked sheet (ground, title, object) morphs into the case-study opening, which is the same sheet with the object 8 % larger, while the old page sinks back. If the sheet wasn't on screen (hero proof, menu), the new sheet is laid over the sinking page. The "next project" sheet at the end of each case study morphs the same way, and the breadcrumb returns to the project's own sheet in the pile | Same object, going deeper: the sheet *becomes* the page instead of being swapped for it |
| Contact | Tear-off tabs tilt and fall when pulled; the email is copied | A function (copy), told in the vernacular of street posters |
| Valhalla | Variety tabs re-ink the whole block | The project's own rule: the structure stays, the colour changes |
| HOTRACE | Pinned horizontal page-turn (desktop only) | Reading a magazine; on phones the spreads stack |
| Cirquera | Before/after wipe (range input) | The manual's correct/incorrect photography rule |
| Herb Lubalin | Adjectives stretch along Archivo's width axis as you scroll | An homage to a designer who stretched letters |

**Rules:** transform / opacity / clip-path only; no scroll hijacking (the HOTRACE pin maps native scroll); everything is wrapped in `gsap.matchMedia("(prefers-reduced-motion: no-preference)")`. With reduced motion the plate rests in register and all content is visible immediately. Reveals use IntersectionObserver, so they stay correct when filters reflow the layout.

**Measured** (production build, fresh tab, 1440×900): 60 fps idle and while scrolling on home, Herb Lubalin and Indómita; worst frame 18 ms.

## 5. References

The brief lists 0110 Studio, Thibaut Foussard, Bruno Simon, Awwwards and CSSDA. **I did not browse them live during this build**, so no layout, code or asset was taken from them. The ideas this direction shares with that tier of work are general ones: a single signature interaction instead of scattered effects, type as image, a navigation that is itself an object (the control strip and the index), and transitions that carry the destination's identity. Three.js / WebGL were considered and rejected: the work is print, and a 3D scene would compete with it.

## 6. Self-critique (creative-director pass)

- **Distinctive?** Yes. The overprinted name and the ink control strip come from Iván's world (print, his own red-and-black identity), not from a template.
- **Typography?** One family at three widths, with display sizes fitted mathematically; the projects keep their documented faces.
- **Projects keep their identity?** Yes: each case study switches palette, ground and typeface.
- **Individual contribution clear?** Individual vs team is shown on every card; team projects list all members and claim no individual role until Iván confirms it.
- **Mobile?** Checked at 390, 768, 1024, 1440 and 1920 px: no horizontal overflow on any route; the pinned page-turn becomes a vertical stack; crop marks hide below `lg`.
- **What would raise it further:** real years and individual roles; LA TORCIDA and DYNA (the most strategic projects in the brief) once their material exists; confirmed image origins, so the "Ambientación" labels can be precise; an English version.

## 7. Second pass: creative-director review

Reviewed on the rendered site, screen by screen. What was wrong, and what changed:

| Weakness found | Change |
|---|---|
| The overprint was offset diagonally and read like a 1990s drop shadow | Misregistration is now horizontal only, as on a real press: red on the right edges, carbon on the left |
| The first screen showed one mockup; the lower third was cluttered | The proof prints every project's sheet in miniature and advances on its own; the statement's clauses double as the discipline index; the redundant subline was removed |
| The gallery was a dark grid of photo-plus-caption cards, the same formula six times, with busy mockup backgrounds | The pile: each project is a full sheet in its own inks and typeface, composed like a magazine cover around one key visual (cut-outs and printed pieces, not busy photos) |
| "Trabajo seleccionado" took a whole screen before any work appeared | A compact header; the first sheet starts in the same view |
| Case studies opened on title and metadata, with the work below the fold inside a grey card | Each case study opens on its own sheet: the work fills the first screen; the metadata moved to a compact intro row |
| The page transition was a curtain that hid the cut | A shared-element morph: the sheet you click becomes the page |
| The opening tagline was repeated by the first section's lead | Duplicated leads removed in four projects |
| Contact: strong colour, empty lower half, a small "copy" button | Tear-off poster tabs carry the copy action; profiles moved beside the invitation |
| Indómita: two thin sections of manual screenshots | Merged into one composed "Construcción" spread |
| Phones: titles hidden behind tall objects | Covers stack on phones: masthead on top, object standing below |

**Removed rather than added:** the GSAP page curtain, the asymmetric card grid and its Flip animation, the hover second-image swap, and a lead paragraph in four case studies.

## 8. Third pass: "Edición 2026" redesign

The site is now set as **one edition**: a front cover, an exhibition in three rooms, a profile, and a back cover. The print heritage stays (a red plate printed slightly out of register, thin rules, numbered folios), but it's quieter and more editorial. Where this section conflicts with sections 2–4, it supersedes them. (The exhibition was later replaced by the pile again: see §9.)

**System**
- **Type.** Archivo at three widths: *expanded black* for names and titles, *condensed black* for the profession, room names and pull lines, and *normal* for reading. IBM Plex Mono for every technical label: numbers, categories, metadata and captions. Projects keep their own faces inside their case studies.
- **Colour.** Charcoal `#151413`, warm paper `#ECEBE5`, three greys, and one signal red `#FF4317`, used only for the plate, active states, numbers and the "@" of the address.
- **Numbering.** Projects 01–06 come from a single source; chapters are 02.1, 02.2…; the cover and the index overlay use the same numbers.

**What changed, and why**

| Weakness found | Change |
|---|---|
| The first screen lacked impact; the profession was small | **Cover**: IVÁN ORDÓÑEZ and DISEÑADOR GRÁFICO both fill the measure (fitted with container units). The red plate slides into register; a cover story cycles one photograph per project, with a numbered 01–06 index that shows timing and lets you pick |
| Six sheets of equal weight; counters that didn't add up (4 + 2 + 2 = 8 for 6 projects) | **Exhibition** in three rooms of two: *Destacados* (Valhalla wide with its label laid over, Be Star split with its unfolded label crossing the gutter), *Identidad* (Cirquera large, Indómita offset with vertical captions), *Editorial* (HOTRACE and Herb Lubalin as the two pages of one open spread). The groups are exclusive, so the counts are 2 + 2 + 2 = 6 |
| "Prueba 1/6" and InDesign slug lines read as debug output | Removed everywhere |
| "Quién / Quién / soy" read as a duplicated heading | **Sobre mí**: one heading, the polaroid, his intro, one sentence of his own set large, and a data sheet whose disciplines link to the projects that show them (by number) |
| The email appeared about 17 times (tear-off tabs, footer, buttons) | **Back cover**: HABLEMOS with the cover's plate, the address once at full measure, one copy button, Instagram. The footer repeats contact only on pages without this section |
| The navigation gave no sense of position | **Sticky bar**: transparent over the cover, solid on scroll, with the active section marked and the project in view named (01 Valhalla). In case studies: ← Trabajo, number and title, the current chapter, and a reading-progress rule |
| HOTRACE spreads too small to read | **Readable pages**: spreads stacked at the largest size the screen allows, an "En este número" contents list beside the cover, a full-resolution viewer (drag or pinch to read), and detail crops of the typography |
| Case studies were one long column of figures | Shared framework: chapter label, title in the project's face, two-column text, full-bleed images, a **family matrix** (Valhalla: three varieties × four labels), **detail crops** (HOTRACE, Lubalin) and the Indómita manual cover opening its case |
| The hero cover repeated the first exhibition image | Each project can set a separate cover-story photograph (`poster`) |

**Motion**: the cover's entrance (lines rising, the plate sliding into register, the rule drawing); the plate following the pointer; cover-story wipes with progress bars; number folios rising digit by digit; image reveals; the card → case-study morph; the back cover printing on arrival; the index overlay wipe. All of it is off under `prefers-reduced-motion`.

**Removed**: the marquee band, the torn-paper edges, the tear-off tabs, the running head, the slug lines, crop marks, the filter/list views, rounded badges.

**Review passes** (on the rendered site, at 390 / 768 / 1024 / 1440 / 1920 px):
1. *Visual design*: the plate printed 0.16 em too high (a margin-collapse bug), fixed with `flow-root`. Overlays on the Valhalla and Be Star cards covered their captions, so they were repositioned. The Indómita card cropped its logo, so it's now square. Section titles were too small on phones and now fill the measure.
2. *Experience*: the header named the wrong project when two cards shared the screen (it now follows reading order); the cover caption truncated at tablet width; HOTRACE contents entries started in lower case. The spread viewer was checked for focus, Esc, return focus and drag-to-pan.
3. *Creative direction*: the cover no longer repeats the exhibition's first image; one sentence of Iván's own words carries the profile; the closing mirrors the cover, so the site reads as one edition from front to back.

## 9. The pile, restored

At Iván's request (17 Nov 2026), the work section goes back to **the pile** from the second pass (§7). Every project is a full sheet in its own inks and typeface, and as you scroll each new sheet is laid on top of the last. The rest of the third pass stays. This section supersedes the *Exhibition* row of §8.

- **Order and groups.** The sheets follow the hierarchy (Destacados, then Identidad, then Editorial). Each sheet names its group next to its number ("01 · Destacados"), so the count still reads 2 + 2 + 2 = 6. The category filters stay out: they were the counters that didn't add up.
- **Stacking.** The sheets are sticky (pure CSS; scrolling stays native) whenever a whole sheet fits the screen, that is, at least 560 px tall. On shorter screens they simply follow one another, so the foot of a sheet is never covered before it has been seen.
- **The bar takes the sheet's inks.** While a project's sheet is under the header (in the pile, at the opening of a case study, or as the next-project sheet), the bar takes that project's ground and ink, so the sheet runs edge to edge. The colour changes the moment a sheet meets the bar, with no fade, so the type never passes through an unreadable midpoint.
- **Position.** The bar names the sheet on top, which is the last one laid, not the first one crossing the reading line.
- **Links to a sheet** (`/#p-<slug>`, such as the case study's *Trabajo* breadcrumb) aim at fixed marks where each sheet comes to rest, because a stuck sheet's own box travels with the scroll. When keyboard focus lands on a covered sheet, that sheet is brought back on top.
- **Removed with the exhibition:** the room layouts, the overlaid details (`cardDetail`) and the rising folios (`NumberReveal`).


### 9.1 Brand faces and the faint key visual (2026-11-17)

- Iván supplied the brand faces (`src/fonts/<project>/`, see its LEEME.md). Each project's **name** is now set in its own brand face (`theme.brand`): Njord Alternate (Valhalla), Aquavit Extrabold (Cirquera, also its headings, as its manual says), Sparkling Valentine (Be Star, the face reserved for the brand name), Bebas Neue (HOTRACE). Indómita and Herb Lubalin keep Archivo until their files arrive.
- On the pile sheets and the "next project" sheet, the key visual is no longer an object standing in front of the name: it fills the sheet behind it, in greyscale at low opacity (luminosity blend on dark grounds, multiply on light), so the corporate colour leads and the name reads first. The case-study opening keeps the full-strength visual; the morph carries it from faint to full.
