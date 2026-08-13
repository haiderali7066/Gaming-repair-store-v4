"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Wrench, ShieldCheck } from "lucide-react";

export default function RepairBanner() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 w-full max-w-[1536px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative w-full min-h-[450px] md:min-h-[500px] lg:min-h-[550px] bg-slate-950 rounded-[2.5rem] md:rounded-[4rem] overflow-hidden flex flex-col md:flex-row shadow-[0_30px_60px_rgba(0,0,0,0.6)] border border-slate-800 group"
      >
        {/* Abstract Tech Network Background */}
        <div className="absolute inset-0 opacity-25 pointer-events-none z-0">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to right, #475569 1px, transparent 1px), linear-gradient(to bottom, #475569 1px, transparent 1px)",
              backgroundSize: "4rem 4rem",
              maskImage:
                "radial-gradient(ellipse 70% 80% at 70% 50%, #000 10%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 70% 80% at 70% 50%, #000 10%, transparent 100%)",
            }}
          />
          {/* Animated Glowing Nodes */}
          <motion.div
            animate={{ y: [0, -15, 0], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 right-12 w-2.5 h-2.5 bg-violet-400 rounded-full shadow-[0_0_20px_4px_rgba(167,139,250,0.9)]"
          />
          <motion.div
            animate={{ y: [0, 15, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-24 right-[28%] w-2.5 h-2.5 bg-cyan-400 rounded-full shadow-[0_0_20px_4px_rgba(34,211,238,0.9)]"
          />
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute top-1/2 right-[35%] w-1.5 h-1.5 bg-fuchsia-400 rounded-full shadow-[0_0_15px_3px_rgba(232,121,249,0.9)]"
          />
        </div>

        {/* LEFT SIDE: Image & Curved UI (Now smaller area: 40%) */}
        {/* On mobile, image stacks on top. On desktop, it takes the left 40%. */}
        <div className="relative w-full md:w-[40%] lg:w-[40%] min-h-[300px] md:min-h-full order-1 md:order-none z-10">
          {/* 
            The Curved Cutout Effect (Reversed):
            Uses rounded-r-[150px] to curve the right edge of the image container.
          */}
          <div className="absolute inset-0 md:-right-12 lg:-right-16 bg-slate-900 md:rounded-r-[150px] overflow-hidden border-b-2 md:border-b-0 md:border-r-[6px] border-violet-500/60 shadow-[20px_0_50px_rgba(0,0,0,0.6)] z-10 group-hover:border-fuchsia-500/80 transition-colors duration-700">
            {/* 
              IMAGE PLACEHOLDER: 
              Replace the src with your actual hardware repair image.
            */}
            <Image
              src="https://cdn.mos.cms.futurecdn.net/zwXuq4g3amtVVWehRjRGJM.jpg" // <-- Replace with your image
              alt="Expert Device Repairs"
              fill
              className="object-cover object-center opacity-70 mix-blend-lighten group-hover:scale-110 group-hover:opacity-90 transition-all duration-1000"
              sizes="(max-width: 768px) 100vw, 40vw"
            />

            {/* Gradients to blend the image into the dark background */}
            <div className="absolute inset-0 bg-gradient-to-l from-slate-950 via-transparent to-transparent opacity-90"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950 opacity-50"></div>
            
            {/* Animated Pulsing Ring Edge Glow (On the right side now) */}
            <motion.div 
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 bottom-0 right-0 w-8 bg-gradient-to-l from-violet-400/40 to-transparent blur-xl pointer-events-none group-hover:from-fuchsia-400/50 transition-colors duration-700"
            />
          </div>
        </div>

        {/* RIGHT SIDE: Content (Now larger area: 60%) */}
        {/* Ordered to appear below the image on mobile, and to the right on desktop */}
        <div className="relative z-20 w-full md:w-[60%] lg:w-[60%] p-8 md:p-14 lg:p-20 flex flex-col justify-center order-2 md:order-none ml-auto">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <Wrench className="w-5 h-5 text-violet-400 animate-[bounce_2s_infinite]" />
            <span className="text-violet-400 font-bold tracking-[0.25em] text-xs md:text-sm uppercase drop-shadow-md">
              Repair Center
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6 uppercase tracking-tight">
            Expert Tech <br />
            {/* FAST TEXT COLOR ANIMATION */}
            <motion.span
              animate={{ backgroundPosition: ["0% 50%", "200% 50%"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: "200% auto" }}
              className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-500 to-cyan-400 drop-shadow-[0_0_20px_rgba(167,139,250,0.4)]"
            >
              Restoration
            </motion.span>
          </h2>

          <p className="text-slate-300 text-lg md:text-xl font-medium mb-10 max-w-2xl leading-relaxed border-l-4 border-violet-500 pl-5">
            Professional diagnostics, premium parts, and fast turnaround times for all your gaming and electronic devices.
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
              <div className="w-14 h-14 rounded-full bg-cyan-600/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div>
                <p className="text-white font-black text-base md:text-lg tracking-wide">
                  Certified Experts
                </p>
                <p className="text-slate-400 text-sm font-medium">
                  Guaranteed reliable service
                </p>
              </div>
            </div>

            <Link href="/repairs" className="relative z-10 w-full sm:w-auto">
              <button className="w-full sm:w-auto bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-extrabold py-4 px-8 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 shadow-[0_0_25px_rgba(139,92,246,0.5)] hover:shadow-[0_0_40px_rgba(139,92,246,0.8)] hover:-translate-y-1 group/btn text-lg">
                Book Repair
                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1.5 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}