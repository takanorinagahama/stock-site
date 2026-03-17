import { fetchStockItems, type StockApiItem } from "./fetch-stocks";
import type { ThemeDefinition } from "./themes";

export type ThemeResolvedStock = {
  stock: StockApiItem;
  summary: string;
  positioning: string;
};

export async function getThemeStocks(theme: ThemeDefinition): Promise<ThemeResolvedStock[]> {
  const data = await fetchStockItems();
  if (!data.ok) return [];

  const stockMap = new Map(
    data.items.map((item) => [item.ticker.toUpperCase(), item] as const),
  );

  return theme.featuredStocks.flatMap((entry) => {
    const stock = stockMap.get(entry.ticker.toUpperCase());
    if (!stock) return [];

    return [
      {
        stock,
        summary: entry.summary,
        positioning: entry.positioning,
      },
    ];
  });
}
