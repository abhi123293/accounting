import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = [
  "/dashboard",
  "/invoices",
  "/contacts",
  "/accounts",
  "/ledger",
  "/reports",
  "/settings",
];

const authRoutes = ["/login", "/register", "/reset-password"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
const sessionCookie = request.cookies.get("session")?.value;

  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  if (isProtectedRoute && !sessionCookie) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthRoute && sessionCookie) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/invoices/:path*",
    "/contacts/:path*",
    "/accounts/:path*",
    "/ledger/:path*",
    "/reports/:path*",
    "/settings/:path*",
    "/login",
    "/register",
    "/reset-password",
  ],
};