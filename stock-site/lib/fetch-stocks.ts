import { headers } from "next/headers";
import { getBaseUrlFromHeaders } from "./get-base-url";

export type StockScoreParts = {
  ai: number;
  growth: number;
  dependency: number;
  tier: number;
};

export type StockApiItem = {
  ticker: string;
  name: string;
  country: string | null;
  market: string | null;
  aiCategory: string | null;
  categoryJa?: string | null;
  companyDescription: string | null;
  aiSummary: string | null;
  companyUrl: string | null;
  irUrl: string | null;
  tier: string | null;
  aiRevMid: number | null;
  growthDiff: number | null;
  dependencyLevel: number | null;
  dependencyLabel: string | null;
  score: number | null;
  scoreParts: StockScoreParts | null;
  scoreReasonLabels?: string[];
  updatedMonth: string | null;
};

export type StocksApiResponse =
  | { ok: true; count: number; asOfMonth: string | null; items: StockApiItem[] }
  | { ok: false; error: string };

async function fetchStocksApi(): Promise<StocksApiResponse> {
  const h = await headers();
  const baseUrl = getBaseUrlFromHeaders(h);
  const res = await fetch(`${baseUrl}/api/stocks`, { cache: "no-store" });

  if (!res.ok) {
    return { ok: false, error: `Failed to fetch stocks: ${res.status}` };
  }

  return (await res.json()) as StocksApiResponse;
}

export async function fetchStocksSummary(): Promise<
  | { ok: true; count: number; asOfMonth: string | null }
  | { ok: false; error: string }
> {
  const data = await fetchStocksApi();
  if (!data.ok) return data;
  return { ok: true, count: data.count, asOfMonth: data.asOfMonth };
}

export async function fetchStockItems(): Promise<StocksApiResponse> {
  return fetchStocksApi();
}

export async function fetchStockByTicker(ticker: string): Promise<StockApiItem | null> {
  const data = await fetchStocksApi();
  if (!data.ok) return null;

  const normalized = ticker.toUpperCase();
  return data.items.find((item) => item.ticker.toUpperCase() === normalized) ?? null;
}
