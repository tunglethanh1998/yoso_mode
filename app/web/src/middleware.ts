import { NextRequest, NextResponse } from "next/server";
import { COOKIE_KEYS } from "./libs/constant";
import { ROUTE } from "./libs/enum";

export async function middleware(request: NextRequest) {
  const nextRequest = new Headers(request.headers);
  const { pathname } = request.nextUrl;

  const hasToken = request.cookies.has(COOKIE_KEYS.SESSION_ID);
  const loggedIn = !!hasToken;

  nextRequest.set("x-logged", loggedIn ? "true" : "");

  let nextResponse = NextResponse.next({
    request: { headers: nextRequest },
  });

  if (ROUTE.LOGIN === pathname && loggedIn) {
    return NextResponse.redirect(new URL(ROUTE.HOME, request.url));
  }

  return nextResponse;
}

// (?!...): This means "do not match if the following patterns are found."
export const config = {
  matcher: [
    "/((?!api|_next/static|static|images|favicon.ico|icon.png|apple-icon.png|robots.txt|sw.js|sw.js.map).*)",
  ],
};
