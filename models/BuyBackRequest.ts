import { model, models, Schema } from "mongoose";

const BuyBackSchema = new Schema(
  {
    /* ============================================================ */
    /* CUSTOMER                                                      */
    /* ============================================================ */

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    idNumber: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    /* ============================================================ */
    /* DEVICE                                                        */
    /* ============================================================ */

    deviceType: {
      type: String,
      required: true,
      enum: ["Gaming PC", "Gaming Laptop", "iPad"],
    },

    brand: {
      type: String,
      required: true,
      trim: true,
    },

    model: {
      type: String,
      required: true,
      trim: true,
    },

    specifications: {
      type: String,
      required: true,
      trim: true,
    },

    condition: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    /* ============================================================ */
    /* IMAGES                                                        */
    /* ============================================================ */

    images: {
      type: [String],
      default: [],
    },

    /* ============================================================ */
    /* PRICING                                                       */
    /* ============================================================ */

    expectedPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    offeredPrice: {
      type: Number,
      default: null,
    },

    /* ============================================================ */
    /* SERVICE                                                       */
    /* ============================================================ */

    servicePreference: {
      type: String,
      enum: [
        "Drop Off at Our Store",
        "Pickup & Delivery",
        "Courier Service",
      ],
      default: "Drop Off at Our Store",
    },

    /* ============================================================ */
    /* STATUS                                                        */
    /* ============================================================ */

    status: {
      type: String,
      default: "submitted",
      index: true,
    },

    adminNotes: {
      type: String,
      default: "",
    },

    /* ============================================================ */
    /* SOURCE                                                        */
    /* ============================================================ */

    source: {
      type: String,
      enum: ["online", "in-shop"],
      default: "online",
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export const BuyBackRequest =
  models.BuyBackRequest ||
  model("BuyBackRequest", BuyBackSchema);