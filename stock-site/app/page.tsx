import Link from "next/link";
import { fetchStocksSummary } from "../lib/fetch-stocks";

export default async function Home() {
  const summary = await fetchStocksSummary();

  return (
    <main style={{ maxWidth: 980, margin: "56px auto", padding: "0 24px", lineHeight: 1.7 }}>
      <section
        style={{
          border: "1px solid rgba(255,255,255,0.1)",
          background: "rgba(255,255,255,0.05)",
          borderRadius: 20,
          padding: 24,
          marginBottom: 16,
        }}
      >
        <p style={{ opacity: 0.8, marginBottom: 6 }}>初心者向け AI銘柄ビューア</p>
        <h1 style={{ fontSize: 36, marginBottom: 8 }}>Stock Viewer</h1>
        <p style={{ opacity: 0.92, marginBottom: 14 }}>
          AI関連銘柄を、AI売上（推定）・成長差分・依存度・確度で比較して、何を確認すべきかを分かりやすく整理します。
        </p>
        {summary.ok ? (
          <p style={{ opacity: 0.82, marginBottom: 14 }}>
            収録銘柄: {summary.count} / 基準月: {summary.asOfMonth ?? "データ不足"}
          </p>
        ) : (
          <p style={{ opacity: 0.72, marginBottom: 14 }}>
            現在データ取得が不安定です。しばらくしてから再読み込みしてください。
          </p>
        )}
        <Link
          href="/stocks"
          style={{
            display: "inline-block",
            border: "1px solid rgba(255,255,255,0.3)",
            background: "rgba(255,255,255,0.14)",
            borderRadius: 14,
            padding: "11px 16px",
            fontWeight: 700,
          }}
        >
          銘柄一覧を見る
        </Link>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 12,
          marginBottom: 16,
        }}
      >
        <div style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", borderRadius: 16, padding: 14 }}>
          <h2 style={{ fontSize: 18, marginBottom: 4 }}>AI期待度（score）とは</h2>
          <p style={{ opacity: 0.86 }}>
            0〜100の目安スコアです。高いほどAI関連の成長期待が相対的に高い可能性を示します。
          </p>
        </div>
        <div style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", borderRadius: 16, padding: 14 }}>
          <h2 style={{ fontSize: 18, marginBottom: 4 }}>どう使う？</h2>
          <p style={{ opacity: 0.86 }}>
            まずランキングで比較し、次に詳細で内訳を確認し、最後に公式サイト/IRで一次情報を確認します。
          </p>
        </div>
        <div style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", borderRadius: 16, padding: 14 }}>
          <h2 style={{ fontSize: 18, marginBottom: 4 }}>注意（免責）</h2>
          <p style={{ opacity: 0.86 }}>
            本サイトは一般情報の整理であり、投資助言ではありません。最終判断はご自身で行ってください。
          </p>
        </div>
      </section>

      <section
        style={{
          border: "1px solid rgba(255,255,255,0.1)",
          background: "rgba(255,255,255,0.05)",
          borderRadius: 16,
          padding: 16,
        }}
      >
        <h2 style={{ fontSize: 20, marginBottom: 8 }}>このサイトの意義</h2>
        <ul style={{ paddingLeft: 20, margin: 0 }}>
          <li>AI関連の情報を1画面で比較できるようにする</li>
          <li>指標の意味と見方を先に提示して、迷わず確認できるようにする</li>
          <li>欠損データは隠さず「データ不足」と表示して透明性を保つ</li>
        </ul>
      </section>
    </main>
  );
}
