import type { Metadata } from "next";
import {
  StaticPageLayout,
  StaticSectionCard,
} from "../../components/static/StaticPageLayout";

export const metadata: Metadata = {
  title: "プライバシーポリシー | AI Stock Data",
  description:
    "AI Stock Data におけるアクセス解析、Cookie 利用、広告配信、個人情報の取り扱い方針を掲載しています。",
  alternates: {
    canonical: "https://ai-stock-data.com/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <StaticPageLayout breadcrumb="プライバシーポリシー">
      <h1
        style={{
          fontSize: "clamp(22px,4vw,28px)",
          fontWeight: 700,
          letterSpacing: "-0.02em",
          color: "#f1f5f9",
          marginBottom: 16,
        }}
      >
        プライバシーポリシー
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
        当サイトでは、利用状況の把握や内容改善のために、アクセス情報を収集することがあります。以下に、主な取り扱い方針を記載します。
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <StaticSectionCard title="アクセス解析ツールについて">
          <p style={{ fontSize: 14, lineHeight: 1.85, color: "#cbd5e1" }}>
            当サイトでは Google Analytics を利用しています。サイトの利用状況を把握し、改善に役立てるために、Cookie などを通じてアクセス情報が収集される場合があります。
          </p>
        </StaticSectionCard>

        <StaticSectionCard title="Cookie の利用について">
          <p style={{ fontSize: 14, lineHeight: 1.85, color: "#cbd5e1" }}>
            当サイトでは、利便性向上や利用状況の把握のために Cookie を利用する場合があります。Cookie の利用は、ブラウザの設定で制限または無効化できます。
          </p>
        </StaticSectionCard>

        <StaticSectionCard title="広告配信について">
          <p style={{ fontSize: 14, lineHeight: 1.85, color: "#cbd5e1" }}>
            当サイトでは、今後第三者配信の広告サービス（Google AdSense 等）を利用する場合があります。広告配信事業者が、利用者の興味に応じた広告表示のために Cookie を使用することがあります。
          </p>
        </StaticSectionCard>

        <StaticSectionCard title="取得する情報と利用目的">
          <p style={{ fontSize: 14, lineHeight: 1.85, color: "#cbd5e1" }}>
            取得した情報は、サイトの利用状況の把握、内容改善、表示品質の確認、不正利用の防止などの目的で利用します。
          </p>
        </StaticSectionCard>

        <StaticSectionCard title="外部リンクについて">
          <p style={{ fontSize: 14, lineHeight: 1.85, color: "#cbd5e1" }}>
            当サイトでは外部サイトへのリンクを掲載することがあります。リンク先での個人情報の取り扱いについては、各サイトの方針をご確認ください。
          </p>
        </StaticSectionCard>

        <StaticSectionCard title="ポリシーの変更について">
          <p style={{ fontSize: 14, lineHeight: 1.85, color: "#cbd5e1" }}>
            本ポリシーの内容は、必要に応じて見直し・変更することがあります。変更後の内容は、このページに掲載した時点から適用します。
          </p>
        </StaticSectionCard>
      </div>
    </StaticPageLayout>
  );
}
