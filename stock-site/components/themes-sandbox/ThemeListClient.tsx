"use client";

import Link from "next/link";
import { useState } from "react";
import { THEME_GROUPS, THEMES, type ThemeGroupKey } from "../../lib/themes";

/* ─── Design tokens ─── */
const BG = "#0c1118";
const CARD_BG = "rgba(255,255,255,0.04)";
const BORDER = "1px solid rgba(255,255,255,0.07)";
const TEXT_PRI = "#f1f5f9";
const TEXT_SEC = "#cbd5e1";
const TEXT_TER = "#94a3b8";

const CAT_COLORS: Record<
  ThemeGroupKey,
  { dot: string; bg: string; text: string; border: string }
> = {
  "ai-semiconductors": {
    dot: "#818cf8",
    bg: "rgba(99,102,241,0.08)",
    text: "#a5b4fc",
    border: "rgba(99,102,241,0.2)",
  },
  "ai-infrastructure": {
    dot: "#60a5fa",
    bg: "rgba(96,165,250,0.08)",
    text: "#93c5fd",
    border: "rgba(96,165,250,0.2)",
  },
  "ai-software-platform": {
    dot: "#22d3ee",
    bg: "rgba(34,211,238,0.08)",
    text: "#67e8f9",
    border: "rgba(34,211,238,0.2)",
  },
  "ai-adoption": {
    dot: "#34d399",
    bg: "rgba(52,211,153,0.08)",
    text: "#6ee7b7",
    border: "rgba(52,211,153,0.2)",
  },
  "energy-power": {
    dot: "#fbbf24",
    bg: "rgba(251,191,36,0.08)",
    text: "#fcd34d",
    border: "rgba(251,191,36,0.2)",
  },
};

const ALL_KEY = "all";

