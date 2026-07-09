import { useCallback, useEffect, useRef, useState } from "react";
import {
  createUser,
  getCurrentSwipe,
  getGame,
  getGameInsight,
  getReport,
  getSwipe,
  getUser,
  getUserSwipe,
  saveVotes,
} from "../api/endpoints";
import {
  buildResult,
  toDecisionValue,
  toGame,
  toInsight,
} from "../api/map";
import { PERSONA_MSGS } from "../data/games";
import type { ResultData } from "../data/stats";
import type { Choice, Decision, Game, GameInsight, Screen } from "../types";

const PERSONA_REVEAL_MS = 2200;
const PERSONA_STEP_MS = 720;
const FLY_MS = 340;
const TOAST_MS = 1900;

const LS_USER = "gs_userId";
const LS_SWIPE = "gs_swipeId";

function errMsg(e: unknown): string {
  return e instanceof Error ? e.message : "네트워크 오류가 발생했어요";
}

export interface GameSwipeState {
  screen: Screen;
  nickname: string;
  index: number;
  decisions: Decision[];
  selected: Game | null;
  toast: string;
  flyingId: string | null;
  flyingDir: Choice | null;
  personaReady: boolean;
  personaStep: number;
  // API-backed state
  userId: string | null;
  swipeId: string | null;
  deck: Game[];
  insight: GameInsight | null;
  loadingDetail: boolean;
  result: ResultData | null;
  starting: boolean;
}

