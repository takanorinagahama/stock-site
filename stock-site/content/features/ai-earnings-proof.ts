import type { FeatureArticle } from "../../lib/features/types";
export const article: FeatureArticle = {
  slug: "ai-earnings-proof",
  title: "決算で分かる 本当にAIで稼いでいる会社の見分け方",
  summary: "「AI関連」と名乗る企業は多数ありますが、実際に決算でAI収益を計上しているかどうかは大きく異なります。決算資料のどこを見れば「本物のAI収益」が確認できるかを解説します。",
  category: "決算ベース",
  updatedAt: "2026-03-10",
  featured: true,
  relatedThemes: ["ai-semiconductor-stocks", "ai-infrastructure-stocks"],
  relatedStocks: ["NVDA", "MSFT", "AMZN", "GOOGL"],
  sections: [
    {
      heading: "「AI関連」と「AIで稼いでいる」は別物",
      paragraphs: [
        "多くの企業が「AI戦略」を発表していますが、実際にAIから収益を得ているかどうかは決算資料を読まなければわかりません。AI関連株を評価する際には、「AIに投資している企業」ではなく「AIから売上・利益を得ている企業」を見極めることが重要です。",
        "ここでは、決算発表で確認すべき具体的な指標や発言を整理します。",
      ],
    },
    {
      heading: "チェックポイント①：セグメント別売上への明示",
      paragraphs: [
        "最も信頼性が高いのは、決算発表でAI関連売上が数字として開示されている場合です。NVIDIAの「データセンター事業」売上はその典型例で、AIチップ（H100/H200等）向け需要が直接反映されています。",
        "セグメント別の開示がない場合でも、決算説明会（アーニングスコール）のトランスクリプトで「AI due to...」「AI-driven revenue...」などの表現がどの程度具体的かを確認する方法があります。",
      ],
    },
    {
      heading: "チェックポイント②：クラウド事業のAI起因成長",
      paragraphs: [
        "Microsoft、Amazon、Googleの3社では、クラウド事業（Azure/AWS/Google Cloud）の成長率がAI需要をある程度反映しています。各社のアーニングスコールでは「AI contributed X points to cloud growth」のような表現が登場するケースがあります。",
        "特にMicrosoftは「Copilot」系製品の課金ユーザー数やAzureのAIサービス収益に関して開示度が高く、比較的追いやすいです。",
      ],
    },
    {
      heading: "チェックポイント③：設備投資（CapEx）の増加傾向",
      paragraphs: [
        "AIインフラを整備している企業では、設備投資額の増加がAI需要への対応を示すシグナルになります。Google、Meta、MicrosoftのCapExはここ数四半期で急増しており、これはAI向けデータセンター構築への投資が主因とされています。",
        "CapEx増加はコスト増を意味しますが、「将来のAI収益への先行投資」と評価されることが多いです。",
      ],
    },
    {
      heading: "まとめ：数字で語れるAI企業を選ぶ",
      paragraphs: [
        "AI関連銘柄を評価する際は、①セグメント別AI売上の開示、②クラウド成長率とAI貢献、③CapEx増加と投資の方向性、の3点を確認することが基本です。",
        "このサイトの銘柄詳細ページでは、各社のAI売上比率（推定）や成長力スコアを掲載しています。決算ベースの評価と合わせてご活用ください。",
      ],
    },
  ],
  sources: [
    { label: "（仮）NVIDIA FY2025 Q4 Earnings Release", url: "#", publisher: "NVIDIA IR" },
    { label: "（仮）Microsoft FY2025 Q2 Earnings Transcript", url: "#", publisher: "Microsoft IR" },
  ],
};
