import type { FeatureArticle } from "../../lib/features/types";

export const article: FeatureArticle = {
  slug: "ai-models-beyond-llm",
  title: "LLMの次に見るAIモデルとは 生成AI以外で伸びる4分野と関連銘柄の整理",
  summary:
    "生成AIブームの中心はLLMと画像・動画モデルだが、AIモデルの広がりはそこだけではない。ロボット向けAI（physical AI）、推薦・ランキングAI、時系列基盤モデル、創薬向け基盤モデルという4分野の構造と、それぞれに関わる企業を整理する。",
  category: "テーマ深掘り",
  updatedAt: "2026-04-03",
  featured: false,
  relatedThemes: ["ai-related-stocks", "ai-semiconductor-stocks"],
  relatedStocks: ["NVDA", "GOOGL", "META"],
  sections: [
    {
      heading: "LLMと生成AIだけでは、AIテーマを捉えきれなくなっている",
      paragraphs: [
        "生成AIブームの中心にいるのは、大規模言語モデルと画像・動画生成モデルだ。ChatGPTのような対話AIが投資家の関心を集め、OpenAIやAnthropicの動向が話題になる。だが、産業応用という観点から見ると、実際に業務に入り込んでいるAIモデルはそこだけではなくなってきている。",
        "Stanford HAIが2025年に発表したAI Indexは、2024年の注目モデルの多くが産業発の研究から生まれているという流れを示している。ロボット制御、パーソナライズ推薦、時系列予測、創薬R&D──これらは話題に上りにくいが、業務指標や売上への接続という点では、LLMより見通しが立ちやすい分野も少なくない。",
      ],
    },
    {
      heading: "ロボット向けAI──物理世界を扱う基盤モデル",
      paragraphs: [
        "「Physical AI」と呼ばれるモデル群は、言語ではなく物理的な動作の制御を扱う。カメラやセンサーの情報をもとに、ロボットアームや自律移動体に指示を出すのがその役割だ。これまでルールベースでプログラムしていた産業用ロボットに、汎用的に未知状況へ対応できる基盤モデルを使う方向が広がりつつある。",
        "Google DeepMind（Alphabet / GOOGL）は、視覚・言語・行動を統合したGemini Roboticsをvision-language-actionモデルとして発表した。NVIDIA（NVDA）はCosmosを物理AIの基盤モデルとして位置づけ、ロボティクスや自律システムの学習データ生成に使えると説明している。このテーマで見るなら、NVIDIAはハードウェアとエコシステム、Alphabetはモデル研究という形で関わっており、製造・物流・医療への波及が進むほど両社への影響が出やすい。",
      ],
    },
    {
      heading: "推薦・ランキングAI──収益に直結しやすいモデル",
      paragraphs: [
        "推薦・ランキングAIは、LLMほど話題にならないが、業績への接続という点では最も分かりやすいモデル群のひとつだ。何のコンテンツを表示するか、どの広告を出すか、どの商品を優先するか──こうした判断の精度が、CTRや視聴時間、コンバージョンに直接影響する。",
        "Netflixはパーソナライズ推薦向けの基盤モデルを開発・公開したと説明しており、従来の推薦システムを汎用基盤モデルに置き換える方向に進んでいる。Meta（META）は広告ランキングモデルの強化でCTRやコンバージョン改善を示しており、広告売上比率の高さからして推薦AIの精度は直接収益に出やすい構造だ。Netflix（NFLX）であれば視聴時間や解約率との関係、Metaであれば広告ROASの変化が、実際に追いやすい指標になる。",
      ],
    },
    {
      heading: "時系列基盤モデル──予測業務の再設計",
      paragraphs: [
        "時系列基盤モデルは、需要予測、在庫最適化、エネルギー消費予測など、時間軸に沿ったデータを扱う業務を対象とする。LLMが文章の次のトークンを予測するように、時系列基盤モデルは過去のデータパターンをもとに次の値を予測する。これまで企業ごとにカスタムモデルを構築していた領域を、汎用基盤モデルで置き換えられる可能性が出てきている。",
        "Google（GOOGL）はTimesFMをBigQueryとAlloyDBに統合し、クラウドサービスとして提供している。Amazon（AMZN）はChronos/Chronos-2系を時系列基盤モデルとして発表しており、研究段階から実装に向けた動きが進んでいる。このテーマはクラウド大手のデータサービス売上に組み込まれるほど追いやすくなるが、いまのところ時系列AIが個別に開示される機会はまだ少ない。",
      ],
    },
    {
      heading: "創薬・バイオ向け基盤モデル──R&Dへの組み込み",
      paragraphs: [
        "創薬AIは以前から注目されてきたが、基盤モデルの登場でフェーズが変わりつつある。ターゲット発見から化合物設計、臨床最適化まで複数の工程にマルチモーダルAIが入ることで、開発コストと期間の削減可能性が広がっている。ただし、業績への反映は長期にわたることが多く、パイプラインや提携の動きを追う必要がある。",
        "AstraZeneca（AZN）はModella AIの買収を通じてoncology領域のR&Dに基盤モデルを組み込む方向を進めている。Eli Lilly（LLY）はInsilico Medicineとの大型提携を発表しており、AIを使った化合物探索をR&Dに取り入れている。このテーマで見るなら、「AIを使っている」より先に、どのパイプライン段階に、どの疾患領域で使われているかを追うほうが実態に近い。",
      ],
    },
    {
      heading: "4分野を並べると見えてくること",
      paragraphs: [
        "ロボット、推薦、時系列、創薬の4分野に共通しているのは、モデルが特定の業務やKPIに直接埋め込まれるという構造だ。LLMが汎用的に広く使われるのに対し、これらのモデルは「何の業務に、どう接続されているか」が問われやすい。そのぶん、業績への接続が見えたときのインパクトは分かりやすい。",
        "投資家としてこれらのテーマを追うなら、モデルの精度競争よりも、どの業務指標にAIが組み込まれたかを見るほうが合理的だ。推薦AIなら視聴時間やCTR、時系列AIならクラウド利用単価、創薬AIならパイプライン進捗というように、テーマごとに追うべき指標が変わる。開示内容次第では、LLMより先にAIの実績が見えてくる分野もある。",
      ],
    },
    {
      heading: "まとめ",
      paragraphs: [
        "AIテーマをLLMと生成AIだけで捉えると、視野が狭くなりやすい。ロボット向けAI、推薦・ランキングAI、時系列基盤モデル、創薬向け基盤モデルのような分野は、業務や売上への接続が見えやすいものも少なくない。",
        "重要なのは、モデルが何をするかよりも、どの業務やKPIに埋め込まれているかだ。NVDA、GOOGL、META、NFLX、AMZN、LLY、AZNのような企業を見るとき、「AIをやっている」より先に、「AIがどの指標に出ているか」を確認するほうが、テーマの実態に近づける。",
      ],
    },
  ],
  sources: [
    {
      label: "Stanford HAI AI Index Report 2025",
      url: "https://aiindex.stanford.edu/report/",
      publisher: "Stanford HAI",
    },
    {
      label: "Google DeepMind – Gemini Robotics",
      url: "https://deepmind.google/discover/blog/gemini-robotics-bringing-ai-into-the-physical-world/",
      publisher: "Google DeepMind",
    },
    {
      label: "NVIDIA Cosmos – Physical AI World Foundation Models",
      url: "https://www.nvidia.com/en-us/ai/cosmos/",
      publisher: "NVIDIA",
    },
    {
      label: "Netflix Research – Recommendations",
      url: "https://research.netflix.com/research-area/recommendations",
      publisher: "Netflix",
    },
    {
      label: "Google Research – TimesFM: A decoder-only foundation model for time-series forecasting",
      url: "https://research.google/blog/a-decoder-only-foundation-model-for-time-series-forecasting/",
      publisher: "Google Research",
    },
    {
      label: "Amazon Science – Chronos: Learning the Language of Time Series",
      url: "https://www.amazon.science/publications/chronos-learning-the-language-of-time-series",
      publisher: "Amazon Science",
    },
    {
      label: "AstraZeneca Press Releases",
      url: "https://www.astrazeneca.com/media-centre/press-releases.html",
      publisher: "AstraZeneca",
    },
    {
      label: "Eli Lilly Investor News Releases",
      url: "https://investor.lilly.com/news-releases",
      publisher: "Eli Lilly",
    },
  ],
};
