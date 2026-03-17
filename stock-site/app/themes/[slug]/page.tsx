import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ThemeHero from "../../../components/theme/ThemeHero";
import ThemeSection from "../../../components/theme/ThemeSection";
import ThemeTable from "../../../components/theme/ThemeTable";
import { getThemeStocks } from "../../../lib/get-theme-stocks";
import { getAllThemeSlugs, getThemeBySlug, getThemeGroupsForSlug } from "../../../lib/themes";

type ThemePageProps = {
  params: Promise<{ slug: string }>;
};

function getComparePointDescription(point: string): string {
  const descriptions: Record<string, string> = {
    "AI需要との距離の近さ": "AI投資の拡大が、その企業の売上や需要にどれだけ直接つながるかを見ます。",
    "売上への寄与の大きさ": "AI関連事業が全体業績の中でどれくらい存在感を持つかを確認する視点です。",
    "成長余地と競争優位": "市場拡大の中で、どの企業が伸びやすく、差別化要因を持つかを整理します。",
    "バリュエーションの高さ": "期待が株価にどこまで織り込まれているかを確認する比較軸です。",
    "AI売上への直接性": "AI需要の拡大が売上に直結しやすいかどうかを見る観点です。",
    "技術優位性": "製品性能、工程、独自技術などで優位性を持てるかを確認します。",
    "顧客集中度": "特定顧客への依存が高すぎないかを見て、変動リスクを把握します。",
    "設備投資循環の影響": "需要拡大の恩恵が継続的か、設備投資サイクルに左右されやすいかを確認します。",
    "地政学リスク": "輸出規制や地域リスクの影響を受けやすいかを整理します。",
    "データセンター需要とのつながり": "AI計算需要の増加が、施設やサーバー投資にどこまで波及するかを見る視点です。",
    "サーバー・ネットワーク投資の取り込み余地": "計算基盤の増設需要をどの企業が取り込みやすいかを比較します。",
    "クラウドとの関係": "クラウド基盤との結びつきが強いかどうかを整理します。",
    "継続需要か一過性か": "一時的な投資特需なのか、長く続く需要なのかを見極める観点です。",
    "NVIDIA需要との結びつきの強さ": "NVIDIAの需要拡大にどれだけ影響を受けるかを確認します。",
    "直接恩恵か間接恩恵か": "売上への反映が直接的か、周辺需要経由かを整理します。",
    "代替競争や依存リスク": "競争環境と特定企業依存の強さを比較するための視点です。",
    "サプライチェーン上の立ち位置": "上流・中流・下流のどこで恩恵を受ける企業かを確認します。",
    "データセンター投資への直接性": "施設新設や増設の影響がどれだけ直接業績に出るかを見ます。",
    "電力・冷却・通信との関係": "施設運営を支える周辺インフラとの結びつきを整理します。",
    "長期需要の継続性": "AI需要が中長期で続く前提にどれだけ支えられているかを確認します。",
    "地域集積と供給制約": "特定地域への需要集中や供給不足の影響を見ます。",
    "AI由来の電力需要とのつながり": "AIやデータセンターの増設が電力需要増にどれだけつながるかを見る観点です。",
    "発電・送配電・設備のどこに位置するか": "電力バリューチェーンのどの層にいる企業かを整理します。",
    "脱炭素電源との関係": "再エネや低炭素電源との結びつきがあるかを確認します。",
    "規制産業としての特性": "料金制度や政策の影響を受けやすいかを把握する視点です。",
    "地域性": "首都圏や関西圏など、立地による差が大きいテーマかを見ます。",
    "データセンター需要との距離の近さ": "施設増設による需要が、その企業にどれだけ近い位置で発生するかを確認します。",
    "首都圏・関西圏など地域性": "需要がどの地域で強く出やすいかを整理する比較軸です。",
    "発電か送配電か設備か": "どの機能でテーマに関わる企業かを見分けるための観点です。",
    "安定需要か投資循環か": "継続収益型か、設備投資の波に左右されるかを比較します。",
  };

  return descriptions[point] ?? "そのテーマを比較するときに確認しておきたい観点です。";
}

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

  const featuredRows = stocks.map((item) => [
    <div key={`${item.stock.ticker}-name`}>
      <p className="font-medium text-white">{item.stock.name}</p>
    </div>,
    <span key={`${item.stock.ticker}-ticker`} className="font-mono text-white/72">
      {item.stock.ticker}
    </span>,
    <span key={`${item.stock.ticker}-role`} className="text-white/68">
      {item.stock.categoryJa ?? item.stock.aiCategory ?? "関連企業"}
    </span>,
    <p key={`${item.stock.ticker}-summary`} className="leading-7 text-white/72">
      {item.summary}
    </p>,
    <Link
      key={`${item.stock.ticker}-link`}
      href={`/stocks/${item.stock.ticker}`}
      className="text-sm font-medium text-white underline decoration-white/20 underline-offset-4 transition hover:text-white/85"
    >
      詳細を見る
    </Link>,
  ]);

  const compareRows = theme.comparePoints.map((point) => [
    <span key={`${point}-label`} className="font-medium text-white">
      {point}
    </span>,
    <p key={`${point}-desc`} className="leading-7 text-white/72">
      {getComparePointDescription(point)}
    </p>,
  ]);

  const positioningRows = stocks.map(({ stock, positioning }) => [
    <p key={`${stock.ticker}-name`} className="font-medium text-white">
      {stock.name}
    </p>,
    <span key={`${stock.ticker}-ticker`} className="font-mono text-white/72">
      {stock.ticker}
    </span>,
    <p key={`${stock.ticker}-positioning`} className="leading-7 text-white/72">
      {positioning}
    </p>,
  ]);

  const relatedRows = relatedThemes.map((relatedTheme) => [
    <Link
      key={`${relatedTheme.slug}-title`}
      href={`/themes/${relatedTheme.slug}`}
      className="font-medium text-white underline decoration-white/20 underline-offset-4 transition hover:text-white/85"
    >
      {relatedTheme.title}
    </Link>,
    <p key={`${relatedTheme.slug}-description`} className="leading-7 text-white/72">
      {relatedTheme.shortDescription}
    </p>,
  ]);

  return (
    <main className="mx-auto max-w-5xl px-6 py-14 text-neutral-100">
      <ThemeHero
        title={theme.title}
        description={theme.shortDescription}
        tags={themeGroups.map((group) => group.title)}
        meta={themeGroups.map((group) => group.title).join(" / ")}
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
            <ThemeTable
              headers={["会社名", "ticker", "区分 / 役割", "一言要約", "詳細ページ"]}
              rows={featuredRows}
              columnClassNames={["min-w-[180px]", "w-[110px]", "min-w-[150px]", "min-w-[280px]", "w-[120px]"]}
            />
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
          <ThemeTable
            headers={["比較軸", "見るポイント"]}
            rows={compareRows}
            columnClassNames={["w-[240px]", "min-w-[360px]"]}
          />
        </ThemeSection>

        <ThemeSection title="各銘柄の位置づけ" description="同じテーマでも、恩恵の受け方や立ち位置は企業ごとに異なります。">
          {stocks.length > 0 ? (
            <ThemeTable
              headers={["銘柄", "ticker", "位置づけ詳細"]}
              rows={positioningRows}
              columnClassNames={["min-w-[180px]", "w-[110px]", "min-w-[360px]"]}
            />
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
          <div className="rounded-xl border border-white/10 bg-black/15 p-5">
            <ul className="list-disc space-y-3 pl-5 text-white/78">
              {theme.risks.map((risk) => (
                <li key={`${theme.slug}-${risk}`}>{risk}</li>
              ))}
            </ul>
          </div>
        </ThemeSection>

        <ThemeSection title="関連テーマ" description="近い切り口のテーマへ移動して、比較範囲を広げられます。">
          <ThemeTable
            headers={["関連テーマ", "概要"]}
            rows={relatedRows}
            columnClassNames={["min-w-[220px]", "min-w-[360px]"]}
          />
        </ThemeSection>
      </div>
    </main>
  );
}
