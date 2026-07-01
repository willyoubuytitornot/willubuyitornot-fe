import type { GameView } from "../data/gameView";

interface CommunityAnalysisProps {
  view: GameView;
  /** show the AI summary paragraph above the split bar */
  showSummary?: boolean;
}

/**
 * Positive/negative split + per-aspect sentiment bars + pros/cons tags.
 * Shared by the desktop swipe info panel, desktop detail modal, and mobile detail.
 */
export default function CommunityAnalysis({
  view,
  showSummary = false,
}: CommunityAnalysisProps) {
  return (
    <>
      {showSummary && (
        <p
          style={{
            margin: "0 0 17px",
            fontSize: 14,
            color: "#dfe6ee",
            lineHeight: 1.55,
            fontWeight: 500,
          }}
        >
          {view.summary}
        </p>
      )}

      {/* like / dislike split */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 7,
        }}
      >
        <span style={{ fontSize: 12, fontWeight: 600, color: "#3fe08a" }}>
          긍정 {view.positive}%
        </span>
        <span style={{ fontSize: 12, fontWeight: 600, color: "#ff7a93" }}>
          부정 {view.negative}%
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
            width: view.posWidth,
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
        {view.sentimentsView.map((sv) => (
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
                style={{ fontSize: 12, fontWeight: 600, color: sv.color }}
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
                  width: sv.width,
                  background: sv.color,
                  borderRadius: 4,
                  transformOrigin: "left",
                  animation: "gs-grow .7s cubic-bezier(.4,0,.2,1)",
                }}
              />
            </div>
          </div>
        ))}
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
        {view.pros.map((p) => (
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
        {view.cons.map((c) => (
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
    </>
  );
}
