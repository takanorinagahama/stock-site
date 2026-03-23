import Link from "next/link";
import type { FeatureArticle, FeatureCategory } from "../../lib/features/types";

const CATEGORY_COLORS: Record<FeatureCategory, string> = {
  "テーマ深掘り": "#818cf8",
  "買い方ガイド": "#34d399",
  "決算ベース": "#fbbf24",
};

type Props = {
  article: FeatureArticle;
  size?: "default" | "compact";
};

export function FeatureCard({ article, size = "default" }: Props) {
  const catColor = CATEGORY_COLORS[article.category];
  const padding = size === "compact" ? 16 : 20;
  const titleSize = size === "compact" ? 14 : 15;

  return (
    <>
      <style>{`
        .feature-card {
          background: #141922;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: ${padding}px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          text-decoration: none;
          color: inherit;
          transition: border-color 0.15s, box-shadow 0.15s;
          height: 100%;
          box-sizing: border-box;
        }
        .feature-card:hover {
          border-color: rgba(129,140,248,0.4);
          box-shadow: 0 4px 20px rgba(99,102,241,0.12);
        }
      `}</style>
      <Link href={`/features/${article.slug}`} className="feature-card">
        {/* Top row: category chip + date */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 8,
          }}
        >
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: catColor,
              background: `${catColor}1a`,
              border: `1px solid ${catColor}40`,
              borderRadius: 4,
              padding: "2px 8px",
              letterSpacing: "0.02em",
              flexShrink: 0,
            }}
          >
            {article.category}
          </span>
          <span style={{ fontSize: 11, color: "#94a3b8", flexShrink: 0 }}>
            {article.updatedAt}
          </span>
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize: titleSize,
            fontWeight: 600,
            color: "#f1f5f9",
            lineHeight: 1.5,
            letterSpacing: "-0.01em",
            margin: 0,
          }}
        >
          {article.title}
        </h3>

        {/* Summary (line-clamp 2) */}
        <p
          style={{
            fontSize: 13,
            color: "#cbd5e1",
            lineHeight: 1.7,
            margin: 0,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {article.summary}
        </p>

        {/* Arrow */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            color: "#94a3b8",
            fontSize: 16,
            marginTop: "auto",
          }}
        >
          ›
        </div>
      </Link>
    </>
  );
}
