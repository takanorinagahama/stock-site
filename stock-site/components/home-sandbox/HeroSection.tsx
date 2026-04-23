import Link from "next/link";

interface HeroSectionProps {
  count: number;
  asOfMonth: string | null;
}

export function HeroSection({ count, asOfMonth }: HeroSectionProps) {
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* radial gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 70% 50% at 60% -10%, rgba(99,102,241,0.12) 0%, transparent 70%), radial-gradient(ellipse 40% 30% at 10% 80%, rgba(99,102,241,0.06) 0%, transparent 60%)",
        }}
      />
      <div
        style={{
          position: "relative",
          maxWidth: 1152,
          margin: "0 auto",
          padding: "64px 20px 56px",
        }}
      >
        <div style={{ maxWidth: 560 }}>
          {/* badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 20,
              padding: "6px 12px",
              borderRadius: 9999,
              background: "rgba(99,102,241,0.1)",
              border: "1px solid rgba(99,102,241,0.2)",
            }}
          >
            <span style={{ fontSize: 12, color: "#818cf8" }}>⬡</span>
            <span style={{ fontSize: 12, color: "#a5b4fc", fontWeight: 500 }}>
              初心者向け AI関連株ガイド
            </span>
          </div>

          {/* heading */}
          <h1
            style={{
              fontSize: "clamp(28px, 5vw, 42px)",
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: "-0.03em",
              color: "#f8fafc",
              marginBottom: 16,
            }}
          >
            AI関連株の<span style={{ color: "#818cf8" }}>地図</span>を、
            <br />
            わかりやすく。
          </h1>

          {/* description */}
          <p
            style={{
              fontSize: 15,
              lineHeight: 1.8,
              color: "#cbd5e1",
              maxWidth: 520,
              marginBottom: 8,
            }}
          >
            AI Stock Data は、AI関連企業・銘柄の情報をテーマごとに整理した参考情報サイトです。
            半導体、クラウド、データセンター、電力インフラまで、広がるAI産業を初心者でも比較しやすい形で見渡せます。
          </p>

          {/* meta */}
          <p style={{ fontSize: 13, color: "#94a3b8", marginBottom: 32 }}>
            収録銘柄: {count} 社　／　基準月: {asOfMonth ?? "—"}
          </p>

          {/* CTA buttons */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            <Link
              href="/stocks"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 20px",
                borderRadius: 8,
                background: "#6366f1",
                color: "#fff",
                fontSize: 14,
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              銘柄一覧を見る →
            </Link>
            <Link
              href="/themes"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 20px",
                borderRadius: 8,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#cbd5e1",
                fontSize: 14,
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              テーマから探す ›
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