export function useGameSwipe() {
  const [state, setState] = useState<GameSwipeState>({
    screen: "onboarding",
    nickname: "",
    index: 0,
    decisions: [],
    selected: null,
    toast: "",
    flyingId: null,
    flyingDir: null,
    personaReady: false,
    personaStep: 0,
    userId: null,
    swipeId: null,
    deck: [],
    insight: null,
    loadingDetail: false,
    result: null,
    starting: false,
  });

  const flyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const personaMsgTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const personaDoneTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const submittedRef = useRef(false);
  // Latest state, for reading synchronously inside async actions.
  const stateRef = useRef(state);
  stateRef.current = state;

  const showToast = useCallback((message: string) => {
    setState((s) => ({ ...s, toast: message }));
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => {
      setState((s) => ({ ...s, toast: "" }));
    }, TOAST_MS);
  }, []);

  // Restore a prior session: prefill the nickname and reload the saved round so
  // start() can resume it (wires GET /users/{id} + GET /swipes/{id}).
  useEffect(() => {
    const userId = localStorage.getItem(LS_USER);
    const swipeId = localStorage.getItem(LS_SWIPE);
    if (!userId) return;
    let alive = true;
    (async () => {
      try {
        const user = await getUser(userId);
        const swipe = swipeId ? await getSwipe(swipeId) : null;
        if (!alive) return;
        setState((s) => ({
          ...s,
          userId,
          nickname: s.nickname || user.nickname,
          swipeId: swipe ? swipe.id : s.swipeId,
          deck: swipe ? swipe.games.map(toGame) : s.deck,
        }));
      } catch {
        // stale session — clear and fall back to a fresh onboarding
        localStorage.removeItem(LS_USER);
        localStorage.removeItem(LS_SWIPE);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  // Stage the AI persona "thinking" sequence: cycle status messages, then reveal.
  const startPersonaLoad = useCallback(() => {
    if (personaMsgTimer.current) clearInterval(personaMsgTimer.current);
    if (personaDoneTimer.current) clearTimeout(personaDoneTimer.current);
    setState((s) => ({ ...s, personaReady: false, personaStep: 0 }));
    personaMsgTimer.current = setInterval(() => {
      setState((s) => ({
        ...s,
        personaStep: Math.min(s.personaStep + 1, PERSONA_MSGS.length - 1),
      }));
    }, PERSONA_STEP_MS);
    personaDoneTimer.current = setTimeout(() => {
      if (personaMsgTimer.current) clearInterval(personaMsgTimer.current);
      setState((s) => ({ ...s, personaReady: true }));
    }, PERSONA_REVEAL_MS);
  }, []);

  const commit = useCallback(
    (choice: Choice) => {
      setState((s) => {
        const g = s.deck[s.index];
        if (!g) return s;
        const decisions = [...s.decisions, { id: g.id, choice }];
        const next = s.index + 1;
        const done = next >= s.deck.length;
        if (done) startPersonaLoad();
        return {
          ...s,
          decisions,
          index: next,
          flyingId: null,
          flyingDir: null,
          screen: done ? "result" : s.screen,
        };
      });
    },
    [startPersonaLoad],
  );

  // Drive the fly-out through state so React always rewrites the transform.
  const decide = useCallback(
    (choice: Choice) => {
      setState((s) => {
        if (s.flyingId) return s;
        const g = s.deck[s.index];
        if (!g) return s;
        if (flyTimer.current) clearTimeout(flyTimer.current);
        flyTimer.current = setTimeout(() => commit(choice), FLY_MS);
        return { ...s, flyingId: g.id, flyingDir: choice };
      });
    },
    [commit],
  );

  // On reaching the result screen, persist votes then load the AI report + this
  // user's decisions, resolving the game lists against the deck.
  useEffect(() => {
    if (state.screen !== "result") {
      submittedRef.current = false;
      return;
    }
    if (submittedRef.current) return;
    const { userId, swipeId, decisions, deck } = state;
    if (!userId || !swipeId) return;
    submittedRef.current = true;
    (async () => {
      try {
        const votes = decisions.map((d) => ({
          gameId: d.id,
          decision: toDecisionValue(d.choice),
        }));
        await saveVotes(userId, swipeId, votes);
        const [report, userSwipe] = await Promise.all([
          getReport(userId, swipeId),
          getUserSwipe(userId, swipeId),
        ]);
        setState((s) => ({ ...s, result: buildResult(report, userSwipe, deck) }));
      } catch (e) {
        showToast(errMsg(e));
      }
    })();
  }, [state, showToast]);

  const setNickname = useCallback((nickname: string) => {
    setState((s) => ({ ...s, nickname }));
  }, []);

  // Create (or reuse) the user, load the round + deck, then enter the swipe deck.
  const start = useCallback(async () => {
    const nickname = (stateRef.current.nickname || "").trim() || "게이머";
    const existingUserId = stateRef.current.userId;
    const existingSwipeId = stateRef.current.swipeId;
    const existingDeck = stateRef.current.deck;
    setState((s) => ({ ...s, nickname, starting: true }));

    try {
      const userId = existingUserId ?? (await createUser(nickname)).id;

      let swipeId = existingSwipeId;
      let deck = existingDeck;
      if (!swipeId || deck.length === 0) {
        const swipe = await getCurrentSwipe();
        swipeId = swipe.id;
        deck = swipe.games.map(toGame);
      }

      localStorage.setItem(LS_USER, userId);
      localStorage.setItem(LS_SWIPE, swipeId);

      setState((s) => ({
        ...s,
        userId,
        swipeId,
        deck,
        index: 0,
        decisions: [],
        result: null,
        screen: "swipe",
        starting: false,
      }));
    } catch (e) {
      setState((s) => ({ ...s, starting: false }));
      showToast(errMsg(e));
    }
  }, [showToast]);

  // Open the detail view, fetching the freshest game data + its AI insight.
  const openDetail = useCallback(
    async (game: Game) => {
      setState((s) => ({
        ...s,
        selected: game,
        insight: null,
        loadingDetail: true,
        screen: "detail",
      }));
      try {
        const [full, insightDto] = await Promise.all([
          getGame(game.id),
          getGameInsight(game.id),
        ]);
        setState((s) =>
          s.selected?.id === game.id
            ? {
                ...s,
                selected: toGame(full),
                insight: toInsight(insightDto),
                loadingDetail: false,
              }
            : s,
        );
      } catch (e) {
        setState((s) => ({ ...s, loadingDetail: false }));
        showToast(errMsg(e));
      }
    },
    [showToast],
  );

  const back = useCallback(() => {
    setState((s) => ({ ...s, screen: "result" }));
  }, []);

  // Return to the first screen, resetting session + swipe progress.
  const goHome = useCallback(() => {
    if (flyTimer.current) clearTimeout(flyTimer.current);
    if (personaMsgTimer.current) clearInterval(personaMsgTimer.current);
    if (personaDoneTimer.current) clearTimeout(personaDoneTimer.current);
    localStorage.removeItem(LS_USER);
    localStorage.removeItem(LS_SWIPE);
    setState((s) => ({
      ...s,
      screen: "onboarding",
      nickname: "",
      index: 0,
      decisions: [],
      selected: null,
      flyingId: null,
      flyingDir: null,
      personaReady: false,
      personaStep: 0,
      userId: null,
      swipeId: null,
      deck: [],
      insight: null,
      loadingDetail: false,
      result: null,
      starting: false,
    }));
  }, []);

  useEffect(() => {
    return () => {
      if (flyTimer.current) clearTimeout(flyTimer.current);
      if (personaMsgTimer.current) clearInterval(personaMsgTimer.current);
      if (personaDoneTimer.current) clearTimeout(personaDoneTimer.current);
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  return {
    state,
    actions: {
      decide,
      setNickname,
      start,
      openDetail,
      back,
      goHome,
      showToast,
    },
  };
}
