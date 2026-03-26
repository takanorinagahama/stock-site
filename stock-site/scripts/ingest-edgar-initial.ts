#!/usr/bin/env tsx
/**
 * EDGAR 初回データ投入スクリプト
 *
 * 使い方:
 *   pnpm exec tsx scripts/ingest-edgar-initial.ts
 *   pnpm exec tsx scripts/ingest-edgar-initial.ts NVDA AVGO MSFT
 *
 * 前提:
 *   - .env.local に SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY が設定済み
 *   - Supabase に filings テーブルが作成済み（supabase/migrations/20260324_filings.sql を実行済み）
 *
 * 注意:
 *   - SEC EDGAR の User-Agent ガイドラインに従い、リクエスト間に 300ms の待機を入れています
 */

import { config } from "dotenv";
import { resolve } from "path";

// .env.local をロード
config({ path: resolve(process.cwd(), ".env.local") });

import { saveEdgarFilingsForTicker } from "../lib/filings/save-edgar";
import { createFetchJob, finishFetchJob, getUsTickers } from "../lib/filings/repository";

async function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  const args = process.argv.slice(2).map((t) => t.toUpperCase());

  // 引数で指定があればその銘柄、なければ米国株全体
  let tickers: string[];
  if (args.length > 0) {
    tickers = args;
    console.log(`🎯 指定 ticker: ${tickers.join(", ")}`);
  } else {
    console.log("📋 Supabase から米国株一覧を取得中...");
    tickers = await getUsTickers();
    console.log(`🎯 対象: ${tickers.length} 銘柄 — ${tickers.join(", ")}`);
  }

  if (tickers.length === 0) {
    console.error("❌ 対象銘柄が見つかりません");
    process.exit(1);
  }

  const jobId = await createFetchJob("edgar");
  console.log(`📂 ジョブ開始 (ID: ${jobId})\n`);

  let successCount = 0;
  let failureCount = 0;

  for (const ticker of tickers) {
    process.stdout.write(`  ${ticker.padEnd(8)} → `);
    const result = await saveEdgarFilingsForTicker(ticker, 50);

    if (result.error) {
      console.log(`❌ エラー: ${result.error}`);
      failureCount++;
    } else {
      console.log(`✅ 保存: ${result.saved} 件 / スキップ: ${result.skipped} 件`);
      successCount++;
    }

    await sleep(300); // SEC API のレート制限対策
  }

  const status = failureCount === 0 ? "success" : "failed";
  if (jobId) {
    await finishFetchJob(jobId, status, {
      target:  tickers.length,
      success: successCount,
      failure: failureCount,
    });
  }

  console.log(`\n📊 完了: ${successCount} 成功 / ${failureCount} 失敗 (job: ${jobId})`);
  if (failureCount > 0) process.exit(1);
}

main().catch((e) => {
  console.error("Fatal:", e);
  process.exit(1);
});
