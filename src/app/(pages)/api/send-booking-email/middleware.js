import { NextResponse } from "next/server";

export function middleware(request) {
  // You can add authentication or rate limiting here if needed
  return NextResponse.next();
}
