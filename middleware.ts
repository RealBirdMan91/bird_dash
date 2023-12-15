import createIntlMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { createSupabaseMiddlewareClient } from "./lib/supabase";
import { NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const handleI18nRouting = createIntlMiddleware({
    locales: ["en", "de"],
    defaultLocale: "en",
  });
  const res = handleI18nRouting(req);

  const supabase = createSupabaseMiddlewareClient(req, res);
  const { error, data } = await supabase.auth.getSession();

  return res;
}

export const config = {
  // Skip all paths that should not be internationalized. This example skips
  // certain folders and all pathnames with a dot (e.g. favicon.ico)
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
