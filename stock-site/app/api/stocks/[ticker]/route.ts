import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { calcScoreBreakdown, calcTotalScore } from "../../../../lib/score";
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
  dependency_level: number | string | null;
  dependency_level_int: number | null;
  dependency_label: string | null;
  is_active: boolean;
};

type MetricRow = {
  ticker: string;
  fiscal_period: string | null;
  tier: string | null;
  ai_rev_low: number | null;
  ai_rev_high: number | null;
  ai_rev_mid: number | null;
  ai_growth_yoy: number | null;
  company_growth_yoy: number | null;
  updated_month: string | null;
};

function toNullableNumber(value: unknown): number | null {
  if (value == null) return null;
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  if (typeof value === "string") {
    const n = Number(value);
    return Number.isFinite(n) ? n : null;
  }
  return null;
}

function resolveDependencyLevel(stock: StockRow): number | null {
  const preferred = toNullableNumber(stock.dependency_level_int);
  if (preferred != null) return preferred;
  return toNullableNumber(stock.dependency_level);
}

function buildScoreReasonLabels(args: {
  aiPart: number;
  growthPart: number;
  dependencyPart: number;
  tierPart: number;
}): string[] {
  const labels: string[] = [];
  if (args.aiPart >= 20) labels.push("AI売上規模が大きい");
  if (args.growthPart >= 20) labels.push("AIの伸びが強い");
  if (args.dependencyPart >= 10) labels.push("AIとの結びつきが強い");
  if (args.tierPart > 0) labels.push("データ確度が高い");
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
      {
        ok: false,
        error:
          "Missing SUPABASE_URL/SUPABASE_ANON_KEY (or NEXT_PUBLIC_SUPABASE_URL/NEXT_PUBLIC_SUPABASE_ANON_KEY)",
      },
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
        "ticker,name,country,market,ai_category,ir_url,company_description,ai_summary,company_url,dependency_level,dependency_level_int,dependency_label,is_active",
      )
      .eq("is_active", true)
      .eq("ticker", normalizedTicker)
      .maybeSingle<StockRow>(),
    supabase
      .from("ai_metrics")
      .select(
        "ticker,fiscal_period,tier,ai_rev_low,ai_rev_high,ai_rev_mid,ai_growth_yoy,company_growth_yoy,updated_month",
      )
      .eq("ticker", normalizedTicker)
      .order("updated_month", { ascending: false })
      .order("fiscal_period", { ascending: false })
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

  const dependencyLevel = resolveDependencyLevel(stock);
  const aiRevMid =
    metric?.ai_rev_mid ??
    (metric?.ai_rev_low != null && metric?.ai_rev_high != null
      ? (Number(metric.ai_rev_low) + Number(metric.ai_rev_high)) / 2
      : null);

  const growthDiff =
    metric?.ai_growth_yoy != null && metric?.company_growth_yoy != null
      ? Number(metric.ai_growth_yoy) - Number(metric.company_growth_yoy)
      : null;

  const canScore = aiRevMid != null && growthDiff != null && dependencyLevel != null;
  const score = canScore
    ? Math.round(calcTotalScore(aiRevMid, growthDiff, dependencyLevel, metric?.tier))
    : null;
  const scoreParts = canScore
    ? calcScoreBreakdown(aiRevMid, growthDiff, dependencyLevel, metric?.tier).parts
    : null;

  return NextResponse.json({
    ok: true,
    item: {
      ticker: stock.ticker,
      name: stock.name,
      country: stock.country,
      market: stock.market,
      aiCategory: stock.ai_category,
      categoryJa: toCategoryJa(stock.ai_category),
      irUrl: stock.ir_url,
      companyDescription: stock.company_description,
      aiSummary: stock.ai_summary,
      companyUrl: stock.company_url,
      tier: metric?.tier ?? null,
      aiRevMid,
      growthDiff,
      dependencyLevel,
      dependencyLabel: stock.dependency_label,
      score,
      scoreParts,
      scoreReasonLabels: scoreParts
        ? buildScoreReasonLabels({
            aiPart: scoreParts.ai,
            growthPart: scoreParts.growth,
            dependencyPart: scoreParts.dependency,
            tierPart: scoreParts.tier,
          })
        : [],
      updatedMonth: metric?.updated_month ?? null,
    },
  });
}
