import { artImg } from "../data/visuals";
import type { GenreKey } from "../types";

/**
 * Per-genre artwork overlaid on the gradient art background.
 * Absolutely fills its (position:relative) container; sits above the
 * gradient but below the dark legibility overlay and glyph.
 */
export default function ArtImage({ genre }: { genre: GenreKey }) {
  return (
    <img
      src={artImg(genre)}
      alt=""
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
    />
  );
}
