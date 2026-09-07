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
    image: "https://res.cloudinary.com/dvu9vmcqd/image/upload/v1788773567/ChatGPT_Image_Sep_7_2026_02_31_58_PM_pdx0mh.png",
    href: "/repair",
    alt: "Console and Hardware Repairs",
  },
  {
    id: 2,
    image: "https://res.cloudinary.com/dvu9vmcqd/image/upload/v1788773595/ChatGPT_Image_Sep_7_2026_02_32_53_PM_polvfd.png",
    href: "/shop",
    alt: "Gaming Gear & Accessories",
  },
  {
    id: 3,
    image: "https://res.cloudinary.com/dvu9vmcqd/image/upload/v1788766250/Gemini_Generated_Image_b2pl12b2pl12b2pl_ushuia.jpg",
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
    <div className="w-full">
      {/* 1. HERO CAROUSEL SECTION */}
      {/* Decreased desktop height from md:h-[65vh] to md:h-[55vh] */}
      <section className="relative h-48 sm:h-64 md:h-[55vh] w-full overflow-hidden bg-muted group">
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
        <div className="absolute bottom-10 sm:bottom-12 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10 shadow-lg">
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
            <h4 className="font-extrabold text-slate-900 text-sm">Fast Turnaround</h4>
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
            <h4 className="font-extrabold text-slate-900 text-sm">Expert Technicians</h4>
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
            <h4 className="font-extrabold text-slate-900 text-sm">Quality Parts</h4>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
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