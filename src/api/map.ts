// Convert raw API DTOs into the app's display types.
import { GENRES } from "../data/games";
import type { GenreStat, ResultData } from "../data/stats";
import type { Choice, Game, GameInsight, GenreKey, Persona } from "../types";
import type {
  GameInsightResponse,
  GameResponse,
  GenreStatDto,
  PersonaDto,
  PreferenceReportResponse,
  UserSwipeResponse,
  VoteDecision,
} from "./dto";

// The API `genre` is a free string; the UI theme keys off a fixed enum.
const GENRE_ALIASES: Record<string, GenreKey> = {
  rpg: "RPG",
  롤플레잉: "RPG",
  action: "Action",
  액션: "Action",
  adventure: "Adventure",
  어드벤처: "Adventure",
  모험: "Adventure",
  racing: "Racing",
  레이싱: "Racing",
  strategy: "Strategy",
  전략: "Strategy",
  puzzle: "Puzzle",
  퍼즐: "Puzzle",
  simulation: "Simulation",
  시뮬레이션: "Simulation",
  horror: "Horror",
  공포: "Horror",
  호러: "Horror",
};

/** Map a free-form genre string onto a GenreKey, defaulting to Adventure. */
export function toGenreKey(raw: string): GenreKey {
  if (!raw) return "Adventure";
  const t = raw.trim();
  return GENRE_ALIASES[t.toLowerCase()] ?? GENRE_ALIASES[t] ?? "Adventure";
}

function yearOf(releaseDate: string): string {
  if (!releaseDate) return "";
  const m = releaseDate.match(/\d{4}/);
  return m ? m[0] : releaseDate;
}

/** GameResponse (card data) → Game. The API has no separate short description. */
export function toGame(dto: GameResponse): Game {
  return {
    id: dto.id,
    title: dto.title,
    genre: toGenreKey(dto.genre),
    year: yearOf(dto.releaseDate),
    desc: "",
    ai: dto.aiComment ?? "",
    imageUrl: dto.imageUrl,
    storeUrl: dto.storeUrl,
    communityUrl: dto.communityUrl,
  };
}

/** GameInsightResponse (review data) → GameInsight. `score` becomes `pct`. */
export function toInsight(dto: GameInsightResponse): GameInsight {
  return {
    rating: dto.rating,
    reviews: dto.reviews,
    positive: dto.positive,
    summary: dto.summary,
    sentiments: (dto.sentiments ?? []).map((s) => ({
      label: s.label,
      pct: s.score,
    })),
    pros: dto.pros ?? [],
    cons: dto.cons ?? [],
  };
}

const CHOICE_TO_DECISION: Record<Choice, VoteDecision> = {
  like: "buy",
  pass: "skip",
  maybe: "maybe",
};
const DECISION_TO_CHOICE: Record<VoteDecision, Choice> = {
  buy: "like",
  skip: "pass",
  maybe: "maybe",
};

export const toDecisionValue = (choice: Choice): VoteDecision =>
  CHOICE_TO_DECISION[choice];
export const fromDecisionValue = (decision: VoteDecision): Choice =>
  DECISION_TO_CHOICE[decision];

export function toPersona(dto: PersonaDto): Persona {
  return { title: dto.title, desc: dto.description, tags: dto.tags ?? [] };
}

export function toGenreStat(dto: GenreStatDto): GenreStat {
  const name = toGenreKey(dto.genre);
  return {
    name,
    count: dto.count,
    pct: dto.percentage,
    width: `${dto.percentage}%`,
    color: GENRES[name].glow,
  };
}

/** Combine the AI report + this user's decisions (resolved on the deck) into
 *  the result-screen model. */
export function buildResult(
  report: PreferenceReportResponse,
  userSwipe: UserSwipeResponse,
  deck: Game[],
): ResultData {
  const byId = new Map(deck.map((g) => [g.id, g]));
  const resolve = (ids: string[]): Game[] =>
    (ids ?? [])
      .map((id) => byId.get(id))
      .filter((g): g is Game => Boolean(g));

  return {
    liked: resolve(userSwipe.buy),
    maybe: resolve(userSwipe.maybe),
    passed: resolve(userSwipe.skip),
    likeCount: report.buyCount,
    maybeCount: report.maybeCount,
    passCount: report.skipCount,
    totalCount: report.totalCount,
    genreStats: (report.genreStats ?? []).map(toGenreStat),
    persona: toPersona(report.persona),
  };
}
