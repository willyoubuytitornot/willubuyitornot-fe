/** Placeholder shown in the detail view while GET /games/{id}/insight loads. */
export default function InsightLoading() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        padding: "40px 0",
        color: "#8b95a5",
        fontSize: 13.5,
        fontWeight: 500,
      }}
    >
      <div style={{ position: "relative", width: 30, height: 30 }}>
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
            fontSize: 13,
            color: "var(--ac)",
            animation: "gs-spark 2.4s ease-in-out infinite",
          }}
        >
          ✦
        </span>
      </div>
      AI 인사이트 불러오는 중…
    </div>
  );
}
