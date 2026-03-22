import Link from "next/link";

export function SiteHeader() {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(12,17,24,0.92)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div
        style={{
          maxWidth: 1152,
          margin: "0 auto",
          padding: "0 20px",
          height: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <Link
          href="/"
          style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(99,102,241,0.15)",
              border: "1px solid rgba(99,102,241,0.3)",
              fontSize: 13,
              flexShrink: 0,
            }}
          >
            ⬡
          </div>
          <span
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: "#f1f5f9",
              letterSpacing: "-0.01em",
            }}
          >
            AI Stock Data
          </span>
        </Link>
        <nav style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {[
            { label: "テーマ一覧", href: "/themes" },
            { label: "銘柄一覧", href: "/stocks" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                padding: "6px 12px",
                borderRadius: 6,
                fontSize: 13,
                fontWeight: 500,
                color: "#cbd5e1",
                textDecoration: "none",
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
