import { FEATURED_STOCKS_BY_THEME, type ThemeStockDefinition } from "./themes/featured-stocks";

export type { ThemeStockDefinition };

// ─── 型定義 ───────────────────────────────────────────────

export type ThemeGroupKey =
  | "ai-semiconductors"
  | "ai-infrastructure"
  | "ai-software-platform"
  | "ai-adoption"
  | "energy-power";

export type ThemeDefinition = {
  slug: string;
  title: string;
  shortDescription: string;
  definition: string;
  whyNow: string;
  comparePoints: string[];
  featuredStocks: ThemeStockDefinition[];
  risks: string[];
  relatedThemes: string[];
};

export type ThemeGroupDefinition = {
  key: ThemeGroupKey;
  title: string;
  description: string;
  themeSlugs: string[];
};

// ─── テーマグループ ───────────────────────────────────────

export const THEME_GROUPS: ThemeGroupDefinition[] = [
  {
    key: "ai-semiconductors",
    title: "AI半導体",
    description:
      "GPU、HBM、ファウンドリ、製造装置など、AI計算の中核を支える企業群を整理する大分類です。",
    themeSlugs: ["ai-semiconductor-stocks", "nvidia-related-stocks"],
  },
  {
    key: "ai-infrastructure",
    title: "AIインフラ",
    description:
      "サーバー、ネットワーク、クラウド、データセンターなど、AIを動かす基盤企業を比較する大分類です。",
    themeSlugs: ["ai-infrastructure-stocks", "data-center-stocks"],
  },
  {
    key: "ai-software-platform",
    title: "AIソフトウェア・プラットフォーム",
    description:
      "AIモデル、クラウド基盤、業務ソフトなど、AIの実装と収益化を支える企業を見やすくまとめた大分類です。",
    themeSlugs: ["ai-related-stocks"],
  },
  {
    key: "ai-adoption",
    title: "AI導入・応用企業",
    description:
      "AIを事業に取り込み、成長ドライバーとして活用する企業を広く比較するための大分類です。",
    themeSlugs: ["ai-related-stocks"],
  },
  {
    key: "energy-power",
    title: "エネルギー・電力インフラ",
    description:
      "AIとデータセンター需要の拡大に伴う電力需要、送配電、設備投資に着目する大分類です。",
    themeSlugs: ["ai-energy-stocks-japan", "data-center-power-stocks-japan"],
  },
];

// ─── テーマメタデータ（featuredStocks を除く）────────────
// 銘柄以外の内容（タイトル・説明・リスクなど）を変更するときはここを編集する。

type ThemeBase = Omit<ThemeDefinition, "featuredStocks">;

