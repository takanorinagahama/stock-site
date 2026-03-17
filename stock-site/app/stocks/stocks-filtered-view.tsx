"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { StockApiItem } from "../../lib/fetch-stocks";
import { getCategoryDescription, normalizeCategoryLabel } from "../../lib/categories";

type Props = {
  items: StockApiItem[];
};

type FilterLabel =
  | "全て"
  | "AI半導体"
  | "AIクラウド"
  | "AIソフト"
  | "AIアプリケーション"
  | "AIネットワーク"
  | "AIインフラ"
  | "その他";

const FILTER_ORDER: FilterLabel[] = [
  "全て",
  "AI半導体",
  "AIクラウド",
  "AIソフト",
  "AIアプリケーション",
  "AIネットワーク",
  "AIインフラ",
  "その他",
];

const DUPLICATE_TICKER_GROUPS = [
  ["TSM", "2330.TW"],
  ["8035.T", "8035"],
  ["ASML", "ASML.AS"],
] as const;

function toStars(score: number): string {
  const stars = Math.max(1, Math.min(5, Math.round(score / 20)));
  return "★".repeat(stars) + "☆".repeat(5 - stars);
}

function formatValue(value: number | string | null): string {
  return value == null || value === "" ? "データ不足" : String(value);
}

function formatAiRevenue(value: number | null): string {
  if (value == null) return "データ不足";
  return value.toLocaleString("en-US");
}

function formatGrowthDiff(value: number | null): string {
  if (value == null) return "データ不足";
  const truncated = Math.trunc(value * 10) / 10;
  if (Number.isInteger(truncated)) return String(truncated);
  return truncated.toFixed(1);
}

function getAiCategory(stock: StockApiItem): string {
  return normalizeCategoryLabel(stock.categoryJa ?? stock.aiCategory ?? null);
}

function formatUpdatedMonth(value: string | null): string {
  return value == null || value === "" ? "未整理" : value;
}

function toFilterCategory(categoryJa: string): Exclude<FilterLabel, "全て"> {
  if (
    categoryJa.includes("半導体") ||
    categoryJa.includes("アクセラレータ") ||
    categoryJa.includes("CPU")
  ) {
    return "AI半導体";
  }
  if (categoryJa.includes("クラウド")) return "AIクラウド";
  if (categoryJa.includes("SaaS") || categoryJa.includes("ソフト")) return "AIソフト";
  if (categoryJa.includes("アプリケーション")) return "AIアプリケーション";
  if (categoryJa.includes("ネットワーク") || categoryJa.includes("光通信")) {
    return "AIネットワーク";
  }
  if (categoryJa.includes("インフラ") || categoryJa.includes("サーバー") || categoryJa.includes("データ基盤")) {
    return "AIインフラ";
  }
  return "その他";
}

function dedupeDisplayItems(items: StockApiItem[]): StockApiItem[] {
  const hiddenTickers = new Set<string>();

  for (const group of DUPLICATE_TICKER_GROUPS) {
    const normalizedGroup = group.map((ticker) => ticker.toUpperCase());
    const existing = items.filter((item) => normalizedGroup.includes(item.ticker.toUpperCase()));
    if (existing.length <= 1) continue;

    const preferredTicker = normalizedGroup.find((ticker) =>
      existing.some((item) => item.ticker.toUpperCase() === ticker),
    );

    for (const item of existing) {
      if (item.ticker.toUpperCase() !== preferredTicker) {
        hiddenTickers.add(item.ticker.toUpperCase());
      }
    }
  }

  return items.filter((item) => !hiddenTickers.has(item.ticker.toUpperCase()));
}

