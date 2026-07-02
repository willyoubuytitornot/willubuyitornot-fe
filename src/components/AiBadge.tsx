interface AiBadgeProps {
  label: string;
  note?: string;
  /** render the note in the mono (Space Grotesk) face */
  noteMono?: boolean;
  marginBottom?: number;
}

/** The "✦ label   note" accent badge used across AI panels. */
export default function AiBadge({
  label,
  note,
  noteMono = false,
  marginBottom = 14,
}: AiBadgeProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 7,
        marginBottom,
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
        {label}
      </span>
      {note && (
        <span
          className={noteMono ? "font-grotesk" : undefined}
          style={{ fontSize: 11, color: "#6b7280" }}
        >
          {note}
        </span>
      )}
    </div>
  );
}
