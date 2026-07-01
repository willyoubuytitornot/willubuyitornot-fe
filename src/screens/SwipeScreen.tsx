import GameCard from "../components/GameCard";
import SwipeControls from "../components/SwipeControls";
import { GAMES } from "../data/games";
import type { CardArt, Choice } from "../types";

interface SwipeScreenProps {
  index: number;
  flyingId: string | null;
  flyingDir: Choice | null;
  cardArt: CardArt;
  showAiHint: boolean;
  onDecide: (choice: Choice) => void;
  onUndo: () => void;
}

export default function SwipeScreen({
  index,
  flyingId,
  flyingDir,
  cardArt,
  showAiHint,
  onDecide,
  onUndo,
}: SwipeScreenProps) {
  const total = GAMES.length;
  const visibleCards = GAMES.slice(index, index + 3);
  const progressLabel = `${Math.min(index + 1, total)} / ${total}`;
  const progressPct = `${Math.round((index / total) * 100)}%`;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* progress */}
      <div style={{ padding: "10px 24px 4px", flexShrink: 0 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <span
            className="font-grotesk"
            style={{ fontSize: 15, fontWeight: 600, color: "#eef1f6" }}
          >
            {progressLabel}
          </span>
          <button
            onClick={onUndo}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              padding: "6px 12px",
              borderRadius: 20,
              background: "rgba(255,255,255,.05)",
              color: "#9aa4b5",
              fontSize: 12,
              fontWeight: 600,
              opacity: index === 0 ? 0.4 : 1,
            }}
          >
            ↩ 되돌리기
          </button>
        </div>
        <div
          style={{
            height: 5,
            borderRadius: 4,
            background: "rgba(255,255,255,.07)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: progressPct,
              background: "linear-gradient(90deg, var(--ac2), var(--ac))",
              borderRadius: 4,
              transition: "width .4s cubic-bezier(.4,0,.2,1)",
            }}
          />
        </div>
      </div>

      {/* card stack */}
      <div style={{ flex: 1, position: "relative", margin: "6px 0" }}>
        {visibleCards.map((game, k) => (
          <GameCard
            key={game.id}
            game={game}
            stackIndex={k}
            flying={k === 0 && flyingId === game.id}
            flyingDir={flyingDir}
            cardArt={cardArt}
            showAi={k === 0 && showAiHint}
            onDecide={onDecide}
          />
        ))}
      </div>

      {/* action buttons */}
      <SwipeControls
        onDecide={onDecide}
        style={{ flexShrink: 0, padding: "6px 0 22px" }}
      />
    </div>
  );
}
