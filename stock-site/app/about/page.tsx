import type { Metadata } from "next";
import {
  StaticPageLayout,
  StaticSectionCard,
} from "../../components/static/StaticPageLayout";

export const metadata: Metadata = {
  title: "このサイトについて | AI Stock Data",
  description:
    "AI Stock Data の目的や使い方、情報整理の考え方を案内するページです。",
  alternates: {
    canonical: "https://ai-stock-data.com/about",
  },
};

export default function AboutPage() {
  return (
    <StaticPageLayout breadcrumb="このサイトについて">
      <h1
        style={{
          fontSize: "clamp(22px,4vw,28px)",
          fontWeight: 700,
          letterSpacing: "-0.02em",
          color: "#f1f5f9",
          marginBottom: 16,
        }}
      >
        このサイトについて
      </h1>
      <p
        style={{
          fontSize: 14,
          lineHeight: 1.85,
          color: "#cbd5e1",
          marginBottom: 28,
          maxWidth: 640,
        }}
      >
        AI Stock Data は、AI関連銘柄を比較しやすく整理するための情報サイトです。AIとの関わり方や事業の特徴を、なるべく分かりやすい形で確認できるようにしています。
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <StaticSectionCard title="サイトの目的">
          <p style={{ fontSize: 14, lineHeight: 1.85, color: "#cbd5e1" }}>
            AI関連企業の情報は散らばりやすいため、売上規模、成長、カテゴリ、関連性などを一覧で見比べやすく整理することを目的としています。
          </p>
        </StaticSectionCard>

        <StaticSectionCard title="どんな人向けか">
          <p style={{ fontSize: 14, lineHeight: 1.85, color: "#cbd5e1" }}>
            AI関連銘柄を調べ始めた方や、複数企業の位置づけをまとめて確認したい方を主な対象としています。
          </p>
        </StaticSectionCard>

        <StaticSectionCard title="スコアや分類について">
          <p style={{ fontSize: 14, lineHeight: 1.85, color: "#cbd5e1" }}>
            掲載しているスコアやカテゴリは、情報整理をしやすくするための目安です。最終的な判断の前に、各社の決算資料や公式開示などの一次情報もあわせて確認することをおすすめします。
          </p>
        </StaticSectionCard>

        <StaticSectionCard title="今後の更新">
          <p style={{ fontSize: 14, lineHeight: 1.85, color: "#cbd5e1" }}>
            掲載内容は順次見直しながら更新しています。企業情報や分類、説明文なども今後の更新でより分かりやすく整えていく予定です。
          </p>
        </StaticSectionCard>

        <StaticSectionCard title="運営者">
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
              <span style={{ fontSize: 15, fontWeight: 600, color: "#e2e8f0" }}>Ragta（ラグ太）</span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.85, color: "#cbd5e1" }}>
              YJFX、マネーフォワード、楽天、メルカリなどで金融・決済関係のプロジェクトマネージャー・プロダクトマネージャーを歴任。数々のサービス・機能リリースを担当。
            </p>
          </div>
        </StaticSectionCard>
      </div>
    </StaticPageLayout>
  );
}
