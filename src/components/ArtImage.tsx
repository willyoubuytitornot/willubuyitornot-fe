import { artImg } from "../data/visuals";
import type { GenreKey } from "../types";

/**
 * Game artwork overlaid on the gradient art background.
 * Uses the real `src` (API imageUrl) when provided, falling back to the
 * per-genre local asset — also on a remote load error.
 * Absolutely fills its (position:relative) container; sits above the
 * gradient but below the dark legibility overlay and glyph.
 */
export default function ArtImage({
  genre,
  src,
}: {
  genre: GenreKey;
  src?: string;
}) {
  const fallback = artImg(genre);
  return (
    <img
      src={src || fallback}
      alt=""
      onError={(e) => {
        if (e.currentTarget.src !== fallback) e.currentTarget.src = fallback;
      }}
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
