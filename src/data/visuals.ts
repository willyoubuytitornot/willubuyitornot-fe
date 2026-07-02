import { GENRES } from "./games";
import type { CardArt, GenreKey } from "../types";

/** Build the layered gradient background for a game's artwork by genre + art style. */
export function artBg(genre: GenreKey, art: CardArt = "orbs"): string {
  const g = GENRES[genre];
  const base = `radial-gradient(125% 95% at 22% 2%, rgba(255,255,255,.30), rgba(255,255,255,0) 52%), linear-gradient(150deg, ${g.a}, ${g.b})`;
  let ov = "";
  if (art === "orbs") {
    ov = `radial-gradient(46% 46% at 82% 18%, ${g.glow}99, transparent 60%), radial-gradient(54% 54% at 10% 88%, ${g.glow}55, transparent 60%), `;
  } else if (art === "grid") {
    ov = `repeating-linear-gradient(0deg, rgba(255,255,255,.10) 0 1px, transparent 1px 30px), repeating-linear-gradient(90deg, rgba(255,255,255,.10) 0 1px, transparent 1px 30px), `;
  }
  return ov + base;
}

export function showGlyph(art: CardArt = "orbs"): boolean {
  return art === "glyph";
}

export function glyphOf(genre: GenreKey): string {
  return genre[0];
}

/** Sentiment bar color thresholds. */
export function sentColor(pct: number): string {
  return pct >= 75 ? "#46e08a" : pct >= 55 ? "#f5c451" : "#ff7a93";
}
