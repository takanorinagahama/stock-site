export type ThemeGroupKey =
  | "ai-semiconductors"
  | "ai-infrastructure"
  | "ai-software-platform"
  | "ai-adoption"
  | "energy-power";

export type ThemeStockDefinition = {
  ticker: string;
  summary: string;
  positioning: string;
};

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

export const THEMES: ThemeDefinition[] = [
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
    featuredStocks: [
      {
        ticker: "NVDA",
        summary: "AI計算需要の中心に位置する代表銘柄。",
        positioning:
          "AI関連銘柄を語るうえで中心に置かれやすい企業です。GPU需要の強さがテーマ全体の温度感を左右しやすく、半導体だけでなく周辺インフラ銘柄の比較軸にもなります。",
      },
      {
        ticker: "MSFT",
        summary: "OpenAI連携とクラウド基盤を通じてAI収益化を進める大手。",
        positioning:
          "AIを単独事業としてではなく、クラウド、業務ソフト、検索支援など複数の収益源に組み込める点が特徴です。AI関連株の中では基盤とアプリの両面を持つ存在として整理しやすい銘柄です。",
      },
      {
        ticker: "GOOGL",
        summary: "モデル、クラウド、検索、防衛線の広さが特徴。",
        positioning:
          "検索や広告の既存事業を持ちながら、生成AIモデルとクラウド基盤も展開しているため、AI関連銘柄の中でも事業の広がりが大きい企業です。守りと攻めの両面で比較しやすい位置づけです。",
      },
      {
        ticker: "AMD",
        summary: "GPUとCPUの両面でAIサーバー需要を取り込む追随候補。",
        positioning:
          "AI向けGPUで先行する企業を追う立場ですが、CPUも含めたサーバー領域で比較しやすい銘柄です。AI需要が広がる中で、採用先の増加がどこまで進むかが見どころになります。",
      },
      {
        ticker: "PLTR",
        summary: "AI活用ソフトウェアの現場実装で注目される企業。",
        positioning:
          "AIのモデル開発よりも、現場で使えるソフトウェアや業務導入の文脈で見られる銘柄です。半導体中心のAIテーマとは異なる切り口で比較価値を出しやすい企業です。",
      },
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
    featuredStocks: [
      {
        ticker: "NVDA",
        summary: "AI向けGPU需要の中心。",
        positioning:
          "AI半導体テーマの中心に位置する企業で、需要の勢いがサプライチェーン全体の強さを測る基準にもなります。製品競争力と供給能力の両面で見られやすい銘柄です。",
      },
      {
        ticker: "AMD",
        summary: "AI向けGPUで追い上げる競合。",
        positioning:
          "追随側として比較されることが多く、採用先の拡大や製品世代の進み方が焦点になります。AI半導体テーマではシェア拡大余地を見る銘柄として位置づけやすいです。",
      },
      {
        ticker: "TSM",
        summary: "先端半導体製造の受け皿。",
        positioning:
          "設計企業ではなく製造面の要となる企業で、AI向け先端チップの量産能力を握る存在です。サプライチェーンの中流で見ても外せない比較対象です。",
      },
      {
        ticker: "ASML",
        summary: "先端製造に不可欠なEUV装置供給企業。",
        positioning:
          "半導体そのものではなく製造装置の側からAI需要の恩恵を受ける企業です。設備投資サイクルや先端プロセス投資の継続性を見たいときに重要な銘柄です。",
      },
      {
        ticker: "8035.T",
        summary: "半導体製造装置分野で重要な日本株。",
        positioning:
          "日本株の中ではAI半導体の裾野需要を捉えやすい代表格です。EUVとは違う工程面から、先端製造投資の広がりを比較する役割を持ちます。",
      },
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
    featuredStocks: [
      {
        ticker: "SMCI",
        summary: "AIサーバー需要の拡大を映しやすい企業。",
        positioning:
          "GPU需要の増加がサーバー実装に広がる局面で比較されやすい企業です。AI半導体とデータセンター投資の間をつなぐ存在として整理できます。",
      },
      {
        ticker: "ANET",
        summary: "高速ネットワーク機器でAIクラスタ需要に関与。",
        positioning:
          "AIクラスタ同士をつなぐ通信インフラ側の代表銘柄です。計算能力だけでなく、通信ボトルネックの解消が重要になる局面で比較価値が高まります。",
      },
      {
        ticker: "EQIX",
        summary: "データセンター基盤を提供する代表銘柄。",
        positioning:
          "施設運営の側からAI需要の広がりを見るための代表例です。設備・拠点・接続性といった観点で、純粋な半導体企業とは異なる比較軸を提供します。",
      },
      {
        ticker: "MSFT",
        summary: "クラウドとAI基盤の両面を持つ。",
        positioning:
          "クラウド事業の中でAI計算資源を提供できるため、インフラとアプリの両面で比較される存在です。単体の設備銘柄より収益源が広い点も特徴です。",
      },
      {
        ticker: "GOOGL",
        summary: "クラウドとAI計算資源の両輪で関与。",
        positioning:
          "自社モデルとクラウド基盤の双方を持ち、AIインフラ需要を取り込みやすい企業です。広告や検索の既存事業とのバランスも比較ポイントになります。",
      },
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
    featuredStocks: [
      {
        ticker: "NVDA",
        summary: "テーマの中心そのもの。",
        positioning:
          "NVIDIA関連銘柄の出発点であり、テーマ全体の評価軸そのものです。製品需要、競争環境、供給制約の変化が周辺企業にも波及しやすい点が特徴です。",
      },
      {
        ticker: "TSM",
        summary: "NVIDIA向け先端製造の重要な受け皿。",
        positioning:
          "NVIDIA向けの先端製造能力を担う企業として、関連テーマの中でも重要度が高い存在です。NVIDIA本体の成長がどこまで製造側に波及するかを見る比較先になります。",
      },
      {
        ticker: "ASML",
        summary: "先端製造能力の背景を支える装置企業。",
        positioning:
          "NVIDIAへ直接売るわけではありませんが、先端プロセス投資の基盤を支える企業です。サプライチェーン上流からテーマに参加する代表例として整理できます。",
      },
      {
        ticker: "SMCI",
        summary: "NVIDIA GPU搭載サーバー需要の受益候補。",
        positioning:
          "GPUを載せるサーバー需要の面から関連性が高い企業です。NVIDIAの需要が実機導入やクラスタ増設に広がる局面で比較しやすい銘柄です。",
      },
      {
        ticker: "ANET",
        summary: "AIクラスタ間通信のネットワーク面で関連。",
        positioning:
          "NVIDIA GPUを活用したAIクラスタの通信需要を支える企業として関連づけやすい存在です。演算そのものではなく周辺通信の重要性を確認する比較軸になります。",
      },
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
    featuredStocks: [
      {
        ticker: "EQIX",
        summary: "データセンター運営の代表格。",
        positioning:
          "施設運営を主軸にデータセンター需要を捉える代表銘柄です。設備投資の持続性や立地優位性を見る際の基準として使いやすい企業です。",
      },
      {
        ticker: "DLR",
        summary: "大規模施設運営の代表格。",
        positioning:
          "大規模なデータセンター需要を施設面から捉える比較対象です。運営モデルや顧客構成の違いを EQIX などと見比べやすい銘柄です。",
      },
      {
        ticker: "SMCI",
        summary: "データセンター向けサーバー需要の反映先。",
        positioning:
          "施設そのものではなく、その中で使われるサーバー供給の側からテーマに関わる企業です。設備需要がどの層まで波及しているかを見るのに向いています。",
      },
      {
        ticker: "ANET",
        summary: "AIクラスタ向けネットワーク需要の関連先。",
        positioning:
          "データセンター関連銘柄の中でも、通信と接続性に焦点を当てる比較先です。GPUやサーバー以外のボトルネックを意識するときに重要です。",
      },
      {
        ticker: "9501.T",
        summary: "電力需要増の間接受益候補として注目。",
        positioning:
          "データセンター関連の中では異色ですが、電力需要増の観点から比較に入れやすい日本株です。施設投資と電力供給をつなぐ視点を補いやすい銘柄です。",
      },
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
    featuredStocks: [
      {
        ticker: "9501.T",
        summary: "首都圏データセンター需要増との接点が大きい候補。",
        positioning:
          "首都圏のデータセンター集積と電力需要増を考えるときに比較しやすい銘柄です。AIテーマの中では半導体ではなく電力供給側から見る代表例になります。",
      },
      {
        ticker: "9503.T",
        summary: "電力事業に加えデータセンター文脈でも比較しやすい。",
        positioning:
          "関西圏の需要増やインフラ投資の文脈で整理しやすい銘柄です。地域性の違いを踏まえて 9501.T と比較する意味があります。",
      },
      {
        ticker: "9513.T",
        summary: "大規模電源と送変電の観点で重要。",
        positioning:
          "発電だけでなく送配電や電源構成の視点から比較しやすい銘柄です。AI需要が直接的に表れにくい分、インフラ面の強みを確認する用途に向きます。",
      },
      {
        ticker: "9519.T",
        summary: "脱炭素電力需要の観点で見やすい。",
        positioning:
          "再生可能エネルギーや脱炭素電源の視点からテーマを補う銘柄です。AI需要の拡大と電源の質の変化をあわせて見たいときに比較しやすいです。",
      },
      {
        ticker: "6504.T",
        summary: "受配電設備や電源変換機器の側面から関連。",
        positioning:
          "電力会社そのものではなく、設備機器側からデータセンター需要を捉える日本株です。電力供給の裾野需要を見るための比較対象として有効です。",
      },
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
    featuredStocks: [
      {
        ticker: "9501.T",
        summary: "首都圏データセンター需要との接点が大きい。",
        positioning:
          "首都圏のデータセンター増設と結びつけて見やすい代表銘柄です。電力需要の増加を地域別に考える際の中心的な比較対象になります。",
      },
      {
        ticker: "9502.T",
        summary: "中部圏の産業・電力供給の文脈で比較対象。",
        positioning:
          "首都圏以外の地域性を比較するための候補として有効です。データセンター関連テーマを全国的な供給体制の視点で見る補完役になります。",
      },
      {
        ticker: "9503.T",
        summary: "関西圏の成長とデータセンター文脈を見やすい。",
        positioning:
          "関西圏の立地やインフラ投資とあわせて比較しやすい銘柄です。需要の地域偏在を考えるときに、9501.T と並べて見やすい存在です。",
      },
      {
        ticker: "9513.T",
        summary: "電源とインフラの両面から関連づけやすい。",
        positioning:
          "発電と送変電の双方の観点を持ちやすく、テーマを広めに整理できる銘柄です。設備投資の裾野を確認する際に比較対象になります。",
      },
      {
        ticker: "5803.T",
        summary: "ケーブル・配線インフラの裾野需要に着目しやすい。",
        positioning:
          "電力会社ではなく、配線や接続インフラの側からデータセンター需要を捉える日本株です。周辺設備投資まで含めた比較で意味を持つ銘柄です。",
      },
    ],
    risks: [
      "実際の需要発現や案件化までに時間がかかり、株価反応との時差が出る可能性があります。",
      "需要は地域偏在が大きく、全国一律に恩恵が広がるとは限りません。",
      "電力・エネルギー株特有の規制や市況要因が、AIテーマより大きく影響する場合があります。",
    ],
    relatedThemes: ["ai-energy-stocks-japan", "data-center-stocks", "ai-infrastructure-stocks"],
  },
];

export function getThemeBySlug(slug: string): ThemeDefinition | undefined {
  return THEMES.find((theme) => theme.slug === slug);
}

export function getThemeTitle(slug: string): string {
  return getThemeBySlug(slug)?.title ?? slug;
}

export function getAllThemeSlugs(): string[] {
  return THEMES.map((theme) => theme.slug);
}
