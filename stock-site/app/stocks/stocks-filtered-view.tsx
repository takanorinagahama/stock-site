"use client";

import Link from "next/link";
import { Fragment, useMemo, useState } from "react";
import type { StockApiItem } from "../../lib/fetch-stocks";
import { THEMES } from "../../lib/themes";
import { normalizeCategoryLabel } from "../../lib/categories";

/* ─── Design tokens ─── */
const CARD_BG = "rgba(255,255,255,0.04)";
const BORDER = "1px solid rgba(255,255,255,0.07)";
const TEXT_PRI = "#f1f5f9";
const TEXT_SEC = "#cbd5e1";
const TEXT_TER = "#94a3b8";
const INDIGO_BG = "rgba(99,102,241,0.1)";
const INDIGO_TEXT = "#a5b4fc";

const DUPLICATE_TICKER_GROUPS = [
  ["TSM", "2330.TW"],
  ["8035.T", "8035"],
  ["ASML", "ASML.AS"],
] as const;

/* ─── Helpers ─── */
function dedupeItems(items: StockApiItem[]): StockApiItem[] {
  const hiddenTickers = new Set<string>();
  for (const group of DUPLICATE_TICKER_GROUPS) {
    const norm = group.map((t) => t.toUpperCase());
    const existing = items.filter((item) => norm.includes(item.ticker.toUpperCase()));
    if (existing.length <= 1) continue;
    const preferred = norm.find((t) => existing.some((item) => item.ticker.toUpperCase() === t));
    for (const item of existing) {
      if (item.ticker.toUpperCase() !== preferred) hiddenTickers.add(item.ticker.toUpperCase());
    }
  }
  return items.filter((item) => !hiddenTickers.has(item.ticker.toUpperCase()));
}

function formatAiRevenue(value: number | null): string {
  if (value == null) return "—";
  return value.toLocaleString("en-US");
}

function formatGrowthDiff(value: number | null): string {
  if (value == null) return "—";
  const rounded = Math.round(value);
  return value > 0 ? `+${rounded}` : String(rounded);
}

function getAiCategoryLabel(stock: StockApiItem): string {
  return normalizeCategoryLabel(stock.categoryJa ?? stock.aiCategory ?? null);
}

function ScoreBadge({ score }: { score: number | null }) {
  if (score == null) return <span style={{ fontSize: 11, color: TEXT_TER, fontStyle: "italic" }}>—</span>;
  const color =
    score >= 80 ? "#6ee7b7" : score >= 65 ? "#a5b4fc" : score >= 50 ? "#93c5fd" : "#94a3b8";
  const bg =
    score >= 80
      ? "rgba(52,211,153,0.15)"
      : score >= 65
      ? "rgba(99,102,241,0.15)"
      : score >= 50
      ? "rgba(96,165,250,0.1)"
      : "rgba(148,163,184,0.1)";
  const border =
    score >= 80
      ? "rgba(52,211,153,0.3)"
      : score >= 65
      ? "rgba(99,102,241,0.3)"
      : "rgba(148,163,184,0.2)";
  return (
    <span
      style={{
        fontSize: 13,
        fontWeight: 700,
        padding: "2px 9px",
        borderRadius: 6,
        background: bg,
        color,
        border: `1px solid ${border}`,
        fontVariantNumeric: "tabular-nums",
      }}
    >
      {score}
    </span>
  );
}

function StarRating({ score }: { score: number | null }) {
  if (score == null) return null;
  const filled = Math.max(1, Math.min(5, Math.round(score / 20)));
  return (
    <span style={{ fontSize: 11, letterSpacing: 1 }}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} style={{ color: i < filled ? "#818cf8" : "rgba(255,255,255,0.15)" }}>
          ★
        </span>
      ))}
    </span>
  );
}