const THEME_BASES: ThemeBase[] = [
  {
    slug: "ai-related-stocks",
    title: "AI関連銘柄",
    shortDescription:
      "AI関連銘柄を広く一覧し、半導体、インフラ、ソフトウェア、応用企業まで比較しやすく整理するページです。",
    definition:
      "AI関連銘柄とは、AIモデルの開発、計算基盤、データセンター、ソフトウェア提供、AI活用による事業成長など、AIの普及と投資拡大から恩恵を受ける企業群を指します。",
    whyNow:
      "生成AIの普及により、AI向け半導体だけでなく、データセンター、クラウド、ソフトウェア、電力インフラまで投資対象が広がっています。AI関連株を横断的に整理したいニーズが高まっています。",
    comparePoints: [
      "AI需要との距離の近さ",
      "売上への寄与の大きさ",
      "成長余地と競争優位",
      "バリュエーションの高さ",
    ],
    risks: [
      "AIテーマが広いため、恩恵の強さや収益化の早さに企業ごとの差があります。",
      "期待先行で株価が高くなっている銘柄も多く、短期の値動きが大きくなる場合があります。",
      "AI投資の拡大が実際の売上や利益に反映されるまで時間差がある点に注意が必要です。",
    ],
    relatedThemes: ["ai-semiconductor-stocks", "ai-infrastructure-stocks", "nvidia-related-stocks"],
  },
  {
    slug: "ai-semiconductor-stocks",
    title: "AI半導体銘柄",
    shortDescription:
      "GPU、HBM、ファウンドリ、製造装置など、AI計算基盤を支える半導体関連企業を比較するページです。",
    definition:
      "AI半導体銘柄とは、AI学習・推論向けのGPUやアクセラレータ、メモリ、先端製造、装置供給などに関わる企業群です。",
    whyNow:
      "生成AIの普及で、高性能GPU、HBM、先端パッケージング、EUV露光装置などの重要性が高まっています。AI計算需要の拡大は半導体サプライチェーン全体に波及しています。",
    comparePoints: [
      "AI売上への直接性",
      "技術優位性",
      "顧客集中度",
      "設備投資循環の影響",
      "地政学リスク",
    ],
    risks: [
      "半導体は景気や設備投資サイクルの影響を受けやすく、変動が大きくなりやすい分野です。",
      "中国規制や輸出制限など、地政学要因が業績見通しに影響する可能性があります。",
      "特定顧客への依存が高い企業では、受注動向の変化が業績に反映されやすくなります。",
    ],
    relatedThemes: ["nvidia-related-stocks", "ai-infrastructure-stocks", "data-center-stocks"],
  },
  {
    slug: "ai-infrastructure-stocks",
    title: "AIインフラ銘柄",
    shortDescription:
      "データセンター、サーバー、ネットワーク、通信、クラウド基盤など、AIを動かす土台の企業を比較するページです。",
    definition:
      "AIインフラ銘柄とは、AIモデルを動かすためのサーバー、通信、ストレージ、クラウド、データセンター設備などに関わる企業群です。",
    whyNow:
      "AI需要は半導体だけでなく、サーバー、通信、冷却、クラウド、データセンターの増設投資にも広がっています。AIの普及に伴い、見えにくい基盤企業への関心も高まっています。",
    comparePoints: [
      "データセンター需要とのつながり",
      "サーバー・ネットワーク投資の取り込み余地",
      "クラウドとの関係",
      "継続需要か一過性か",
    ],
    risks: [
      "設備投資が過熱した後には、案件の反動や需要の一服が起こる可能性があります。",
      "大型顧客や少数案件への依存が高い企業では、受注の偏りが目立つ場合があります。",
      "電力・冷却・立地制約によって、計画通りに需要を取り込めないことがあります。",
    ],
    relatedThemes: ["data-center-stocks", "ai-energy-stocks-japan", "ai-semiconductor-stocks"],
  },
  {
    slug: "nvidia-related-stocks",
    title: "NVIDIA関連銘柄",
    shortDescription:
      "NVIDIAを中心としたAI投資拡大の恩恵を受けやすい関連企業を比較するページです。",
    definition:
      "NVIDIA関連銘柄とは、NVIDIA向け供給、NVIDIA製GPU需要の恩恵、周辺設備やインフラ投資の拡大などを通じて、間接的または直接的に恩恵を受ける企業群です。",
    whyNow:
      "AI投資の中心にNVIDIAがあるため、市場ではNVIDIA本体だけでなく、その周辺で恩恵を受ける企業にも注目が集まっています。直接供給先、製造、サーバー、通信、データセンターなど裾野は広いです。",
    comparePoints: [
      "NVIDIA需要との結びつきの強さ",
      "直接恩恵か間接恩恵か",
      "代替競争や依存リスク",
      "サプライチェーン上の立ち位置",
    ],
    risks: [
      "NVIDIA依存が高い企業では、需要変動や供給調整の影響を受けやすくなります。",
      "サプライチェーンの上流と下流では、恩恵が出るタイミングに差が生まれる場合があります。",
      "輸出規制や地政学リスクが、関連企業全体の見通しに影響する可能性があります。",
    ],
    relatedThemes: ["ai-semiconductor-stocks", "ai-infrastructure-stocks", "data-center-stocks"],
  },
  {
    slug: "data-center-stocks",
    title: "データセンター関連銘柄",
    shortDescription:
      "AI時代の計算需要拡大で重要性が増すデータセンター関連企業を比較するページです。",
    definition:
      "データセンター関連銘柄とは、データセンターの運営、設備供給、サーバー設置、通信接続、電力供給などを通じてAI需要拡大の恩恵を受ける企業群です。",
    whyNow:
      "生成AIの普及で計算需要が増え、データセンターの新設・増設が進んでいます。半導体だけでなく、電力、冷却、通信、施設運営を含めた周辺投資にも注目が集まっています。",
    comparePoints: [
      "データセンター投資への直接性",
      "電力・冷却・通信との関係",
      "長期需要の継続性",
      "地域集積と供給制約",
    ],
    risks: [
      "電力制約や立地制約によって、需要があっても供給拡大が進まない可能性があります。",
      "設備投資コストの増加が、収益性や回収期間に影響する場合があります。",
      "需要期待が強い局面では、供給拡大が先行しすぎるリスクにも注意が必要です。",
    ],
    relatedThemes: ["ai-infrastructure-stocks", "ai-energy-stocks-japan", "data-center-power-stocks-japan"],
  },
  {
    slug: "ai-energy-stocks-japan",
    title: "AIで今後伸びるエネルギー企業【日本株中心】",
    shortDescription:
      "AI普及に伴う電力需要増、データセンター増設、脱炭素電源需要の高まりを背景に注目される日本のエネルギー関連株を整理するページです。",
    definition:
      "このテーマでは、AIとデータセンター需要の拡大により、電力、発電、送配電、再生可能エネルギー、電力設備などで恩恵を受ける可能性がある日本株を扱います。",
    whyNow:
      "生成AIやクラウド利用の拡大で、データセンター向けの電力需要増が中長期で意識されています。日本では安定供給、脱炭素、送配電網強化が同時に重要になるため、エネルギー関連企業への注目が高まっています。",
    comparePoints: [
      "AI由来の電力需要とのつながり",
      "発電・送配電・設備のどこに位置するか",
      "脱炭素電源との関係",
      "規制産業としての特性",
      "地域性",
    ],
    risks: [
      "AI需要の拡大がそのまま電力会社の利益成長に直結するとは限りません。",
      "規制、燃料価格、政策変更、再稼働の動向など、テーマ外の要因にも左右されやすい分野です。",
      "純粋なAI株と比べるとテーマ性が伝わりにくく、評価されるまで時間がかかる可能性があります。",
    ],
    relatedThemes: ["data-center-power-stocks-japan", "data-center-stocks", "ai-infrastructure-stocks"],
  },
  {
    slug: "data-center-power-stocks-japan",
    title: "データセンター需要で注目の電力・エネルギー関連株【日本株】",
    shortDescription:
      "データセンター新増設による電力需要増や電力インフラ投資の恩恵が期待される日本株を比較するページです。",
    definition:
      "このテーマでは、データセンターの立地や増設によって恩恵を受ける可能性がある日本の電力、発電、送配電、設備関連企業に絞って整理します。",
    whyNow:
      "データセンター投資ではGPUやサーバーだけでなく、安定した電力供給、受配電設備、送電網、冷却などが大きな論点になります。日本でも首都圏や関西圏を中心に、電力面から注目しやすい銘柄があります。",
    comparePoints: [
      "データセンター需要との距離の近さ",
      "首都圏・関西圏など地域性",
      "発電か送配電か設備か",
      "安定需要か投資循環か",
    ],
    risks: [
      "実際の需要発現や案件化までに時間がかかり、株価反応との時差が出る可能性があります。",
      "需要は地域偏在が大きく、全国一律に恩恵が広がるとは限りません。",
      "電力・エネルギー株特有の規制や市況要因が、AIテーマより大きく影響する場合があります。",
    ],
    relatedThemes: ["ai-energy-stocks-japan", "data-center-stocks", "ai-infrastructure-stocks"],
  },
];

// ─── THEMES（メタ + 銘柄を合成）────────────────────────────

export const THEMES: ThemeDefinition[] = THEME_BASES.map((base) => ({
  ...base,
  featuredStocks: FEATURED_STOCKS_BY_THEME[base.slug] ?? [],
}));

// ─── ヘルパー関数 ─────────────────────────────────────────

export function getThemeBySlug(slug: string): ThemeDefinition | undefined {
  return THEMES.find((theme) => theme.slug === slug);
}

export function getThemeTitle(slug: string): string {
  return getThemeBySlug(slug)?.title ?? slug;
}

export function getAllThemeSlugs(): string[] {
  return THEMES.map((theme) => theme.slug);
}

export function getThemesBySlugs(slugs: string[]): ThemeDefinition[] {
  return slugs
    .map((slug) => getThemeBySlug(slug))
    .filter((theme): theme is ThemeDefinition => theme != null);
}

export function getThemeGroupsForSlug(slug: string): ThemeGroupDefinition[] {
  return THEME_GROUPS.filter((group) => group.themeSlugs.includes(slug));
}
