export type ProductType = {
  _id: string
  name: string
  slug: string
  category: string
  brand: string
  price: number
  stock: number
  image: string
  // Full gallery of image URLs; `image` (the cover photo) is always images[0].
  images: string[]
  description: string
  featured: boolean
  published: boolean
  specifications: Record<string, string>
}
