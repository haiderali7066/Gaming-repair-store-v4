"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  ShieldCheck,
  Wrench,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Slide {
  id: number;
  image: string;
  href: string;
  alt: string;
}

const slides: Slide[] = [
  
  {
    id: 4,
    image:
      "https://res.cloudinary.com/dvu9vmcqd/image/upload/v1793645375/Gaming_PC_Repair_Services_Banner_bqril0.png",
    href: "/repair#repair-form",
    alt: "Gmaing pc",
  },
  {
    id: 3,
    image:
      "https://res.cloudinary.com/dvu9vmcqd/image/upload/v1793645656/Gaming_Laptop_Repair_Banner_2160x720_u3xdtk.png",
    href: "/repair#repair-form",
    alt: "gaming Laptop ",
  },
  {
    id: 1,
    image:
      "https://res.cloudinary.com/dvu9vmcqd/image/upload/v1788773567/ChatGPT_Image_Sep_7_2026_02_31_58_PM_pdx0mh.png",
    href: "/repair#repair-form",
    alt: "ipad and Hardware Repairs",
  },
  
  {
    id: 5,
    image:
      "https://res.cloudinary.com/dvu9vmcqd/image/upload/v1793645137/Trade-In_Today_Save_More_extlcj.png",
    href: "/buy-back#trade-in-form",
    alt: "Trade in ",
  },
  {
    id: 2,
    image:
      "https://res.cloudinary.com/dvu9vmcqd/image/upload/v1788773595/ChatGPT_Image_Sep_7_2026_02_32_53_PM_polvfd.png",
    href: "/shop",
    alt: "shop products",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function HomeHero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="w-full">
      {/* 1. HERO CAROUSEL SECTION */}
     {/* HERO CAROUSEL SECTION */}
<section className="relative w-full overflow-hidden bg-black group">
  <AnimatePresence mode="wait">
    <motion.div
      key={currentIndex}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="relative w-full aspect-[2170/725]"
    >
      <Link
        href={slides[currentIndex].href}
        className="relative block w-full h-full cursor-pointer focus:outline-none"
        aria-label={`Go to ${slides[currentIndex].href}`}
      >
        <Image
          src={slides[currentIndex].image}
          alt={slides[currentIndex].alt}
          fill
          priority={currentIndex === 0}
          quality={90}
          className="object-contain"
          sizes="100vw"
        />
      </Link>
    </motion.div>
  </AnimatePresence>

  {/* Previous Button */}
  <button
    onClick={prevSlide}
    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center size-11 rounded-full bg-black/40 backdrop-blur-md text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-violet-600 hover:border-violet-500"
    aria-label="Previous slide"
  >
    <ChevronLeft className="size-6" />
  </button>

  {/* Next Button */}
  <button
    onClick={nextSlide}
    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center size-11 rounded-full bg-black/40 backdrop-blur-md text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-violet-600 hover:border-violet-500"
    aria-label="Next slide"
  >
    <ChevronRight className="size-6" />
  </button>

  {/* Slide Navigation Dots */}
<div className="absolute bottom-1 sm:bottom-1 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-2 py-1.5 sm:px-3 sm:py-2 rounded-full bg-black/20 backdrop-blur-sm border border-white/10 shadow-lg">    {slides.map((slide, index) => (
      <button
        key={slide.id}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setCurrentIndex(index);
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

      
    </div>
  );
}
