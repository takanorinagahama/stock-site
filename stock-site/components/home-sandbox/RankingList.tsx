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
      <style>{`
        .rl-row-link { transition: background 0.12s; }
        .rl-row-link:hover { background: rgba(255,255,255,0.025) !important; }
      `}</style>

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

      {/* card list */}
      <div
        style={{
          background: "#141922",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 16,
          overflow: "hidden",
        }}
      >
        {stocks.map((stock, i) => {
          const hasDesc = stock.companyDescription || stock.aiSummary;
          return (
            <Link
              key={stock.ticker}
              href={`/stocks/${stock.ticker}`}
              className="rl-row-link"
              style={{
                display: "block",
                padding: "14px 20px",
                borderTop: i === 0 ? "none" : "1px solid rgba(255,255,255,0.05)",
                textDecoration: "none",
              }}
            >
              {/* ── Header row: rank + ticker/name + score ── */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  marginBottom: hasDesc ? 10 : 0,
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

                {/* ticker + name + category */}
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
                      style={{ fontSize: 14, fontWeight: 600, color: "#e2e8f0" }}
                    >
                      {stock.ticker}
                    </span>
                    <span style={{ fontSize: 13, color: "#94a3b8" }}>
                      {stock.name}
                    </span>
                  </div>
                  <span style={{ fontSize: 12, color: "#64748b", marginTop: 1, display: "block" }}>
                    {stock.categoryJa ?? stock.aiCategory ?? "—"}
                  </span>
                </div>

                {/* score + chevron */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    flexShrink: 0,
                  }}
                >
                  {stock.score !== null && <ScoreBadge score={stock.score} />}
                  <span style={{ fontSize: 14, color: "#94a3b8" }}>›</span>
                </div>
              </div>

              {/* ── Description area ── */}
              {hasDesc && (
                <div
                  style={{
                    marginLeft: 36,
                    display: "flex",
                    flexDirection: "column",
                    gap: 7,
                  }}
                >
                  {/* company description */}
                  {stock.companyDescription && (
                    <p
                      style={{
                        fontSize: 13,
                        color: "#94a3b8",
                        lineHeight: 1.7,
                        margin: 0,
                      }}
                    >
                      {stock.companyDescription}
                    </p>
                  )}

                  {/* AI summary */}
                  {stock.aiSummary && (
                    <div>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          color: "#818cf8",
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                          display: "block",
                          marginBottom: 3,
                        }}
                      >
                        AIとの関わり
                      </span>
                      <p
                        style={{
                          fontSize: 13,
                          color: "#cbd5e1",
                          lineHeight: 1.7,
                          margin: 0,
                        }}
                      >
                        {stock.aiSummary}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
