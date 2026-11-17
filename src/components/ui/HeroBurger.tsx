"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import burgerImg from "../../../public/img/hero-burger.webp";

/**
 * Hero "mascot" — the real double-smash photo (background cut out) dressed up as
 * a character with googly eyes, in the spirit of the reference poster. The white
 * sticker outline + soft drop shadow are BAKED into the WebP (44px transparent
 * pad around the art) instead of a runtime CSS filter — a 9-layer drop-shadow
 * stack on a large image was an expensive repaint on scroll. The eyes SVG uses
 * the padded image's pixel space (viewBox 0 0 1242 1026) so they stay pinned to
 * the bun at any size.
 *
 * On devices with a real mouse (`pointer: fine`) the pupils follow the cursor,
 * clamped inside the eye white. Touch devices keep the resting "looking down" pose.
 */

const VB_W = 1242;
const VB_H = 1026;

// eye centres (viewBox units) + resting pupil offset (looking down at the smash)
const EYES = [
  { cx: 499, cy: 194, restX: 6, restY: 26 },
  { cx: 744, cy: 184, restX: -6, restY: 26 },
] as const;

const RX = 58;
const RY = 66;
const PUPIL_R = 24;
const EDGE = 6; // keep a sliver of white between pupil and outline
const MAX_X = RX - PUPIL_R - EDGE;
const MAX_Y = RY - PUPIL_R - EDGE;
// cursor distance (px) at which the pupil reaches the edge of the eye
const REACH_PX = 220;

export function HeroBurger({ className = "" }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pupilRefs = useRef<(SVGGElement | null)[]>([]);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const current = EYES.map((e): { x: number; y: number } => ({ x: e.restX, y: e.restY }));
    const target = EYES.map((e): { x: number; y: number } => ({ x: e.restX, y: e.restY }));
    let raf = 0;

    const apply = () => {
      pupilRefs.current.forEach((g, i) => {
        g?.setAttribute(
          "transform",
          `translate(${current[i].x.toFixed(2)} ${current[i].y.toFixed(2)})`,
        );
      });
    };

    const tick = () => {
      let moving = false;
      for (let i = 0; i < EYES.length; i++) {
        const k = reduced ? 1 : 0.18;
        current[i].x += (target[i].x - current[i].x) * k;
        current[i].y += (target[i].y - current[i].y) * k;
        if (
          Math.abs(target[i].x - current[i].x) > 0.1 ||
          Math.abs(target[i].y - current[i].y) > 0.1
        ) {
          moving = true;
        }
      }
      apply();
      raf = moving ? requestAnimationFrame(tick) : 0;
    };

    const onMove = (ev: PointerEvent) => {
      if (ev.pointerType !== "mouse") return;
      const rect = svg.getBoundingClientRect();
      if (rect.width === 0) return;
      const sx = rect.width / VB_W;
      const sy = rect.height / VB_H;

      EYES.forEach((e, i) => {
        const ex = rect.left + e.cx * sx;
        const ey = rect.top + e.cy * sy;
        const dx = ev.clientX - ex;
        const dy = ev.clientY - ey;
        const dist = Math.hypot(dx, dy) || 1;
        const strength = Math.min(dist / REACH_PX, 1);
        let ox = (dx / dist) * MAX_X * strength;
        let oy = (dy / dist) * MAX_Y * strength;
        // clamp inside the ellipse
        const n = (ox / MAX_X) ** 2 + (oy / MAX_Y) ** 2;
        if (n > 1) {
          const s = 1 / Math.sqrt(n);
          ox *= s;
          oy *= s;
        }
        target[i].x = ox;
        target[i].y = oy;
      });

      if (!raf) raf = requestAnimationFrame(tick);
    };

    // cursor leaves the window → back to the resting pose
    const onLeave = () => {
      EYES.forEach((e, i) => {
        target[i].x = e.restX;
        target[i].y = e.restY;
      });
      if (!raf) raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      <Image
        src={burgerImg}
        alt="Smash Burger Bar — dvostruki smash burger sa slaninom"
        priority
        sizes="(max-width: 640px) 56vw, 34vw"
        draggable={false}
        className="h-auto w-full select-none"
      />

      {/* googly eyes — resting pose looks down at its own smash (coords include the 44px pad) */}
      <svg
        ref={svgRef}
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        {EYES.map((e, i) => (
          <g key={i}>
            <ellipse cx={e.cx} cy={e.cy} rx={RX} ry={RY} fill="#fff" stroke="#4A1520" strokeWidth="9" />
            <g
              ref={(el) => {
                pupilRefs.current[i] = el;
              }}
              transform={`translate(${e.restX} ${e.restY})`}
            >
              <circle cx={e.cx} cy={e.cy} r={PUPIL_R} fill="#4A1520" />
              <circle cx={e.cx - 6} cy={e.cy - 10} r="8" fill="#fff" />
            </g>
          </g>
        ))}
      </svg>
    </div>
  );
}
