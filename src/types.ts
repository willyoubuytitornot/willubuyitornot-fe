export type Choice = "like" | "pass" | "maybe";

export type Screen = "onboarding" | "swipe" | "result" | "detail";

export type GenreKey =
  | "RPG"
  | "Action"
  | "Adventure"
  | "Racing"
  | "Strategy"
  | "Puzzle"
  | "Simulation"
  | "Horror";

export interface GenreStyle {
  /** primary gradient stop */
  a: string;
  /** secondary gradient stop */
  b: string;
  /** genre tag text color */
  tag: string;
  /** glow / accent color */
  glow: string;
}

export interface Sentiment {
  label: string;
  pct: number;
}

export interface Game {
  id: string;
  title: string;
  genre: GenreKey;
  year: string;
  rating: number;
  desc: string;
  /** AI one-liner shown on the swipe card */
  ai: string;
  reviews: number;
  /** percentage of positive reviews (0-100) */
  positive: number;
  /** AI community summary */
  summary: string;
  sentiments: Sentiment[];
  pros: string[];
  cons: string[];
}

export interface Persona {
  title: string;
  desc: string;
  tags: string[];
}

export interface Decision {
  id: string;
  choice: Choice;
}

export type AccentKey = "lime" | "emerald" | "cyan";
export type CardArt = "orbs" | "glyph" | "grid";
