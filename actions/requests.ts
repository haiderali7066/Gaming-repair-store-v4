"use server";

import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/mongodb";
import { buyBackSchema, repairSchema } from "@/lib/validators";
import { BuyBackRequest } from "@/models/BuyBackRequest";
import { RepairRequest } from "@/models/RepairRequest";

type BuyBackState = {
  success?: boolean;
  message?: string;
  errors?: Record<string, string>;
};

type RepairState = {
  success?: boolean;
  message?: string;
  errors?: Record<string, string>;
  /** echoed back on failure so the form doesn't lose what the user typed */
  values?: Record<string, string>;
};

async function userId() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/auth/login");
  }

  return session.user.id;
}

/* ================================================================ */
/* REPAIR REQUEST                                                   */
/* ================================================================ */

export async function submitRepair(
  prevState: RepairState,
  formData: FormData
): Promise<RepairState> {
  /*
   * IMPORTANT: resolve the user BEFORE the try/catch.
   * redirect() works by throwing, so inside a try/catch it was being
   * swallowed and turned into a generic "something went wrong" error.
   */
  const uid = await userId();

  /*
   * Only text fields go to the validator. The photo input is a File,
   * which must not be passed into repairSchema.
   */
  const rawData: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value === "string") rawData[key] = value;
  }

  const parsed = repairSchema.safeParse(rawData);

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;

    return {
      success: false,
      message: "Please complete all required repair details.",
      errors: Object.fromEntries(
        Object.entries(fieldErrors).map(([key, value]) => [
          key,
          value?.[0] || "This field is required.",
        ])
      ),
      values: rawData,
    };
  }

  /* ---------- PHOTOS (OPTIONAL) ---------- */
  // An empty file input still sends a 0-byte File, so ignore those.
  const photos = formData
    .getAll("attachment")
    .filter((f): f is File => f instanceof File && f.size > 0);

  if (photos.length > 5) {
    return {
      success: false,
      message: "You can upload a maximum of 5 photos.",
      errors: { attachment: "Maximum 5 photos are allowed." },
      values: rawData,
    };
  }

  for (const file of photos) {
    if (!file.type.startsWith("image/")) {
      return {
        success: false,
        message: "Only image files are allowed.",
        errors: { attachment: "Only image files are allowed." },
        values: rawData,
      };
    }
    if (file.size > 10 * 1024 * 1024) {
      return {
        success: false,
        message: "Each photo must be smaller than 10MB.",
        errors: { attachment: "Each photo must be smaller than 10MB." },
        values: rawData,
      };
    }
  }

  try {
    await connectToDatabase();

    const imageUrls: string[] = [];

    /*
     * Put your Cloudinary upload here (same helper as buy-back).
     * With no photos this loop simply does nothing, so photos stay optional.
     *
     * for (const file of photos) {
     *   const buffer = Buffer.from(await file.arrayBuffer());
     *   const result = await uploadToCloudinary(buffer);
     *   imageUrls.push(result.secure_url);
     * }
     */

    await RepairRequest.create({
      ...parsed.data,
      userId: uid,
      images: imageUrls, // ignored by Mongoose if the model has no "images" field
    });

    return {
      success: true,
      message:
        "Your repair request has been submitted successfully. Our team will contact you shortly.",
    };
  } catch (error) {
    console.error("Repair request error:", error);

    return {
      success: false,
      message:
        "Something went wrong while submitting your repair request. Please try again.",
      values: rawData,
    };
  }
}

/* ================================================================ */
/* BUY BACK REQUEST                                                 */
/* ================================================================ */

export async function submitBuyBack(
  prevState: BuyBackState,
  formData: FormData
): Promise<BuyBackState> {
  // Same fix as above: redirect() must run outside try/catch.
  const uid = await userId();

  try {
    /*
     * Do NOT use Object.fromEntries(formData) directly because
     * the form now contains uploaded image files.
     */

    const rawData = {
      deviceType: formData.get("deviceType")?.toString() || "",
      brand: formData.get("brand")?.toString() || "",
      model: formData.get("model")?.toString() || "",
      condition: formData.get("condition")?.toString() || "",
      specifications: formData.get("specifications")?.toString() || "",
      description: formData.get("description")?.toString() || "",
      name: formData.get("name")?.toString() || "",
      idNumber: formData.get("idNumber")?.toString() || "",
      phone: formData.get("phone")?.toString() || "",
      expectedPrice: formData.get("expectedPrice")?.toString() || "",
      servicePreference: formData.get("servicePreference")?.toString() || "",
    };

    /* ============================================================ */
    /* VALIDATE FORM                                                 */
    /* ============================================================ */

    const parsed = buyBackSchema.safeParse(rawData);

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;

      return {
        success: false,
        message: "Please correct the highlighted fields.",
        errors: Object.fromEntries(
          Object.entries(fieldErrors).map(([key, value]) => [
            key,
            value?.[0] || "This field is required.",
          ])
        ),
      };
    }

    /* ============================================================ */
    /* GET UPLOADED IMAGES                                           */
    /* ============================================================ */

    const imageFiles = formData
      .getAll("images")
      .filter((file): file is File => file instanceof File && file.size > 0);

    /* ============================================================ */
    /* VALIDATE IMAGES                                               */
    /* ============================================================ */

    if (imageFiles.length > 5) {
      return {
        success: false,
        message: "You can upload a maximum of 5 images.",
        errors: {
          images: "Maximum 5 images are allowed.",
        },
      };
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    for (const file of imageFiles) {
      if (!allowedTypes.includes(file.type)) {
        return {
          success: false,
          message: "Only JPG, PNG and WEBP images are allowed.",
          errors: {
            images: "Only JPG, PNG and WEBP images are allowed.",
          },
        };
      }

      /*
       * 10 MB per image
       */
      if (file.size > 10 * 1024 * 1024) {
        return {
          success: false,
          message: "Each image must be smaller than 10MB.",
          errors: {
            images: "Each image must be smaller than 10MB.",
          },
        };
      }
    }

    /* ============================================================ */
    /* CONNECT DATABASE                                              */
    /* ============================================================ */

    await connectToDatabase();

    /* ============================================================ */
    /* CLOUDINARY UPLOAD                                             */
    /* ============================================================ */

    const imageUrls: string[] = [];

    /*
     * Your existing Cloudinary upload code should go here.
     *
     * The important part is that each uploaded image should
     * eventually push its secure URL into imageUrls.
     */

    /*
    for (const file of imageFiles) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const result = await uploadToCloudinary(buffer);

      imageUrls.push(result.secure_url);
    }
    */

    /* ============================================================ */
    /* CREATE BUY-BACK REQUEST                                       */
    /* ============================================================ */

    await BuyBackRequest.create({
      ...parsed.data,

      userId: uid,

      images: imageUrls,
    });

    /* ============================================================ */
    /* SUCCESS                                                       */
    /* ============================================================ */

    return {
      success: true,
      message:
        "Your trade-in request has been submitted successfully. Our team will review your device and contact you shortly.",
    };
  } catch (error) {
    console.error("Buy-back request error:", error);

    return {
      success: false,
      message:
        "Something went wrong while submitting your trade-in request. Please try again.",
    };
  }
}