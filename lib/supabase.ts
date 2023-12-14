import { createBrowserClient, createServerClient } from "@supabase/ssr";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { NextRequest, NextResponse } from "next/server";
import { getCookie, setCookie } from "cookies-next";

export function createSupabaseFrontendClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export function createSupabaseServerClient(
  cookies: () => ReadonlyRequestCookies
) {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name) => cookieStore.get(name)?.value,
        set: (name, value, options) => {
          cookieStore.set({ name, value, ...options });
        },
        remove: (name, options) => {
          cookieStore.set({ name, value: "", ...options });
        },
      },
    }
  );
}

export function createSupabaseMiddlewareClient(
  req: NextRequest,
  res: NextResponse
) {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name) => getCookie(name, { req, res }),
        set: (name, value, options) => {
          setCookie(name, value, { req, res, ...options });
          res = NextResponse.next({
            request: {
              headers: req.headers,
            },
          });
        },
        remove: (name, options) => {
          setCookie(name, "value", { req, res, ...options });
          res = NextResponse.next({
            request: {
              headers: req.headers,
            },
          });
        },
      },
    }
  );
}
