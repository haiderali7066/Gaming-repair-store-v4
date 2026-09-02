
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
   * Create MANY copies.
   *
   * Example:
   *
   * 1 2 3 4 5 | 1 2 3 4 5 | 1 2 3 4 5 | 1 2 3 4 5
   *
   * We only move one complete product set.
   * When it finishes, the next identical set is already
   * in exactly the same position.
   */
  const items = [
    ...products,
    ...products,
    ...products,
    ...products,
    ...products,
    ...products,
  ]

  /*
   * One set of products.
   *
   * The actual animation moves the first set away and
   * immediately continues with the identical next set.
   */
  const singleSetWidth = products.length

  return (
    <section className="w-full overflow-hidden bg-white py-14 md:py-20">

      <div className="relative w-full overflow-hidden">

        {/* Left Fade */}
        <div
          className="
            pointer-events-none
            absolute
            left-0
            top-0
            bottom-0
            z-20
            w-16
            sm:w-24
            md:w-40
            bg-gradient-to-r
            from-white
            to-transparent
          "
        />

        {/* Right Fade */}
        <div
          className="
            pointer-events-none
            absolute
            right-0
            top-0
            bottom-0
            z-20
            w-16
            sm:w-24
            md:w-40
            bg-gradient-to-l
            from-white
            to-transparent
          "
        />

        {/* 
          IMPORTANT:
          The track itself is much wider than the screen.
        */}
        <motion.div
          className="flex w-max items-start gap-8 sm:gap-10 md:gap-14"
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
                w-[160px]
                shrink-0
                sm:w-[180px]
                md:w-[200px]
              "
            >
              <div className="flex flex-col items-center">

                {/* Product Circle */}
                <div
                  className="
                    relative
                    h-[145px]
                    w-[145px]
                    overflow-hidden
                    rounded-full
                    border
                    border-gray-200
                    bg-gray-50
                    transition-all
                    duration-500

                    group-hover:scale-105
                    group-hover:border-gray-400
                    group-hover:shadow-[0_15px_40px_rgba(0,0,0,0.12)]

                    sm:h-[165px]
                    sm:w-[165px]

                    md:h-[185px]
                    md:w-[185px]
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
                    sizes="185px"
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
                      group-hover:bg-black/10
                    "
                  />
                </div>

                {/* Product Name */}
                <h3
                  className="
                    mt-4
                    w-full
                    truncate
                    text-center
                    text-sm
                    font-semibold
                    text-gray-900
                    transition-colors
                    duration-300
                    group-hover:text-gray-500
                    sm:text-base
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

