import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_PAGES = ["/login", "/signup", "/forgot-password", "/reset-password"];
const PROTECTED_PREFIXES = ["/workspaces", "/projects", "/settings"];

function hasValidAccessToken(token: string | undefined): boolean {
  if (!token) return false;
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return false;
    const payload = JSON.parse(atob(parts[1].replace(/-/g, "+").replace(/_/g, "/")));
    if (!payload.exp) return false;
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const rawToken = request.cookies.get("access_token")?.value;
  const isAuthenticated = hasValidAccessToken(rawToken);

  // 1. Root "/" -> guests go to /login; logged-in users stay on "/"
  if (pathname === "/") {
    if (!isAuthenticated) {
      const response = NextResponse.redirect(new URL("/login", request.url));
      if (rawToken) response.cookies.delete("access_token");
      return response;
    }
    return NextResponse.next();
  }

  // 2. Logged-in user visiting /login, /signup, etc. -> send to "/"
  if (isAuthenticated && AUTH_PAGES.some((route) => pathname === route || pathname.startsWith(`${route}/`))) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 3. Logged-out guest visiting other protected routes -> send to /login
  if (!isAuthenticated && PROTECTED_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))) {
    const response = NextResponse.redirect(new URL("/login", request.url));
    if (rawToken) response.cookies.delete("access_token");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/forgot-password",
    "/reset-password",
    "/workspaces/:path*",
    "/projects/:path*",
    "/settings/:path*",
  ],
};
