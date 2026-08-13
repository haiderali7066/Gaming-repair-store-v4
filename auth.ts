import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { connectToDatabase } from "@/lib/mongodb"
import { loginSchema } from "@/lib/validators"
import { User } from "@/models/User"

export const { handlers, auth, signIn, signOut } = NextAuth({
  // Required when the app is deployed behind a reverse proxy on a custom/preview
  // domain (e.g. *.v0.build) without AUTH_URL set. Without this, NextAuth can
  // inconsistently detect the request protocol across different paths (sign-in
  // vs. Server Actions), which changes the expected session cookie name and
  // makes `auth()` see no session even though the browser is logged in.
  trustHost: true,
  session: { strategy: "jwt" },
  pages: { signIn: "/auth/login" },
  providers: [Credentials({
    credentials: { email: {}, password: {} },
    async authorize(credentials) {
      const parsed = loginSchema.safeParse(credentials)
      if (!parsed.success) return null
      await connectToDatabase()
      const user = await User.findOne({ email: parsed.data.email }).select("+passwordHash")
      if (!user || !(await bcrypt.compare(parsed.data.password, user.passwordHash))) return null
      return { id: user.id, name: user.name, email: user.email, role: user.role }
    },
  })],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Fresh sign-in: role comes straight from authorize()
        token.role = (user as { role: string }).role
      } else if (token.email && !token.role) {
        // Existing session token issued before a role was set (e.g. promoted to
        // admin after their last login) — refresh it from the database so
        // permission checks don't rely on stale JWT data.
        await connectToDatabase()
        const dbUser = await User.findOne({ email: token.email }).select("role").lean()
        if (dbUser) token.role = (dbUser as { role: string }).role
      }
      return token
    },
    session({ session, token }) { if (session.user) { session.user.id = token.sub!; session.user.role = token.role as "customer" | "admin" }; return session },
    redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
  },
})
