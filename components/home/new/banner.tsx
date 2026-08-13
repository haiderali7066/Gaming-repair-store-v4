"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Gamepad2, RefreshCcw } from "lucide-react";

export default function TradeInBanner() {
  return (
    // Expanded width: uses max-w-[1536px] (2xl) to allow the banner to stretch much wider
    <section className="py-16 px-4 sm:px-6 lg:px-8 w-full max-w-[1536px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative w-full min-h-[450px] md:min-h-[500px] lg:min-h-[550px] bg-slate-950 rounded-[2.5rem] md:rounded-[4rem] overflow-hidden flex flex-col md:flex-row shadow-[0_30px_60px_rgba(0,0,0,0.6)] border border-slate-800 group"
      >
        {/* Abstract Tech Network Background */}
        <div className="absolute inset-0 opacity-25 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to right, #475569 1px, transparent 1px), linear-gradient(to bottom, #475569 1px, transparent 1px)",
              backgroundSize: "4rem 4rem",
              maskImage:
                "radial-gradient(ellipse 70% 80% at 30% 50%, #000 10%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 70% 80% at 30% 50%, #000 10%, transparent 100%)",
            }}
          />
          {/* Animated Glowing Nodes */}
          <motion.div
            animate={{ y: [0, -15, 0], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-16 left-12 w-2.5 h-2.5 bg-cyan-400 rounded-full shadow-[0_0_20px_4px_rgba(34,211,238,0.9)]"
          />
          <motion.div
            animate={{ y: [0, 15, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-24 left-[28%] w-2.5 h-2.5 bg-violet-400 rounded-full shadow-[0_0_20px_4px_rgba(167,139,250,0.9)]"
          />
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute top-1/2 left-[35%] w-1.5 h-1.5 bg-fuchsia-400 rounded-full shadow-[0_0_15px_3px_rgba(232,121,249,0.9)]"
          />
        </div>

        {/* LEFT SIDE: Content */}
        <div className="relative z-10 w-full md:w-[55%] lg:w-[50%] p-8 md:p-14 lg:p-20 flex flex-col justify-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <RefreshCcw className="w-5 h-5 text-cyan-400 animate-[spin_4s_linear_infinite]" />
            <span className="text-cyan-400 font-bold tracking-[0.25em] text-xs md:text-sm uppercase drop-shadow-md">
              Trade-In Program
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6 uppercase tracking-tight">
            Level Up Your <br />
            {/* FAST TEXT COLOR ANIMATION */}
            <motion.span
              animate={{ backgroundPosition: ["0% 50%", "200% 50%"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: "200% auto" }}
              className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-cyan-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.4)]"
            >
              Gaming Gear
            </motion.span>
          </h2>

          <p className="text-slate-300 text-lg md:text-xl font-medium mb-10 max-w-lg leading-relaxed border-l-4 border-fuchsia-500 pl-5">
            Experts in valuing and trading all leading gaming PCs, consoles, and
            electronic device brands.
          </p>

          {/* Styled Tech Bottom Box (Dashboard Card style) */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700 rounded-2xl p-5 md:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-[inset_0_2px_20px_rgba(0,0,0,0.5)] relative overflow-hidden group/card">
            
            {/* Animated sweeping shine effect on the card */}
            <div className="absolute top-0 -inset-full h-full w-1/2 z-0 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover/card:animate-[shine_1.5s_ease-in-out]"></div>
            
            <style jsx>{`
              @keyframes shine {
                100% { left: 200%; opacity: 1; }
              }
            `}</style>

            <div className="flex items-center gap-5 relative z-10">
              <div className="w-14 h-14 rounded-full bg-violet-600/20 border border-violet-400/30 flex items-center justify-center text-violet-300 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                <Gamepad2 className="w-7 h-7" />
              </div>
              <div>
                <p className="text-white font-black text-base md:text-lg tracking-wide">
                  Top Market Value
                </p>
                <p className="text-slate-400 text-sm font-medium">
                  Instant quotes & easy upgrades
                </p>
              </div>
            </div>

            <Link href="/buy-back" className="relative z-10 w-full sm:w-auto">
              <button className="w-full sm:w-auto bg-gradient-to-r from-fuchsia-600 to-violet-600 hover:from-fuchsia-500 hover:to-violet-500 text-white font-extrabold py-4 px-8 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 shadow-[0_0_25px_rgba(192,38,211,0.5)] hover:shadow-[0_0_40px_rgba(192,38,211,0.8)] hover:-translate-y-1 group/btn text-lg">
                Get Quote
                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1.5 transition-transform" />
              </button>
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE: Image & Curved UI */}
        <div className="relative w-full md:w-[45%] lg:w-[50%] min-h-[350px] md:min-h-full mt-10 md:mt-0">
          {/* 
            The Curved Cutout Effect: Uses rounded-l-[150px] or larger to mimic the neon ring cutout.
          */}
          <div className="absolute inset-0 md:-left-16 lg:-left-24 bg-slate-900 md:rounded-l-[200px] overflow-hidden border-t-2 md:border-t-0 md:border-l-[6px] border-cyan-500/60 shadow-[-20px_0_50px_rgba(0,0,0,0.6)] z-0 group-hover:border-fuchsia-500/80 transition-colors duration-700">
            {/* 
              IMAGE PLACEHOLDER: 
              Replace the src with your actual hardware composition image.
            */}
            <Image
              src="https://blog-cdn.el.olx.com.pk/wp-content/uploads/2022/03/14125329/Gaming.jpg" // <-- Replace with your image
              alt="Gaming Hardware Trade In"
              fill
              className="object-cover object-center opacity-70 mix-blend-lighten group-hover:scale-110 group-hover:opacity-90 transition-all duration-1000"
              sizes="(max-width: 768px) 100vw, 50vw"
            />

            {/* Gradients to blend the image perfectly into the dark background */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-transparent to-transparent opacity-90"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950 opacity-50"></div>
            
            {/* Animated Pulsing Ring Edge Glow */}
            <motion.div 
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-cyan-400/40 to-transparent blur-xl pointer-events-none group-hover:from-fuchsia-400/50 transition-colors duration-700"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}