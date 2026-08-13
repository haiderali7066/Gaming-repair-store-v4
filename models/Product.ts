import { model, models, Schema } from "mongoose"

const ProductSchema = new Schema({
  name: { type: String, required: true, trim: true }, slug: { type: String, required: true, unique: true, index: true },
  category: { type: String, required: true, index: true }, brand: { type: String, required: true }, price: { type: Number, required: true },
  description: { type: String, required: true }, image: { type: String, required: true }, images: [String],
  specifications: { type: Map, of: String, default: {} }, stock: { type: Number, default: 0, min: 0 },
  featured: { type: Boolean, default: false }, published: { type: Boolean, default: true, index: true },
}, { timestamps: true })

export const Product = models.Product || model("Product", ProductSchema)
