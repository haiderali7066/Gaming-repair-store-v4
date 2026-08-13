"use client"

import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react"
import { useEffect, useState } from "react"

import { heroSlides } from "./home-data"

const fade = {
  initial: { opacity: 0, x: -24 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 24 },
}

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentSlide((current) =>
        current === heroSlides.length - 1 ? 0 : current + 1,
      )
    }, 6500)

    return () => window.clearInterval(timer)
  }, [])

  const slide = heroSlides[currentSlide]

  return (
    <section className="relative isolate overflow-hidden bg-slate-950 text-white mt-10 ">
      <div className="absolute -left-40 top-20 -z-10 size-[28rem] rounded-full bg-violet-700/30 blur-[120px]" />
      <div className="absolute -right-40 bottom-0 -z-10 size-[30rem] rounded-full bg-indigo-600/20 blur-[140px]" />

      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px)",
          backgroundSize: "4rem 4rem",
          maskImage:
            "radial-gradient(ellipse at center, black 20%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 20%, transparent 80%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_.98fr]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={fade.initial}
              animate={fade.animate}
              exit={fade.exit}
              transition={{ duration: 0.5 }}
              className="max-w-2xl"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-violet-300 sm:text-xs">
                <Sparkles className="size-3.5" />
                {slide.eyebrow}
              </span>

              <h1 className="mt-6 text-4xl text-white leading-[1.02] tracking-tight sm:text-5xl lg:text-7xl">
                {slide.heading}
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                {slide.content}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={slide.primary.link}
                  className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 text-sm font-bold text-white shadow-lg shadow-violet-900/30 transition hover:bg-violet-500"
                >
                  {slide.primary.text}
                  <ArrowRight className="size-4 transition group-hover:translate-x-1" />
                </Link>

                <Link
                  href={slide.secondary.link}
                  className="inline-flex h-12 items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] px-6 text-sm font-bold backdrop-blur transition hover:bg-white/[0.08]"
                >
                  {slide.secondary.text}
                </Link>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  "Expert Technicians",
                  "Quality Components",
                  "Performance Focus",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 text-xs font-semibold text-slate-300"
                  >
                    <CheckCircle2 className="size-4 text-violet-400" />
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-10 flex items-center gap-2">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    aria-label={`Go to slide ${index + 1}`}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-1.5 rounded-full transition-all ${
                      currentSlide === index
                        ? "w-10 bg-violet-500"
                        : "w-2.5 bg-white/20 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={`image-${currentSlide}`}
              initial={{ opacity: 0, scale: 0.92, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 1.04, x: -20 }}
              transition={{ duration: 0.6 }}
              className="relative flex min-h-[320px] items-center justify-center lg:min-h-[560px]"
            >
              <div className="absolute size-[20rem] rounded-full bg-violet-600/20 blur-[100px] sm:size-[28rem]" />

              <img
                src={slide.image}
                alt={slide.heading}
                className="relative z-10 max-h-[460px] max-w-full object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,.55)] lg:max-h-[560px]"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}