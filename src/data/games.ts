import type {
  AccentKey,
  Game,
  GenreKey,
  GenreStyle,
  Persona,
} from "../types";

export const GENRES: Record<GenreKey, GenreStyle> = {
  RPG: { a: "#7c3aed", b: "#3b2a8c", tag: "#c9b8fb", glow: "#a78bfa" },
  Action: { a: "#ff3d71", b: "#7a1736", tag: "#ffa3bd", glow: "#ff6b92" },
  Adventure: { a: "#ff9f2e", b: "#a8380e", tag: "#ffd49a", glow: "#ffb44d" },
  Racing: { a: "#2bd4ff", b: "#1a4fcc", tag: "#a9ebff", glow: "#5fe0ff" },
  Strategy: { a: "#19c7a8", b: "#0b5e54", tag: "#a3eedd", glow: "#3fe0c2" },
  Puzzle: { a: "#ff5fa2", b: "#8e1e6b", tag: "#ffb6d6", glow: "#ff85bc" },
  Simulation: { a: "#9be33a", b: "#2e8b2e", tag: "#d7f5a4", glow: "#b6f95a" },
  Horror: { a: "#7e8aa3", b: "#3a0f14", tag: "#c7cfde", glow: "#9aa8c2" },
};

export const PERSONA: Record<GenreKey, Persona> = {
  RPG: {
    title: "신중한 세계관 탐험가",
    desc: "깊은 서사와 선택의 무게를 음미하는 당신. 한 편의 이야기를 끝까지 파고드는 몰입형 플레이어예요.",
    tags: ["#스토리덕후", "#세계관탐험", "#엔딩수집가"],
  },
  Action: {
    title: "본능에 충실한 액션 헌터",
    desc: "손맛과 속도로 스트레스를 날리는 당신. 망설임 없이 부딪히는 직진형 플레이어예요.",
    tags: ["#타격감중독", "#반응속도장인", "#손맛파"],
  },
  Adventure: {
    title: "미지를 향한 개척자",
    desc: "새로운 풍경과 발견의 순간을 사랑하는 당신. 정해진 길보다 나만의 동선을 그리는 탐험가예요.",
    tags: ["#자유로운영혼", "#탐험가", "#발견의기쁨"],
  },
  Racing: {
    title: "한계를 즐기는 스피드광",
    desc: "0.1초를 다투는 짜릿함에 살아나는 당신. 코너 하나에 모든 걸 거는 몰입형 레이서예요.",
    tags: ["#코너링장인", "#기록경신", "#속도중독"],
  },
  Strategy: {
    title: "한 수 앞을 보는 전략가",
    desc: "판을 읽고 설계하는 재미를 아는 당신. 즉흥보다 계획으로 승부하는 두뇌형 플레이어예요.",
    tags: ["#두뇌풀가동", "#계획형", "#판짜기"],
  },
  Puzzle: {
    title: "차분한 두뇌 트레이너",
    desc: "짧고 굵게 머리를 푸는 즐거움을 아는 당신. 틈새 시간을 알차게 채우는 스마트 플레이어예요.",
    tags: ["#짧고굵게", "#두뇌풀가동", "#틈새고수"],
  },
  Simulation: {
    title: "느긋한 일상 수집가",
    desc: "나만의 속도로 세계를 가꾸는 당신. 경쟁보다 편안함을 택하는 힐링형 플레이어예요.",
    tags: ["#힐링러", "#시간순삭", "#나만의속도"],
  },
  Horror: {
    title: "스릴을 쫓는 모험가",
    desc: "심장이 뛰는 긴장감을 즐기는 당신. 무서워도 끝까지 가보는 강심장 플레이어예요.",
    tags: ["#심장쫄깃", "#공포매니아", "#강심장"],
  },
};

export const PERSONA_MSGS = [
  "당신의 게이머 유형을 소환하는 중",
  "플레이 DNA를 분석하는 중",
  "페르소나를 빚어내는 중",
];

