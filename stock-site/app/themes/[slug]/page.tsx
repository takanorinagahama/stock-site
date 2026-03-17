import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ComparePointCard from "../../../components/theme/ComparePointCard";
import FeaturedStockCard from "../../../components/theme/FeaturedStockCard";
import RelatedThemeCard from "../../../components/theme/RelatedThemeCard";
import ThemeHero from "../../../components/theme/ThemeHero";
import ThemeSection from "../../../components/theme/ThemeSection";
import { getThemeStocks } from "../../../lib/get-theme-stocks";
import { getAllThemeSlugs, getThemeBySlug, getThemeGroupsForSlug } from "../../../lib/themes";

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
  const themeGroups = getThemeGroupsForSlug(theme.slug);
  const relatedThemes = theme.relatedThemes
    .map((relatedSlug) => getThemeBySlug(relatedSlug))
    .filter((item): item is NonNullable<typeof item> => item != null);

  return (
    <main className="mx-auto max-w-5xl px-6 py-14 text-neutral-100">
      <ThemeHero
        eyebrow="Theme Detail"
        title={theme.title}
        description={theme.shortDescription}
        tags={themeGroups.map((group) => group.title)}
        breadcrumbs={[
          { label: "ホーム", href: "/" },
          { label: "テーマ別AI関連銘柄", href: "/themes" },
          { label: theme.title },
        ]}
      />

      <div className="mt-10 space-y-6">
        <ThemeSection title="そのテーマの定義">
          <p className="leading-7 text-white/80">{theme.definition}</p>
        </ThemeSection>

        <ThemeSection title="なぜ注目されるのか">
          <p className="leading-7 text-white/80">{theme.whyNow}</p>
        </ThemeSection>

        <ThemeSection title="代表銘柄一覧" description="テーマ比較の起点になりやすい銘柄を抜粋しています。">
          <div className="mb-4 flex items-center justify-end">
            <Link href="/stocks" className="text-sm text-white/65 transition hover:text-white">
              銘柄一覧を見る
            </Link>
          </div>
          {stocks.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {stocks.map((item) => (
                <FeaturedStockCard key={`${theme.slug}-${item.stock.ticker}`} item={item} />
              ))}
            </div>
          ) : (
            <p className="text-sm leading-7 text-white/70">
              代表銘柄データは現在整理中です。後日追加される場合があります。
            </p>
          )}
        </ThemeSection>

        <ThemeSection
          title="比較ポイント"
          description="比較するときに見落としにくい観点を、テーマごとに絞って並べています。"
        >
          <div className="grid gap-3 md:grid-cols-2">
            {theme.comparePoints.map((point) => (
              <ComparePointCard key={`${theme.slug}-${point}`} point={point} />
            ))}
          </div>
        </ThemeSection>

        <ThemeSection title="各銘柄の位置づけ" description="同じテーマでも、恩恵の受け方や立ち位置は企業ごとに異なります。">
          {stocks.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {stocks.map(({ stock, positioning }) => (
                <article
                  key={`${theme.slug}-position-${stock.ticker}`}
                  className="rounded-2xl border border-white/10 bg-black/10 p-4"
                >
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-white">{stock.name}</h3>
                      <p className="text-sm text-white/50">{stock.ticker}</p>
                    </div>
                    <Link
                      href={`/stocks/${stock.ticker}`}
                      className="text-sm text-white/70 underline decoration-white/20 underline-offset-4 transition hover:text-white"
                    >
                      詳細
                    </Link>
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
        </ThemeSection>

        <ThemeSection
          title="リスクと注意点"
          description="期待だけで見ず、テーマ特有の変動要因や外部環境もあわせて確認しておくと整理しやすくなります。"
        >
          <div className="rounded-2xl border border-amber-200/10 bg-amber-50/[0.04] p-5">
            <ul className="list-disc space-y-2 pl-5 text-white/78">
              {theme.risks.map((risk) => (
                <li key={`${theme.slug}-${risk}`}>{risk}</li>
              ))}
            </ul>
          </div>
        </ThemeSection>

        <ThemeSection title="関連テーマ" description="近い切り口のテーマへ移動して、比較範囲を広げられます。">
          <div className="grid gap-3 md:grid-cols-2">
            {relatedThemes.map((relatedTheme) => (
              <RelatedThemeCard
                key={`${theme.slug}-related-${relatedTheme.slug}`}
                theme={relatedTheme}
              />
            ))}
          </div>
        </ThemeSection>
      </div>
    </main>
  );
}
