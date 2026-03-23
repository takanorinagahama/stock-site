import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "../../components/shared/SiteHeader";
import { FeatureCard } from "../../components/features/FeatureCard";
import { getAllFeatures, getFeaturedFeatures } from "../../lib/features";

export const metadata: Metadata = {
  title: "特集 | AI Stock Data",
  description:
    "AI関連テーマ・銘柄を深掘りした特集記事。テーマ深掘り、買い方ガイド、決算ベースの分析など、投資判断に役立つ情報を整理して掲載。",
  alternates: {
    canonical: "https://ai-stock-data.com/features",
  },
  openGraph: {
    title: "特集 | AI Stock Data",
    description:
      "AI関連テーマ・銘柄を深掘りした特集記事。テーマ深掘り、買い方ガイド、決算ベースの分析など、投資判断に役立つ情報を整理して掲載。",
    url: "https://ai-stock-data.com/features",
    siteName: "AI Stock Data",
    locale: "ja_JP",
    type: "website",
  },
};

export default function FeaturesPage() {
  const featuredArticles = getFeaturedFeatures();
  const allArticles = getAllFeatures();

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
      <div
        style={{
          maxWidth: 1152,
          margin: "0 auto",
          padding: "40px 20px",
        }}
      >
        {/* Breadcrumb */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: 13,
            color: "#94a3b8",
            marginBottom: 28,
          }}
        >
          <Link href="/" style={{ color: "#818cf8", textDecoration: "none" }}>
            ホーム
          </Link>
          <span>›</span>
          <span style={{ color: "#94a3b8" }}>特集</span>
        </nav>

        {/* Page header */}
        <div style={{ marginBottom: 40 }}>
          <h1
            style={{
              fontSize: 26,
              fontWeight: 700,
              color: "#f1f5f9",
              letterSpacing: "-0.02em",
              margin: 0,
              marginBottom: 8,
            }}
          >
            特集
          </h1>
          <p style={{ fontSize: 14, color: "#94a3b8", margin: 0 }}>
            AI関連のテーマ・銘柄を深掘りした特集記事
          </p>
        </div>

        {/* 注目特集 section */}
        {featuredArticles.length > 0 && (
          <section style={{ marginBottom: 48 }}>
            <h2
              style={{
                fontSize: 17,
                fontWeight: 600,
                color: "#f1f5f9",
                letterSpacing: "-0.01em",
                marginBottom: 16,
                marginTop: 0,
              }}
            >
              注目特集
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: 12,
              }}
            >
              {featuredArticles.map((article) => (
                <FeatureCard key={article.slug} article={article} />
              ))}
            </div>
          </section>
        )}

        {/* Divider */}
        <hr
          style={{
            border: "none",
            borderTop: "1px solid rgba(255,255,255,0.07)",
            marginBottom: 40,
          }}
        />

        {/* すべての特集 section */}
        <section>
          <h2
            style={{
              fontSize: 17,
              fontWeight: 600,
              color: "#f1f5f9",
              letterSpacing: "-0.01em",
              marginBottom: 16,
              marginTop: 0,
            }}
          >
            すべての特集
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 12,
            }}
          >
            {allArticles.map((article) => (
              <FeatureCard key={article.slug} article={article} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
