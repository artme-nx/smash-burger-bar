import type { CSSProperties } from "react";

type Tone = "cream" | "red";
type Props = {
  /** color context: on cream paper (red buns) or on red surface (cream buns) */
  tone?: Tone;
  variant?: "classic" | "signature";
  className?: string;
  style?: CSSProperties;
  showSubLabel?: boolean;
};

/**
 * Faithful SVG recreation of the printed SMASH logo: a burger silhouette
 * (sesame dome + drip base) with the SMASH wordmark as the filling. Transparent,
 * scalable, theme-adaptive — no white card frame like the raster asset.
 */
export function LogoMark({
  tone = "cream",
  variant = "classic",
  className = "",
  style,
  showSubLabel = true,
}: Props) {
  const bun = tone === "red" ? "var(--on-red)" : "var(--primary)";
  const seed = tone === "red" ? "var(--surface-red)" : "var(--background)";
  const smash = tone === "red" ? "var(--on-red)" : "var(--foreground)";
  const sub =
    variant === "signature"
      ? "var(--signature)"
      : tone === "red"
        ? "var(--on-red)"
        : "var(--primary)";

  return (
    <span
      className={`inline-flex flex-col items-center leading-none ${className}`}
      style={style}
    >
      {/* top bun — sesame dome */}
      <svg
        viewBox="0 0 120 42"
        className="w-full"
        role="presentation"
        aria-hidden="true"
      >
        <path
          d="M4 40 C4 18 28 6 60 6 C92 6 116 18 116 40 C116 42 108 42 60 42 C12 42 4 42 4 40 Z"
          fill={bun}
        />
        <g fill={seed}>
          <circle cx="45" cy="24" r="3.1" />
          <circle cx="60" cy="19" r="3.1" />
          <circle cx="75" cy="24" r="3.1" />
          <circle cx="52" cy="31" r="3.1" />
          <circle cx="68" cy="31" r="3.1" />
          <circle cx="60" cy="27" r="3.1" />
        </g>
      </svg>

      {/* SMASH filling */}
      <span
        className="uppercase"
        style={{
          fontFamily: "var(--type-logo)",
          color: smash,
          letterSpacing: "0.08em",
          fontSize: "0.62em",
          margin: "0.06em 0",
        }}
      >
        Smash
      </span>

      {/* bottom bun — with ketchup drip */}
      <svg
        viewBox="0 0 120 40"
        className="w-full"
        role="presentation"
        aria-hidden="true"
      >
        <path
          d="M8 8 C8 3 14 1 60 1 C106 1 112 3 112 8 L112 20 C112 29 104 33 60 33 C16 33 8 29 8 20 Z"
          fill={bun}
        />
        <path
          d="M31 30 L31 37 C31 42 45 42 45 37 L45 30 Z"
          fill={bun}
        />
      </svg>

      {showSubLabel && (
        <span
          className="label mt-1"
          style={{ color: sub, fontSize: "0.34em", letterSpacing: "0.3em" }}
        >
          {variant === "signature" ? "Signature" : "Burger Bar"}
        </span>
      )}
    </span>
  );
}
