import { NextResponse, type NextRequest } from "next/server";

const sessionCookieName = "vh_session";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin/login") || pathname.startsWith("/api/admin/login")) {
    return NextResponse.next();
  }

  const isAdminSurface = pathname.startsWith("/admin") || pathname.startsWith("/api/admin");
  if (!isAdminSurface) return NextResponse.next();

  const hasSessionCookie = Boolean(request.cookies.get(sessionCookieName)?.value);
  if (hasSessionCookie) return NextResponse.next();

  if (pathname.startsWith("/api/admin")) {
    return NextResponse.json({ error: "Autorizatsiya talab qilinadi" }, { status: 401 });
  }

  const loginUrl = new URL("/admin/login", request.url);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"]
};
