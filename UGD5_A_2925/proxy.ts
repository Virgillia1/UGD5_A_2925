import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { AUTH_COOKIE_KEY, NOT_AUTHORIZED_ROUTE } from "./src/lib/constants";

export function proxy(request: NextRequest) {
  const isAuthenticated = request.cookies.get(AUTH_COOKIE_KEY)?.value === "1";

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL(NOT_AUTHORIZED_ROUTE, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/home/:path*"],
};
