interface DesktopHeaderProps {
  /** show the nickname pill (set + past onboarding) */
  showNick: boolean;
  reportName: string;
  nickInitial: string;
}

export default function DesktopHeader({
  showNick,
  reportName,
  nickInitial,
}: DesktopHeaderProps) {
  return (
    <header
      style={{
        height: 74,
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 44px",
        borderBottom: "1px solid rgba(255,255,255,.06)",
        position: "relative",
        zIndex: 40,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 11,
            background: "linear-gradient(150deg, var(--ac), var(--ac2))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 8px 22px -8px var(--ac)",
          }}
        >
          <span
            className="font-grotesk"
            style={{
              fontWeight: 700,
              fontSize: 17,
              color: "#0a0c11",
              letterSpacing: "-.5px",
            }}
          >
            GS
          </span>
        </div>
        <span
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: "#eef1f6",
            letterSpacing: "-.3px",
          }}
        >
          게임 스와이프
        </span>
        <span
          style={{
            marginLeft: 4,
            fontSize: 11,
            fontWeight: 600,
            color: "#7c8696",
            letterSpacing: ".4px",
            padding: "4px 9px",
            borderRadius: 7,
            background: "rgba(255,255,255,.04)",
          }}
        >
          AI 큐레이션
        </span>
      </div>

      {showNick && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 9,
            padding: "5px 6px 5px 14px",
            borderRadius: 22,
            background: "rgba(255,255,255,.05)",
            border: "1px solid rgba(255,255,255,.07)",
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 600, color: "#c2cad6" }}>
            {reportName}
          </span>
          <span
            className="font-grotesk"
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: "linear-gradient(135deg, var(--ac), var(--ac2))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 13,
              fontWeight: 700,
              color: "#0a0c11",
            }}
          >
            {nickInitial}
          </span>
        </div>
      )}
    </header>
  );
}
