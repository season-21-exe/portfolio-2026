import { Hero } from "@/components/home/Hero";
import { ProjectIndex } from "@/components/home/ProjectIndex";
import { About } from "@/components/home/About";
import { ContactSection } from "@/components/home/ContactSection";
import { site } from "@/config/site";
import { PageSheet } from "@/components/motion/PageSheet";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: "Diseñador gráfico",
    address: { "@type": "PostalAddress", addressLocality: "Barcelona", addressCountry: "ES" },
    alumniOf: { "@type": "EducationalOrganization", name: "Escola del Treball de Barcelona" },
    url: site.url,
    sameAs: [site.socials.instagram?.url].filter(Boolean),
  };
  return (
    <PageSheet>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <ProjectIndex />
      <About />
      <ContactSection />
    </PageSheet>
  );
}
