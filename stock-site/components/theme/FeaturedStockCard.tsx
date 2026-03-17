import Link from "next/link";
import type { ThemeResolvedStock } from "../../lib/get-theme-stocks";

type FeaturedStockCardProps = {
  item: ThemeResolvedStock;
};

export default function FeaturedStockCard({ item }: FeaturedStockCardProps) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-white/10 bg-black/10 p-4">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-white">{item.stock.name}</h3>
          <p className="text-sm text-white/50">{item.stock.ticker}</p>
        </div>
        {item.stock.categoryJa || item.stock.aiCategory ? (
          <span className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-white/60">
            {item.stock.categoryJa ?? item.stock.aiCategory}
          </span>
        ) : null}
      </div>
      <p className="mb-4 text-sm leading-7 text-white/72">{item.summary}</p>
      <div className="mt-auto flex items-center justify-between gap-3">
        <span className="text-xs text-white/40">代表銘柄</span>
        <Link
          href={`/stocks/${item.stock.ticker}`}
          className="text-sm font-medium text-white/80 underline decoration-white/30 underline-offset-4 transition hover:text-white"
        >
          詳細ページへ
        </Link>
      </div>
    </article>
  );
}
