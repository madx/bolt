import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/b/")) {
    const slug = request.nextUrl.pathname.split("/").at(-1);
    if (slug) {
      const url: string | null = await kv.get(slug);
      if (url !== null) {
        return NextResponse.redirect(url);
      }
    }
  }
}