function DepBadge({ label, level }: { label: string | null; level: number | null }) {
  const dep = label ?? (level != null && level >= 3 ? "高い" : level != null && level >= 2 ? "中程度" : "低い");
  const colors: Record<string, { bg: string; text: string }> = {
    高い: { bg: "rgba(139,92,246,0.1)", text: "#c4b5fd" },
    中程度: { bg: "rgba(96,165,250,0.1)", text: "#93c5fd" },
    低い: { bg: "rgba(100,116,139,0.1)", text: "#94a3b8" },
  };
  const c = colors[dep] ?? colors["低い"];
  return (
    <span
      style={{
        fontSize: 12,
        fontWeight: 600,
        padding: "2px 8px",
        borderRadius: 5,
        background: c.bg,
        color: c.text,
        whiteSpace: "nowrap",
      }}
    >
      {dep}
    </span>
  );
}

/** 説明テキストのラベル付きブロック（上位10件用） */
function DescriptionRow({ companyDescription, aiSummary }: { companyDescription: string | null; aiSummary: string | null }) {
  if (!companyDescription && !aiSummary) return null;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 6,
        paddingBottom: 11,
        paddingLeft: 14,
        paddingRight: 14,
      }}
    >
      {companyDescription && (
        <p
         
          style={{
            fontSize: 13,
            color: TEXT_TER,
            lineHeight: 1.7,
            margin: 0,
            wordBreak: "break-word",
          }}
        >
          {companyDescription}
        </p>
      )}
      {aiSummary && (
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
              color: TEXT_SEC,
              lineHeight: 1.7,
              margin: 0,
              wordBreak: "break-word",
            }}
          >
            {aiSummary}
          </p>
        </div>
      )}
    </div>
  );
}

type Props = { items: StockApiItem[] };

const COLUMN_GUIDE = [
  {
    label: "AI期待度",
    desc: "0〜100の参考スコア。AI関連の成長期待度を4軸で算出した目安値です。",
  },
  {
    label: "AI売上（推定）",
    desc: "AI関連から生まれる売上規模の目安です（百万ドル単位）。",
  },
  {
    label: "AI成長力",
    desc: "AI関連事業の成長がどれだけスコアを押し上げているかを見る指標です。",
  },
  {
    label: "AI依存度",
    desc: "その企業の事業がAI需要とどれだけ強くつながっているかを示します。",
  },
  {
    label: "確度",
    desc: "データの信頼性。高いほどスコアに自信があります（1〜10）。",
  },
];

