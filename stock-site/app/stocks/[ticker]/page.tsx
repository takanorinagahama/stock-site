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
              <th style={{ textAlign: "left", borderBottom: "1px solid rgba(255,255,255,0.2)", padding: 8 }}>ティッカー</th>
              <td style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", padding: 8 }}>{item.ticker}</td>
            </tr>
            <tr>
              <th style={{ textAlign: "left", borderBottom: "1px solid rgba(255,255,255,0.2)", padding: 8 }}>企業名</th>
              <td style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", padding: 8 }}>{item.name}</td>
            </tr>
            <tr>
              <th style={{ textAlign: "left", borderBottom: "1px solid rgba(255,255,255,0.2)", padding: 8 }}>AI期待度</th>
              <td style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", padding: 8 }}>{asText(item.score)}</td>
            </tr>
            <tr>
              <th style={{ textAlign: "left", borderBottom: "1px solid rgba(255,255,255,0.2)", padding: 8 }}>AI売上（推定）</th>
              <td style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", padding: 8 }}>{formatAiRevenue(item.aiRevMid)}</td>
            </tr>
            <tr>
              <th style={{ textAlign: "left", borderBottom: "1px solid rgba(255,255,255,0.2)", padding: 8 }}>AI成長力</th>
              <td style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", padding: 8 }}>{asText(item.growthDiff)}</td>
            </tr>
            <tr>
              <th style={{ textAlign: "left", borderBottom: "1px solid rgba(255,255,255,0.2)", padding: 8 }}>AI依存度</th>
              <td style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", padding: 8 }}>
                {item.dependencyLabel ?? asText(item.dependencyLevel)}
              </td>
            </tr>
            <tr>
              <th style={{ textAlign: "left", borderBottom: "1px solid rgba(255,255,255,0.2)", padding: 8 }}>確度</th>
              <td style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", padding: 8 }}>{asText(item.tier)}</td>
            </tr>
            <tr>
              <th style={{ textAlign: "left", borderBottom: "1px solid rgba(255,255,255,0.2)", padding: 8 }}>基準月</th>
              <td style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", padding: 8 }}>{asText(item.updatedMonth)}</td>
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
                <th style={{ textAlign: "left", borderBottom: "1px solid rgba(255,255,255,0.2)", padding: 8 }}>AI売上寄与</th>
                <td style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", padding: 8 }}>{item.scoreParts.ai}</td>
              </tr>
              <tr>
                <th style={{ textAlign: "left", borderBottom: "1px solid rgba(255,255,255,0.2)", padding: 8 }}>成長寄与</th>
                <td style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", padding: 8 }}>{item.scoreParts.growth}</td>
              </tr>
              <tr>
                <th style={{ textAlign: "left", borderBottom: "1px solid rgba(255,255,255,0.2)", padding: 8 }}>依存度寄与</th>
                <td style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", padding: 8 }}>{item.scoreParts.dependency}</td>
              </tr>
              <tr>
                <th style={{ textAlign: "left", borderBottom: "1px solid rgba(255,255,255,0.2)", padding: 8 }}>確度寄与</th>
                <td style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", padding: 8 }}>{item.scoreParts.tier ?? 0}</td>
              </tr>
              <tr>
                <th style={{ textAlign: "left", borderBottom: "1px solid rgba(255,255,255,0.2)", padding: 8 }}>合計</th>
                <td style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", padding: 8 }}>
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
        <p className="mb-3 text-sm leading-7 text-white/85">
          このページでは、AI関連事業が企業の成長にどれだけ影響しているかを
          いくつかの指標から整理しています。
        </p>
        <div className="grid gap-3 md:grid-cols-2">
          <article className="rounded-xl border border-white/10 bg-white/5 p-3">
            <h3 className="mb-1 font-semibold">AI期待度</h3>
            <p className="text-sm leading-7 text-white/80">
              AI売上の大きさ、AIの成長、AIとの関わりの強さ、
              データの確からしさを総合して算出したスコアです。
              AI事業が企業価値にどれだけ影響しているかを全体的に評価する目安です。
            </p>
          </article>
          <article className="rounded-xl border border-white/10 bg-white/5 p-3">
            <h3 className="mb-1 font-semibold">AI売上（推定）</h3>
            <p className="text-sm leading-7 text-white/80">
              AI関連事業から生まれている売上の規模の目安です。
              企業がAI売上を開示している場合はその数値を使用し、
              開示がない場合はAI関連セグメント・AI製品の売上・AI向け設備需要などから推定しています。
            </p>
          </article>
          <article className="rounded-xl border border-white/10 bg-white/5 p-3">
            <h3 className="mb-1 font-semibold">AI成長力</h3>
            <p className="text-sm leading-7 text-white/80">
              AI関連事業の成長の強さを示す指標です。
              AI関連売上の成長率と、企業全体の売上成長率を比較して算出しています。
              AI事業が企業全体の成長をどれだけ押し上げているかを見るための指標です。
            </p>
          </article>
          <article className="rounded-xl border border-white/10 bg-white/5 p-3">
            <h3 className="mb-1 font-semibold">AI依存度</h3>
            <p className="text-sm leading-7 text-white/80">
              企業のビジネスがどれだけAI需要と結びついているかを示します。
              AI半導体・AIサーバー・AIクラウド・AIソフトウェアなど、
              AI市場の拡大と直接関係する事業ほど依存度が高くなります。
            </p>
          </article>
        </div>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <article className="rounded-xl border border-white/10 bg-white/5 p-3">
            <h3 className="mb-1 font-semibold">AI売上寄与</h3>
            <p className="text-sm leading-7 text-white/80">
              AI売上の規模がAI期待度スコアにどれだけ影響したかを示します。
            </p>
          </article>
          <article className="rounded-xl border border-white/10 bg-white/5 p-3">
            <h3 className="mb-1 font-semibold">成長寄与</h3>
            <p className="text-sm leading-7 text-white/80">
              AI成長力がAI期待度スコアにどれだけ影響したかを示します。
            </p>
          </article>
          <article className="rounded-xl border border-white/10 bg-white/5 p-3">
            <h3 className="mb-1 font-semibold">依存寄与</h3>
            <p className="text-sm leading-7 text-white/80">
              AI依存度がAI期待度スコアにどれだけ影響したかを示します。
            </p>
          </article>
          <article className="rounded-xl border border-white/10 bg-white/5 p-3">
            <h3 className="mb-1 font-semibold">確度寄与</h3>
            <p className="text-sm leading-7 text-white/80">
              データの信頼性（A / B / C）がスコアにどれだけ影響したかを示します。
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
