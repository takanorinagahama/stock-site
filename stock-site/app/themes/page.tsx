import type { Metadata } from "next";
import Link from "next/link";
import { THEME_GROUPS, getThemeBySlug } from "../../lib/themes";

export const metadata: Metadata = {
  title: "テーマ別AI関連銘柄 | AI Stock Data",
  description:
    "AI半導体、AIインフラ、AIソフトウェア、電力インフラなど、テーマ別にAI関連銘柄を比較しやすく整理した一覧ページです。",
  alternates: {
    canonical: "https://ai-stock-data.com/themes",
  },
};

export default function ThemesPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-14 text-neutral-100">
      <section className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h1 className="mb-3 text-3xl font-semibold">テーマ別AI関連銘柄</h1>
        <p className="leading-7 text-white/80">
          AI関連銘柄をテーマごとに整理した一覧です。半導体、インフラ、ソフトウェア、電力需要まで、比較したい切り口からページをたどれるようにしています。
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {THEME_GROUPS.map((group) => (
          <article key={group.key} className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="mb-2 text-xl font-semibold">{group.title}</h2>
            <p className="mb-4 text-sm leading-7 text-white/78">{group.description}</p>
            <div className="flex flex-col gap-2">
              {group.themeSlugs.map((slug) => {
                const theme = getThemeBySlug(slug);
                if (!theme) return null;

                return (
                  <Link
                    key={`${group.key}-${slug}`}
                    href={`/themes/${slug}`}
                    className="rounded-xl border border-white/10 bg-black/10 px-3 py-3 text-sm text-white/88 transition hover:bg-white/10"
                  >
                    <span className="block font-semibold">{theme.title}</span>
                    <span className="mt-1 block text-white/65">{theme.shortDescription}</span>
                  </Link>
                );
              })}
            </div>
          </article>
        ))}
      </section>

      <p className="mt-8 text-sm leading-7 text-white/55">
        テーマページは比較・整理を目的とした参考情報です。最終的な投資判断はご自身で行ってください。
      </p>
    </main>
  );
}
