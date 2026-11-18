# Tipografías de los proyectos

Una carpeta por proyecto. Suelta dentro los archivos de fuente tal cual (`.woff2`, `.woff`, `.otf` o `.ttf`; si tienes `.woff2`, mejor: pesa menos).

- Un archivo por peso/estilo (p. ej. `Aquavit-Extrabold.otf`, `Aquavit-Semibold.otf`).
- No hace falta renombrarlos: si el nombre no deja claro el peso, dímelo.
- Cada carpeta tiene un `LEEME.txt` con las familias que documentan tus PDFs.

Cuando estén, avísame y las conecto: la familia de marca de cada proyecto pasa a ser la de sus títulos (la hoja de la pila, la portada del caso y "Siguiente proyecto") y su muestra en "Tipografía" se ve con la fuente real.

Licencias: al publicar la web, los archivos se sirven al navegador. Usa fuentes cuya licencia permita uso web (las de pago suelen necesitar licencia "webfont").

## Estado (17-11-2026)

| Proyecto | Fuente | Conectada como |
|---|---|---|
| Valhalla | Njord Alternate | nombre del proyecto (mayúsculas) + muestra |
| Cirquera | Aquavit Semibold / Extrabold | nombre (Extrabold) + títulos del caso + muestra |
| Be Star | Sparkling Valentine | nombre del proyecto + muestra |
| HOTRACE | Bebas Neue | nombre del proyecto (falta confirmar su papel en la revista) |
| Indómita | — | pendiente: RL Aqva, Alfarn 2, Bitter |
| Herb Lubalin | — | pendiente |

Dónde se conectan: `src/app/layout.tsx` (carga) y `theme.brand` / `theme.display` en `src/data/projects.ts`. Al cambiar la fuente del nombre hay que volver a medir `visual.fitEm`.
