import Link from "next/link";
import { SiteHeader } from "../../../../components/shared/SiteHeader";
import { fetchStockByTicker } from "../../../../lib/fetch-stocks";
import { getFilingsByTicker } from "../../../../lib/filings/repository";
import type { FilingRow } from "../../../../lib/filings/repository";

// ── デザイントークン ────────────────────────────────────────────────────
const BG       = "#0c1118";
const CARD     = "rgba(255,255,255,0.04)";
const BORDER   = "1px solid rgba(255,255,255,0.07)";
const BORDER2  = "1px solid rgba(255,255,255,0.10)";
const TEXT_PRI = "#f1f5f9";
const TEXT_SEC = "#cbd5e1";
const TEXT_TER = "#94a3b8";
const INDIGO   = "#818cf8";
const INDIGO_BG   = "rgba(99,102,241,0.12)";
const INDIGO_TEXT = "#a5b4fc";
const GREEN    = "#4ade80";
const GREEN_BG = "rgba(74,222,128,0.12)";
const BLUE     = "#60a5fa";
const BLUE_BG  = "rgba(96,165,250,0.12)";
const YELLOW   = "#fbbf24";
const YELLOW_BG = "rgba(251,191,36,0.10)";
const GRAY_BG  = "rgba(255,255,255,0.07)";

// ── 書類種別バッジ設定 ─────────────────────────────────────────────────
const PURPLE     = "#c084fc";
const PURPLE_BG  = "rgba(192,132,252,0.10)";
const ORANGE     = "#fb923c";
const ORANGE_BG  = "rgba(251,146,60,0.10)";

type DocMeta = { color: string; bg: string; label: string; desc: string; secondary?: true };
const DOC_META: Record<string, DocMeta> = {
  // ── 主要書類（財務報告） ──────────────────────────────────────
  "10-K":    { color: GREEN,  bg: GREEN_BG,   label: "10-K",    desc: "年次報告書"                    },
  "10-K/A":  { color: GREEN,  bg: GREEN_BG,   label: "10-K/A",  desc: "年次報告書（修正）"            },
  "20-F":    { color: GREEN,  bg: GREEN_BG,   label: "20-F",    desc: "年次報告書（外国企業）"        },
  "10-Q":    { color: BLUE,   bg: BLUE_BG,    label: "10-Q",    desc: "四半期報告書"                  },
  "10-Q/A":  { color: BLUE,   bg: BLUE_BG,    label: "10-Q/A",  desc: "四半期報告書（修正）"          },
  "8-K":     { color: YELLOW, bg: YELLOW_BG,  label: "8-K",     desc: "重要事項の臨時報告"            },
  "8-K/A":   { color: YELLOW, bg: YELLOW_BG,  label: "8-K/A",   desc: "重要事項の臨時報告（修正）"   },
  // ── 補助書類（インサイダー・株主向け） ──────────────────────
  "4":       { color: ORANGE, bg: ORANGE_BG,  label: "Form 4",  desc: "インサイダー取引報告",   secondary: true },
  "4/A":     { color: ORANGE, bg: ORANGE_BG,  label: "Form 4/A",desc: "インサイダー取引報告（修正）", secondary: true },
  "144":     { color: ORANGE, bg: ORANGE_BG,  label: "Form 144",desc: "役員・大株主の売却予告",  secondary: true },
  "DEF 14A": { color: PURPLE, bg: PURPLE_BG,  label: "DEF 14A", desc: "株主総会委任状説明書",    secondary: true },
  "DEFA14A": { color: PURPLE, bg: PURPLE_BG,  label: "DEFA14A", desc: "委任状補足資料",          secondary: true },
  "SC 13G":  { color: PURPLE, bg: PURPLE_BG,  label: "SC 13G",  desc: "5%超保有の受動的報告",    secondary: true },
  "SC 13G/A":{ color: PURPLE, bg: PURPLE_BG,  label: "SC 13G/A",desc: "5%超保有報告（修正）",    secondary: true },
  "SC 13D":  { color: PURPLE, bg: PURPLE_BG,  label: "SC 13D",  desc: "5%超保有の能動的報告",    secondary: true },
  "SC 13D/A":{ color: PURPLE, bg: PURPLE_BG,  label: "SC 13D/A",desc: "5%超保有報告（修正）",    secondary: true },
  "S-1":     { color: INDIGO, bg: INDIGO_BG,  label: "S-1",     desc: "新規上場登録申請書",      secondary: true },
  "S-3":     { color: INDIGO, bg: INDIGO_BG,  label: "S-3",     desc: "有価証券登録申請書",      secondary: true },
  "S-8":     { color: INDIGO, bg: INDIGO_BG,  label: "S-8",     desc: "従業員向け有価証券登録",  secondary: true },
};
function getDocMeta(type: string | null): DocMeta {
  return type && DOC_META[type]
    ? DOC_META[type]
    : { color: TEXT_TER, bg: GRAY_BG, label: type || "—", desc: "", secondary: true };
}

