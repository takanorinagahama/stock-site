import type { Metadata } from "next";
import Link from "next/link";
import ThemeHero from "../../components/theme/ThemeHero";
import ThemeTable from "../../components/theme/ThemeTable";
import { THEME_GROUPS, getThemesBySlugs } from "../../lib/themes";

export const metadata: Metadata = {
  title: "テーマ別AI関連銘柄 | AI Stock Data",
  description:
    "AI半導体、AIインフラ、AIソフトウェア、電力インフラなど、テーマ別にAI関連銘柄を比較しやすく整理した一覧ページです。",
  alternates: {
    canonical: "https://ai-stock-data.com/themes",
  },
};

export default function ThemesPage() {
  const rows = THEME_GROUPS.map((group) => {
    const themes = getThemesBySlugs(group.themeSlugs);

    return [
      <div key={`${group.key}-title`}>
        <p className="font-semibold text-white">{group.title}</p>
      </div>,
      <p key={`${group.key}-description`} className="leading-7 text-white/72">
        {group.description}
      </p>,
      <div key={`${group.key}-themes`} className="space-y-3">
        {themes.map((theme) => (
          <div key={`${group.key}-${theme.slug}`}>
            <Link
              href={`/themes/${theme.slug}`}
              className="font-medium text-white underline decoration-white/20 underline-offset-4 transition hover:text-white/85"
            >
              {theme.title}
            </Link>
            <p className="mt-1 text-sm leading-6 text-white/58">{theme.shortDescription}</p>
          </div>
        ))}
      </div>,
    ];
  });

  return (
    <main className="mx-auto max-w-6xl px-6 py-14 text-neutral-100">
      <ThemeHero
        title="テーマ別AI関連銘柄"
        description="AI関連銘柄を、半導体・インフラ・ソフトウェア・応用・電力インフラといった切り口ごとに整理した一覧です。比較したいテーマから、そのまま詳細ページへ進めます。"
        tags={["AI半導体", "AIインフラ", "ソフトウェア", "応用企業", "電力インフラ"]}
      />

      <section className="mt-10">
        <h2 className="text-2xl font-semibold text-white">テーマ一覧</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-white/65">
          大分類ごとに代表テーマを並べています。気になる切り口から比較ページへ進むと、代表銘柄や比較軸をまとめて確認できます。
        </p>
        <div className="mt-5">
          <ThemeTable
            headers={["分類", "概要", "代表テーマ"]}
            rows={rows}
            columnClassNames={["w-[180px]", "min-w-[280px]", "min-w-[320px]"]}
          />
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-white/10 bg-black/10 p-4">
        <p className="text-sm leading-7 text-white/55">
          テーマページは比較・整理を目的とした参考情報です。最終的な投資判断はご自身で行ってください。
        </p>
      </section>
    </main>
  );
}
