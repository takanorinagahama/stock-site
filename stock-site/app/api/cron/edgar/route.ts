/**
 * Vercel Cron エンドポイント — EDGAR 日次バッチ
 *
 * スケジュール: vercel.json に記載（JST 19:00 = UTC 10:00）
 *
 * 保護: Authorization: Bearer ${CRON_SECRET}
 *   - Vercel は cron 実行時にこのヘッダーを自動付与する
 *   - 手動 curl でも同じヘッダーを付ければ実行可能
 *
 * 動作:
 *   1. stocks テーブルから米国株 ticker 一覧を取得
 *   2. 各 ticker について EDGAR を取得 → Supabase に保存
 *   3. 失敗があれば Discord 通知
 *   4. 自動リトライなし（失敗はログ + 通知で終了）
 */

import { NextRequest, NextResponse } from "next/server";
import { getUsTickers, createFetchJob, finishFetchJob } from "../../../../lib/filings/repository";
import { saveEdgarFilingsForTickers }                   from "../../../../lib/filings/save-edgar";
import { notifyDiscordFailure, notifyDiscordSuccess }    from "../../../../lib/filings/notify";

// Vercel Cron はレスポンスを最大 60s 待つ
export const maxDuration = 60;

export async function GET(req: NextRequest) {
  // ── 認証 ─────────────────────────────────────────────────────────────
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const auth = req.headers.get("authorization");
    if (auth !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }
  }

  const startedAt = new Date().toISOString();
  let jobId: number | null = null;

  try {
    // ── 対象銘柄取得 ──────────────────────────────────────────────────
    const tickers = await getUsTickers();
    if (tickers.length === 0) {
      return NextResponse.json({ ok: true, message: "対象銘柄がありません", tickers: [] });
    }

    // ── ジョブ開始 ─────────────────────────────────────────────────────
    jobId = await createFetchJob("edgar");

    // ── バッチ実行 ─────────────────────────────────────────────────────
    const results = await saveEdgarFilingsForTickers(tickers, 20);

    const successCount = results.filter((r) => !r.error).length;
    const failureCount = results.filter((r) => !!r.error).length;
    const failedItems  = results.filter((r) => !!r.error);
    const totalSaved   = results.reduce((s, r) => s + r.saved, 0);
    const totalSkipped = results.reduce((s, r) => s + r.skipped, 0);

    // ── ジョブ完了 ─────────────────────────────────────────────────────
    const overallStatus = failureCount === 0 ? "success" : "failed";
    const errorSummary  = failedItems.map((r) => `${r.ticker}: ${r.error}`).join(" | ");

    if (jobId != null) {
      await finishFetchJob(
        jobId,
        overallStatus,
        { target: tickers.length, success: successCount, failure: failureCount },
        errorSummary || undefined
      );
    }

    // ── Discord 通知 ─────────────────────────────────────────────────
    if (failureCount === 0) {
      // 全銘柄成功 → 簡潔な 1行サマリー
      await notifyDiscordSuccess({
        source:       "edgar",
        startedAt,
        targetCount:  tickers.length,
        successCount,
        totalSaved,
        totalSkipped,
        jobId:        jobId ?? undefined,
      });
    } else {
      // 一部失敗 → 詳細通知
      await notifyDiscordFailure({
        source:       "edgar",
        startedAt,
        ticker:       failedItems.map((r) => r.ticker).join(", "),
        errorMessage: errorSummary,
        jobId:        jobId ?? undefined,
        targetCount:  tickers.length,
        successCount,
        failureCount,
      });
    }

    return NextResponse.json({
      ok:           true,
      startedAt,
      jobId,
      targetCount:  tickers.length,
      successCount,
      failureCount,
      totalSaved,
      totalSkipped,
      results,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[cron/edgar] 予期しないエラー:", msg);

    // ジョブレコードを失敗で締める
    if (jobId != null) {
      await finishFetchJob(jobId, "failed", { target: 0, success: 0, failure: 1 }, msg);
    }

    await notifyDiscordFailure({
      source:       "edgar",
      startedAt,
      errorMessage: msg,
      jobId:        jobId ?? undefined,
    });

    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
