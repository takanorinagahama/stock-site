import type { FeatureArticle } from "../../lib/features/types";

export const article: FeatureArticle = {
  slug: "ai-data-center-stocks",
  title: "AIデータセンター関連株まとめ 注目企業と見るべきポイント",
  summary:
    "AI需要の拡大で、データセンターは半導体の次に重要な観察対象になっている。容量拡張、土地取得、メガワット、電力・冷却仕様という観点で、どの企業を見るとテーマを追いやすいかを整理する。",
  category: "テーマ深掘り",
  updatedAt: "2026-03-23",
  featured: false,
  relatedThemes: [
    "data-center-stocks",
    "ai-infrastructure-stocks",
    "energy-power-infrastructure-stocks",
  ],
  relatedStocks: ["MSFT", "EQIX", "DLR", "VRT"],
  sections: [
    {
      heading: "AIデータセンターは、半導体の次に見るべき場所",
      paragraphs: [
        "AI相場で注目が集まりやすいのは半導体だが、実際にモデルを動かす場所として重要なのはデータセンターだ。GPUの出荷が増えるほど、それを収容する施設、電力、冷却、ネットワークまで含めた設備投資が必要になる。",
        "Microsoftは2025年の年次報告書で、70地域に400超のデータセンターを運営し、同年度だけで2ギガワット超の新規容量を追加したと説明している。AI対応インフラの拡張が、すでにクラウドの基盤投資として進んでいることが分かる。",
      ],
    },
    {
      heading: "ハイパースケーラーは、容量拡張の中心にいる",
      paragraphs: [
        "まず見るべきは、自前で大規模インフラを増設するハイパースケーラーだ。Microsoftのようなクラウド大手は、AI需要を受けるだけでなく、それを支える設備投資の主役でもある。",
        "年次報告書では、すべてのAzureリージョンがAI-firstで液冷対応可能だとされている。これは、AI対応が一部の先進拠点だけでなく、クラウド基盤全体の設計思想になっていることを示している。",
      ],
    },
    {
      heading: "コロケーション事業者は、電力と立地の価値が増しやすい",
      paragraphs: [
        "Equinixのようなコロケーション事業者も、AIテーマでは重要な位置にいる。AIの導入で高出力機器が増えると、データセンターの競争力は単なる床面積ではなく、どれだけ電力と冷却を供給できるかで決まりやすくなる。",
        "Equinixは10-Kで、新しいIBXデータセンターでは従来のIBXの2倍の電力・冷却ニーズを支える必要があると説明している。AI対応の進展が、データセンターの仕様と資本負担を変えていることが分かる。",
      ],
    },
    {
      heading: "Digital Realtyは、土地とメガワットの積み上げが見やすい",
      paragraphs: [
        "データセンター関連株を見るときは、契約件数よりも、どれだけの土地やIT容量を確保しているかを見るほうがテーマを追いやすい。",
        "Digital Realtyは2025年7月の四半期開示で、アトランタ圏で取得した約100エーカーの土地が200メガワット超のIT容量を支える見込みだと説明している。AI関連需要の拡大局面では、こうした土地・電力・容量の積み上げが、そのまま将来供給力のヒントになる。",
      ],
    },
    {
      heading: "電力・冷却設備は、データセンター投資のボトルネックを映す",
      paragraphs: [
        "AIデータセンターは箱だけでは動かない。とくに高密度ラックになるほど、電源・冷却・配線の比重が増す。",
        "Vertivは2025年6月、NVIDIA GB300 NVL72向け参照アーキテクチャで、最大142kWのラック密度を支える設計を示した。データセンター関連株を追ううえで、施設運営企業だけでなく、こうした周辺設備企業も外せない。",
      ],
    },
    {
      heading: "このテーマで見るべき指標",
      paragraphs: [
        "AIデータセンター関連株を見るときの軸は、メガワット、容量追加、土地取得、電力調達、冷却仕様の5つに整理しやすい。どれも「AIをやっている」ではなく、AI需要を受け止める物理的な裏付けに近い。",
        "テーマの熱さに流されるより、どの会社が何MWを支え、どんな拡張を進め、どこに制約を抱えているかを見たほうが、かなり実態に近い。",
      ],
    },
    {
      heading: "まとめ",
      paragraphs: [
        "AIデータセンター関連株を追うなら、クラウド大手、コロケーション、電力・冷却設備の3層で見ると整理しやすい。半導体の外側でどこに資本が向かっているかを捉えるには、データセンターはかなり重要な観察対象だ。",
        "AI相場を設備側から見るなら、まずはMSFT、EQIX、DLR、VRTのように役割の違う企業を並べてみると、テーマの構造が見えやすい。",
      ],
    },
  ],
  sources: [
    {
      label: "Microsoft 2025 Annual Report",
      url: "https://www.microsoft.com/investor/reports/ar25/index.html",
      publisher: "Microsoft",
    },
    {
      label: "Equinix 2024 Annual Report (10-K)",
      url: "https://investor.equinix.com/sec-filings/annual-reports/content/0001628280-25-005126/0001628280-25-005126.pdf",
      publisher: "Equinix",
    },
    {
      label: "Digital Realty Q2 2025 Results",
      url: "https://investor.digitalrealty.com/news-releases/news-release-details/digital-realty-reports-second-quarter-2025-results",
      publisher: "Digital Realty",
    },
    {
      label: "Vertiv develops cooling and power reference architecture for NVIDIA GB300 NVL72",
      url: "https://investors.vertiv.com/news/news-details/2025/Vertiv-Develops-Energy-Efficient-Cooling-and-Power-Reference-Architecture-for-the-NVIDIA-GB300-NVL72-Platform-Available-as-SimReady-Assets-in-NVIDIA-Omniverse-Blueprint-for-AI-Factory-Design-and-Operations/default.aspx",
      publisher: "Vertiv",
    },
  ],
};
