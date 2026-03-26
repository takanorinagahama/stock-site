/**
 * EDINET API からの書類取得ロジック
 *
 * 主要エンドポイント:
 *   GET https://api.edinet-fsa.go.jp/api/v2/documents.json
 *     ?date=YYYY-MM-DD&type=2&Subscription-Key={key}
 *
 * APIキーは環境変数 EDINET_API_KEY から読み込む。
 * 未設定時はエラーメッセージを返す（アプリはクラッシュしない）。
 *
 * ref: https://disclosure2.edinet-fsa.go.jp/WZEK0110.aspx
 */

import type { FilingFetchResult, FilingQuery, NormalizedFiling } from "./types";

const EDINET_BASE = "https://api.edinet-fsa.go.jp/api/v2";

/** ISO日付 (YYYY-MM-DD) を過去 n 日分生成 */
function recentDates(n: number): string[] {
  return Array.from({ length: n }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d.toISOString().split("T")[0];
  });
}

type EdinetDoc = {
  docID?: string;
  edinetCode?: string;
  filerName?: string;
  issuerNameJP?: string;
  docTypeCode?: string;
  docDescription?: string;
  submitDateTime?: string;
  periodStart?: string;
  periodEnd?: string;
  [key: string]: unknown;
};

export async function fetchEdinetFilings(query: FilingQuery): Promise<FilingFetchResult> {
  const apiKey = process.env.EDINET_API_KEY;
  if (!apiKey) {
    return {
      source: "edinet",
      query,
      filings: [],
      rawResponse: null,
      fetchStatus: "error",
      errorMessage:
        "EDINET_API_KEY が設定されていません。.env.local に EDINET_API_KEY=your_key を追加してください。",
    };
  }

  const edinetCode = (query.edinetCode ?? query.arbitraryId ?? "").trim();
  const count = Math.min(query.count ?? 20, 100);

  try {
    // 直近7日分を順に取得し、件数が揃えば打ち切る
    const allDocs: EdinetDoc[] = [];
    let rawResponseSample: unknown = null;

    for (const date of recentDates(30)) {
      const url = `${EDINET_BASE}/documents.json?date=${date}&type=2&Subscription-Key=${encodeURIComponent(apiKey)}`;
      const res = await fetch(url, { next: { revalidate: 3600 } });

      if (!res.ok) {
        return {
          source: "edinet",
          query,
          filings: [],
          rawResponse: null,
          fetchStatus: "error",
          errorMessage: `EDINET API エラー: ${res.status} ${res.statusText} (date: ${date})`,
        };
      }

      const data = await res.json() as { results?: EdinetDoc[]; metadata?: unknown; statusCode?: number; message?: string };

      // EDINET は認証失敗でも HTTP 200 を返し body に statusCode: 401 を入れる
      if (data.statusCode && data.statusCode >= 400) {
        return {
          source: "edinet",
          query,
          filings: [],
          rawResponse: data,
          fetchStatus: "error",
          errorMessage: `EDINET API エラー (statusCode: ${data.statusCode}): ${data.message ?? "認証に失敗しました。EDINET_API_KEY を確認してください。"}`,
        };
      }

      if (!rawResponseSample) rawResponseSample = { date, metadata: data.metadata, sampleResults: (data.results ?? []).slice(0, 3) };

      const results: EdinetDoc[] = data.results ?? [];
      const filtered = edinetCode
        ? results.filter((r) => r.edinetCode === edinetCode)
        : results;

      allDocs.push(...filtered);
      if (allDocs.length >= count) break;
    }

    const filings: NormalizedFiling[] = allDocs.slice(0, count).map((doc) => {
      const docId = String(doc.docID ?? "");
      // EDINET 開示書類閲覧画面の URL
      const documentUrl = docId
        ? `https://disclosure2.edinet-fsa.go.jp/WZEK0040.aspx?S1${docId.slice(1)}`
        : null;

      return {
        source: "edinet" as const,
        companyName: String(doc.filerName ?? doc.issuerNameJP ?? ""),
        ticker: query.ticker ?? "",
        documentType: String(doc.docTypeCode ?? ""),
        title: String(doc.docDescription ?? ""),
        filedAt: String(doc.submitDateTime ?? ""),
        periodEnd: doc.periodEnd ? String(doc.periodEnd) : null,
        documentUrl,
        sourceDocumentId: docId,
        contentType: "application/xbrl+xml",
        language: "ja" as const,
        rawPayload: doc,
        fetchStatus: "ok" as const,
      };
    });

    return {
      source: "edinet",
      query,
      filings,
      rawResponse: rawResponseSample,
      fetchStatus: "ok",
    };
  } catch (err) {
    return {
      source: "edinet",
      query,
      filings: [],
      rawResponse: null,
      fetchStatus: "error",
      errorMessage: err instanceof Error ? err.message : String(err),
    };
  }
}