export default function StocksFilteredView({ items }: Props) {
  const [activeTheme, setActiveTheme] = useState<string>("all");

  const deduped = useMemo(() => dedupeItems(items), [items]);

  const sorted = useMemo(() => {
    return [...deduped].sort((a, b) => {
      if (a.score == null && b.score == null) return a.ticker.localeCompare(b.ticker);
      if (a.score == null) return 1;
      if (b.score == null) return -1;
      return b.score - a.score;
    });
  }, [deduped]);

  const filtered = useMemo(() => {
    if (activeTheme === "all") return sorted;
    const theme = THEMES.find((t) => t.slug === activeTheme);
    if (!theme) return sorted;
    const tickers = new Set(theme.featuredStocks.map((s) => s.ticker.toUpperCase()));
    return sorted.filter((s) => tickers.has(s.ticker.toUpperCase()));
  }, [activeTheme, sorted]);

  // テーマチップは、現在の銘柄リストに1件以上マッチするものだけ表示
  const availableThemes = useMemo(() => {
    const dedupedTickers = new Set(deduped.map((s) => s.ticker.toUpperCase()));
    return THEMES.filter((t) =>
      t.featuredStocks.some((s) => dedupedTickers.has(s.ticker.toUpperCase()))
    );
  }, [deduped]);

  return (
    <div>
      {/* Theme filter chips */}
      <div style={{ marginBottom: 20 }}>
        <p
          style={{
            fontSize: 11,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: TEXT_TER,
            marginBottom: 10,
          }}
        >
          テーマで絞り込む
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
          <ThemeChip label="すべて" active={activeTheme === "all"} onClick={() => setActiveTheme("all")} />
          {availableThemes.map((t) => (
            <ThemeChip
              key={t.slug}
              label={t.title}
              active={activeTheme === t.slug}
              onClick={() => setActiveTheme(t.slug)}
            />
          ))}
        </div>
      </div>

      {/* Table */}
      <div
        style={{
          background: CARD_BG,
          border: BORDER,
          borderRadius: 14,
          overflow: "hidden",
          marginBottom: 20,
        }}
      >
        <div>
          <style>{`
            @media (min-width: 768px) { .stock-mobile-cards { display: none !important; } }
            @media (max-width: 767px) { .stock-desktop-table { display: none !important; } }
            .sf-ticker-link:hover { opacity: 0.75; }
            .sf-name-link:hover { color: #f1f5f9 !important; }
          `}</style>

          {/* ── Mobile: cards ── */}
          <div className="stock-mobile-cards">
            {filtered.map((s, i) => {
              const isTopTen = i < 10;
              const hasDesc = isTopTen && (s.companyDescription || s.aiSummary);
              const cardBg = i % 2 === 1 ? "rgba(255,255,255,0.03)" : "transparent";
              return (
                <Link
                  key={s.ticker}
                  href={`/stocks/${s.ticker}`}
                  style={{
                    display: "block",
                    textDecoration: "none",
                    borderBottom: i < filtered.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                    padding: "14px 16px",
                    color: "inherit",
                    background: cardBg,
                  }}
                >
                  {/* ticker + score row */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 13, color: TEXT_TER, width: 20, textAlign: "center" }}>{i + 1}</span>
                      <div>
                        <span style={{ fontSize: 14, fontWeight: 700, color: TEXT_PRI }}>{s.ticker}</span>
                        <p style={{ fontSize: 13, color: TEXT_TER }}>{s.name}</p>
                      </div>
                    </div>
                    <ScoreBadge score={s.score} />
                  </div>

                  {/* stats row */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 14px", marginLeft: 30, marginBottom: hasDesc ? 8 : 0 }}>
                    <span style={{ fontSize: 12, color: TEXT_TER }}>AI売上: <span style={{ color: TEXT_SEC }}>{formatAiRevenue(s.aiRevMid)}</span></span>
                    <span style={{ fontSize: 12, color: TEXT_TER }}>成長: <span style={{ color: TEXT_SEC }}>{formatGrowthDiff(s.growthDiff)}</span></span>
                  </div>

                  {/* description area — top 10 only */}
                  {hasDesc && (
                    <div style={{ marginLeft: 30, display: "flex", flexDirection: "column", gap: 6 }}>
                      {s.companyDescription && (
                        <p
                         
                          style={{ fontSize: 13, color: TEXT_TER, lineHeight: 1.7, margin: 0 }}
                        >
                          {s.companyDescription}
                        </p>
                      )}
                      {s.aiSummary && (
                        <div>
                          <span
                            style={{
                              fontSize: 11,
                              fontWeight: 600,
                              color: "#818cf8",
                              letterSpacing: "0.06em",
                              textTransform: "uppercase",
                              display: "block",
                              marginBottom: 2,
                            }}
                          >
                            AIとの関わり
                          </span>
                          <p
                           
                            style={{ fontSize: 13, color: TEXT_SEC, lineHeight: 1.7, margin: 0 }}
                          >
                            {s.aiSummary}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </Link>
              );
            })}
          </div>

          {/* ── Desktop: table ── */}
          <div className="stock-desktop-table" style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed", minWidth: 1020 }}>
              <colgroup>
                <col style={{ width: 40 }} />
                <col style={{ width: 82 }} />
                <col />
                <col style={{ width: 148 }} />
                <col style={{ width: 148 }} />
                <col style={{ width: 110 }} />
                <col style={{ width: 80 }} />
                <col style={{ width: 82 }} />
                <col style={{ width: 60 }} />
              </colgroup>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                  {[
                    { label: "#", align: "center" as const, w: 40 },
                    { label: "ticker", align: "left" as const },
                    { label: "企業名", align: "left" as const },
                    { label: "AIカテゴリ", align: "left" as const },
                    { label: "AI期待度 ↑", align: "left" as const },
                    { label: "AI売上（推定）", align: "right" as const },
                    { label: "AI成長力", align: "right" as const },
                    { label: "AI依存度", align: "left" as const },
                    { label: "確度", align: "center" as const },
                  ].map((col, idx) => (
                    <th
                      key={idx}
                      style={{
                        textAlign: col.align,
                        padding: "11px 14px",
                        fontSize: 12,
                        fontWeight: 600,
                        color: TEXT_TER,
                        whiteSpace: "nowrap",
                        width: col.w,
                      }}
                    >
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((s, i) => {
                  const growth = s.growthDiff;
                  const growthStr = formatGrowthDiff(growth);
                  const growthColor =
                    growth == null
                      ? TEXT_TER
                      : growth > 0
                      ? "#6ee7b7"
                      : growth < 0
                      ? "#fca5a5"
                      : TEXT_SEC;
                  const isTopTen = i < 10;
                  const hasDesc = isTopTen && (s.companyDescription || s.aiSummary);
                  const rowBg = i % 2 === 1 ? "rgba(255,255,255,0.03)" : "transparent";
                  const rowBorder = !hasDesc && i < filtered.length - 1
                    ? "1px solid rgba(255,255,255,0.04)"
                    : "none";
                  const descBorder = i < filtered.length - 1
                    ? "1px solid rgba(255,255,255,0.04)"
                    : "none";

                  return (
                    <Fragment key={s.ticker}>
                      {/* ── Main data row ── */}
                      <tr style={{ borderBottom: rowBorder, background: rowBg }}>
                        <td style={{ padding: "11px 14px", textAlign: "center", color: TEXT_TER, fontSize: 13 }}>{i + 1}</td>
                        <td style={{ padding: "11px 14px" }}>
                          <Link
                            href={`/stocks/${s.ticker}`}
                            className="sf-ticker-link"
                            style={{
                              display: "inline-block",
                              fontSize: 13,
                              fontWeight: 700,
                              padding: "2px 8px",
                              borderRadius: 5,
                              background: INDIGO_BG,
                              color: INDIGO_TEXT,
                              textDecoration: "none",
                            }}
                          >
                            {s.ticker}
                          </Link>
                        </td>
                        <td style={{ padding: "11px 14px" }}>
                          <Link
                            href={`/stocks/${s.ticker}`}
                            className="sf-name-link"
                            style={{
                              fontSize: 13,
                              fontWeight: 500,
                              color: "#e2e8f0",
                              whiteSpace: "nowrap",
                              textDecoration: "none",
                              display: "block",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {s.name}
                          </Link>
                        </td>
                        <td style={{ padding: "11px 14px" }}>
                          <p
                            style={{
                              fontSize: 13,
                              color: TEXT_TER,
                              maxWidth: 180,
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {getAiCategoryLabel(s)}
                          </p>
                        </td>
                        <td style={{ padding: "11px 14px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <ScoreBadge score={s.score} />
                            <StarRating score={s.score} />
                          </div>
                        </td>
                        <td style={{ padding: "11px 14px", textAlign: "right" }}>
                          <span style={{ fontSize: 13, color: TEXT_SEC, fontVariantNumeric: "tabular-nums" }}>
                            {s.aiRevMid != null ? formatAiRevenue(s.aiRevMid) : <span style={{ fontSize: 11, color: TEXT_TER, fontStyle: "italic" }}>データ不足</span>}
                          </span>
                        </td>
                        <td style={{ padding: "11px 14px", textAlign: "right" }}>
                          {growth != null ? (
                            <span style={{ fontSize: 13, fontVariantNumeric: "tabular-nums", color: growthColor }}>
                              {growthStr}
                            </span>
                          ) : (
                            <span style={{ fontSize: 11, color: TEXT_TER, fontStyle: "italic" }}>データ不足</span>
                          )}
                        </td>
                        <td style={{ padding: "11px 14px" }}>
                          <DepBadge label={s.dependencyLabel} level={s.dependencyLevel} />
                        </td>
                        <td style={{ padding: "11px 14px", textAlign: "center" }}>
                          <TierBadge tier={s.tier} />
                        </td>
                      </tr>

                      {/* ── Description sub-row — top 10 only ── */}
                      {hasDesc && (
                        <tr style={{ borderBottom: descBorder, background: rowBg }}>
                          <td />
                          <td colSpan={8} style={{ paddingTop: 0 }}>
                            <DescriptionRow
                              companyDescription={s.companyDescription}
                              aiSummary={s.aiSummary}
                            />
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div style={{ padding: "48px 0", textAlign: "center", color: TEXT_TER, fontSize: 14 }}>
              該当する銘柄がありません
            </div>
          )}
        </div>
      </div>

      {/* Column guide */}
      <div
        style={{
          background: CARD_BG,
          border: BORDER,
          borderRadius: 14,
          padding: "20px 22px",
          marginBottom: 20,
        }}
      >
        <h3 style={{ fontSize: 13, fontWeight: 600, color: TEXT_SEC, marginBottom: 16 }}>
          各列の見方
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "12px 28px",
          }}
        >
          {COLUMN_GUIDE.map((col) => (
            <div key={col.label}>
              <p style={{ fontSize: 12, fontWeight: 600, color: "#e2e8f0", marginBottom: 3 }}>
                {col.label}
              </p>
              <p style={{ fontSize: 12, lineHeight: 1.6, color: TEXT_TER }}>{col.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div
        style={{
          background: "rgba(251,191,36,0.07)",
          border: "1px solid rgba(251,191,36,0.2)",
          borderRadius: 12,
          padding: "14px 18px",
          display: "flex",
          alignItems: "flex-start",
          gap: 10,
        }}
      >
        <span style={{ color: "#fbbf24", fontSize: 14, flexShrink: 0 }}>⚠</span>
        <p style={{ fontSize: 12, lineHeight: 1.7, color: "#fcd34d" }}>
          本サイトは参考情報の整理を目的としており、
          <strong>投資助言ではありません。</strong>
          最終的な投資判断はご自身の責任で行ってください。掲載情報の正確性・完全性・最新性は保証しません。
        </p>
      </div>
    </div>
  );
}

function TierBadge({ tier }: { tier: string | null }) {
  if (!tier) return <span style={{ fontSize: 11, color: TEXT_TER, fontStyle: "italic" }}>—</span>;
  const color =
    tier === "A" ? "#6ee7b7" : tier === "B" ? "#93c5fd" : TEXT_TER;
  const bg =
    tier === "A" ? "rgba(52,211,153,0.1)" : tier === "B" ? "rgba(96,165,250,0.1)" : "rgba(255,255,255,0.04)";
  return (
    <span
      style={{
        fontSize: 12,
        fontWeight: 700,
        padding: "2px 8px",
        borderRadius: 5,
        background: bg,
        color,
      }}
    >
      {tier}
    </span>
  );
}

function ThemeChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        fontSize: 11,
        fontWeight: 500,
        padding: "4px 10px",
        borderRadius: 7,
        border: active ? "1px solid rgba(99,102,241,0.35)" : "1px solid rgba(255,255,255,0.06)",
        background: active ? "rgba(99,102,241,0.15)" : "rgba(255,255,255,0.04)",
        color: active ? "#a5b4fc" : TEXT_TER,
        cursor: "pointer",
        transition: "all 0.15s",
        maxWidth: 200,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </button>
  );
}
