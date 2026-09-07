import mongoose, {
  Schema,
  type Model,
} from "mongoose"

export interface CategoryDocument
  extends mongoose.Document {
  name: string
  slug: string
  createdAt: Date
  updatedAt: Date
}

const CategorySchema =
  new Schema<CategoryDocument>(
    {
      name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
      },

      slug: {
        type: String,
        required: true,
        trim: true,
        unique: true,
      },
    },
    {
      timestamps: true,
    },
  )

export const Category =
  (mongoose.models.Category as Model<CategoryDocument>) ||
  mongoose.model<CategoryDocument>(
    "Category",
    CategorySchema,
  )