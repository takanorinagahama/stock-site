/**
 * Supabase CRUD for filings + filing_fetch_jobs
 *
 * ─ 読み取り系: SUPABASE_ANON_KEY（公開ページから利用）
 * ─ 書き込み系: SUPABASE_SERVICE_ROLE_KEY（バッチ・管理APIから利用）
 *
 * RLS 設定メモ:
 *   filings            → SELECT は public に許可 / INSERT・UPSERT は service role のみ
 *   filing_fetch_jobs  → service role のみ
 */

import { createClient, SupabaseClient } from "@supabase/supabase-js";
import type { NormalizedFiling, FilingSource } from "./types";

// ── クライアント生成 ──────────────────────────────────────────────────────

function anonClient(): SupabaseClient {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("SUPABASE_URL / SUPABASE_ANON_KEY が未設定です");
  return createClient(url, key);
}

function serviceClient(): SupabaseClient {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY が未設定です");
  return createClient(url, key);
}

// ── 型定義 ────────────────────────────────────────────────────────────────

export interface FilingRow {
  id: number;
  source: FilingSource;
  ticker: string;
  company_name: string | null;
  document_type: string | null;
  title: string | null;
  filed_at: string | null;        // YYYY-MM-DD
  period_end: string | null;      // YYYY-MM-DD
  document_url: string | null;
  source_document_id: string;
  fetched_at: string;
  created_at: string;
}

export interface FetchJobRow {
  id: number;
  source: FilingSource;
  run_started_at: string;
  run_finished_at: string | null;
  status: "running" | "success" | "failed";
  target_count: number;
  success_count: number;
  failure_count: number;
  error_message: string | null;
  created_at: string;
}

// ── 保存 ─────────────────────────────────────────────────────────────────

export interface UpsertResult {
  saved: number;
  skipped: number;
  errors: string[];
}

/**
 * NormalizedFiling[] を filings テーブルへ upsert する。
 * (source, source_document_id) でユニーク制約があるため、重複は無視される。
 */
export async function upsertFilings(filings: NormalizedFiling[]): Promise<UpsertResult> {
  if (filings.length === 0) return { saved: 0, skipped: 0, errors: [] };

  const sb = serviceClient();
  const rows = filings.map((f) => ({
    source:              f.source,
    ticker:              f.ticker,
    company_name:        f.companyName || null,
    document_type:       f.documentType || null,
    title:               f.title || null,
    filed_at:            f.filedAt || null,
    period_end:          f.periodEnd || null,
    document_url:        f.documentUrl || null,
    source_document_id:  f.sourceDocumentId,
    raw_payload:         f.rawPayload ?? null,
    fetched_at:          new Date().toISOString(),
  }));

  // ignoreDuplicates: true → 重複は skip（更新しない）
  const { data, error } = await sb
    .from("filings")
    .upsert(rows, { onConflict: "source,source_document_id", ignoreDuplicates: true })
    .select("id");

  if (error) {
    return { saved: 0, skipped: filings.length, errors: [error.message] };
  }

  const saved   = (data ?? []).length;
  const skipped = filings.length - saved;
  return { saved, skipped, errors: [] };
}

// ── 取得 ─────────────────────────────────────────────────────────────────

/**
 * ticker の最新 filed_at を返す（差分保存の基準日として使用）
 * テーブル未作成 / データなし の場合は null を返す
 */
export async function getLatestFilingDate(ticker: string): Promise<string | null> {
  const sb = serviceClient();
  const { data, error } = await sb
    .from("filings")
    .select("filed_at")
    .eq("ticker", ticker.toUpperCase())
    .eq("source", "edgar")
    .order("filed_at", { ascending: false, nullsFirst: false })
    .limit(1)
    .maybeSingle();

  if (error || !data) return null;
  return (data as { filed_at: string | null }).filed_at ?? null;
}

/** ticker 別に保存済み filings を取得（公開ページ用）*/
export async function getFilingsByTicker(
  ticker: string,
  source?: FilingSource,
  limit = 50
): Promise<FilingRow[]> {
  const sb = anonClient();
  let query = sb
    .from("filings")
    .select("id,source,ticker,company_name,document_type,title,filed_at,period_end,document_url,source_document_id,fetched_at,created_at")
    .eq("ticker", ticker.toUpperCase())
    .order("filed_at", { ascending: false, nullsFirst: false })
    .limit(limit);

  if (source) {
    query = query.eq("source", source);
  }

  const { data, error } = await query;
  if (error) {
    // テーブル未作成時は console.error を出さず静かに空配列を返す
    const isTableMissing = error.message?.includes("schema cache") || error.message?.includes("does not exist");
    if (!isTableMissing) {
      console.error("[getFilingsByTicker] Supabase error:", error.message);
    }
    return [];
  }
  return (data ?? []) as FilingRow[];
}

// ── ジョブ管理 ──────────────────────────────────────────────────────────

/** バッチ開始時にジョブレコードを作成し ID を返す */
export async function createFetchJob(source: FilingSource): Promise<number | null> {
  const sb = serviceClient();
  const { data, error } = await sb
    .from("filing_fetch_jobs")
    .insert({ source, run_started_at: new Date().toISOString(), status: "running" })
    .select("id")
    .single();

  if (error) {
    console.error("[createFetchJob] error:", error.message);
    return null;
  }
  return data.id as number;
}

/** バッチ完了時にジョブレコードを更新する */
export async function finishFetchJob(
  jobId: number,
  status: "success" | "failed",
  counts: { target: number; success: number; failure: number },
  errorMessage?: string
): Promise<void> {
  const sb = serviceClient();
  await sb
    .from("filing_fetch_jobs")
    .update({
      status,
      run_finished_at: new Date().toISOString(),
      target_count:   counts.target,
      success_count:  counts.success,
      failure_count:  counts.failure,
      error_message:  errorMessage ?? null,
    })
    .eq("id", jobId);
}

// ── 管理銘柄一覧（米国株） ───────────────────────────────────────────────

/** Supabase の stocks テーブルから米国株の ticker 一覧を取得する */
export async function getUsTickers(): Promise<string[]> {
  const sb = serviceClient();
  const { data, error } = await sb
    .from("stocks")
    .select("ticker")
    .eq("is_active", true)
    .eq("country", "US");

  if (error) {
    console.error("[getUsTickers] error:", error.message);
    return [];
  }
  return (data ?? []).map((r: { ticker: string }) => r.ticker);
}
