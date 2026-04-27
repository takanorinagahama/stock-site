import Link from "next/link";
import type { StockApiItem } from "../../lib/fetch-stocks";
import { normalizeCategoryLabel } from "../../lib/categories";

/* ─── Design tokens ─── */
const TEXT_PRI = "#f1f5f9";
const TEXT_SEC = "#cbd5e1";
const TEXT_TER = "#94a3b8";
const INDIGO_BG = "rgba(99,102,241,0.1)";
const INDIGO_TEXT = "#a5b4fc";

/* ─── Helpers ─── */
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

/* ─── Sub-components ─── */
function ScoreBadge({ score }: { score: number | null }) {
  if (score == null)
    return (
      <span style={{ fontSize: 11, color: TEXT_TER, fontStyle: "italic" }}>
        —
      </span>
    );
  const color =
    score >= 80
      ? "#6ee7b7"
      : score >= 65
      ? "#a5b4fc"
      : score >= 50
      ? "#93c5fd"
      : TEXT_TER;
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
        <span
          key={i}
          style={{ color: i < filled ? "#818cf8" : "rgba(255,255,255,0.15)" }}
        >
          ★
        </span>
      ))}
    </span>
  );
}

function DepBadge({
  label,
  level,
}: {
  label: string | null;
  level: number | null;
}) {
  const dep =
    label ??
    (level != null && level >= 3
      ? "高い"
      : level != null && level >= 2
      ? "中程度"
      : "低い");
  const colors: Record<string, { bg: string; text: string }> = {
    高い: { bg: "rgba(139,92,246,0.1)", text: "#c4b5fd" },
    中程度: { bg: "rgba(96,165,250,0.1)", text: "#93c5fd" },
    低い: { bg: "rgba(100,116,139,0.1)", text: TEXT_TER },
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

function TierBadge({ tier }: { tier: string | null }) {
  if (!tier)
    return (
      <span style={{ fontSize: 11, color: TEXT_TER, fontStyle: "italic" }}>
        —
      </span>
    );
  const color =
    tier === "A" ? "#6ee7b7" : tier === "B" ? "#93c5fd" : TEXT_TER;
  const bg =
    tier === "A"
      ? "rgba(52,211,153,0.1)"
      : tier === "B"
      ? "rgba(96,165,250,0.1)"
      : "rgba(255,255,255,0.04)";
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

/* ─── Individual ranked card ─── */
function RankCard({ stock, rank }: { stock: StockApiItem; rank: number }) {
  const growth = stock.growthDiff;
  const growthStr = formatGrowthDiff(growth);
  const growthColor =
    growth == null
      ? TEXT_TER
      : growth > 0
      ? "#6ee7b7"
      : growth < 0
      ? "#fca5a5"
      : TEXT_SEC;
  const hasDesc = stock.companyDescription || stock.aiSummary;

  return (
    <Link
      href={`/stocks/${stock.ticker}`}
      className="rl-card"
      style={{
        display: "block",
        textDecoration: "none",
        color: "inherit",
        background: "#141922",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 14,
        padding: "16px 20px",
      }}
    >
      {/* ── Main info row ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          flexWrap: "wrap",
        }}
      >
        {/* Rank */}
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: TEXT_TER,
            width: 22,
            textAlign: "center",
            flexShrink: 0,
          }}
        >
          {rank}
        </span>

        {/* Ticker badge */}
        <span
          style={{
            fontSize: 13,
            fontWeight: 700,
            padding: "2px 8px",
            borderRadius: 5,
            background: INDIGO_BG,
            color: INDIGO_TEXT,
            flexShrink: 0,
          }}
        >
          {stock.ticker}
        </span>

        {/* Name + Category */}
        <div style={{ flex: 1, minWidth: 120 }}>
          <p
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: TEXT_PRI,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              margin: 0,
            }}
          >
            {stock.name}
          </p>
          <p style={{ fontSize: 11, color: TEXT_TER, margin: "2px 0 0" }}>
            {getAiCategoryLabel(stock)}
          </p>
        </div>

        {/* Score + Stats */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            flexShrink: 0,
            flexWrap: "wrap",
            justifyContent: "flex-end",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <ScoreBadge score={stock.score} />
            <StarRating score={stock.score} />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontSize: 12,
                color: TEXT_TER,
                whiteSpace: "nowrap",
              }}
            >
              AI売上:{" "}
              <span
                style={{
                  color: TEXT_SEC,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {stock.aiRevMid != null
                  ? formatAiRevenue(stock.aiRevMid)
                  : "—"}
              </span>
            </span>
            <span
              style={{
                fontSize: 12,
                color: TEXT_TER,
                whiteSpace: "nowrap",
              }}
            >
              成長:{" "}
              <span
                style={{
                  color: growthColor,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {growthStr}
              </span>
            </span>
            <DepBadge
              label={stock.dependencyLabel}
              level={stock.dependencyLevel}
            />
            <TierBadge tier={stock.tier} />
          </div>
        </div>
      </div>

      {/* ── Description ── */}
      {hasDesc && (
        <div
          style={{
            marginTop: 10,
            marginLeft: 36,
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          {stock.companyDescription && (
            <p
              style={{
                fontSize: 13,
                color: TEXT_TER,
                lineHeight: 1.7,
                margin: 0,
                wordBreak: "break-word",
              }}
            >
              {stock.companyDescription}
            </p>
          )}
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
                  color: TEXT_SEC,
                  lineHeight: 1.7,
                  margin: 0,
                  wordBreak: "break-word",
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
}

/* ─── Main component ─── */
interface RankingListProps {
  stocks: StockApiItem[];
}

export function RankingList({ stocks }: RankingListProps) {
  return (
    <section>
      <style>{`
        .rl-card { transition: border-color 0.15s, box-shadow 0.15s; }
        .rl-card:hover { border-color: rgba(255,255,255,0.22) !important; box-shadow: 0 2px 16px rgba(0,0,0,0.25); }
      `}</style>

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
            }}
          >
            AI期待度ランキング TOP5
          </h2>
          <p style={{ fontSize: 13, color: TEXT_TER, marginTop: 4 }}>
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

      {/* Card list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {stocks.map((stock, i) => (
          <RankCard key={stock.ticker} stock={stock} rank={i + 1} />
        ))}
      </div>
    </section>
  );
}
