"use client"

import Link from "next/link"
import { useState } from "react"
import { Eye, EyeOff, Gamepad2 } from "lucide-react"
import { signIn } from "next-auth/react"
import { loginAction, registerAction } from "@/actions/auth"

interface AuthFormProps {
  mode: "login" | "register"
  error?: string
  admin?: boolean
}

export function AuthForm({
  mode,
  error,
  admin = false,
}: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  const register = mode === "register"
  const action = register ? registerAction : loginAction

  async function handleGoogleSignIn() {
    try {
      setGoogleLoading(true)

      await signIn("google", {
        callbackUrl: admin ? "/admin/dashboard" : "/account",
      })
    } catch (error) {
      console.error("Google sign-in error:", error)
      setGoogleLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      {/* Logo / Brand */}
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-600 text-white shadow-lg shadow-purple-600/20">
          <Gamepad2 size={28} />
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
          Al Dana Gaming
        </h1>

        <p className="mt-1 text-sm text-zinc-500">
          {admin
            ? "Secure administrator access"
            : "Gaming. Repairs. Trade-ins."}
        </p>
      </div>

      {/* Card */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl shadow-zinc-200/40 sm:p-8">

        {/* Heading */}
        <div className="mb-7">
          <h2 className="text-2xl font-bold text-zinc-900">
            {register ? "Create your account" : "Welcome back"}
          </h2>

          <p className="mt-2 text-sm leading-6 text-zinc-500">
            {register
              ? "Create an account to manage your orders, repairs and trade-ins."
              : "Sign in to continue to your Al Dana Gaming account."}
          </p>
        </div>

        {/* Google Button */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={googleLoading}
          className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-zinc-200 bg-white text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {googleLoading ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-300 border-t-purple-600" />
          ) : (
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fill="#4285F4"
                d="M21.35 12.27c0-.78-.07-1.53-.22-2.25H12v4.26h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.4Z"
              />

              <path
                fill="#34A853"
                d="M12 21.99c2.63 0 4.84-.87 6.45-2.36l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.53A9.74 9.74 0 0 0 12 21.99Z"
              />

              <path
                fill="#FBBC05"
                d="M6.54 14.07A5.86 5.86 0 0 1 6.23 12c0-.72.12-1.42.31-2.07V7.4H3.3A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.05 1.05 4.6l3.24-2.53Z"
              />

              <path
                fill="#EA4335"
                d="M12 5.9c1.43 0 2.72.49 3.73 1.45l2.8-2.8C16.83 2.98 14.63 2.01 12 2.01a9.74 9.74 0 0 0-8.7 5.39l3.24 2.53C7.31 7.62 9.46 5.9 12 5.9Z"
              />
            </svg>
          )}

          {googleLoading
            ? "Connecting to Google..."
            : "Continue with Google"}
        </button>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-200" />
          </div>

          <div className="relative flex justify-center">
            <span className="bg-white px-3 text-xs font-medium uppercase tracking-wider text-zinc-400">
              Or continue with email
            </span>
          </div>
        </div>

        {/* Email / Password Form */}
        <form
          id="auth-form"
          action={action}
          className="space-y-5"
        >
          {/* Name */}
          {register && (
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-zinc-700"
              >
                Full name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                autoComplete="name"
                required
                className="h-12 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-500/10"
              />
            </div>
          )}

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-zinc-700"
            >
              Email address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
              className="h-12 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-500/10"
            />
          </div>

          {/* Phone */}
          {register && (
            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-medium text-zinc-700"
              >
                Phone number
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+971 50 123 4567"
                autoComplete="tel"
                required
                className="h-12 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-500/10"
              />
            </div>
          )}

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-zinc-700"
            >
              Password
            </label>

            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                minLength={8}
                required
                autoComplete={
                  register
                    ? "new-password"
                    : "current-password"
                }
                className="h-12 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 pr-12 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-500/10"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword((value) => !value)
                }
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>

            {register && (
              <p className="mt-2 text-xs text-zinc-400">
                Use at least 8 characters.
              </p>
            )}
          </div>

          {/* Login callback */}
          {!register && (
            <input
              type="hidden"
              name="callbackUrl"
              value={
                admin
                  ? "/admin/dashboard"
                  : "/account"
              }
            />
          )}

          {/* Error */}
          {error && (
            <div
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
            >
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="flex h-12 w-full items-center justify-center rounded-xl bg-purple-600 px-4 text-sm font-semibold text-white shadow-lg shadow-purple-600/20 transition hover:bg-purple-700 active:scale-[0.99]"
          >
            {register ? "Create account" : "Sign in"}
          </button>
        </form>

        {/* Bottom */}
        {!admin && (
          <div className="mt-6 border-t border-zinc-100 pt-6 text-center">
            <p className="text-sm text-zinc-500">
              {register
                ? "Already have an account?"
                : "Don't have an account?"}{" "}

              <Link
                href={
                  register
                    ? "/auth/login"
                    : "/auth/register"
                }
                className="font-semibold text-purple-600 hover:text-purple-700"
              >
                {register
                  ? "Sign in"
                  : "Create account"}
              </Link>
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <p className="mt-6 text-center text-xs text-zinc-400">
        © {new Date().getFullYear()} Al Dana Gaming. All rights reserved.
      </p>
    </div>
  )
}