import "next-auth"
declare module "next-auth" {
  interface User { role: "customer" | "admin" }
  interface Session { user: { id: string; name?: string | null; email?: string | null; role: "customer" | "admin" } }
}
declare module "next-auth/jwt" { interface JWT { role?: string } }
