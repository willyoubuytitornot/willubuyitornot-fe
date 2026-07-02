import AppHeader from "../components/AppHeader";
import ScreenLayer from "../components/ScreenLayer";
import Toast from "../components/Toast";
import DetailScreen from "../screens/DetailScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import ResultScreen from "../screens/ResultScreen";
import SwipeScreen from "../screens/SwipeScreen";
import type { LayoutProps } from "./common";

/** Single-column app for narrow viewports (< 920px). No device chrome. */
export default function MobileLayout({
  state,
  actions,
  cardArt,
  showAiHint,
}: LayoutProps) {
  const trimmed = state.nickname.trim();
  const reportName = state.nickname || "게이머";
  const nickInitial = (trimmed[0] || "G").toUpperCase();
  const showNick = !!trimmed && state.screen !== "onboarding";

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100dvh",
        maxWidth: 520,
        margin: "0 auto",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <AppHeader
        compact
        showNick={showNick}
        reportName={reportName}
        nickInitial={nickInitial}
        onHome={actions.goHome}
      />

      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        <ScreenLayer
          active={state.screen === "onboarding"}
          label="온보딩"
          scroll
        >
          <OnboardingScreen
            nickname={state.nickname}
            onNickname={actions.setNickname}
            onStart={actions.start}
          />
        </ScreenLayer>

        <ScreenLayer active={state.screen === "swipe"} label="스와이프">
          <SwipeScreen
            index={state.index}
            flyingId={state.flyingId}
            flyingDir={state.flyingDir}
            cardArt={cardArt}
            showAiHint={showAiHint}
            onDecide={actions.decide}
          />
        </ScreenLayer>

        <ScreenLayer active={state.screen === "result"} label="결과" scroll>
          <ResultScreen
            decisions={state.decisions}
            nickname={state.nickname}
            personaReady={state.personaReady}
            personaStep={state.personaStep}
            cardArt={cardArt}
            onOpenDetail={actions.openDetail}
          />
        </ScreenLayer>

        <ScreenLayer
          active={state.screen === "detail"}
          label="상세"
          variant="detail"
          scroll
        >
          <DetailScreen
            game={state.selected}
            cardArt={cardArt}
            onBack={actions.back}
            onStore={() => actions.showToast("STOVE 스토어로 이동합니다")}
            onCommunity={() => actions.showToast("커뮤니티로 이동합니다")}
          />
        </ScreenLayer>
      </div>

      <Toast message={state.toast} />
    </div>
  );
}
