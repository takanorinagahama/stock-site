import type { FeatureArticle } from "../../lib/features/types";

export const article: FeatureArticle = {
  slug: "japan-ai-companies",
  title: "日本発の注目AI企業まとめ｜Sakana AIから実装企業まで初心者向けに整理",
  summary:
    "OpenAIやAnthropicばかりが目立ちがちですが、日本にも研究開発型、社会実装型、大企業主導型のAI企業があります。Sakana AI、Preferred Networks、ABEJA、PKSHA、SoftBank Groupを中心に、何をしている会社かを初心者向けに整理します。",
  category: "テーマ深掘り",
  updatedAt: "2026-04-02",
  featured: false,
  relatedThemes: ["ai-related-stocks"],
  relatedStocks: [],
  sections: [
    {
      heading: "まず押さえたい、日本のAI企業の見方",
      paragraphs: [
        "生成AIの話になると、どうしてもOpenAIやAnthropic、Googleの名前が先に出てきます。ただ、日本にもAIで存在感を高めている企業群があります。しかも一口に「AI企業」といっても、中身はかなり違います。最先端モデルを研究する会社もあれば、企業向けにAIを実装する会社もあり、巨大な販売力と資本力でAI活用を押し広げる企業もあります。",
        "この記事では、日本のAI企業をざっくり次の3タイプに分けて見ていきます。研究開発を前面に出す会社、企業導入を進める実装型の会社、資本や販売網でAI普及を押し広げる大企業グループです。そうして見ると、日本のAI企業の地図がかなりわかりやすくなります。",
      ],
    },
    {
      heading: "Sakana AI｜日本発の有名AIスタートアップの象徴",
      paragraphs: [
        "Sakana AIは2023年設立の東京拠点のR&D企業で、日本の大企業や公共分野との連携も進める、日本発の研究開発型の象徴的な存在です。",
        "公式サイトでは、自然から着想を得たAI研究を行う会社として位置づけており、モデル研究を前面に出したスタートアップとして国内外で注目されています。",
      ],
    },
    {
      heading: "Preferred Networks｜研究だけでなく国産LLMの実装まで進める代表格",
      paragraphs: [
        "Preferred NetworksはPLaMoをはじめとする国産LLMをフルスクラッチで開発し、日本語性能や国内実装で存在感を持ちます。",
        "2024年12月には日本語に特化したLLMの発表を行うなど、研究だけでなく実際の実装まで進める国内AIの代表格として位置づけられています。",
      ],
    },
    {
      heading: "ABEJA｜AIを業務に入れる「実装型」の代表",
      paragraphs: [
        "ABEJAは企業の重要業務にAIを入れる実装型の会社として理解しやすい存在です。公式サイトでは、AIプラットフォームを通じて企業のデジタルトランスフォーメーションを支援していると説明しています。",
        "研究よりも、実際に企業がAIを使える状態にすることに重点を置いており、社会実装を主軸に事業を展開しています。",
      ],
    },
    {
      heading: "PKSHA Technology｜会話AIや業務支援に強い社会実装型",
      paragraphs: [
        "PKSHAはNLPや画像認識などの技術を、AIソリューションやAI SaaSとして社会実装するタイプの企業です。公式サイトでは、AIを使ったアルゴリズムソリューションを事業の柱として紹介しています。",
        "特にコンタクトセンターや業務支援の領域でAIを展開しており、研究成果を製品・サービスとして社会に届けることを強みとしています。",
      ],
    },
    {
      heading: "SoftBank Group｜純粋な研究会社ではないが、日本のAI普及で無視できない存在",
      paragraphs: [
        "SoftBank Groupはモデル研究企業ではありませんが、OpenAIとの連携やAIネイティブ化への取り組みによって国内普及を押し広げる重要なプレイヤーです。",
        "公式サイトやプレスリリースでは、AIを活用した事業変革と情報革命の実現を哲学として掲げており、投資・連携・自社活用の複数の軸でAIに関わっています。",
      ],
    },
    {
      heading: "まとめ｜日本のAI企業は「研究」と「実装」で見るとわかりやすい",
      paragraphs: [
        "日本のAI企業は少ないというより、役割が分かれていると見るほうが正確です。Sakana AIやPreferred Networksのような研究開発型、ABEJAやPKSHAのような社会実装型、SoftBank Groupのような資本・販売網を持つ大企業グループという軸で整理すると、各社の立ち位置がつかみやすくなります。",
        "AI関連ニュースを読むときも、「その会社は研究寄りか、実装寄りか」を意識するだけで、情報の意味がかなり変わります。",
      ],
    },
  ],
  sources: [
    {
      label: "Sakana AI 会社情報",
      url: "https://sakana.ai/company-info/",
      publisher: "Sakana AI",
    },
    {
      label: "Preferred Networks 会社概要",
      url: "https://www.preferred.jp/en/company/",
      publisher: "Preferred Networks",
    },
    {
      label: "Preferred Networks PLaMo発表（2024年12月）",
      url: "https://www.preferred.jp/ja/news/pr20241202",
      publisher: "Preferred Networks",
    },
    {
      label: "ABEJA 会社概要",
      url: "https://www.abejainc.com/en/company",
      publisher: "ABEJA",
    },
    {
      label: "ABEJA Platform",
      url: "https://www.abejainc.com/platform/en",
      publisher: "ABEJA",
    },
    {
      label: "PKSHA Technology 会社概要",
      url: "https://www.pkshatech.com/en/company/",
      publisher: "PKSHA Technology",
    },
    {
      label: "SoftBank Group フィロソフィー",
      url: "https://group.softbank/en/philosophy",
      publisher: "SoftBank Group",
    },
    {
      label: "SoftBank AI活用に関するプレスリリース（2025年11月）",
      url: "https://www.softbank.jp/en/corp/news/press/sbkk/2025/20251105_02/",
      publisher: "SoftBank",
    },
  ],
};
