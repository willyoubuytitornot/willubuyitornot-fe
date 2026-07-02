# willubuyitornot-fe

살겨말겨 프로젝트 프론트 레포입니다.

**게임 스와이프** — 스와이프 한 번으로 내 취향 게임을 찾는 AI 게임 큐레이션 프로토타입.
온보딩 → 스와이프(좋아요/패스/고민중) → AI 페르소나 리포트 → 게임 상세 흐름으로 이어집니다.
Claude Design의 `게임 스와이프.dc.html` 디자인을 React로 구현했습니다.

## 기술 스택

- **Vite** + **React 18** + **TypeScript**
- 패키지 매니저: **pnpm**
- 폰트: Pretendard, Space Grotesk (CDN)
- 별도 UI 라이브러리 없이 인라인 스타일 + 전역 CSS 키프레임 사용

## 시작하기

```bash
pnpm install
pnpm dev      # 개발 서버 (http://localhost:5173)
pnpm build    # 타입체크 + 프로덕션 빌드 (dist/)
pnpm preview  # 빌드 결과 미리보기
```

## 반응형 동작

브라우저 너비 **920px**를 기준으로 레이아웃이 전환됩니다 ([useViewport.ts](src/hooks/useViewport.ts)).

- **데스크톱 (≥ 920px)** — 상단 헤더 + 멀티컬럼 레이아웃. 스와이프 화면은 좌측 카드 스택 + 우측 상시 AI 분석 패널, 상세는 중앙 모달.
- **모바일 (< 920px)** — 단일 컬럼(최대 520px) 화면. 상세는 전체 화면 전환.

## 화면 흐름

| 화면 | 설명 |
| --- | --- |
| 온보딩 | 닉네임 입력 + 스와이프 방법 안내 |
| 스와이프 | 카드 드래그(좌/우/위) 또는 버튼으로 좋아요·패스·고민중 |
| 결과 | AI 페르소나, 장르 선호도 분석, 좋아요한 게임 그리드 |
| 상세 | 게임별 AI 커뮤니티 요약(긍·부정, 감성 지표, 장단점) |

## 프로젝트 구조

```
src/
├── App.tsx                  # 뷰포트로 데스크톱/모바일 레이아웃 분기
├── main.tsx                 # 엔트리
├── index.css                # 전역 리셋 + 애니메이션 키프레임
├── types.ts                 # 공용 타입
├── hooks/
│   ├── useGameSwipe.ts      # 화면/결정/페르소나 로딩/토스트 상태 로직
│   └── useViewport.ts       # 데스크톱 여부 감지
├── data/
│   ├── games.ts             # 게임·장르·페르소나·액센트 데이터
│   ├── gameView.ts          # 게임 표시 데이터 가공(enrichGame)
│   ├── stats.ts             # 스와이프 결과 집계
│   └── visuals.ts           # 카드 아트 그라디언트 등
├── components/              # 공용 컴포넌트
│   ├── GameCard.tsx         # 드래그 제스처 카드 (edgeInset로 여백 조정)
│   ├── SwipeControls.tsx    # 패스/고민중/좋아요 버튼
│   ├── CommunityAnalysis.tsx
│   ├── GameInfoPanel.tsx    # 데스크톱 상시 AI 분석 패널
│   ├── DesktopHeader.tsx
│   ├── AiBadge.tsx
│   ├── ScreenLayer.tsx      # 화면 전환(크로스페이드) 래퍼
│   └── Toast.tsx
├── layouts/
│   ├── DesktopLayout.tsx
│   ├── MobileLayout.tsx
│   └── common.ts
└── screens/
    ├── OnboardingScreen.tsx # 모바일 화면
    ├── SwipeScreen.tsx
    ├── ResultScreen.tsx
    ├── DetailScreen.tsx
    └── desktop/             # 데스크톱 전용 화면
        ├── OnboardingDesktop.tsx
        ├── SwipeDesktop.tsx
        ├── ResultDesktop.tsx
        └── DetailModal.tsx
```

## 설정값

[App.tsx](src/App.tsx) 상단 상수로 프레젠테이션 옵션을 조정할 수 있습니다 (원래 Claude Design 에디터 props).

- `ACCENT` — 액센트 색상 (`lime` · `emerald` · `cyan`)
- `CARD_ART` — 카드 아트 스타일 (`orbs` · `glyph` · `grid`)
- `SHOW_AI_HINT` — 스와이프 카드의 AI 한줄평 표시 여부

> 게임 데이터는 현재 [games.ts](src/data/games.ts)의 목업입니다. 실제 API 연동은 후속 작업입니다.
