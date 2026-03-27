import { NextResponse } from "next/server";
import { getUsTickers } from "../../../../lib/filings/repository";

export const revalidate = 0;

export async function GET() {
  const tickers = await getUsTickers();
  return NextResponse.json({ count: tickers.length, tickers });
}
