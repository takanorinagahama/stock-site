import Link from "next/link";
import { fetchStockItems, type StockApiItem } from "../../lib/fetch-stocks";
import { getCategoryDescription, normalizeCategoryLabel } from "../../lib/categories";

function toStars(score: number): string {
  const stars = Math.max(1, Math.min(5, Math.round(score / 20)));
  return "★".repeat(stars) + "☆".repeat(5 - stars);
}

function getAiCategory(stock: StockApiItem): string {
  return normalizeCategoryLabel(stock.aiCategory ?? stock.categoryJa ?? null);
}

function formatValue(value: number | string | null): string {
  return value == null || value === "" ? "データ不足" : String(value);
}

export default async function StocksPage() {
  const data = await fetchStockItems();

  if (!data.ok) {
    return (
      <main style={{ maxWidth: 1240, margin: "56px auto", padding: "0 24px" }}>
        <h1 style={{ fontSize: 30, marginBottom: 12 }}>AI銘柄ランキング</h1>
        <p>データ取得に失敗しました: {data.error}</p>
      </main>
    );
  }

  const sortedItems = [...data.items].sort((a, b) => {
    const aScore = a.score;
    const bScore = b.score;
    if (aScore == null && bScore == null) return a.ticker.localeCompare(b.ticker);
    if (aScore == null) return 1;
    if (bScore == null) return -1;
    if (bScore !== aScore) return bScore - aScore;
    return a.ticker.localeCompare(b.ticker);
  });

  const categoryMap = new Map<string, Array<{ ticker: string; name: string }>>();
  for (const stock of sortedItems) {
    const category = getAiCategory(stock).trim() || "未分類";
    const current = categoryMap.get(category) ?? [];
    current.push({ ticker: stock.ticker, name: stock.name });
    categoryMap.set(category, current);
  }

  const categoryEntries = Array.from(categoryMap.entries()).sort((a, b) => a[0].localeCompare(b[0]));

  return (
    <main style={{ maxWidth: 1240, margin: "56px auto", padding: "0 24px", lineHeight: 1.65 }}>
      <h1 style={{ fontSize: 32, marginBottom: 6 }}>AI銘柄ランキング</h1>
      <p style={{ opacity: 0.88, marginBottom: 14 }}>
        {data.count}銘柄 / 基準月: {data.asOfMonth ?? "データ不足"}
      </p>

      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12, marginBottom: 14 }}>
        <div style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", borderRadius: 16, padding: 14 }}>
          <h2 style={{ fontSize: 18, marginBottom: 6 }}>免責</h2>
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            <li>本ページは投資助言ではありません。</li>
            <li>最終的な投資判断はご自身で行ってください。</li>
          </ul>
        </div>

        <div style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", borderRadius: 16, padding: 14 }}>
          <h2 style={{ fontSize: 18, marginBottom: 6 }}>指標の意味</h2>
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            <li>score: 総合評価。欠損時はデータ不足。</li>
            <li>aiRevMid: AI関連売上の目安（推定値）。</li>
            <li>growthDiff: AIの伸び（AI成長率 - 全社成長率）。</li>
            <li>dependencyLevel: AIとの結びつき（1〜4）。</li>
            <li>tier: データの確からしさ（A/B/C）。</li>
            <li>updatedMonth: データ基準月。</li>
          </ul>
        </div>

        <div style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", borderRadius: 16, padding: 14 }}>
          <h2 style={{ fontSize: 18, marginBottom: 6 }}>使い方</h2>
          <ol style={{ margin: 0, paddingLeft: 20 }}>
            <li>ランキング上位を確認</li>
            <li>詳細ページで内訳と寄与点を確認</li>
            <li>公式サイト/IRで一次情報を確認</li>
          </ol>
        </div>
      </section>

      <section
        style={{
          border: "1px solid rgba(255,255,255,0.1)",
          background: "rgba(255,255,255,0.05)",
          borderRadius: 16,
          padding: 14,
          marginBottom: 14,
        }}
      >
        <h2 style={{ fontSize: 20, marginBottom: 8 }}>AI産業マップ（カテゴリ別）</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 10 }}>
          {categoryEntries.map(([category, stocks]) => (
            <div
              key={category}
              style={{
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.03)",
                borderRadius: 12,
                padding: 10,
              }}
            >
              <h3 style={{ fontSize: 16, marginBottom: 6 }}>{category}</h3>
              <p style={{ opacity: 0.7, margin: "0 0 6px", fontSize: 12 }}>
                {getCategoryDescription(category)}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 10px" }}>
                {stocks.map((stock) => (
                  <Link
                    key={`${category}-${stock.ticker}`}
                    href={`/stocks/${stock.ticker}`}
                    className="map-link"
                    style={{ color: "rgba(255,255,255,0.88)", textDecoration: "none" }}
                  >
                    {stock.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        .map-link {
          transition: color 0.15s ease;
        }
        .map-link:hover {
          color: rgba(255,255,255,1);
        }
      `}</style>

      <div style={{ border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 980 }}>
          <thead>
            <tr style={{ background: "rgba(255,255,255,0.05)" }}>
              <th style={{ textAlign: "right", borderBottom: "1px solid rgba(255,255,255,0.2)", padding: 10 }}>順位</th>
              <th style={{ textAlign: "left", borderBottom: "1px solid rgba(255,255,255,0.2)", padding: 10 }}>ティッカー</th>
              <th style={{ textAlign: "left", borderBottom: "1px solid rgba(255,255,255,0.2)", padding: 10 }}>企業名</th>
              <th style={{ textAlign: "left", borderBottom: "1px solid rgba(255,255,255,0.2)", padding: 10 }}>AI期待度</th>
              <th style={{ textAlign: "right", borderBottom: "1px solid rgba(255,255,255,0.2)", padding: 10 }}>AI関連売上の目安</th>
              <th style={{ textAlign: "right", borderBottom: "1px solid rgba(255,255,255,0.2)", padding: 10 }}>AIの伸び</th>
              <th style={{ textAlign: "right", borderBottom: "1px solid rgba(255,255,255,0.2)", padding: 10 }}>AIとの結びつき</th>
              <th style={{ textAlign: "left", borderBottom: "1px solid rgba(255,255,255,0.2)", padding: 10 }}>データの確からしさ</th>
              <th style={{ textAlign: "left", borderBottom: "1px solid rgba(255,255,255,0.2)", padding: 10 }}>基準月</th>
              <th style={{ textAlign: "left", borderBottom: "1px solid rgba(255,255,255,0.2)", padding: 10 }}>AIカテゴリ</th>
            </tr>
          </thead>
          <tbody>
            {sortedItems.map((stock, index) => {
              const missing = stock.score == null;
              return (
                <tr
                  key={stock.ticker}
                  style={missing ? { opacity: 0.7, background: "rgba(255,255,255,0.02)" } : undefined}
                >
                  <td style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", padding: 10, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>
                    {index + 1}
                  </td>
                  <td style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", padding: 10 }}>
                    <Link href={`/stocks/${stock.ticker}`}>{stock.ticker}</Link>
                  </td>
                  <td style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", padding: 10 }}>
                    <Link href={`/stocks/${stock.ticker}`}>{stock.name}</Link>
                  </td>
                  <td style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", padding: 10 }}>
                    {stock.score == null ? "データ不足" : `${stock.score} (${toStars(stock.score)})`}
                  </td>
                  <td style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", padding: 10, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>
                    {formatValue(stock.aiRevMid)}
                  </td>
                  <td style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", padding: 10, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>
                    {formatValue(stock.growthDiff)}
                  </td>
                  <td style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", padding: 10, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>
                    {stock.dependencyLabel ?? formatValue(stock.dependencyLevel)}
                  </td>
                  <td style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", padding: 10 }}>{formatValue(stock.tier)}</td>
                  <td style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", padding: 10 }}>{formatValue(stock.updatedMonth)}</td>
                  <td style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", padding: 10 }}>{getAiCategory(stock)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
