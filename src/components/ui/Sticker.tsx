import type { CSSProperties } from "react";

type StickerProps = {
  text: string;
  tone?: "red" | "onRed";
  /** "logo" → geometric brand font (Anton) · "display" → bubbly Modak */
  font?: "logo" | "display";
  className?: string;
  style?: CSSProperties;
};

/**
 * Sticker headline — thick cream outline + slight per-letter rotation, the way
 * each letter reads like a peel-off sticker. Letters are individual spans so
 * Faza 3 can pop/wobble them one by one (targets: [data-letter]).
 */
export function Sticker({
  text,
  tone = "red",
  font = "logo",
  className = "",
  style,
}: StickerProps) {
  const words = text.split(" ");
  let idx = -1;
  const fontFamily =
    font === "logo" ? "var(--type-logo)" : "var(--type-display)";

  return (
    <span
      className={`sticker-text ${tone === "onRed" ? "on-red" : ""} inline-block ${className}`}
      style={{ fontFamily, ...style }}
    >
      {words.map((word, w) => (
        <span key={w} className="inline-block whitespace-nowrap">
          {[...word].map((ch) => {
            idx += 1;
            const rot = (idx % 2 === 0 ? 1 : -1) * (2 + (idx % 3));
            return (
              <span
                key={idx}
                data-letter
                className="inline-block"
                style={{ transform: `rotate(${rot}deg)` }}
              >
                {ch}
              </span>
            );
          })}
          {w < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </span>
  );
}

/** Small tilted orange sticker tag (the "SMASHED FRESH" wedge labels). */
export function StickerLabel({
  children,
  rotate = -4,
  className = "",
}: {
  children: React.ReactNode;
  rotate?: number;
  className?: string;
}) {
  return (
    <span
      className={`label inline-block bg-sticker-bg px-4 py-2 text-sticker-fg ${className}`}
      style={{
        transform: `rotate(${rotate}deg)`,
        border: "3px solid var(--outline-ink)",
        borderRadius: "var(--radius-pill)",
        boxShadow: "3px 3px 0 var(--outline-ink)",
      }}
    >
      {children}
    </span>
  );
}
