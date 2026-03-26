import { NextRequest, NextResponse } from "next/server";
import { fetchEdinetFilings } from "../../../../lib/filings/edinet";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const edinetCode = searchParams.get("edinetCode") ?? undefined;
  const ticker = searchParams.get("ticker") ?? undefined;
  const arbitraryId = searchParams.get("arbitraryId") ?? undefined;
  const count = Math.min(parseInt(searchParams.get("count") ?? "20", 10), 100);

  const result = await fetchEdinetFilings({ edinetCode, ticker, arbitraryId, count });
  return NextResponse.json(result);
}
