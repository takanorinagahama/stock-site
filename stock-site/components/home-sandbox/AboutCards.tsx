export function AboutCards() {
  return (
    <section>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 24,
        }}
      >
        {/* このサイトの意義 */}
        <div
          style={{
            background: "#141922",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 16,
            padding: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 16,
            }}
          >
            <span style={{ fontSize: 15, color: "#818cf8" }}>≡</span>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#e2e8f0" }}>
              このサイトの意義
            </h3>
          </div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              "AI関連の情報を1画面で比較できるようにする",
              "指標の意味と見方を先に提示して、迷わず確認できるようにする",
              '欠損データは隠さず「データ不足」と表示して透明性を保つ',
              "難しい金融情報をやさしく整理して初心者にも使いやすくする",
            ].map((item) => (
              <li
                key={item}
                style={{ display: "flex", alignItems: "flex-start", gap: 10 }}
              >
                <span
                  style={{ color: "#818cf8", marginTop: 2, flexShrink: 0, fontSize: 13 }}
                >
                  ✓
                </span>
                <span style={{ fontSize: 13, lineHeight: 1.6, color: "#94a3b8" }}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* 使い方 3ステップ */}
        <div
          style={{
            background: "#141922",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 16,
            padding: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 16,
            }}
          >
            <span style={{ fontSize: 15, color: "#34d399" }}>🔍</span>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#e2e8f0" }}>
              使い方 — 3ステップ
            </h3>
          </div>
          <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              {
                n: "1",
                title: "テーマを選ぶ",
                body: "半導体・インフラ・ソフトウェアなど、興味のあるカテゴリのテーマページを開きます。",
              },
              {
                n: "2",
                title: "銘柄一覧でスコア比較",
                body: "銘柄一覧ページでAI期待度・AI売上・依存度を一覧で比べます。",
              },
              {
                n: "3",
                title: "公式IR・一次情報を確認",
                body: "気になった銘柄の詳細ページから公式サイト・IRページを必ず確認しましょう。",
              },
            ].map((step) => (
              <li
                key={step.n}
                style={{ display: "flex", alignItems: "flex-start", gap: 12 }}
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: 2,
                    background: "rgba(52,211,153,0.12)",
                    border: "1px solid rgba(52,211,153,0.2)",
                  }}
                >
                  <span
                    style={{ fontSize: 10, color: "#34d399", fontWeight: 700 }}
                  >
                    {step.n}
                  </span>
                </div>
                <div>
                  <p
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#cbd5e1",
                      marginBottom: 2,
                    }}
                  >
                    {step.title}
                  </p>
                  <p
                    style={{
                      fontSize: 12,
                      lineHeight: 1.6,
                      color: "#64748b",
                    }}
                  >
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
