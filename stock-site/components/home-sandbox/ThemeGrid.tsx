import Link from "next/link";
import { THEME_GROUPS, type ThemeGroupDefinition } from "../../lib/themes";

const GROUP_COLORS: Record<string, string> = {
  "ai-semiconductors": "#818cf8",
  "ai-infrastructure": "#60a5fa",
  "ai-software-platform": "#22d3ee",
  "ai-adoption": "#34d399",
  "energy-power": "#fbbf24",
};

function ThemeGroupCard({ group }: { group: ThemeGroupDefinition }) {
  const color = GROUP_COLORS[group.key] ?? "#818cf8";
  const count = group.themeSlugs.length;

  return (
    <Link
      href="/themes"
      style={{ textDecoration: "none", display: "block", height: "100%" }}
    >
      <div
        style={{
          background: "#141922",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 16,
          padding: 20,
          height: "100%",
          boxSizing: "border-box",
          cursor: "pointer",
          transition: "border-color 0.15s",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 12,
            marginBottom: 12,
          }}
        >
          {/* color dot */}
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: color,
              boxShadow: `0 0 8px ${color}60`,
              flexShrink: 0,
              marginTop: 2,
            }}
          />
          <span style={{ fontSize: 12, color: "#475569" }}>{count}テーマ</span>
        </div>
        <h3
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: "#f1f5f9",
            marginBottom: 8,
            letterSpacing: "-0.01em",
          }}
        >
          {group.title}
        </h3>
        <p
          style={{
            fontSize: 12,
            lineHeight: 1.7,
            color: "#64748b",
          }}
        >
          {group.description}
        </p>
      </div>
    </Link>
  );
}

export function ThemeGrid() {
  return (
    <section>
      {/* section header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <div>
          <h2
            style={{
              fontSize: 17,
              fontWeight: 600,
              color: "#f1f5f9",
              letterSpacing: "-0.01em",
            }}
          >
            テーマから探す
          </h2>
          <p style={{ fontSize: 13, color: "#64748b", marginTop: 4 }}>
            興味のあるカテゴリからAI関連銘柄を比較できます
          </p>
        </div>
        <Link
          href="/themes"
          style={{
            fontSize: 13,
            color: "#818cf8",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          すべて見る ›
        </Link>
      </div>

      {/* grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 12,
        }}
      >
        {THEME_GROUPS.map((group) => (
          <ThemeGroupCard key={group.key} group={group} />
        ))}
      </div>
    </section>
  );
}
