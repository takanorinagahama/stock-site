import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteHeader } from "../../../components/shared/SiteHeader";
import { fetchStockByTicker } from "../../../lib/fetch-stocks";
import { THEMES } from "../../../lib/themes";

/* ─── Design tokens ─── */
const BG = "#0c1118";
const CARD_BG = "rgba(255,255,255,0.04)";
const CARD_BG2 = "#141922";
const BORDER = "1px solid rgba(255,255,255,0.07)";
const BORDER2 = "1px solid rgba(255,255,255,0.1)";
const TEXT_PRI = "#f1f5f9";
const TEXT_SEC = "#cbd5e1";
const TEXT_TER = "#94a3b8";
const INDIGO_BG = "rgba(99,102,241,0.1)";
const INDIGO_TEXT = "#a5b4fc";

/** 新スコア体系: 全指標 0–100 */
const MAX_PARTS = { ai: 100, growth: 100, dependency: 100, tier: 100 };

type DetailPageProps = { params: Promise<{ ticker: string }> };

export async function generateMetadata({ params }: DetailPageProps): Promise<Metadata> {
  const { ticker } = await params;
  const item = await fetchStockByTicker(ticker);
  if (!item) return {};
  const title = `${item.ticker} (${item.name}) のAIスコア・事業概要 | AI Stock Data`;
  const description =
    item.aiSummary ??
    `${item.name}（${item.ticker}）のAI関連スコアと事業概要。AI期待度・売上・成長力・依存度を整理した参考情報です。`;
  return {
    title,
    description,
    openGraph: { title, description },
    twitter: { card: "summary", title, description },
  };
}

function asText(value: number | string | null | undefined, fallback = "データ不足"): string {
  return value == null || value === "" ? fallback : String(value);
}

function formatAiRevenue(value: number | null | undefined): string {
  if (value == null) return "データ不足";
  return value.toLocaleString("en-US");
}

const SITE_URL = "https://ai-stock-data.com";

