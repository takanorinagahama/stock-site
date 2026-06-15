import { ImageResponse } from "next/og";
import { createClient } from "@supabase/supabase-js";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const revalidate = 3600;

async function getTopStocks() {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];

  const supabase = createClient(url, key);

  const [{ data: stocks }, { data: metrics }] = await Promise.all([
    supabase.from("stocks").select("ticker,name").eq("is_active", true),
    supabase.from("ai_metrics").select("ticker,ai_expectation_score,updated_month"),
  ]);

  if (!stocks || !metrics) return [];

  const latestByTicker = new Map<string, { score: number; month: string }>();
  for (const m of metrics) {
    if (m.ai_expectation_score == null) continue;
    const prev = latestByTicker.get(m.ticker);
    if (!prev || (m.updated_month ?? "") > (prev.month ?? "")) {
      latestByTicker.set(m.ticker, { score: m.ai_expectation_score, month: m.updated_month ?? "" });
    }
  }

  const nameMap = Object.fromEntries(stocks.map((s: { ticker: string; name: string }) => [s.ticker, s.name]));

  return Array.from(latestByTicker.entries())
    .map(([ticker, { score, month }]) => ({
      ticker,
      name: (nameMap[ticker] ?? ticker) as string,
      score: Math.round(score),
      month,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}

export default async function OgImage() {
  const stocks = await getTopStocks();
  const asOfMonth = stocks[0]?.month ?? "";
  const monthLabel = asOfMonth
    ? `${asOfMonth.slice(0, 4)}年${parseInt(asOfMonth.slice(5, 7))}月`
    : new Date().toLocaleDateString("ja-JP", { year: "numeric", month: "long" });

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#0c1118",
          display: "flex",
          flexDirection: "column",
          padding: "48px 64px",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 40 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 44,
                height: 44,
                background: "rgba(99,102,241,0.2)",
                border: "1px solid rgba(99,102,241,0.4)",
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ color: "#818cf8", fontSize: 16, fontWeight: 700 }}>AI</span>
            </div>
            <span style={{ color: "#f1f5f9", fontSize: 24, fontWeight: 600 }}>AI Stock Data</span>
          </div>
          <span style={{ color: "#64748b", fontSize: 14 }}>{monthLabel} 更新</span>
        </div>

        {/* Section label */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <span style={{ color: "#818cf8", fontSize: 13, fontWeight: 600, letterSpacing: "0.08em" }}>
            AI期待度ランキング TOP5
          </span>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
        </div>

        {/* Rankings */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20, flex: 1 }}>
          {stocks.map((stock, i) => {
            const scoreColor =
              stock.score >= 80 ? "#6ee7b7" : stock.score >= 65 ? "#a5b4fc" : "#93c5fd";
            const name = stock.name.length > 26 ? stock.name.slice(0, 26) + "…" : stock.name;
            return (
              <div key={stock.ticker} style={{ display: "flex", alignItems: "center", gap: 18 }}>
                <span style={{ width: 28, color: "#475569", fontSize: 16, fontWeight: 700 }}>
                  {i + 1}
                </span>
                <div
                  style={{
                    width: 88,
                    height: 34,
                    background: "rgba(99,102,241,0.12)",
                    border: "1px solid rgba(99,102,241,0.25)",
                    borderRadius: 6,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#a5b4fc",
                    fontSize: 14,
                    fontWeight: 700,
                  }}
                >
                  {stock.ticker}
                </div>
                <span style={{ width: 268, color: "#cbd5e1", fontSize: 15 }}>{name}</span>
                <div
                  style={{
                    flex: 1,
                    height: 10,
                    background: "rgba(255,255,255,0.06)",
                    borderRadius: 5,
                    display: "flex",
                  }}
                >
                  <div
                    style={{
                      width: `${stock.score}%`,
                      height: 10,
                      background: scoreColor,
                      borderRadius: 5,
                    }}
                  />
                </div>
                <span
                  style={{
                    width: 56,
                    color: scoreColor,
                    fontSize: 22,
                    fontWeight: 700,
                    textAlign: "right",
                  }}
                >
                  {stock.score}
                </span>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 20,
            marginTop: 24,
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <span style={{ color: "#475569", fontSize: 13 }}>ai-stock-data.com</span>
          <span style={{ color: "#475569", fontSize: 12 }}>AI関連株50銘柄をスコアで比較</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
