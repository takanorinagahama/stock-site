import type { Metadata } from "next";
import ThemeGroupCard from "../../components/theme/ThemeGroupCard";
import ThemeHero from "../../components/theme/ThemeHero";
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
  return (
    <main className="mx-auto max-w-6xl px-6 py-14 text-neutral-100">
      <ThemeHero
        eyebrow="AI Theme Navigator"
        title="テーマ別AI関連銘柄"
        description="AI関連銘柄をテーマごとに比較しやすく整理した一覧です。半導体、インフラ、ソフトウェア、電力需要まで、切り口ごとに代表ページへ進めます。"
        tags={["半導体", "インフラ", "ソフトウェア", "応用", "エネルギー"]}
      />

      <section className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {THEME_GROUPS.map((group) => (
          <ThemeGroupCard key={group.key} group={group} themes={getThemesBySlugs(group.themeSlugs)} />
        ))}
      </section>

      <section className="mt-10 rounded-2xl border border-white/10 bg-black/10 p-4">
        <p className="text-sm leading-7 text-white/55">
          テーマページは比較・整理を目的とした参考情報です。最終的な投資判断はご自身で行ってください。
        </p>
      </section>
    </main>
  );
}
