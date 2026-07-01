import { GENRES, PERSONA, getGameById } from "./games";
import type { Decision, Game, GenreKey, Persona } from "../types";

export interface GenreStat {
  name: GenreKey;
  count: number;
  pct: number;
  width: string;
  color: string;
}

export interface SwipeSummary {
  liked: Game[];
  likeCount: number;
  maybeCount: number;
  passCount: number;
  totalCount: number;
  genreStats: GenreStat[];
  persona: Persona;
}

/** Aggregate swipe decisions into the result-screen analytics. */
export function summarize(decisions: Decision[]): SwipeSummary {
  const liked = decisions
    .filter((d) => d.choice === "like")
    .map((d) => getGameById(d.id))
    .filter((g): g is Game => Boolean(g));

  const likeCount = liked.length;
  const maybeCount = decisions.filter((d) => d.choice === "maybe").length;
  const passCount = decisions.filter((d) => d.choice === "pass").length;

  // Prefer liked games for genre profiling; fall back to everything swiped.
  const pool = liked.length
    ? liked
    : decisions
        .map((d) => getGameById(d.id))
        .filter((g): g is Game => Boolean(g));

  const counts = {} as Record<GenreKey, number>;
  pool.forEach((g) => {
    counts[g.genre] = (counts[g.genre] || 0) + 1;
  });
  const sum = Object.values(counts).reduce((a, b) => a + b, 0) || 1;

  const genreStats: GenreStat[] = (
    Object.entries(counts) as [GenreKey, number][]
  )
    .map(([name, count]) => {
      const pct = Math.round((count / sum) * 100);
      return { name, count, pct, width: `${pct}%`, color: GENRES[name].glow };
    })
    .sort((a, b) => b.count - a.count);

  const domGenre: GenreKey = genreStats[0]?.name ?? "Adventure";

  return {
    liked,
    likeCount,
    maybeCount,
    passCount,
    totalCount: decisions.length,
    genreStats,
    persona: PERSONA[domGenre],
  };
}
