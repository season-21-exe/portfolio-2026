/**
 * Minimal i18n layer.
 *
 * Content fields are typed as `T`: a plain string is Spanish (the launch
 * language); an object can carry other locales. To add English later:
 *   1. turn the strings you translate into `{ es: "…", en: "…" }`
 *   2. add `en` to `ui.ts`
 *   3. add an `app/en/…` route tree that renders the same page components
 *      with `locale="en"` (see README → "Añadir inglés").
 * Untranslated fields fall back to Spanish, so a partial translation never breaks.
 */
export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

export type T = string | ({ es: string } & Partial<Record<Exclude<Locale, "es">, string>>);

export function tx(value: T | null | undefined, locale: Locale = defaultLocale): string {
  if (value == null) return "";
  if (typeof value === "string") return value;
  return value[locale] ?? value.es;
}
