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

function resolveDeck(ids: string[], deck: Game[]): Game[] {
  const byId = new Map(deck.map((g) => [g.id, g]));
  return (ids ?? [])
    .map((id) => byId.get(id))
    .filter((g): g is Game => Boolean(g));
}

/** Lists + counts from this user's decisions alone — available before the
 *  (slower, AI-generated) report resolves, so the result screen can paint early.
 *  genreStats/persona stay empty until buildResult fills them in. */
export function buildPartialResult(
  userSwipe: UserSwipeResponse,
  deck: Game[],
): ResultData {
  const buy = userSwipe.buy ?? [];
  const skip = userSwipe.skip ?? [];
  const maybe = userSwipe.maybe ?? [];
  return {
    liked: resolveDeck(buy, deck),
    maybe: resolveDeck(maybe, deck),
    passed: resolveDeck(skip, deck),
    likeCount: buy.length,
    maybeCount: maybe.length,
    passCount: skip.length,
    totalCount: buy.length + skip.length + maybe.length,
    genreStats: [],
    persona: { title: "", desc: "", tags: [] },
  };
}

/** Combine the AI report + this user's decisions (resolved on the deck) into
 *  the result-screen model. */
export function buildResult(
  report: PreferenceReportResponse,
  userSwipe: UserSwipeResponse,
  deck: Game[],
): ResultData {
  return {
    liked: resolveDeck(userSwipe.buy, deck),
    maybe: resolveDeck(userSwipe.maybe, deck),
    passed: resolveDeck(userSwipe.skip, deck),
    likeCount: report.buyCount,
    maybeCount: report.maybeCount,
    passCount: report.skipCount,
    totalCount: report.totalCount,
    genreStats: (report.genreStats ?? []).map(toGenreStat),
    persona: toPersona(report.persona),
  };
}
