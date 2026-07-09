import AiBadge from "../../components/AiBadge";
import ArtImage from "../../components/ArtImage";
import CommunityAnalysis from "../../components/CommunityAnalysis";
import InsightLoading from "../../components/InsightLoading";
import { GENRES } from "../../data/games";
import { enrichGame } from "../../data/gameView";
import { artBg, glyphOf, showGlyph } from "../../data/visuals";
import type { CardArt, Game, GameInsight } from "../../types";

interface DetailModalProps {
  active: boolean;
  game: Game | null;
  insight: GameInsight | null;
  loading: boolean;
  cardArt: CardArt;
  onBack: () => void;
  onStore: (url?: string) => void;
  onCommunity: (url?: string) => void;
}

/** Desktop detail as a centered modal over a blurred backdrop. */
export default function DetailModal({
  active,
  game,
  insight,
  loading,
  cardArt,
  onBack,
  onStore,
  onCommunity,
}: DetailModalProps) {
  const view = game && insight ? enrichGame(game, insight, cardArt) : null;

  return (
    <div
      data-screen-label="상세"
      style={{
        position: "absolute",
        inset: 0,
        transition: "opacity .4s cubic-bezier(.4,0,.2,1)",
        opacity: active ? 1 : 0,
        pointerEvents: active ? "auto" : "none",
        background: "rgba(7,9,13,.66)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 44,
        zIndex: 50,
      }}
    >
      {game && (
        <div
          style={{
            width: "100%",
            maxWidth: 1000,
            maxHeight: "86vh",
            display: "grid",
            gridTemplateColumns: ".9fr 1.1fr",
            background: "#12151d",
            border: "1px solid rgba(255,255,255,.08)",
            borderRadius: 26,
            overflow: "hidden",
            boxShadow: "0 60px 140px -50px rgba(0,0,0,.9)",
            transition: "transform .4s cubic-bezier(.2,.8,.2,1)",
            transform: active ? "translateY(0) scale(1)" : "translateX(32px)",
          }}
        >
          {/* art */}
          <div
            style={{
              position: "relative",
              background: artBg(game.genre, cardArt),
              minHeight: 460,
            }}
          >
            <ArtImage genre={game.genre} src={game.imageUrl} />
            {showGlyph(cardArt) && (
              <span
                className="font-grotesk"
                style={{
                  position: "absolute",
                  right: 0,
                  bottom: -30,
                  fontSize: 240,
                  fontWeight: 700,
                  color: "rgba(255,255,255,.14)",
                  lineHeight: 1,
                  letterSpacing: -10,
                }}
              >
                {glyphOf(game.genre)}
              </span>
            )}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(10,12,17,.8) 2%, transparent 55%)",
              }}
            />
            <button
              onClick={onBack}
              style={{
                position: "absolute",
                top: 18,
                left: 18,
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "rgba(10,12,17,.55)",
                backdropFilter: "blur(6px)",
                color: "#fff",
                fontSize: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ←
            </button>
            <div style={{ position: "absolute", left: 26, right: 26, bottom: 24 }}>
              <div style={{ display: "flex", gap: 7, marginBottom: 12 }}>
                <span
                  style={{
                    padding: "5px 11px",
                    borderRadius: 8,
                    background: "rgba(10,12,17,.55)",
                    backdropFilter: "blur(6px)",
                    fontSize: 11,
                    fontWeight: 700,
                    color: GENRES[game.genre].tag,
                  }}
                >
                  {game.genre}
                </span>
                <span
                  className="font-grotesk"
                  style={{
                    padding: "5px 11px",
                    borderRadius: 8,
                    background: "rgba(10,12,17,.55)",
                    backdropFilter: "blur(6px)",
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#e6e9ef",
                  }}
                >
                  {game.year}
                </span>
                {insight && (
                  <span
                    className="font-grotesk"
                    style={{
                      padding: "5px 11px",
                      borderRadius: 8,
                      background: "rgba(10,12,17,.55)",
                      backdropFilter: "blur(6px)",
                      fontSize: 11,
                      fontWeight: 600,
                      color: "#ffd25e",
                    }}
                  >
                    ★ {insight.rating.toFixed(1)}
                  </span>
                )}
              </div>
              <h1
                style={{
                  margin: 0,
                  fontSize: 32,
                  fontWeight: 800,
                  color: "#fff",
                  letterSpacing: "-.8px",
                }}
              >
                {game.title}
              </h1>
            </div>
          </div>

          {/* body */}
          <div style={{ padding: "32px 34px", overflowY: "auto" }}>
            {game.desc && (
              <p
                style={{
                  margin: "0 0 20px",
                  fontSize: 14.5,
                  color: "#aab3c1",
                  lineHeight: 1.55,
                }}
              >
                {game.desc}
              </p>
            )}
            {(view || loading) && (
              <div
                style={{
                  position: "relative",
                  borderRadius: 20,
                  padding: 1.5,
                  background:
                    "linear-gradient(120deg, var(--ac), var(--aig), var(--ac))",
                  backgroundSize: "300% 100%",
                  animation: "gs-shimmer 6s linear infinite",
                  boxShadow: "0 0 40px -18px var(--aig)",
                }}
              >
                <div
                  style={{
                    borderRadius: 19,
                    background: "linear-gradient(160deg, #161b26, #11131a)",
                    padding: 22,
                  }}
                >
                  {view ? (
                    <>
                      <AiBadge
                        label="AI 커뮤니티 요약"
                        note={`리뷰 ${view.reviewsStr}개 기반`}
                        noteMono
                      />
                      <CommunityAnalysis view={view} showSummary />
                    </>
                  ) : (
                    <InsightLoading />
                  )}
                </div>
              </div>
            )}
            <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
              <button
                onClick={() => onStore(game.storeUrl)}
                style={{
                  flex: 1.4,
                  height: 54,
                  borderRadius: 15,
                  background: "linear-gradient(135deg, var(--ac), var(--ac2))",
                  color: "#0a0c11",
                  fontSize: 15,
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 7,
                  boxShadow: "0 14px 32px -14px var(--ac)",
                }}
              >
                스토어에서 보기
              </button>
              <button
                onClick={() => onCommunity(game.communityUrl)}
                style={{
                  flex: 1,
                  height: 54,
                  borderRadius: 15,
                  background: "#1a1f2b",
                  border: "1px solid rgba(255,255,255,.1)",
                  color: "#e6e9ef",
                  fontSize: 15,
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                커뮤니티
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
