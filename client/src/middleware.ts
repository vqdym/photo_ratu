import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["uk", "en"];
const defaultLocale = "uk";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (!pathnameHasLocale) {
    request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
  }

  const token = request.cookies.get("jwt")?.value;

  const isAuthPage = pathname.endsWith("/loginAdmin");

  if (isAuthPage && token) {
    const currentLocale = pathname.split("/")[1];
    return NextResponse.redirect(new URL(`/${currentLocale}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|images|favicon.ico|dictionaries).*)",
  ],
};
