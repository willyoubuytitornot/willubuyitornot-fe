interface ToastProps {
  message: string;
}

export default function Toast({ message }: ToastProps) {
  const visible = !!message;
  return (
    <div
      style={{
        position: "absolute",
        bottom: 30,
        left: "50%",
        transform: `translateX(-50%) translateY(${visible ? "0px" : "12px"})`,
        opacity: visible ? 1 : 0,
        transition: "all .3s cubic-bezier(.4,0,.2,1)",
        padding: "12px 20px",
        borderRadius: 13,
        background: "rgba(20,24,32,.95)",
        border: "1px solid rgba(255,255,255,.1)",
        color: "#eef1f6",
        fontSize: 13,
        fontWeight: 600,
        zIndex: 80,
        boxShadow: "0 14px 40px -10px rgba(0,0,0,.7)",
        whiteSpace: "nowrap",
        pointerEvents: "none",
      }}
    >
      {message}
    </div>
  );
}
