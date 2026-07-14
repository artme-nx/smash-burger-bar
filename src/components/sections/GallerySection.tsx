"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { StickerLabel } from "@/components/ui/Sticker";
import g1 from "../../../public/img/galerija/g1.webp";
import g2 from "../../../public/img/galerija/g2.webp";
import g3 from "../../../public/img/galerija/g3.webp";
import g4 from "../../../public/img/galerija/g4.webp";
import g5 from "../../../public/img/galerija/g5.webp";
import g6 from "../../../public/img/galerija/g6.webp";
import g7 from "../../../public/img/galerija/g7.webp";
import g8 from "../../../public/img/galerija/g8.webp";

/**
 * Split-flap flip gallery (adapted from a 21st.dev component) restyled to the
 * brand. Manual prev/next + gentle autoplay (pauses on hover/focus). Under
 * reduced motion it swaps images without the flip. Image URLs come from static
 * imports so basePath is handled in production.
 */
const IMAGES = [
  { src: g1.src, title: "Dupli smash" },
  { src: g2.src, title: "Cheddar na plancu" },
  { src: g3.src, title: "Smash u srcu Splita" },
  { src: g4.src, title: "Slanina & cheddar" },
  { src: g5.src, title: "Slaganje na plancu" },
  { src: g6.src, title: "Smash & Dioklecijan" },
  { src: g7.src, title: "Svježe mljeveno" },
  { src: g8.src, title: "SMASH SMASH SMASH" },
];

const FLIP_SPEED = 700;
const timing: KeyframeAnimationOptions = { duration: FLIP_SPEED, iterations: 1 };

const flipTop = [{ transform: "rotateX(0)" }, { transform: "rotateX(-90deg)" }, { transform: "rotateX(-90deg)" }];
const flipBottom = [{ transform: "rotateX(90deg)" }, { transform: "rotateX(90deg)" }, { transform: "rotateX(0)" }];
const flipTopRev = [{ transform: "rotateX(-90deg)" }, { transform: "rotateX(-90deg)" }, { transform: "rotateX(0)" }];
const flipBottomRev = [{ transform: "rotateX(0)" }, { transform: "rotateX(90deg)" }, { transform: "rotateX(90deg)" }];

