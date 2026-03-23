import type { FeatureArticle } from "../../lib/features/types";

export const article: FeatureArticle = {
  slug: "ai-beneficiaries-beyond-semiconductors",
  title: "AI半導体以外の恩恵株とは？関連銘柄と注目分野を整理",
  summary:
    "AI相場では半導体が主役に見えやすいが、実際に需要が広がっているのはデータセンター、電力・冷却、クラウド、既存ソフトウェアまで含む広いレイヤーだ。半導体の外側で何が伸びるのかを、公式開示ベースで整理する。",
  category: "テーマ深掘り",
  updatedAt: "2026-03-23",
  featured: true,
  relatedThemes: [
    "ai-infrastructure-stocks",
    "data-center-stocks",
    "ai-software-platform-stocks",
    "energy-power-infrastructure-stocks",
  ],
  relatedStocks: ["MSFT", "EQIX", "VRT", "SAP"],
  sections: [
    {
      heading: "AIブームの恩恵は、半導体だけでは終わらない",
      paragraphs: [
        "AI関連株というと、まずNVIDIAのような半導体企業が思い浮かぶ。実際、計算需要の拡大を最も分かりやすく受けるのはGPUやHBMの供給網だ。だが、AIの需要はそこで完結しない。モデルを動かすためのデータセンター、そこへ電力を供給する設備、発熱を処理する冷却、さらにAI機能を既存ソフトウェアへ実装する企業群にも、需要は確実に広がっている。",
        "Microsoftは2025年の年次報告書で、70地域に400超のデータセンターを運営し、同年度だけで2ギガワット超の新規容量を追加したと説明している。さらに、すべてのAzureリージョンがAI-firstで液冷対応可能だとしており、AI対応インフラへの投資がクラウド側で大きく進んでいることが分かる。",
      ],
    },
    {
      heading: "クラウド・データセンターは、AI需要の受け皿になる",
      paragraphs: [
        "AI需要を最初に受けるのは、半導体を実際に収容し、運用するクラウドとデータセンターだ。AIワークロードは一般的なクラウド利用よりも高密度の計算資源を必要とするため、設備の拡張がそのままテーマの広がりになる。",
        "Equinixは2024年10-Kで、AIの導入が進むなか、新しいIBXデータセンターでは従来のIBXの2倍の電力・冷却ニーズを支える必要があると説明している。AIの波がデータセンター事業者に与える影響は、単なる需要増ではなく、設備仕様そのものの変化として表れている。",
      ],
    },
    {
      heading: "電力・冷却は、AIインフラの制約条件になりやすい",
      paragraphs: [
        "AI投資が本格化すると、話題はすぐに「何枚GPUを積むか」から「その電力をどう供給するか」「その熱をどう逃がすか」に移る。設備の現場では、半導体以上に電力と冷却がボトルネックになりやすい。",
        "Vertivは2025年6月、NVIDIA GB300 NVL72向けの参照アーキテクチャを発表し、ラック密度が最大142kWに達する設計を示した。AIファクトリー級の設備では、電源・冷却・実装を一体で考えなければ運用できないことが、かなりはっきりしている。",
      ],
    },
    {
      heading: "既存ソフトウェア企業にも、AIの恩恵は広がる",
      paragraphs: [
        "AIの恩恵は、ハードウェアやデータセンターだけではない。既存の業務ソフトウェアやクラウドアプリにAI機能を組み込み、単価や契約規模を押し上げる企業も増えている。",
        "SAPは2025年通期決算で、Q4のクラウド受注の3分の2にSAP Business AIが含まれていたと説明している。AIを単独製品として売るだけでなく、既存のERPや業務システムの受注に組み込む形で収益化している点は、ソフトウェア企業の見方として重要だ。",
      ],
    },
    {
      heading: "半導体の外側を見るときの観察ポイント",
      paragraphs: [
        "このテーマで銘柄を見るなら、注目点は3つある。ひとつ目は、容量増設や設備仕様の変化が数字で見えるか。ふたつ目は、電力や冷却のような物理制約が経営陣の言葉として出ているか。三つ目は、AIという言葉が売上や受注へ実際につながっているかどうかだ。",
        "「AIに注力している」という説明だけでは弱い。データセンター容量、電力・冷却要件、受注構成のような具体的な開示が出ている企業のほうが、テーマの実需を追いやすい。",
      ],
    },
    {
      heading: "まとめ",
      paragraphs: [
        "AI半導体以外の恩恵株を考えるとき、出発点はクラウド・データセンター、電力・冷却、そしてAIを既存業務に組み込むソフトウェア企業だ。半導体の外側に何が必要かを順番にたどると、AI相場の裾野はかなり広い。",
        "AI関連株を広く見たいなら、まずは半導体の次に何が必要かという観点で、設備・電力・ソフトウェアの3レイヤーを並べてみると整理しやすい。",
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
      label: "Vertiv develops cooling and power reference architecture for NVIDIA GB300 NVL72",
      url: "https://investors.vertiv.com/news/news-details/2025/Vertiv-Develops-Energy-Efficient-Cooling-and-Power-Reference-Architecture-for-the-NVIDIA-GB300-NVL72-Platform-Available-as-SimReady-Assets-in-NVIDIA-Omniverse-Blueprint-for-AI-Factory-Design-and-Operations/default.aspx",
      publisher: "Vertiv",
    },
    {
      label: "SAP Q4 and FY 2025 Results",
      url: "https://www.sap.com/investors/en/financial-documents-and-events/recent-results.html",
      publisher: "SAP",
    },
  ],
};
