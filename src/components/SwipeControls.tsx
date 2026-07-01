import type { CSSProperties, ReactNode } from "react";
import type { Choice } from "../types";

function ActionButton({
  onClick,
  size,
  style,
  children,
}: {
  onClick: () => void;
  size: number;
  style: CSSProperties;
  children: ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "transform .12s",
        ...style,
      }}
      onPointerDown={(e) => {
        e.currentTarget.style.transform = "scale(.9)";
      }}
      onPointerUp={(e) => {
        e.currentTarget.style.transform = "none";
      }}
      onPointerLeave={(e) => {
        e.currentTarget.style.transform = "none";
      }}
    >
      {children}
    </button>
  );
}

interface SwipeControlsProps {
  onDecide: (choice: Choice) => void;
  style?: CSSProperties;
}

/** The pass / maybe / like circular action buttons, shared by mobile + desktop. */
export default function SwipeControls({ onDecide, style }: SwipeControlsProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 22,
        ...style,
      }}
    >
      <ActionButton
        onClick={() => onDecide("pass")}
        size={60}
        style={{
          background: "#14171f",
          border: "1.5px solid rgba(255,90,118,.4)",
          color: "#ff5a76",
          fontSize: 24,
          fontWeight: 700,
          boxShadow: "0 8px 22px -10px rgba(255,90,118,.5)",
        }}
      >
        ✕
      </ActionButton>
      <ActionButton
        onClick={() => onDecide("maybe")}
        size={52}
        style={{
          background: "#14171f",
          border: "1.5px solid rgba(245,196,65,.4)",
          color: "#f5c441",
          fontSize: 22,
          fontWeight: 700,
          boxShadow: "0 8px 22px -10px rgba(245,196,65,.5)",
        }}
      >
        ?
      </ActionButton>
      <ActionButton
        onClick={() => onDecide("like")}
        size={60}
        style={{
          background:
            "linear-gradient(135deg, rgba(63,224,138,.16), rgba(63,224,138,.06))",
          border: "1.5px solid rgba(63,224,138,.55)",
          color: "#3fe08a",
          fontSize: 25,
          boxShadow: "0 8px 24px -8px rgba(63,224,138,.6)",
        }}
      >
        ♥
      </ActionButton>
    </div>
  );
}
