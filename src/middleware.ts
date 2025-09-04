import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { JWT_KEY } from "./config/config";
import { TokenData } from "./types/authTypes";

export const runtime = "nodejs";

export function middleware(request: NextRequest) {
  const token: string | undefined = request.cookies.get("trexo")?.value;
  // Handle API routes: Verify token before proceeding
  if (request.nextUrl.pathname.startsWith("/api/")) {
    if (!token) {
      return new Response(JSON.stringify({ message: "Please log in" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    try {
      // Verify the JWT token
      const decoded = jwt.verify(token, JWT_KEY);
      // If valid, proceed (you can add more checks here, e.g., role-based)
      const userData: TokenData = decoded as TokenData;
      const response = NextResponse.next();
      response.headers.set("x-user-id", userData.id);
      response.headers.set("x-user-role", userData.role);
      /* eslint-disable @typescript-eslint/no-unused-vars */
    } catch (error) {
      return NextResponse.redirect(new URL("/auth/signin", request.url));
      // Token is invalid or expired
      // if (error instanceof jwt.TokenExpiredError) {
      //   return new Response(JSON.stringify({ message: "Please Login again" }), {
      //     status: 401,
      //     headers: { "Content-Type": "application/json" },
      //   });
      // } else if (error instanceof Error) {
      //   return new Response(JSON.stringify({ message: error.message }), {
      //     status: 401,
      //     headers: { "Content-Type": "application/json" },
      //   });
      // } else {
      //   return new Response(JSON.stringify({ message: "Unauthorized" }), {
      //     status: 401,
      //     headers: { "Content-Type": "application/json" },
      //   });
      // }
    }
  }

  // Prevent authenticated users from accessing /sign-in
  if (
    request.nextUrl.pathname === "/auth/signin" ||
    request.nextUrl.pathname === "/auth/signup"
  ) {
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
  matcher: ["/dashboard", "/auth/signin", "/auth/signup"], // Added /api/:path* to handle API routes
};
