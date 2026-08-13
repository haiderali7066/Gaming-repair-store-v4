import { model, models, Schema } from "mongoose"

const UserSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, index: true },
  phone: { type: String, required: true },
  address: { type: String, trim: true },
  idNumber: { type: String, required: true, trim: true },
  photoUrl: { type: String, required: true },
  passwordHash: { type: String, required: true, select: false },
  role: { type: String, enum: ["customer", "admin"], default: "customer", index: true },
  createdByAdmin: { type: Boolean, default: false },
}, { timestamps: true })

export const User = models.User || model("User", UserSchema)
