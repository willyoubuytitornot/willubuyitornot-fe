import { useMemo } from "react";
import { GENRES, PERSONA_MSGS } from "../../data/games";
import { summarize } from "../../data/stats";
import { artBg } from "../../data/visuals";
import type { CardArt, Decision, Game } from "../../types";

interface ResultDesktopProps {
  decisions: Decision[];
  nickname: string;
  personaReady: boolean;
  personaStep: number;
  cardArt: CardArt;
  onRestart: () => void;
  onOpenDetail: (game: Game) => void;
}

function PersonaLoadingDesktop({ message }: { message: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 15, padding: "22px 0" }}>
      <div style={{ position: "relative", width: 44, height: 44, flexShrink: 0 }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "3px solid rgba(91,233,255,.14)",
            borderTopColor: "var(--aig)",
            animation: "gs-orbit .9s linear infinite",
          }}
        />
        <span
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 17,
            color: "var(--ac)",
            animation: "gs-spark 2.4s ease-in-out infinite",
          }}
        >
          ✦
        </span>
      </div>
      <div
        style={{
          fontSize: 17,
          fontWeight: 700,
          color: "#dfe6ee",
          letterSpacing: "-.2px",
        }}
      >
        {message}
        {[0, 0.2, 0.4].map((d) => (
          <span
            key={d}
            style={{ animation: "gs-dots 1.2s infinite", animationDelay: `${d}s` }}
          >
            .
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ResultDesktop({
  decisions,
  nickname,
  personaReady,
  personaStep,
  cardArt,
  onRestart,
  onOpenDetail,
}: ResultDesktopProps) {
  const {
    liked,
    likeCount,
    maybeCount,
    passCount,
    totalCount,
    genreStats,
    persona,
  } = useMemo(() => summarize(decisions), [decisions]);
  const reportName = nickname || "게이머";
  const personaMsg = PERSONA_MSGS[personaStep] ?? PERSONA_MSGS[0];

  const stats = [
    { value: likeCount, label: "좋아요", color: "#3fe08a", bg: "rgba(63,224,138,.1)" },
    { value: maybeCount, label: "고민중", color: "#f5c441", bg: "rgba(245,196,65,.1)" },
    { value: passCount, label: "패스", color: "#ff5a76", bg: "rgba(255,90,118,.1)" },
  ];

  return (
    <div style={{ maxWidth: 1180, margin: "0 auto", padding: "40px 48px 72px" }}>
      {/* header */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginBottom: 28,
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: 36,
              fontWeight: 800,
              color: "#f1f4f9",
              letterSpacing: -1,
            }}
          >
            총{" "}
            <span className="font-grotesk" style={{ color: "var(--ac)" }}>
              {totalCount}
            </span>
            개 확인 완료
          </h1>
          <p style={{ margin: "8px 0 0", fontSize: 15, color: "#8b95a5" }}>
            {reportName}님의 취향 리포트가 완성됐어요
          </p>
        </div>
        <button
          onClick={onRestart}
          style={{
            padding: "11px 18px",
            borderRadius: 12,
            background: "rgba(255,255,255,.06)",
            color: "#c2cad6",
            fontSize: 13,
            fontWeight: 600,
            whiteSpace: "nowrap",
          }}
        >
          ↻ 다시 시작
        </button>
      </div>

      {/* persona + preference */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr",
          gap: 22,
          marginBottom: 22,
          alignItems: "start",
        }}
      >
        {/* persona hero */}
        <div
          style={{
            position: "relative",
            borderRadius: 22,
            padding: 1.5,
            background:
              "linear-gradient(120deg, var(--ac), var(--aig), var(--ac))",
            backgroundSize: "300% 100%",
            animation: "gs-shimmer 6s linear infinite",
            boxShadow: "0 0 48px -16px var(--aig)",
          }}
        >
          <div
            style={{
              borderRadius: 21,
              background: "linear-gradient(160deg, #161b26, #11131a)",
              padding: 32,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 18,
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  padding: "5px 12px",
                  borderRadius: 8,
                  background: "linear-gradient(135deg, var(--ac), var(--aig))",
                  color: "#0a0c11",
                  fontSize: 12,
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
                AI 페르소나
              </span>
              <span style={{ fontSize: 12, color: "#6b7280" }}>
                스와이프 패턴 분석
              </span>
            </div>

            {!personaReady ? (
              <PersonaLoadingDesktop message={personaMsg} />
            ) : (
              <div style={{ animation: "gs-reveal .5s cubic-bezier(.2,.8,.2,1)" }}>
                <h2
                  style={{
                    margin: 0,
                    fontSize: 32,
                    fontWeight: 800,
                    color: "#f3f6fb",
                    letterSpacing: "-.8px",
                    lineHeight: 1.18,
                  }}
                >
                  {persona.title}
                </h2>
                <p
                  style={{
                    margin: "14px 0 0",
                    fontSize: 15,
                    color: "#aab3c1",
                    lineHeight: 1.6,
                  }}
                >
                  {persona.desc}
                </p>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 8,
                    marginTop: 20,
                  }}
                >
                  {persona.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        padding: "7px 14px",
                        borderRadius: 9,
                        background: "rgba(91,233,255,.1)",
                        border: "1px solid rgba(91,233,255,.22)",
                        color: "#b9ecf7",
                        fontSize: 13,
                        fontWeight: 600,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* preference analysis */}
        <div
          style={{
            background: "#14171f",
            border: "1px solid rgba(255,255,255,.07)",
            borderRadius: 22,
            padding: 26,
          }}
        >
          <div
            style={{ fontSize: 16, fontWeight: 700, color: "#eef1f6", marginBottom: 4 }}
          >
            선호도 분석
          </div>
          <div style={{ fontSize: 12, color: "#79828f", marginBottom: 18 }}>
            좋아요한 게임의 장르 비율이에요
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {genreStats.map((gs) => (
              <div key={gs.name}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 6,
                  }}
                >
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#d6dbe4" }}>
                    {gs.name}
                  </span>
                  <span
                    className="font-grotesk"
                    style={{ fontSize: 13, fontWeight: 600, color: "#aeb6c2" }}
                  >
                    {gs.pct}%
                  </span>
                </div>
                <div
                  style={{
                    height: 8,
                    borderRadius: 5,
                    background: "rgba(255,255,255,.06)",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: gs.width,
                      background: gs.color,
                      borderRadius: 5,
                      transformOrigin: "left",
                      animation: "gs-grow .7s cubic-bezier(.4,0,.2,1)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
            {stats.map((s) => (
              <div
                key={s.label}
                style={{
                  flex: 1,
                  textAlign: "center",
                  padding: "13px 0",
                  borderRadius: 12,
                  background: s.bg,
                }}
              >
                <div
                  className="font-grotesk"
                  style={{ fontSize: 21, fontWeight: 700, color: s.color }}
                >
                  {s.value}
                </div>
                <div style={{ fontSize: 11, color: "#8b95a5", marginTop: 2 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* liked grid */}
      {likeCount > 0 ? (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              margin: "8px 0 16px",
            }}
          >
            <span style={{ fontSize: 18, fontWeight: 700, color: "#eef1f6" }}>
              좋아요한 게임
            </span>
            <span
              className="font-grotesk"
              style={{ fontSize: 15, fontWeight: 600, color: "var(--ac)" }}
            >
              {likeCount}
            </span>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 16,
            }}
          >
            {liked.map((game) => (
              <button
                key={game.id}
                onClick={() => onOpenDetail(game)}
                style={{
                  textAlign: "left",
                  borderRadius: 16,
                  overflow: "hidden",
                  background: "#14171f",
                  border: "1px solid rgba(255,255,255,.07)",
                  transition: "transform .12s, border-color .12s",
                }}
                onPointerDown={(e) => {
                  e.currentTarget.style.transform = "scale(.97)";
                }}
                onPointerUp={(e) => {
                  e.currentTarget.style.transform = "none";
                }}
                onPointerEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,.18)";
                }}
                onPointerLeave={(e) => {
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,.07)";
                }}
              >
                <div
                  style={{
                    height: 120,
                    position: "relative",
                    background: artBg(game.genre, cardArt),
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      top: 8,
                      left: 8,
                      padding: "3px 8px",
                      borderRadius: 6,
                      background: "rgba(10,12,17,.5)",
                      fontSize: 10,
                      fontWeight: 700,
                      color: GENRES[game.genre].tag,
                    }}
                  >
                    {game.genre}
                  </span>
                </div>
                <div style={{ padding: "12px 13px 14px" }}>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: "#eef1f6",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {game.title}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: 5,
                    }}
                  >
                    <span
                      className="font-grotesk"
                      style={{ fontSize: 12, color: "#79828f" }}
                    >
                      {game.year}
                    </span>
                    <span
                      className="font-grotesk"
                      style={{ fontSize: 12, color: "#ffd25e" }}
                    >
                      ★ {game.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </>
      ) : (
        <div
          style={{
            textAlign: "center",
            padding: "48px 20px",
            borderRadius: 16,
            background: "#12151d",
            color: "#79828f",
            fontSize: 14,
          }}
        >
          좋아요한 게임이 없어요.
          <br />
          다시 시작해 마음에 드는 게임을 찾아보세요.
        </div>
      )}
    </div>
  );
}
