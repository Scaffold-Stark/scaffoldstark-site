import { NextRequest, NextResponse } from "next/server";

const STATIC_EXT = /\.(html|css|js|json|png|jpg|jpeg|gif|svg|ico|woff2?|ttf|eot|map|xml|txt|webp|avif|mp4|webm)$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!STATIC_EXT.test(pathname)) {
    const resolved = pathname.endsWith("/") ? pathname + "index.html" : pathname + "/index.html";
    return NextResponse.rewrite(new URL(resolved, request.url));
  }
}

export const config = {
  matcher: ["/docs/:path*", "/docs"],
};