export default function StocksFilteredView({ items }: Props) {
  const [activeFilter, setActiveFilter] = useState<FilterLabel>("全て");

  const displayItems = useMemo(() => dedupeDisplayItems(items), [items]);

  const sortedItems = useMemo(() => {
    return [...displayItems].sort((a, b) => {
      const aScore = a.score;
      const bScore = b.score;
      if (aScore == null && bScore == null) return a.ticker.localeCompare(b.ticker);
      if (aScore == null) return 1;
      if (bScore == null) return -1;
      if (bScore !== aScore) return bScore - aScore;
      return a.ticker.localeCompare(b.ticker);
    });
  }, [displayItems]);

  const availableFilters = useMemo(() => {
    const found = new Set<FilterLabel>(["全て"]);
    for (const stock of sortedItems) {
      const filter = toFilterCategory(getAiCategory(stock));
      found.add(filter);
    }
    return FILTER_ORDER.filter((label) => found.has(label));
  }, [sortedItems]);

  const filteredItems = useMemo(() => {
    if (activeFilter === "全て") return sortedItems;
    return sortedItems.filter((stock) => toFilterCategory(getAiCategory(stock)) === activeFilter);
  }, [activeFilter, sortedItems]);

  const categoryEntries = useMemo(() => {
    const categoryMap = new Map<string, Array<{ ticker: string; name: string }>>();
    for (const stock of filteredItems) {
      const category = getAiCategory(stock).trim() || "未分類";
      const current = categoryMap.get(category) ?? [];
      current.push({ ticker: stock.ticker, name: stock.name });
      categoryMap.set(category, current);
    }
    return Array.from(categoryMap.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  }, [filteredItems]);

  return (
    <>
      <section
        style={{
          border: "1px solid rgba(255,255,255,0.1)",
          background: "rgba(255,255,255,0.05)",
          borderRadius: 16,
          padding: 14,
          marginBottom: 14,
        }}
      >
        <p style={{ margin: "0 0 8px", fontWeight: 700 }}>カテゴリで絞り込む</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {availableFilters.map((filter) => {
            const selected = filter === activeFilter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                style={{
                  border: selected
                    ? "1px solid rgba(255,255,255,0.45)"
                    : "1px solid rgba(255,255,255,0.2)",
                  background: selected ? "rgba(255,255,255,0.16)" : "rgba(255,255,255,0.06)",
                  color: "rgba(255,255,255,0.95)",
                  borderRadius: 999,
                  padding: "6px 12px",
                  fontSize: 13,
                  cursor: "pointer",
                }}
              >
                {filter}
              </button>
            );
          })}
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
              <th style={{ textAlign: "right", borderBottom: "1px solid rgba(255,255,255,0.2)", padding: 10 }}>AI関連売上の目安（百万ドル）</th>
              <th style={{ textAlign: "right", borderBottom: "1px solid rgba(255,255,255,0.2)", padding: 10 }}>AIの伸び（%）</th>
              <th style={{ textAlign: "right", borderBottom: "1px solid rgba(255,255,255,0.2)", padding: 10 }}>AIとの結びつき</th>
              <th style={{ textAlign: "left", borderBottom: "1px solid rgba(255,255,255,0.2)", padding: 10 }}>データの確からしさ</th>
              <th style={{ textAlign: "left", borderBottom: "1px solid rgba(255,255,255,0.2)", padding: 10 }}>基準月</th>
              <th style={{ textAlign: "left", borderBottom: "1px solid rgba(255,255,255,0.2)", padding: 10 }}>AIカテゴリ</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((stock, index) => {
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
                    {stock.score == null ? (
                      <>
                        データ不足
                        <div style={{ fontSize: 11, opacity: 0.72, marginTop: 3 }}>
                          一次情報の追加確認中
                        </div>
                      </>
                    ) : (
                      `${stock.score} (${toStars(stock.score)})`
                    )}
                    {stock.scoreReasonLabels && stock.scoreReasonLabels.length > 0 ? (
                      <div style={{ fontSize: 11, opacity: 0.72, marginTop: 3 }}>
                        {stock.scoreReasonLabels.slice(0, 2).join(" / ")}
                      </div>
                    ) : null}
                  </td>
                  <td style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", padding: 10, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>
                    {formatAiRevenue(stock.aiRevMid)}
                  </td>
                  <td style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", padding: 10, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>
                    {formatGrowthDiff(stock.growthDiff)}
                  </td>
                  <td style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", padding: 10, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>
                    {stock.dependencyLabel ?? formatValue(stock.dependencyLevel)}
                  </td>
                  <td style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", padding: 10 }}>{formatValue(stock.tier)}</td>
                  <td style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", padding: 10 }}>{formatUpdatedMonth(stock.updatedMonth)}</td>
                  <td style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", padding: 10 }}>{getAiCategory(stock)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
