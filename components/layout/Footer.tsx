"use client"

import React from "react"
import Link from "next/link"
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaArrowRight
} from "react-icons/fa"

// Changed to a NAMED export to match your layout.tsx import { Footer }
export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer 
      className="bg-slate-950 text-slate-300 relative overflow-hidden font-sans border-t border-slate-900"
      style={{ fontFamily: "'Roboto', sans-serif" }}
    >
      {/* Background Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-violet-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8 relative z-10">
        
        {/* ================= MAIN GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand & Intro (Spans 4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-block">
              <h2 className="text-3xl font-black text-white tracking-tight">
                AL DANA<span className="text-violet-500">.</span>
              </h2>
            </Link>
            <p className="text-slate-400 font-medium leading-relaxed max-w-sm">
              Professional tech repair and reliable solutions. We get your gaming PCs, laptops, and mobile devices back to peak performance.
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-4 pt-2">
              {[
                { icon: FaFacebookF, href: "#" },
                { icon: FaTwitter, href: "#" },
                { icon: FaInstagram, href: "#" },
                { icon: FaLinkedinIn, href: "#" }
              ].map((social, idx) => (
                <a 
                  key={idx} 
                  href={social.href} 
                  className="size-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-violet-600 hover:text-white hover:border-violet-600 hover:-translate-y-1 transition-all duration-300"
                >
                  <social.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links (Spans 2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-lg font-bold text-white uppercase tracking-wider">Company</h3>
            <ul className="space-y-4 font-medium">
              {[
                { name: "About Us", path: "/about" },
                { name: "Our Services", path: "/services" },
                { name: "Trade-In Program", path: "/buy-back" },
                { name: "Contact Support", path: "/contact" }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link 
                    href={link.path} 
                    className="text-slate-400 hover:text-violet-400 transition-colors flex items-center gap-2 group"
                  >
                    <FaArrowRight className="size-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links (Spans 3 cols) */}
          <div className="lg:col-span-3 space-y-6">
            <h3 className="text-lg font-bold text-white uppercase tracking-wider">Expertise</h3>
            <ul className="space-y-4 font-medium">
              {[
                { name: "Gaming PC Repair", path: "/services#gaming-pc" },
                { name: "Laptop Diagnostics", path: "/services#laptop" },
                { name: "iPad & Tablet Repair", path: "/services#tablet" },
                { name: "Deep Cleaning & Thermal", path: "/services#deep-cleaning" }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link 
                    href={link.path} 
                    className="text-slate-400 hover:text-fuchsia-400 transition-colors flex items-center gap-2 group"
                  >
                    <FaArrowRight className="size-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info (Spans 3 cols) */}
          <div className="lg:col-span-3 space-y-6">
            <h3 className="text-lg font-bold text-white uppercase tracking-wider">Get in Touch</h3>
            <ul className="space-y-5 font-medium">
              <li className="flex items-start gap-3 text-slate-400 hover:text-white transition-colors group">
                <FaMapMarkerAlt className="size-5 text-violet-500 mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                <span>123 Tech Avenue, Industrial Area 1, Dubai, UAE</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors group">
                <FaPhoneAlt className="size-4 text-violet-500 shrink-0 group-hover:scale-110 transition-transform" />
                <a href="tel:+971501234567">+971 50 123 4567</a>
              </li>
              <li className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors group">
                <FaEnvelope className="size-4 text-violet-500 shrink-0 group-hover:scale-110 transition-transform" />
                <a href="mailto:support@aldana.com">support@aldana.com</a>
              </li>
            </ul>
          </div>

        </div>

        {/* ================= BOTTOM BAR ================= */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-medium">
          
          <div className="text-slate-500 text-center md:text-left">
            &copy; {currentYear} Al Dana Tech Repair. All rights reserved.
          </div>
          
          <div className="flex items-center gap-6 text-slate-500">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>

          {/* Developer Credit */}
          <div className="text-slate-500 flex items-center gap-1.5 bg-slate-900/50 px-4 py-2 rounded-full border border-slate-800">
            Developed by 
            <a 
              href="https://devntomsolutions.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-violet-400 font-bold hover:text-fuchsia-400 transition-colors drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]"
            >
              devntomsolutions.com
            </a>
          </div>

        </div>
      </div>
    </footer>
  )
}