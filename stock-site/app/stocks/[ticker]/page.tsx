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

/** 0–100 のスコアをバー幅（%）に変換 */
function scoreToWidth(score: number | null | undefined): string {
  if (score == null) return "0%";
  return `${Math.max(0, Math.min(100, score))}%`;
}

const detailTableLabelCellStyle = {
  textAlign: "left" as const,
  borderBottom: "1px solid rgba(255,255,255,0.12)",
  padding: "8px 10px",
  width: "200px",
  whiteSpace: "nowrap" as const,
  opacity: 0.75,
  fontSize: 14,
};

const detailTableValueCellStyle = {
  borderBottom: "1px solid rgba(255,255,255,0.08)",
  padding: "8px 10px",
  fontSize: 14,
};

const SCORE_BARS = [
  {
    key: "ai" as const,
    label: "AI売上スコア",
    description: "AI関連事業から生まれている売上規模の大きさを0〜100で評価したスコアです。",
    color: "#60a5fa",
  },
  {
    key: "growth" as const,
    label: "AI成長スコア",
    description: "AI関連事業の売上成長の強さを0〜100で評価したスコアです。",
    color: "#34d399",
  },
  {
    key: "dependency" as const,
    label: "AI依存度スコア",
    description: "その企業の事業・AIとどれだけ深く結びついているかを0〜100で評価したスコアです。",
    color: "#a78bfa",
  },
  {
    key: "tier" as const,
    label: "確度スコア",
    description: "AI関連売上の推定に使ったデータの信頼度を0〜100で評価したスコアです（A=90〜、B=70〜、C=70未満）。",
    color: "#fbbf24",
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

  // 非アクティブバナー
  const inactiveBanner =
    item.isActive === false ? (
      <div
        style={{
          background: "rgba(251,191,36,0.12)",
          border: "1px solid rgba(251,191,36,0.4)",
          borderRadius: 12,
          padding: "10px 16px",
          marginBottom: 14,
          fontSize: 14,
          color: "#fbbf24",
        }}
      >
        ⚠ この銘柄は現在の銘柄リストには含まれていません。過去時点のデータを表示しています。
      </div>
    ) : null;

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

      {inactiveBanner}

      {/* 銘柄概要 */}
      <section
        style={{
          border: "1px solid rgba(255,255,255,0.1)",
          background: "rgba(255,255,255,0.05)",
          borderRadius: 18,
          padding: 20,
          marginBottom: 14,
        }}
      >
        <p style={{ opacity: 0.7, marginBottom: 4, fontSize: 13 }}>銘柄概要</p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
          <div>
            <h1 style={{ fontSize: 34, marginBottom: 4 }}>{item.ticker}</h1>
            <p style={{ opacity: 0.85, marginBottom: 8 }}>{item.name}</p>
            <p style={{ margin: 0, fontSize: 14, opacity: 0.8 }}>
              {asText(item.categoryJa ?? item.aiCategory, "未分類")}
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontSize: 12, opacity: 0.6, marginBottom: 2 }}>AI期待度</p>
            <p style={{ fontSize: 48, fontWeight: 700, lineHeight: 1, marginBottom: 4 }}>
              {item.score ?? "—"}
            </p>
            <p style={{ fontSize: 18, letterSpacing: 2 }}>
              {item.score != null ? toStars(item.score) : ""}
            </p>
          </div>
        </div>
      </section>

      {/* 会社説明 */}
      <section
        style={{
          border: "1px solid rgba(255,255,255,0.1)",
          background: "rgba(255,255,255,0.05)",
          borderRadius: 16,
          padding: 16,
          marginBottom: 14,
        }}
      >
        <h2 style={{ fontSize: 18, marginBottom: 10 }}>この会社は何をしている？AIとどう関わる？</h2>
        <p style={{ marginBottom: 10 }}>
          <strong style={{ opacity: 0.7, fontSize: 13 }}>会社概要</strong><br />
          {asText(item.companyDescription, "準備中")}
        </p>
        <p style={{ marginBottom: 12 }}>
          <strong style={{ opacity: 0.7, fontSize: 13 }}>AIとの関わり</strong><br />
          {asText(item.aiSummary, "準備中")}
        </p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {item.companyUrl ? (
            <a
              href={item.companyUrl}
              target="_blank"
              rel="noreferrer"
              style={{
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: 8,
                padding: "6px 12px",
                fontSize: 13,
                textDecoration: "none",
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
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: 8,
                padding: "6px 12px",
                fontSize: 13,
                textDecoration: "none",
              }}
            >
              📊 IRページ
            </a>
          ) : null}
        </div>
      </section>

      {/* 主要指標テーブル */}
      <section
        style={{
          border: "1px solid rgba(255,255,255,0.1)",
          background: "rgba(255,255,255,0.05)",
          borderRadius: 16,
          padding: 16,
          marginBottom: 14,
        }}
      >
        <h2 style={{ fontSize: 18, marginBottom: 10 }}>スコア内訳（入力値）</h2>
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
              <th style={detailTableLabelCellStyle}>AI期待度スコア</th>
              <td style={detailTableValueCellStyle}>{asText(item.score)}</td>
            </tr>
            <tr>
              <th style={detailTableLabelCellStyle}>AI売上（推定）</th>
              <td style={detailTableValueCellStyle}>{formatAiRevenue(item.aiRevMid)}</td>
            </tr>
            <tr>
              <th style={detailTableLabelCellStyle}>AI成長スコア</th>
              <td style={detailTableValueCellStyle}>{asText(item.scoreParts?.growth)}</td>
            </tr>
            <tr>
              <th style={detailTableLabelCellStyle}>AI依存度</th>
              <td style={detailTableValueCellStyle}>
                {item.dependencyLabel ?? asText(item.dependencyLevel)}
              </td>
            </tr>
            <tr>
              <th style={detailTableLabelCellStyle}>確度スコア</th>
              <td style={detailTableValueCellStyle}>{asText(item.scoreParts?.tier)}</td>
            </tr>
            <tr>
              <th style={detailTableLabelCellStyle}>基準月</th>
              <td style={detailTableValueCellStyle}>{asText(item.updatedMonth)}</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* スコア内訳（4指標バー） */}
      <section
        style={{
          border: "1px solid rgba(255,255,255,0.1)",
          background: "rgba(255,255,255,0.05)",
          borderRadius: 16,
          padding: 16,
          marginBottom: 14,
        }}
      >
        <h2 style={{ fontSize: 18, marginBottom: 4 }}>スコア内訳（4指標）</h2>
        <p style={{ fontSize: 13, opacity: 0.7, marginBottom: 16 }}>
          各指標は0〜100のスコアです。AI期待度 = 4指標の平均値（小数点以下四捨五入）。
        </p>

        {item.scoreParts ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {SCORE_BARS.map((bar) => {
              const val = item.scoreParts![bar.key];
              return (
                <div key={bar.key}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 14, fontWeight: 600 }}>{bar.label}</span>
                    <span style={{ fontSize: 14, fontWeight: 700 }}>{val}</span>
                  </div>
                  <div
                    style={{
                      height: 10,
                      borderRadius: 5,
                      background: "rgba(255,255,255,0.1)",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: scoreToWidth(val),
                        borderRadius: 5,
                        background: bar.color,
                        transition: "width 0.3s ease",
                      }}
                    />
                  </div>
                </div>
              );
            })}

            <div
              style={{
                borderTop: "1px solid rgba(255,255,255,0.1)",
                paddingTop: 12,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: 15, fontWeight: 600 }}>AI期待度（平均）</span>
              <span style={{ fontSize: 20, fontWeight: 700 }}>
                {item.score ?? "—"}
                {item.score != null ? (
                  <span style={{ fontSize: 13, opacity: 0.6, marginLeft: 6 }}>
                    ({(
                      (item.scoreParts.ai +
                        item.scoreParts.growth +
                        item.scoreParts.dependency +
                        item.scoreParts.tier) /
                      4
                    ).toFixed(1)} + 四捨五入)
                  </span>
                ) : null}
              </span>
            </div>
          </div>
        ) : (
          <p style={{ margin: 0, opacity: 0.7 }}>スコアデータがありません。</p>
        )}
      </section>

      {/* このページの読み方 */}
      <section className="mb-3 rounded-2xl border border-white/10 bg-white/5 p-4">
        <h2 className="mb-2 text-xl font-semibold">このページの読み方</h2>
        <p className="mb-4 text-sm leading-7 text-white/85">
          AI関連事業がその企業にどれだけ重要かを、売上規模・成長・事業の結びつき・データ確度の4つの観点から整理しています。
        </p>
        <div className="grid gap-3 md:grid-cols-2">
          <article className="rounded-xl border border-white/10 bg-black/10 p-3">
            <h3 className="mb-1 text-sm font-semibold text-white/95">AI期待度</h3>
            <p className="text-sm leading-6 text-white/78">
              0〜100で採点し、AI売上・成長・依存度・確度の4指標を平均した総合スコア。100を超えません。
            </p>
          </article>
          <article className="rounded-xl border border-white/10 bg-black/10 p-3">
            <h3 className="mb-1 text-sm font-semibold text-white/95">AI売上スコア</h3>
            <p className="text-sm leading-6 text-white/78">
              AI関連事業から生まれている売上規模の大きさを0〜100で評価したスコアです。
            </p>
          </article>
          <article className="rounded-xl border border-white/10 bg-black/10 p-3">
            <h3 className="mb-1 text-sm font-semibold text-white/95">AI成長スコア</h3>
            <p className="text-sm leading-6 text-white/78">
              AI関連事業の売上成長の強さを0〜100で評価したスコアです。
            </p>
          </article>
          <article className="rounded-xl border border-white/10 bg-black/10 p-3">
            <h3 className="mb-1 text-sm font-semibold text-white/95">AI依存度スコア</h3>
            <p className="text-sm leading-6 text-white/78">
              その企業の事業・AIとどれだけ深く結びついているかを0〜100で評価したスコアです。
            </p>
          </article>
          <article className="rounded-xl border border-white/10 bg-black/10 p-3">
            <h3 className="mb-1 text-sm font-semibold text-white/95">確度スコア</h3>
            <p className="text-sm leading-6 text-white/78">
              AI関連売上の推定に使ったデータの信頼度を0〜100で評価したスコアです（A=90〜、B=70〜、C=70未満）。
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
