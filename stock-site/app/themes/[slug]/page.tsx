import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getThemeStocks } from "../../../lib/get-theme-stocks";
import { getAllThemeSlugs, getThemeBySlug } from "../../../lib/themes";

type ThemePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllThemeSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ThemePageProps): Promise<Metadata> {
  const { slug } = await params;
  const theme = getThemeBySlug(slug);

  if (!theme) {
    return {
      title: "テーマが見つかりません | AI Stock Data",
    };
  }

  return {
    title: `${theme.title} | AI Stock Data`,
    description: theme.shortDescription,
    alternates: {
      canonical: `https://ai-stock-data.com/themes/${theme.slug}`,
    },
  };
}

export default async function ThemeDetailPage({ params }: ThemePageProps) {
  const { slug } = await params;
  const theme = getThemeBySlug(slug);
  if (!theme) notFound();

  const stocks = await getThemeStocks(theme);
  const relatedThemes = theme.relatedThemes
    .map((relatedSlug) => getThemeBySlug(relatedSlug))
    .filter((item): item is NonNullable<typeof item> => item != null);

  return (
    <main className="mx-auto max-w-5xl px-6 py-14 text-neutral-100">
      <nav className="mb-4 text-sm text-white/60">
        <Link href="/" className="hover:text-white">
          ホーム
        </Link>
        <span className="mx-2">/</span>
        <Link href="/themes" className="hover:text-white">
          テーマ別AI関連銘柄
        </Link>
        <span className="mx-2">/</span>
        <span>{theme.title}</span>
      </nav>

      <section className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h1 className="mb-3 text-3xl font-semibold">{theme.title}</h1>
        <p className="leading-7 text-white/82">{theme.shortDescription}</p>
      </section>

      <section className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="mb-2 text-xl font-semibold">そのテーマの定義</h2>
        <p className="leading-7 text-white/80">{theme.definition}</p>
      </section>

      <section className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="mb-2 text-xl font-semibold">なぜ注目されるのか</h2>
        <p className="leading-7 text-white/80">{theme.whyNow}</p>
      </section>

      <section className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="text-xl font-semibold">代表銘柄一覧</h2>
          <Link href="/stocks" className="text-sm text-white/65 hover:text-white">
            銘柄一覧を見る
          </Link>
        </div>
        {stocks.length > 0 ? (
          <div className="grid gap-3 md:grid-cols-2">
            {stocks.map(({ stock, summary }) => (
              <article key={`${theme.slug}-${stock.ticker}`} className="rounded-xl border border-white/10 bg-black/10 p-4">
                <div className="mb-2 flex items-baseline justify-between gap-3">
                  <div>
                    <p className="font-semibold">{stock.name}</p>
                    <p className="text-sm text-white/55">{stock.ticker}</p>
                  </div>
                </div>
                <p className="mb-3 text-sm leading-7 text-white/75">{summary}</p>
                <Link href={`/stocks/${stock.ticker}`} className="text-sm text-white/80 underline decoration-white/30 underline-offset-4">
                  詳細ページを見る
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <p className="text-sm leading-7 text-white/70">
            代表銘柄データは現在整理中です。後日追加される場合があります。
          </p>
        )}
      </section>

      <section className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="mb-2 text-xl font-semibold">比較ポイント</h2>
        <ul className="list-disc space-y-2 pl-5 text-white/80">
          {theme.comparePoints.map((point) => (
            <li key={`${theme.slug}-${point}`}>{point}</li>
          ))}
        </ul>
      </section>

      <section className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="mb-3 text-xl font-semibold">各銘柄の位置づけ</h2>
        {stocks.length > 0 ? (
          <div className="grid gap-3">
            {stocks.map(({ stock, positioning }) => (
              <article key={`${theme.slug}-position-${stock.ticker}`} className="rounded-xl border border-white/10 bg-black/10 p-4">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <h3 className="font-semibold">{stock.name}</h3>
                  <span className="text-sm text-white/55">{stock.ticker}</span>
                </div>
                <p className="text-sm leading-7 text-white/75">{positioning}</p>
              </article>
            ))}
          </div>
        ) : (
          <p className="text-sm leading-7 text-white/70">
            このテーマに紐づく銘柄の位置づけは、データ更新にあわせて順次整備しています。
          </p>
        )}
      </section>

      <section className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="mb-2 text-xl font-semibold">リスクと注意点</h2>
        <ul className="list-disc space-y-2 pl-5 text-white/80">
          {theme.risks.map((risk) => (
            <li key={`${theme.slug}-${risk}`}>{risk}</li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="mb-3 text-xl font-semibold">関連テーマ</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {relatedThemes.map((relatedTheme) => (
            <Link
              key={`${theme.slug}-related-${relatedTheme.slug}`}
              href={`/themes/${relatedTheme.slug}`}
              className="rounded-xl border border-white/10 bg-black/10 p-4 transition hover:bg-white/10"
            >
              <p className="mb-1 font-semibold">{relatedTheme.title}</p>
              <p className="text-sm leading-7 text-white/70">{relatedTheme.shortDescription}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
