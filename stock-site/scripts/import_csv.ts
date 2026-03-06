import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import fs from "node:fs/promises";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

type CsvRow = Record<string, string>;

type CliOptions = {
  stocksPath: string;
  metricsPaths: string[];
  replaceMonth?: string;
  replaceImportedMonths: boolean;
};

function mustEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

function normalizeHeader(v: string): string {
  return v.replace(/^\uFEFF/, "").trim();
}

function splitCsvLine(line: string): string[] {
  const out: string[] = [];
  let cur = "";
  let i = 0;
  let inQuotes = false;

  while (i < line.length) {
    const ch = line[i];

    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        cur += '"';
        i += 2;
        continue;
      }
      inQuotes = !inQuotes;
      i += 1;
      continue;
    }

    if (ch === "," && !inQuotes) {
      out.push(cur);
      cur = "";
      i += 1;
      continue;
    }

    cur += ch;
    i += 1;
  }

  out.push(cur);
  return out;
}

function parseCsv(text: string): CsvRow[] {
  const lines = text
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .split("\n")
    .filter((line) => line.trim().length > 0);

  if (lines.length < 2) return [];

  const headers = splitCsvLine(lines[0]).map(normalizeHeader);
  const rows: CsvRow[] = [];

  for (let i = 1; i < lines.length; i += 1) {
    const cols = splitCsvLine(lines[i]);
    const row: CsvRow = {};
    for (let j = 0; j < headers.length; j += 1) {
      row[headers[j]] = (cols[j] ?? "").trim();
    }
    rows.push(row);
  }

  return rows;
}

async function readCsvFile(filePath: string): Promise<CsvRow[]> {
  const fullPath = path.resolve(process.cwd(), filePath);
  const text = await fs.readFile(fullPath, "utf8");
  return parseCsv(text);
}

function toNullableString(v: string | undefined): string | null {
  if (v == null) return null;
  const t = v.trim();
  return t === "" ? null : t;
}

function toNullableNumber(v: string | undefined): number | null {
  const t = toNullableString(v);
  if (t == null) return null;
  const n = Number(t);
  if (!Number.isFinite(n)) {
    throw new Error(`Invalid number: ${v}`);
  }
  return n;
}

function toNullableBoolean(v: string | undefined): boolean | null {
  const t = toNullableString(v);
  if (t == null) return null;
  const normalized = t.toLowerCase();
  if (["true", "1", "yes", "y"].includes(normalized)) return true;
  if (["false", "0", "no", "n"].includes(normalized)) return false;
  throw new Error(`Invalid boolean: ${v}`);
}

function toTier(v: string | undefined): "A" | "B" | "C" | null {
  const t = toNullableString(v);
  if (t == null) return null;
  const upper = t.toUpperCase();
  if (upper === "A" || upper === "B" || upper === "C") return upper;
  return null;
}

function parseEvidence(v: string | undefined): string[] | null {
  const t = toNullableString(v);
  if (t == null) return null;

  // JSON array string
  if (t.startsWith("[") && t.endsWith("]")) {
    try {
      const parsed = JSON.parse(t);
      if (Array.isArray(parsed)) return parsed.map((x) => String(x));
    } catch {
      // fallback below
    }
  }

  // fallback: split by "|"
  return t
    .split("|")
    .map((x) => x.trim())
    .filter((x) => x.length > 0);
}

function inferMonthFromFileName(filePath: string): string | null {
  const base = path.basename(filePath);
  const m = base.match(/(\d{4}-\d{2})/);
  return m?.[1] ?? null;
}

