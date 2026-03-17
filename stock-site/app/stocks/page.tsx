import type { Metadata } from "next";
import { fetchStockItems } from "../../lib/fetch-stocks";
import StocksFilteredView from "./stocks-filtered-view";

export const metadata: Metadata = {
  title: "AI銘柄ランキング | AI Stock Data",
  description:
    "AI関連銘柄の一覧ページ。企業のAIとの関わり方や比較軸を整理し、投資判断に役立つ情報を見やすく掲載。",
  alternates: {
    canonical: "https://ai-stock-data.com/stocks",
  },
  openGraph: {
    title: "AI銘柄ランキング | AI Stock Data",
    description:
      "AI関連銘柄の一覧ページ。企業のAIとの関わり方や比較軸を整理し、投資判断に役立つ情報を見やすく掲載。",
    url: "https://ai-stock-data.com/stocks",
    siteName: "AI Stock Data",
    images: ["/ogp.png"],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI銘柄ランキング | AI Stock Data",
    description:
      "AI関連銘柄の一覧ページ。企業のAIとの関わり方や比較軸を整理し、投資判断に役立つ情報を見やすく掲載。",
    images: ["/ogp.png"],
  },
};

function formatAsOfMonth(asOfMonth: string | null): string | null {
  if (!asOfMonth) return null;
  const match = asOfMonth.match(/^(\d{4})-(\d{2})$/);
  if (!match) return asOfMonth;
  return `${match[1]}年${Number(match[2])}月`;
}

const SCORE_GUIDE_CARDS = [
  {
    title: "AI売上の大きさ",
    body: [
      "AI関連事業から生まれている売上規模の目安です。",
      "AIインフラ、半導体、クラウド、AIサービスなど、AI需要によって生まれている売上の大きさを示します。",
      "規模が大きい企業ほど、AI市場の拡大の恩恵を受けやすいと考えられます。",
    ],
  },
  {
    title: "AIの伸び",
    body: [
      "AI関連売上の成長の強さを示します。",
      "AI事業の売上成長率から、企業全体の売上成長率を引いた値をベースにしています。",
      "AI関連事業が企業の成長をどれだけ押し上げているかを見る指標です。",
    ],
  },
  {
    title: "AIとの関わり",
    body: [
      "その企業のビジネスがAIとどれだけ深く結びついているかを示します。",
      "AI半導体、AIサーバー、AIクラウド、AIソフトウェアなど、AI需要と直接結びつく事業ほど評価が高くなります。",
    ],
  },
  {
    title: "データの確からしさ",
    body: [
      "AI関連売上の推定に使っているデータの信頼度です。",
      "A: 企業がAI売上を明確に開示している",
      "B: AI関連セグメントなどから推定",
      "C: AI関連事業の比率などから概算",
    ],
  },
] as const;

export default async function StocksPage() {
  const data = await fetchStockItems();

  if (!data.ok) {
    return (
      <main style={{ maxWidth: 1240, margin: "56px auto", padding: "0 24px" }}>
        <h1 style={{ fontSize: 30, marginBottom: 12 }}>AI銘柄ランキング</h1>
        <p>データ取得に失敗しました: {data.error}</p>
      </main>
    );
  }

  const asOfMonthLabel = formatAsOfMonth(data.asOfMonth);

  return (
    <main style={{ maxWidth: 1240, margin: "56px auto", padding: "0 24px", lineHeight: 1.65 }}>
      <h1 style={{ fontSize: 32, marginBottom: 6 }}>AI銘柄ランキング</h1>
      <p style={{ opacity: 0.88, marginBottom: 10 }}>{data.count}銘柄を掲載中</p>

      {asOfMonthLabel ? (
        <section
          style={{
            border: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(255,255,255,0.05)",
            borderRadius: 14,
            padding: 12,
            marginBottom: 12,
          }}
        >
          <p style={{ margin: 0, fontWeight: 700 }}>最終更新: {asOfMonthLabel}</p>
          <p style={{ margin: "4px 0 0", opacity: 0.8, fontSize: 13 }}>
            このランキングは{asOfMonthLabel}時点のデータをもとにしています。
          </p>
        </section>
      ) : null}

      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12, marginBottom: 14 }}>
        <div style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", borderRadius: 16, padding: 14 }}>
          <h2 style={{ fontSize: 18, marginBottom: 6 }}>免責</h2>
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            <li>本ページは投資助言ではありません。</li>
            <li>最終的な投資判断はご自身で行ってください。</li>
          </ul>
        </div>

        <div style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", borderRadius: 16, padding: 14 }}>
          <h2 style={{ fontSize: 18, marginBottom: 6 }}>使い方</h2>
          <ol style={{ margin: 0, paddingLeft: 20 }}>
            <li>カテゴリで絞り込んで気になる領域を見る</li>
            <li>ランキングで企業を比較する</li>
            <li>詳細ページで内訳と寄与点を確認する</li>
          </ol>
        </div>
      </section>

      <section
        style={{
          border: "1px solid rgba(255,255,255,0.1)",
          background: "rgba(255,255,255,0.05)",
          borderRadius: 16,
          padding: 14,
          marginBottom: 14,
        }}
      >
        <h2 style={{ fontSize: 18, marginBottom: 6 }}>AIスコアの見方</h2>
        <p style={{ margin: "0 0 10px", opacity: 0.9 }}>
          AIスコアは、AI売上の大きさ・AIの伸び・AIとの関わりの強さ・データの確からしさをもとにした目安です。
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10 }}>
          {SCORE_GUIDE_CARDS.map((card) => (
            <div
              key={card.title}
              style={{
                border: "1px solid rgba(255,255,255,0.2)",
                background: "rgba(255,255,255,0.03)",
                borderRadius: 10,
                padding: "10px 12px",
              }}
            >
              <p style={{ margin: "0 0 6px", fontWeight: 700, fontSize: 14 }}>{card.title}</p>
              {card.body.map((line, index) => (
                <p
                  key={`${card.title}-${index}`}
                  style={{ margin: index === card.body.length - 1 ? 0 : "0 0 6px", opacity: 0.86, fontSize: 12 }}
                >
                  {line}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>

      <StocksFilteredView items={data.items} />
    </main>
  );
}
