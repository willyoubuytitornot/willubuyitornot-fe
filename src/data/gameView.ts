import { GENRES } from "./games";
import { artBg, glyphOf, sentColor, showGlyph } from "./visuals";
import type { CardArt, Game } from "../types";

export interface SentimentView {
  label: string;
  pct: number;
  width: string;
  color: string;
}

export interface GameView extends Game {
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

/** Enrich a game with all the derived display fields used across screens. */
export function enrichGame(game: Game, cardArt: CardArt): GameView {
  return {
    ...game,
    artBg: artBg(game.genre, cardArt),
    glyph: glyphOf(game.genre),
    hasGlyph: showGlyph(cardArt),
    gtag: GENRES[game.genre].tag,
    ratingStr: game.rating.toFixed(1),
    reviewsStr: game.reviews.toLocaleString(),
    negative: 100 - game.positive,
    posWidth: `${game.positive}%`,
    sentimentsView: game.sentiments.map((s) => ({
      label: s.label,
      pct: s.pct,
      width: `${s.pct}%`,
      color: sentColor(s.pct),
    })),
  };
}
