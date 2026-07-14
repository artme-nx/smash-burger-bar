import { Link } from "@/i18n/navigation";
import { LogoMark } from "./LogoMark";

type Props = {
  variant?: "classic" | "signature";
  /** color context: on cream paper or on red/dark surface */
  tone?: "cream" | "red";
  className?: string;
  href?: string;
};

/**
 * Brand logo lockup — the SVG LogoMark (recreated burger + SMASH wordmark),
 * wrapped in a locale-aware home link.
 */
export function Wordmark({
  variant = "classic",
  tone = "cream",
  className = "",
  href = "/",
}: Props) {
  return (
    <Link href={href} aria-label="Smash Burger Bar" className="shrink-0">
      <LogoMark
        tone={tone}
        variant={variant}
        className={className}
        style={{ width: "84px", fontSize: "32px" }}
      />
    </Link>
  );
}
