interface ResumeDialogProps {
  open: boolean;
  compact: boolean;
  nickname: string;
  onConfirm: () => void;
  onDismiss: () => void;
}

/** Entry prompt for a returning voter: revisit their AI persona report, or start
 *  over. Mirrors the Claude Design "이미 완성된 취향 리포트가 있어요" dialog. */
export default function ResumeDialog({
  open,
  compact,
  nickname,
  onConfirm,
  onDismiss,
}: ResumeDialogProps) {
  const who = nickname.trim() || "게이머";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        background: "rgba(6,8,12,.62)",
        backdropFilter: "blur(7px)",
        opacity: open ? 1 : 0,
        pointerEvents: open ? "auto" : "none",
        transition: "opacity .32s cubic-bezier(.4,0,.2,1)",
      }}
    >
      {/* gradient border */}
      <div
        style={{
          width: compact ? "100%" : 420,
          maxWidth: compact ? 340 : "calc(100vw - 48px)",
          borderRadius: compact ? 22 : 24,
          padding: 1.5,
          background:
            "linear-gradient(120deg, var(--ac), var(--aig), var(--ac))",
          backgroundSize: "300% 100%",
          animation: "gs-shimmer 6s linear infinite",
          boxShadow: "0 40px 100px -30px rgba(0,0,0,.7)",
          transform: open ? "translateY(0) scale(1)" : "translateY(10px) scale(.97)",
          transition: "transform .32s cubic-bezier(.2,.8,.2,1)",
        }}
      >
        <div
          style={{
            borderRadius: compact ? 21 : 23,
            background: "linear-gradient(160deg, #161b26, #11131a)",
            padding: compact ? "30px 26px 24px" : "34px 32px 28px",
            textAlign: "center",
          }}
        >
          {/* orbit spinner */}
          <div
            style={{
              position: "relative",
              width: 56,
              height: 56,
              margin: "0 auto 20px",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                border: "3px solid rgba(91,233,255,.14)",
                borderTopColor: "var(--aig)",
                animation: "gs-orbit 1.1s linear infinite",
              }}
            />
            <span
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                color: "var(--ac)",
                animation: "gs-spark 2.4s ease-in-out infinite",
              }}
            >
              ✦
            </span>
          </div>

          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              padding: "5px 12px",
              borderRadius: 8,
              background: "linear-gradient(135deg, var(--ac), var(--aig))",
              color: "#0a0c11",
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: ".5px",
              marginBottom: 14,
            }}
          >
            AI 페르소나 발견
          </span>
          <h2
            style={{
              margin: "4px 0 0",
              fontSize: compact ? 18 : 21,
              fontWeight: 800,
              color: "#f3f6fb",
              letterSpacing: compact ? "-.4px" : "-.5px",
            }}
          >
            이미 완성된 취향 리포트가 있어요
          </h2>
          <p
            style={{
              margin: compact ? "10px 0 0" : "12px 0 0",
              fontSize: compact ? 13 : 14,
              color: "#aab3c1",
              lineHeight: compact ? 1.5 : 1.55,
            }}
          >
            {who}님, 예전에 분석한 AI 페르소나를 다시 볼까요?
          </p>
          <div
            style={{ display: "flex", gap: 10, marginTop: compact ? 22 : 26 }}
          >
            <button
              onClick={onDismiss}
              style={{
                flex: 1,
                height: compact ? 46 : 50,
                borderRadius: compact ? 13 : 14,
                background: "rgba(255,255,255,.06)",
                border: "1px solid rgba(255,255,255,.1)",
                color: "#c2cad6",
                fontSize: compact ? 13 : 14,
                fontWeight: 600,
              }}
            >
              새로 시작
            </button>
            <button
              onClick={onConfirm}
              style={{
                flex: 1.3,
                height: compact ? 46 : 50,
                borderRadius: compact ? 13 : 14,
                background: "linear-gradient(135deg, var(--ac), var(--ac2))",
                color: "#0a0c11",
                fontSize: compact ? 13 : 14,
                fontWeight: 700,
                boxShadow: compact
                  ? "0 12px 28px -12px var(--ac)"
                  : "0 14px 32px -14px var(--ac)",
              }}
            >
              결과 보기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
