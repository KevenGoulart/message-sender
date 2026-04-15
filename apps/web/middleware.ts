import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const session = request.cookies.get("token-MS")?.value;

  console.log(session);

  const pathname = request.nextUrl.pathname;

  const protectedRoutes = ["/single", "/group"];
  const isProtected = protectedRoutes.some((path) => pathname.startsWith(path));

  if (isProtected && !session) {
    const loginUrl = new URL("/", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/single", "/group"],
};
