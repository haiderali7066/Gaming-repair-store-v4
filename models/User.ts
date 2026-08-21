import { model, models, Schema } from "mongoose"

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    // Optional because Google users may not provide a phone
    phone: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    address: {
      type: String,
      trim: true,
      default: "",
    },

    // Optional because Google users don't have a password
    passwordHash: {
      type: String,
      required: false,
      select: false,
    },

    // Google profile image
    photoUrl: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
      index: true,
    },

    createdByAdmin: {
      type: Boolean,
      default: false,
    },

    // Useful to know how the account was created
    authProvider: {
      type: String,
      enum: ["credentials", "google"],
      default: "credentials",
    },
  },
  {
    timestamps: true,
  },
)

export const User =
  models.User || model("User", UserSchema)