/**
 * ChatGPT が生成した stock_metrics.json から
 * Supabase に貼り付けるための SQL を生成するスクリプト。
 *
 * 使い方:
 *   pnpm exec tsx scripts/generate_import_sql.ts /path/to/stock_metrics.json
 *
 * 出力: scripts/out/import-YYYY-MM.sql
 */
import fs from "node:fs/promises";
import path from "node:path";

interface JsonCompany {
  ticker: string;
  company_name: string;
  country: string;
  category_sub: string;
  ai_summary_short: string;
  ai_summary_long: string;
  ai_revenue_score: number;
  ai_growth_score: number;
  ai_dependency_score: number;
  confidence_score: number;
  ai_expectation_score: number;
  ai_revenue_estimated_musd: number;
}

interface JsonInput {
  as_of: string;
  companies: JsonCompany[];
}

function toDependencyInt(score: number): number {
  if (score >= 80) return 3;
  if (score >= 50) return 2;
  if (score >= 20) return 1;
  return 0;
}

function toDependencyLabel(level: number): string {
  if (level >= 3) return "高い";
  if (level >= 2) return "中程度";
  return "低い";
}

function toTier(confidenceScore: number): string {
  if (confidenceScore >= 90) return "A";
  if (confidenceScore >= 70) return "B";
  return "C";
}

function escSql(s: string): string {
  return s.replace(/'/g, "''");
}

async function main() {
  const jsonPath = process.argv[2];
  if (!jsonPath) {
    console.error("使い方: pnpm exec tsx scripts/generate_import_sql.ts <stock_metrics.json のパス>");
    process.exit(1);
  }

  const resolvedPath = path.resolve(jsonPath);
  console.log(`📂 Reading: ${resolvedPath}`);
  const raw = await fs.readFile(resolvedPath, "utf8");
  const input: JsonInput = JSON.parse(raw);

  const baseMonth = input.as_of.slice(0, 7); // "YYYY-MM"
  console.log(`   as_of: ${input.as_of}  →  baseMonth: ${baseMonth}`);
  console.log(`   companies: ${input.companies.length}`);

  // スコア検証
  const overMax = input.companies.filter((c) => c.ai_expectation_score > 100);
  if (overMax.length > 0) {
    console.warn(`⚠  ai_expectation_score > 100 が ${overMax.length} 件:`, overMax.map((c) => c.ticker));
  }

  const tickers = input.companies.map((c) => `'${escSql(c.ticker)}'`).join(", ");

  // ── stocks UPSERT ────────────────────────────────────────────────────────
  const stockRows = input.companies
    .map((c) => {
      const dep = toDependencyInt(c.ai_dependency_score);
      return `  ('${escSql(c.ticker)}', '${escSql(c.company_name)}', '${escSql(c.country)}', ` +
        `'${escSql(c.category_sub)}', '${escSql(c.ai_summary_short)}', '${escSql(c.ai_summary_long)}', ` +
        `${dep}, ${dep}, '${toDependencyLabel(dep)}', true)`;
    })
    .join(",\n");

  // ── ai_metrics UPSERT ────────────────────────────────────────────────────
  const metricRows = input.companies
    .map((c) => {
      const tier = toTier(c.confidence_score);
      const musd = Math.round(c.ai_revenue_estimated_musd);
      return `  ('${escSql(c.ticker)}', '${baseMonth}', '${baseMonth}', '${tier}', ` +
        `${musd}, ${musd}, ${musd}, ` +
        `${c.ai_revenue_score}, ${c.ai_growth_score}, ${c.ai_dependency_score}, ` +
        `${c.confidence_score}, ${c.ai_expectation_score})`;
    })
    .join(",\n");

  const sql = `-- ============================================================
-- AI銘柄データ投入 SQL
-- baseMonth: ${baseMonth}  (as_of: ${input.as_of})
-- companies: ${input.companies.length}
-- 生成日時: ${new Date().toISOString()}
-- ============================================================

BEGIN;

-- ────────────────────────────────────────────────────────────
-- 1. stocks UPSERT (${input.companies.length}社 → is_active = true)
-- ────────────────────────────────────────────────────────────
INSERT INTO public.stocks
  (ticker, name, country, ai_category, company_description, ai_summary,
   dependency_level, dependency_level_int, dependency_label, is_active)
VALUES
${stockRows}
ON CONFLICT (ticker) DO UPDATE SET
  name                = EXCLUDED.name,
  country             = EXCLUDED.country,
  ai_category         = EXCLUDED.ai_category,
  company_description = EXCLUDED.company_description,
  ai_summary          = EXCLUDED.ai_summary,
  dependency_level    = EXCLUDED.dependency_level,
  dependency_level_int = EXCLUDED.dependency_level_int,
  dependency_label    = EXCLUDED.dependency_label,
  is_active           = true;

-- ────────────────────────────────────────────────────────────
-- 2. 今回リストにない旧銘柄を is_active = false に
--    (過去記事リンクのために行は残す)
-- ────────────────────────────────────────────────────────────
UPDATE public.stocks
SET is_active = false
WHERE ticker NOT IN (${tickers});

-- ────────────────────────────────────────────────────────────
-- 3. ai_metrics UPSERT (新スコア列)
-- ────────────────────────────────────────────────────────────
INSERT INTO public.ai_metrics
  (ticker, updated_month, fiscal_period, tier,
   ai_rev_low, ai_rev_high, ai_rev_mid,
   ai_revenue_score, ai_growth_score, ai_dependency_score,
   confidence_score, ai_expectation_score)
VALUES
${metricRows}
ON CONFLICT (ticker, updated_month) DO UPDATE SET
  fiscal_period        = EXCLUDED.fiscal_period,
  tier                 = EXCLUDED.tier,
  ai_rev_low           = EXCLUDED.ai_rev_low,
  ai_rev_high          = EXCLUDED.ai_rev_high,
  ai_rev_mid           = EXCLUDED.ai_rev_mid,
  ai_revenue_score     = EXCLUDED.ai_revenue_score,
  ai_growth_score      = EXCLUDED.ai_growth_score,
  ai_dependency_score  = EXCLUDED.ai_dependency_score,
  confidence_score     = EXCLUDED.confidence_score,
  ai_expectation_score = EXCLUDED.ai_expectation_score;

-- ────────────────────────────────────────────────────────────
-- 確認: 件数チェック
-- ────────────────────────────────────────────────────────────
SELECT
  (SELECT COUNT(*) FROM public.stocks WHERE is_active = true)  AS active_stocks,
  (SELECT COUNT(*) FROM public.stocks WHERE is_active = false) AS inactive_stocks,
  (SELECT COUNT(*) FROM public.ai_metrics WHERE updated_month = '${baseMonth}') AS metrics_this_month;

COMMIT;
`;

  const outDir = path.resolve(process.cwd(), "scripts/out");
  await fs.mkdir(outDir, { recursive: true });
  const outPath = path.join(outDir, `import-${baseMonth}.sql`);
  await fs.writeFile(outPath, sql, "utf8");

  console.log(`\n✅ SQL生成完了: ${outPath}`);
  console.log(`\n次のステップ:`);
  console.log(`  1. ${outPath} を開く`);
  console.log(`  2. 全選択してSupabase SQL Editorに貼り付け`);
  console.log(`  3. Run → active_stocks=${input.companies.length} を確認`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
