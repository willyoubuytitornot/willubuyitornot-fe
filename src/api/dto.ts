// Response/request shapes mirroring the OpenAPI spec (게임 스와이프 API v2.0.0).
// These are the raw server contracts; src/api/map.ts converts them to app types.

export interface CreateUserRequest {
  nickname: string;
}

export interface UserResponse {
  id: string;
  nickname: string;
  createdAt: string;
}

export type VoteDecision = "buy" | "skip" | "maybe";

export interface VoteRequest {
  gameId: string;
  decision: VoteDecision;
}

export interface UserSwipeResponse {
  id: string;
  userId: string;
  swipeId: string;
  buy: string[];
  skip: string[];
  maybe: string[];
  createdAt: string;
  updatedAt: string;
}

export interface GameResponse {
  id: string;
  imageUrl: string;
  genre: string;
  releaseDate: string;
  title: string;
  aiComment: string;
  storeUrl: string;
  communityUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface SwipeWithGamesResponse {
  id: string;
  gameIdList: string[];
  createdAt: string;
  games: GameResponse[];
}

export interface SentimentDto {
  label: string;
  score: number;
}

export interface GameInsightResponse {
  gameId: string;
  rating: number;
  reviews: number;
  positive: number;
  negative: number;
  summary: string;
  sentiments: SentimentDto[];
  pros: string[];
  cons: string[];
}

export interface GenreStatDto {
  genre: string;
  count: number;
  percentage: number;
}

export interface PersonaDto {
  title: string;
  description: string;
  tags: string[];
}

export interface PreferenceReportResponse {
  totalCount: number;
  buyCount: number;
  skipCount: number;
  maybeCount: number;
  genreStats: GenreStatDto[];
  persona: PersonaDto;
}
