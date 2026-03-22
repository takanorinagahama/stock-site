export function DisclaimerBanner() {
  return (
    <section>
      <div
        style={{
          borderRadius: 10,
          padding: "12px 16px",
          display: "flex",
          alignItems: "flex-start",
          gap: 12,
          background: "rgba(251,191,36,0.06)",
          border: "1px solid rgba(251,191,36,0.15)",
        }}
      >
        <span style={{ fontSize: 14, flexShrink: 0 }}>⚠</span>
        <p style={{ fontSize: 12, lineHeight: 1.7, color: "rgba(253,230,138,0.7)" }}>
          本サイトは参考情報の整理を目的としており、
          <strong style={{ color: "rgba(253,230,138,0.9)", fontWeight: 500 }}>
            投資助言ではありません。
          </strong>
          最終的な投資判断はご自身の責任で行ってください。掲載情報の正確性・完全性・最新性は保証しません。
        </p>
      </div>
    </section>
  );
}
