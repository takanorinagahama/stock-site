/**
 * SEC EDGAR 公開API からの書類取得ロジック
 *
 * 主要エンドポイント:
 *   - https://www.sec.gov/files/company_tickers.json  … ticker → CIK マッピング
 *   - https://data.sec.gov/submissions/CIK{cik10}.json … 提出書類一覧
 *
 * User-Agent は SEC の利用規約に従い送信する。
 * ref: https://www.sec.gov/os/accessing-edgar-data
 */

import type { FilingFetchResult, FilingQuery, NormalizedFiling } from "./types";

const EDGAR_SUBMISSIONS = "https://data.sec.gov/submissions";
const SEC_TICKERS_URL = "https://www.sec.gov/files/company_tickers.json";
const USER_AGENT = "ai-stock-data.com info@ai-stock-data.com";

/** ticker → CIK (10桁ゼロ埋め) */
async function lookupCik(ticker: string): Promise<string | null> {
  const res = await fetch(SEC_TICKERS_URL, {
    headers: { "User-Agent": USER_AGENT },
    next: { revalidate: 86400 }, // 24h cache
  });
  if (!res.ok) return null;

  const data = await res.json() as Record<string, { cik_str: number; ticker: string; title: string }>;
  const upper = ticker.toUpperCase();
  for (const entry of Object.values(data)) {
    if (entry.ticker.toUpperCase() === upper) {
      return String(entry.cik_str).padStart(10, "0");
    }
  }
  return null;
}

export async function fetchEdgarFilings(query: FilingQuery): Promise<FilingFetchResult> {
  const ticker = (query.ticker ?? query.arbitraryId ?? "").trim();
  if (!ticker) {
    return {
      source: "edgar",
      query,
      filings: [],
      rawResponse: null,
      fetchStatus: "error",
      errorMessage: "ticker を指定してください",
    };
  }

  try {
    // 1. CIK 解決
    const cik = await lookupCik(ticker);
    if (!cik) {
      return {
        source: "edgar",
        query,
        filings: [],
        rawResponse: null,
        fetchStatus: "error",
        errorMessage: `CIK が見つかりません (ticker: ${ticker})`,
      };
    }

    // 2. 提出書類一覧取得
    const url = `${EDGAR_SUBMISSIONS}/CIK${cik}.json`;
    const res = await fetch(url, {
      headers: { "User-Agent": USER_AGENT },
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      return {
        source: "edgar",
        query,
        filings: [],
        rawResponse: null,
        fetchStatus: "error",
        errorMessage: `EDGAR API エラー: ${res.status} ${res.statusText}`,
      };
    }

    const data = await res.json() as {
      name?: string;
      sic?: string;
      sicDescription?: string;
      entityType?: string;
      filings?: {
        recent?: {
          form?: string[];
          accessionNumber?: string[];
          filingDate?: string[];
          reportDate?: string[];
          primaryDocument?: string[];
          primaryDocDescription?: string[];
        };
      };
    };

    const companyName = data.name ?? ticker;
    const recent = data.filings?.recent;

    if (!recent) {
      return {
        source: "edgar",
        query,
        filings: [],
        rawResponse: data,
        fetchStatus: "partial",
        errorMessage: "recent filings が見つかりません",
      };
    }

    const count = Math.min(query.count ?? 20, 200);
    const forms = recent.form ?? [];
    const accessions = recent.accessionNumber ?? [];
    const filingDates = recent.filingDate ?? [];
    const reportDates = recent.reportDate ?? [];
    const primaryDocs = recent.primaryDocument ?? [];
    const descriptions = recent.primaryDocDescription ?? [];

    const cikInt = parseInt(cik, 10);

    const filings: NormalizedFiling[] = Array.from({ length: Math.min(forms.length, count) }, (_, i) => {
      const accRaw = accessions[i] ?? "";
      const accNoDash = accRaw.replace(/-/g, "");
      const docUrl = accNoDash && primaryDocs[i]
        ? `https://www.sec.gov/Archives/edgar/data/${cikInt}/${accNoDash}/${primaryDocs[i]}`
        : null;

      return {
        source: "edgar" as const,
        companyName,
        ticker: ticker.toUpperCase(),
        documentType: forms[i] ?? "",
        title: descriptions[i] || forms[i] || "",
        filedAt: filingDates[i] ?? "",
        periodEnd: reportDates[i] || null,
        documentUrl: docUrl,
        sourceDocumentId: accRaw,
        contentType: "text/html",
        language: "en" as const,
        rawPayload: {
          form: forms[i],
          accessionNumber: accRaw,
          filingDate: filingDates[i],
          reportDate: reportDates[i],
          primaryDocument: primaryDocs[i],
          primaryDocDescription: descriptions[i],
        },
        fetchStatus: "ok" as const,
      };
    });

    return {
      source: "edgar",
      query,
      filings,
      rawResponse: {
        cik,
        companyName,
        sic: data.sic,
        sicDescription: data.sicDescription,
        entityType: data.entityType,
        totalFilings: forms.length,
        recentSnapshot: {
          form: forms.slice(0, count),
          accessionNumber: accessions.slice(0, count),
          filingDate: filingDates.slice(0, count),
          reportDate: reportDates.slice(0, count),
          primaryDocument: primaryDocs.slice(0, count),
        },
      },
      fetchStatus: "ok",
    };
  } catch (err) {
    return {
      source: "edgar",
      query,
      filings: [],
      rawResponse: null,
      fetchStatus: "error",
      errorMessage: err instanceof Error ? err.message : String(err),
    };
  }
}
