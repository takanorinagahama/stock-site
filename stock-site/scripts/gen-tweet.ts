import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { createClient } from "@supabase/supabase-js";
import { execSync } from "child_process";

type MetricRow = {
  ticker: string;
  ai_expectation_score: number | null;
  updated_month: string | null;
};

type StockRow = {
  ticker: string;
  name: string;
};

function mustEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

function formatMonth(ym: string): string {
  const [year, mon] = ym.split("-");
  return `${year}年${parseInt(mon)}月`;
}

async function main() {
  const supabase = createClient(
    mustEnv("SUPABASE_URL"),
    mustEnv("SUPABASE_SERVICE_ROLE_KEY"),
  );

  const [{ data: allMetrics, error: mErr }, { data: stocks, error: sErr }] =
    await Promise.all([
      supabase
        .from("ai_metrics")
        .select("ticker,ai_expectation_score,updated_month")
        .not("ai_expectation_score", "is", null),
      supabase
        .from("stocks")
        .select("ticker,name")
        .eq("is_active", true),
    ]);

  if (mErr) throw mErr;
  if (sErr) throw sErr;

  const metrics = (allMetrics ?? []) as MetricRow[];
  const stockMap = new Map(
    ((stocks ?? []) as StockRow[]).map((s) => [s.ticker, s.name]),
  );

  // Group by ticker, sorted by month desc
  const byTicker = new Map<string, MetricRow[]>();
  for (const m of metrics) {
    const rows = byTicker.get(m.ticker) ?? [];
    rows.push(m);
    byTicker.set(m.ticker, rows);
  }
  for (const rows of byTicker.values()) {
    rows.sort((a, b) =>
      (b.updated_month ?? "").localeCompare(a.updated_month ?? ""),
    );
  }

  // Determine latest month
  const latestMonth = [...byTicker.values()]
    .map((rows) => rows[0]?.updated_month ?? "")
    .filter(Boolean)
    .sort()
    .reverse()[0];

  if (!latestMonth) {
    console.error("データが見つかりませんでした");
    process.exit(1);
  }

  // Build ranked list for latest month
  const ranked = [...byTicker.entries()]
    .filter(([, rows]) => rows[0]?.updated_month === latestMonth)
    .map(([ticker, rows]) => ({
      ticker,
      name: stockMap.get(ticker) ?? ticker,
      score: rows[0].ai_expectation_score!,
      prevScore: rows[1]?.updated_month
        ? rows[1].ai_expectation_score
        : null,
    }))
    .sort((a, b) => b.score - a.score);

  const top5 = ranked.slice(0, 5);
  const total = ranked.length;

  // Format tweet lines
  const lines: string[] = [];
  lines.push(`【${formatMonth(latestMonth)}版 AIスコア更新✅】`);
  lines.push("");
  lines.push("📊 AI銘柄 TOP5");

  for (let i = 0; i < top5.length; i++) {
    const s = top5[i];
    const diff =
      s.prevScore != null ? Math.round(s.score - s.prevScore) : null;
    const arrow =
      diff == null
        ? ""
        : diff > 0
        ? ` ↑+${diff}`
        : diff < 0
        ? ` ↓${diff}`
        : " →";
    lines.push(`${i + 1}. $${s.ticker}  ${Math.round(s.score)}点${arrow}`);
  }

  lines.push("");
  lines.push(`全${total}銘柄のスコアはこちら👇`);
  lines.push("https://ai-stock-data.com/stocks");
  lines.push("");
  lines.push("#AI株 #AI投資 #米国株 #個別株");

  const tweet = lines.join("\n");
  const charCount = [...tweet].length;

  console.log("\n─────────────────────────────────────");
  console.log(" Xに投稿する下書き（クリップボードにコピー済み）");
  console.log("─────────────────────────────────────\n");
  console.log(tweet);
  console.log(`\n─────────────────────────────────────`);
  console.log(` 文字数: ${charCount} / 280`);
  console.log("─────────────────────────────────────\n");

  try {
    execSync(`printf '%s' ${JSON.stringify(tweet)} | pbcopy`);
    console.log("✅ クリップボードにコピーしました。Xを開いて貼り付けてください。");
  } catch {
    console.log("（クリップボードへのコピーはスキップ）");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
