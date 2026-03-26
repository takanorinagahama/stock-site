export type FilingSource = "edgar" | "edinet";
export type FetchStatus = "ok" | "error" | "partial";

/** サイト内で共通に扱う正規化済み開示情報 */
export interface NormalizedFiling {
  source: FilingSource;
  companyName: string;
  ticker: string;
  documentType: string;
  title: string;
  filedAt: string;
  periodEnd: string | null;
  documentUrl: string | null;
  sourceDocumentId: string;
  contentType: string | null;
  language: "en" | "ja" | null;
  rawPayload: unknown;
  fetchStatus: FetchStatus;
  errorMessage?: string;
}

/** APIルートへのクエリパラメータ */
export interface FilingQuery {
  ticker?: string;
  edinetCode?: string;
  arbitraryId?: string;
  count?: number;
}

/** APIルートのレスポンス全体 */
export interface FilingFetchResult {
  source: FilingSource;
  query: FilingQuery;
  filings: NormalizedFiling[];
  rawResponse: unknown;
  fetchStatus: FetchStatus;
  errorMessage?: string;
}
