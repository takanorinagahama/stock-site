import type { Metadata } from "next";
import {
  StaticPageLayout,
  StaticSectionCard,
} from "../../components/static/StaticPageLayout";

export const metadata: Metadata = {
  title: "お問い合わせ | AI Stock Data",
  description:
    "AI Stock Data への修正依頼、ご意見、ご要望などの連絡先を案内するページです。",
  alternates: {
    canonical: "https://ai-stock-data.com/contact",
  },
};

export default function ContactPage() {
  return (
    <StaticPageLayout breadcrumb="お問い合わせ">
      <h1
        style={{
          fontSize: "clamp(22px,4vw,28px)",
          fontWeight: 700,
          letterSpacing: "-0.02em",
          color: "#f1f5f9",
          marginBottom: 16,
        }}
      >
        お問い合わせ
      </h1>
      <p
        style={{
          fontSize: 14,
          lineHeight: 1.85,
          color: "#cbd5e1",
          marginBottom: 24,
          maxWidth: 640,
        }}
      >
        掲載内容の修正依頼、ご意見、ご要望などは、以下のメールアドレスまでご連絡ください。
      </p>

      {/* Email address card — prominent */}
      <div
        style={{
          background: "rgba(99,102,241,0.08)",
          border: "1px solid rgba(99,102,241,0.2)",
          borderRadius: 14,
          padding: "20px 22px",
          marginBottom: 24,
        }}
      >
        <p
          style={{
            fontSize: 11,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.07em",
            color: "#94a3b8",
            marginBottom: 8,
          }}
        >
          問い合わせ先メールアドレス
        </p>
        <a
          href="mailto:contact@ai-stock-data.com"
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: "#a5b4fc",
            textDecoration: "none",
            letterSpacing: "-0.01em",
            display: "inline-block",
          }}
        >
          contact@ai-stock-data.com
        </a>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <StaticSectionCard title="ご連絡について">
          <p style={{ fontSize: 14, lineHeight: 1.85, color: "#cbd5e1" }}>
            内容を確認のうえ、必要に応じて対応いたします。返信までにお時間をいただく場合があります。
          </p>
        </StaticSectionCard>

        <StaticSectionCard title="返信できない場合について">
          <p style={{ fontSize: 14, lineHeight: 1.85, color: "#cbd5e1" }}>
            内容によっては返信できない場合があります。また、誹謗中傷や営業目的のご連絡には対応を控えさせていただくことがあります。
          </p>
        </StaticSectionCard>
      </div>
    </StaticPageLayout>
  );
}
