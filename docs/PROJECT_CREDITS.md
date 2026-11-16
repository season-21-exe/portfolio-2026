# Project credits

What the sources say about who did what, and what the site shows. Credits are edited in `src/data/projects.ts` (`authorship`, `role`, `team`, `credits`). A `role` of `null` simply hides the "Mi papel" line.

| Project | Authorship | Documented team | Iván's documented role | Shown on site | Third-party content |
|---|---|---|---|---|---|
| **Valhalla** | Individual | Iván (cover of CERVEZA.pdf) | Whole project; process written in first person | "Proyecto individual: identidad, diseño de etiquetas y cajas, desarrollo estructural y visualización 3D." | Moodboard brands (Drakkar, Varvar, Odin…). Illustration authorship **unknown**: the PDF says resources were searched for. |
| **Be Star** | Individual | Iván (cover of CREMA.pdf) | Whole project; first person | "Proyecto individual: identidad, diseño de etiqueta, caja y camisa, desarrollo estructural y visualización 3D." | Presentation scenes may use AI or stock (to confirm). Watercolour leaves on the sleeve: origin unknown. |
| **Cirquera** | **Team (4)** | Iván Ordóñez, Oscar Garcia, Alex López, Sindri Faldmo | **Not documented** | Team list with "(yo)" by Iván's name; no individual role claimed | Example photographs in the photography chapter |
| **Indómita** | **Team (3)** | Sindri Faldmo, Iván Ordóñez, Anely Silva | **Not documented** | Team list; no individual role claimed | Photographs (tree house, Scotland) of unknown origin |
| **HOTRACE** | Individual | Iván | Layout, typography, image treatment, composition, mockups (portfolio p. 6) | As documented | Interview texts, photographs, Aston Martin and sponsor brands |
| **Herb Lubalin** | Individual | Iván | Layout of the fascicle | "Diseño y maquetación del fascículo: portada y dos dobles páginas." | Lubalin's works and portraits |
| *La Torcida* | — | — | — | **Not published** (no material) | — |
| *DYNA Creative Lab* | — | — | — | **Not published** (no material) | — |

## To fill in for team projects

For Cirquera and Indómita, add Iván's own contribution, for example:

```ts
role: "Diseño del logotipo y la iconografía; maquetación del manual.",
team: [
  { name: "Iván Ordóñez", me: true, role: "Logotipo, iconografía, maquetación" },
  { name: "Oscar Garcia", role: "…" },
  …
],
```

Only write what actually happened. The site will show it in the case-study header and in the credits.
