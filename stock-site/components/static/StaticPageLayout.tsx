import Link from "next/link";
import { SiteHeader } from "../shared/SiteHeader";

const FONT = 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

/* Shared wrapper for all static pages */
export function StaticPageLayout({
  breadcrumb,
  children,
}: {
  breadcrumb: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        background: "#0c1118",
        minHeight: "100vh",
        color: "#f1f5f9",
        fontFamily: FONT,
      }}
    >
      <SiteHeader />
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 20px 80px" }}>
        {/* Breadcrumb */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginBottom: 28,
            fontSize: 13,
            color: "#94a3b8",
          }}
        >
          <Link href="/" style={{ color: "#94a3b8", textDecoration: "none" }}>
            ホーム
          </Link>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>›</span>
          <span style={{ color: "#cbd5e1" }}>{breadcrumb}</span>
        </nav>
        {children}
      </div>
    </div>
  );
}

/* Section card used inside static pages */
export function StaticSectionCard({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 14,
        padding: "20px 22px",
      }}
    >
      {title && (
        <h2
          style={{
            fontSize: 15,
            fontWeight: 600,
            color: "#e2e8f0",
            marginBottom: 12,
            paddingBottom: 12,
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          {title}
        </h2>
      )}
      {children}
    </div>
  );
}
