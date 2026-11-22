import { createHmac, randomBytes, randomInt, timingSafeEqual } from "crypto"

function secret() {
  const value = process.env.OTP_SECRET

  if (!value) {
    throw new Error("OTP_SECRET is not set")
  }

  return value
}

/** Cryptographically secure 6-digit code, e.g. "042917" */
export function generateOtp() {
  return String(randomInt(0, 1_000_000)).padStart(6, "0")
}

/** Long random token proving the OTP step was completed */
export function generateResetToken() {
  return randomBytes(32).toString("hex")
}

/**
 * HMAC-SHA256 of the value, namespaced by `scope` (e.g. the email address or
 * "reset-token") so the same code for two different users never hashes equal.
 */
export function hashValue(value: string, scope: string) {
  return createHmac("sha256", secret())
    .update(`${scope}:${value}`)
    .digest("hex")
}

/** Constant-time string comparison */
export function safeEqual(a: string, b: string) {
  const bufA = Buffer.from(a)
  const bufB = Buffer.from(b)

  return bufA.length === bufB.length && timingSafeEqual(bufA, bufB)
}
