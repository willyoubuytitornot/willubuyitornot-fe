import type { AccentKey, GenreKey, GenreStyle } from "../types";

export const GENRES: Record<GenreKey, GenreStyle> = {
  RPG: { a: "#7c3aed", b: "#3b2a8c", tag: "#c9b8fb", glow: "#a78bfa" },
  Action: { a: "#ff3d71", b: "#7a1736", tag: "#ffa3bd", glow: "#ff6b92" },
  Adventure: { a: "#ff9f2e", b: "#a8380e", tag: "#ffd49a", glow: "#ffb44d" },
  Racing: { a: "#2bd4ff", b: "#1a4fcc", tag: "#a9ebff", glow: "#5fe0ff" },
  Strategy: { a: "#19c7a8", b: "#0b5e54", tag: "#a3eedd", glow: "#3fe0c2" },
  Puzzle: { a: "#ff5fa2", b: "#8e1e6b", tag: "#ffb6d6", glow: "#ff85bc" },
  Simulation: { a: "#9be33a", b: "#2e8b2e", tag: "#d7f5a4", glow: "#b6f95a" },
  Horror: { a: "#7e8aa3", b: "#3a0f14", tag: "#c7cfde", glow: "#9aa8c2" },
};

export const PERSONA_MSGS = [
  "당신의 게이머 유형을 소환하는 중",
  "플레이 DNA를 분석하는 중",
  "페르소나를 빚어내는 중",
];

export const ACCENT_PAIRS: Record<AccentKey, [string, string]> = {
  lime: ["#bfff4d", "#84e03a"],
  emerald: ["#2fe6a8", "#13b886"],
  cyan: ["#4fe2ff", "#1fb6e6"],
};

export const AI_GLOW = "#5be9ff";
