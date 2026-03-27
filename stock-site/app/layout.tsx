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
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8744719745192896"
          crossOrigin="anonymous"
        />
      </head>
      <body style={{ margin: 0, padding: 0, background: "#0c1118" }}>
        {children}
        <footer
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            background: "#0a0e14",
          }}
        >
          <div
            style={{
              maxWidth: 1152,
              margin: "0 auto",
              padding: "32px 20px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 24,
            }}
          >
            {/* Brand */}
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 8,
                }}
              >
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 4,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(99,102,241,0.12)",
                    fontSize: 11,
                    color: "#f1f5f9",
                  }}
                >
                  ⬡
                </div>
                <span
                  style={{ fontSize: 13, fontWeight: 600, color: "#cbd5e1" }}
                >
                  AI Stock Data
                </span>
              </div>
              <p
                style={{
                  fontSize: 11,
                  lineHeight: 1.7,
                  color: "#94a3b8",
                  margin: 0,
                }}
              >
                AI関連銘柄を比較しやすく整理するための参考情報サイトです。投資助言ではありません。
              </p>
            </div>

            {/* Nav links */}
            <nav style={{ display: "flex", flexWrap: "wrap", gap: "8px 20px" }}>
              {[
                { label: "このサイトについて", href: "/about" },
                { label: "プライバシーポリシー", href: "/privacy" },
                { label: "免責事項", href: "/disclaimer" },
                { label: "お問い合わせ", href: "/contact" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    fontSize: 12,
                    color: "#94a3b8",
                    textDecoration: "none",
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </footer>
      </body>
      {gaMeasurementId ? <GoogleAnalytics gaId={gaMeasurementId} /> : null}
    </html>
  );
}
