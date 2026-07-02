import { GENRES } from "../data/games";
import { artBg, glyphOf, sentColor, showGlyph } from "../data/visuals";
import type { CardArt, Game } from "../types";
import ArtImage from "../components/ArtImage";

interface DetailScreenProps {
  game: Game | null;
  cardArt: CardArt;
  onBack: () => void;
  onStore: () => void;
  onCommunity: () => void;
}

export default function DetailScreen({
  game,
  cardArt,
  onBack,
  onStore,
  onCommunity,
}: DetailScreenProps) {
  if (!game) return null;
  const genreStyle = GENRES[game.genre];
  const negative = 100 - game.positive;

  return (
    <div style={{ paddingBottom: 34 }}>
      {/* header art */}
      <div
        style={{
          height: 232,
          position: "relative",
          background: artBg(game.genre, cardArt),
        }}
      >
        <ArtImage genre={game.genre} />
        {showGlyph(cardArt) && (
          <span
            className="font-grotesk"
            style={{
              position: "absolute",
              right: 6,
              bottom: -40,
              fontSize: 220,
              fontWeight: 700,
              color: "rgba(255,255,255,.15)",
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
              "linear-gradient(to top, #0a0c11 2%, rgba(10,12,17,.2) 50%, rgba(10,12,17,.35) 100%)",
          }}
        />
        <button
          onClick={onBack}
          style={{
            position: "absolute",
            top: 12,
            left: 16,
            width: 38,
            height: 38,
            borderRadius: "50%",
            background: "rgba(10,12,17,.55)",
            backdropFilter: "blur(6px)",
            color: "#fff",
            fontSize: 19,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ←
        </button>
        <div style={{ position: "absolute", left: 22, right: 22, bottom: 16 }}>
          <div style={{ display: "flex", gap: 7, marginBottom: 10 }}>
            <span
              style={{
                padding: "5px 11px",
                borderRadius: 8,
                background: "rgba(10,12,17,.55)",
                backdropFilter: "blur(6px)",
                fontSize: 11,
                fontWeight: 700,
                color: genreStyle.tag,
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
              ★ {game.rating.toFixed(1)}
            </span>
          </div>
          <h1
            style={{
              margin: 0,
              fontSize: 28,
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-.8px",
            }}
          >
            {game.title}
          </h1>
        </div>
      </div>

      <div style={{ padding: "18px 22px 0" }}>
        <p
          style={{
            margin: "0 0 18px",
            fontSize: 14,
            color: "#aab3c1",
            lineHeight: 1.5,
          }}
        >
          {game.desc}
        </p>

        {/* AI community summary */}
        <div
          style={{
            position: "relative",
            borderRadius: 20,
            padding: 1.5,
            background:
              "linear-gradient(120deg, var(--ac), var(--aig), var(--ac))",
            backgroundSize: "300% 100%",
            animation: "gs-shimmer 6s linear infinite",
            boxShadow: "0 0 40px -16px var(--aig)",
          }}
        >
          <div
            style={{
              borderRadius: 19,
              background: "linear-gradient(160deg, #161b26, #11131a)",
              padding: 19,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                marginBottom: 13,
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  padding: "4px 11px",
                  borderRadius: 8,
                  background: "linear-gradient(135deg, var(--ac), var(--aig))",
                  color: "#0a0c11",
                  fontSize: 11,
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
                AI 커뮤니티 요약
              </span>
              <span
                className="font-grotesk"
                style={{ fontSize: 11, color: "#6b7280" }}
              >
                리뷰 {game.reviews.toLocaleString()}개 기반
              </span>
            </div>
            <p
              style={{
                margin: "0 0 17px",
                fontSize: 14,
                color: "#dfe6ee",
                lineHeight: 1.55,
                fontWeight: 500,
              }}
            >
              {game.summary}
            </p>

            {/* like / dislike split */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 7,
              }}
            >
              <span
                style={{ fontSize: 12, fontWeight: 600, color: "#3fe08a" }}
              >
                긍정 {game.positive}%
              </span>
              <span
                style={{ fontSize: 12, fontWeight: 600, color: "#ff7a93" }}
              >
                부정 {negative}%
              </span>
            </div>
            <div
              style={{
                display: "flex",
                height: 9,
                borderRadius: 5,
                overflow: "hidden",
                background: "rgba(255,90,118,.25)",
              }}
            >
              <div
                style={{
                  width: `${game.positive}%`,
                  background: "linear-gradient(90deg, #2fbf72, #3fe08a)",
                  borderRadius: "5px 0 0 5px",
                }}
              />
            </div>

            {/* aspects */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 11,
                marginTop: 18,
              }}
            >
              {game.sentiments.map((sv) => {
                const color = sentColor(sv.pct);
                return (
                  <div key={sv.label}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: 5,
                      }}
                    >
                      <span style={{ fontSize: 12.5, color: "#c2cad6" }}>
                        {sv.label}
                      </span>
                      <span
                        className="font-grotesk"
                        style={{ fontSize: 12, fontWeight: 600, color }}
                      >
                        {sv.pct}%
                      </span>
                    </div>
                    <div
                      style={{
                        height: 6,
                        borderRadius: 4,
                        background: "rgba(255,255,255,.06)",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${sv.pct}%`,
                          background: color,
                          borderRadius: 4,
                          transformOrigin: "left",
                          animation: "gs-grow .7s cubic-bezier(.4,0,.2,1)",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* pros / cons */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 7,
                marginTop: 17,
              }}
            >
              {game.pros.map((p) => (
                <span
                  key={p}
                  style={{
                    padding: "6px 11px",
                    borderRadius: 9,
                    background: "rgba(63,224,138,.1)",
                    border: "1px solid rgba(63,224,138,.22)",
                    color: "#8ff0bb",
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  + {p}
                </span>
              ))}
              {game.cons.map((c) => (
                <span
                  key={c}
                  style={{
                    padding: "6px 11px",
                    borderRadius: 9,
                    background: "rgba(255,90,118,.1)",
                    border: "1px solid rgba(255,90,118,.22)",
                    color: "#ffadbe",
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  – {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* actions */}
        <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
          <button
            onClick={onStore}
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
            onClick={onCommunity}
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
        <div
          style={{
            textAlign: "center",
            marginTop: 12,
            fontSize: 11,
            color: "#5b6370",
          }}
        >
          STOVE 플랫폼에서 더 많은 정보를 확인하세요
        </div>
      </div>
    </div>
  );
}
