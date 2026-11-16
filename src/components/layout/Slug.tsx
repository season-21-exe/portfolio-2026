"use client";

import { useEffect, useState } from "react";
import { site } from "@/config/site";

/**
 * InDesign slug line — "file.indd  folio  date time" — set in the
 * condensed width. Shows the visitor's local time, like a proof printed now.
 */
export function Slug({ folio, className = "", note }: { folio: string | number; className?: string; note?: string }) {
  const [stamp, setStamp] = useState("");
  useEffect(() => {
    const f = () => {
      const d = new Date();
      const p = (n: number) => String(n).padStart(2, "0");
      setStamp(`${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()}  ${p(d.getHours())}:${p(d.getMinutes())}`);
    };
    f();
    const id = window.setInterval(f, 30_000);
    return () => window.clearInterval(id);
  }, []);
  return (
    <p aria-hidden className={`t-slug flex flex-wrap items-baseline gap-x-6 gap-y-1 opacity-70 ${className}`}>
      <span>{site.slugFile}</span>
      <span>{folio}</span>
      <span className="min-w-[8.5rem] tabular-nums">{stamp}</span>
      {note ? <span>{note}</span> : null}
    </p>
  );
}
