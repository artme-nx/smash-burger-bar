/**
 * Hover-roll text — the visible copy rolls up while a duplicate rolls in from
 * below. The duplicate is aria-hidden so it isn't read twice.
 *
 * The *clipping* (overflow + fixed one-line box + the duplicate parked below)
 * lives in INLINE styles, not only in globals.css. That way, if the stylesheet
 * fails to load or apply on a client-side route change (the classic
 * "PočetnaPočetna" duplicate-text bug), the second copy is still clipped out of
 * view — the HTML alone can't render both. The `.roll*` classes only carry the
 * hover *transition*, which is a pure enhancement.
 */
export function RollText({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  return (
    <span
      className={`roll ${className}`}
      style={{
        position: "relative",
        display: "inline-block",
        overflow: "hidden",
        verticalAlign: "bottom",
      }}
    >
      <span className="roll-a" style={{ display: "block" }}>
        {children}
      </span>
      <span
        className="roll-b"
        aria-hidden="true"
        style={{
          display: "block",
          position: "absolute",
          left: 0,
          top: 0,
          // NOTE: base translateY(100%) + hover swap come from CSS on purpose —
          // setting transform inline would out-specify the :hover rule and kill
          // the animation. Without CSS, roll-b just overlaps roll-a (one copy,
          // never a "PočetnaPočetna" duplicate), which is the safe fallback.
        }}
      >
        {children}
      </span>
    </span>
  );
}
