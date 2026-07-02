interface AppHeaderProps {
  /** show the nickname pill (set + past onboarding) */
  showNick: boolean;
  reportName: string;
  nickInitial: string;
  /** tighter spacing/sizes for the narrow mobile layout */
  compact?: boolean;
  /** click the logo / title to return to the first screen */
  onHome?: () => void;
}

export default function AppHeader({
  showNick,
  reportName,
  nickInitial,
  compact = false,
  onHome,
}: AppHeaderProps) {
  return (
    <header
      style={{
        height: compact ? 56 : 74,
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: compact ? "0 18px" : "0 44px",
        borderBottom: "1px solid rgba(255,255,255,.06)",
        position: "relative",
        zIndex: 40,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: compact ? 10 : 13,
          minWidth: 0,
        }}
      >
        <button
          type="button"
          onClick={onHome}
          aria-label="처음 화면으로"
          style={{
            display: "flex",
            alignItems: "center",
            gap: compact ? 10 : 13,
            background: "none",
            border: "none",
            padding: 0,
            cursor: onHome ? "pointer" : "default",
          }}
        >
          <div
            style={{
              width: compact ? 32 : 38,
              height: compact ? 32 : 38,
              borderRadius: compact ? 9 : 11,
              flexShrink: 0,
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
                fontSize: compact ? 15 : 17,
                color: "#0a0c11",
                letterSpacing: "-.5px",
              }}
            >
              GS
            </span>
          </div>
          <span
            style={{
              fontSize: compact ? 15 : 16,
              fontWeight: 700,
              color: "#eef1f6",
              letterSpacing: "-.3px",
              whiteSpace: "nowrap",
            }}
          >
            게임 스와이프
          </span>
        </button>
        <span
          style={{
            marginLeft: compact ? 2 : 4,
            fontSize: 11,
            fontWeight: 600,
            color: "#7c8696",
            letterSpacing: ".4px",
            padding: "4px 9px",
            borderRadius: 7,
            background: "rgba(255,255,255,.04)",
            whiteSpace: "nowrap",
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
            flexShrink: 0,
            padding: "5px 6px 5px 14px",
            borderRadius: 22,
            background: "rgba(255,255,255,.05)",
            border: "1px solid rgba(255,255,255,.07)",
          }}
        >
          <span
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "#c2cad6",
              whiteSpace: "nowrap",
            }}
          >
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
