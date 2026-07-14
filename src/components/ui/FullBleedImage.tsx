import Image, { type StaticImageData } from "next/image";
import { CartoonBurger } from "./CartoonBurger";

type Props = {
  /** Static-imported photo. Omit → placeholder (cream + centered burger). */
  src?: StaticImageData;
  alt?: string;
  /** object-position for the cover crop (e.g. "center 66%"). */
  focus?: string;
};

/**
 * Full-bleed 16:9 banner, edge to edge (100vw). The photo fills the frame with
 * object-cover; `focus` steers the crop so the subject stays in view. Lazy by
 * default (below the fold). Falls back to a flat-cream placeholder + cartoon
 * burger when no photo is provided.
 */
export function FullBleedImage({ src, alt = "", focus = "center" }: Props) {
  return (
    <section className="w-full">
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-background-alt">
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: focus }}
          />
        ) : (
          // PLACEHOLDER: zamijeni s pravom full-bleed slikom (16:9)
          <div className="flex h-full w-full items-center justify-center">
            <CartoonBurger className="w-[26%] min-w-[150px] max-w-[300px]" />
          </div>
        )}
      </div>
    </section>
  );
}
