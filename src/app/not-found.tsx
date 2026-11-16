import Link from "next/link";
import { ui } from "@/i18n/ui";
import { RegMark } from "@/components/print/PrintMarks";

export default function NotFound() {
  const t = ui("es").notFound;
  return (
    <section className="surface-paper flex min-h-[80svh] flex-col justify-end pad-x pb-16 pt-32">
      <RegMark size={48} className="mb-8 text-signal" />
      <h1 className="t-display text-[clamp(3rem,12vw,11rem)]">404</h1>
      <p className="t-headline mt-4 text-[clamp(1.6rem,3vw,2.6rem)]">{t.title}</p>
      <p className="t-body mt-3 text-grey-ink">{t.body}</p>
      <Link href="/" className="t-meta link-ink mt-8 w-fit">
        {t.cta}
      </Link>
    </section>
  );
}
