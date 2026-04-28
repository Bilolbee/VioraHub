import { NextResponse, type NextRequest } from "next/server";

const sessionCookieName = "vh_session";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin/login") || pathname.startsWith("/api/admin/login")) {
    return withSecurityHeaders(NextResponse.next());
  }

  const isAdminSurface = pathname.startsWith("/admin") || pathname.startsWith("/api/admin");
  if (!isAdminSurface) return withSecurityHeaders(NextResponse.next());

  const hasSessionCookie = Boolean(request.cookies.get(sessionCookieName)?.value);
  if (hasSessionCookie) return withSecurityHeaders(NextResponse.next());

  if (pathname.startsWith("/api/admin")) {
    return withSecurityHeaders(NextResponse.json({ error: "Autorizatsiya talab qilinadi" }, { status: 401 }));
  }

  const loginUrl = new URL("/admin/login", request.url);
  return withSecurityHeaders(NextResponse.redirect(loginUrl));
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"]
};

function withSecurityHeaders(response: NextResponse) {
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  return response;
}
