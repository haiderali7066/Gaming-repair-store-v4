import { model, models, Schema } from "mongoose"

/**
 * One document per email address.
 * - otpHash:        HMAC of the 6-digit code (the code itself is never stored)
 * - attempts:       wrong guesses so far (capped in the action)
 * - verified:       true once the OTP was entered correctly
 * - resetTokenHash: HMAC of the one-time token that authorises the final step
 * - expiresAt:      TTL index below removes the document automatically
 */
const PasswordResetSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    otpHash: {
      type: String,
      default: "",
    },

    attempts: {
      type: Number,
      default: 0,
    },

    verified: {
      type: Boolean,
      default: false,
    },

    resetTokenHash: {
      type: String,
      default: "",
    },

    resetTokenExpiresAt: {
      type: Date,
    },

    lastSentAt: {
      type: Date,
      default: Date.now,
    },

    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

// MongoDB deletes the document once expiresAt has passed
PasswordResetSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })

export const PasswordReset =
  models.PasswordReset || model("PasswordReset", PasswordResetSchema)
