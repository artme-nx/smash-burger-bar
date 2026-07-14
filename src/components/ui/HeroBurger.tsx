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
 */
export function HeroBurger({ className = "" }: { className?: string }) {
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

      {/* googly eyes — looking down at its own smash (coords include the 44px pad) */}
      <svg
        viewBox="0 0 1242 1026"
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        {/* left eye */}
        <ellipse cx="499" cy="194" rx="58" ry="66" fill="#fff" stroke="#4A1520" strokeWidth="9" />
        <circle cx="505" cy="220" r="24" fill="#4A1520" />
        <circle cx="499" cy="210" r="8" fill="#fff" />
        {/* right eye */}
        <ellipse cx="744" cy="184" rx="58" ry="66" fill="#fff" stroke="#4A1520" strokeWidth="9" />
        <circle cx="738" cy="210" r="24" fill="#4A1520" />
        <circle cx="732" cy="200" r="8" fill="#fff" />
      </svg>
    </div>
  );
}
