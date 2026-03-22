import type { Metadata } from "next";
import { fetchStockItems, fetchStocksSummary } from "../../lib/fetch-stocks";
import { HeroSection } from "../../components/home-sandbox/HeroSection";
import { GuideCards } from "../../components/home-sandbox/GuideCards";
import { ThemeGrid } from "../../components/home-sandbox/ThemeGrid";
import { RankingList } from "../../components/home-sandbox/RankingList";
import { AboutCards } from "../../components/home-sandbox/AboutCards";
import { DisclaimerBanner } from "../../components/home-sandbox/DisclaimerBanner";

export const metadata: Metadata = {
  title: "AI Stock Data – Sandbox",
  robots: { index: false, follow: false },
};

export default async function SandboxPage() {
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
      {/* ===== HEADER ===== */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(12,17,24,0.92)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div
          style={{
            maxWidth: 1152,
            margin: "0 auto",
            padding: "0 20px",
            height: 56,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          {/* logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 6,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(99,102,241,0.15)",
                border: "1px solid rgba(99,102,241,0.3)",
                fontSize: 13,
              }}
            >
              ⬡
            </div>
            <span
              style={{ fontSize: 15, fontWeight: 600, color: "#f1f5f9", letterSpacing: "-0.01em" }}
            >
              AI Stock Data
            </span>
          </div>

          {/* nav */}
          <nav style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {[
              { label: "テーマ一覧", href: "/themes" },
              { label: "銘柄一覧", href: "/stocks" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                style={{
                  padding: "6px 12px",
                  borderRadius: 6,
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#94a3b8",
                  textDecoration: "none",
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* ===== HERO ===== */}
      <HeroSection count={count} asOfMonth={asOfMonth} />

      {/* ===== MAIN CONTENT ===== */}
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
        {/* 3 Guide cards */}
        <GuideCards />

        {/* Theme categories */}
        <ThemeGrid />

        {/* Ranking TOP5 */}
        {topStocks.length > 0 && <RankingList stocks={topStocks} />}

        {/* 2-column about cards */}
        <AboutCards />

        {/* Disclaimer */}
        <DisclaimerBanner />
      </div>

      {/* ===== FOOTER ===== */}
      <footer
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          background: "#0a0e14",
        }}
      >
        <div
          style={{
            maxWidth: 1152,
            margin: "0 auto",
            padding: "32px 20px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 24,
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 4,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(99,102,241,0.12)",
                  fontSize: 11,
                }}
              >
                ⬡
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#cbd5e1" }}>
                AI Stock Data
              </span>
            </div>
            <p style={{ fontSize: 11, lineHeight: 1.7, color: "#475569", maxWidth: 280 }}>
              AI関連銘柄を比較しやすく整理するための参考情報サイトです。投資助言ではありません。
            </p>
          </div>

          <nav style={{ display: "flex", flexWrap: "wrap", gap: "8px 20px" }}>
            {[
              { label: "このサイトについて", href: "/about" },
              { label: "プライバシーポリシー", href: "/privacy" },
              { label: "免責事項", href: "/disclaimer" },
              { label: "お問い合わせ", href: "/contact" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                style={{ fontSize: 12, color: "#64748b", textDecoration: "none" }}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}
