import { useEffect, useRef } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { GENRES } from "../data/games";
import { artBg, glyphOf, showGlyph } from "../data/visuals";
import type { CardArt, Choice, Game } from "../types";
import ArtImage from "./ArtImage";

const DRAG_THRESHOLD = 100;

function offscreen(dir: Choice): string {
  return dir === "like"
    ? "translate(150%, -40px) rotate(24deg)"
    : dir === "pass"
      ? "translate(-150%, -40px) rotate(-24deg)"
      : "translate(0, -160%) rotate(0deg)";
}

interface GameCardProps {
  game: Game;
  /** 0 = top, 1, 2 = stacked behind */
  stackIndex: number;
  flying: boolean;
  flyingDir: Choice | null;
  cardArt: CardArt;
  showAi: boolean;
  onDecide: (choice: Choice) => void;
  /** horizontal inset of the card within its stack container (px) */
  edgeInset?: number;
}

export default function GameCard({
  game,
  stackIndex,
  flying,
  flyingDir,
  cardArt,
  showAi,
  onDecide,
  edgeInset = 24,
}: GameCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const dragListenersRef = useRef<{
    move: (ev: PointerEvent) => void;
    end: (ev: PointerEvent) => void;
  } | null>(null);
  const isTop = stackIndex === 0;
  const genreStyle = GENRES[game.genre];

  useEffect(() => {
    return () => {
      const listeners = dragListenersRef.current;
      if (!listeners) return;
      window.removeEventListener("pointermove", listeners.move);
      window.removeEventListener("pointerup", listeners.end);
      window.removeEventListener("pointercancel", listeners.end);
      dragListenersRef.current = null;
    };
  }, []);

  const transform = flying
    ? offscreen(flyingDir ?? "pass")
    : isTop
      ? "translate(0px, 0px) rotate(0deg)"
      : stackIndex === 1
        ? "translateY(16px) scale(.95)"
        : "translateY(32px) scale(.90)";

  const opacity = flying ? 0 : isTop ? 1 : stackIndex === 1 ? 0.9 : 0.75;
  const z = 30 - stackIndex;

  const badge = (name: string) =>
    cardRef.current?.querySelector<HTMLElement>(`[data-badge="${name}"]`) ??
    null;

  const resetBadges = () => {
    ["like", "pass", "maybe"].forEach((b) => {
      const el = badge(b);
      if (el) el.style.opacity = "0";
    });
  };

  const handlePointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!isTop || flying) return;
    const card = cardRef.current;
    if (!card) return;
    card.style.transition = "none";
    const sx = e.clientX;
    const sy = e.clientY;

    const move = (ev: PointerEvent) => {
      const dx = ev.clientX - sx;
      const dy = ev.clientY - sy;
      card.style.transform = `translate(${dx}px, ${dy}px) rotate(${dx * 0.055}deg)`;
      const like = badge("like");
      const pass = badge("pass");
      const maybe = badge("maybe");
      if (like)
        like.style.opacity = String(Math.max(0, Math.min(1, dx / 110)));
      if (pass)
        pass.style.opacity = String(Math.max(0, Math.min(1, -dx / 110)));
      if (maybe)
        maybe.style.opacity = String(
          Math.max(0, Math.min(1, -dy / 110 - Math.abs(dx) / 220)),
        );
    };

    const up = (ev: PointerEvent) => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
      dragListenersRef.current = null;
      const dx = ev.clientX - sx;
      const dy = ev.clientY - sy;
      let choice: Choice | null = null;
      if (dx > DRAG_THRESHOLD) choice = "like";
      else if (dx < -DRAG_THRESHOLD) choice = "pass";
      else if (dy < -DRAG_THRESHOLD) choice = "maybe";

      if (choice) {
        // Keep the dragged transform as the animation start, give it a
        // transition, then let React drive it off-screen via the flying prop.
        card.style.transition =
          "transform .34s ease-in, opacity .34s ease-in";
        onDecide(choice);
      } else {
        card.style.transition = "transform .32s cubic-bezier(.2,.85,.25,1)";
        card.style.transform = "translate(0px, 0px) rotate(0deg)";
        resetBadges();
      }
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    dragListenersRef.current = { move, end: up };
  };

  return (
    <div
      ref={cardRef}
      onPointerDown={isTop ? handlePointerDown : undefined}
      style={{
        position: "absolute",
        top: "50%",
        left: edgeInset,
        right: edgeInset,
        height: 452,
        marginTop: -226,
        borderRadius: 26,
        overflow: "hidden",
        background: "#14171f",
        border: "1px solid rgba(255,255,255,.08)",
        boxShadow: "0 30px 60px -24px rgba(0,0,0,.7)",
        display: "flex",
        flexDirection: "column",
        touchAction: "none",
        transition: "transform .32s cubic-bezier(.2,.8,.2,1), opacity .32s",
        transform,
        opacity,
        zIndex: z,
      }}
    >
      {/* art */}
      <div
        style={{
          height: 256,
          position: "relative",
          flexShrink: 0,
          background: artBg(game.genre, cardArt),
        }}
      >
        <ArtImage genre={game.genre} src={game.imageUrl} />
        {showGlyph(cardArt) && (
          <span
            className="font-grotesk"
            style={{
              position: "absolute",
              right: 8,
              bottom: -34,
              fontSize: 200,
              fontWeight: 700,
              color: "rgba(255,255,255,.16)",
              lineHeight: 1,
              letterSpacing: -8,
            }}
          >
            {glyphOf(game.genre)}
          </span>
        )}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(20,23,31,.55), transparent 45%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 14,
            left: 14,
            display: "flex",
            gap: 7,
          }}
        >
          <span
            style={{
              padding: "5px 11px",
              borderRadius: 8,
              background: "rgba(10,12,17,.5)",
              backdropFilter: "blur(6px)",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: ".4px",
              color: genreStyle.tag,
            }}
          >
            {game.genre}
          </span>
          <span
            className="font-grotesk"
            style={{
              padding: "5px 11px",
              borderRadius: 8,
              background: "rgba(10,12,17,.5)",
              backdropFilter: "blur(6px)",
              fontSize: 11,
              fontWeight: 600,
              color: "#e6e9ef",
            }}
          >
            {game.year}
          </span>
        </div>
        {/* drag badges (top card only) */}
        {isTop && (
          <>
            <div
              data-badge="like"
              style={{
                position: "absolute",
                top: 26,
                left: 22,
                padding: "7px 16px",
                border: "3px solid #3fe08a",
                borderRadius: 12,
                color: "#3fe08a",
                fontSize: 22,
                fontWeight: 800,
                transform: "rotate(-15deg)",
                opacity: 0,
                letterSpacing: 1,
              }}
            >
              좋아요
            </div>
            <div
              data-badge="pass"
              style={{
                position: "absolute",
                top: 26,
                right: 22,
                padding: "7px 16px",
                border: "3px solid #ff5a76",
                borderRadius: 12,
                color: "#ff5a76",
                fontSize: 22,
                fontWeight: 800,
                transform: "rotate(15deg)",
                opacity: 0,
                letterSpacing: 1,
              }}
            >
              패스
            </div>
            <div
              data-badge="maybe"
              style={{
                position: "absolute",
                left: "50%",
                bottom: 18,
                transform: "translateX(-50%)",
                padding: "7px 16px",
                border: "3px solid #f5c441",
                borderRadius: 12,
                color: "#f5c441",
                fontSize: 20,
                fontWeight: 800,
                opacity: 0,
                letterSpacing: 1,
              }}
            >
              고민중
            </div>
          </>
        )}
      </div>

      {/* info */}
      <div
        style={{
          flex: 1,
          padding: "16px 18px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: 21,
            fontWeight: 800,
            color: "#f1f4f9",
            letterSpacing: "-.5px",
          }}
        >
          {game.title}
        </h2>
        {game.desc && (
          <p
            style={{
              margin: "7px 0 0",
              fontSize: 13.5,
              color: "#98a2b3",
              lineHeight: 1.45,
            }}
          >
            {game.desc}
          </p>
        )}
        {showAi && (
          <div
            style={{
              marginTop: "auto",
              padding: "11px 13px",
              borderRadius: 13,
              background:
                "linear-gradient(135deg, rgba(91,233,255,.08), rgba(191,255,77,.06))",
              border: "1px solid rgba(91,233,255,.18)",
              animation: "gs-aiglow 4s ease-in-out infinite",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginBottom: 5,
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  padding: "2px 8px",
                  borderRadius: 6,
                  background:
                    "linear-gradient(135deg, var(--ac), var(--aig))",
                  color: "#0a0c11",
                  fontSize: 10,
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
                AI 한줄평
              </span>
            </div>
            <p
              style={{
                margin: 0,
                fontSize: 13,
                color: "#d5e8ef",
                lineHeight: 1.4,
                fontWeight: 500,
              }}
            >
              {game.ai}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
