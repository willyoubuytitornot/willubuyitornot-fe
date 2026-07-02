import { useCallback, useEffect, useRef, useState } from "react";
import { GAMES, PERSONA_MSGS } from "../data/games";
import type { Choice, Decision, Game, Screen } from "../types";

const PERSONA_REVEAL_MS = 2200;
const PERSONA_STEP_MS = 720;
const FLY_MS = 340;
const TOAST_MS = 1900;

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
  });

  const flyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const personaMsgTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const personaDoneTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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
        const g = GAMES[s.index];
        if (!g) return s;
        const decisions = [...s.decisions, { id: g.id, choice }];
        const next = s.index + 1;
        const done = next >= GAMES.length;
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
        const g = GAMES[s.index];
        if (!g) return s;
        if (flyTimer.current) clearTimeout(flyTimer.current);
        flyTimer.current = setTimeout(() => commit(choice), FLY_MS);
        return { ...s, flyingId: g.id, flyingDir: choice };
      });
    },
    [commit],
  );

  const setNickname = useCallback((nickname: string) => {
    setState((s) => ({ ...s, nickname }));
  }, []);

  const start = useCallback(() => {
    setState((s) => ({
      ...s,
      nickname: (s.nickname || "").trim() || "게이머",
      screen: "swipe",
    }));
  }, []);

  const openDetail = useCallback((game: Game) => {
    setState((s) => ({ ...s, selected: game, screen: "detail" }));
  }, []);

  const back = useCallback(() => {
    setState((s) => ({ ...s, screen: "result" }));
  }, []);

  const showToast = useCallback((message: string) => {
    setState((s) => ({ ...s, toast: message }));
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => {
      setState((s) => ({ ...s, toast: "" }));
    }, TOAST_MS);
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
      showToast,
    },
  };
}
