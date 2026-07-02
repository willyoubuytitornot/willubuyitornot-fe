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
  maybe: Game[];
  passed: Game[];
  likeCount: number;
  maybeCount: number;
  passCount: number;
  totalCount: number;
  genreStats: GenreStat[];
  persona: Persona;
}

/** Games swiped with a given choice, in swipe order. */
function gamesByChoice(decisions: Decision[], choice: Decision["choice"]): Game[] {
  return decisions
    .filter((d) => d.choice === choice)
    .map((d) => getGameById(d.id))
    .filter((g): g is Game => Boolean(g));
}

/** Aggregate swipe decisions into the result-screen analytics. */
export function summarize(decisions: Decision[]): SwipeSummary {
  const liked = gamesByChoice(decisions, "like");
  const maybe = gamesByChoice(decisions, "maybe");
  const passed = gamesByChoice(decisions, "pass");

  const likeCount = liked.length;
  const maybeCount = maybe.length;
  const passCount = passed.length;

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
    maybe,
    passed,
    likeCount,
    maybeCount,
    passCount,
    totalCount: decisions.length,
    genreStats,
    persona: PERSONA[domGenre],
  };
}
