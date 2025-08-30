import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("trexo")?.value;

  // Prevent authenticated users from accessing /sign-in
  if (request.nextUrl.pathname === "/auth/signin") {
    if (token) {
      const dashboardUrl = new URL("/dashboard", request.url);
      return NextResponse.redirect(dashboardUrl);
    }
  } else {
    if (!token) {
      const loginUrl = new URL("/auth/signin", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/auth/signin"],
};
