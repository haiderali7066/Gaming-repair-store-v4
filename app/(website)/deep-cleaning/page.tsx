"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { 
  Wrench, 
  Flame, 
  Wind, 
  Fan, 
  Cpu, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  ShieldCheck,
  Settings
} from "lucide-react"

// --- DATA STRUCTURE ---
const services = [
  {
    id: "thermal-paste-repaste",
    title: "Thermal Paste Repaste",
    subtitle: "Lower your temperatures and eliminate thermal throttling.",
    description: "Over time, factory thermal paste dries out, leading to high CPU and GPU temperatures, sudden frame drops, and loud fan noise. We clean off the old degraded paste and apply high-performance thermal compound to restore optimal heat transfer.",
    icon: Flame,
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=1000&auto=format&fit=crop",
    features: [
      "High-performance thermal compound application",
      "Heatsink contact surface polishing & cleanup",
      "CPU & GPU temperature stress testing",
      "Significant reduction in thermal throttling"
    ],
    ctaText: "Book Thermal Service"
  },
  {
    id: "liquid-metal-service",
    title: "Liquid Metal Service",
    subtitle: "Ultimate thermal conductivity for extreme performance.",
    description: "For high-end gaming rigs and enthusiast laptops, traditional paste isn't enough. We professionally apply liquid metal Gallium alloy for superior heat dissipation, dropping temperatures by up to 15°C under heavy loads.",
    icon: Cpu,
    image: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=1000&auto=format&fit=crop",
    features: [
      "Pro-grade gallium alloy application",
      "Custom non-conductive barrier protection around chips",
      "Maximum heat dissipation for high-TDP CPUs",
      "Rigorous short-circuit prevention barriers"
    ],
    ctaText: "Book Liquid Metal Service"
  },
  {
    id: "dust-debris-removal",
    title: "Dust & Debris Removal",
    subtitle: "Clear internal blockages and restore airflow.",
    description: "Dust bunnies, pet hair, and lint clog heatsink fins and trap heat inside your device. Our deep cleaning service strips down the chassis to completely clear out hidden buildup from vents, fans, and internal components.",
    icon: Wind,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROm6LZaznsb2T37fZhPrXCO4tt3D_bX4pqJ_MjPdz85RpkEeXeGqgxQGmW&s=10",
    features: [
      "Complete internal chassis disassembly & blowout",
      "Heatsink fin blockage clearing",
      "Port and motherboard dust scrubbing",
      "Improved passive and active cooling efficiency"
    ],
    ctaText: "Book Deep Cleaning"
  },
  {
    id: "fan-replacement",
    title: "Fan Replacement",
    subtitle: "Silence grinding noises and restore powerful airflow.",
    description: "Is your laptop fan making a buzzing, rattling, or jet-engine noise? A failing bearing or broken blade means your system isn't getting cooled properly. We replace worn-out cooling fans with exact OEM-spec replacements.",
    icon: Fan,
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=1000&auto=format&fit=crop",
    features: [
      "OEM-grade dual/single fan assembly replacement",
      "Bearing lubrication and alignment checks",
      "Rattle and high-pitch noise elimination",
      "Fan RPM curve optimization & testing"
    ],
    ctaText: "Book Fan Replacement"
  }
]

// Sample Brands for the Marquee
const brands = [
  "THERMAL GRIZZLY", "ARCTIC", "NOCTUA", "GPU COOLING", "COPPER HEATSINKS", 
  "LIQUID METAL", "HIGH-TDP PERFORMANCE", "THERMAL PADS",
  "THERMAL GRIZZLY", "ARCTIC", "NOCTUA", "GPU COOLING", "COPPER HEATSINKS" // Duplicated for seamless looping
]

