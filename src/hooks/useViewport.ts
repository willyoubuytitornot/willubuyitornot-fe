import { useEffect, useState } from "react";

/** Returns true when the viewport width is at or above `breakpoint`. */
export function useIsDesktop(breakpoint = 920): boolean {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth >= breakpoint : true,
  );

  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= breakpoint);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [breakpoint]);

  return isDesktop;
}
