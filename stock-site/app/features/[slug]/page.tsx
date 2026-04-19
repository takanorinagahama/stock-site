import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "../../../components/shared/SiteHeader";
import { FeatureCard } from "../../../components/features/FeatureCard";
import {
  getFeatureBySlug,
  getAllFeatureSlugs,
  getAllFeatures,
} from "../../../lib/features";
import type { FeatureCategory } from "../../../lib/features/types";

const CATEGORY_COLORS: Record<FeatureCategory, string> = {
  "テーマ深掘り": "#818cf8",
  "買い方ガイド": "#34d399",
  "決算ベース": "#fbbf24",
};

const SITE_URL = "https://ai-stock-data.com";

function buildShareUrls(slug: string, title: string) {
  const pageUrl = `${SITE_URL}/features/${slug}`;
  const text = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(pageUrl);
  return {
    x: `https://twitter.com/intent/tweet?text=${text}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
  };
}

export function generateStaticParams() {
  return getAllFeatureSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getFeatureBySlug(slug);
  if (!article) return {};

  return {
    title: `${article.title} | AI Stock Data`,
    description: article.summary,
    alternates: {
      canonical: `https://ai-stock-data.com/features/${slug}`,
    },
    openGraph: {
      title: `${article.title} | AI Stock Data`,
      description: article.summary,
      url: `https://ai-stock-data.com/features/${slug}`,
      siteName: "AI Stock Data",
      locale: "ja_JP",
      type: "article",
    },
  };
}

export default async function FeatureDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getFeatureBySlug(slug);

  if (!article) {
    notFound();
  }

  const catColor = CATEGORY_COLORS[article.category];
  const shareUrls = buildShareUrls(slug, article.title);

  // Related articles: other articles, max 2
  const related = getAllFeatures()
    .filter((a) => a.slug !== article.slug)
    .slice(0, 2);

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
          maxWidth: 800,
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
            flexWrap: "wrap",
          }}
        >
          <Link href="/" style={{ color: "#818cf8", textDecoration: "none" }}>
            ホーム
          </Link>
          <span>›</span>
          <Link href="/features" style={{ color: "#818cf8", textDecoration: "none" }}>
            特集
          </Link>
          <span>›</span>
          <span
            style={{
              color: "#94a3b8",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              maxWidth: 300,
            }}
          >
            {article.title}
          </span>
        </nav>

        {/* Hero card */}
        <div
          style={{
            background: "#141922",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 16,
            padding: 28,
            marginBottom: 32,
          }}
        >
          {/* Category chip + share buttons + date */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 8,
              marginBottom: 16,
              flexWrap: "wrap",
            }}
          >
            {/* Left: category chip + share buttons */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: catColor,
                  background: `${catColor}1a`,
                  border: `1px solid ${catColor}40`,
                  borderRadius: 4,
                  padding: "3px 10px",
                  letterSpacing: "0.02em",
                }}
              >
                {article.category}
              </span>
              <a
                href={shareUrls.x}
                target="_blank"
                rel="noopener noreferrer"
                title="Xで共有"
                style={{
                  padding: "4px 8px",
                  borderRadius: 6,
                  border: "1px solid rgba(255,255,255,0.07)",
                  background: "rgba(255,255,255,0.03)",
                  color: "#94a3b8",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-label="X">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href={shareUrls.facebook}
                target="_blank"
                rel="noopener noreferrer"
                title="Facebookで共有"
                style={{
                  padding: "4px 8px",
                  borderRadius: 6,
                  border: "1px solid rgba(255,255,255,0.07)",
                  background: "rgba(255,255,255,0.03)",
                  color: "#94a3b8",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-label="Facebook">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
            {/* Right: date */}
            <span style={{ fontSize: 12, color: "#94a3b8" }}>
              更新: {article.updatedAt}
            </span>
          </div>

          {/* H1 title */}
          <h1
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "#f1f5f9",
              lineHeight: 1.45,
              letterSpacing: "-0.02em",
              marginBottom: 14,
              marginTop: 0,
            }}
          >
            {article.title}
          </h1>

          {/* Summary */}
          <p
            style={{
              fontSize: 14,
              lineHeight: 1.85,
              color: "#cbd5e1",
              marginBottom: 16,
              marginTop: 0,
            }}
          >
            {article.summary}
          </p>

          {/* Related stock chips — linked to /stocks/[ticker] */}
          {article.relatedStocks.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {article.relatedStocks.map((ticker) => (
                <Link
                  key={ticker}
                  href={`/stocks/${ticker}`}
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#f1f5f9",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 4,
                    padding: "2px 8px",
                    letterSpacing: "0.04em",
                    textDecoration: "none",
                    transition: "background 0.15s, border-color 0.15s",
                  }}
                >
                  {ticker}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Content sections */}
        <div style={{ marginBottom: 40 }}>
          {article.sections.map((section, idx) => (
            <div key={idx} style={{ marginBottom: 32 }}>
              <h2
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: "#f1f5f9",
                  paddingLeft: 12,
                  borderLeft: "3px solid #818cf8",
                  marginBottom: 12,
                  marginTop: 0,
                  lineHeight: 1.5,
                }}
              >
                {section.heading}
              </h2>
              {section.paragraphs.map((para, pIdx) => (
                <p
                  key={pIdx}
                  style={{
                    fontSize: 14,
                    lineHeight: 1.85,
                    color: "#cbd5e1",
                    marginBottom: 10,
                    marginTop: 0,
                  }}
                >
                  {para}
                </p>
              ))}
            </div>
          ))}
        </div>

        {/* Sources */}
        {article.sources.length > 0 && (
          <div
            style={{
              background: "#141922",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 12,
              padding: 20,
              marginBottom: 40,
            }}
          >
            <h3
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: "#94a3b8",
                marginBottom: 12,
                marginTop: 0,
              }}
            >
              参考資料
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {article.sources.map((source, idx) => (
                <li
                  key={idx}
                  style={{
                    fontSize: 13,
                    color: "#94a3b8",
                    display: "flex",
                    gap: 8,
                    alignItems: "flex-start",
                    marginBottom: idx < article.sources.length - 1 ? 8 : 0,
                  }}
                >
                  <span style={{ flexShrink: 0 }}>–</span>
                  <span>
                    <a
                      href={source.url}
                      style={{
                        color: "#818cf8",
                        textDecoration: "none",
                      }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {source.label}
                    </a>
                    {source.publisher && (
                      <span style={{ color: "#64748b", marginLeft: 6 }}>
                        ({source.publisher})
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Related features */}
        {related.length > 0 && (
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
              関連特集
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: 12,
              }}
            >
              {related.map((rel) => (
                <FeatureCard key={rel.slug} article={rel} size="compact" />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
