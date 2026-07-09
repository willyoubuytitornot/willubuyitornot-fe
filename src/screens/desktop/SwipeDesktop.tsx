import GameCard from "../../components/GameCard";
import SwipeControls from "../../components/SwipeControls";
import type { CardArt, Choice, Game } from "../../types";

interface SwipeDesktopProps {
  deck: Game[];
  index: number;
  flyingId: string | null;
  flyingDir: Choice | null;
  cardArt: CardArt;
  showAiHint: boolean;
  onDecide: (choice: Choice) => void;
}

export default function SwipeDesktop({
  deck,
  index,
  flyingId,
  flyingDir,
  cardArt,
  showAiHint,
  onDecide,
}: SwipeDesktopProps) {
  const total = deck.length;
  const visibleCards = deck.slice(index, index + 3);
  const progressLabel = `${Math.min(index + 1, total)} / ${total}`;
  const progressPct = `${Math.round((index / total) * 100)}%`;

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "28px 48px",
      }}
    >
      <div style={{ width: "100%", maxWidth: 432 }}>
        {/* stack + controls */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ marginBottom: 14 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 9,
              }}
            >
              <span
                className="font-grotesk"
                style={{ fontSize: 14, fontWeight: 600, color: "#eef1f6" }}
              >
                {progressLabel}
              </span>
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

          <div style={{ position: "relative", height: 472 }}>
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
                edgeInset={0}
              />
            ))}
          </div>

          <SwipeControls onDecide={onDecide} style={{ marginTop: 20 }} />
        </div>
      </div>
    </div>
  );
}