export default function DeepCleaningThermalPage() {
  return (
    <main className="min-h-screen bg-white font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-slate-50 pt-20 pb-20 lg:pt-32 lg:pb-28 border-b border-slate-200">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-violet-200/50 rounded-full blur-[120px] opacity-60 translate-x-1/2 -translate-y-1/4" />
          <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-indigo-100/50 rounded-full blur-[100px] opacity-80 -translate-x-1/3 translate-y-1/3" />
        </div>

        <div className="container relative z-10 mx-auto px-6 lg:px-12 max-w-[90rem]">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Hero Text */}
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 border border-violet-200 text-violet-700 text-xs sm:text-sm font-extrabold tracking-widest uppercase mb-6 shadow-sm">
                <Flame className="size-4" />
                Thermal & Maintenance Services
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[1.05] mb-6">
                Expert <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">Deep Cleaning & Thermal</span> Service.
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-10 max-w-2xl font-medium">
                Is your device running hot, loud, or shutting down randomly during heavy workflows? Our thermal and deep cleaning care restores cooling performance and safeguards your hardware.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/repair" 
                  className="inline-flex justify-center items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-bold py-4 px-10 rounded-full shadow-lg shadow-violet-600/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-violet-600/40 active:scale-95 text-lg"
                >
                  Book a Service <ArrowRight className="size-5" />
                </Link>
                <a 
                  href="#services-breakdown" 
                  className="inline-flex justify-center items-center gap-2 bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-200 font-bold py-4 px-10 rounded-full transition-all duration-300 hover:border-slate-300 hover:shadow-sm active:scale-95 text-lg"
                >
                  View Services
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="mt-12 flex flex-wrap items-center gap-6 sm:gap-10 pt-8 border-t border-slate-200/60">
                <div className="flex items-center gap-2.5 text-sm sm:text-base font-bold text-slate-700">
                  <div className="p-1.5 rounded-full bg-green-100 text-green-600">
                    <ShieldCheck className="size-5" />
                  </div>
                  Quality Assured
                </div>
                <div className="flex items-center gap-2.5 text-sm sm:text-base font-bold text-slate-700">
                  <div className="p-1.5 rounded-full bg-violet-100 text-violet-600">
                    <Clock className="size-5" />
                  </div>
                  Same-Day Available
                </div>
                <div className="flex items-center gap-2.5 text-sm sm:text-base font-bold text-slate-700">
                  <div className="p-1.5 rounded-full bg-blue-100 text-blue-600">
                    <Settings className="size-5" />
                  </div>
                  Pro Compounds
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl shadow-slate-300/50 border border-slate-200/60 z-10 bg-white group">
                <Image
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr-75mIBLeQBrmMhh-7NefIYeuZgWVwXc8LgC7yFEiHn8GGNzdGWUCpYE&s=10"
                  alt="Technician servicing cooling fans and thermal paste"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent pointer-events-none" />
              </div>
              {/* Decorative dotted pattern block behind image */}
              <div className="absolute -inset-6 bg-[radial-gradient(#cbd5e1_2px,transparent_2px)] [background-size:20px_20px] -z-10 rounded-[3rem] opacity-60" />
            </div>

          </div>
        </div>
      </section>

      {/* 1.5 LOGO MARQUEE SECTION */}
      <section className="py-10 bg-slate-900 border-b border-slate-800 overflow-hidden">
        <div className="container mx-auto px-6 max-w-[90rem] mb-6 text-center">
          <p className="text-slate-400 text-sm font-bold tracking-widest uppercase">
            Using Industry-Standard Thermal Compounds & Hardware Care
          </p>
        </div>
        <div className="relative flex overflow-x-hidden w-full group">
          {/* Left/Right Fade Gradients for smooth entering/exiting */}
          <div className="absolute top-0 left-0 bottom-0 w-24 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none" />
          
          <motion.div
            className="flex whitespace-nowrap items-center gap-16 px-8"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 30, // Adjust speed here
            }}
          >
            {brands.map((brand, i) => (
              <div 
                key={i} 
                className="text-2xl sm:text-3xl font-black text-slate-700 uppercase tracking-tighter hover:text-white transition-colors duration-300"
              >
                {brand}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 2. DETAILED SERVICES SECTION */}
      <section id="services-breakdown" className="py-24 bg-white scroll-mt-20">
        <div className="container mx-auto px-6 lg:px-12 max-w-[90rem]">
          
          <div className="text-center max-w-4xl mx-auto mb-24">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Thermal & Maintenance Solutions</h2>
            <p className="text-slate-600 text-lg md:text-xl font-medium">From deep dust extraction to extreme liquid metal cooling upgrades, we protect your hardware investment from heat damage.</p>
          </div>

          <div className="space-y-32">
            {services.map((service, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <div 
                  key={service.id} 
                  id={service.id} 
                  className={`flex flex-col lg:flex-row gap-12 lg:gap-20 items-center scroll-mt-32 ${isEven ? '' : 'lg:flex-row-reverse'}`}
                >
                  {/* Text Content */}
                  <div className="flex-1 space-y-6 lg:max-w-2xl">
                    <div className="inline-flex items-center justify-center p-4 bg-violet-50 rounded-full text-violet-600 mb-2 shadow-sm border border-violet-100">
                      <service.icon className="size-8" />
                    </div>
                    <div>
                      <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
                        {service.title}
                      </h3>
                      <p className="text-xl font-bold text-violet-600 mb-5">
                        {service.subtitle}
                      </p>
                      <p className="text-slate-600 leading-relaxed mb-8 text-lg">
                        {service.description}
                      </p>
                    </div>

                    <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-4 pb-8">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2 className="size-6 text-violet-500 shrink-0 mt-0.5" />
                          <span className="text-slate-700 font-semibold">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Section Specific CTA */}
                    <div className="pt-6 border-t border-slate-100">
                      <Link 
                        href="/repair" 
                        className="inline-flex justify-center items-center gap-3 bg-slate-900 hover:bg-violet-600 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-violet-600/30 active:scale-95 text-lg w-full sm:w-auto"
                      >
                        {service.ctaText} <ArrowRight className="size-5" />
                      </Link>
                    </div>
                  </div>

                  {/* Image Content */}
                  <div className="flex-1 w-full lg:max-w-none">
                    <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100 bg-slate-50 group">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 border-4 border-white/10 rounded-[2rem] z-10 pointer-events-none" />
                      <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

        </div>
      </section>

      {/* 3. CALL TO ACTION SECTION */}
      <section className="relative py-24 bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 bg-violet-900/20" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-violet-600/30 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen" />
        
        <div className="container relative z-10 mx-auto px-6 lg:px-12 max-w-[90rem] text-center flex flex-col items-center">
          <div className="p-4 bg-violet-500/20 rounded-full mb-8 backdrop-blur-sm border border-violet-500/30">
            <Wrench className="size-10 text-violet-300" />
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">
            Ready to cool down your system?
          </h2>
          <p className="text-violet-200 text-lg md:text-xl mb-12 max-w-3xl mx-auto font-medium leading-relaxed">
            Bring your device in for a thorough thermal overhaul and deep clean. Experience lower temperatures, quieter operation, and extended hardware lifespan.
          </p>
          <Link 
            href="/repair" 
            className="inline-flex justify-center items-center gap-3 bg-violet-500 hover:bg-violet-400 text-white font-bold py-5 px-12 rounded-full shadow-[0_0_30px_rgba(139,92,246,0.4)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(139,92,246,0.6)] active:scale-95 text-xl"
          >
            Book Your Service Now <ArrowRight className="size-6" />
          </Link>
        </div>
      </section>

    </main>
  )
}