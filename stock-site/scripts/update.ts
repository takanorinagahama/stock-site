import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { createClient } from "@supabase/supabase-js";
import OpenAI from "openai";

type StockRow = {
  ticker: string;
  name: string | null;
  country: string | null;
  market: string | null;
  ai_category: string | null;
  dependency_level: number | null;
  is_active: boolean | null;
  ir_url: string | null;
};

function mustEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

async function main() {
  const supabaseUrl = mustEnv("SUPABASE_URL");
  const supabaseKey = mustEnv("SUPABASE_SERVICE_ROLE_KEY");
  const openaiKey = mustEnv("OPENAI_API_KEY");
  const model = process.env.OPENAI_MODEL ?? "gpt-5-mini";

  const supabase = createClient(supabaseUrl, supabaseKey);
  const openai = new OpenAI({ apiKey: openaiKey });

  // 1) 対象銘柄取得
  const { data: stocks, error: sErr } = await supabase
    .from("stocks")
    .select("ticker,name,country,market,ai_category,dependency_level,is_active,ir_url")
    .eq("is_active", true);

  if (sErr) throw sErr;
  const list = (stocks ?? []) as StockRow[];
  console.log(`stocks: ${list.length}`);

  // 2) まずは「ダミー更新」：ai_metrics に “最低限の行” を upsert して動線を作る
  //    ※OpenAIで作る本番処理は次のStepで入れる（まず完成を優先）
  const updated_month = new Date().toISOString().slice(0, 7); // YYYY-MM
  const fiscal_period = updated_month; // MVP: 同じでOK

  const rows = list.map((s) => ({
    ticker: s.ticker,
    fiscal_period,
    updated_month,
    tier: null,
    ai_rev_low: null,
    ai_rev_high: null,
    ai_rev_mid: null,
    ai_growth_yoy: null,
    company_growth_yoy: null,
  }));

  // 3) upsert（ticker + fiscal_period がユニークになってる前提。違ったら言って）
  const { error: upErr } = await supabase
    .from("ai_metrics")
    .upsert(rows, { onConflict: "ticker,fiscal_period" });

  if (upErr) throw upErr;

  console.log(`upsert ai_metrics: ${rows.length} rows (month=${updated_month})`);

  // 4) OpenAI接続の“確認だけ”して終わり（コスト最小）
  const ping = await openai.responses.create({
    model,
    input: "Reply with 'ok'.",
  });

  const text = ping.output_text?.trim() ?? "";
  console.log(`openai ping: ${text || "(no text)"}`);

  console.log("DONE");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
