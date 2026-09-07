"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

import type { ProductType } from "@/types/product"

interface ProductsMarqueeProps {
  products: ProductType[]
}

export function ProductsMarquee({
  products,
}: ProductsMarqueeProps) {
  if (!Array.isArray(products) || products.length === 0) {
    return null
  }

  /*
   * Create MANY copies to ensure seamless looping.
   * Moving 1/6th of the total width perfectly resets the track.
   */
  const items = [
    ...products,
    ...products,
    ...products,
    ...products,
    ...products,
    ...products,
  ]

  return (
    <section className="w-full overflow-hidden bg-violet-900 py-3 md:py-10">

      <div className="relative w-full overflow-hidden">


        {/* Track */}
        <motion.div
          className="flex w-max items-start gap-4 sm:gap-6 md:gap-10"
          animate={{
            x: [
              "0%",
              `-${100 / 6}%`,
            ],
          }}
          transition={{
            duration: 25,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          {items.map((product, index) => (
            <Link
              key={`${product._id}-${index}`}
              href={`/shop/${product.slug}`}
              className="
                group
                w-[90px]
                shrink-0
                sm:w-[120px]
                md:w-[140px]
              "
            >
              <div className="flex flex-col items-center">

                {/* Product Circle - Scaled down for mobile-first sizing */}
                <div
                  className="
                    relative
                    h-[90px]
                    w-[90px]
                    overflow-hidden
                    rounded-full
                    border
                    border-gray-200
                    bg-gray-50
                    transition-all
                    duration-500

                    group-hover:scale-105
                    group-hover:border-gray-400
                    group-hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)]

                    sm:h-[120px]
                    sm:w-[120px]

                    md:h-[140px]
                    md:w-[140px]
                  "
                >
                  <Image
                    src={
                      product.images?.[0] ||
                      product.image ||
                      "/placeholder.svg"
                    }
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 90px, (max-width: 768px) 120px, 140px"
                    className="
                      object-cover
                      transition-transform
                      duration-700
                      group-hover:scale-110
                    "
                  />

                  {/* Hover Overlay */}
                  <div
                    className="
                      absolute
                      inset-0
                      rounded-full
                      bg-black/0
                      transition-colors
                      duration-500
                      group-hover:bg-black/5
                    "
                  />
                </div>

                {/* Product Name - Smaller text and adjusted margins */}
                <h3
                  className="
                    mt-2
                    w-full
                    truncate
                    text-center
                    text-xs
                    font-medium
                    text-white/80
                    transition-colors
                    duration-300
                    group-hover:text-gray-600
                    sm:mt-3
                    sm:text-sm
                    sm:font-semibold
                  "
                >
                  {product.name}
                </h3>

              </div>
            </Link>
          ))}
        </motion.div>

      </div>

    </section>
  )
}