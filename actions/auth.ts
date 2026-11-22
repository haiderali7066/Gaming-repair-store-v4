"use server"

import bcrypt from "bcryptjs"
import { AuthError } from "next-auth"
import { redirect } from "next/navigation"
import { signIn, signOut } from "@/auth"
import { connectToDatabase } from "@/lib/mongodb"
import { registerSchema } from "@/lib/validators"
import { User } from "@/models/User"

function fail(path: string, message: string): never {
  redirect(`${path}?error=${encodeURIComponent(message)}`)
}

export async function registerAction(formData: FormData) {
  const parsed = registerSchema.safeParse(Object.fromEntries(formData))

  if (!parsed.success) {
    console.error("REGISTER VALIDATION:", parsed.error.flatten().fieldErrors)
    fail("/auth/register", "Please check your details")
  }

  // Always compare and store emails lowercase (the schema lowercases on save)
  const email = parsed.data.email.trim().toLowerCase()

  // Zod strips keys that aren't in registerSchema, so fall back to the raw form value
  const phone = String(parsed.data.phone ?? formData.get("phone") ?? "").trim()

  try {
    await connectToDatabase()

    const existingUser = await User.exists({ email })

    if (existingUser) {
      fail("/auth/register", "Email already registered")
    }

    const passwordHash = await bcrypt.hash(parsed.data.password, 12)

    await User.create({
      name: parsed.data.name,
      email,
      phone,
      passwordHash,
      authProvider: "credentials",
    })
  } catch (error: any) {
    // redirect() works by throwing: let it through untouched
    if (error?.digest?.startsWith?.("NEXT_REDIRECT")) throw error

    console.error("REGISTER ERROR:", {
      name: error?.name,
      code: error?.code,
      keyPattern: error?.keyPattern,
      message: error?.message,
    })

    // Duplicate key (unique index)
    if (error?.code === 11000) {
      const field = Object.keys(error.keyPattern ?? {})[0]

      if (field === "email") fail("/auth/register", "Email already registered")

      fail(
        "/auth/register",
        `Could not create account: "${field ?? "a field"}" is already in use`
      )
    }

    // Mongoose validation
    if (error?.name === "ValidationError") {
      const first = Object.values(error.errors ?? {})[0] as any
      fail(
        "/auth/register",
        first?.message ?? "Some of your details are invalid"
      )
    }

    // Database not reachable (bad MONGODB_URI, Atlas IP allow-list, etc.)
    if (
      error?.name === "MongoServerSelectionError" ||
      error?.name === "MongooseServerSelectionError"
    ) {
      fail(
        "/auth/register",
        "We couldn't reach the database. Please try again in a moment."
      )
    }

    fail("/auth/register", "Could not create your account. Please try again.")
  }

  try {
    await signIn("credentials", {
      email,
      password: parsed.data.password,
      redirect: false,
    })
  } catch (e) {
    if (e instanceof AuthError) {
      fail("/auth/login", "Account created. Please sign in.")
    }

    throw e
  }

  redirect("/account")
}

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase()
  const password = String(formData.get("password") ?? "")
  const callbackUrl = String(formData.get("callbackUrl") || "/account")

  await connectToDatabase()

  const user = (await User.findOne({ email })
    .select("+passwordHash role")
    .lean()) as {
    role?: string
    passwordHash?: string
  } | null

  if (!user) {
    fail("/auth/login", "Invalid email or password")
  }

  // Google-only accounts have no password
  if (!user.passwordHash) {
    fail("/auth/login", "This account uses Google sign-in. Please continue with Google.")
  }

  const redirectTo = user.role === "admin" ? "/admin/dashboard" : callbackUrl

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    })
  } catch (e) {
    if (e instanceof AuthError) {
      fail("/auth/login", "Invalid email or password")
    }

    throw e
  }

  redirect(redirectTo)
}

export async function logoutAction() {
  await signOut({
    redirectTo: "/",
  })
}