export function GallerySection() {
  const t = useTranslations("home.gallery");
  const galleryRef = useRef<HTMLDivElement>(null);
  const unitesRef = useRef<HTMLElement[]>([]);
  const indexRef = useRef(0);
  const hoverRef = useRef(false);
  const [index, setIndex] = useState(0);

  const setImg = (el: HTMLElement, i: number) => {
    el.style.backgroundImage = `url('${IMAGES[i].src}')`;
  };
  const setTitle = (i: number) => {
    const g = galleryRef.current;
    if (!g) return;
    g.setAttribute("data-title", IMAGES[i].title);
    g.style.setProperty("--title-y", "0");
    g.style.setProperty("--title-opacity", "1");
  };

  useEffect(() => {
    const g = galleryRef.current;
    if (!g) return;
    unitesRef.current = Array.from(g.querySelectorAll<HTMLElement>(".unite"));
    unitesRef.current.forEach((el) => setImg(el, 0));
    setTitle(0);
  }, []);

  const go = (inc: number) => {
    const g = galleryRef.current;
    if (!g) return;
    const cur = indexRef.current;
    const next = (cur + inc + IMAGES.length) % IMAGES.length;
    const reverse = inc < 0;
    indexRef.current = next;
    setIndex(next);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      unitesRef.current.forEach((el) => setImg(el, next));
      setTitle(next);
      return;
    }

    g.querySelector<HTMLElement>(".overlay-top")?.animate(reverse ? flipTopRev : flipTop, timing);
    g.querySelector<HTMLElement>(".overlay-bottom")?.animate(reverse ? flipBottomRev : flipBottom, timing);

    // hide title while it flips
    g.style.setProperty("--title-y", "-1rem");
    g.style.setProperty("--title-opacity", "0");
    g.setAttribute("data-title", "");

    // swap the "flap" halves late so the fold looks continuous
    unitesRef.current.forEach((el, idx) => {
      const late =
        (reverse && idx !== 1 && idx !== 2) || (!reverse && (idx === 1 || idx === 2));
      window.setTimeout(() => setImg(el, next), late ? FLIP_SPEED - 200 : 0);
    });
    window.setTimeout(() => setTitle(next), FLIP_SPEED * 0.5);
  };

  // gentle autoplay, paused while hovered/focused or tab hidden
  useEffect(() => {
    const id = window.setInterval(() => {
      if (!hoverRef.current && !document.hidden) go(1);
    }, 4500);
    return () => window.clearInterval(id);
    // go() is stable (reads refs, not stale state) — intentional empty deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="bg-background-alt py-24 sm:py-32">
      <div className="container-wide flex flex-col items-center text-center">
        <StickerLabel rotate={-3} className="mb-6">
          {t("kicker")}
        </StickerLabel>
        <h2
          className="display mb-12 text-primary"
          style={{ fontSize: "var(--type-display2-size)" }}
        >
          {t("title")}
        </h2>

        <div
          className="relative"
          onMouseEnter={() => (hoverRef.current = true)}
          onMouseLeave={() => (hoverRef.current = false)}
          onFocusCapture={() => (hoverRef.current = true)}
          onBlurCapture={() => (hoverRef.current = false)}
        >
          {/* cartoon frame */}
          <div className="card-cartoon p-3">
            <div id="flip-gallery" ref={galleryRef} className="relative text-center">
              <div className="top unite bg-cover bg-no-repeat" />
              <div className="bottom unite bg-cover bg-no-repeat" />
              <div className="overlay-top unite bg-cover bg-no-repeat" />
              <div className="overlay-bottom unite bg-cover bg-no-repeat" />
            </div>
          </div>

          {/* nav */}
          <div className="mt-16 flex items-center justify-center gap-4">
            <NavButton dir="prev" onClick={() => go(-1)} label="Prethodna" />
            <span className="label text-[0.8rem] text-muted-foreground">
              {index + 1} / {IMAGES.length}
            </span>
            <NavButton dir="next" onClick={() => go(1)} label="Sljedeća" />
          </div>
        </div>
      </div>

      <style>{`
        #flip-gallery {
          --gw: 300px;
          --gh: 430px;
          width: var(--gw);
          height: var(--gh);
          perspective: 900px;
        }
        @media (min-width: 640px) {
          #flip-gallery { --gw: 380px; --gh: 545px; }
        }
        #flip-gallery::after {
          content: '';
          position: absolute;
          background-color: var(--outline-ink);
          width: 100%;
          height: 4px;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          z-index: 5;
        }
        #flip-gallery::before {
          content: attr(data-title);
          color: var(--foreground);
          font-family: var(--type-logo);
          letter-spacing: 0.04em;
          text-transform: uppercase;
          font-size: 1rem;
          width: 100%;
          left: 0;
          position: absolute;
          top: calc(100% + 1.5rem);
          line-height: 2;
          opacity: var(--title-opacity, 0);
          transform: translateY(var(--title-y, 0));
          transition: opacity 500ms ease-in-out, transform 500ms ease-in-out;
        }
        #flip-gallery > * {
          position: absolute;
          width: 100%;
          height: 50%;
          overflow: hidden;
          background-size: var(--gw) var(--gh);
        }
        .top, .overlay-top { top: 0; transform-origin: bottom; background-position: top; }
        .bottom, .overlay-bottom { bottom: 0; transform-origin: top; background-position: bottom; }
      `}</style>
    </section>
  );
}

function NavButton({
  dir,
  onClick,
  label,
}: {
  dir: "prev" | "next";
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-12 w-12 items-center justify-center bg-surface text-foreground transition-transform duration-200 hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground"
      style={{
        border: "3px solid var(--outline-ink)",
        borderRadius: "var(--radius-pill)",
        boxShadow: "3px 3px 0 var(--outline-ink)",
      }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {dir === "prev" ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
      </svg>
    </button>
  );
}