export const ACCENT_PAIRS: Record<AccentKey, [string, string]> = {
  lime: ["#bfff4d", "#84e03a"],
  emerald: ["#2fe6a8", "#13b886"],
  cyan: ["#4fe2ff", "#1fb6e6"],
};

export const AI_GLOW = "#5be9ff";

export const GAMES: Game[] = [
  {
    id: "g1",
    title: "Mystic Legends",
    genre: "RPG",
    year: "2024",
    rating: 4.7,
    desc: "광활한 대륙을 누비는 오픈월드 판타지 RPG",
    ai: "초반은 잔잔하지만 후반 서사가 묵직하게 몰아쳐요",
    reviews: 1842,
    positive: 84,
    summary:
      "방대한 세계관과 자유도 높은 탐험을 호평하는 리뷰가 많아요. 다만 초반 진입 속도는 호불호가 갈려요.",
    sentiments: [
      { label: "스토리", pct: 91 },
      { label: "세계관", pct: 88 },
      { label: "초반 템포", pct: 58 },
    ],
    pros: ["깊은 서사", "광활한 탐험"],
    cons: ["느린 초반"],
  },
  {
    id: "g2",
    title: "Cyber Revolution",
    genre: "Action",
    year: "2025",
    rating: 4.4,
    desc: "네온 도시를 질주하는 사이버펑크 액션",
    ai: "타격감이 시원해서 스트레스 풀기 딱 좋아요",
    reviews: 2310,
    positive: 79,
    summary:
      "화려한 연출과 타격감은 압도적이라는 반응이 많아요. 일부는 반복되는 임무 구조를 아쉬워해요.",
    sentiments: [
      { label: "타격감", pct: 93 },
      { label: "그래픽", pct: 90 },
      { label: "콘텐츠 다양성", pct: 52 },
    ],
    pros: ["시원한 타격감", "압도적 비주얼"],
    cons: ["반복되는 임무"],
  },
  {
    id: "g3",
    title: "Last Horizon",
    genre: "Adventure",
    year: "2024",
    rating: 4.6,
    desc: "미지의 신대륙을 개척하는 생존 어드벤처",
    ai: "혼자 탐험하는 고독한 분위기가 묘하게 매력이에요",
    reviews: 1456,
    positive: 81,
    summary:
      "몰입감 있는 분위기와 생존의 긴장감을 즐기는 유저가 많아요. 일부는 높은 난이도를 부담스러워해요.",
    sentiments: [
      { label: "분위기", pct: 89 },
      { label: "몰입감", pct: 85 },
      { label: "난이도", pct: 61 },
    ],
    pros: ["짙은 몰입감", "자유로운 탐험"],
    cons: ["높은 난이도"],
  },
  {
    id: "g4",
    title: "Apex Circuit",
    genre: "Racing",
    year: "2023",
    rating: 4.5,
    desc: "극한의 스피드로 질주하는 본격 레이싱",
    ai: "코너링 손맛이 좋아서 자꾸 다시 하게 돼요",
    reviews: 1203,
    positive: 82,
    summary:
      "정교한 조작감과 코스 디자인을 호평해요. 차량 해금 속도는 다소 느리다는 의견도 있어요.",
    sentiments: [
      { label: "조작감", pct: 90 },
      { label: "코스 디자인", pct: 84 },
      { label: "성장 속도", pct: 55 },
    ],
    pros: ["정교한 조작", "짜릿한 속도감"],
    cons: ["느린 차량 해금"],
  },
  {
    id: "g5",
    title: "Kingdom Tactics",
    genre: "Strategy",
    year: "2023",
    rating: 4.6,
    desc: "전 세계를 무대로 한 실시간 전략 시뮬레이션",
    ai: "머리 쓰는 재미는 깊지만 진입장벽은 살짝 있어요",
    reviews: 987,
    positive: 80,
    summary:
      "전략의 깊이와 밸런스를 높이 평가하는 리뷰가 다수예요. 신규 유저에게는 다소 복잡하다는 의견이에요.",
    sentiments: [
      { label: "전략성", pct: 92 },
      { label: "밸런스", pct: 83 },
      { label: "접근성", pct: 54 },
    ],
    pros: ["깊은 전략성", "탄탄한 밸런스"],
    cons: ["높은 진입장벽"],
  },
  {
    id: "g6",
    title: "Pixel Quest",
    genre: "Puzzle",
    year: "2024",
    rating: 4.3,
    desc: "한 손으로 즐기는 아기자기 캐주얼 퍼즐",
    ai: "출퇴근길에 부담 없이 즐기기 딱이에요",
    reviews: 2680,
    positive: 77,
    summary:
      "간단하지만 중독적인 퍼즐 설계가 강점이에요. 후반부 광고 빈도에 대한 불만도 보여요.",
    sentiments: [
      { label: "중독성", pct: 88 },
      { label: "아트", pct: 81 },
      { label: "광고 빈도", pct: 48 },
    ],
    pros: ["중독적인 퍼즐", "귀여운 아트"],
    cons: ["잦은 광고"],
  },
  {
    id: "g7",
    title: "Verdant Valley",
    genre: "Simulation",
    year: "2025",
    rating: 4.8,
    desc: "나만의 농장을 가꾸는 힐링 라이프 시뮬레이션",
    ai: "잔잔하게 시간 녹이기 좋은 진짜 힐링 게임",
    reviews: 3105,
    positive: 88,
    summary:
      "편안한 분위기와 풍부한 콘텐츠로 만족도가 높아요. 초반 안내가 부족하다는 의견이 일부 있어요.",
    sentiments: [
      { label: "힐링", pct: 95 },
      { label: "콘텐츠", pct: 86 },
      { label: "튜토리얼", pct: 60 },
    ],
    pros: ["편안한 힐링", "풍부한 콘텐츠"],
    cons: ["부족한 초반 안내"],
  },
  {
    id: "g8",
    title: "Shadow Protocol",
    genre: "Horror",
    year: "2024",
    rating: 4.2,
    desc: "폐쇄된 연구시설을 탈출하는 공포 스릴러",
    ai: "심장 쫄깃해지는 순간이 자주 찾아와요",
    reviews: 842,
    positive: 76,
    summary:
      "긴장감 넘치는 연출과 사운드를 호평해요. 다만 플레이 타임이 짧다는 아쉬움이 있어요.",
    sentiments: [
      { label: "공포 연출", pct: 91 },
      { label: "사운드", pct: 87 },
      { label: "볼륨", pct: 49 },
    ],
    pros: ["소름 돋는 연출", "몰입형 사운드"],
    cons: ["짧은 플레이타임"],
  },
  {
    id: "g9",
    title: "Storm Riders",
    genre: "Action",
    year: "2025",
    rating: 4.5,
    desc: "하늘을 가르는 초고속 공중전 액션",
    ai: "스피드와 타격감의 밸런스가 아주 좋아요",
    reviews: 1390,
    positive: 80,
    summary:
      "속도감 있는 공중전과 조작감을 호평해요. 일부는 카메라 워크에 멀미를 느낀다고 해요.",
    sentiments: [
      { label: "속도감", pct: 89 },
      { label: "조작감", pct: 85 },
      { label: "카메라", pct: 57 },
    ],
    pros: ["짜릿한 공중전", "경쾌한 조작"],
    cons: ["멀미 유발 카메라"],
  },
  {
    id: "g10",
    title: "Ember Throne",
    genre: "RPG",
    year: "2025",
    rating: 4.7,
    desc: "왕좌를 둘러싼 다크 판타지 RPG",
    ai: "선택지마다 무게가 느껴지는 스토리텔링",
    reviews: 1574,
    positive: 83,
    summary:
      "선택과 결과가 분명한 서사를 호평해요. 후반 난이도 급상승은 호불호가 갈려요.",
    sentiments: [
      { label: "스토리", pct: 90 },
      { label: "선택의 무게", pct: 87 },
      { label: "후반 난이도", pct: 56 },
    ],
    pros: ["묵직한 선택", "다크 판타지"],
    cons: ["후반 난이도 급상승"],
  },
];

export function getGameById(id: string): Game | undefined {
  return GAMES.find((g) => g.id === id);
}