function buildShareUrls(ticker: string, name: string) {
  const pageUrl = `${SITE_URL}/stocks/${ticker}`;
  const text = encodeURIComponent(`${ticker}（${name}）のAI期待度スコアと事業概要`);
  const encodedUrl = encodeURIComponent(pageUrl);
  return {
    x: `https://twitter.com/intent/tweet?text=${text}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
  };
}

function ScoreBadge({ score }: { score: number | null }) {
  if (score == null) return <span style={{ fontSize: 32, fontWeight: 700, color: TEXT_TER }}>—</span>;
  const color = score >= 80 ? "#6ee7b7" : score >= 65 ? "#a5b4fc" : "#94a3b8";
  const bg =
    score >= 80 ? "rgba(52,211,153,0.12)" : score >= 65 ? "rgba(99,102,241,0.12)" : "rgba(148,163,184,0.1)";
  const border =
    score >= 80 ? "rgba(52,211,153,0.3)" : score >= 65 ? "rgba(99,102,241,0.3)" : "rgba(148,163,184,0.2)";
  return (
    <span
      style={{
        fontSize: 32,
        fontWeight: 800,
        padding: "4px 14px",
        borderRadius: 10,
        background: bg,
        color,
        border: `1px solid ${border}`,
        letterSpacing: "-0.02em",
      }}
    >
      {score}
    </span>
  );
}

function Stars({ score }: { score: number | null }) {
  if (score == null) return null;
  const filled = Math.max(1, Math.min(5, Math.round(score / 20)));
  return (
    <span style={{ fontSize: 14, letterSpacing: 2 }}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} style={{ color: i < filled ? "#818cf8" : "rgba(255,255,255,0.2)" }}>
          ★
        </span>
      ))}
    </span>
  );
}

function ContributionBar({
  label,
  value,
  max,
  color,
}: {
  label: string;
  value: number;
  max: number;
  color: string;
}) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 5,
        }}
      >
        <span style={{ fontSize: 12, color: TEXT_SEC }}>{label}</span>
        <span style={{ fontSize: 13, fontWeight: 700, color: TEXT_PRI }}>{value}</span>
      </div>
      <div
        style={{
          height: 6,
          borderRadius: 99,
          background: "rgba(255,255,255,0.07)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            borderRadius: 99,
            background: color,
            transition: "width 0.4s ease",
          }}
        />
      </div>
    </div>
  );
}

export default async function StockDetailPage({ params }: DetailPageProps) {
  const { ticker } = await params;
  const item = await fetchStockByTicker(ticker);

  if (!item) notFound();

  /* Related themes */
  const relatedThemes = THEMES.filter((t) =>
    t.featuredStocks.some((s) => s.ticker.toUpperCase() === item.ticker.toUpperCase())
  );

  /* Category / dependency tags */
  const categoryLabel = item.categoryJa ?? item.aiCategory ?? null;
  const depLabel =
    item.dependencyLabel ??
    (item.dependencyLevel != null && item.dependencyLevel >= 3
      ? "高い"
      : item.dependencyLevel != null && item.dependencyLevel >= 2
        ? "中程度"
        : "低い");

  /* Score parts sum (for average display) */
  const partsSum = item.scoreParts
    ? item.scoreParts.ai + item.scoreParts.growth + item.scoreParts.dependency + (item.scoreParts.tier ?? 0)
    : null;

  const shareUrls = buildShareUrls(item.ticker, item.name);

  /* 非アクティブバナー */
  const inactiveBanner =
    item.isActive === false ? (
      <div
        style={{
          background: "rgba(251,191,36,0.09)",
          border: "1px solid rgba(251,191,36,0.35)",
          borderRadius: 12,
          padding: "10px 16px",
          marginBottom: 20,
          fontSize: 13,
          color: "#fcd34d",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span>⚠</span>
        <span>この銘柄は現在の銘柄リストには含まれていません。過去時点のデータを表示しています。</span>
      </div>
    ) : null;

  return (
    <div
      style={{
        background: BG,
        minHeight: "100vh",
        color: TEXT_PRI,
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <SiteHeader />

      <div style={{ maxWidth: 1152, margin: "0 auto", padding: "36px 20px 72px" }}>
        {/* Breadcrumb */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginBottom: 24,
            fontSize: 13,
            color: TEXT_TER,
            flexWrap: "wrap",
          }}
        >
          <Link href="/" style={{ color: TEXT_TER, textDecoration: "none" }}>ホーム</Link>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>›</span>
          <Link href="/stocks" style={{ color: TEXT_TER, textDecoration: "none" }}>銘柄一覧</Link>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>›</span>
          <span style={{ color: TEXT_SEC }}>{item.ticker}</span>
        </nav>

        {inactiveBanner}

        {/* ===== Summary header card ===== */}
        <div
          style={{
            background: CARD_BG2,
            border: BORDER2,
            borderRadius: 20,
            padding: "24px 28px",
            marginBottom: 28,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          {/* Left */}
          <div>
            <p style={{ fontSize: 12, color: TEXT_TER, marginBottom: 6 }}>銘柄概要</p>
            <h1
              style={{
                fontSize: "clamp(28px,6vw,42px)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: TEXT_PRI,
                marginBottom: 4,
              }}
            >
              {item.ticker}
            </h1>
            <p style={{ fontSize: 15, color: TEXT_SEC, marginBottom: 16 }}>{item.name}</p>

            {/* Tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 18 }}>
              {categoryLabel && (
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    padding: "3px 9px",
                    borderRadius: 5,
                    background: INDIGO_BG,
                    color: INDIGO_TEXT,
                    border: "1px solid rgba(99,102,241,0.25)",
                  }}
                >
                  {categoryLabel}
                </span>
              )}
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  padding: "3px 9px",
                  borderRadius: 5,
                  background:
                    depLabel === "高い"
                      ? "rgba(139,92,246,0.1)"
                      : depLabel === "中程度"
                        ? "rgba(96,165,250,0.1)"
                        : "rgba(100,116,139,0.1)",
                  color:
                    depLabel === "高い" ? "#c4b5fd" : depLabel === "中程度" ? "#93c5fd" : "#94a3b8",
                }}
              >
                AI依存度: {depLabel}
              </span>
              {relatedThemes.slice(0, 3).map((t) => (
                <Link key={t.slug} href={`/themes/${t.slug}`} style={{ textDecoration: "none" }}>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 500,
                      padding: "3px 9px",
                      borderRadius: 5,
                      background: "rgba(255,255,255,0.04)",
                      color: TEXT_TER,
                      border: "1px solid rgba(255,255,255,0.07)",
                      display: "inline-block",
                    }}
                  >
                    {t.title}
                  </span>
                </Link>
              ))}
            </div>

            {/* External links */}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {item.companyUrl ? (
                <a
                  href={item.companyUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    padding: "6px 14px",
                    borderRadius: 8,
                    border: BORDER2,
                    background: "rgba(255,255,255,0.05)",
                    color: TEXT_SEC,
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  🌐 公式サイト
                </a>
              ) : null}
              {item.irUrl ? (
                <a
                  href={item.irUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    padding: "6px 14px",
                    borderRadius: 8,
                    border: BORDER2,
                    background: "rgba(255,255,255,0.05)",
                    color: TEXT_SEC,
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  📊 IRページ
                </a>
              ) : null}
              {/* 公開情報リンク（全銘柄表示） */}
              <Link
                href={`/stocks/${item.ticker}/filings`}
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  padding: "6px 14px",
                  borderRadius: 8,
                  border: BORDER2,
                  background: "rgba(255,255,255,0.05)",
                  color: TEXT_SEC,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                📄 公開情報
              </Link>
              <a
                href={shareUrls.x}
                target="_blank"
                rel="noopener noreferrer"
                title="Xで共有"
                style={{
                  padding: "6px 10px",
                  borderRadius: 8,
                  border: "1px solid rgba(255,255,255,0.07)",
                  background: "rgba(255,255,255,0.03)",
                  color: TEXT_TER,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-label="X">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href={shareUrls.facebook}
                target="_blank"
                rel="noopener noreferrer"
                title="Facebookで共有"
                style={{
                  padding: "6px 10px",
                  borderRadius: 8,
                  border: "1px solid rgba(255,255,255,0.07)",
                  background: "rgba(255,255,255,0.03)",
                  color: TEXT_TER,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-label="Facebook">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Right: Score badge */}
          <div style={{ textAlign: "center", minWidth: 100 }}>
            <p
              style={{
                fontSize: 11,
                color: TEXT_TER,
                marginBottom: 8,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              AI期待度
            </p>
            <ScoreBadge score={item.score} />
            {item.score != null && (
              <div style={{ marginTop: 8 }}>
                <Stars score={item.score} />
              </div>
            )}
          </div>
        </div>

        {/* ===== 2-column body ===== */}
        <div
          className="stock-detail-grid"
          style={{ display: "grid", gridTemplateColumns: "1fr", gap: 20 }}
        >
          {/* ── Left column ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Company description */}
            <div style={{ background: CARD_BG, border: BORDER, borderRadius: 14, padding: "22px 24px" }}>
              <h2 style={{ fontSize: 14, fontWeight: 600, color: "#e2e8f0", marginBottom: 18 }}>
                この会社は何をしている？AIとどう関わる？
              </h2>
              <div style={{ marginBottom: 18 }}>
                <p style={{ fontSize: 11, fontWeight: 600, color: TEXT_TER, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8 }}>
                  会社概要
                </p>
                <p style={{ fontSize: 14, lineHeight: 1.8, color: TEXT_SEC }}>
                  {item.companyDescription ?? "準備中"}
                </p>
              </div>
              <div>
                <p style={{ fontSize: 11, fontWeight: 600, color: TEXT_TER, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8 }}>
                  AIとの関わり
                </p>
                <p style={{ fontSize: 14, lineHeight: 1.8, color: TEXT_SEC }}>
                  {item.aiSummary ?? "準備中"}
                </p>
              </div>
            </div>

            {/* Input values table */}
            <div style={{ background: CARD_BG, border: BORDER, borderRadius: 14, padding: "22px 24px" }}>
              <h2 style={{ fontSize: 14, fontWeight: 600, color: "#e2e8f0", marginBottom: 6 }}>
                スコア内訳（入力値）
              </h2>
              <p style={{ fontSize: 12, color: TEXT_TER, marginBottom: 16 }}>
                scoreを作るための入力値です。値がない場合は「データ不足」と表示します。
              </p>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <tbody>
                    {[
                      { label: "ティッカー", value: item.ticker },
                      { label: "企業名", value: item.name },
                      { label: "AI期待度", value: asText(item.score) },
                      { label: "AI売上（推定）", value: formatAiRevenue(item.aiRevMid) },
                      { label: "AI成長スコア", value: asText(item.scoreParts?.growth) },
                      { label: "AI依存度", value: item.dependencyLabel ?? asText(item.dependencyLevel) },
                      { label: "確度スコア", value: asText(item.scoreParts?.tier) },
                      { label: "基準月", value: asText(item.updatedMonth) },
                    ].map((row, i, arr) => (
                      <tr
                        key={row.label}
                        style={{ borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}
                      >
                        <th
                          style={{
                            textAlign: "left",
                            padding: "10px 12px",
                            fontSize: 12,
                            fontWeight: 600,
                            color: TEXT_TER,
                            whiteSpace: "nowrap",
                            width: 180,
                          }}
                        >
                          {row.label}
                        </th>
                        <td style={{ padding: "10px 12px", fontSize: 13, color: TEXT_SEC }}>
                          {row.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Score bars (4 metrics) */}
            <div style={{ background: CARD_BG, border: BORDER, borderRadius: 14, padding: "22px 24px" }}>
              <h2 style={{ fontSize: 14, fontWeight: 600, color: "#e2e8f0", marginBottom: 6 }}>
                スコア内訳（4指標）
              </h2>
              <p style={{ fontSize: 12, color: TEXT_TER, marginBottom: 18 }}>
                各指標は0〜100のスコアです。AI期待度 = 4指標の平均値（小数点以下四捨五入）。
              </p>

              {item.scoreParts ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <ContributionBar label="AI売上スコア"   value={item.scoreParts.ai}         max={MAX_PARTS.ai}         color="#818cf8" />
                  <ContributionBar label="AI成長スコア"   value={item.scoreParts.growth}      max={MAX_PARTS.growth}     color="#34d399" />
                  <ContributionBar label="AI依存度スコア" value={item.scoreParts.dependency}  max={MAX_PARTS.dependency} color="#60a5fa" />
                  <ContributionBar label="確度スコア"     value={item.scoreParts.tier ?? 0}   max={MAX_PARTS.tier}       color="#fbbf24" />
                  {/* Average total */}
                  <div
                    style={{
                      marginTop: 4,
                      paddingTop: 14,
                      borderTop: "1px solid rgba(255,255,255,0.06)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span style={{ fontSize: 13, fontWeight: 600, color: TEXT_SEC }}>AI期待度（平均）</span>
                    <span style={{ fontSize: 18, fontWeight: 800, color: TEXT_PRI, letterSpacing: "-0.02em" }}>
                      {item.score ?? "—"}
                      {item.score != null && partsSum != null && (
                        <span style={{ fontSize: 12, color: TEXT_TER, fontWeight: 400, marginLeft: 6 }}>
                          ({(partsSum / 4).toFixed(1)} + 四捨五入)
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              ) : (
                <p style={{ fontSize: 13, color: TEXT_TER, fontStyle: "italic" }}>
                  スコアデータがありません。
                </p>
              )}
            </div>
          </div>

          {/* ── Right column ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Page guide */}
            <div style={{ background: CARD_BG, border: BORDER, borderRadius: 14, padding: "20px 22px" }}>
              <h3 style={{ fontSize: 13, fontWeight: 600, color: TEXT_SEC, marginBottom: 14 }}>
                このページの読み方
              </h3>
              <p style={{ fontSize: 12, lineHeight: 1.7, color: TEXT_TER, marginBottom: 14 }}>
                AI関連事業がその企業にどれだけ重要かを、売上規模・成長・事業の結びつき・データ確度の4つの観点から整理しています。
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { label: "AI期待度",     desc: "AI売上・成長・依存度・確度の4指標を平均した総合スコア。100を超えません。" },
                  { label: "AI売上スコア", desc: "AI関連事業から生まれている売上規模の大きさを0〜100で評価したスコアです。" },
                  { label: "AI成長スコア", desc: "AI関連事業の売上成長の強さを0〜100で評価したスコアです。" },
                  { label: "AI依存度スコア", desc: "その企業の事業・AIとどれだけ深く結びついているかを0〜100で評価したスコアです。" },
                  { label: "確度スコア",   desc: "AI関連売上の推定に使ったデータの信頼度を0〜100で評価したスコアです（A=90〜、B=70〜、C=70未満）。" },
                ].map((guide) => (
                  <div key={guide.label}>
                    <p style={{ fontSize: 12, fontWeight: 600, color: "#e2e8f0", marginBottom: 2 }}>{guide.label}</p>
                    <p style={{ fontSize: 11, lineHeight: 1.6, color: TEXT_TER }}>{guide.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Related themes */}
            {relatedThemes.length > 0 && (
              <div style={{ background: CARD_BG, border: BORDER, borderRadius: 14, padding: "20px 22px" }}>
                <h3 style={{ fontSize: 13, fontWeight: 600, color: TEXT_SEC, marginBottom: 12 }}>関連テーマ</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                  {relatedThemes.map((t) => (
                    <Link
                      key={t.slug}
                      href={`/themes/${t.slug}`}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "8px 10px",
                        borderRadius: 8,
                        border: "1px solid rgba(255,255,255,0.05)",
                        textDecoration: "none",
                        color: "#e2e8f0",
                        fontSize: 12,
                        fontWeight: 500,
                      }}
                    >
                      <span>{t.title}</span>
                      <span style={{ color: TEXT_TER, fontSize: 12 }}>›</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Disclaimer — full width below grid */}
        <div
          style={{
            marginTop: 20,
            background: "rgba(251,191,36,0.06)",
            border: "1px solid rgba(251,191,36,0.15)",
            borderRadius: 10,
            padding: "12px 16px",
            display: "flex",
            alignItems: "flex-start",
            gap: 12,
          }}
        >
          <span style={{ color: "#fbbf24", fontSize: 14, flexShrink: 0 }}>⚠</span>
          <p style={{ fontSize: 12, lineHeight: 1.7, color: "rgba(253,230,138,0.7)", margin: 0 }}>
            本サイトは参考情報の整理を目的としており、
            <strong style={{ color: "rgba(253,230,138,0.9)", fontWeight: 500 }}>投資助言ではありません。</strong>
            最終的な投資判断はご自身の責任で行ってください。掲載情報の正確性・完全性・最新性は保証しません。
          </p>
        </div>
      </div>

      {/* Responsive 2-col grid */}
      <style>{`
        @media (min-width: 900px) {
          .stock-detail-grid {
            grid-template-columns: 3fr 2fr !important;
          }
        }
      `}</style>
    </div>
  );
}

