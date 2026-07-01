import type { useGameSwipe } from "../hooks/useGameSwipe";
import type { CardArt } from "../types";

type GameSwipe = ReturnType<typeof useGameSwipe>;

export interface LayoutProps {
  state: GameSwipe["state"];
  actions: GameSwipe["actions"];
  cardArt: CardArt;
  showAiHint: boolean;
}
