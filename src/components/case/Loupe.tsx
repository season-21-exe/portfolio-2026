"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { Media } from "@/data/types";
import { getAsset } from "@/components/ui/Picture";
import { ui } from "@/i18n/ui";
import { tx, type Locale } from "@/lib/i18n";

/**
 * LOUPE — opens an artwork at its full resolution so a spread can actually be
 * read. The trigger is the artwork itself; the viewer is a native modal
 * <dialog> (focus containment, Esc to close) with a pannable sheet: native
 * scroll and pinch on touch, drag to pan with a mouse.
 *
 * Children must be phrasing content (spans, <picture>) — they sit inside a <button>.
 */
export function Loupe({ media, label, children, locale = "es", className = "" }: { media: Media; label?: string; children: ReactNode; locale?: Locale; className?: string }) {
  const t = ui(locale);
  const dialog = useRef<HTMLDialogElement>(null);
  const sheet = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const a = getAsset(media.key);
  const full = a.widths[a.widths.length - 1];
  const alt = tx(media.alt, locale);

  // Mouse drag-to-pan (touch and trackpads already pan natively).
  useEffect(() => {
    const el = sheet.current;
    if (!el || !open) return;
    let x = 0, y = 0, left = 0, top = 0, dragging = false;
    const down = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      dragging = true;
      x = e.clientX;
      y = e.clientY;
      left = el.scrollLeft;
      top = el.scrollTop;
      el.setPointerCapture(e.pointerId);
      el.dataset.dragging = "";
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      el.scrollLeft = left - (e.clientX - x);
      el.scrollTop = top - (e.clientY - y);
    };
    const up = () => {
      dragging = false;
      delete el.dataset.dragging;
    };
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    return () => {
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        aria-label={`${t.zoom.open}: ${label ? `${label}. ` : ""}${alt}`}
        onClick={() => {
          setOpen(true);
          dialog.current?.showModal();
        }}
        className={`group relative block w-full cursor-zoom-in text-left ${className}`}
      >
        {children}
        <span aria-hidden className="t-label absolute right-3 top-3 flex items-center gap-2 bg-carbon px-2.5 py-1.5 text-paper transition-colors duration-300 group-hover:bg-signal group-hover:text-carbon group-focus-visible:bg-signal group-focus-visible:text-carbon">
          <span className="block h-2 w-2 border border-current" />
          {t.zoom.open}
        </span>
      </button>

      <dialog
        ref={dialog}
        aria-label={label ?? alt}
        onClose={() => setOpen(false)}
        className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none border-0 bg-carbon p-0 text-paper backdrop:bg-carbon/90"
      >
        <div className="flex h-full flex-col">
          <div className="pad-x flex h-14 shrink-0 items-center justify-between gap-6 border-b border-paper/15">
            <p className="t-label min-w-0 truncate">
              {label ? <span className="mr-3 text-signal">{label}</span> : null}
              <span className="text-grey-light">{t.zoom.hint}</span>
            </p>
            <button type="button" autoFocus onClick={() => dialog.current?.close()} className="t-label shrink-0 bg-paper px-3 py-2 text-carbon transition-colors hover:bg-signal focus-visible:bg-signal">
              {t.zoom.close} ✕
            </button>
          </div>
          <div ref={sheet} tabIndex={0} aria-label={t.zoom.hint} className="min-h-0 flex-1 cursor-grab overflow-auto overscroll-contain data-[dragging]:cursor-grabbing">
            {open ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={`${a.src}-${full}.webp`} width={a.width} height={a.height} alt={alt} draggable={false} className="mx-auto block h-auto max-w-none select-none" style={{ width: full }} />
            ) : null}
          </div>
        </div>
      </dialog>
    </>
  );
}
