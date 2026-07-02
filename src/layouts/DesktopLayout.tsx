import AppHeader from "../components/AppHeader";
import ScreenLayer from "../components/ScreenLayer";
import DetailModal from "../screens/desktop/DetailModal";
import OnboardingDesktop from "../screens/desktop/OnboardingDesktop";
import ResultDesktop from "../screens/desktop/ResultDesktop";
import SwipeDesktop from "../screens/desktop/SwipeDesktop";
import type { LayoutProps } from "./common";

/** Wide-viewport layout (>= 920px): header + ambient orbs + multi-column screens. */
export default function DesktopLayout({
  state,
  actions,
  cardArt,
  showAiHint,
}: LayoutProps) {
  const trimmed = state.nickname.trim();
  const reportName = state.nickname || "게이머";
  const nickInitial = (trimmed[0] || "G").toUpperCase();
  const showNick = !!trimmed && state.screen !== "onboarding";
  const hasToast = !!state.toast;

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ambient orbs */}
      <div
        style={{
          position: "absolute",
          top: -180,
          left: -130,
          width: 560,
          height: 560,
          borderRadius: "50%",
          background: "radial-gradient(circle, var(--ac), transparent 70%)",
          opacity: 0.06,
          filter: "blur(34px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -220,
          right: -150,
          width: 620,
          height: 620,
          borderRadius: "50%",
          background: "radial-gradient(circle, var(--aig), transparent 70%)",
          opacity: 0.05,
          filter: "blur(44px)",
          pointerEvents: "none",
        }}
      />

      <AppHeader
        showNick={showNick}
        reportName={reportName}
        nickInitial={nickInitial}
        onHome={actions.goHome}
      />

      {/* screen area */}
      <div style={{ flex: 1, position: "relative" }}>
        <ScreenLayer
          active={state.screen === "onboarding"}
          label="온보딩(데스크탑)"
          scroll
        >
          <OnboardingDesktop
            nickname={state.nickname}
            cardArt={cardArt}
            onNickname={actions.setNickname}
            onStart={actions.start}
          />
        </ScreenLayer>

        <ScreenLayer active={state.screen === "swipe"} label="스와이프(데스크탑)">
          <SwipeDesktop
            index={state.index}
            flyingId={state.flyingId}
            flyingDir={state.flyingDir}
            cardArt={cardArt}
            showAiHint={showAiHint}
            onDecide={actions.decide}
          />
        </ScreenLayer>

        <ScreenLayer
          active={state.screen === "result"}
          label="결과(데스크탑)"
          scroll
        >
          <ResultDesktop
            decisions={state.decisions}
            nickname={state.nickname}
            personaReady={state.personaReady}
            personaStep={state.personaStep}
            cardArt={cardArt}
            onOpenDetail={actions.openDetail}
          />
        </ScreenLayer>

        <DetailModal
          active={state.screen === "detail"}
          game={state.selected}
          cardArt={cardArt}
          onBack={actions.back}
          onStore={() => actions.showToast("STOVE 스토어로 이동합니다")}
          onCommunity={() => actions.showToast("커뮤니티로 이동합니다")}
        />
      </div>

      {/* desktop toast */}
      <div
        style={{
          position: "fixed",
          bottom: 36,
          left: "50%",
          transform: `translateX(-50%) translateY(${hasToast ? "0px" : "12px"})`,
          opacity: hasToast ? 1 : 0,
          transition: "all .3s cubic-bezier(.4,0,.2,1)",
          padding: "13px 22px",
          borderRadius: 13,
          background: "rgba(20,24,32,.96)",
          border: "1px solid rgba(255,255,255,.1)",
          color: "#eef1f6",
          fontSize: 13,
          fontWeight: 600,
          zIndex: 90,
          boxShadow: "0 14px 40px -10px rgba(0,0,0,.7)",
          whiteSpace: "nowrap",
          pointerEvents: "none",
        }}
      >
        {state.toast}
      </div>
    </div>
  );
}
