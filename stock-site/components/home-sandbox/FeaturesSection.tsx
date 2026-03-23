import Link from "next/link";
import { getFeaturedFeatures } from "../../lib/features";
import { FeatureCard } from "../features/FeatureCard";

export function FeaturesSection() {
  const featured = getFeaturedFeatures().slice(0, 3);

  return (
    <section>
      {/* Section header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <div>
          <h2
            style={{
              fontSize: 17,
              fontWeight: 600,
              color: "#f1f5f9",
              letterSpacing: "-0.01em",
              margin: 0,
            }}
          >
            注目特集
          </h2>
          <p style={{ fontSize: 13, color: "#94a3b8", marginTop: 4, marginBottom: 0 }}>
            AI関連のテーマ・銘柄を深掘りした特集記事
          </p>
        </div>
        <Link
          href="/features"
          style={{
            fontSize: 13,
            color: "#818cf8",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: 4,
            flexShrink: 0,
          }}
        >
          すべて見る ›
        </Link>
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 12,
        }}
      >
        {featured.map((article) => (
          <FeatureCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  );
}
