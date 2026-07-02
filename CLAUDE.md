# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager is **pnpm** (declared in `packageManager`; do not use npm/yarn).

```bash
pnpm install
pnpm dev      # Vite dev server at http://localhost:5173
pnpm build    # tsc --noEmit && vite build  →  dist/
pnpm preview  # serve the production build
```

There is no test runner, linter, or CI configured. `pnpm build` (type-check + bundle) is the only quality gate — run it after changes. `build` intentionally uses `tsc --noEmit` with a single flat `tsconfig.json` (no project references / composite), so type errors fail the build without emitting.

## Origin

This is a faithful React port of a Claude Design prototype (`게임 스와이프.dc.html`). The original was a single `.dc.html` React-class-component bound to a proprietary runtime; the visual design, mock data, and interaction logic here mirror it. When editing, preserve the exact colors, spacing, and animation timings unless asked to change them.

## Architecture

**One state hook, two layout trees.** `useGameSwipe` ([src/hooks/useGameSwipe.ts](src/hooks/useGameSwipe.ts)) owns *all* app state (screen, nickname, deck index, decisions, selected game, persona-loading, toast) and returns `{ state, actions }`. [src/App.tsx](src/App.tsx) picks a layout by viewport width via `useIsDesktop(920)` and passes the same `state`/`actions` bundle (`LayoutProps` in [src/layouts/common.ts](src/layouts/common.ts)) to either `DesktopLayout` or `MobileLayout`. The two layouts render different screen components but share the hook, so behavior stays identical across breakpoints — never fork state logic into a layout or screen.

**Screens are cross-faded layers, not routes.** Each screen is a `<ScreenLayer>` ([src/components/ScreenLayer.tsx](src/components/ScreenLayer.tsx)) absolutely positioned at `inset:0`; the active one fades/scales in while others stay mounted at `opacity:0`. There is no router. The desktop **detail** view is the exception: it's a modal overlay (`DetailModal`), not a layer.

**The card fly-out is a hybrid imperative/React dance — this is the subtle part.** In [src/components/GameCard.tsx](src/components/GameCard.tsx), pointer dragging mutates the card's `transform` and badge opacities imperatively (with `transition:none`) for smoothness. On release past threshold — or on a button press — the decision goes through React state: `actions.decide(choice)` sets `flyingId`/`flyingDir`, and after 340ms `commit` advances the index. React re-renders the off-screen transform so a **reused** DOM node (keyed by `game.id`, cards shift up the stack as the index advances) never gets stuck with a stale imperative transform. If you touch drag/animation, keep the commit path flowing through state, not raw DOM.

**Desktop ≠ scaled mobile.** Desktop (`≥920px`) is a genuinely different composition: a top header, ambient orbs, a two-column swipe screen with a *persistent* AI info panel beside the deck (`GameInfoPanel`), a wider result grid, and the detail modal. Mobile is a single ≤520px column. Desktop-specific screens live in [src/screens/desktop/](src/screens/desktop/); mobile screens in [src/screens/](src/screens/).

**Shared pieces are parametrized rather than duplicated.** `GameCard` takes `edgeInset` (24 on mobile, 0 in the desktop grid). `CommunityAnalysis`, `SwipeControls`, `AiBadge`, and `enrichGame` are reused by both layouts. Prefer extending these over copying markup.

## Data & theming

- [src/data/games.ts](src/data/games.ts) — mock `GAMES`, `GENRES` (per-genre gradient colors), `PERSONA`, accent pairs. This is the only data source; real API wiring is future work.
- [src/data/gameView.ts](src/data/gameView.ts) `enrichGame` — turns a `Game` into display fields (formatted rating/reviews, sentiment bar widths/colors, art background). Detail views and the desktop info panel consume this.
- [src/data/stats.ts](src/data/stats.ts) `summarize` — aggregates swipe decisions into like/pass/maybe counts, genre distribution, and the dominant-genre persona shown on the result screen.
- [src/data/visuals.ts](src/data/visuals.ts) — `artBg` builds layered CSS gradients per genre + `cardArt` style.

**Theming is CSS custom properties.** App.tsx sets `--ac` / `--ac2` (accent pair) and `--aig` (AI glow) on the root; components reference `var(--ac)` etc. rather than hardcoding accent colors. Presentation constants `ACCENT`, `CARD_ART`, `SHOW_AI_HINT` at the top of App.tsx were the original Claude Design editor props — change them there.

**Styling convention:** inline `style` objects throughout (matching the ported design), plus a small set of utilities/keyframes in [src/index.css](src/index.css) — `font-grotesk` (Space Grotesk face), `gs-scroll` (hidden scrollbars), and the `gs-*` animation keyframes referenced by `animation:` inline styles.