export function ThemeListClient() {
  const [activeCat, setActiveCat] = useState<ThemeGroupKey | "all">(ALL_KEY);

  const filteredGroups =
    activeCat === ALL_KEY
      ? THEME_GROUPS
      : THEME_GROUPS.filter((g) => g.key === activeCat);

  return (
    <div
      style={{
        background: BG,
        minHeight: "100vh",
        color: TEXT_PRI,
        fontFamily:
          'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <div
        style={{
          maxWidth: 1152,
          margin: "0 auto",
          padding: "40px 20px 72px",
        }}
      >
        {/* Breadcrumb */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginBottom: 24,
            fontSize: 13,
            color: TEXT_TER,
          }}
        >
          <Link href="/" style={{ color: TEXT_TER, textDecoration: "none" }}>
            ホーム
          </Link>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>›</span>
          <span style={{ color: TEXT_SEC }}>テーマ一覧</span>
        </nav>

        {/* Page header */}
        <div style={{ marginBottom: 32 }}>
          <h1
            style={{
              fontSize: "clamp(22px,4vw,30px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: TEXT_PRI,
              marginBottom: 10,
            }}
          >
            テーマ別 AI関連銘柄
          </h1>
          <p
            style={{
              fontSize: 14,
              lineHeight: 1.8,
              color: TEXT_SEC,
              maxWidth: 560,
            }}
          >
            AI関連銘柄を、半導体・インフラ・ソフトウェア・応用・電力インフラといった切り口ごとに整理しています。
            比較したいテーマから、そのまま詳細ページへ進めます。
          </p>
        </div>

        {/* Category filter chips */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            marginBottom: 32,
            paddingBottom: 24,
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <FilterChip
            label="すべて"
            active={activeCat === ALL_KEY}
            onClick={() => setActiveCat(ALL_KEY)}
          />
          {THEME_GROUPS.map((g) => {
            const col = CAT_COLORS[g.key];
            return (
              <FilterChip
                key={g.key}
                label={g.title}
                active={activeCat === g.key}
                onClick={() => setActiveCat(g.key as ThemeGroupKey)}
                color={col}
              />
            );
          })}
        </div>

        {/* Theme groups */}
        <div style={{ display: "flex", flexDirection: "column", gap: 56 }}>
          {filteredGroups.map((group) => {
            const col = CAT_COLORS[group.key];
            const groupThemes = THEMES.filter((t) =>
              group.themeSlugs.includes(t.slug)
            );

            return (
              <section key={group.key}>
                {/* Category header */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 12,
                    marginBottom: 20,
                  }}
                >
                  {/* Accent bar */}
                  <div
                    style={{
                      width: 4,
                      height: 44,
                      borderRadius: 99,
                      background: col.dot,
                      boxShadow: `0 0 12px ${col.dot}50`,
                      flexShrink: 0,
                      marginTop: 2,
                    }}
                  />
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        flexWrap: "wrap",
                        marginBottom: 4,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          padding: "2px 8px",
                          borderRadius: 4,
                          background: col.bg,
                          color: col.text,
                          border: `1px solid ${col.border}`,
                        }}
                      >
                        大分類
                      </span>
                      <h2
                        style={{
                          fontSize: 18,
                          fontWeight: 700,
                          letterSpacing: "-0.01em",
                          color: TEXT_PRI,
                        }}
                      >
                        {group.title}
                      </h2>
                    </div>
                    <p
                      style={{
                        fontSize: 13,
                        lineHeight: 1.7,
                        color: TEXT_TER,
                        maxWidth: 560,
                      }}
                    >
                      {group.description}
                    </p>
                  </div>
                </div>

                {/* Theme cards */}
                {groupThemes.length > 0 ? (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                      gap: 12,
                      marginLeft: 16,
                    }}
                  >
                    {groupThemes.map((theme) => (
                      <Link
                        key={theme.slug}
                        href={`/themes/${theme.slug}`}
                        style={{ textDecoration: "none", display: "block" }}
                      >
                        <div
                          style={{
                            background: CARD_BG,
                            border: BORDER,
                            borderRadius: 14,
                            padding: "20px 22px",
                            transition: "border-color 0.15s",
                            height: "100%",
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLDivElement).style.borderColor =
                              "rgba(255,255,255,0.14)";
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLDivElement).style.borderColor =
                              "rgba(255,255,255,0.07)";
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              justifyContent: "space-between",
                              gap: 10,
                              marginBottom: 10,
                            }}
                          >
                            <h3
                              style={{
                                fontSize: 14,
                                fontWeight: 600,
                                lineHeight: 1.4,
                                color: TEXT_PRI,
                              }}
                            >
                              {theme.title}
                            </h3>
                            <span style={{ color: TEXT_TER, fontSize: 14, flexShrink: 0 }}>
                              ↗
                            </span>
                          </div>
                          <p
                            style={{
                              fontSize: 12,
                              lineHeight: 1.7,
                              color: TEXT_TER,
                              marginBottom: 14,
                            }}
                          >
                            {theme.shortDescription}
                          </p>
                          {/* Featured ticker chips */}
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                            {theme.featuredStocks.slice(0, 4).map((s) => (
                              <span
                                key={s.ticker}
                                style={{
                                  fontSize: 11,
                                  fontWeight: 600,
                                  padding: "2px 7px",
                                  borderRadius: 4,
                                  background: col.bg,
                                  color: col.text,
                                  border: `1px solid ${col.border}`,
                                }}
                              >
                                {s.ticker}
                              </span>
                            ))}
                            {theme.featuredStocks.length > 4 && (
                              <span
                                style={{
                                  fontSize: 11,
                                  padding: "2px 7px",
                                  borderRadius: 4,
                                  color: TEXT_TER,
                                  background: "rgba(255,255,255,0.04)",
                                  border: "1px solid rgba(255,255,255,0.06)",
                                }}
                              >
                                +{theme.featuredStocks.length - 4}
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p
                    style={{
                      marginLeft: 16,
                      fontSize: 13,
                      color: TEXT_TER,
                      fontStyle: "italic",
                    }}
                  >
                    このカテゴリのテーマは準備中です。
                  </p>
                )}
              </section>
            );
          })}
        </div>

        {/* Disclaimer */}
        <div style={{ marginTop: 56, textAlign: "center" }}>
          <p style={{ fontSize: 12, color: TEXT_TER }}>
            テーマページは比較・整理を目的とした参考情報です。最終的な投資判断はご自身で行ってください。
          </p>
        </div>
      </div>
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
  color,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  color?: { bg: string; text: string; border: string };
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        fontSize: 12,
        fontWeight: 500,
        padding: "5px 12px",
        borderRadius: 8,
        border: active
          ? `1px solid ${color?.border ?? "rgba(99,102,241,0.3)"}`
          : "1px solid rgba(255,255,255,0.06)",
        background: active
          ? (color?.bg ?? "rgba(99,102,241,0.12)")
          : "rgba(255,255,255,0.04)",
        color: active ? (color?.text ?? "#a5b4fc") : TEXT_TER,
        cursor: "pointer",
        transition: "all 0.15s",
      }}
    >
      {label}
    </button>
  );
}
