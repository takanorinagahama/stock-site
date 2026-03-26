"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import type { FilingFetchResult, NormalizedFiling } from "../../../lib/filings/types";

// ── デザイントークン ────────────────────────────────────────────────────────
const BG        = "#0c1118";
const CARD      = "rgba(255,255,255,0.04)";
const CARD2     = "rgba(255,255,255,0.06)";
const BORDER    = "1px solid rgba(255,255,255,0.07)";
const INDIGO    = "#818cf8";
const INDIGO_BG = "rgba(99,102,241,0.12)";
const TEXT_PRI  = "#f1f5f9";
const TEXT_SEC  = "#cbd5e1";
const TEXT_TER  = "#94a3b8";
const GREEN     = "#4ade80";
const GREEN_BG  = "rgba(74,222,128,0.12)";
const BLUE      = "#60a5fa";
const BLUE_BG   = "rgba(96,165,250,0.12)";
const YELLOW    = "#fbbf24";
const YELLOW_BG = "rgba(251,191,36,0.10)";
const RED       = "#f87171";
const RED_BG    = "rgba(248,113,113,0.10)";
const PURPLE    = "#c084fc";
const PURPLE_BG = "rgba(192,132,252,0.12)";
const GRAY_BG   = "rgba(255,255,255,0.07)";

// ── 主要書類種別の設定 ──────────────────────────────────────────────────────
type DocMeta = { label: string; color: string; bg: string; desc: string; primary: boolean };
const DOC_META: Record<string, DocMeta> = {
  "10-K":    { label: "10-K",    color: GREEN,  bg: GREEN_BG,  desc: "Annual Report",         primary: true  },
  "10-K/A":  { label: "10-K/A",  color: GREEN,  bg: GREEN_BG,  desc: "Annual Report (Amend)", primary: true  },
  "20-F":    { label: "20-F",    color: GREEN,  bg: GREEN_BG,  desc: "Annual Report (Foreign)",primary: true  },
  "10-Q":    { label: "10-Q",    color: BLUE,   bg: BLUE_BG,   desc: "Quarterly Report",      primary: true  },
  "10-Q/A":  { label: "10-Q/A",  color: BLUE,   bg: BLUE_BG,   desc: "Quarterly Report (Amend)",primary: true},
  "8-K":     { label: "8-K",     color: YELLOW, bg: YELLOW_BG, desc: "Current Report",        primary: true  },
  "8-K/A":   { label: "8-K/A",   color: YELLOW, bg: YELLOW_BG, desc: "Current Report (Amend)",primary: true  },
  "DEF 14A": { label: "DEF 14A", color: PURPLE, bg: PURPLE_BG, desc: "Proxy Statement",       primary: false },
  "S-1":     { label: "S-1",     color: PURPLE, bg: PURPLE_BG, desc: "IPO Registration",      primary: false },
  "4":       { label: "Form 4",  color: TEXT_TER, bg: GRAY_BG, desc: "Insider Transaction",   primary: false },
};

function getDocMeta(type: string): DocMeta {
  return DOC_META[type] ?? { label: type || "—", color: TEXT_TER, bg: GRAY_BG, desc: "", primary: false };
}

// ── サンプルティッカー ──────────────────────────────────────────────────────
const EDGAR_SAMPLES = ["NVDA", "MSFT", "AVGO", "AMD", "AMZN"];

type Source = "edgar" | "edinet";
type FilterType = "all" | "10-K" | "10-Q" | "8-K";

interface FormState {
  ticker: string;
  edinetCode: string;
  arbitraryId: string;
  count: number;
}
const DEFAULTS: Record<Source, FormState> = {
  edgar:  { ticker: "NVDA", edinetCode: "", arbitraryId: "", count: 20 },
  edinet: { ticker: "",     edinetCode: "E02166", arbitraryId: "", count: 20 },
};

// ── rawResponse から会社情報を抽出（EDGAR用）──────────────────────────────
interface EdgarMeta {
  cik?: string;
  companyName?: string;
  sic?: string;
  sicDescription?: string;
  entityType?: string;
  totalFilings?: number;
}
function extractEdgarMeta(raw: unknown): EdgarMeta | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  return {
    cik:            typeof r.cik === "string" ? r.cik : undefined,
    companyName:    typeof r.companyName === "string" ? r.companyName : undefined,
    sic:            typeof r.sic === "string" ? r.sic : undefined,
    sicDescription: typeof r.sicDescription === "string" ? r.sicDescription : undefined,
    entityType:     typeof r.entityType === "string" ? r.entityType : undefined,
    totalFilings:   typeof r.totalFilings === "number" ? r.totalFilings : undefined,
  };
}

