import Link from "next/link";
import { fetchStockByTicker } from "../../../lib/fetch-stocks";

type DetailPageProps = {
  params: Promise<{ ticker: string }>;
};

function toStars(score: number): string {
  const stars = Math.max(1, Math.min(5, Math.round(score / 20)));
  return "★".repeat(stars) + "☆".repeat(5 - stars);
}

function asText(value: number | string | null | undefined, fallback = "データ不足"): string {
  return value == null || value === "" ? fallback : String(value);
}

function formatAiRevenue(value: number | null | undefined): string {
  if (value == null) return "データ不足";
  return value.toLocaleString("en-US");
}

const detailTableLabelCellStyle = {
  textAlign: "left" as const,
  borderBottom: "1px solid rgba(255,255,255,0.2)",
  padding: 8,
  width: "220px",
  whiteSpace: "nowrap" as const,
};

const detailTableValueCellStyle = {
  borderBottom: "1px solid rgba(255,255,255,0.1)",
  padding: 8,
};

const GUIDE_ITEMS = [
  {
    title: "AI期待度",
    body: "AI関連事業の重要度を総合的に見た目安スコアです。",
  },
  {
    title: "AI売上（推定）",
    body: "AI関連事業から生まれている売上規模の目安です。",
  },
  {
    title: "AI成長力",
    body: "AI関連事業がどれだけ成長を押し上げているかを見る指標です。",
  },
  {
    title: "AI依存度",
    body: "その企業の事業がAI需要とどれだけ強く結びついているかを示します。",
  },
] as const;

const CONTRIBUTION_GUIDE_ITEMS = [
  {
    title: "AI売上寄与",
    body: "AI売上の規模がスコアにどれだけ効いているかを示します。",
  },
  {
    title: "成長寄与",
    body: "AI関連事業の伸びがスコアにどれだけ効いているかを示します。",
  },
  {
    title: "依存寄与",
    body: "AI需要との結びつきの強さがスコアにどれだけ効いているかを示します。",
  },
  {
    title: "確度寄与",
    body: "データの信頼性がスコアにどれだけ反映されているかを示します。",
  },
] as const;