function parseArgs(argv: string[]): CliOptions {
  let stocksPath = "./stocks.csv";
  const metricsPaths: string[] = [];
  let replaceMonth: string | undefined;
  let replaceImportedMonths = false;

  for (const arg of argv) {
    if (arg === "--") {
      continue;
    }
    if (arg === "--help" || arg === "-h") {
      console.log(`Usage: pnpm run import:csv -- [metrics_csv ...] [options]\n\nOptions:\n  --stocks=PATH                 stocks CSV path (default: ./stocks.csv)\n  --replace-month=YYYY-MM       delete ai_metrics rows of this month before upsert\n  --replace-imported-months     delete imported months before upsert\n\nExamples:\n  pnpm run import:csv\n  pnpm run import:csv -- ai_metrics_2026-02.csv\n  pnpm run import:csv -- ai_metrics_2026-02.csv --replace-month=2026-02\n`);
      process.exit(0);
    }
    if (arg.startsWith("--stocks=")) {
      stocksPath = arg.slice("--stocks=".length);
      continue;
    }
    if (arg.startsWith("--replace-month=")) {
      replaceMonth = arg.slice("--replace-month=".length);
      continue;
    }
    if (arg === "--replace-imported-months") {
      replaceImportedMonths = true;
      continue;
    }
    if (arg.startsWith("--")) {
      throw new Error(`Unknown option: ${arg}`);
    }
    metricsPaths.push(arg);
  }

  if (metricsPaths.length === 0) {
    metricsPaths.push("./ai_metrics_2026-02.csv");
  }

  return { stocksPath, metricsPaths, replaceMonth, replaceImportedMonths };
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));

  const supabaseUrl = mustEnv("SUPABASE_URL");
  const serviceRoleKey = mustEnv("SUPABASE_SERVICE_ROLE_KEY");
  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });

  const stocksCsv = await readCsvFile(opts.stocksPath);
  const stockRows = stocksCsv.map((row) => {
    const ticker = toNullableString(row.ticker);
    if (!ticker) throw new Error("stocks.csv: ticker is required");

    const payload: Record<string, unknown> = { ticker };

    if (Object.hasOwn(row, "name")) payload.name = toNullableString(row.name);
    if (Object.hasOwn(row, "country")) payload.country = toNullableString(row.country);
    if (Object.hasOwn(row, "market")) payload.market = toNullableString(row.market);
    if (Object.hasOwn(row, "asset_type")) payload.asset_type = toNullableString(row.asset_type);
    if (Object.hasOwn(row, "ai_category")) payload.ai_category = toNullableString(row.ai_category);
    if (Object.hasOwn(row, "ir_url")) payload.ir_url = toNullableString(row.ir_url);
    if (Object.hasOwn(row, "dependency_level")) {
      payload.dependency_level = toNullableNumber(row.dependency_level);
    }
    if (Object.hasOwn(row, "dependency_level_int")) {
      payload.dependency_level_int = toNullableNumber(row.dependency_level_int);
    }
    if (Object.hasOwn(row, "dependency_label")) {
      payload.dependency_label = toNullableString(row.dependency_label);
    }
    if (Object.hasOwn(row, "is_active")) payload.is_active = toNullableBoolean(row.is_active);

    return payload;
  });

  const { error: stockErr } = await supabase
    .from("stocks")
    .upsert(stockRows, { onConflict: "ticker" });
  if (stockErr) throw stockErr;

  const metricsRowsRaw: Record<string, unknown>[] = [];
  const importedMonths = new Set<string>();

  for (const metricsPath of opts.metricsPaths) {
    const rows = await readCsvFile(metricsPath);
    const inferredMonth = inferMonthFromFileName(metricsPath);

    for (const row of rows) {
      const ticker = toNullableString(row.ticker);
      if (!ticker) throw new Error(`${metricsPath}: ticker is required`);

      const updatedMonth = toNullableString(row.updated_month) ?? inferredMonth;
      if (!updatedMonth) {
        throw new Error(`${metricsPath}: updated_month is required (or include YYYY-MM in file name)`);
      }

      const fiscalPeriod = toNullableString(row.fiscal_period) ?? updatedMonth;
      importedMonths.add(updatedMonth);

      const payload: Record<string, unknown> = {
        ticker,
        updated_month: updatedMonth,
        fiscal_period: fiscalPeriod,
      };

      if (Object.hasOwn(row, "tier")) payload.tier = toTier(row.tier);
      if (Object.hasOwn(row, "ai_rev_low")) payload.ai_rev_low = toNullableNumber(row.ai_rev_low);
      if (Object.hasOwn(row, "ai_rev_high")) payload.ai_rev_high = toNullableNumber(row.ai_rev_high);
      if (Object.hasOwn(row, "ai_rev_mid")) payload.ai_rev_mid = toNullableNumber(row.ai_rev_mid);
      if (Object.hasOwn(row, "ai_growth_yoy")) {
        payload.ai_growth_yoy = toNullableNumber(row.ai_growth_yoy);
      }
      if (Object.hasOwn(row, "company_growth_yoy")) {
        payload.company_growth_yoy = toNullableNumber(row.company_growth_yoy);
      }
      if (Object.hasOwn(row, "evidence")) payload.evidence = parseEvidence(row.evidence);

      metricsRowsRaw.push(payload);
    }
  }

  if (opts.replaceMonth) {
    const { error } = await supabase
      .from("ai_metrics")
      .delete()
      .eq("updated_month", opts.replaceMonth);
    if (error) throw error;
    console.log(`deleted ai_metrics month=${opts.replaceMonth}`);
  }

  if (opts.replaceImportedMonths && importedMonths.size > 0) {
    const months = Array.from(importedMonths);
    const { error } = await supabase
      .from("ai_metrics")
      .delete()
      .in("updated_month", months);
    if (error) throw error;
    console.log(`deleted ai_metrics months=${months.join(",")}`);
  }

  const upsertAiMetrics = async (onConflict: string) =>
    supabase.from("ai_metrics").upsert(metricsRowsRaw, { onConflict });

  let metricsUpsertErr: { message?: string } | null = null;

  {
    const { error } = await upsertAiMetrics("ticker,fiscal_period,updated_month");
    metricsUpsertErr = error;
  }

  if (metricsUpsertErr?.message?.includes("no unique or exclusion constraint")) {
    const { error } = await upsertAiMetrics("ticker,updated_month");
    metricsUpsertErr = error;
  }

  if (metricsUpsertErr) {
    throw metricsUpsertErr;
  }

  const { data: summaryRows, error: summaryErr } = await supabase
    .from("ai_metrics")
    .select("updated_month")
    .order("updated_month", { ascending: false })
    .limit(1);
  if (summaryErr) throw summaryErr;

  const asOfMonth = summaryRows?.[0]?.updated_month ?? null;

  console.log(`upsert stocks: ${stockRows.length} rows`);
  console.log(`upsert ai_metrics: ${metricsRowsRaw.length} rows`);
  console.log(`asOfMonth: ${asOfMonth ?? "-"}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
