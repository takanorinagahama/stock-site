import type { Metadata } from "next";
import { SiteHeader } from "../../components/shared/SiteHeader";
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

const BG = "#0c1118";
const TEXT_PRI = "#f1f5f9";
const TEXT_SEC = "#cbd5e1";
const TEXT_TER = "#94a3b8";

export default async function StocksPage() {
  const data = await fetchStockItems();

  if (!data.ok) {
    return (
      <div style={{ background: BG, minHeight: "100vh", color: TEXT_PRI }}>
        <SiteHeader />
        <div style={{ maxWidth: 1152, margin: "0 auto", padding: "56px 20px" }}>
          <h1 style={{ fontSize: 28, marginBottom: 12 }}>AI銘柄ランキング</h1>
          <p style={{ color: TEXT_SEC }}>データ取得に失敗しました: {data.error}</p>
        </div>
      </div>
    );
  }

  const items = data.items;

  return (
    <div
      style={{
        background: BG,
        minHeight: "100vh",
        color: TEXT_PRI,
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <SiteHeader />

      <div style={{ maxWidth: 1152, margin: "0 auto", padding: "40px 20px 72px" }}>
        {/* Page header */}
        <div style={{ marginBottom: 28 }}>
          <h1
            style={{
              fontSize: "clamp(22px,4vw,30px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: TEXT_PRI,
              marginBottom: 10,
              display: "flex",
              alignItems: "baseline",
              flexWrap: "wrap",
              gap: "0 10px",
            }}
          >
            AI銘柄ランキング
            <span
              style={{
                fontSize: "clamp(13px,2vw,16px)",
                fontWeight: 500,
                color: TEXT_TER,
                letterSpacing: "0",
              }}
            >
              全{items.length}社
            </span>
          </h1>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: TEXT_SEC, maxWidth: 560 }}>
            AI関連銘柄を、AI売上（推定）・成長差分・依存度・確度で比較して、何を確認すべきかを分かりやすく整理します。
          </p>
        </div>

        {/* Interactive filter + table (client component) */}
        <StocksFilteredView items={items} />
      </div>
    </div>
  );
}
