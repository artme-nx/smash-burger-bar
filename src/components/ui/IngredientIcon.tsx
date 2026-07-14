import { CARTOON as C } from "@/lib/cartoon";

export type IngredientKind =
  | "bun"
  | "patty"
  | "cheese"
  | "tomato"
  | "lettuce";

type Props = { kind: IngredientKind; className?: string };

/**
 * Standalone cartoon ingredient illustrations — original flat-vector art in the
 * same thick-outline style as the burger. Used on the Sastojci cards.
 */
export function IngredientIcon({ kind, className = "" }: Props) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role="presentation"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke={C.outline} strokeWidth={4.5} strokeLinejoin="round" strokeLinecap="round">
        {kind === "bun" && (
          <>
            <path d="M12 62 C12 34 30 22 50 22 C70 22 88 34 88 62 C88 70 74 74 50 74 C26 74 12 70 12 62 Z" fill={C.bun} />
            <path d="M16 64 C34 72 66 72 84 64 C84 70 72 74 50 74 C28 74 16 70 16 64 Z" fill={C.bunShadow} stroke="none" />
            <ellipse cx="34" cy="40" rx="16" ry="8" fill={C.bunHi} stroke="none" transform="rotate(-16 34 40)" />
            <g fill={C.seed} strokeWidth={1.6}>
              <ellipse cx="44" cy="46" rx="3.4" ry="1.8" transform="rotate(20 44 46)" />
              <ellipse cx="60" cy="42" rx="3.4" ry="1.8" transform="rotate(-10 60 42)" />
              <ellipse cx="52" cy="54" rx="3.4" ry="1.8" transform="rotate(14 52 54)" />
            </g>
          </>
        )}

        {kind === "patty" && (
          <>
            <ellipse cx="50" cy="54" rx="40" ry="24" fill={C.patty} />
            <path d="M14 58 C30 72 70 72 86 58 C84 68 70 74 50 74 C30 74 16 68 14 58 Z" fill={C.pattyShadow} stroke="none" />
            <g fill={C.pattyShadow} stroke="none">
              <circle cx="38" cy="48" r="2.4" />
              <circle cx="58" cy="46" r="2.4" />
              <circle cx="66" cy="56" r="2.4" />
            </g>
          </>
        )}

        {kind === "cheese" && (
          <g transform="rotate(-6 50 50)">
            <path d="M16 30 L84 30 L84 62 C72 62 72 76 60 68 C48 60 40 74 28 66 C20 60 16 64 16 60 Z" fill={C.cheese} />
            <path d="M16 56 C40 64 60 64 84 54 L84 62 C72 62 72 76 60 68 C48 60 40 74 28 66 C20 60 16 64 16 60 Z" fill={C.cheeseShadow} stroke="none" />
            <g fill={C.cheeseShadow} stroke="none">
              <circle cx="34" cy="42" r="3" />
              <circle cx="58" cy="40" r="3.6" />
              <circle cx="70" cy="50" r="2.6" />
            </g>
          </g>
        )}

        {kind === "tomato" && (
          <>
            <circle cx="50" cy="50" r="36" fill={C.tomato} />
            <circle cx="50" cy="50" r="25" fill="#F0736A" stroke="none" />
            <g fill={C.tomato} stroke="none">
              <ellipse cx="50" cy="34" rx="3" ry="5" />
              <ellipse cx="66" cy="50" rx="5" ry="3" />
              <ellipse cx="50" cy="66" rx="3" ry="5" />
              <ellipse cx="34" cy="50" rx="5" ry="3" />
            </g>
            <circle cx="50" cy="50" r="6" fill="#F7A79E" stroke="none" />
          </>
        )}

        {kind === "lettuce" && (
          <>
            <path d="M18 54 Q10 40 24 36 Q22 22 38 28 Q46 16 56 26 Q72 20 74 36 Q90 38 82 54 Q90 68 74 70 Q70 84 54 76 Q46 86 36 76 Q20 82 18 68 Q8 62 18 54 Z" fill={C.lettuce} />
            <path d="M50 34 Q40 50 30 58 M50 34 Q58 50 70 56 M50 34 L50 72" fill="none" stroke={C.lettuceShadow} strokeWidth={3} />
          </>
        )}
      </g>
    </svg>
  );
}
