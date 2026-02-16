import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/dashboard", "/settings", "/profile"];
const authRoutes = ["/auth/signin", "/auth/signup"];

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Read token from cookie named "trackwithtrexo"
  const token = req.cookies.get("trackwithtrexo")?.value ?? null;

  // ✅ If user has a token and tries to access /auth pages → redirect to dashboard
  if (token && authRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // ✅ If route is protected and no token → redirect to signin
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!token) {
      const signinUrl = new URL("/auth/signin", req.url);
      // remove this line to avoid appending callbackUrl:
      // signinUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(signinUrl);
    }
  }

  return NextResponse.next();
}

// ✅ Apply middleware to all routes except excluded ones
export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
};