export default async function StockDetailPage({ params }: DetailPageProps) {
  const { ticker } = await params;
  const item = await fetchStockByTicker(ticker);

  if (!item) {
    return (
      <main style={{ maxWidth: 920, margin: "56px auto", padding: "0 24px" }}>
        <h1 style={{ fontSize: 28, marginBottom: 8 }}>{ticker.toUpperCase()}</h1>
        <p>該当銘柄のデータが見つかりませんでした。</p>
      </main>
    );
  }

  const partsTotal = item.scoreParts
    ? item.scoreParts.ai + item.scoreParts.growth + item.scoreParts.dependency + (item.scoreParts.tier ?? 0)
    : null;

  return (
    <main style={{ maxWidth: 920, margin: "56px auto", padding: "0 24px", lineHeight: 1.65 }}>
      <p style={{ marginBottom: 12 }}>
        <Link
          href="/stocks"
          style={{
            display: "inline-block",
            border: "1px solid rgba(255,255,255,0.2)",
            background: "rgba(255,255,255,0.06)",
            borderRadius: 12,
            padding: "8px 12px",
          }}
        >
          ← 一覧に戻る
        </Link>
      </p>

      <section
        style={{
          border: "1px solid rgba(255,255,255,0.1)",
          background: "rgba(255,255,255,0.05)",
          borderRadius: 18,
          padding: 20,
          marginBottom: 14,
        }}
      >
        <p style={{ opacity: 0.8, marginBottom: 4 }}>銘柄概要</p>
        <h1 style={{ fontSize: 34, marginBottom: 6 }}>{item.ticker}</h1>
        <p style={{ opacity: 0.92, marginBottom: 8 }}>{item.name}</p>
        <p style={{ marginBottom: 6 }}>
          <strong>AI期待度:</strong>{" "}
          {item.score == null ? "データ不足" : `${item.score} (${toStars(item.score)})`}
        </p>
        <p style={{ margin: 0 }}>
          <strong>AIカテゴリ:</strong> {asText(item.categoryJa ?? item.aiCategory, "未分類")}
        </p>
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
        <h2 style={{ fontSize: 18, marginBottom: 6 }}>この会社は何をしている？AIとどう関わる？</h2>
        <p style={{ marginBottom: 8 }}>
          <strong>会社概要:</strong> {asText(item.companyDescription, "準備中")}
        </p>
        <p style={{ marginBottom: 10 }}>
          <strong>AIとの関わり:</strong> {asText(item.aiSummary, "準備中")}
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {item.companyUrl ? (
            <a href={item.companyUrl} target="_blank" rel="noreferrer">
              公式サイト
            </a>
          ) : (
            <span style={{ opacity: 0.72 }}>公式サイト: 準備中</span>
          )}
          {item.irUrl ? (
            <a href={item.irUrl} target="_blank" rel="noreferrer">
              IRページ
            </a>
          ) : (
            <span style={{ opacity: 0.72 }}>IRページ: 準備中</span>
          )}
        </div>
      </section>

      {item.score == null ? (
        <section
          style={{
            border: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(255,255,255,0.05)",
            borderRadius: 16,
            padding: 12,
            marginBottom: 14,
          }}
        >
          <p style={{ margin: 0 }}>
            AI metrics未登録の可能性があるため、現在はスコアを算出できません（データ不足）。
          </p>
        </section>
      ) : null}

      <section
        style={{
          border: "1px solid rgba(255,255,255,0.1)",
          background: "rgba(255,255,255,0.05)",
          borderRadius: 16,
          padding: 14,
          marginBottom: 14,
        }}
      >
        <h2 style={{ fontSize: 20, marginBottom: 4 }}>スコア内訳（入力値）</h2>
        <p style={{ marginBottom: 8, opacity: 0.86 }}>
          score を作るための入力値です。値がない場合は「データ不足」と表示します。
        </p>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            <tr>
              <th style={detailTableLabelCellStyle}>ティッカー</th>
              <td style={detailTableValueCellStyle}>{item.ticker}</td>
            </tr>
            <tr>
              <th style={detailTableLabelCellStyle}>企業名</th>
              <td style={detailTableValueCellStyle}>{item.name}</td>
            </tr>
            <tr>
              <th style={detailTableLabelCellStyle}>AI期待度</th>
              <td style={detailTableValueCellStyle}>{asText(item.score)}</td>
            </tr>
            <tr>
              <th style={detailTableLabelCellStyle}>AI売上（推定）</th>
              <td style={detailTableValueCellStyle}>{formatAiRevenue(item.aiRevMid)}</td>
            </tr>
            <tr>
              <th style={detailTableLabelCellStyle}>AI成長力</th>
              <td style={detailTableValueCellStyle}>{asText(item.growthDiff)}</td>
            </tr>
            <tr>
              <th style={detailTableLabelCellStyle}>AI依存度</th>
              <td style={detailTableValueCellStyle}>
                {item.dependencyLabel ?? asText(item.dependencyLevel)}
              </td>
            </tr>
            <tr>
              <th style={detailTableLabelCellStyle}>確度</th>
              <td style={detailTableValueCellStyle}>{asText(item.tier)}</td>
            </tr>
            <tr>
              <th style={detailTableLabelCellStyle}>基準月</th>
              <td style={detailTableValueCellStyle}>{asText(item.updatedMonth)}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section
        style={{
          border: "1px solid rgba(255,255,255,0.1)",
          background: "rgba(255,255,255,0.05)",
          borderRadius: 16,
          padding: 14,
          marginBottom: 12,
        }}
      >
        <h2 style={{ fontSize: 20, marginBottom: 4 }}>寄与点（計算結果）</h2>
        <p style={{ marginBottom: 8, opacity: 0.86 }}>
          ai / growth / dependency / tier は加点結果です。total は合計です。
        </p>
        {item.scoreParts ? (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              <tr>
                <th style={detailTableLabelCellStyle}>AI売上寄与</th>
                <td style={detailTableValueCellStyle}>{item.scoreParts.ai}</td>
              </tr>
              <tr>
                <th style={detailTableLabelCellStyle}>成長寄与</th>
                <td style={detailTableValueCellStyle}>{item.scoreParts.growth}</td>
              </tr>
              <tr>
                <th style={detailTableLabelCellStyle}>依存度寄与</th>
                <td style={detailTableValueCellStyle}>{item.scoreParts.dependency}</td>
              </tr>
              <tr>
                <th style={detailTableLabelCellStyle}>確度寄与</th>
                <td style={detailTableValueCellStyle}>{item.scoreParts.tier ?? 0}</td>
              </tr>
              <tr>
                <th style={detailTableLabelCellStyle}>合計</th>
                <td style={detailTableValueCellStyle}>
                  {partsTotal != null ? partsTotal : "データ不足"}
                  {partsTotal != null && item.score != null ? ` (score: ${item.score})` : ""}
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
          <p style={{ margin: 0 }}>AI metrics未登録のため、寄与点は表示できません。</p>
        )}
      </section>

      <section className="mb-3 rounded-2xl border border-white/10 bg-white/5 p-4">
        <h2 className="mb-2 text-xl font-semibold">このページの読み方</h2>
        <p className="mb-4 text-sm leading-7 text-white/85">
          このページでは、AI関連事業がその企業にどれだけ重要かを、売上規模・成長・事業の結びつき・データ確度の4つの観点から整理しています。
        </p>

        <div className="mb-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/60">主要指標</p>
          <div className="grid gap-3 md:grid-cols-2">
            {GUIDE_ITEMS.map((item) => (
              <article key={item.title} className="rounded-xl border border-white/10 bg-black/10 p-3">
                <h3 className="mb-1 text-sm font-semibold text-white/95">{item.title}</h3>
                <p className="text-sm leading-6 text-white/78">{item.body}</p>
              </article>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/60">スコアの内訳</p>
          <div className="grid gap-2 md:grid-cols-2">
            {CONTRIBUTION_GUIDE_ITEMS.map((item) => (
              <article key={item.title} className="rounded-xl border border-white/10 bg-black/10 p-3">
                <h3 className="mb-1 text-sm font-semibold text-white/90">{item.title}</h3>
                <p className="text-sm leading-6 text-white/72">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
