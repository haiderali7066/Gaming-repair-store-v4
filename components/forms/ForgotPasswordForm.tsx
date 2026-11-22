"use client"

import Link from "next/link"
import { useEffect, useState, useTransition } from "react"
import {
  ArrowLeft,
  CheckCircle2,
  Eye,
  EyeOff,
  Gamepad2,
  Loader2,
} from "lucide-react"
import {
  requestOtpAction,
  resetPasswordAction,
  verifyOtpAction,
} from "@/actions/password-reset"

type Step = "email" | "otp" | "password" | "done"

const RESEND_SECONDS = 60

const inputCls =
  "h-12 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-500/10"

const primaryBtn =
  "flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-purple-600 px-4 text-sm font-semibold text-white shadow-lg shadow-purple-600/20 transition hover:bg-purple-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"

const STEPS: Step[] = ["email", "otp", "password"]

export function ForgotPasswordForm() {
  const [step, setStep] = useState<Step>("email")
  const [email, setEmail] = useState("")
  const [code, setCode] = useState("")
  const [resetToken, setResetToken] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [info, setInfo] = useState("")
  const [cooldown, setCooldown] = useState(0)
  const [pending, startTransition] = useTransition()

  // Resend countdown
  useEffect(() => {
    if (cooldown <= 0) return

    const timer = setTimeout(() => setCooldown((s) => s - 1), 1000)
    return () => clearTimeout(timer)
  }, [cooldown])

  function sendCode(e?: React.FormEvent) {
    e?.preventDefault()
    setError("")
    setInfo("")

    startTransition(async () => {
      const res = await requestOtpAction(email)

      if (!res.ok) {
        setError(res.error ?? "Something went wrong.")
        return
      }

      setInfo(res.message ?? "")
      setCode("")
      setCooldown(RESEND_SECONDS)
      setStep("otp")
    })
  }

  function verifyCode(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setInfo("")

    if (!/^\d{6}$/.test(code)) {
      setError("Enter the 6-digit code from your email.")
      return
    }

    startTransition(async () => {
      const res = await verifyOtpAction(email, code)

      if (!res.ok || !res.resetToken) {
        setError(res.error ?? "Something went wrong.")
        return
      }

      setResetToken(res.resetToken)
      setStep("password")
    })
  }

  function savePassword(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    if (password.length < 8) {
      setError("Use at least 8 characters for your password.")
      return
    }

    if (password !== confirm) {
      setError("The two passwords don't match.")
      return
    }

    startTransition(async () => {
      const res = await resetPasswordAction(email, resetToken, password)

      if (!res.ok) {
        setError(res.error ?? "Something went wrong.")
        return
      }

      setStep("done")
    })
  }

  const currentIndex = STEPS.indexOf(step)

  return (
    <div className="w-full max-w-md">
      {/* Brand */}
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-600 text-white shadow-lg shadow-purple-600/20">
          <Gamepad2 size={28} />
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
          Al Dana
        </h1>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl shadow-zinc-200/40 sm:p-8">
        {/* Progress */}
        {step !== "done" && (
          <div className="mb-6 flex gap-2" aria-hidden="true">
            {STEPS.map((s, i) => (
              <div
                key={s}
                className={`h-1.5 flex-1 rounded-full ${
                  i <= currentIndex ? "bg-purple-600" : "bg-zinc-200"
                }`}
              />
            ))}
          </div>
        )}

        {/* ---------- STEP 1: EMAIL ---------- */}
        {step === "email" && (
          <form onSubmit={sendCode} className="space-y-5">
            <div>
              <h2 className="text-2xl font-bold text-zinc-900">
                Forgot your password?
              </h2>
              <p className="mt-2 text-sm leading-6 text-zinc-500">
                Enter the email on your account and we&apos;ll send you a
                6-digit code.
              </p>
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-zinc-700"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
                className={inputCls}
              />
            </div>

            {error && <ErrorBox message={error} />}

            <button type="submit" disabled={pending} className={primaryBtn}>
              {pending ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Sending code...
                </>
              ) : (
                "Send code"
              )}
            </button>
          </form>
        )}

        {/* ---------- STEP 2: OTP ---------- */}
        {step === "otp" && (
          <form onSubmit={verifyCode} className="space-y-5">
            <div>
              <h2 className="text-2xl font-bold text-zinc-900">
                Check your email
              </h2>
              <p className="mt-2 text-sm leading-6 text-zinc-500">
                {info ||
                  "If an account exists for that email, we've sent a 6-digit code."}{" "}
                It expires in 10 minutes.
              </p>
              <p className="mt-1 text-sm font-medium text-zinc-700">{email}</p>
            </div>

            <div>
              <label
                htmlFor="code"
                className="mb-2 block text-sm font-medium text-zinc-700"
              >
                6-digit code
              </label>
              <input
                id="code"
                value={code}
                onChange={(e) =>
                  setCode(e.target.value.replace(/\D/g, "").slice(0, 6))
                }
                inputMode="numeric"
                autoComplete="one-time-code"
                placeholder="000000"
                maxLength={6}
                required
                className={`${inputCls} text-center text-xl font-bold tracking-[0.5em]`}
              />
            </div>

            {error && <ErrorBox message={error} />}

            <button
              type="submit"
              disabled={pending || code.length !== 6}
              className={primaryBtn}
            >
              {pending ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Verifying...
                </>
              ) : (
                "Verify code"
              )}
            </button>

            <div className="flex items-center justify-between text-sm">
              <button
                type="button"
                onClick={() => {
                  setError("")
                  setInfo("")
                  setStep("email")
                }}
                className="inline-flex items-center gap-1 font-medium text-zinc-500 hover:text-zinc-800"
              >
                <ArrowLeft size={14} /> Change email
              </button>

              <button
                type="button"
                onClick={() => sendCode()}
                disabled={cooldown > 0 || pending}
                className="font-semibold text-purple-600 hover:text-purple-700 disabled:cursor-not-allowed disabled:text-zinc-400"
              >
                {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend code"}
              </button>
            </div>
          </form>
        )}

        {/* ---------- STEP 3: NEW PASSWORD ---------- */}
        {step === "password" && (
          <form onSubmit={savePassword} className="space-y-5">
            <div>
              <h2 className="text-2xl font-bold text-zinc-900">
                Choose a new password
              </h2>
              <p className="mt-2 text-sm leading-6 text-zinc-500">
                Code verified. Pick a password with at least 8 characters.
              </p>
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-zinc-700"
              >
                New password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter a new password"
                  autoComplete="new-password"
                  minLength={8}
                  required
                  className={`${inputCls} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="confirm"
                className="mb-2 block text-sm font-medium text-zinc-700"
              >
                Confirm password
              </label>
              <input
                id="confirm"
                type={showPassword ? "text" : "password"}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Repeat your new password"
                autoComplete="new-password"
                minLength={8}
                required
                className={inputCls}
              />
            </div>

            {error && <ErrorBox message={error} />}

            <button type="submit" disabled={pending} className={primaryBtn}>
              {pending ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Saving...
                </>
              ) : (
                "Update password"
              )}
            </button>
          </form>
        )}

        {/* ---------- DONE ---------- */}
        {step === "done" && (
          <div role="status" className="py-4 text-center">
            <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 className="size-8" />
            </div>

            <h2 className="mt-5 text-2xl font-bold text-zinc-900">
              Password updated
            </h2>
            <p className="mt-2 text-sm leading-6 text-zinc-500">
              You can now sign in with your new password.
            </p>

            <Link href="/auth/login" className={`${primaryBtn} mt-6`}>
              Go to sign in
            </Link>
          </div>
        )}

        {/* Back link */}
        {step !== "done" && (
          <div className="mt-6 border-t border-zinc-100 pt-6 text-center">
            <Link
              href="/auth/login"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-purple-600 hover:text-purple-700"
            >
              <ArrowLeft size={14} /> Back to sign in
            </Link>
          </div>
        )}
      </div>

      <p className="mt-6 text-center text-xs text-zinc-400">
        © {new Date().getFullYear()} Al Dana. All rights reserved.
      </p>
    </div>
  )
}

function ErrorBox({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
    >
      {message}
    </div>
  )
}
