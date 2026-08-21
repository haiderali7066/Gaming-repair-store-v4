import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import bcrypt from "bcryptjs"

import { connectToDatabase } from "@/lib/mongodb"
import { loginSchema } from "@/lib/validators"
import { User } from "@/models/User"

export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth({
  trustHost: true,

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/auth/login",
  },

  providers: [
    // ==========================================
    // GOOGLE
    // ==========================================
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // ==========================================
    // EMAIL + PASSWORD
    // ==========================================
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials)

        if (!parsed.success) {
          return null
        }

        await connectToDatabase()

        const user = await User.findOne({
          email: parsed.data.email.toLowerCase(),
        }).select("+passwordHash")

        if (!user || !user.passwordHash) {
          return null
        }

        const passwordValid = await bcrypt.compare(
          parsed.data.password,
          user.passwordHash
        )

        if (!passwordValid) {
          return null
        }

        // IMPORTANT:
        // Always use MongoDB _id as Auth.js user ID
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        }
      },
    }),
  ],

  callbacks: {
    // ==========================================
    // SIGN IN
    // ==========================================
    async signIn({ user, account }) {
      // -----------------------------
      // CREDENTIALS
      // -----------------------------
      if (account?.provider === "credentials") {
        return true
      }

      // -----------------------------
      // GOOGLE
      // -----------------------------
      if (account?.provider === "google") {
        if (!user.email) {
          return false
        }

        await connectToDatabase()

        const email = user.email.toLowerCase()

        let dbUser = await User.findOne({
          email,
        })

        // Existing MongoDB user
        if (dbUser) {
          // IMPORTANT:
          // Replace Google's ID with MongoDB ObjectId
          user.id = dbUser._id.toString()

          return true
        }

        // Create new Google user
        dbUser = await User.create({
          name: user.name || "Google User",
          email,
          phone: "",
          address: "",
          photoUrl: user.image || "",
          role: "customer",
          createdByAdmin: false,
          authProvider: "google",
        })

        // IMPORTANT:
        // Use MongoDB ObjectId, NOT Google's UUID
        user.id = dbUser._id.toString()

        return true
      }

      return false
    },

    // ==========================================
    // JWT
    // ==========================================
    async jwt({ token, user }) {
      /*
       * Fresh login
       */
      if (user) {
        // Use the MongoDB ID returned by credentials
        // or assigned during Google sign-in.
        token.sub = user.id

        token.role =
          (user as { role?: string }).role || "customer"
      }

      /*
       * Always synchronize the JWT with MongoDB.
       *
       * This is important for Google users and also
       * makes sure admin role changes are reflected.
       */
      if (token.email) {
        await connectToDatabase()

        const dbUser = await User.findOne({
          email: token.email.toLowerCase(),
        })
          .select("_id role")
          .lean()

        if (dbUser) {
          // IMPORTANT:
          // session.user.id will now be MongoDB ObjectId
          token.sub = dbUser._id.toString()

          token.role =
            (dbUser as { role: string }).role
        } else {
          token.role = "customer"
        }
      }

      return token
    },

    // ==========================================
    // SESSION
    // ==========================================
    async session({ session, token }) {
      if (session.user) {
        // MongoDB ObjectId
        session.user.id = token.sub!

        session.user.role =
          (token.role as "customer" | "admin") ||
          "customer"
      }

      return session
    },

    // ==========================================
    // REDIRECT
    // ==========================================
    redirect({ url, baseUrl }) {
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`
      }

      if (new URL(url).origin === baseUrl) {
        return url
      }

      return baseUrl
    },
  },
})