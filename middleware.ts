import createIntlMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { createSupabaseMiddlewareClient } from "./lib/supabase";

export default async function middleware(req: NextRequest) {
  const handleI18nRouting = createIntlMiddleware({
    locales: ["en", "de"],
    defaultLocale: "en",
  });
  const res = handleI18nRouting(req);

  const supabase = createSupabaseMiddlewareClient(req, res);
  const session = await supabase.auth.getSession();
  console.log("session", session);
  return res;
}

/* export default createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "de"],

  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: "en",
  localePrefix: "always",
  localeDetection: true,
}); */

export const config = {
  // Skip all paths that should not be internationalized. This example skips
  // certain folders and all pathnames with a dot (e.g. favicon.ico)
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};

/* export async function middleware(req: NextRequest) {
  let res = NextResponse.next({
    request: {
      headers: req.headers,
    },
  });

  const supabase = createSupabaseMiddlewareClient(req, res);
  await supabase.auth.getSession();

  return res;
}
 */
