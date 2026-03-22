import type { Metadata } from "next";
import { fetchStockItems, fetchStocksSummary } from "../lib/fetch-stocks";
import { SiteHeader } from "../components/shared/SiteHeader";
import { HeroSection } from "../components/home-sandbox/HeroSection";
import { GuideCards } from "../components/home-sandbox/GuideCards";
import { ThemeGrid } from "../components/home-sandbox/ThemeGrid";
import { RankingList } from "../components/home-sandbox/RankingList";
import { AboutCards } from "../components/home-sandbox/AboutCards";
import { DisclaimerBanner } from "../components/home-sandbox/DisclaimerBanner";

export const metadata: Metadata = {
  title: "AI Stock Data",
  description:
    "AI関連企業・銘柄を比較しやすく整理した投資情報サイト。AIとの関わり方、成長ドライバー、リスク要因、競合比較などをわかりやすく整理して掲載。",
  alternates: {
    canonical: "https://ai-stock-data.com",
  },
  openGraph: {
    title: "AI Stock Data",
    description:
      "AI関連企業・銘柄を比較しやすく整理した投資情報サイト。AIとの関わり方、成長ドライバー、リスク要因、競合比較などをわかりやすく整理して掲載。",
    url: "https://ai-stock-data.com",
    siteName: "AI Stock Data",
    images: ["/ogp.png"],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Stock Data",
    description:
      "AI関連企業・銘柄を比較しやすく整理した投資情報サイト。AIとの関わり方、成長ドライバー、リスク要因、競合比較などをわかりやすく整理して掲載。",
    images: ["/ogp.png"],
  },
};

export default async function Home() {
  const [summary, stocksData] = await Promise.all([
    fetchStocksSummary(),
    fetchStockItems(),
  ]);

  const count = summary.ok ? summary.count : 0;
  const asOfMonth = summary.ok ? summary.asOfMonth : null;

  const topStocks = stocksData.ok
    ? [...stocksData.items]
        .filter((s) => s.score !== null)
        .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
        .slice(0, 5)
    : [];

  return (
    <div
      style={{
        background: "#0c1118",
        minHeight: "100vh",
        color: "#f1f5f9",
        fontFamily:
          'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <SiteHeader />
      <HeroSection count={count} asOfMonth={asOfMonth} />

      <div
        style={{
          maxWidth: 1152,
          margin: "0 auto",
          padding: "48px 20px",
          display: "flex",
          flexDirection: "column",
          gap: 56,
        }}
      >
        <GuideCards />
        <ThemeGrid />
        {topStocks.length > 0 && <RankingList stocks={topStocks} />}
        <AboutCards />
        <DisclaimerBanner />
      </div>

    </div>
  );
}
