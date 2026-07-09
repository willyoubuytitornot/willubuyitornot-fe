import { GENRES } from "./games";
import { artBg, glyphOf, sentColor, showGlyph } from "./visuals";
import type { CardArt, Game, GameInsight } from "../types";

export interface SentimentView {
  label: string;
  pct: number;
  width: string;
  color: string;
}

export interface GameView extends Game, GameInsight {
  artBg: string;
  glyph: string;
  hasGlyph: boolean;
  gtag: string;
  ratingStr: string;
  reviewsStr: string;
  negative: number;
  posWidth: string;
  sentimentsView: SentimentView[];
}

/** Merge a game's card data with its fetched insight into the derived display
 *  fields used by the detail views. */
export function enrichGame(
  game: Game,
  insight: GameInsight,
  cardArt: CardArt,
): GameView {
  return {
    ...game,
    ...insight,
    artBg: artBg(game.genre, cardArt),
    glyph: glyphOf(game.genre),
    hasGlyph: showGlyph(cardArt),
    gtag: GENRES[game.genre].tag,
    ratingStr: insight.rating.toFixed(1),
    reviewsStr: insight.reviews.toLocaleString(),
    negative: 100 - insight.positive,
    posWidth: `${insight.positive}%`,
    sentimentsView: insight.sentiments.map((s) => ({
      label: s.label,
      pct: s.pct,
      width: `${s.pct}%`,
      color: sentColor(s.pct),
    })),
  };
}
