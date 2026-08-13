import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

export { cloudinary }

/**
 * Uploads a single image buffer to Cloudinary and returns the secure URL.
 * Images are organized under the "al-dana/products" folder for easy management
 * in the Cloudinary dashboard.
 */
export async function uploadImageToCloudinary(buffer: Buffer, folder = "al-dana/products"): Promise<string> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder, resource_type: "image" },
      (error, result) => {
        if (error || !result) {
          reject(error || new Error("Cloudinary upload failed with no result."))
          return
        }
        resolve(result.secure_url)
      },
    ).end(buffer)
  })
}
