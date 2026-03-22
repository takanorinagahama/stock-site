import Link from "next/link";
import type { StockApiItem } from "../../lib/fetch-stocks";

function ScoreBadge({ score }: { score: number }) {
  let bg = "rgba(99,102,241,0.12)";
  let color = "#a5b4fc";
  if (score >= 80) {
    bg = "rgba(52,211,153,0.1)";
    color = "#6ee7b7";
  } else if (score >= 60) {
    bg = "rgba(96,165,250,0.1)";
    color = "#93c5fd";
  } else if (score < 40) {
    bg = "rgba(148,163,184,0.08)";
    color = "#94a3b8";
  }
  return (
    <div
      style={{
        background: bg,
        padding: "3px 10px",
        borderRadius: 6,
        fontSize: 13,
        fontWeight: 700,
        color,
        minWidth: 44,
        textAlign: "center",
      }}
    >
      {score}
    </div>
  );
}

interface RankingListProps {
  stocks: StockApiItem[];
}

export function RankingList({ stocks }: RankingListProps) {
  return (
    <section>
      {/* section header */}
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
            }}
          >
            AI期待度ランキング TOP5
          </h2>
          <p style={{ fontSize: 13, color: "#94a3b8", marginTop: 4 }}>
            スコアの高い銘柄を参考に確認できます
          </p>
        </div>
        <Link
          href="/stocks"
          style={{
            fontSize: 13,
            color: "#818cf8",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          全銘柄を見る ›
        </Link>
      </div>

      {/* card */}
      <div
        style={{
          background: "#141922",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 16,
          overflow: "hidden",
        }}
      >
        {stocks.map((stock, i) => (
          <Link
            key={stock.ticker}
            href={`/stocks/${stock.ticker}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              padding: "14px 20px",
              borderTop: i === 0 ? "none" : "1px solid rgba(255,255,255,0.05)",
              textDecoration: "none",
            }}
          >
            {/* rank */}
            <span
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#94a3b8",
                width: 20,
                textAlign: "center",
                flexShrink: 0,
              }}
            >
              {i + 1}
            </span>

            {/* info */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#e2e8f0",
                  }}
                >
                  {stock.ticker}
                </span>
                <span style={{ fontSize: 12, color: "#94a3b8" }}>
                  {stock.name}
                </span>
              </div>
              <span style={{ fontSize: 11, color: "#94a3b8" }}>
                {stock.categoryJa ?? stock.aiCategory ?? "—"}
              </span>
            </div>

            {/* score + chevron */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                flexShrink: 0,
              }}
            >
              {stock.score !== null && <ScoreBadge score={stock.score} />}
              <span style={{ fontSize: 14, color: "#94a3b8" }}>›</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
