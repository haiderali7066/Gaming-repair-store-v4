export type ProductType = {
  _id: string

  name: string

  slug: string

  category: string

  brand: string

  price: number

  stock: number

  image: string

  images: string[]

  description: string

  featured: boolean

  published: boolean

  used: boolean

  specifications: Record<
    string,
    string
  >
}