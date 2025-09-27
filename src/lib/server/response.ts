import { NextResponse } from "next/server";

export function Response(data: any, status: number) {
  return NextResponse.json(data, { status });
}
