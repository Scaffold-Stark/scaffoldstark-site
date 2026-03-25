import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Static assets (with file extensions) are served directly from public/
  // Directory paths need to be rewritten to their index.html
  const lastSegment = pathname.split("/").pop() || "";
  if (!lastSegment.includes(".")) {
    const resolved = pathname.endsWith("/") ? pathname + "index.html" : pathname + "/index.html";
    return NextResponse.rewrite(new URL(resolved, request.url));
  }
}

export const config = {
  matcher: ["/docs/:path*", "/docs"],
};
