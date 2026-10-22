import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

/**
 * Safely refresh the Supabase session inside middleware.
 *
 * - Guards against missing environment variables (returns a plain NextResponse
 *   so the app keeps running instead of throwing a 500).
 * - Wraps the entire Supabase interaction in a try/catch so a network hiccup
 *   or malformed cookie never crashes the middleware chain.
 * - Calls `supabase.auth.getUser()` to actually refresh the session token
 *   (without this call the session cookie is never rotated).
 */
export async function updateSession(request: NextRequest): Promise<NextResponse> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  // ── Guard: missing env vars ─────────────────────────────────────────────────
  if (!supabaseUrl || !supabaseKey) {
    console.warn(
      "[middleware] Supabase env vars are not set " +
        "(NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY). " +
        "Skipping session refresh."
    );
    return NextResponse.next({ request });
  }

  // ── Build the initial pass-through response ─────────────────────────────────
  let supabaseResponse = NextResponse.next({ request });

  try {
    const supabase = createServerClient(supabaseUrl, supabaseKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // Write cookies back to the request so server components can read them
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          // Rebuild the response with the updated request headers
          supabaseResponse = NextResponse.next({ request });
          // Write cookies to the outgoing response so the browser stores them
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    });

    // IMPORTANT: calling getUser() is what actually refreshes the JWT.
    // Do NOT remove this call — without it, the session will expire silently.
    await supabase.auth.getUser();
  } catch (err) {
    // A failure here (bad cookie, network error, etc.) must never surface as a
    // 500.  We just let the request through without a refreshed session.
    console.error("[middleware] Supabase session refresh failed:", err);
  }

  return supabaseResponse;
}

// Legacy export alias kept for backwards-compatibility with any code that
// imports `createClient` from this module.
export const createClient = updateSession;
