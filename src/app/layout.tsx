import type { Metadata, Viewport } from "next";
import { Archivo, Bricolage_Grotesque, IBM_Plex_Mono, Montserrat, Poppins } from "next/font/google";
import localFont from "next/font/local";
import { site } from "@/config/site";
import { tx } from "@/lib/i18n";
import { ui } from "@/i18n/ui";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

/** Site voice: one variable family — expanded for display, condensed for headings, text width for reading. */
const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo", display: "swap" });
/** Technical voice: numbers, labels, metadata. */
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-plex-mono", display: "swap" });

/** Project fonts — each case study speaks in its documented typeface. Not preloaded: they download only where used. */
const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage", display: "swap", preload: false });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat", display: "swap", preload: false });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-poppins", display: "swap", preload: false });

/**
 * Brand faces Iván supplied (src/fonts/<project>/). A single-style file is
 * declared across the whole weight range so the browser never fakes a bold.
 */
const njord = localFont({ src: [{ path: "../fonts/valhalla/njord-alternate.otf", weight: "100 900" }], variable: "--font-njord", display: "swap", preload: false });
const aquavit = localFont({
  src: [
    { path: "../fonts/cirquera/aquavit-semibold.otf", weight: "600" },
    { path: "../fonts/cirquera/aquavit-extrabold.otf", weight: "800" },
  ],
  variable: "--font-aquavit",
  display: "swap",
  preload: false,
});
const valentine = localFont({ src: [{ path: "../fonts/be-star/Sparkling Valentine.ttf", weight: "100 900" }], variable: "--font-valentine", display: "swap", preload: false });
const bebas = localFont({ src: [{ path: "../fonts/hotrace/BebasNeue.otf", weight: "100 900" }], variable: "--font-bebas", display: "swap", preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — ${tx(site.title)}`, template: `%s — ${site.shortName}` },
  description: tx(site.description),
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: site.name,
    title: `${site.name} — ${tx(site.title)}`,
    description: tx(site.description),
    images: [{ url: "/og/default.jpg", width: 1200, height: 630, alt: `${site.name}, diseñador gráfico` }],
  },
  twitter: { card: "summary_large_image", images: ["/og/default.jpg"] },
};

export const viewport: Viewport = {
  themeColor: "#1a1918",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const t = ui("es");
  return (
    <html lang="es" data-scroll-behavior="smooth" className={`${archivo.variable} ${plexMono.variable} ${bricolage.variable} ${montserrat.variable} ${poppins.variable} ${njord.variable} ${aquavit.variable} ${valentine.variable} ${bebas.variable}`}>
      <body id="top">
        <a href="#main" className="t-meta fixed left-3 top-3 z-[100] -translate-y-24 bg-signal px-3 py-2 text-carbon focus:translate-y-0">
          {t.skip}
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
