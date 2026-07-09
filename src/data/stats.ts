import type { Game, GenreKey, Persona } from "../types";

export interface GenreStat {
  name: GenreKey;
  count: number;
  pct: number;
  width: string;
  color: string;
}

/** Result-screen model, assembled from the AI report + this user's decisions.
 *  Built in the API layer (src/api/map.ts `buildResult`). */
export interface ResultData {
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
