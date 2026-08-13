export { auth as proxy } from "@/auth"
// /api/admin/:path* must be matched too — without it, requests to those route
// handlers skip this layer entirely and NextAuth's `auth()` can mis-detect
// the request protocol/host, causing it to look under the wrong session
// cookie name and see no session even though the browser is logged in
// (surfaces as spurious 401s from e.g. the customer/product search routes).
export const config = { matcher: ["/account/:path*", "/checkout/:path*", "/admin/:path*", "/api/admin/:path*"] }
