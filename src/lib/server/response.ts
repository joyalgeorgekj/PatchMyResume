import { NextResponse } from "next/server";

export function apiResponse(data: any, status: number) {
  return NextResponse.json(data, { status });
}
