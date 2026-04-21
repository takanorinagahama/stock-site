import type { FeatureArticle } from "../../lib/features/types";

export const article: FeatureArticle = {
  slug: "ai-earnings-proof",
  title: "決算で分かる 本当にAIで稼いでいる会社の見分け方",
  summary:
    "「AI関連」を掲げる会社は多いが、実際にAIが業績へ効いているかどうかは決算を見るまで分からない。売上成長への寄与、受注・受注残、受注構成という3つの観点で、AIの実績をどう見抜くかを一次ソースだけで整理する。",
  category: "決算ベース",
  updatedAt: "2026-03-23",
  featured: false,
  relatedThemes: ["ai-software-platform-stocks", "ai-infrastructure-stocks"],
  relatedStocks: ["MSFT", "DELL"],
  sections: [
    {
      heading: "AI関連と、AIで稼いでいることは別の話",
      paragraphs: [
        "AI関連と名乗る会社は多い。だが、投資判断で本当に見たいのは、AIという言葉が売上や受注にどう接続しているかだ。テーマとしてAIを語ることと、AIで実際に稼いでいることは同じではない。",
        "決算で確認しやすい開示は、大きく3つに整理できる。AIが売上成長に何ポイント寄与したか。AI関連の受注や受注残がいくらあるか。AIが受注構成やバックログの中でどれだけ存在感を持っているか。この3つだ。",
      ],
    },
    {
      heading: "見分け方1：AIが売上成長に何ポイント効いたか",
      paragraphs: [
        "もっとも強い開示は、AIが売上成長にどれだけ寄与したかを数字で示すものだ。MicrosoftはFY25 Q2の業績ページで、Azureとその他クラウドサービス売上が31%成長し、そのうち13ポイントがAIサービスによるものだと説明している。さらにAIサービス自体は157%成長とされている。",
        "ここまで出てくると、「AIをやっている」ではなく、「AIがすでに売上成長を押し上げている」と読める。AI関連株を見るとき、まず確認したいのはこの接続だ。",
      ],
    },
    {
      heading: "見分け方2：AI関連の受注や受注残があるか",
      paragraphs: [
        "次に強いのは、AI案件の受注や受注残の開示だ。Dellは2025年11月の投資家向けトランスクリプトで、AIサーバー需要が過去最高の123億ドル受注、56億ドル出荷、期末受注残184億ドルに達したと説明している。",
        "同じ開示では、Servers and Networking売上が101億ドルで前年比37%増とも述べている。売上だけでなく、受注と受注残の積み上がりが見えると、AI需要が一過性なのか継続性を持つのかを見分けやすい。",
      ],
    },
    {
      heading: "見分け方3：AIが受注構成の中でどれだけ入り込んでいるか",
      paragraphs: [
        "SaaSやクラウド企業では、AI売上を単独で切り出さず、受注構成やバックログの中で存在感を示すことがある。SAPは2025年通期業績で、Q4のクラウド受注の3分の2にSAP Business AIが含まれていたと説明している。",
        "同時に、Total Cloud Backlogは770億ユーロで前年比30%増と開示している。こうした企業では、「AI売上はいくらか」だけを探すより、受注にどれだけAIが入り込んでいるかを見るほうが実態に近い。",
      ],
    },
    {
      heading: "逆に、弱い開示はどんなものか",
      paragraphs: [
        "逆に弱いのは、AIの話は多いのに、売上・受注・成長率への接続がないケースだ。説明会でAI戦略を大きく語っていても、決算資料に数量的な裏づけがなければ、投資家としては慎重に見たほうがいい。",
        "Microsoftの13ポイント、Dellの受注・出荷・受注残、SAPのクラウド受注構成のように、AIと業績が数字でつながっている開示ほど、実績として評価しやすい。",
      ],
    },
    {
      heading: "決算を見るときのチェックリスト",
      paragraphs: [
        "決算でAIを確認するときは、順番を決めて見ると整理しやすい。まず、AIが売上成長に寄与したか。次に、AI関連の受注や受注残があるか。最後に、AIが受注構成やバックログの中でどこまで入り込んでいるか。この3つだ。",
        "この3つが揃うほど、「AIで稼いでいる会社」に近い。逆に、定性的な説明しかない企業は、テーマ株として注目されていても、業績の裏付けはまだ弱い可能性がある。",
      ],
    },
    {
      heading: "まとめ",
      paragraphs: [
        "本当にAIで稼いでいる会社を見分けるには、AIという言葉そのものではなく、AIが売上、受注、バックログにどう出ているかを見るのが基本になる。",
        "現時点で見やすい開示としては、Microsoftの売上成長寄与、Dellの受注と受注残、SAPの受注構成が分かりやすい。AI関連株を追うときは、テーマの強さより先に、決算の数字がどこまで裏づけているかを見たほうがよい。",
      ],
    },
  ],
  sources: [
    {
      label: "Microsoft FY25 Q2 Intelligent Cloud Performance",
      url: "https://www.microsoft.com/en-us/investor/earnings/fy-2025-q2/intelligent-cloud-performance",
      publisher: "Microsoft",
    },
    {
      label: "Microsoft FY25 Q2 Earnings Call",
      url: "https://www.microsoft.com/en-us/investor/events/fy-2025/earnings-fy-2025-q2",
      publisher: "Microsoft",
    },
    {
      label: "Dell Technologies Investor Transcript (Nov 25, 2025)",
      url: "https://investors.delltechnologies.com/static-files/9d07092c-7a61-42be-a1c2-54aea7465d17",
      publisher: "Dell Technologies",
    },
    {
      label: "SAP Recent Results / Q4 and FY 2025",
      url: "https://www.sap.com/investors/en/financial-documents-and-events/recent-results.html",
      publisher: "SAP",
    },
    {
      label: "SAP 2025 Annual Report on Form 20-F",
      url: "https://www.sap.com/docs/download/investors/2025/sap-2025-annual-report-form-20f.pdf",
      publisher: "SAP",
    },
  ],
};
