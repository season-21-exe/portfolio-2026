"use client";

import { useEffect, useState } from "react";
import { ui } from "@/i18n/ui";
import type { Locale } from "@/lib/i18n";

/**
 * Reading aids for long case studies:
 *  - a hairline progress bar in the project accent (top of viewport)
 *  - a running head chip (bottom-left) naming the current section, which
 *    doubles as a jump menu. Native scrolling; nothing is hijacked.
 */
export function RunningHead({ sections, accent, locale = "es" }: { sections: { id: string; title: string }[]; accent: string; locale?: Locale }) {
  const t = ui(locale);
  const [progress, setProgress] = useState(0);
  const [current, setCurrent] = useState(-1);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(h > 0 ? window.scrollY / h : 0);
        // Above the first section (the hero) there is no current section.
        const first = document.getElementById(sections[0]?.id ?? "");
        if (first && first.getBoundingClientRect().top > window.innerHeight * 0.5) setCurrent(-1);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setCurrent(els.indexOf(e.target as HTMLElement));
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [sections]);

  return (
    <>
      <div
        role="progressbar"
        aria-label={t.case.progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress * 100)}
        className="fixed inset-x-0 top-0 z-[85] h-[3px] origin-left"
        style={{ background: accent, transform: `scaleX(${progress})` }}
      />
      <nav aria-label={t.case.contents} className={`fixed bottom-4 left-[var(--gutter)] z-[60] transition-[opacity,transform] duration-500 ${current >= 0 ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}>
        {open ? (
          <ol className="mb-1 max-h-[60svh] overflow-auto bg-carbon py-2 text-paper shadow-xl">
            {sections.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`} onClick={() => setOpen(false)} className={`t-meta flex gap-3 px-3 py-1.5 hover:bg-carbon-2 ${i === current ? "text-signal" : ""}`}>
                  <span className="t-slug w-5 tabular-nums opacity-60">{String(i + 1).padStart(2, "0")}</span>
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        ) : null}
        <button type="button" aria-expanded={open} onClick={() => setOpen((o) => !o)} className="t-slug flex items-center gap-3 bg-carbon px-3 py-2 text-paper">
          <span className="tabular-nums" style={{ color: accent === "#121212" ? "#ff3d17" : accent }}>
            {String(Math.max(current, 0) + 1).padStart(2, "0")}/{String(sections.length).padStart(2, "0")}
          </span>
          <span className="max-w-[46vw] truncate">{sections[Math.max(current, 0)]?.title}</span>
        </button>
      </nav>
    </>
  );
}
