import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

/**
 * Next.js middleware entry-point.
 *
 * Wraps `updateSession` (Supabase session refresh) in a top-level try/catch
 * so that ANY unexpected error — missing env vars, network failures, malformed
 * cookies — is caught here and results in a clean pass-through response
 * instead of a 500 MIDDLEWARE_INVOCATION_FAILED.
 */
export async function middleware(request: NextRequest) {
  try {
    return await updateSession(request);
  } catch (err) {
    console.error("[middleware] Unhandled error — passing request through:", err);
    // Fail open: let the request continue rather than serving a 500.
    return NextResponse.next({ request });
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths EXCEPT:
     *   - _next/static  (static assets)
     *   - _next/image   (image optimisation)
     *   - favicon.ico
     *   - common static file extensions (svg, png, jpg, …)
     *
     * This keeps middleware out of the hot path for static files where it
     * would never do useful work but could add latency / errors.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
