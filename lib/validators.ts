import { z } from "zod";
import {
  BUY_BACK_TYPES,
  DEVICE_TYPES,
  PAYMENT_METHODS,
  PRODUCT_CATEGORIES,
} from "@/lib/constants";

export const loginSchema = z.object({
  email: z.email().transform((v) => v.toLowerCase()),
  password: z.string().min(8),
});
export const registerSchema = loginSchema.extend({
  name: z.string().min(2).max(80),
  phone: z.string().min(7).max(20),
  idNumber: z.string().min(3).max(30),
});
// Staff creating a walk-in customer record from the admin panel — same identity
// requirements as self-registration, plus an optional address captured up front.
export const adminCreateCustomerSchema = registerSchema.extend({
  address: z.string().max(300).optional().or(z.literal("")),
});
// Admin-initiated repair intake: contact is optional since it can fall back to
// the selected customer's phone number on file.
export const adminRepairSchema = z.object({
  customerId: z.string().min(1),
  deviceType: z.enum(DEVICE_TYPES),
  brand: z.string().min(2),
  model: z.string().min(1),
  problem: z.string().min(10),
  contact: z.string().min(7).optional().or(z.literal("")),
  image: z.url().optional().or(z.literal("")),
});
// z.coerce.number() turns "" into 0 (not NaN), which would fail .positive()
// even though an empty offeredPrice field means "no on-the-spot offer" — so
// an empty string is normalized to undefined before coercion runs.
export const adminBuyBackSchema = z.object({
  customerId: z.string().min(1),
  deviceType: z.enum(BUY_BACK_TYPES),
  brand: z.string().min(2),
  model: z.string().min(1),
  specifications: z.string().min(5),
  condition: z.string().min(2),
  description: z.string().min(10),
  expectedPrice: z.coerce.number().positive(),
  offeredPrice: z.preprocess(
    (v) => (v === "" ? undefined : v),
    z.coerce.number().positive().optional(),
  ),
  image: z.url().optional().or(z.literal("")),
});
export const posSaleSchema = z.object({
  customerId: z.string().min(1),
  paymentMethod: z.enum(PAYMENT_METHODS),
  paymentNote: z.string().max(200).optional().or(z.literal("")),
  items: z
    .array(
      z.object({
        productId: z.string().min(1),
        quantity: z.coerce.number().int().positive(),
      }),
    )
    .min(1),
});
export const productSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  category: z.enum(PRODUCT_CATEGORIES),
  brand: z.string().min(2),
  price: z.coerce.number().positive(),
  description: z.string().min(10),
  image: z.url(),
  stock: z.coerce.number().int().min(0),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
  specifications: z.record(z.string(), z.string()).default({}),
});
export const repairSchema = z.object({
  deviceType: z.enum(DEVICE_TYPES),
  brand: z.string().min(2),
  model: z.string().min(1),
  problem: z.string().min(10),
  contact: z.string().min(7),
  image: z.url().optional().or(z.literal("")),
});
export const buyBackSchema = z.object({
  deviceType: z.enum(BUY_BACK_TYPES),

  brand: z
    .string()
    .trim()
    .min(2, "Brand is required"),

  model: z
    .string()
    .trim()
    .min(1, "Model is required"),

  specifications: z
    .string()
    .trim()
    .min(5, "Please provide device specifications"),

  condition: z
    .string()
    .trim()
    .min(2, "Condition is required"),

  description: z
    .string()
    .trim()
    .min(10, "Please provide a detailed description"),

  /* Customer details */
  name: z
    .string()
    .trim()
    .min(2, "Full name is required"),

  idNumber: z
    .string()
    .trim()
    .min(1, "ID number is required"),

  phone: z
    .string()
    .trim()
    .min(7, "Phone number is required"),

  /* Pricing */
  expectedPrice: z.coerce
    .number()
    .positive("Expected price must be greater than 0"),

  /* Service */
  servicePreference: z.enum([
    "Drop Off at Our Store",
    "Pickup & Delivery",
    "Courier Service",
  ]),
});
export const checkoutSchema = z.object({
  fullName: z.string().min(2),
  phone: z.string().min(7),
  address: z.string().min(10),
  city: z.string().min(2),
  notes: z.string().max(500).optional(),
  items: z
    .array(
      z.object({
        productId: z.string(),
        quantity: z.number().int().positive(),
      }),
    )
    .min(1),
});
