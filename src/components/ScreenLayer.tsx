import type { CSSProperties, ReactNode, Ref } from "react";

interface ScreenLayerProps {
  active: boolean;
  label: string;
  /** "detail" slides in from the right; others fade/scale. */
  variant?: "default" | "detail";
  scroll?: boolean;
  children: ReactNode;
  rootRef?: Ref<HTMLElement>;
  style?: CSSProperties;
}

export default function ScreenLayer({
  active,
  label,
  variant = "default",
  scroll = false,
  children,
  rootRef,
  style,
}: ScreenLayerProps) {
  const transform = active
    ? "translateY(0) scale(1)"
    : variant === "detail"
      ? "translateX(32px)"
      : "scale(.985)";

  return (
    <section
      ref={rootRef}
      data-screen-label={label}
      className={scroll ? "gs-scroll" : undefined}
      style={{
        position: "absolute",
        inset: 0,
        transition:
          "opacity .5s cubic-bezier(.4,0,.2,1), transform .5s cubic-bezier(.4,0,.2,1)",
        opacity: active ? 1 : 0,
        transform,
        pointerEvents: active ? "auto" : "none",
        ...style,
      }}
    >
      {children}
    </section>
  );
}