// ── 書類種別の集計 ─────────────────────────────────────────────────────────
function summarizeTypes(filings: NormalizedFiling[]): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const f of filings) {
    const key = f.documentType || "不明";
    counts[key] = (counts[key] ?? 0) + 1;
  }
  return counts;
}

export default function LabFilingsPage() {
  const [source, setSource]   = useState<Source>("edgar");
  const [form, setForm]       = useState(DEFAULTS);
  const [loading, setLoading] = useState(false);
  const [result, setResult]   = useState<FilingFetchResult | null>(null);
  const [showRaw, setShowRaw] = useState(false);
  const [filter, setFilter]   = useState<FilterType>("all");

  const cur = form[source];

  function setField(field: keyof FormState, val: string | number) {
    setForm((prev) => ({ ...prev, [source]: { ...prev[source], [field]: val } }));
  }

  const handleFetch = useCallback(async () => {
    setLoading(true);
    setResult(null);
    setShowRaw(false);
    setFilter("all");
    try {
      const params = new URLSearchParams();
      if (cur.ticker)     params.set("ticker",     cur.ticker);
      if (cur.edinetCode) params.set("edinetCode", cur.edinetCode);
      if (cur.arbitraryId)params.set("arbitraryId",cur.arbitraryId);
      params.set("count", String(cur.count));

      const res  = await fetch(`/api/filings/${source}?${params.toString()}`);
      const data = await res.json() as FilingFetchResult;
      setResult(data);
    } catch (err) {
      setResult({ source, query: cur, filings: [], rawResponse: null,
        fetchStatus: "error", errorMessage: err instanceof Error ? err.message : String(err) });
    } finally {
      setLoading(false);
    }
  }, [source, cur]);

  // フィルタ済み一覧
  const visibleFilings = result?.filings.filter((f) => {
    if (filter === "all")  return true;
    if (filter === "10-K") return ["10-K","10-K/A","20-F"].includes(f.documentType);
    if (filter === "10-Q") return ["10-Q","10-Q/A"].includes(f.documentType);
    if (filter === "8-K")  return ["8-K","8-K/A"].includes(f.documentType);
    return true;
  }) ?? [];

  const typeSummary  = result ? summarizeTypes(result.filings) : {};
  const edgarMeta    = result?.source === "edgar" ? extractEdgarMeta(result.rawResponse) : null;
  const primaryCount = result?.filings.filter((f) => getDocMeta(f.documentType).primary).length ?? 0;

  return (
    <>
      <style>{`
        .lt { width:100%; border-collapse:collapse; font-size:12.5px; }
        .lt th { padding:8px 12px; text-align:left; color:${TEXT_TER}; border-bottom:1px solid rgba(255,255,255,0.07); white-space:nowrap; font-weight:600; font-size:11px; text-transform:uppercase; letter-spacing:.04em; }
        .lt td { padding:9px 12px; color:${TEXT_SEC}; border-bottom:1px solid rgba(255,255,255,0.04); vertical-align:middle; }
        .lt tr:hover td { background:rgba(255,255,255,0.025); }
        .lt tr.primary-row td { background:rgba(255,255,255,0.015); }
        .li { background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.10); border-radius:6px; padding:7px 10px; color:${TEXT_PRI}; font-size:13px; width:100%; outline:none; box-sizing:border-box; }
        .li:focus { border-color:rgba(129,140,248,0.5); }
        .lb { background:${INDIGO_BG}; border:1px solid rgba(129,140,248,0.3); border-radius:8px; padding:8px 22px; color:${INDIGO}; font-size:13px; font-weight:700; cursor:pointer; transition:background .15s; white-space:nowrap; }
        .lb:hover { background:rgba(99,102,241,0.22); }
        .lb:disabled { opacity:.45; cursor:not-allowed; }
        .sb { padding:5px 14px; border-radius:20px; font-size:12px; font-weight:600; cursor:pointer; transition:all .15s; border:1px solid rgba(255,255,255,0.10); background:transparent; color:${TEXT_TER}; }
        .sb.active { border-color:rgba(129,140,248,0.4); background:${INDIGO_BG}; color:${INDIGO}; }
        .sb:hover:not(.active) { border-color:rgba(255,255,255,0.18); color:${TEXT_SEC}; }
        .chip { display:inline-flex; align-items:center; padding:2px 8px; border-radius:5px; font-size:11px; font-weight:700; white-space:nowrap; }
        .sample-btn { background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.09); border-radius:6px; padding:4px 10px; color:${TEXT_SEC}; font-size:12px; font-weight:600; cursor:pointer; transition:all .12s; font-family:monospace; }
        .sample-btn:hover { background:${INDIGO_BG}; border-color:rgba(129,140,248,0.3); color:${INDIGO}; }
        .raw-pre { background:rgba(0,0,0,0.35); border:1px solid rgba(255,255,255,0.07); border-radius:8px; padding:14px; font-size:11px; color:${TEXT_SEC}; overflow:auto; max-height:420px; white-space:pre-wrap; word-break:break-all; line-height:1.5; }
        .ft-btn { padding:4px 12px; border-radius:16px; font-size:11.5px; font-weight:600; cursor:pointer; border:1px solid rgba(255,255,255,0.09); background:transparent; color:${TEXT_TER}; transition:all .12s; }
        .ft-btn.on { border-color:rgba(129,140,248,0.35); background:${INDIGO_BG}; color:${INDIGO}; }
        .ft-btn:hover:not(.on) { color:${TEXT_SEC}; border-color:rgba(255,255,255,0.15); }
        @keyframes spin { to { transform:rotate(360deg); } }
        .spinner { width:18px; height:18px; border:2px solid rgba(129,140,248,0.25); border-top-color:${INDIGO}; border-radius:50%; animation:spin .7s linear infinite; display:inline-block; vertical-align:middle; margin-right:8px; }
      `}</style>

      <div style={{ minHeight:"100vh", background:BG, color:TEXT_PRI, paddingBottom:80 }}>

        {/* ── トップバー ── */}
        <div style={{ borderBottom:BORDER, padding:"11px 24px", display:"flex", alignItems:"center", gap:14, flexWrap:"wrap" }}>
          <Link href="/" style={{ color:TEXT_TER, fontSize:13, textDecoration:"none" }}>← ホーム</Link>
          <span style={{ color:"rgba(255,255,255,0.13)" }}>|</span>
          <span style={{ color:TEXT_TER, fontSize:13 }}>🧪 Lab</span>
          <span style={{ color:"rgba(255,255,255,0.13)" }}>›</span>
          <span style={{ color:TEXT_SEC, fontSize:13, fontWeight:600 }}>Filings 取得検証</span>
          <span style={{ marginLeft:"auto", fontSize:11, color:YELLOW, background:YELLOW_BG,
            border:"1px solid rgba(251,191,36,0.22)", borderRadius:4, padding:"2px 8px" }}>
            開発用・本番外
          </span>
        </div>

        <div style={{ maxWidth:1040, margin:"0 auto", padding:"30px 20px" }}>

          {/* ── ページタイトル ── */}
          <h1 style={{ fontSize:21, fontWeight:700, color:TEXT_PRI, margin:"0 0 4px" }}>
            📂 EDGAR / EDINET 取得検証
          </h1>
          <p style={{ color:TEXT_TER, fontSize:13, margin:"0 0 26px", lineHeight:1.6 }}>
            外部開示APIのレスポンスと正規化結果を確認するページ。本番ページとは切り離されています。
          </p>

          {/* ── コントロールカード ── */}
          <div style={{ background:CARD, border:BORDER, borderRadius:14, padding:"20px 22px", marginBottom:22 }}>

            {/* ソース切替 */}
            <div style={{ marginBottom:18 }}>
              <p style={{ fontSize:11, color:TEXT_TER, fontWeight:700, marginBottom:8, textTransform:"uppercase", letterSpacing:".05em" }}>ソース</p>
              <div style={{ display:"flex", gap:8 }}>
                {(["edgar","edinet"] as Source[]).map((s) => (
                  <button key={s} className={`sb${source===s?" active":""}`} onClick={() => { setSource(s); setResult(null); }}>
                    {s==="edgar" ? "🇺🇸 EDGAR (SEC)" : "🇯🇵 EDINET (金融庁)"}
                  </button>
                ))}
              </div>
            </div>

            {/* EDGAR サンプル */}
            {source === "edgar" && (
              <div style={{ marginBottom:14 }}>
                <p style={{ fontSize:11, color:TEXT_TER, fontWeight:700, marginBottom:7, textTransform:"uppercase", letterSpacing:".05em" }}>
                  サンプル入力
                </p>
                <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                  {EDGAR_SAMPLES.map((t) => (
                    <button key={t} className="sample-btn"
                      onClick={() => { setField("ticker", t); setResult(null); }}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* フォーム */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))", gap:12, marginBottom:14 }}>
              {source === "edgar" && (
                <div>
                  <label style={{ display:"block", fontSize:11, color:TEXT_TER, marginBottom:4 }}>Ticker</label>
                  <input className="li" value={cur.ticker}
                    onChange={(e) => setField("ticker", e.target.value.toUpperCase())}
                    placeholder="例: NVDA" onKeyDown={(e) => e.key==="Enter" && handleFetch()} />
                </div>
              )}
              {source === "edinet" && (
                <>
                  <div>
                    <label style={{ display:"block", fontSize:11, color:TEXT_TER, marginBottom:4 }}>EDINETコード</label>
                    <input className="li" value={cur.edinetCode}
                      onChange={(e) => setField("edinetCode", e.target.value)} placeholder="例: E02166" />
                  </div>
                  <div>
                    <label style={{ display:"block", fontSize:11, color:TEXT_TER, marginBottom:4 }}>対応Ticker（任意）</label>
                    <input className="li" value={cur.ticker}
                      onChange={(e) => setField("ticker", e.target.value.toUpperCase())} placeholder="例: 6758" />
                  </div>
                </>
              )}
              <div>
                <label style={{ display:"block", fontSize:11, color:TEXT_TER, marginBottom:4 }}>
                  任意ID <span style={{ color:"rgba(255,255,255,0.3)" }}>(ticker / edinetCode 代替)</span>
                </label>
                <input className="li" value={cur.arbitraryId}
                  onChange={(e) => setField("arbitraryId", e.target.value)} placeholder="任意" />
              </div>
              <div>
                <label style={{ display:"block", fontSize:11, color:TEXT_TER, marginBottom:4 }}>
                  件数 <span style={{ color:"rgba(255,255,255,0.3)" }}>(max {source==="edgar"?40:100})</span>
                </label>
                <input className="li" type="number" min={1} max={source==="edgar"?40:100}
                  value={cur.count} onChange={(e) => setField("count", parseInt(e.target.value,10)||10)} />
              </div>
            </div>

            {source === "edinet" && (
              <p style={{ fontSize:12, color:TEXT_TER, marginBottom:14, lineHeight:1.6 }}>
                💡 EDINET は API キーが必要です。{" "}
                <code style={{ color:YELLOW }}>.env.local</code> に{" "}
                <code style={{ color:YELLOW }}>EDINET_API_KEY=your_key</code> を追加してください。未設定はエラー表示されます。
              </p>
            )}

            <button className="lb" onClick={handleFetch} disabled={loading} style={{ minWidth:120 }}>
              {loading ? <><span className="spinner"/>取得中…</> : "▶ 取得する"}
            </button>
            {source === "edgar" && (
              <span style={{ marginLeft:12, fontSize:11.5, color:TEXT_TER }}>
                Enter キーでも取得できます
              </span>
            )}
          </div>

          {/* ── ローディング ── */}
          {loading && (
            <div style={{ background:CARD, border:BORDER, borderRadius:12, padding:"28px 22px",
              textAlign:"center", marginBottom:20 }}>
              <span className="spinner" style={{ width:24, height:24, margin:"0 auto 12px", display:"block" }}/>
              <p style={{ color:TEXT_SEC, fontSize:14, margin:0 }}>EDGAR API に接続中…</p>
              <p style={{ color:TEXT_TER, fontSize:12, margin:"6px 0 0" }}>
                CIK の解決と書類一覧の取得を行っています
              </p>
            </div>
          )}

          {/* ── 結果 ── */}
          {!loading && result && (
            <>
              {/* ステータスバー */}
              <div style={{ background:result.fetchStatus==="ok"?GREEN_BG:result.fetchStatus==="partial"?YELLOW_BG:RED_BG,
                border:`1px solid ${result.fetchStatus==="ok"?"rgba(74,222,128,0.22)":result.fetchStatus==="partial"?"rgba(251,191,36,0.22)":"rgba(248,113,113,0.22)"}`,
                borderRadius:10, padding:"12px 16px", marginBottom:18,
                display:"flex", flexWrap:"wrap", gap:12, alignItems:"center" }}>
                <span className="chip" style={{
                  background: result.fetchStatus==="ok"?GREEN_BG:result.fetchStatus==="partial"?YELLOW_BG:RED_BG,
                  color: result.fetchStatus==="ok"?GREEN:result.fetchStatus==="partial"?YELLOW:RED,
                  border:`1px solid ${result.fetchStatus==="ok"?"rgba(74,222,128,0.3)":result.fetchStatus==="partial"?"rgba(251,191,36,0.3)":"rgba(248,113,113,0.3)"}`,
                }}>
                  {result.fetchStatus==="ok"?"✓ OK":result.fetchStatus==="partial"?"⚠ PARTIAL":"✗ ERROR"}
                </span>
                {result.fetchStatus==="ok" && (
                  <>
                    <span style={{ fontSize:13, color:TEXT_PRI, fontWeight:600 }}>
                      {result.filings.length} 件取得
                    </span>
                    <span style={{ fontSize:12, color:TEXT_TER }}>
                      うち主要書類（10-K/10-Q/8-K等）: {primaryCount} 件
                    </span>
                    {edgarMeta?.totalFilings && (
                      <span style={{ fontSize:12, color:TEXT_TER }}>
                        全登録件数: {edgarMeta.totalFilings} 件
                      </span>
                    )}
                  </>
                )}
                {result.errorMessage && (
                  <span style={{ fontSize:12.5, color:RED, flex:1 }}>{result.errorMessage}</span>
                )}
              </div>

              {/* ── 会社情報カード（EDGAR） ── */}
              {edgarMeta?.companyName && (
                <div style={{ background:CARD2, border:BORDER, borderRadius:12, padding:"14px 18px",
                  marginBottom:18, display:"flex", flexWrap:"wrap", gap:16, alignItems:"center" }}>
                  <div>
                    <p style={{ fontSize:11, color:TEXT_TER, margin:"0 0 2px", textTransform:"uppercase", letterSpacing:".04em" }}>会社名</p>
                    <p style={{ fontSize:16, fontWeight:700, color:TEXT_PRI, margin:0 }}>{edgarMeta.companyName}</p>
                  </div>
                  {[
                    ["CIK",          edgarMeta.cik],
                    ["SIC",          edgarMeta.sic],
                    ["業種",         edgarMeta.sicDescription],
                    ["Entity Type",  edgarMeta.entityType],
                  ].map(([label, val]) => val ? (
                    <div key={label}>
                      <p style={{ fontSize:11, color:TEXT_TER, margin:"0 0 2px", textTransform:"uppercase", letterSpacing:".04em" }}>{label}</p>
                      <p style={{ fontSize:13, color:TEXT_SEC, margin:0, fontWeight:500 }}>{val}</p>
                    </div>
                  ) : null)}
                  {edgarMeta.cik && (
                    <a href={`https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=${edgarMeta.cik}&type=&dateb=&owner=include&count=20`}
                      target="_blank" rel="noopener noreferrer"
                      style={{ marginLeft:"auto", fontSize:12, color:INDIGO, textDecoration:"none",
                        background:INDIGO_BG, border:"1px solid rgba(129,140,248,0.25)",
                        borderRadius:6, padding:"5px 12px", whiteSpace:"nowrap" }}>
                      EDGAR で開く ↗
                    </a>
                  )}
                </div>
              )}

              {/* ── 書類種別サマリー ── */}
              {result.filings.length > 0 && (
                <div style={{ background:CARD, border:BORDER, borderRadius:12, padding:"14px 18px", marginBottom:18 }}>
                  <p style={{ fontSize:11, color:TEXT_TER, margin:"0 0 10px", textTransform:"uppercase", letterSpacing:".05em", fontWeight:700 }}>
                    書類種別の内訳
                  </p>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                    {Object.entries(typeSummary)
                      .sort((a,b) => b[1]-a[1])
                      .map(([type, count]) => {
                        const m = getDocMeta(type);
                        return (
                          <span key={type} className="chip"
                            style={{ background:m.bg, color:m.color, border:`1px solid ${m.color}33`, gap:5 }}>
                            {m.label}
                            <span style={{ background:"rgba(0,0,0,0.2)", borderRadius:10, padding:"0 5px", fontSize:10 }}>
                              {count}
                            </span>
                          </span>
                        );
                      })}
                  </div>
                </div>
              )}

              {/* ── 正規化データ テーブル ── */}
              {result.filings.length > 0 && (
                <div style={{ background:CARD, border:BORDER, borderRadius:14, padding:"16px 18px", marginBottom:18 }}>

                  {/* セクションヘッダー + フィルタ */}
                  <div style={{ display:"flex", flexWrap:"wrap", alignItems:"center", gap:10, marginBottom:14 }}>
                    <p style={{ fontSize:12, fontWeight:700, color:TEXT_TER, margin:0,
                      textTransform:"uppercase", letterSpacing:".05em" }}>
                      ✦ 正規化データ
                    </p>
                    <span style={{ fontSize:12, color:TEXT_TER }}>
                      {visibleFilings.length}/{result.filings.length} 件表示
                    </span>
                    <div style={{ marginLeft:"auto", display:"flex", gap:6, flexWrap:"wrap" }}>
                      {(["all","10-K","10-Q","8-K"] as FilterType[]).map((f) => (
                        <button key={f} className={`ft-btn${filter===f?" on":""}`}
                          onClick={() => setFilter(f)}>
                          {f === "all" ? "すべて" : f}
                        </button>
                      ))}
                    </div>
                  </div>

                  {visibleFilings.length === 0 ? (
                    <p style={{ color:TEXT_TER, fontSize:13, textAlign:"center", padding:"20px 0" }}>
                      このフィルタに該当する書類がありません
                    </p>
                  ) : (
                    <div style={{ overflowX:"auto" }}>
                      <table className="lt">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>書類種別</th>
                            <th>タイトル / 説明</th>
                            <th>提出日</th>
                            <th>対象期間末</th>
                            <th>書類</th>
                            <th>accessionNumber</th>
                          </tr>
                        </thead>
                        <tbody>
                          {visibleFilings.map((f, i) => {
                            const m   = getDocMeta(f.documentType);
                            const pri = m.primary;
                            return (
                              <tr key={i} className={pri ? "primary-row" : ""}>
                                <td style={{ color:TEXT_TER, width:32 }}>{i + 1}</td>
                                <td style={{ width:120 }}>
                                  <span className="chip" title={m.desc}
                                    style={{ background:m.bg, color:m.color, border:`1px solid ${m.color}33` }}>
                                    {m.label}
                                  </span>
                                  {m.desc && (
                                    <div style={{ fontSize:10, color:TEXT_TER, marginTop:2 }}>{m.desc}</div>
                                  )}
                                </td>
                                <td style={{ maxWidth:260, minWidth:100, fontSize:12 }}>
                                  {f.title || <span style={{ color:TEXT_TER }}>—</span>}
                                </td>
                                <td style={{ whiteSpace:"nowrap", fontSize:12 }}>
                                  {f.filedAt || <span style={{ color:TEXT_TER }}>—</span>}
                                </td>
                                <td style={{ whiteSpace:"nowrap", fontSize:12 }}>
                                  {f.periodEnd
                                    ? <span style={{ color:pri ? TEXT_PRI : TEXT_SEC }}>{f.periodEnd}</span>
                                    : <span style={{ color:TEXT_TER }}>—</span>}
                                </td>
                                <td style={{ width:80 }}>
                                  {f.documentUrl ? (
                                    <a href={f.documentUrl} target="_blank" rel="noopener noreferrer"
                                      style={{ color:INDIGO, fontSize:12, textDecoration:"none",
                                        background:INDIGO_BG, borderRadius:5, padding:"2px 8px",
                                        border:"1px solid rgba(129,140,248,0.22)", whiteSpace:"nowrap" }}>
                                      開く ↗
                                    </a>
                                  ) : <span style={{ color:TEXT_TER }}>—</span>}
                                </td>
                                <td style={{ fontSize:10, color:TEXT_TER, maxWidth:180, wordBreak:"break-all" }}>
                                  {f.sourceDocumentId || "—"}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* ── 生レスポンス ── */}
              {result.rawResponse !== null && (
                <div style={{ background:CARD, border:BORDER, borderRadius:14, padding:"16px 18px", marginBottom:18 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom: showRaw ? 12 : 0 }}>
                    <div>
                      <p style={{ fontSize:12, fontWeight:700, color:TEXT_TER, margin:0,
                        textTransform:"uppercase", letterSpacing:".05em" }}>
                        ✦ 生レスポンス（rawResponse）
                      </p>
                      {!showRaw && (
                        <p style={{ fontSize:11, color:TEXT_TER, margin:"3px 0 0" }}>
                          CIK・SIC・書類一覧スナップショットなど
                        </p>
                      )}
                    </div>
                    <button className="lb" style={{ padding:"5px 14px", fontSize:12 }}
                      onClick={() => setShowRaw((v) => !v)}>
                      {showRaw ? "▲ 閉じる" : "▼ 展開する"}
                    </button>
                  </div>
                  {showRaw && (
                    <pre className="raw-pre">{JSON.stringify(result.rawResponse, null, 2)}</pre>
                  )}
                </div>
              )}

              {/* ── 本番流用メモ ── */}
              {result.fetchStatus === "ok" && result.filings.length > 0 && (
                <div style={{ background:YELLOW_BG, border:"1px solid rgba(251,191,36,0.2)",
                  borderRadius:12, padding:"14px 18px" }}>
                  <p style={{ fontSize:12, color:YELLOW, margin:"0 0 10px", fontWeight:700 }}>
                    📝 本番ページ流用候補メモ
                  </p>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:10 }}>
                    {[
                      { field:"documentType",   note:"10-K / 10-Q / 8-K で書類種別を絞り込んでIRセクションに表示できる",     priority:"高" },
                      { field:"filedAt",         note:"/stocks/[ticker] の「直近提出日」表示に使える",                        priority:"高" },
                      { field:"periodEnd",       note:"対象決算期の表示。会計年度ラベルとして使える",                          priority:"高" },
                      { field:"documentUrl",     note:"書類への直リンク。IRリンクボタンとしてそのまま使える",                  priority:"高" },
                      { field:"companyName",     note:"SEC 登録の正式社名。表示名の補完に使える",                              priority:"中" },
                      { field:"sourceDocumentId",note:"accessionNumber。Supabase 保存時の重複除去キーになる",                  priority:"中" },
                    ].map(({ field, note, priority }) => (
                      <div key={field} style={{ background:"rgba(0,0,0,0.15)", borderRadius:8, padding:"10px 12px" }}>
                        <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:4 }}>
                          <code style={{ color:TEXT_PRI, fontSize:11.5, fontWeight:700 }}>{field}</code>
                          <span className="chip" style={{ fontSize:10,
                            background: priority==="高"?GREEN_BG:INDIGO_BG,
                            color:      priority==="高"?GREEN:INDIGO,
                            border:`1px solid ${priority==="高"?"rgba(74,222,128,0.25)":"rgba(129,140,248,0.25)"}`,
                          }}>
                            優先度: {priority}
                          </span>
                        </div>
                        <p style={{ fontSize:11.5, color:TEXT_TER, margin:0, lineHeight:1.55 }}>{note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* ── 初期ガイド ── */}
          {!result && !loading && (
            <div style={{ background:CARD, border:BORDER, borderRadius:12,
              padding:"32px 24px", textAlign:"center" }}>
              <p style={{ color:TEXT_SEC, fontSize:15, fontWeight:600, margin:"0 0 8px" }}>
                EDGAR で取得してみましょう
              </p>
              <p style={{ color:TEXT_TER, fontSize:13, margin:"0 0 18px" }}>
                上のサンプル（NVDA・MSFT など）をクリックするか、ticker を入力して「取得する」を押してください。
              </p>
              <div style={{ display:"flex", justifyContent:"center", gap:8, flexWrap:"wrap" }}>
                {EDGAR_SAMPLES.map((t) => (
                  <button key={t} className="sample-btn"
                    onClick={() => { setField("ticker", t); }}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
