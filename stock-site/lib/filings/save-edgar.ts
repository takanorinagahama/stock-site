/**
 * EDGAR 取得 → Supabase 保存の一連フロー
 *
 * 1. fetchEdgarFilings() で正規化済み NormalizedFiling[] を取得
 * 2. upsertFilings() で Supabase に保存（重複は自動スキップ）
 * 3. 結果を { saved, skipped, error? } で返す
 */

import { fetchEdgarFilings } from "./edgar";
import { upsertFilings }      from "./repository";

const DEFAULT_COUNT = 40; // 1銘柄あたりの取得件数（初回・日次バッチ共通）

export interface SaveResult {
  ticker:  string;
  saved:   number;
  skipped: number;
  error?:  string;
}

/** 1銘柄分の EDGAR 書類を取得して保存する */
export async function saveEdgarFilingsForTicker(
  ticker: string,
  count = DEFAULT_COUNT
): Promise<SaveResult> {
  // 1. 取得
  const fetchResult = await fetchEdgarFilings({ ticker, count });

  if (fetchResult.fetchStatus === "error") {
    return { ticker, saved: 0, skipped: 0, error: fetchResult.errorMessage };
  }

  if (fetchResult.filings.length === 0) {
    return { ticker, saved: 0, skipped: 0 };
  }

  // 2. 保存
  const upsertResult = await upsertFilings(fetchResult.filings);

  if (upsertResult.errors.length > 0) {
    return {
      ticker,
      saved:   upsertResult.saved,
      skipped: upsertResult.skipped,
      error:   upsertResult.errors.join("; "),
    };
  }

  return {
    ticker,
    saved:   upsertResult.saved,
    skipped: upsertResult.skipped,
  };
}

/** 複数銘柄をまとめて実行し、結果一覧を返す（バッチ用） */
export async function saveEdgarFilingsForTickers(
  tickers: string[],
  count = DEFAULT_COUNT
): Promise<SaveResult[]> {
  const results: SaveResult[] = [];
  for (const ticker of tickers) {
    const r = await saveEdgarFilingsForTicker(ticker, count);
    results.push(r);
    // SEC API へのリクエストを詰めすぎないよう 300ms 待機
    await new Promise((res) => setTimeout(res, 300));
  }
  return results;
}
