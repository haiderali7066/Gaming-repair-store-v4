"use server"

import bcrypt from "bcryptjs"
import { z } from "zod"
import { sendOtpEmail } from "@/lib/mail"
import { connectToDatabase } from "@/lib/mongodb"
import {
  generateOtp,
  generateResetToken,
  hashValue,
  safeEqual,
} from "@/lib/otp"
import { PasswordReset } from "@/models/PasswordReset"
import { User } from "@/models/User"

const OTP_TTL_MS = 10 * 60 * 1000 // code valid for 10 minutes
const RESET_TTL_MS = 15 * 60 * 1000 // time allowed to choose a new password
const RESEND_COOLDOWN_MS = 60 * 1000
const MAX_ATTEMPTS = 5

export type ResetResult = {
  ok: boolean
  message?: string
  error?: string
  resetToken?: string
}

// Same wording whether or not the email exists, so addresses can't be probed
const GENERIC_SENT =
  "If an account exists for that email, we've sent a 6-digit code."
const BAD_CODE = "That code is invalid or has expired."

function normalizeEmail(value: unknown) {
  const email = String(value ?? "")
    .trim()
    .toLowerCase()

  return z.email().safeParse(email).success ? email : null
}

/* ------------------------------------------------------------------ */
/* Step 1: send the code                                               */
/* ------------------------------------------------------------------ */
export async function requestOtpAction(rawEmail: string): Promise<ResetResult> {
  const email = normalizeEmail(rawEmail)

  if (!email) {
    return { ok: false, error: "Please enter a valid email address." }
  }

  try {
    await connectToDatabase()

    const user = await User.exists({ email })

    // Unknown email: pretend it worked
    if (!user) {
      return { ok: true, message: GENERIC_SENT }
    }

    // Resend cooldown: silently ignore rapid repeats
    const existing = await PasswordReset.findOne({ email }).lean<{
      lastSentAt?: Date
    }>()

    if (
      existing?.lastSentAt &&
      Date.now() - new Date(existing.lastSentAt).getTime() < RESEND_COOLDOWN_MS
    ) {
      return { ok: true, message: GENERIC_SENT }
    }

    const code = generateOtp()
    const now = Date.now()

    await PasswordReset.findOneAndUpdate(
      { email },
      {
        $set: {
          otpHash: hashValue(code, email),
          attempts: 0,
          verified: false,
          resetTokenHash: "",
          lastSentAt: new Date(now),
          expiresAt: new Date(now + OTP_TTL_MS),
        },
        $unset: { resetTokenExpiresAt: "" },
      },
      { upsert: true },
    )

    await sendOtpEmail(email, code)

    return { ok: true, message: GENERIC_SENT }
  } catch (error) {
    console.error("REQUEST OTP ERROR:", error)

    return {
      ok: false,
      error: "We couldn't send the email. Please try again in a moment.",
    }
  }
}

/* ------------------------------------------------------------------ */
/* Step 2: check the code                                              */
/* ------------------------------------------------------------------ */
export async function verifyOtpAction(
  rawEmail: string,
  rawCode: string,
): Promise<ResetResult> {
  const email = normalizeEmail(rawEmail)
  const code = String(rawCode ?? "").trim()

  if (!email || !/^\d{6}$/.test(code)) {
    return { ok: false, error: "Enter the 6-digit code from your email." }
  }

  try {
    await connectToDatabase()

    // Count this attempt atomically before comparing (blocks brute force races)
    const record = await PasswordReset.findOneAndUpdate(
      {
        email,
        verified: false,
        expiresAt: { $gt: new Date() },
      },
      { $inc: { attempts: 1 } },
      { new: true },
    )

    if (!record) {
      return { ok: false, error: BAD_CODE }
    }

    if (record.attempts > MAX_ATTEMPTS) {
      return {
        ok: false,
        error: "Too many incorrect attempts. Please request a new code.",
      }
    }

    if (!record.otpHash || !safeEqual(record.otpHash, hashValue(code, email))) {
      return { ok: false, error: BAD_CODE }
    }

    // Correct: burn the OTP and hand back a one-time reset token
    const resetToken = generateResetToken()

    record.otpHash = ""
    record.verified = true
    record.resetTokenHash = hashValue(resetToken, `reset:${email}`)
    record.resetTokenExpiresAt = new Date(Date.now() + RESET_TTL_MS)
    record.expiresAt = new Date(Date.now() + RESET_TTL_MS)
    await record.save()

    return { ok: true, resetToken }
  } catch (error) {
    console.error("VERIFY OTP ERROR:", error)

    return { ok: false, error: "Something went wrong. Please try again." }
  }
}

/* ------------------------------------------------------------------ */
/* Step 3: set the new password                                        */
/* ------------------------------------------------------------------ */
export async function resetPasswordAction(
  rawEmail: string,
  resetToken: string,
  password: string,
): Promise<ResetResult> {
  const email = normalizeEmail(rawEmail)

  if (!email || !resetToken) {
    return { ok: false, error: "This reset link is no longer valid." }
  }

  if (typeof password !== "string" || password.length < 8) {
    return { ok: false, error: "Use at least 8 characters for your password." }
  }

  if (password.length > 100) {
    return { ok: false, error: "That password is too long." }
  }

  try {
    await connectToDatabase()

    const record = await PasswordReset.findOne({
      email,
      verified: true,
      resetTokenExpiresAt: { $gt: new Date() },
    })

    if (
      !record ||
      !record.resetTokenHash ||
      !safeEqual(record.resetTokenHash, hashValue(resetToken, `reset:${email}`))
    ) {
      return {
        ok: false,
        error: "Your reset session has expired. Please start again.",
      }
    }

    const passwordHash = await bcrypt.hash(password, 12)

    const result = await User.updateOne({ email }, { $set: { passwordHash } })

    if (result.matchedCount === 0) {
      return { ok: false, error: "We couldn't find that account." }
    }

    // One use only
    await PasswordReset.deleteOne({ email })

    return { ok: true, message: "Your password has been updated." }
  } catch (error) {
    console.error("RESET PASSWORD ERROR:", error)

    return { ok: false, error: "Something went wrong. Please try again." }
  }
}
