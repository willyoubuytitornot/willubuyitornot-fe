// The 9 endpoints of the 게임 스와이프 API, one function each.
import { apiGet, apiPost } from "./http";
import type {
  GameInsightResponse,
  GameResponse,
  PreferenceReportResponse,
  SwipeWithGamesResponse,
  UserResponse,
  UserSwipeResponse,
  VoteRequest,
} from "./dto";

/** POST /v1/users — create a user from a nickname. */
export const createUser = (nickname: string) =>
  apiPost<UserResponse>("/v1/users", { nickname });

/** GET /v1/users/{userId} — fetch a user (session restore). */
export const getUser = (userId: string) =>
  apiGet<UserResponse>(`/v1/users/${userId}`);

/** GET /v1/swipes/current — current round + expanded games. */
export const getCurrentSwipe = () =>
  apiGet<SwipeWithGamesResponse>("/v1/swipes/current");

/** GET /v1/swipes/{swipeId} — a specific round (resume a saved session). */
export const getSwipe = (swipeId: string) =>
  apiGet<SwipeWithGamesResponse>(`/v1/swipes/${swipeId}`);

/** GET /v1/games/{gameId} — game detail. */
export const getGame = (gameId: string) =>
  apiGet<GameResponse>(`/v1/games/${gameId}`);

/** GET /v1/games/{gameId}/insight — runtime AI insight. */
export const getGameInsight = (gameId: string) =>
  apiGet<GameInsightResponse>(`/v1/games/${gameId}/insight`);

/** POST /v1/users/{userId}/swipes/{swipeId}/votes — batch upsert decisions. */
export const saveVotes = (
  userId: string,
  swipeId: string,
  votes: VoteRequest[],
) =>
  apiPost<UserSwipeResponse>(
    `/v1/users/${userId}/swipes/${swipeId}/votes`,
    votes,
  );

/** GET /v1/users/{userId}/swipes/{swipeId} — this user's decisions for a round. */
export const getUserSwipe = (userId: string, swipeId: string) =>
  apiGet<UserSwipeResponse>(`/v1/users/${userId}/swipes/${swipeId}`);

/** GET /v1/users/{userId}/swipes/{swipeId}/report — runtime AI taste report. */
export const getReport = (userId: string, swipeId: string) =>
  apiGet<PreferenceReportResponse>(
    `/v1/users/${userId}/swipes/${swipeId}/report`,
  );
