import type { CSSProperties } from "react";
import { ACCENT_PAIRS, AI_GLOW } from "./data/games";
import { useGameSwipe } from "./hooks/useGameSwipe";
import { useIsDesktop } from "./hooks/useViewport";
import DesktopLayout from "./layouts/DesktopLayout";
import MobileLayout from "./layouts/MobileLayout";
import type { AccentKey, CardArt } from "./types";

// Presentation config — originally surfaced as Claude Design editor props.
const ACCENT: AccentKey = "lime";
const CARD_ART: CardArt = "orbs";
const SHOW_AI_HINT = true;

const DESKTOP_BREAKPOINT = 920;

export default function App() {
  const { state, actions } = useGameSwipe();
  const isDesktop = useIsDesktop(DESKTOP_BREAKPOINT);
  const [ac, ac2] = ACCENT_PAIRS[ACCENT];

  const vars = {
    "--ac": ac,
    "--ac2": ac2,
    "--aig": AI_GLOW,
    minHeight: "100vh",
    width: "100%",
    background:
      "radial-gradient(120% 80% at 50% -10%, #181d28 0%, #0a0c11 58%)",
    position: "relative",
    overflow: "hidden",
    fontFamily: "'Pretendard', system-ui, sans-serif",
  } as CSSProperties;

  const layoutProps = {
    state,
    actions,
    cardArt: CARD_ART,
    showAiHint: SHOW_AI_HINT,
  };

  return (
    <div style={vars}>
      {isDesktop ? (
        <DesktopLayout {...layoutProps} />
      ) : (
        <MobileLayout {...layoutProps} />
      )}
    </div>
  );
}
