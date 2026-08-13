"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowRight, Clock, Wrench, ShieldCheck } from "lucide-react";
import { HeroSection } from "./new/Hero";

// 1. Fallback data to prevent undefined errors
const defaultHeroSlides = [
   {
    eyebrow: "GAMING PC SPECIALISTS",
    heading: "Expert Gaming PC Repairs. Built to Perform.",
    content:
      "From hardware faults and overheating to upgrades and performance issues, our technicians diagnose and repair your gaming PC with care.",
    buttons: [
      { text: "Book a Repair", link: "/repair", primary: true },
      { text: "View Services", link: "/repair", primary: false },
    ],
    highlights: ["Expert Technicians", "Quality Parts", "Repair Warranty"],
    image:
      "https://res.cloudinary.com/dvu9vmcqd/image/upload/v1786215929/pc1_uax7vw.png",
  },
  {
    eyebrow: "GAMING LAPTOP REPAIR",
    heading: "Get Your Gaming Laptop Back in Action.",
    content:
      "Professional repairs for gaming laptops, including display, battery, charging, overheating, motherboard, keyboard and performance issues.",
    buttons: [
      { text: "Book a Repair", link: "/repair", primary: true },
      { text: "Track Repair", link: "/contact", primary: false },
    ],
    highlights: [
      "Fast Diagnostics",
      "Professional Service",
      "Quality Replacement Parts",
    ],
    image:
      "https://res.cloudinary.com/dvu9vmcqd/image/upload/v1786215936/lp1_zen7mw.png",
  },
  {
    eyebrow: "UPGRADE YOUR SETUP",
    heading: "Power Up Your Gaming Experience.",
    content:
      "Shop gaming PCs, laptops, components, peripherals and accessories to build or upgrade your ultimate gaming setup.",
    buttons: [
      { text: "Shop Products", link: "/shop", primary: true },
      { text: "Explore Gaming", link: "/shop", primary: false },
    ],
    highlights: ["Gaming PCs", "Gaming Laptops", "Accessories"],
    image:
      "https://res.cloudinary.com/dvu9vmcqd/image/upload/v1786215923/key-m_zhfofl.png",
  },
];



const defaultBrands = [
  "ASUS ROG",
  "Alienware",
  "MSI",
  "Razer",
  "Corsair",
  "Logitech G",
  "HyperX",
  "Gigabyte",
  "Intel",
  "AMD Ryzen",
  "NVIDIA",
];



const defaultFadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export  function HomeHero({ 
  heroSlides = defaultHeroSlides, 
  brands = defaultBrands, 
  fadeUp = defaultFadeUp 
}: any) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // 2. Safety check: If for some reason heroSlides is explicitly set to null/empty, don't crash
  if (!heroSlides || heroSlides.length === 0) {
    return null;
  }

  // Ensure currentSlide is within bounds (in case data changes dynamically)
  const safeSlideIndex = currentSlide >= heroSlides.length ? 0 : currentSlide;

  return (
    <>

    <HeroSection/>


      {/* 1. HERO SECTION */}
      {/* <section className="relative w-full min-h-[90vh] flex items-center bg-white overflow-hidden">
        <div
          className="absolute top-0 right-0 h-full w-[60%] lg:w-[50%] bg-gradient-to-bl from-violet-600 to-violet-800 z-0 origin-top-right transition-all duration-700 hidden md:block"
          style={{ clipPath: "polygon(15% 0, 100% 0, 100% 100%, 0% 100%)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-violet-50 md:hidden z-0" />

        <div className="container mx-auto px-6 lg:px-12 grid md:grid-cols-2 gap-12 items-center h-full relative z-10 py-24 md:py-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${safeSlideIndex}`}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="max-w-xl z-10 text-center md:text-left"
            >
              <span className="inline-block py-1.5 px-4 rounded-full bg-violet-100 text-violet-700 font-bold tracking-wider text-xs uppercase mb-6 shadow-sm">
                {heroSlides[safeSlideIndex].eyebrow}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-black leading-[1.1] text-slate-900 mb-6 tracking-tight">
                {heroSlides[safeSlideIndex].heading}
              </h1>
              <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-lg mx-auto md:mx-0 font-medium">
                {heroSlides[safeSlideIndex].content}
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-10 justify-center md:justify-start">
                {heroSlides[safeSlideIndex].buttons?.[0] && (
                  <Link href={heroSlides[safeSlideIndex].buttons[0].link}>
                    <button className="w-full sm:w-auto bg-violet-700 hover:bg-violet-800 text-white px-8 py-4 rounded-full font-bold transition-all shadow-xl shadow-violet-500/30 flex items-center justify-center gap-2 transform hover:-translate-y-1">
                      {heroSlides[safeSlideIndex].buttons[0].text}
                    </button>
                  </Link>
                )}
                {heroSlides[safeSlideIndex].buttons?.[1] && (
                  <Link href={heroSlides[safeSlideIndex].buttons[1].link}>
                    <button className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-900 px-8 py-4 rounded-full font-bold transition-all flex items-center justify-center gap-2 border-2 border-slate-200 transform hover:-translate-y-1 shadow-sm">
                      {heroSlides[safeSlideIndex].buttons[1].text}{" "}
                      <ArrowRight className="w-5 h-5 text-violet-600" />
                    </button>
                  </Link>
                )}
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-3 items-center justify-center md:justify-start text-sm font-bold text-slate-700">
                {heroSlides[safeSlideIndex].highlights?.map((highlight: string, idx: number) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 bg-slate-50 md:bg-transparent px-3 py-1 md:p-0 rounded-full"
                  >
                    <CheckCircle2 className="w-5 h-5 text-violet-600" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={`image-${safeSlideIndex}`}
              initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative h-[300px] md:h-[500px] lg:h-[650px] w-full flex items-center justify-center drop-shadow-2xl z-10"
            >
              <img
                src={heroSlides[safeSlideIndex].image}
                alt="Gaming Device"
                className="max-w-full max-h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="absolute bottom-6 md:bottom-10 left-1/2 md:left-12 -translate-x-1/2 md:translate-x-0 flex gap-3 z-20">
          {heroSlides.map((_: any, idx: number) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === safeSlideIndex ? "bg-violet-700 w-10" : "bg-slate-300 md:bg-slate-300/50 w-3 hover:bg-violet-400"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section> */}

      

      

      

      {/* 3. SERVICE HIGHLIGHTS */}
      <section className="container mx-auto px-6 -mt-8 relative z-30">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-6 md:p-8 flex flex-col md:flex-row flex-wrap lg:flex-nowrap justify-between gap-6 md:gap-8 items-start md:items-center border border-slate-100"
        >
          <div className="w-full lg:w-auto text-slate-500 font-black uppercase tracking-widest text-xs">
            Why Customers Choose Us
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-violet-50 rounded-xl">
              <Clock className="w-6 h-6 text-violet-600" />
            </div>
            <div>
              <h4 className="font-extrabold text-slate-900">Fast Turnaround</h4>
              <p className="text-sm text-slate-500 font-medium">
                Get your device back sooner
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-violet-50 rounded-xl">
              <Wrench className="w-6 h-6 text-violet-600" />
            </div>
            <div>
              <h4 className="font-extrabold text-slate-900">Expert Technicians</h4>
              <p className="text-sm text-slate-500 font-medium">
                Skilled hardware specialists
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-violet-50 rounded-xl">
              <ShieldCheck className="w-6 h-6 text-violet-600" />
            </div>
            <div>
              <h4 className="font-extrabold text-slate-900">Quality Parts</h4>
              <p className="text-sm text-slate-500 font-medium">
                Reliable replacement components
              </p>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}