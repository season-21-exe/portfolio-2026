import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/data/projects";
import { tx } from "@/lib/i18n";
import { site } from "@/config/site";
import { CaseStudy } from "@/components/case/CaseStudy";
import { PageSheet } from "@/components/motion/PageSheet";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  const title = `${p.title} — ${p.disciplines.slice(0, 2).map((d) => tx(d)).join(" y ")}`;
  return {
    title,
    description: tx(p.summary),
    alternates: { canonical: `/projects/${p.slug}/` },
    openGraph: {
      type: "article",
      title: `${p.title} — ${site.shortName}`,
      description: tx(p.summary),
      images: [{ url: `/og/${p.slug}.jpg`, width: 1200, height: 630, alt: tx(p.cover.alt) }],
    },
    twitter: { card: "summary_large_image", images: [`/og/${p.slug}.jpg`] },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: p.title,
    description: tx(p.summary),
    creator: p.team?.length ? p.team.map((m) => ({ "@type": "Person", name: m.name })) : { "@type": "Person", name: site.name },
    image: `${site.url}/og/${p.slug}.jpg`,
    url: `${site.url}/projects/${p.slug}/`,
    inLanguage: "es",
  };
  return (
    <PageSheet>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CaseStudy p={p} />
    </PageSheet>
  );
}
