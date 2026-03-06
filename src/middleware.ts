import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- Next middleware signature requires request param
export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), interest-cohort=()"
  );
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains; preload"
  );

  // Next.js injects inline scripts for hydration; script-src needs 'unsafe-inline' unless using nonces (not supported out of the box in App Router).
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://v2.vercel-insights.com https://va.vercel-scripts.com",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https://cdn.simpleicons.org https://logo.clearbit.com https://upload.wikimedia.org https://www.svgrepo.com https://icons.veryicon.com https://the-odds-api.com",
    "font-src 'self'",
    "object-src 'none'",
    "worker-src 'none'",
    "connect-src 'self' https://v2.vercel-insights.com https://vitals.vercel-insights.com https://va.vercel-scripts.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join("; ");

  response.headers.set("Content-Security-Policy", csp);

  return response;
}

export const config = {
  matcher: "/:path*",
};
