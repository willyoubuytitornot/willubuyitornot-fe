import { enrichGame } from "../data/gameView";
import type { CardArt, Game } from "../types";
import CommunityAnalysis from "./CommunityAnalysis";

interface GameInfoPanelProps {
  game: Game;
  cardArt: CardArt;
}

/** Persistent AI info panel shown beside the card stack on desktop. */
export default function GameInfoPanel({ game, cardArt }: GameInfoPanelProps) {
  const view = enrichGame(game, cardArt);

  const chip = {
    padding: "6px 12px",
    borderRadius: 9,
    background: "rgba(255,255,255,.05)",
    fontSize: 12,
    fontWeight: 600,
  } as const;

  return (
    <div
      style={{
        background: "#12151d",
        border: "1px solid rgba(255,255,255,.07)",
        borderRadius: 24,
        padding: "32px 34px",
      }}
    >
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <span style={{ ...chip, fontWeight: 700, color: view.gtag }}>
          {view.genre}
        </span>
        <span className="font-grotesk" style={{ ...chip, color: "#e6e9ef" }}>
          {view.year}
        </span>
        <span className="font-grotesk" style={{ ...chip, color: "#ffd25e" }}>
          ★ {view.ratingStr}
        </span>
      </div>
      <h2
        style={{
          margin: 0,
          fontSize: 30,
          fontWeight: 800,
          color: "#f1f4f9",
          letterSpacing: "-.8px",
        }}
      >
        {view.title}
      </h2>
      <p
        style={{
          margin: "11px 0 0",
          fontSize: 14.5,
          color: "#aab3c1",
          lineHeight: 1.55,
        }}
      >
        {view.desc}
      </p>

      {/* AI one-liner */}
      <div
        style={{
          marginTop: 18,
          padding: "13px 15px",
          borderRadius: 14,
          background:
            "linear-gradient(135deg, rgba(91,233,255,.08), rgba(191,255,77,.06))",
          border: "1px solid rgba(91,233,255,.18)",
          animation: "gs-aiglow 4s ease-in-out infinite",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginBottom: 6,
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              padding: "3px 9px",
              borderRadius: 6,
              background: "linear-gradient(135deg, var(--ac), var(--aig))",
              color: "#0a0c11",
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: ".5px",
            }}
          >
            <span
              style={{
                animation: "gs-spark 3s ease-in-out infinite",
                display: "inline-block",
              }}
            >
              ✦
            </span>{" "}
            AI 한줄평
          </span>
        </div>
        <p
          style={{
            margin: 0,
            fontSize: 14,
            color: "#d5e8ef",
            lineHeight: 1.45,
            fontWeight: 500,
          }}
        >
          {view.ai}
        </p>
      </div>

      {/* community analysis */}
      <div
        style={{
          marginTop: 22,
          paddingTop: 22,
          borderTop: "1px solid rgba(255,255,255,.07)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 13,
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 700, color: "#eef1f6" }}>
            AI 커뮤니티 분석
          </span>
          <span
            className="font-grotesk"
            style={{ fontSize: 11, color: "#6b7280" }}
          >
            리뷰 {view.reviewsStr}개 기반
          </span>
        </div>
        <CommunityAnalysis view={view} />
      </div>
    </div>
  );
}