type PageProps = { params: Promise<{ ticker: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { ticker } = await params;
  return {
    title: `${ticker.toUpperCase()} 公開情報 | AI Stock Data`,
    description: `${ticker.toUpperCase()} の SEC EDGAR 提出書類一覧`,
  };
}

export default async function FilingsPage({ params }: PageProps) {
  const { ticker } = await params;
  const upperTicker = ticker.toUpperCase();

  // 銘柄情報と公開情報を並行取得（テーブル未作成でもクラッシュしない）
  let filingsFetchError: string | null = null;
  const [stock, edgarFilings] = await Promise.all([
    fetchStockByTicker(upperTicker),
    getFilingsByTicker(upperTicker, "edgar", 60).catch((e: Error) => {
      filingsFetchError = e.message ?? "取得エラー";
      return [] as FilingRow[];
    }),
  ]);

  const isUsStock = !stock?.country || stock.country.includes("US");
  const companyName = stock?.name ?? edgarFilings[0]?.company_name ?? upperTicker;

  // 主要書類かどうか（DOC_META の secondary: true でない書類）
  const primaryTypes = new Set(["10-K","10-K/A","20-F","10-Q","10-Q/A","8-K","8-K/A"]);

  // 主要書類を先頭に、補助書類を後ろに並べ替え（各グループ内は提出日降順を維持）
  const sortedFilings = [
    ...edgarFilings.filter((f) => f.document_type && primaryTypes.has(f.document_type)),
    ...edgarFilings.filter((f) => !f.document_type || !primaryTypes.has(f.document_type)),
  ];

  return (
    <>
      <style>{`
        .ft { width:100%; border-collapse:collapse; }
        .ft th { padding:9px 14px; text-align:left; color:${TEXT_TER}; border-bottom:1px solid rgba(255,255,255,0.07); font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.05em; white-space:nowrap; }
        .ft td { padding:10px 14px; color:${TEXT_SEC}; border-bottom:1px solid rgba(255,255,255,0.04); font-size:13px; vertical-align:middle; }
        .ft tr:hover td { background:rgba(255,255,255,0.025); }
        .ft tr.primary td { background:rgba(255,255,255,0.015); }
        .doc-chip { display:inline-flex; align-items:center; padding:2px 8px; border-radius:5px; font-size:11px; font-weight:700; white-space:nowrap; }
        .tab-edgar { display:inline-block; padding:7px 20px; font-size:13px; font-weight:700; border-radius:8px 8px 0 0; cursor:default; border:1px solid rgba(255,255,255,0.10); border-bottom:2px solid ${INDIGO}; background:rgba(99,102,241,0.08); color:${INDIGO}; }
        .tab-edinet { display:inline-block; padding:7px 20px; font-size:13px; font-weight:600; border-radius:8px 8px 0 0; border:1px solid rgba(255,255,255,0.07); background:transparent; color:${TEXT_TER}; opacity:.6; cursor:not-allowed; }
        .ir-btn { font-size:13px; font-weight:500; padding:6px 14px; border-radius:8px; border:${BORDER2}; background:rgba(255,255,255,0.05); color:${TEXT_SEC}; text-decoration:none; display:inline-flex; align-items:center; gap:5px; }
        .ir-btn:hover { background:rgba(255,255,255,0.08); }
      `}</style>

      <div style={{ minHeight:"100vh", background:BG, color:TEXT_PRI,
        fontFamily:'system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif' }}>
        <SiteHeader />

        <div style={{ maxWidth:1040, margin:"0 auto", padding:"36px 20px 72px" }}>

          {/* ── パンくず ── */}
          <nav style={{ display:"flex", alignItems:"center", gap:6, marginBottom:24,
            fontSize:13, color:TEXT_TER, flexWrap:"wrap" }}>
            <Link href="/"       style={{ color:TEXT_TER, textDecoration:"none" }}>ホーム</Link>
            <span style={{ color:"rgba(255,255,255,0.2)" }}>›</span>
            <Link href="/stocks" style={{ color:TEXT_TER, textDecoration:"none" }}>銘柄一覧</Link>
            <span style={{ color:"rgba(255,255,255,0.2)" }}>›</span>
            <Link href={`/stocks/${upperTicker}`} style={{ color:TEXT_TER, textDecoration:"none" }}>
              {upperTicker}
            </Link>
            <span style={{ color:"rgba(255,255,255,0.2)" }}>›</span>
            <span style={{ color:TEXT_SEC }}>公開情報</span>
          </nav>

          {/* ── ページヘッダー ── */}
          <div style={{ marginBottom:28 }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, flexWrap:"wrap", marginBottom:8 }}>
              <span style={{ fontSize:12, fontWeight:700, padding:"2px 9px", borderRadius:5,
                background:INDIGO_BG, color:INDIGO_TEXT, border:"1px solid rgba(99,102,241,0.25)" }}>
                {upperTicker}
              </span>
              <h1 style={{ fontSize:22, fontWeight:700, color:TEXT_PRI, margin:0 }}>
                {companyName} — 公開情報
              </h1>
            </div>
            <p style={{ color:TEXT_TER, fontSize:13, margin:"0 0 16px" }}>
              SEC EDGAR に提出された書類の一覧です。タイトルまたは「書類を見る」から原文を確認できます。
            </p>

            {/* 外部リンク */}
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              {stock && (
                <Link href={`/stocks/${upperTicker}`} className="ir-btn">
                  ← 銘柄詳細に戻る
                </Link>
              )}
              {stock?.irUrl && (
                <a href={stock.irUrl} target="_blank" rel="noreferrer" className="ir-btn">
                  📊 IRページ ↗
                </a>
              )}
            </div>
          </div>

          {/* ── タブ ── */}
          <div style={{ display:"flex", gap:4, marginBottom:-1, borderBottom:BORDER }}>
            <span className="tab-edgar">🇺🇸 EDGAR（SEC）</span>
            <span className="tab-edinet" title="準備中">
              🇯🇵 EDINET（準備中）
            </span>
          </div>

          {/* ── EDGAR コンテンツ ── */}
          <div style={{ background:CARD, border:BORDER, borderTop:"none",
            borderRadius:"0 0 14px 14px", padding:"0" }}>

            {/* 銘柄が米国株でない場合の案内 */}
            {stock && !isUsStock && (
              <div style={{ padding:"20px 22px", borderBottom:BORDER }}>
                <p style={{ color:TEXT_TER, fontSize:13, margin:0 }}>
                  この銘柄は米国株ではないため、EDGAR データは対象外です。
                </p>
              </div>
            )}

            {/* データなし（テーブル未作成 / 初回取得前 の区別） */}
            {isUsStock && edgarFilings.length === 0 && (
              <div style={{ padding:"36px 22px", textAlign:"center" }}>
                {filingsFetchError ? (
                  <>
                    <p style={{ color:YELLOW, fontSize:14, fontWeight:600, margin:"0 0 8px" }}>
                      ⚠ データベース未設定
                    </p>
                    <p style={{ color:TEXT_TER, fontSize:12.5, margin:0, lineHeight:1.6 }}>
                      管理者が <code style={{ color:TEXT_SEC }}>filings</code> テーブルを作成すると表示されます。
                    </p>
                  </>
                ) : (
                  <>
                    <p style={{ color:TEXT_SEC, fontSize:15, fontWeight:600, margin:"0 0 8px" }}>
                      保存済みデータがまだありません
                    </p>
                    <p style={{ color:TEXT_TER, fontSize:13, margin:0, lineHeight:1.6 }}>
                      日次バッチ（毎日 19時頃）の初回実行後に表示されます。
                    </p>
                  </>
                )}
              </div>
            )}

            {/* 書類テーブル */}
            {isUsStock && edgarFilings.length > 0 && (
              <>
                <div style={{ padding:"14px 18px 10px", borderBottom:BORDER,
                  display:"flex", alignItems:"center", gap:10, flexWrap:"wrap" }}>
                  <span style={{ fontSize:12, color:TEXT_TER, fontWeight:700,
                    textTransform:"uppercase", letterSpacing:".05em" }}>
                    提出書類
                  </span>
                  <span style={{ fontSize:12, color:TEXT_TER }}>
                    {edgarFilings.length} 件
                  </span>
                  {/* 凡例 */}
                  <div style={{ display:"flex", gap:6, marginLeft:8, flexWrap:"wrap" }}>
                    {[
                      { color: GREEN,  bg: GREEN_BG,  label: "10-K / 20-F", title: "年次報告書" },
                      { color: BLUE,   bg: BLUE_BG,   label: "10-Q",        title: "四半期報告書" },
                      { color: YELLOW, bg: YELLOW_BG, label: "8-K",         title: "重要事項の臨時報告" },
                      { color: ORANGE, bg: ORANGE_BG, label: "Form 4",      title: "インサイダー取引報告（半透明表示）" },
                    ].map((l) => (
                      <span key={l.label} title={l.title}
                        style={{ fontSize:10, padding:"1px 6px", borderRadius:4,
                          background:l.bg, color:l.color, border:`1px solid ${l.color}33` }}>
                        {l.label}
                      </span>
                    ))}
                  </div>
                  <span style={{ marginLeft:"auto", fontSize:11, color:TEXT_TER }}>
                    更新: 毎日 19時頃
                  </span>
                </div>

                <div style={{ overflowX:"auto" }}>
                  <table className="ft">
                    <thead>
                      <tr>
                        <th>書類種別</th>
                        <th>タイトル</th>
                        <th>提出日</th>
                        <th>対象期間</th>
                        <th style={{ width:100 }}>書類</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedFilings.map((f) => {
                        const m = getDocMeta(f.document_type);
                        const isPrimary = f.document_type && primaryTypes.has(f.document_type);
                        return (
                          <tr key={f.id} className={isPrimary ? "primary" : ""}
                            style={{ opacity: m.secondary ? 0.75 : 1 }}>
                            <td style={{ width:160 }}>
                              <span className="doc-chip"
                                style={{ background:m.bg, color:m.color,
                                  border:`1px solid ${m.color}33` }}>
                                {m.label}
                              </span>
                              {m.desc && (
                                <div style={{ fontSize:10, color:TEXT_TER, marginTop:2 }}>
                                  {m.desc}
                                </div>
                              )}
                            </td>
                            <td style={{ maxWidth:340, fontSize:12.5 }}>
                              {f.document_url ? (
                                <a href={f.document_url} target="_blank" rel="noopener noreferrer"
                                  style={{ color:TEXT_SEC, textDecoration:"none" }}>
                                  {f.title || "—"}
                                </a>
                              ) : (
                                <span>{f.title || "—"}</span>
                              )}
                            </td>
                            <td style={{ whiteSpace:"nowrap" }}>
                              {f.filed_at ?? <span style={{ color:TEXT_TER }}>—</span>}
                            </td>
                            <td style={{ whiteSpace:"nowrap" }}>
                              {f.period_end
                                ? <span style={{ color:isPrimary ? TEXT_PRI : TEXT_SEC }}>{f.period_end}</span>
                                : <span style={{ color:TEXT_TER }}>—</span>}
                            </td>
                            <td>
                              {f.document_url ? (
                                <a href={f.document_url} target="_blank" rel="noopener noreferrer"
                                  style={{ fontSize:12, color:INDIGO, textDecoration:"none",
                                    background:INDIGO_BG, borderRadius:5, padding:"2px 8px",
                                    border:"1px solid rgba(129,140,248,0.22)", whiteSpace:"nowrap" }}>
                                  開く ↗
                                </a>
                              ) : <span style={{ color:TEXT_TER }}>—</span>}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>

          {/* ── 補足 ── */}
          <p style={{ fontSize:11.5, color:TEXT_TER, marginTop:14, lineHeight:1.6 }}>
            表示されているデータは SEC EDGAR の公開情報をもとに自動取得・保存したものです。
            投資判断の根拠としてお使いになる場合は、原文書類をご確認ください。
          </p>

        </div>
      </div>
    </>
  );
}
