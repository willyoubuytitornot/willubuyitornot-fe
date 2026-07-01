import { GENRES, GAMES } from "../../data/games";
import { artBg } from "../../data/visuals";
import type { CardArt } from "../../types";

interface OnboardingDesktopProps {
  nickname: string;
  cardArt: CardArt;
  onNickname: (value: string) => void;
  onStart: () => void;
}

const FEATURES = [
  {
    symbol: "✕",
    color: "#ff5a76",
    bg: "rgba(255,90,118,.13)",
    title: "왼쪽 — 패스",
    desc: "관심 없는 게임은 넘겨요",
    weight: 700,
  },
  {
    symbol: "?",
    color: "#f5c441",
    bg: "rgba(245,196,65,.13)",
    title: "위로 — 고민중",
    desc: "나중에 다시 볼 게임으로",
    weight: 700,
  },
  {
    symbol: "♥",
    color: "#3fe08a",
    bg: "rgba(63,224,138,.13)",
    title: "오른쪽 — 구매",
    desc: "마음에 들면 찜해둬요",
    weight: 400,
  },
];

export default function OnboardingDesktop({
  nickname,
  cardArt,
  onNickname,
  onStart,
}: OnboardingDesktopProps) {
  const ready = !!nickname.trim();
  const sampleCards = GAMES.slice(0, 3);

  return (
    <div
      style={{
        minHeight: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "56px 48px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1060,
          display: "grid",
          gridTemplateColumns: "1.05fr .95fr",
          gap: 60,
          alignItems: "center",
        }}
      >
        {/* left: hero */}
        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <span
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "var(--ac)",
              letterSpacing: ".6px",
            }}
          >
            STOVE · AI 게임 큐레이션
          </span>
          <h1
            style={{
              margin: 0,
              fontSize: 52,
              fontWeight: 800,
              color: "#f1f4f9",
              letterSpacing: -2,
              lineHeight: 1.08,
            }}
          >
            스와이프 한 번으로
            <br />
            찾는 내 취향 게임
          </h1>
          <p
            style={{
              margin: 0,
              fontSize: 16,
              color: "#98a2b3",
              lineHeight: 1.6,
              maxWidth: 430,
            }}
          >
            관심 가는 게임은 오른쪽으로, 아닌 건 왼쪽으로. AI가 당신의 플레이
            성향까지 읽어 딱 맞는 게임을 추천해드려요.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 12,
              marginTop: 6,
            }}
          >
            {FEATURES.map((f) => (
              <div
                key={f.title}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 9,
                  padding: 16,
                  background: "#12151d",
                  borderRadius: 16,
                  border: "1px solid rgba(255,255,255,.05)",
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 11,
                    background: f.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: f.color,
                    fontSize: 18,
                    fontWeight: f.weight,
                  }}
                >
                  {f.symbol}
                </div>
                <div
                  style={{ fontSize: 13, fontWeight: 700, color: "#eef1f6" }}
                >
                  {f.title}
                </div>
                <div
                  style={{ fontSize: 11.5, color: "#79828f", lineHeight: 1.4 }}
                >
                  {f.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* right: form card */}
        <div
          style={{
            background: "linear-gradient(160deg, #161b26, #11131a)",
            border: "1px solid rgba(255,255,255,.08)",
            borderRadius: 28,
            padding: 34,
            boxShadow: "0 50px 120px -50px rgba(0,0,0,.7)",
          }}
        >
          <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
            {sampleCards.map((g) => (
              <div
                key={g.id}
                style={{
                  flex: 1,
                  height: 84,
                  borderRadius: 12,
                  position: "relative",
                  overflow: "hidden",
                  background: artBg(g.genre, cardArt),
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    bottom: 7,
                    left: 8,
                    fontSize: 10,
                    fontWeight: 700,
                    color: GENRES[g.genre].tag,
                  }}
                >
                  {g.genre}
                </span>
              </div>
            ))}
          </div>
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "#6b7280",
              letterSpacing: ".3px",
              marginBottom: 18,
            }}
          >
            엄선된 게임이 당신의 선택을 기다려요
          </div>
          <label
            style={{
              display: "block",
              fontSize: 12,
              fontWeight: 600,
              color: "#6b7280",
              letterSpacing: ".3px",
              marginBottom: 9,
            }}
          >
            닉네임
          </label>
          <input
            value={nickname}
            onChange={(e) => onNickname(e.target.value)}
            placeholder="어떻게 불러드릴까요?"
            maxLength={12}
            style={{
              width: "100%",
              height: 56,
              borderRadius: 15,
              background: "#0f121a",
              border: "1.5px solid rgba(255,255,255,.08)",
              padding: "0 18px",
              color: "#f1f4f9",
              fontSize: 16,
              outline: "none",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "var(--ac)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,.08)";
            }}
          />
          <button
            onClick={onStart}
            style={{
              marginTop: 18,
              width: "100%",
              height: 58,
              borderRadius: 16,
              background: "linear-gradient(135deg, var(--ac), var(--ac2))",
              color: "#0a0c11",
              fontSize: 16,
              fontWeight: 700,
              opacity: ready ? 1 : 0.6,
              transition: "opacity .2s, transform .1s",
              boxShadow: "0 16px 38px -16px var(--ac)",
            }}
            onPointerDown={(e) => {
              e.currentTarget.style.transform = "scale(.99)";
            }}
            onPointerUp={(e) => {
              e.currentTarget.style.transform = "none";
            }}
            onPointerLeave={(e) => {
              e.currentTarget.style.transform = "none";
            }}
          >
            시작하기
          </button>
        </div>
      </div>
    </div>
  );
}
