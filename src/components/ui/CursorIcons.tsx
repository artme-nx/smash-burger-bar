/**
 * Four flat-cartoon cursor icons (thick dark outline, two flat tones) that swap
 * as you move through the page — burger, fries, cola and a little Roman soldier
 * (a nod to Split / Diocletian's Palace). viewBox 0 0 48 48 each.
 */

const INK = "#4A1520";
const stroke = { stroke: INK, strokeWidth: 3, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };

export type CursorIconName = "burger" | "fries" | "cola" | "roman";
export const CURSOR_ICONS: CursorIconName[] = ["burger", "fries", "cola", "roman"];

export function CursorIcon({ name }: { name: CursorIconName }) {
  switch (name) {
    case "burger":
      return (
        <svg viewBox="0 0 48 48" width="100%" height="100%">
          <g {...stroke}>
            {/* top bun */}
            <path d="M8 20 C8 12 15 8 24 8 C33 8 40 12 40 20 C40 22 36 23 24 23 C12 23 8 22 8 20 Z" fill="#F0913F" />
            <circle cx="18" cy="15" r="1.4" fill="#FBE7C8" stroke="none" />
            <circle cx="26" cy="13" r="1.4" fill="#FBE7C8" stroke="none" />
            <circle cx="32" cy="16" r="1.4" fill="#FBE7C8" stroke="none" />
            {/* cheese */}
            <path d="M9 23 L39 23 L35 28 L30 24 L24 28 L18 24 L13 28 Z" fill="#F5C043" />
            {/* patty */}
            <rect x="8" y="26" width="32" height="7" rx="3.5" fill="#7E4526" />
            {/* bottom bun */}
            <path d="M9 33 L39 33 C41 33 42 35 42 37 C42 40 39 41 24 41 C9 41 6 40 6 37 C6 35 7 33 9 33 Z" fill="#F0913F" />
          </g>
        </svg>
      );
    case "fries":
      return (
        <svg viewBox="0 0 48 48" width="100%" height="100%">
          <g {...stroke}>
            {/* fries sticking out */}
            <rect x="14" y="8" width="4.4" height="20" rx="2" fill="#F5C043" transform="rotate(-8 16 18)" />
            <rect x="21" y="6" width="4.4" height="22" rx="2" fill="#F7CB55" />
            <rect x="28" y="9" width="4.4" height="19" rx="2" fill="#F5C043" transform="rotate(9 30 18)" />
            {/* carton */}
            <path d="M11 24 L37 24 L34 42 C34 43 33 43 32 43 L16 43 C15 43 14 43 14 42 Z" fill="#E4443A" />
            <path d="M17 30 L31 30" stroke="#FBF1E1" strokeWidth="2.4" />
          </g>
        </svg>
      );
    case "cola":
      return (
        <svg viewBox="0 0 48 48" width="100%" height="100%">
          <g {...stroke}>
            {/* straw */}
            <path d="M30 6 L26 22" stroke="#E4443A" strokeWidth="3.4" />
            {/* cup */}
            <path d="M13 14 L35 14 L32 42 C32 43 31 43 30 43 L18 43 C17 43 16 43 16 42 Z" fill="#E4443A" />
            {/* lid */}
            <rect x="11" y="10" width="26" height="6" rx="2.4" fill="#FBF1E1" />
            {/* band */}
            <path d="M15 24 L33 24" stroke="#FBF1E1" strokeWidth="2.6" />
          </g>
        </svg>
      );
    case "roman":
      return (
        <svg viewBox="0 0 48 48" width="100%" height="100%">
          <g {...stroke}>
            {/* red crest (perjanica) */}
            <path d="M20 4 C12 6 10 12 11 18 C14 15 17 14 20 14 C20 10 20 6 20 4 Z" fill="#D22B2B" />
            {/* helmet dome */}
            <path d="M15 30 C11 30 10 22 15 17 C19 13 27 13 31 17 C36 22 35 30 31 30 Z" fill="#C9CDD4" />
            {/* face opening */}
            <path d="M18 30 L18 38 C18 40 20 41 22 41 L26 41 C28 41 30 40 30 38 L30 30" fill="#F0913F" />
            {/* cheek/nose guard */}
            <path d="M24 30 L24 40" stroke={INK} strokeWidth="2.4" />
            <path d="M16 30 L32 30" stroke={INK} strokeWidth="2.6" />
          </g>
        </svg>
      );
  }
}
