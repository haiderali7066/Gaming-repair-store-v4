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
  const rawData = Object.fromEntries(formData.entries());

  const parsed = repairSchema.safeParse(rawData);

  if (!parsed.success) {
    return {
      success: false,
      message: "Please complete all required repair details.",
      errors: parsed.error.flatten().fieldErrors as Record<string, string>,
    };
  }

  try {
    await connectToDatabase();

    await RepairRequest.create({
      ...parsed.data,
      userId: await userId(),
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
      specifications:
        formData.get("specifications")?.toString() || "",
      description: formData.get("description")?.toString() || "",
      name: formData.get("name")?.toString() || "",
      idNumber: formData.get("idNumber")?.toString() || "",
      phone: formData.get("phone")?.toString() || "",
      expectedPrice:
        formData.get("expectedPrice")?.toString() || "",
      servicePreference:
        formData.get("servicePreference")?.toString() || "",
    };

    /* ============================================================ */
    /* VALIDATE FORM                                                 */
    /* ============================================================ */

    const parsed = buyBackSchema.safeParse(rawData);

    if (!parsed.success) {
      const fieldErrors =
        parsed.error.flatten().fieldErrors;

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
      .filter(
        (file): file is File =>
          file instanceof File && file.size > 0
      );

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

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    for (const file of imageFiles) {
      if (!allowedTypes.includes(file.type)) {
        return {
          success: false,
          message:
            "Only JPG, PNG and WEBP images are allowed.",
          errors: {
            images:
              "Only JPG, PNG and WEBP images are allowed.",
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

      userId: await userId(),

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