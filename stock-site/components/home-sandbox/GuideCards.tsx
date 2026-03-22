interface GuideCardProps {
  icon: string;
  iconColor: string;
  iconBg: string;
  title: string;
  body: string;
}

function GuideCard({ icon, iconColor, iconBg, title, body }: GuideCardProps) {
  return (
    <div
      style={{
        background: "#141922",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 16,
        padding: 20,
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: iconBg,
          marginBottom: 12,
          fontSize: 16,
          color: iconColor,
        }}
      >
        {icon}
      </div>
      <h3
        style={{
          fontSize: 14,
          fontWeight: 600,
          color: "#e2e8f0",
          marginBottom: 8,
        }}
      >
        {title}
      </h3>
      <p style={{ fontSize: 13, lineHeight: 1.75, color: "#64748b" }}>
        {body}
      </p>
    </div>
  );
}

export function GuideCards() {
  return (
    <section>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 16,
        }}
      >
        <GuideCard
          icon="▦"
          iconColor="#818cf8"
          iconBg="rgba(99,102,241,0.1)"
          title="AI期待度（score）とは"
          body="0〜100の目安スコアです。AI売上・成長・依存度・確度の4軸を組み合わせた参考値で、高いほどAI関連の成長期待が相対的に高い可能性を示します。"
        />
        <GuideCard
          icon="📖"
          iconColor="#34d399"
          iconBg="rgba(52,211,153,0.08)"
          title="どう使う？"
          body="まずテーマ一覧でカテゴリを選び、銘柄一覧でスコアやAI売上を比較します。気になる銘柄の詳細ページで内訳を確認し、最後に公式サイト・IRで一次情報を必ず確認してください。"
        />
        <GuideCard
          icon="🛡"
          iconColor="#fb923c"
          iconBg="rgba(251,146,60,0.08)"
          title="注意（免責）"
          body="本サイトは一般情報の整理であり、投資助言ではありません。掲載スコアや分類はあくまで参考です。最終判断はご自身の責任で行ってください。"
        />
      </div>
    </section>
  );
}
