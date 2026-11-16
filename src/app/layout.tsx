import type { Metadata, Viewport } from "next";
import { Archivo, Bricolage_Grotesque, Montserrat, Poppins } from "next/font/google";
import { site } from "@/config/site";
import { tx } from "@/lib/i18n";
import { ui } from "@/i18n/ui";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

/** Site voice: one variable family, three widths. */
const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo", display: "swap" });

/** Project fonts — each case study speaks in its documented typeface. Not preloaded: they download only where used. */
const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage", display: "swap", preload: false });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat", display: "swap", preload: false });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-poppins", display: "swap", preload: false });

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
    <html lang="es" data-scroll-behavior="smooth" className={`${archivo.variable} ${bricolage.variable} ${montserrat.variable} ${poppins.variable}`}>
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
