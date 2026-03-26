/**
 * 手動実行エンドポイント — EDGAR 取得・保存
 *
 * 使い方:
 *   # 全米国株を実行
 *   curl -X POST https://your-domain/api/admin/filings/run \
 *     -H "Content-Type: application/json" \
 *     -d '{"secret":"YOUR_CRON_SECRET"}'
 *
 *   # 特定 ticker だけ実行
 *   curl -X POST https://your-domain/api/admin/filings/run \
 *     -H "Content-Type: application/json" \
 *     -d '{"secret":"YOUR_CRON_SECRET","ticker":"NVDA","count":30}'
 *
 * 保護: body.secret === CRON_SECRET
 * 自動リトライなし。失敗時は Discord 通知。
 */

import { NextRequest, NextResponse } from "next/server";
import { getUsTickers, createFetchJob, finishFetchJob } from "../../../../../lib/filings/repository";
import { saveEdgarFilingsForTicker, saveEdgarFilingsForTickers } from "../../../../../lib/filings/save-edgar";
import { notifyDiscordFailure } from "../../../../../lib/filings/notify";

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  // ── 認証 ─────────────────────────────────────────────────────────────
  let body: { secret?: string; ticker?: string; count?: number } = {};
  try { body = await req.json(); } catch { /* ignore */ }

  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && body.secret !== cronSecret) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const startedAt = new Date().toISOString();
  const count     = body.count ?? 20;
  let jobId: number | null = null;

  try {
    // ── 特定 ticker のみ実行 ──────────────────────────────────────────
    if (body.ticker) {
      const ticker = body.ticker.toUpperCase();
      jobId = await createFetchJob("edgar");

      const result = await saveEdgarFilingsForTicker(ticker, count);

      const status = result.error ? "failed" : "success";
      if (jobId != null) {
        await finishFetchJob(
          jobId, status,
          { target: 1, success: result.error ? 0 : 1, failure: result.error ? 1 : 0 },
          result.error
        );
      }

      if (result.error) {
        await notifyDiscordFailure({
          source: "edgar", startedAt, ticker, errorMessage: result.error,
          jobId: jobId ?? undefined, targetCount: 1, successCount: 0, failureCount: 1,
        });
      }

      return NextResponse.json({ ok: !result.error, startedAt, jobId, result });
    }

    // ── 全米国株を実行 ────────────────────────────────────────────────
    const tickers = await getUsTickers();
    if (tickers.length === 0) {
      return NextResponse.json({ ok: true, message: "対象銘柄がありません" });
    }

    jobId = await createFetchJob("edgar");
    const results = await saveEdgarFilingsForTickers(tickers, count);

    const successCount = results.filter((r) => !r.error).length;
    const failureCount = results.filter((r) => !!r.error).length;
    const failedItems  = results.filter((r) => !!r.error);
    const errorSummary = failedItems.map((r) => `${r.ticker}: ${r.error}`).join(" | ");

    const overallStatus = failureCount === 0 ? "success" : "failed";
    if (jobId != null) {
      await finishFetchJob(
        jobId, overallStatus,
        { target: tickers.length, success: successCount, failure: failureCount },
        errorSummary || undefined
      );
    }

    if (failureCount > 0) {
      await notifyDiscordFailure({
        source: "edgar", startedAt,
        ticker: failedItems.map((r) => r.ticker).join(", "),
        errorMessage: errorSummary,
        jobId: jobId ?? undefined,
        targetCount: tickers.length, successCount, failureCount,
      });
    }

    return NextResponse.json({
      ok: true, startedAt, jobId,
      targetCount: tickers.length, successCount, failureCount,
      totalSaved:   results.reduce((s, r) => s + r.saved, 0),
      totalSkipped: results.reduce((s, r) => s + r.skipped, 0),
      results,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    if (jobId != null) {
      await finishFetchJob(jobId, "failed", { target: 0, success: 0, failure: 1 }, msg);
    }
    await notifyDiscordFailure({ source: "edgar", startedAt, errorMessage: msg, jobId: jobId ?? undefined });
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
