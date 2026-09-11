"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import type { ProductType } from "@/types/product";
import { Clock, ShieldCheck, Wrench } from "lucide-react";

interface ProductsMarqueeProps {
  products: ProductType[];
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export function ProductsMarquee({ products }: ProductsMarqueeProps) {
  if (!Array.isArray(products) || products.length === 0) {
    return null;
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
  ];

  return ( <>
    <section className="relative w-full overflow-hidden bg-[#05030a] py-4 sm:py-6 md:py-10">
      {" "}
      {/* Premium violet gradient background */}{" "}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(139,92,246,0.28),transparent_55%)]" />{" "}
      <div className="pointer-events-none absolute -left-32 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-violet-700/20 blur-[100px]" />{" "}
      <div className="pointer-events-none absolute -right-32 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-purple-600/20 blur-[100px]" />{" "}
      {/* Subtle violet gradient lines */}{" "}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/70 to-transparent" />{" "}
      <div className="relative w-full overflow-hidden">
        {" "}
        <motion.div
          className="flex w-max items-start gap-3 sm:gap-5 md:gap-8"
          animate={{ x: ["0%", `-${100 / 6}%`] }}
          transition={{
            duration: 28,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          {" "}
          {items.map((product, index) => (
            <Link
              key={`${product._id}-${index}`}
              href={`/shop/${product.slug}`}
              className="group w-[82px] shrink-0 sm:w-[110px] md:w-[135px] lg:w-[150px]"
            >
              {" "}
              <div className="flex flex-col items-center">
                {" "}
                {/* Product image */}{" "}
                <div className=" relative h-[82px] w-[82px] overflow-hidden rounded-full border border-white/10 bg-[#0c0912] shadow-[0_0_20px_rgba(124,58,237,0.08)] transition-all duration-500 group-hover:scale-105 group-hover:border-violet-400/50 group-hover:shadow-[0_0_30px_rgba(139,92,246,0.35)] sm:h-[110px] sm:w-[110px] md:h-[135px] md:w-[135px] lg:h-[150px] lg:w-[150px] ">
                  {" "}
                  <Image
                    src={
                      product.images?.[0] || product.image || "/placeholder.svg"
                    }
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 82px, (max-width: 768px) 110px, (max-width: 1024px) 135px, 150px"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />{" "}
                  {/* Dark image overlay */}{" "}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/50 via-transparent to-violet-500/5" />{" "}
                  {/* Violet inner ring */}{" "}
                  <div className="absolute inset-1 rounded-full border border-violet-300/10 transition-all duration-500 group-hover:border-violet-400/40" />{" "}
                  {/* Hover shine */}{" "}
                  <div className="absolute inset-0 -translate-x-full rounded-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />{" "}
                </div>{" "}
                {/* Product name */}{" "}
                <h3 className=" mt-2 w-full truncate text-center text-[10px] font-medium text-white/70 transition-colors duration-300 group-hover:text-violet-300 sm:mt-3 sm:text-xs md:text-sm md:font-semibold ">
                  {" "}
                  {product.name}{" "}
                </h3>{" "}
              </div>{" "}
            </Link>
          ))}{" "}
        </motion.div>{" "}
      </div>{" "}
      {/* Bottom violet gradient */}{" "}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />{" "}
      {/* Bottom fade */}{" "}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/20 to-transparent" />{" "}
    </section>
    {/* SERVICE HIGHLIGHTS SECTION (SEPARATE CONTAINER) */}
      <section className="relative z-30 bg-slate-50 border-t border-violet-500/20 pb-5 pt-0 hidden md:block">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            className="-mt-4 sm:-mt-6 md:-mt-8 bg-white rounded-2xl sm:rounded-3xl shadow-xl shadow-slate-200/70 p-4 sm:p-5 md:p-6 border border-slate-100"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 items-center justify-items-center">
              {/* Why Choose Us - Centered horizontally & vertically */}
              <div className="w-full h-full text-center flex items-center justify-center text-slate-400 font-extrabold uppercase tracking-widest text-[11px] sm:text-xs border-b lg:border-b-0 lg:border-r border-slate-100 pb-3 lg:pb-0 lg:pr-4">
                Why Customers Choose Us
              </div>

              {/* Fast Turnaround */}
              <div className="flex items-center justify-center gap-3 lg:gap-4 w-full">
                <div className="p-2.5 bg-violet-50 rounded-xl shrink-0 text-violet-600">
                  <Clock className="size-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Fast Turnaround
                  </h4>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Get your device back sooner
                  </p>
                </div>
              </div>

              {/* Expert Technicians */}
              <div className="flex items-center justify-center gap-3 lg:gap-4 w-full">
                <div className="p-2.5 bg-violet-50 rounded-xl shrink-0 text-violet-600">
                  <Wrench className="size-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Expert Technicians
                  </h4>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Skilled hardware specialists
                  </p>
                </div>
              </div>

              {/* Quality Parts */}
              <div className="flex items-center justify-center gap-3 lg:gap-4 w-full">
                <div className="p-2.5 bg-violet-50 rounded-xl shrink-0 text-violet-600">
                  <ShieldCheck className="size-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Quality Parts
                  </h4>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Reliable replacement components
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section> 
      </>
  );
}
