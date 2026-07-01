interface OnboardingScreenProps {
  nickname: string;
  onNickname: (value: string) => void;
  onStart: () => void;
}

interface SwipeRule {
  symbol: string;
  arrow: string;
  color: string;
  bg: string;
  title: string;
  desc: string;
  symbolWeight: number;
}

const RULES: SwipeRule[] = [
  {
    symbol: "✕",
    arrow: "←",
    color: "#ff5a76",
    bg: "rgba(255,90,118,.13)",
    title: "왼쪽으로 — 패스",
    desc: "관심 없는 게임은 넘겨요",
    symbolWeight: 700,
  },
  {
    symbol: "?",
    arrow: "↑",
    color: "#f5c441",
    bg: "rgba(245,196,65,.13)",
    title: "위로 — 고민중",
    desc: "나중에 다시 볼 게임으로",
    symbolWeight: 700,
  },
  {
    symbol: "♥",
    arrow: "→",
    color: "#3fe08a",
    bg: "rgba(63,224,138,.13)",
    title: "오른쪽으로 — 구매",
    desc: "마음에 들면 찜해둬요",
    symbolWeight: 400,
  },
];

export default function OnboardingScreen({
  nickname,
  onNickname,
  onStart,
}: OnboardingScreenProps) {
  const ready = !!nickname.trim();

  return (
    <div
      style={{
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "18px 30px 34px",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 26,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 20,
          }}
        >
          <div
            style={{
              width: 76,
              height: 76,
              borderRadius: 22,
              background: "linear-gradient(150deg, var(--ac), var(--ac2))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 16px 40px -12px var(--ac)",
              animation: "gs-float 5s ease-in-out infinite",
            }}
          >
            <span
              className="font-grotesk"
              style={{
                fontWeight: 700,
                fontSize: 34,
                color: "#0a0c11",
                letterSpacing: -1,
              }}
            >
              GS
            </span>
          </div>
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: 33,
                fontWeight: 800,
                color: "#f1f4f9",
                letterSpacing: -1,
                lineHeight: 1.1,
              }}
            >
              게임 스와이프
            </h1>
            <p
              style={{
                margin: "10px 0 0",
                fontSize: 15,
                color: "#98a2b3",
                lineHeight: 1.5,
              }}
            >
              스와이프 한 번으로 찾는 내 취향 게임.
              <br />
              AI가 당신의 플레이 성향까지 읽어드려요.
            </p>
          </div>
        </div>

        <div>
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
              height: 54,
              borderRadius: 15,
              background: "#14171f",
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
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "#6b7280",
              letterSpacing: ".3px",
            }}
          >
            스와이프 방법
          </span>
          {RULES.map((rule) => (
            <div
              key={rule.title}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 13,
                padding: "13px 15px",
                background: "#12151d",
                borderRadius: 14,
                border: "1px solid rgba(255,255,255,.05)",
              }}
            >
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 12,
                  background: rule.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  color: rule.color,
                  fontSize: 19,
                  fontWeight: rule.symbolWeight,
                }}
              >
                {rule.symbol}
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{ fontSize: 14, fontWeight: 700, color: "#eef1f6" }}
                >
                  {rule.title}
                </div>
                <div
                  style={{ fontSize: 12, color: "#79828f", marginTop: 2 }}
                >
                  {rule.desc}
                </div>
              </div>
              <span style={{ fontSize: 17, color: rule.color }}>
                {rule.arrow}
              </span>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={onStart}
        style={{
          marginTop: 24,
          height: 56,
          borderRadius: 16,
          background: "linear-gradient(135deg, var(--ac), var(--ac2))",
          color: "#0a0c11",
          fontSize: 16,
          fontWeight: 700,
          opacity: ready ? 1 : 0.6,
          transition: "opacity .2s, transform .1s",
          boxShadow: "0 14px 34px -14px var(--ac)",
        }}
        onPointerDown={(e) => {
          e.currentTarget.style.transform = "scale(.98)";
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
  );
}
