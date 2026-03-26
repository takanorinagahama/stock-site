import { NextRequest, NextResponse } from "next/server";
import { fetchEdgarFilings } from "../../../../lib/filings/edgar";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const ticker = searchParams.get("ticker") ?? undefined;
  const arbitraryId = searchParams.get("arbitraryId") ?? undefined;
  const count = Math.min(parseInt(searchParams.get("count") ?? "10", 10), 40);

  const result = await fetchEdgarFilings({ ticker, arbitraryId, count });
  return NextResponse.json(result);
}
