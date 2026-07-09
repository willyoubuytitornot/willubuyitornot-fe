import { GENRES, PERSONA_MSGS } from "../data/games";
import type { ResultData } from "../data/stats";
import { artBg } from "../data/visuals";
import type { CardArt, Game } from "../types";
import ArtImage from "../components/ArtImage";

interface ResultScreenProps {
  result: ResultData | null;
  totalCount: number;
  nickname: string;
  personaReady: boolean;
  personaStep: number;
  cardArt: CardArt;
  onOpenDetail: (game: Game) => void;
}

function PersonaLoading({ message }: { message: string }) {
  return (
    <div style={{ padding: "6px 0 4px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 13,
          marginBottom: 20,
        }}
      >
        <div
          style={{
            position: "relative",
            width: 38,
            height: 38,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              border: "2.5px solid rgba(91,233,255,.14)",
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
              fontSize: 15,
              color: "var(--ac)",
              animation: "gs-spark 2.4s ease-in-out infinite",
            }}
          >
            ✦
          </span>
        </div>
        <div
          style={{
            fontSize: 15,
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
      <div
        style={{
          height: 26,
          width: "62%",
          borderRadius: 8,
          marginBottom: 14,
          background:
            "linear-gradient(90deg, rgba(255,255,255,.05) 25%, rgba(91,233,255,.16) 50%, rgba(255,255,255,.05) 75%)",
          backgroundSize: "240% 100%",
          animation: "gs-skel 1.3s linear infinite",
        }}
      />
      {[{ w: "100%", d: ".15s" }, { w: "80%", d: ".25s" }].map((l) => (
        <div
          key={l.w}
          style={{
            height: 13,
            width: l.w,
            borderRadius: 6,
            marginBottom: l.w === "80%" ? 18 : 8,
            background:
              "linear-gradient(90deg, rgba(255,255,255,.04) 25%, rgba(255,255,255,.12) 50%, rgba(255,255,255,.04) 75%)",
            backgroundSize: "240% 100%",
            animation: "gs-skel 1.3s linear infinite",
            animationDelay: l.d,
          }}
        />
      ))}
      <div style={{ display: "flex", gap: 7 }}>
        {[{ w: 78, d: "0s" }, { w: 94, d: ".12s" }, { w: 70, d: ".22s" }].map(
          (chip) => (
            <div
              key={chip.w}
              style={{
                height: 28,
                width: chip.w,
                borderRadius: 9,
                background:
                  "linear-gradient(90deg, rgba(255,255,255,.04) 25%, rgba(91,233,255,.12) 50%, rgba(255,255,255,.04) 75%)",
                backgroundSize: "240% 100%",
                animation: "gs-skel 1.3s linear infinite",
                animationDelay: chip.d,
              }}
            />
          ),
        )}
      </div>
    </div>
  );
}

function ResultCard({
  game,
  cardArt,
  onOpenDetail,
}: {
  game: Game;
  cardArt: CardArt;
  onOpenDetail: (game: Game) => void;
}) {
  return (
    <button
      onClick={() => onOpenDetail(game)}
      style={{
        textAlign: "left",
        borderRadius: 16,
        overflow: "hidden",
        background: "#14171f",
        border: "1px solid rgba(255,255,255,.07)",
        transition: "transform .12s",
      }}
      onPointerDown={(e) => {
        e.currentTarget.style.transform = "scale(.97)";
      }}
      onPointerUp={(e) => {
        e.currentTarget.style.transform = "none";
      }}
      onPointerLeave={(e) => {
        e.currentTarget.style.transform = "none";
      }}
    >
      <div
        style={{
          height: 96,
          position: "relative",
          overflow: "hidden",
          background: artBg(game.genre, cardArt),
        }}
      >
        <ArtImage genre={game.genre} src={game.imageUrl} />
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
      <div style={{ padding: "10px 11px 12px" }}>
        <div
          style={{
            fontSize: 13.5,
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
            marginTop: 4,
          }}
        >
          <span
            className="font-grotesk"
            style={{ fontSize: 11.5, color: "#79828f" }}
          >
            {game.year}
          </span>
        </div>
      </div>
    </button>
  );
}

export default function ResultScreen({
  result,
  totalCount,
  nickname,
  personaReady,
  personaStep,
  cardArt,
  onOpenDetail,
}: ResultScreenProps) {
  const reportName = nickname || "게이머";
  const personaMsg = PERSONA_MSGS[personaStep] ?? PERSONA_MSGS[0];
  const sections = result
    ? [
        { key: "like", label: "좋아요한 게임", color: "var(--ac)", games: result.liked },
        { key: "maybe", label: "고민중인 게임", color: "#f5c441", games: result.maybe },
        { key: "pass", label: "패스한 게임", color: "#ff5a76", games: result.passed },
      ].filter((s) => s.games.length > 0)
    : [];

  return (
    <div style={{ padding: "8px 22px 40px" }}>
      {/* header */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          marginBottom: 20,
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: 27,
              fontWeight: 800,
              color: "#f1f4f9",
              letterSpacing: "-.8px",
            }}
          >
            총{" "}
            <span className="font-grotesk" style={{ color: "var(--ac)" }}>
              {totalCount}
            </span>
            개 확인
          </h1>
          <p style={{ margin: "6px 0 0", fontSize: 13.5, color: "#8b95a5" }}>
            {reportName}님의 취향 리포트가 완성됐어요
          </p>
        </div>
      </div>

      {/* AI persona hero */}
      <div
        style={{
          position: "relative",
          borderRadius: 20,
          padding: 1.5,
          background:
            "linear-gradient(120deg, var(--ac), var(--aig), var(--ac))",
          backgroundSize: "300% 100%",
          animation: "gs-shimmer 6s linear infinite",
          marginBottom: 22,
          boxShadow: "0 0 44px -14px var(--aig)",
        }}
      >
        <div
          style={{
            borderRadius: 19,
            background: "linear-gradient(160deg, #161b26, #11131a)",
            padding: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              marginBottom: 14,
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
              AI 페르소나
            </span>
            <span style={{ fontSize: 11, color: "#6b7280" }}>
              스와이프 패턴 분석
            </span>
          </div>

          {!result || !personaReady || !result.persona.title ? (
            <PersonaLoading message={personaMsg} />
          ) : (
            <div style={{ animation: "gs-reveal .5s cubic-bezier(.2,.8,.2,1)" }}>
              <h2
                style={{
                  margin: 0,
                  fontSize: 25,
                  fontWeight: 800,
                  color: "#f3f6fb",
                  letterSpacing: "-.6px",
                  lineHeight: 1.2,
                }}
              >
                {result.persona.title}
              </h2>
              <p
                style={{
                  margin: "11px 0 0",
                  fontSize: 13.5,
                  color: "#aab3c1",
                  lineHeight: 1.55,
                }}
              >
                {result.persona.desc}
              </p>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 7,
                  marginTop: 16,
                }}
              >
                {result.persona.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      padding: "6px 12px",
                      borderRadius: 9,
                      background: "rgba(91,233,255,.1)",
                      border: "1px solid rgba(91,233,255,.22)",
                      color: "#b9ecf7",
                      fontSize: 12.5,
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
      {result && (
      <div
        style={{
          background: "#14171f",
          border: "1px solid rgba(255,255,255,.07)",
          borderRadius: 20,
          padding: 18,
          marginBottom: 16,
        }}
      >
        {result.genreStats.length > 0 && (
        <>
        <div
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: "#eef1f6",
            marginBottom: 4,
          }}
        >
          선호도 분석
        </div>
        <div style={{ fontSize: 12, color: "#79828f", marginBottom: 16 }}>
          좋아요한 게임의 장르 비율이에요
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
          {result.genreStats.map((gs) => (
            <div key={gs.name}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 6,
                }}
              >
                <span
                  style={{ fontSize: 13, fontWeight: 600, color: "#d6dbe4" }}
                >
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
        </>
        )}
        <div style={{ display: "flex", gap: 8, marginTop: 18 }}>
          {[
            { value: result.likeCount, label: "좋아요", color: "#3fe08a", bg: "rgba(63,224,138,.1)" },
            { value: result.maybeCount, label: "고민중", color: "#f5c441", bg: "rgba(245,196,65,.1)" },
            { value: result.passCount, label: "패스", color: "#ff5a76", bg: "rgba(255,90,118,.1)" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                flex: 1,
                textAlign: "center",
                padding: "11px 0",
                borderRadius: 12,
                background: stat.bg,
              }}
            >
              <div
                className="font-grotesk"
                style={{ fontSize: 19, fontWeight: 700, color: stat.color }}
              >
                {stat.value}
              </div>
              <div style={{ fontSize: 11, color: "#8b95a5", marginTop: 1 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
      )}

      {/* game lists by decision */}
      {sections.length > 0 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {sections.map((section) => (
            <div key={section.key}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  marginBottom: 13,
                }}
              >
                <span
                  style={{ fontSize: 16, fontWeight: 700, color: "#eef1f6" }}
                >
                  {section.label}
                </span>
                <span
                  className="font-grotesk"
                  style={{ fontSize: 14, fontWeight: 600, color: section.color }}
                >
                  {section.games.length}
                </span>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                }}
              >
                {section.games.map((game) => (
                  <ResultCard
                    key={game.id}
                    game={game}
                    cardArt={cardArt}
                    onOpenDetail={onOpenDetail}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : result ? (
        <div
          style={{
            textAlign: "center",
            padding: "36px 20px",
            borderRadius: 16,
            background: "#12151d",
            color: "#79828f",
            fontSize: 13.5,
          }}
        >
          스와이프한 게임이 없어요.
        </div>
      ) : null}
    </div>
  );
}
