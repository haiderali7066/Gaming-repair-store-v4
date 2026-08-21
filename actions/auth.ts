"use server"

import bcrypt from "bcryptjs"
import { AuthError } from "next-auth"
import { redirect } from "next/navigation"
import { signIn, signOut } from "@/auth"
import { connectToDatabase } from "@/lib/mongodb"
import { registerSchema } from "@/lib/validators"
import { User } from "@/models/User"

export async function registerAction(formData: FormData) {
  const parsed = registerSchema.safeParse(Object.fromEntries(formData))

  if (!parsed.success) {
    redirect("/auth/register?error=Please%20check%20your%20details")
  }

  await connectToDatabase()

  const existingUser = await User.exists({
    email: parsed.data.email,
  })

  if (existingUser) {
    redirect("/auth/register?error=Email%20already%20registered")
  }

  const passwordHash = await bcrypt.hash(parsed.data.password, 12)

  await User.create({
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone,
    passwordHash,
  })

  try {
    await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirect: false,
    })
  } catch (e) {
    if (e instanceof AuthError) {
      redirect(
        "/auth/login?error=Account%20created.%20Please%20sign%20in."
      )
    }

    throw e
  }

  redirect("/account")
}

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email"))
  const password = String(formData.get("password"))
  const callbackUrl = String(
    formData.get("callbackUrl") || "/account"
  )

  await connectToDatabase()

  const user = (await User.findOne({ email })
    .select("+passwordHash role")
    .lean()) as {
    role?: string
    passwordHash: string
  } | null

  if (!user) {
    redirect("/auth/login?error=Invalid%20email%20or%20password")
  }

  const redirectTo =
    user.role === "admin"
      ? "/admin/dashboard"
      : callbackUrl

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    })
  } catch (e) {
    if (e instanceof AuthError) {
      redirect(
        "/auth/login?error=Invalid%20email%20or%20password"
      )
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