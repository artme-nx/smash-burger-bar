import { CARTOON as C } from "@/lib/cartoon";

type Props = {
  className?: string;
  /** Accessible label; empty string → decorative (aria-hidden). */
  title?: string;
};

/**
 * Hand-drawn flat-vector burger — original artwork, thick dark outline, two flat
 * tones per element. Our smash burgers are DOUBLE: two thin smashed patties with
 * a slice of cheese melting between them. Seven layers, each an isolated
 * <g data-layer> so the preloader / "Every Layer" sequence can drop + stack them
 * individually. DOM order (paint order) bottom-of-stack → top:
 *   bun-bottom · patty-1 · cheese · patty-2 · tomato · lettuce · bun-top
 * viewBox 0 0 400 340, centred on x=200.
 */
export function CartoonBurger({ className = "", title = "" }: Props) {
  const decorative = title === "";
  return (
    <svg
      viewBox="0 0 400 340"
      className={className}
      role={decorative ? "presentation" : "img"}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        stroke={C.outline}
        strokeWidth={7}
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        {/* ---- BOTTOM BUN ---- */}
        <g data-layer="bun-bottom" className="burger-layer">
          <path
            d="M74 268 C74 262 90 260 200 260 C310 260 326 262 326 268 L326 280 C326 300 300 310 200 310 C100 310 74 300 74 280 Z"
            fill={C.bun}
          />
          <path
            d="M80 288 C120 306 280 306 320 288 C316 302 280 310 200 310 C120 310 84 302 80 288 Z"
            fill={C.bunShadow}
            stroke="none"
          />
        </g>

        {/* ---- PATTY 1 (lower, smashed) ---- */}
        <g data-layer="patty-1" className="burger-layer">
          <path
            d="M70 257 C70 248 84 244 104 244 L296 244 C316 244 330 248 330 257 C330 266 314 270 296 270 L104 270 C86 270 70 266 70 257 Z"
            fill={C.patty}
          />
          <path
            d="M84 263 C130 272 270 272 316 263 C312 268 300 270 296 270 L104 270 C100 270 88 268 84 263 Z"
            fill={C.pattyShadow}
            stroke="none"
          />
        </g>

        {/* ---- CHEESE (slab melting between the two patties) ---- */}
        <g data-layer="cheese" className="burger-layer">
          <path
            d="M80 224 L320 220 L322 234
               C302 234 300 250 280 242
               C262 235 252 250 232 243
               C214 236 200 250 180 243
               C160 236 152 250 132 243
               C112 236 100 246 82 238 Z"
            fill={C.cheese}
          />
          <path
            d="M82 232 C150 240 250 240 320 228 L321 232 C250 242 150 242 82 236 Z"
            fill={C.cheeseShadow}
            stroke="none"
          />
        </g>

        {/* ---- PATTY 2 (upper, smashed) ---- */}
        <g data-layer="patty-2" className="burger-layer">
          <path
            d="M70 219 C70 210 84 206 104 206 L296 206 C316 206 330 210 330 219 C330 228 314 232 296 232 L104 232 C86 232 70 228 70 219 Z"
            fill={C.patty}
          />
          <path
            d="M84 225 C130 234 270 234 316 225 C312 230 300 232 296 232 L104 232 C100 232 88 230 84 225 Z"
            fill={C.pattyShadow}
            stroke="none"
          />
        </g>

        {/* ---- TOMATO ---- */}
        <g data-layer="tomato" className="burger-layer">
          <rect x="84" y="182" width="232" height="26" rx="13" fill={C.tomato} />
          <path
            d="M96 197 L304 197 C304 203 298 208 290 208 L110 208 C102 208 96 203 96 197 Z"
            fill={C.tomatoShadow}
            stroke="none"
          />
        </g>

        {/* ---- LETTUCE (wavy frill) ---- */}
        <g data-layer="lettuce" className="burger-layer">
          <path
            d="M58 168 C52 160 56 150 64 150 L336 150 C344 150 348 160 342 168
               Q332 182 320 170 Q308 184 296 170 Q284 184 272 170 Q260 184 248 170
               Q236 184 224 170 Q212 184 200 170 Q188 184 176 170 Q164 184 152 170
               Q140 184 128 170 Q116 184 104 170 Q92 184 80 170 Q68 182 58 168 Z"
            fill={C.lettuce}
          />
          <path
            d="M70 166 Q200 178 330 166 Q332 168 330 172 Q200 182 70 172 Q68 168 70 166 Z"
            fill={C.lettuceShadow}
            stroke="none"
          />
        </g>

        {/* ---- TOP BUN (dome + sesame) ---- */}
        <g data-layer="bun-top" className="burger-layer">
          <path
            d="M72 150 C72 82 120 46 200 46 C280 46 328 82 328 150 C328 162 300 166 200 166 C100 166 72 162 72 150 Z"
            fill={C.bun}
          />
          <path
            d="M76 152 C110 164 290 164 324 152 C324 160 300 166 200 166 C100 166 76 160 76 152 Z"
            fill={C.bunShadow}
            stroke="none"
          />
          <ellipse
            cx="150"
            cy="90"
            rx="46"
            ry="22"
            fill={C.bunHi}
            stroke="none"
            transform="rotate(-14 150 90)"
          />
          {/* sesame seeds */}
          <g fill={C.seed} strokeWidth={2.4}>
            <ellipse cx="172" cy="98" rx="6.5" ry="3.4" transform="rotate(24 172 98)" />
            <ellipse cx="210" cy="84" rx="6.5" ry="3.4" transform="rotate(-12 210 84)" />
            <ellipse cx="246" cy="100" rx="6.5" ry="3.4" transform="rotate(30 246 100)" />
            <ellipse cx="150" cy="122" rx="6.5" ry="3.4" transform="rotate(-8 150 122)" />
            <ellipse cx="256" cy="128" rx="6.5" ry="3.4" transform="rotate(16 256 128)" />
            <ellipse cx="202" cy="114" rx="6.5" ry="3.4" transform="rotate(-22 202 114)" />
          </g>
        </g>
      </g>
    </svg>
  );
}
