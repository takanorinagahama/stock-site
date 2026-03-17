import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import Link from "next/link";
import "./globals.css";

const siteUrl = "https://ai-stock-data.com";
const siteName = "AI Stock Data";
const defaultTitle = "AI Stock Data";
const defaultDescription =
  "AI関連企業・銘柄を比較しやすく整理した投資情報サイト。AIとの関わり方、成長ドライバー、リスク要因、競合比較などをわかりやすく整理して掲載。";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: defaultTitle,
  description: defaultDescription,
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: siteUrl,
    siteName,
    images: [
      {
        url: "/ogp.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: ["/ogp.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="ja">
      <body>
        {children}
        <footer
          style={{
            maxWidth: 980,
            margin: "40px auto 24px",
            padding: "0 24px",
            color: "rgba(255,255,255,0.72)",
          }}
        >
          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.1)",
              paddingTop: 14,
              display: "flex",
              flexWrap: "wrap",
              gap: "8px 16px",
              fontSize: 13,
            }}
          >
            <Link href="/about">このサイトについて</Link>
            <Link href="/privacy">プライバシーポリシー</Link>
            <Link href="/disclaimer">免責事項</Link>
            <Link href="/contact">お問い合わせ</Link>
          </div>
        </footer>
      </body>
      {gaMeasurementId ? <GoogleAnalytics gaId={gaMeasurementId} /> : null}
    </html>
  );
}
