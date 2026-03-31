import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "../../../components/shared/SiteHeader";
import { getThemeStocks } from "../../../lib/get-theme-stocks";
import {
  getAllThemeSlugs,
  getThemeBySlug,
  getThemeGroupsForSlug,
  THEME_GROUPS,
  type ThemeGroupKey,
} from "../../../lib/themes";

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

const CAT_COLORS: Record<
  ThemeGroupKey,
  { dot: string; bg: string; text: string; border: string }
> = {
  "ai-semiconductors": {
    dot: "#818cf8",
    bg: "rgba(99,102,241,0.08)",
    text: "#a5b4fc",
    border: "rgba(99,102,241,0.2)",
  },
  "ai-infrastructure": {
    dot: "#60a5fa",
    bg: "rgba(96,165,250,0.08)",
    text: "#93c5fd",
    border: "rgba(96,165,250,0.2)",
  },
  "ai-software-platform": {
    dot: "#22d3ee",
    bg: "rgba(34,211,238,0.08)",
    text: "#67e8f9",
    border: "rgba(34,211,238,0.2)",
  },
  "ai-adoption": {
    dot: "#34d399",
    bg: "rgba(52,211,153,0.08)",
    text: "#6ee7b7",
    border: "rgba(52,211,153,0.2)",
  },
  "energy-power": {
    dot: "#fbbf24",
    bg: "rgba(251,191,36,0.08)",
    text: "#fcd34d",
    border: "rgba(251,191,36,0.2)",
  },
};

const FALLBACK_COLOR = CAT_COLORS["ai-semiconductors"];

function getComparePointDescription(point: string): string {
  const descriptions: Record<string, string> = {
    "AI需要との距離の近さ": "AI投資の拡大が、その企業の売上や需要にどれだけ直接つながるかを見ます。",
    "売上への寄与の大きさ": "AI関連事業が全体業績の中でどれくらい存在感を持つかを確認する視点です。",
    "成長余地と競争優位": "市場拡大の中で、どの企業が伸びやすく、差別化要因を持つかを整理します。",
    "バリュエーションの高さ": "期待が株価にどこまで織り込まれているかを確認する比較軸です。",
    "AI売上への直接性": "AI需要の拡大が売上に直結しやすいかどうかを見る観点です。",
    "技術優位性": "製品性能、工程、独自技術などで優位性を持てるかを確認します。",
    "顧客集中度": "特定顧客への依存が高すぎないかを見て、変動リスクを把握します。",
    "設備投資循環の影響": "需要拡大の恩恵が継続的か、設備投資サイクルに左右されやすいかを確認します。",
    "地政学リスク": "輸出規制や地域リスクの影響を受けやすいかを整理します。",
    "データセンター需要とのつながり": "AI計算需要の増加が、施設やサーバー投資にどこまで波及するかを見る視点です。",
    "サーバー・ネットワーク投資の取り込み余地": "計算基盤の増設需要をどの企業が取り込みやすいかを比較します。",
    "クラウドとの関係": "クラウド基盤との結びつきが強いかどうかを整理します。",
    "継続需要か一過性か": "一時的な投資特需なのか、長く続く需要なのかを見極める観点です。",
    "NVIDIA需要との結びつきの強さ": "NVIDIAの需要拡大にどれだけ影響を受けるかを確認します。",
    "直接恩恵か間接恩恵か": "売上への反映が直接的か、周辺需要経由かを整理します。",
    "代替競争や依存リスク": "競争環境と特定企業依存の強さを比較するための視点です。",
    "サプライチェーン上の立ち位置": "上流・中流・下流のどこで恩恵を受ける企業かを確認します。",
    "データセンター投資への直接性": "施設新設や増設の影響がどれだけ直接業績に出るかを見ます。",
    "電力・冷却・通信との関係": "施設運営を支える周辺インフラとの結びつきを整理します。",
    "長期需要の継続性": "AI需要が中長期で続く前提にどれだけ支えられているかを確認します。",
    "地域集積と供給制約": "特定地域への需要集中や供給不足の影響を見ます。",
    "AI由来の電力需要とのつながり": "AIやデータセンターの増設が電力需要増にどれだけつながるかを見る観点です。",
    "発電・送配電・設備のどこに位置するか": "電力バリューチェーンのどの層にいる企業かを整理します。",
    "脱炭素電源との関係": "再エネや低炭素電源との結びつきがあるかを確認します。",
    "規制産業としての特性": "料金制度や政策の影響を受けやすいかを把握する視点です。",
    "地域性": "首都圏や関西圏など、立地による差が大きいテーマかを見ます。",
    "データセンター需要との距離の近さ": "施設増設による需要が、その企業にどれだけ近い位置で発生するかを確認します。",
    "首都圏・関西圏など地域性": "需要がどの地域で強く出やすいかを整理する比較軸です。",
    "発電か送配電か設備か": "どの機能でテーマに関わる企業かを見分けるための観点です。",
    "安定需要か投資循環か": "継続収益型か、設備投資の波に左右されるかを比較します。",
  };
  return descriptions[point] ?? "そのテーマを比較するときに確認しておきたい観点です。";
}

type ThemePageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllThemeSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ThemePageProps): Promise<Metadata> {
  const { slug } = await params;
  const theme = getThemeBySlug(slug);
  if (!theme) return { title: "テーマが見つかりません | AI Stock Data" };
  return {
    title: `${theme.title} | AI Stock Data`,
    description: theme.shortDescription,
    alternates: { canonical: `https://ai-stock-data.com/themes/${theme.slug}` },
  };
}

export default async function ThemeDetailPage({ params }: ThemePageProps) {
  const { slug } = await params;
  const theme = getThemeBySlug(slug);
  if (!theme) notFound();

  const stocks = await getThemeStocks(theme);
  const themeGroups = getThemeGroupsForSlug(theme.slug);
  const relatedThemes = theme.relatedThemes
    .map((relatedSlug) => getThemeBySlug(relatedSlug))
    .filter((item): item is NonNullable<typeof item> => item != null);

  /* Category color */
  const catGroupKey = (themeGroups[0]?.key ?? "ai-semiconductors") as ThemeGroupKey;
  const col = CAT_COLORS[catGroupKey] ?? FALLBACK_COLOR;
  const catName = themeGroups[0]?.title ?? "テーマ";

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

      <div style={{ maxWidth: 1152, margin: "0 auto", padding: "40px 20px 72px" }}>
        {/* Breadcrumb */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginBottom: 28,
            fontSize: 13,
            color: TEXT_TER,
            flexWrap: "wrap",
          }}
        >
          <Link href="/" style={{ color: TEXT_TER, textDecoration: "none" }}>ホーム</Link>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>›</span>
          <Link href="/themes" style={{ color: TEXT_TER, textDecoration: "none" }}>テーマ一覧</Link>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>›</span>
          <span
            style={{
              color: TEXT_SEC,
              maxWidth: 260,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {theme.title}
          </span>
        </nav>

        {/* ===== Summary card ===== */}
        <div
          style={{
            background: CARD_BG2,
            border: BORDER2,
            borderRadius: 20,
            padding: "28px 32px",
            marginBottom: 32,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Glow */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(ellipse 50% 60% at 90% 50%, ${col.dot}18 0%, transparent 70%)`,
              pointerEvents: "none",
            }}
          />
          <div style={{ position: "relative" }}>
            {/* Category + テーマ詳細 */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 14,
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  padding: "3px 10px",
                  borderRadius: 5,
                  background: col.bg,
                  color: col.text,
                  border: `1px solid ${col.border}`,
                }}
              >
                {catName}
              </span>
              <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 13 }}>›</span>
              <span style={{ fontSize: 12, color: TEXT_TER }}>テーマ詳細</span>
            </div>

            <h1
              style={{
                fontSize: "clamp(20px,4vw,28px)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 1.3,
                color: TEXT_PRI,
                marginBottom: 12,
              }}
            >
              {theme.title}
            </h1>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: TEXT_SEC, maxWidth: 620, marginBottom: 20 }}>
              {theme.shortDescription}
            </p>

            {/* Featured ticker chips */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {theme.featuredStocks.map((s) => (
                <Link
                  key={s.ticker}
                  href={`/stocks/${s.ticker}`}
                  style={{ textDecoration: "none" }}
                >
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      padding: "4px 10px",
                      borderRadius: 6,
                      background: col.bg,
                      color: col.text,
                      border: `1px solid ${col.border}`,
                      display: "inline-block",
                    }}
                  >
                    {s.ticker}
                  </span>
                </Link>
              ))}
              <Link
                href="/stocks"
                style={{
                  fontSize: 12,
                  padding: "4px 10px",
                  borderRadius: 6,
                  color: TEXT_TER,
                  border: "1px solid rgba(255,255,255,0.08)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  textDecoration: "none",
                }}
              >
                銘柄一覧を見る ›
              </Link>
            </div>
          </div>
        </div>

        {/* ===== 2-column body ===== */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 24,
          }}
          className="theme-detail-grid"
        >
          {/* Left column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20, minWidth: 0 }}>
            {/* Definition */}
            <SectionCard
              icon="📖"
              iconColor="#818cf8"
              title="このテーマの定義"
            >
              <p style={{ fontSize: 14, lineHeight: 1.85, color: TEXT_SEC }}>{theme.definition}</p>
            </SectionCard>

            {/* Why noteworthy */}
            <SectionCard icon="💡" iconColor="#fbbf24" title="なぜ注目されるのか">
              <p style={{ fontSize: 14, lineHeight: 1.85, color: TEXT_SEC }}>{theme.whyNow}</p>
            </SectionCard>

            {/* Featured stocks table */}
            <SectionCard
              icon="📊"
              iconColor="#34d399"
              title="代表銘柄一覧"
              sub="テーマ比較になりやすい銘柄を抜粋しています。"
            >
              {stocks.length > 0 ? (
                <div style={{ overflowX: "auto" }}>
                  <table className="theme-stocks-table" style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, minWidth: 400 }}>
                    <thead>
                      <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                        {["会社名", "ticker", "区分 / 役割", "一言要約"].map((h) => (
                          <th
                            key={h}
                            style={{
                              textAlign: "left",
                              padding: "8px 12px",
                              fontSize: 11,
                              fontWeight: 600,
                              color: TEXT_TER,
                              whiteSpace: "nowrap",
                            }}
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {stocks.map((item, i) => (
                        <tr
                          key={item.stock.ticker}
                          style={{
                            borderBottom:
                              i < stocks.length - 1
                                ? "1px solid rgba(255,255,255,0.04)"
                                : "none",
                          }}
                        >
                          <td style={{ padding: "12px 12px" }}>
                            <Link
                              href={`/stocks/${item.stock.ticker}`}
                              className="td-name-link"
                              style={{
                                color: "#e2e8f0",
                                fontWeight: 500,
                                textDecoration: "none",
                                display: "block",
                              }}
                            >
                              {item.stock.name}
                            </Link>
                          </td>
                          <td style={{ padding: "12px 12px" }}>
                            <Link
                              href={`/stocks/${item.stock.ticker}`}
                              className="td-ticker-link"
                              style={{
                                display: "inline-block",
                                fontSize: 11,
                                fontWeight: 700,
                                padding: "2px 7px",
                                borderRadius: 4,
                                background: INDIGO_BG,
                                color: INDIGO_TEXT,
                                textDecoration: "none",
                              }}
                            >
                              {item.stock.ticker}
                            </Link>
                          </td>
                          <td style={{ padding: "12px 12px", color: TEXT_TER, whiteSpace: "nowrap" }}>
                            {item.stock.categoryJa ?? item.stock.aiCategory ?? "関連企業"}
                          </td>
                          <td
                            className="td-summary-cell"
                            style={{
                              padding: "12px 12px",
                              color: TEXT_SEC,
                              lineHeight: 1.5,
                              maxWidth: 220,
                            }}
                          >
                            {item.summary}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p style={{ fontSize: 13, color: TEXT_TER, fontStyle: "italic" }}>
                  代表銘柄データは現在整理中です。
                </p>
              )}
            </SectionCard>

            {/* Comparison points */}
            <SectionCard
              icon="⎇"
              iconColor="#a78bfa"
              title="比較ポイント"
              sub="比較するときに見落としにくい観点を、テーマごとに絞って並べています。"
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {theme.comparePoints.map((cp, i) => (
                  <div
                    key={i}
                    style={{
                      borderRadius: 10,
                      padding: "14px 16px",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    <p style={{ fontSize: 13, fontWeight: 600, color: "#e2e8f0", marginBottom: 4 }}>
                      {cp}
                    </p>
                    <p style={{ fontSize: 12, lineHeight: 1.7, color: TEXT_TER }}>
                      {getComparePointDescription(cp)}
                    </p>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>

          {/* Right column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20, minWidth: 0 }}>
            {/* Stock positioning */}
            <div
              style={{
                background: CARD_BG,
                border: BORDER,
                borderRadius: 14,
                padding: "20px 22px",
              }}
            >
              <h3
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: TEXT_SEC,
                  marginBottom: 14,
                  paddingBottom: 12,
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                各銘柄の位置づけ
              </h3>
              <p style={{ fontSize: 12, color: TEXT_TER, marginBottom: 16 }}>
                同じテーマでも、恩恵の受け方や立ち位置は企業ごとに異なります。
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {stocks.map((item) => (
                  <div key={item.stock.ticker}>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}
                    >
                      <Link
                        href={`/stocks/${item.stock.ticker}`}
                        className="td-ticker-link"
                        style={{
                          display: "inline-block",
                          fontSize: 10,
                          fontWeight: 700,
                          padding: "2px 6px",
                          borderRadius: 4,
                          background: INDIGO_BG,
                          color: INDIGO_TEXT,
                          textDecoration: "none",
                        }}
                      >
                        {item.stock.ticker}
                      </Link>
                      <Link
                        href={`/stocks/${item.stock.ticker}`}
                        className="td-name-link"
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          color: "#e2e8f0",
                          textDecoration: "none",
                        }}
                      >
                        {item.stock.name}
                      </Link>
                    </div>
                    <p style={{ fontSize: 12, lineHeight: 1.7, color: TEXT_TER }}>
                      {item.positioning}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Risks */}
            <div
              style={{
                background: CARD_BG,
                border: BORDER,
                borderRadius: 14,
                padding: "20px 22px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <span style={{ fontSize: 14, color: "#fb923c" }}>⚠</span>
                <h3 style={{ fontSize: 13, fontWeight: 600, color: TEXT_SEC }}>
                  リスクと注意点
                </h3>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {theme.risks.map((r, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                    <span style={{ color: "#fb923c", fontSize: 8, marginTop: 5, flexShrink: 0 }}>●</span>
                    <p style={{ fontSize: 12, lineHeight: 1.7, color: TEXT_TER }}>{r}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Related themes */}
            {relatedThemes.length > 0 && (
              <div
                style={{
                  background: CARD_BG,
                  border: BORDER,
                  borderRadius: 14,
                  padding: "20px 22px",
                }}
              >
                <h3
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: TEXT_SEC,
                    marginBottom: 12,
                  }}
                >
                  関連テーマ
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {relatedThemes.map((rt) => {
                    const rtGroups = getThemeGroupsForSlug(rt.slug);
                    const rtGroupKey = (rtGroups[0]?.key ?? "ai-semiconductors") as ThemeGroupKey;
                    const rtCol = CAT_COLORS[rtGroupKey] ?? FALLBACK_COLOR;
                    return (
                      <Link
                        key={rt.slug}
                        href={`/themes/${rt.slug}`}
                        style={{ textDecoration: "none" }}
                      >
                        <div
                          className="td-related-link"
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 10,
                            borderRadius: 8,
                            padding: "10px 12px",
                            border: "1px solid rgba(255,255,255,0.05)",
                            transition: "background 0.15s",
                          }}
                        >
                          <div
                            style={{
                              width: 7,
                              height: 7,
                              borderRadius: "50%",
                              background: rtCol.dot,
                              flexShrink: 0,
                              marginTop: 4,
                            }}
                          />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p
                              style={{
                                fontSize: 12,
                                fontWeight: 600,
                                color: "#e2e8f0",
                                marginBottom: 2,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {rt.title}
                            </p>
                            <p
                              style={{
                                fontSize: 11,
                                color: TEXT_TER,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {rt.shortDescription}
                            </p>
                          </div>
                          <span style={{ color: TEXT_TER, fontSize: 12, flexShrink: 0 }}>›</span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Disclaimer — full width outside grid */}
        <div
          style={{
            marginTop: 24,
            background: "rgba(251,191,36,0.07)",
            border: "1px solid rgba(251,191,36,0.2)",
            borderRadius: 12,
            padding: "14px 16px",
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

      {/* Responsive 2-col grid style */}
      <style>{`
        @media (min-width: 900px) {
          .theme-detail-grid {
            grid-template-columns: 2fr 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .theme-stocks-table td,
          .theme-stocks-table th {
            padding: 8px 8px !important;
            font-size: 12px !important;
          }
          .theme-stocks-table .td-summary-cell {
            display: none;
          }
        }
        .td-related-link:hover {
          background: rgba(255,255,255,0.03) !important;
        }
        .td-name-link:hover { color: #f1f5f9 !important; }
        .td-ticker-link:hover { opacity: 0.75; }
      `}</style>
    </div>
  );
}

function SectionCard({
  icon,
  iconColor,
  title,
  sub,
  children,
}: {
  icon: string;
  iconColor: string;
  title: string;
  sub?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        background: CARD_BG,
        border: BORDER,
        borderRadius: 14,
        padding: "22px 24px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
        <span style={{ fontSize: 15, color: iconColor }}>{icon}</span>
        <h2 style={{ fontSize: 14, fontWeight: 600, color: "#e2e8f0" }}>{title}</h2>
      </div>
      {sub && (
        <p style={{ fontSize: 12, color: TEXT_TER, marginBottom: 16 }}>{sub}</p>
      )}
      {!sub && <div style={{ marginBottom: 16 }} />}
      {children}
    </div>
  );
}
