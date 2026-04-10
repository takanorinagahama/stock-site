/**
 * EDGAR 取得 → Supabase 保存の一連フロー
 *
 * 1. fetchEdgarFilings() で正規化済み NormalizedFiling[] を取得
 * 2. upsertFilings() で Supabase に保存（重複は自動スキップ）
 * 3. 結果を { saved, skipped, error? } で返す
 */

import { fetchEdgarFilings }       from "./edgar";
import { upsertFilings, getLatestFilingDate } from "./repository";

const DEFAULT_COUNT = 40; // 1銘柄あたりの取得件数（初回・日次バッチ共通）

export interface SaveResult {
  ticker:      string;
  saved:       number;
  skipped:     number;
  prefilterd?: number; // 差分フィルタで除外した件数
  error?:      string;
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

  // 2. 差分フィルタ（改善案A）
  //    DB の最新 filed_at より古い・同日のものは upsert 対象から除外する
  const latestDate = await getLatestFilingDate(ticker);
  const toSave = latestDate
    ? fetchResult.filings.filter((f) => f.filedAt > latestDate)
    : fetchResult.filings;
  const prefiltered = fetchResult.filings.length - toSave.length;

  if (toSave.length === 0) {
    return { ticker, saved: 0, skipped: fetchResult.filings.length, prefilterd: prefiltered };
  }

  // 3. 保存
  const upsertResult = await upsertFilings(toSave);

  if (upsertResult.errors.length > 0) {
    return {
      ticker,
      saved:      upsertResult.saved,
      skipped:    upsertResult.skipped,
      prefilterd: prefiltered,
      error:      upsertResult.errors.join("; "),
    };
  }

  return {
    ticker,
    saved:      upsertResult.saved,
    skipped:    upsertResult.skipped,
    prefilterd: prefiltered,
  };
}

/** 複数銘柄をまとめて実行し、結果一覧を返す（バッチ用） */
export async function saveEdgarFilingsForTickers(
  tickers: string[],
  count = DEFAULT_COUNT
): Promise<SaveResult[]> {
  const CONCURRENCY = 10; // SEC レートリミット: 10リクエスト/秒
  const results: SaveResult[] = [];

  for (let i = 0; i < tickers.length; i += CONCURRENCY) {
    const chunk = tickers.slice(i, i + CONCURRENCY);
    const chunkResults = await Promise.all(
      chunk.map((ticker) => saveEdgarFilingsForTicker(ticker, count))
    );
    results.push(...chunkResults);
    // チャンク間で1秒待機（SECレートリミット対策）
    if (i + CONCURRENCY < tickers.length) {
      await new Promise((res) => setTimeout(res, 1000));
    }
  }

  return results;
}
