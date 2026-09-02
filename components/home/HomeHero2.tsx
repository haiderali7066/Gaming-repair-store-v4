"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Clock, ShieldCheck, Wrench, ChevronLeft, ChevronRight } from "lucide-react"

interface Slide {
  id: number
  image: string
  href: string
  alt: string
}

const slides: Slide[] = [
  {
    id: 1,
    image: "https://res.cloudinary.com/dvu9vmcqd/image/upload/v1788356738/1_jlhnci.png",
    href: "/repair",
    alt: "Console and Hardware Repairs",
  },
  {
    id: 2,
    image: "https://res.cloudinary.com/dvu9vmcqd/image/upload/v1788356744/2_rjhkea.png",
    href: "/shop",
    alt: "Gaming Gear & Accessories",
  },
  {
    id: 3,
    image: "https://res.cloudinary.com/dvu9vmcqd/image/upload/v1788356743/3_pndjav.png",
    href: "/repair",
    alt: "Custom PC Building and Tuning",
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

export function HomeHero() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(timer)
  }, [nextSlide])

  return (
    <div className="w-full ">
      {/* 1. HERO CAROUSEL SECTION */}
      <section className="relative w-full aspect-[16/9] sm:aspect-[21/9] md:h-[75vh] min-h-[260px] max-h-[640px] overflow-hidden group">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0 size-full"
          >
            <Link
              href={slides[currentIndex].href}
              className="relative block size-full cursor-pointer focus:outline-none"
              aria-label={`Go to ${slides[currentIndex].href}`}
            >
              <Image
                src={slides[currentIndex].image}
                alt={slides[currentIndex].alt}
                fill
                priority={currentIndex === 0}
                quality={90}
                className="object-cover object-center"
                sizes="100vw"
              />
              {/* Subtle overlay gradient for image depth */}
              {/* <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/20 pointer-events-none" /> */}
            </Link>
          </motion.div>
        </AnimatePresence>

        {/* Desktop Controls (Appears on Hover) */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center size-11 rounded-full bg-black/40 backdrop-blur-md text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-violet-600 hover:border-violet-500"
          aria-label="Previous slide"
        >
          <ChevronLeft className="size-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center size-11 rounded-full bg-black/40 backdrop-blur-md text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-violet-600 hover:border-violet-500"
          aria-label="Next slide"
        >
          <ChevronRight className="size-6" />
        </button>

        {/* Slide Navigation Dots */}
        <div className="absolute bottom-10 sm:bottom-14 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10 shadow-lg">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setCurrentIndex(index)
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? "w-6 sm:w-8 bg-violet-500 shadow-[0_0_12px_rgba(139,92,246,0.9)]"
                  : "w-2 bg-white/40 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 2. SERVICE HIGHLIGHTS SECTION (SEPARATE CONTAINER) */}
      <section className="relative z-30 bg-slate-50 border-t border-violet-500/20 pb-12 pt-0">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            className="-mt-10 sm:-mt-12 md:-mt-14 bg-white rounded-2xl sm:rounded-3xl shadow-xl shadow-slate-200/70 p-5 sm:p-6 md:p-8 border border-slate-100"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
              
              <div className="text-slate-400 font-extrabold uppercase tracking-widest text-[11px] sm:text-xs border-b md:border-b-0 md:border-r border-slate-100 pb-3 md:pb-0 md:pr-4">
                Why Customers Choose Us
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-violet-50 rounded-2xl shrink-0 text-violet-600">
                  <Clock className="size-6" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm sm:text-base">Fast Turnaround</h4>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                    Get your device back sooner
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-violet-50 rounded-2xl shrink-0 text-violet-600">
                  <Wrench className="size-6" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm sm:text-base">Expert Technicians</h4>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                    Skilled hardware specialists
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-violet-50 rounded-2xl shrink-0 text-violet-600">
                  <ShieldCheck className="size-6" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm sm:text-base">Quality Parts</h4>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                    Reliable replacement components
                  </p>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}