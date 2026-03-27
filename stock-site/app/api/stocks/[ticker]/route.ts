import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { toCategoryJa } from "../../../../lib/categories";

export const revalidate = 300;

type StockRow = {
  ticker: string;
  name: string;
  country: string | null;
  market: string | null;
  ai_category: string | null;
  ir_url: string | null;
  company_description: string | null;
  ai_summary: string | null;
  company_url: string | null;
  dependency_level_int: number | null;
  dependency_label: string | null;
  is_active: boolean;
};

type MetricRow = {
  ticker: string;
  tier: string | null;
  ai_rev_mid: number | null;
  ai_revenue_score: number | null;
  ai_growth_score: number | null;
  ai_dependency_score: number | null;
  confidence_score: number | null;
  ai_expectation_score: number | null;
  updated_month: string | null;
};

function buildScoreReasonLabels(
  aiRevenueScore: number,
  aiGrowthScore: number,
  aiDependencyScore: number,
  confidenceScore: number,
): string[] {
  const labels: string[] = [];
  if (aiRevenueScore >= 50) labels.push("AI売上規模が大きい");
  if (aiGrowthScore >= 50) labels.push("AIの伸びが強い");
  if (aiDependencyScore >= 50) labels.push("AIとの結びつきが強い");
  if (confidenceScore >= 70) labels.push("データ確度が高い");
  return labels;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ ticker: string }> },
) {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return NextResponse.json(
      { ok: false, error: "Missing SUPABASE_URL / SUPABASE_ANON_KEY" },
      { status: 500 },
    );
  }

  const { ticker } = await params;
  const normalizedTicker = ticker.toUpperCase();
  const supabase = createClient(url, key);

  const [stockResponse, metricResponse] = await Promise.all([
    supabase
      .from("stocks")
      .select(
        "ticker,name,country,market,ai_category,ir_url,company_description,ai_summary,company_url,dependency_level_int,dependency_label,is_active",
      )
      // is_active フィルタなし: 過去記事リンクで 404 にならないよう非アクティブ銘柄も返す
      .eq("ticker", normalizedTicker)
      .maybeSingle<StockRow>(),
    supabase
      .from("ai_metrics")
      .select(
        "ticker,tier,ai_rev_mid,ai_revenue_score,ai_growth_score,ai_dependency_score,confidence_score,ai_expectation_score,updated_month",
      )
      .eq("ticker", normalizedTicker)
      .order("updated_month", { ascending: false })
      .limit(1)
      .maybeSingle<MetricRow>(),
  ]);

  if (stockResponse.error) {
    return NextResponse.json({ ok: false, error: stockResponse.error.message }, { status: 500 });
  }
  if (metricResponse.error) {
    return NextResponse.json({ ok: false, error: metricResponse.error.message }, { status: 500 });
  }

  const stock = stockResponse.data;
  const metric = metricResponse.data;

  if (!stock) {
    return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  }

  const score = metric?.ai_expectation_score ?? null;
  const scoreParts =
    metric?.ai_revenue_score != null
      ? {
          ai: metric.ai_revenue_score,
          growth: metric.ai_growth_score ?? 0,
          dependency: metric.ai_dependency_score ?? 0,
          tier: metric.confidence_score ?? 0,
        }
      : null;

  return NextResponse.json({
    ok: true,
    item: {
      ticker: stock.ticker,
      name: stock.name,
      country: stock.country,
      market: stock.market,
      isActive: stock.is_active,
      aiCategory: stock.ai_category,
      categoryJa: toCategoryJa(stock.ai_category),
      irUrl: stock.ir_url,
      companyDescription: stock.company_description,
      aiSummary: stock.ai_summary,
      companyUrl: stock.company_url,
      tier: metric?.tier ?? null,
      aiRevMid: metric?.ai_rev_mid ?? null,
      growthDiff: metric?.ai_growth_score ?? null,
      dependencyLevel: stock.dependency_level_int,
      dependencyLabel: stock.dependency_label,
      score,
      scoreParts,
      scoreReasonLabels: scoreParts
        ? buildScoreReasonLabels(
            scoreParts.ai,
            scoreParts.growth,
            scoreParts.dependency,
            scoreParts.tier,
          )
        : [],
      updatedMonth: metric?.updated_month ?? null,
    },
  });
}
