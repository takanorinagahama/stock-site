import type { Metadata } from "next";
import {
  StaticPageLayout,
  StaticSectionCard,
} from "../../components/static/StaticPageLayout";

export const metadata: Metadata = {
  title: "免責事項 | AI Stock Data",
  description:
    "AI Stock Data に掲載する投資関連情報の位置づけと、利用にあたっての免責事項を掲載しています。",
  alternates: {
    canonical: "https://ai-stock-data.com/disclaimer",
  },
};

export default function DisclaimerPage() {
  return (
    <StaticPageLayout breadcrumb="免責事項">
      <h1
        style={{
          fontSize: "clamp(22px,4vw,28px)",
          fontWeight: 700,
          letterSpacing: "-0.02em",
          color: "#f1f5f9",
          marginBottom: 16,
        }}
      >
        免責事項
      </h1>

      {/* Lead — amber warning tint to signal investment disclaimer */}
      <div
        style={{
          background: "rgba(251,191,36,0.07)",
          border: "1px solid rgba(251,191,36,0.18)",
          borderRadius: 12,
          padding: "16px 20px",
          marginBottom: 28,
          display: "flex",
          alignItems: "flex-start",
          gap: 10,
        }}
      >
        <span style={{ color: "#fbbf24", fontSize: 15, flexShrink: 0, marginTop: 1 }}>⚠</span>
        <p style={{ fontSize: 14, lineHeight: 1.85, color: "#fcd34d" }}>
          当サイトは、AI関連企業や銘柄に関する情報を整理して提供することを目的としたものであり、
          <strong>投資助言を行うものではありません。</strong>
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <StaticSectionCard title="投資判断について">
          <p style={{ fontSize: 14, lineHeight: 1.85, color: "#cbd5e1" }}>
            掲載情報は参考資料であり、最終的な投資判断は利用者ご自身の責任で行ってください。
          </p>
        </StaticSectionCard>

        <StaticSectionCard title="情報の正確性について">
          <p style={{ fontSize: 14, lineHeight: 1.85, color: "#cbd5e1" }}>
            掲載内容の正確性、完全性、最新性には注意していますが、これらを保証するものではありません。情報は予告なく変更される場合があります。
          </p>
        </StaticSectionCard>

        <StaticSectionCard title="外部リンクについて">
          <p style={{ fontSize: 14, lineHeight: 1.85, color: "#cbd5e1" }}>
            当サイトからリンクした外部サイトの内容やサービスについて、当サイトは責任を負いません。利用にあたってはリンク先の案内をご確認ください。
          </p>
        </StaticSectionCard>

        <StaticSectionCard title="損害等について">
          <p style={{ fontSize: 14, lineHeight: 1.85, color: "#cbd5e1" }}>
            当サイトの情報を利用したことによって生じたいかなる損害についても、当サイトは責任を負いかねます。あらかじめご了承ください。
          </p>
        </StaticSectionCard>
      </div>
    </StaticPageLayout>
  );
}
