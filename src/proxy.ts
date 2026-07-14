import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Next.js 16 renamed the `middleware` convention to `proxy`. next-intl's
// createMiddleware returns a compatible handler; here it redirects "/" → "/hr"
// and keeps locale prefixes consistent during local dev. (Static export at
// deploy time handles the root redirect separately.)
export default createMiddleware(routing);

export const config = {
  // Skip Next internals, API routes and anything with a file extension.
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
