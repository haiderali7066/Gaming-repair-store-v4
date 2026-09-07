"use client"

import React from "react"
import Link from "next/link"
import { 
  Wrench, 
  Cpu, 
  Zap, 
  Monitor, 
  Laptop, 
  Tablet,
  Wind,
  Search,
  RefreshCw,
  ShieldCheck,
  ArrowRight,
  Settings,
  CreditCard,
  CheckCircle2,
  Phone,
  Sparkles,
  Thermometer,
  HardDrive,
  Fan,
} from "lucide-react"

const brands = [
  { name: "Apple", slug: "apple" },
  { name: "Dell", slug: "dell" },
  { name: "HP", slug: "hp" },
  { name: "Lenovo", slug: "lenovo" },
  { name: "ASUS", slug: "asus" },
  { name: "Acer", slug: "acer" },
  { name: "MSI", slug: "msi" },
  { name: "Razer", slug: "razer" },
  { name: "Microsoft", slug: "microsoft" },
  { name: "Corsair", slug: "corsair" },
  { name: "NVIDIA", slug: "nvidia" },
  { name: "AMD", slug: "amd" },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">

      {/* ================= HERO ================= */}
      <section className="relative pt-16 sm:pt-20 pb-10 sm:pb-14 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-violet-100 text-violet-700 text-[11px] sm:text-xs font-bold rounded-full uppercase tracking-wider">
            <Settings className="size-3" /> Our Services
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mt-4 mb-4 leading-tight tracking-tight">
            Professional Tech Repair.<br />
            <span className="text-violet-600">Reliable Solutions.</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-medium max-w-2xl mx-auto mb-6">
            We understand how important your devices are. Whether you rely on a laptop for work, an iPad for entertainment, or a high-performance gaming PC, we provide professional, efficient repair solutions.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link 
              href="/repair" 
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-full font-bold text-sm hover:bg-violet-600 transition-colors shadow-lg"
            >
              Book a Repair <ArrowRight className="size-4" />
            </Link>
            <Link 
              href="/buy-back" 
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-full font-bold text-sm hover:border-violet-500 hover:text-violet-600 transition-colors"
            >
              Trade-In Offers <RefreshCw className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ================= BRANDS MARQUEE ================= */}
      <div className="py-4 border-y border-slate-200 bg-white overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee items-center gap-12 sm:gap-16 px-8">
          {[...brands, ...brands, ...brands, ...brands].map((brand, i) => (
            <div 
              key={i} 
              className="flex items-center justify-center shrink-0 opacity-30 hover:opacity-100 transition-opacity duration-300 cursor-default"
              title={brand.name}
            >
              <img 
                src={`https://cdn.simpleicons.org/${brand.slug}/64748b`} 
                alt={brand.name} 
                className="h-6 sm:h-8 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* ================= CORE SERVICES ================= */}
      <section id="core-services" className="py-10 sm:py-14 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 text-violet-700 font-bold tracking-wider text-[11px] sm:text-xs uppercase bg-violet-100 px-3 py-1 rounded-full mb-3">
              <Sparkles className="w-3 h-3" /> Expert Repairs
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 mb-3">
              Core Repair Services
            </h2>
            <p className="text-slate-500 text-sm sm:text-base">
              We specialize in complete hardware and software restoration. Discover our technical solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">

            {/* Gaming PC — spans 2 cols on desktop */}
            <div className="lg:col-span-2 bg-slate-900 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 relative overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=1200&auto=format&fit=crop" 
                alt="Gaming PC" 
                className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-900/70" />

              <div className="relative z-10">
                <div className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur text-white flex items-center justify-center mb-4">
                  <Monitor className="size-5"/>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white mb-2">Gaming PC Repair & Upgrades</h3>
                <p className="text-sm text-slate-300 font-medium max-w-lg mb-5">
                  Problems with graphics cards, cooling systems, or power supplies can ruin your experience. We fix it all with expert precision.
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {["Expert PC Diagnostics", "GPU & CPU Repair", "Overheating Solutions", "RAM & SSD Upgrades"].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-slate-200 text-sm font-medium">
                      <CheckCircle2 className="size-4 text-violet-400 shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* iPad */}
            <div className="bg-violet-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 relative overflow-hidden group text-white">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-indigo-700" />
              <div className="absolute -bottom-8 -right-8 opacity-10">
                <Tablet className="size-40" />
              </div>

              <div className="relative z-10">
                <div className="w-11 h-11 rounded-xl bg-white/20 text-white flex items-center justify-center mb-4">
                  <Tablet className="size-5"/>
                </div>
                <h3 className="text-xl font-black mb-2">iPad & Tablet Repair</h3>
                <p className="text-violet-100 text-sm font-medium mb-5">
                  Screen replacements, battery fixes, and charging port repairs with precision care.
                </p>
                <ul className="space-y-2">
                  {["Screen Replacement", "Battery Fixes", "Charging Ports", "Water Damage"].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-violet-50 text-sm">
                      <Zap className="size-3.5 text-violet-200 shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CPU */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-slate-200 relative overflow-hidden group hover:border-violet-200 hover:shadow-lg transition-all">
              <div className="absolute -bottom-10 -right-10 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
                <Cpu className="size-48" />
              </div>

              <div className="relative z-10">
                <div className="w-11 h-11 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center mb-4 group-hover:bg-violet-600 group-hover:text-white transition-colors">
                  <Cpu className="size-5"/>
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-2">CPU & Processor</h3>
                <p className="text-slate-500 text-sm font-medium mb-5">
                  We identify the real source of the problem before recommending any replacement.
                </p>
                <ul className="space-y-2">
                  {["CPU Diagnosis", "Overheating Fixes", "Processor Upgrades"].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-slate-700 text-sm font-medium">
                      <Wrench className="size-3.5 text-slate-400 shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Laptop — spans 2 cols */}
            <div className="lg:col-span-2 bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200 relative overflow-hidden group hover:border-violet-200 hover:shadow-lg transition-all">
              <img 
                src="https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=1200&auto=format&fit=crop" 
                alt="Laptop Repair" 
                className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-l from-white via-white/95 to-white/80" />

              <div className="relative z-10">
                <div className="w-11 h-11 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center mb-4 group-hover:bg-violet-600 group-hover:text-white transition-colors">
                  <Laptop className="size-5"/>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-2">Laptop Repair Services</h3>
                <p className="text-slate-500 text-sm sm:text-base font-medium max-w-lg mb-5">
                  When your laptop becomes slow, overheats, stops charging, or develops hardware faults, you need a service you can depend on.
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    "Screen & Display Repair", 
                    "Battery & Charging", 
                    "Keyboard & Touchpad", 
                    "RAM & SSD Upgrades",
                    "Cooling Maintenance",
                    "Windows Support"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-slate-700 text-sm font-semibold">
                      <CheckCircle2 className="size-4 text-violet-500 shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= DEEP CLEANING ================= */}
      <section id="deep-cleaning" className="py-10 sm:py-14 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 overflow-hidden">
            <div className="grid lg:grid-cols-2">

              <div className="p-6 sm:p-8 lg:p-10">
                <div className="w-11 h-11 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center mb-4">
                  <Wind className="size-5" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4 leading-tight">
                  Deep Cleaning & <span className="text-violet-600">Thermal Paste</span>
                </h2>
                <div className="space-y-4 text-slate-500 text-sm sm:text-base leading-relaxed font-medium mb-6">
                  <p>Dust buildup and old thermal paste drastically reduce cooling efficiency, causing higher temperatures, loud fan noise, and unexpected shutdowns.</p>
                  <p>Our maintenance service restores cooling performance. We remove old thermal compound and apply premium replacements using professional techniques.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <h4 className="font-bold text-slate-900 text-sm mb-1">Benefits</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">Better airflow, maximized cooling efficiency, and lower operating temperatures.</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <h4 className="font-bold text-slate-900 text-sm mb-1">Testing</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">Post-cleaning benchmarking to monitor and verify thermal performance.</p>
                  </div>
                </div>
              </div>

              <div className="relative h-64 sm:h-80 lg:h-auto min-h-[300px]">
                <img 
                  src="https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=1000&auto=format&fit=crop" 
                  alt="Motherboard" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent lg:bg-gradient-to-r" />

                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-4 py-2 mb-3">
                    <Thermometer className="size-4 text-violet-300" />
                    <span className="text-white text-xs font-bold">Performance First</span>
                  </div>
                  <p className="text-slate-200 text-sm font-medium max-w-sm">
                    Ensuring every crucial component breathes easily and works together perfectly.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ================= POLICIES & TRADE-INS ================= */}
      <section id="policies" className="py-10 sm:py-14 lg:py-20 px-4 sm:px-6 lg:px-8 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 text-violet-300 font-bold tracking-wider text-[11px] sm:text-xs uppercase bg-violet-500/10 border border-violet-500/20 px-3 py-1 rounded-full mb-3">
              <ShieldCheck className="w-3 h-3" /> Policies
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-3">
              Trade In Today. Upgrade Tomorrow.
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Transparent policies and clear explanations before we ever start working on your machine.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">

            {/* Diagnosis */}
            <div className="bg-white/5 backdrop-blur rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-violet-500/30 transition-colors">
              <Search className="size-8 text-violet-400 mb-4" />
              <h3 className="font-black text-white text-lg mb-3">Professional Diagnosis</h3>
              <p className="text-sm text-slate-300 font-medium leading-relaxed mb-5">
                Every device is carefully inspected using professional testing methods to identify the root cause. We explain all available options clearly.
              </p>
              <div className="inline-flex items-center gap-2 bg-violet-600 text-white px-4 py-2 rounded-lg font-bold text-xs shadow-lg">
                <CreditCard className="size-3.5" />
                100 DHS Diagnostic Fee
              </div>
              <p className="text-xs text-slate-500 mt-3 font-medium">
                Covers professional technical assessment. Non-refundable once diagnostics begin.
              </p>
            </div>

            {/* Trade-In */}
            <div className="bg-white/5 backdrop-blur rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-violet-500/30 transition-colors">
              <RefreshCw className="size-8 text-violet-400 mb-4" />
              <h3 className="font-black text-white text-lg mb-3">Trade-In Policy</h3>
              <ul className="space-y-3 text-slate-300 text-sm font-medium mb-5">
                <li className="flex items-start gap-2.5">
                  <div className="mt-1.5 size-1.5 rounded-full bg-violet-400 shrink-0" />
                  Values based on model, specs, condition, and market value.
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="mt-1.5 size-1.5 rounded-full bg-violet-400 shrink-0" />
                  Final offers confirmed after physical testing by technicians.
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="mt-1.5 size-1.5 rounded-full bg-violet-400 shrink-0" />
                  Remove personal accounts and wipe data before handover.
                </li>
              </ul>
              <Link href="/buy-back" className="inline-flex items-center gap-1.5 text-violet-400 font-bold text-sm hover:text-white transition-colors">
                Get a Valuation <ArrowRight className="size-3.5" />
              </Link>
            </div>

            {/* Refund */}
            <div className="bg-white/5 backdrop-blur rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-violet-500/30 transition-colors">
              <ShieldCheck className="size-8 text-violet-400 mb-4" />
              <h3 className="font-black text-white text-lg mb-3">Refund & Return Policy</h3>
              <p className="text-sm text-slate-300 font-medium leading-relaxed">
                Once a repair is approved and completed, refunds are not accepted for change of mind. Replacement parts supplied by us are eligible for exchange if found defective under warranty terms.
              </p>
            </div>

            {/* Data & Collection */}
            <div className="bg-white/5 backdrop-blur rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-violet-500/30 transition-colors">
              <HardDrive className="size-8 text-violet-400 mb-4" />
              <h3 className="font-black text-white text-lg mb-3">Data & Collection</h3>
              <p className="text-sm text-slate-300 font-medium leading-relaxed mb-4">
                You are responsible for backing up important files prior to service. We are not liable for data loss.
              </p>
              <div className="p-3 bg-slate-950/50 rounded-lg border-l-2 border-violet-500">
                <p className="text-xs text-slate-400 font-medium leading-relaxed">
                  Collect your device within <span className="text-white font-bold">7 days</span> of completion notice. Devices left over 30 days are no longer our responsibility.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-10 sm:py-14 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-violet-600">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full filter blur-[80px]" />

            <div className="relative p-8 sm:p-12 lg:p-14 text-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-3">
                Experience Real Expertise.
              </h2>
              <p className="text-sm sm:text-base text-violet-100 font-medium max-w-xl mx-auto mb-8">
                Our goal is to provide dependable solutions that help your gaming PCs, laptops, and iPads perform at maximum efficiency.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link 
                  href="/repair" 
                  className="px-6 py-3 bg-white text-violet-700 rounded-full font-bold text-sm hover:bg-slate-100 transition-colors shadow-lg inline-flex justify-center items-center gap-2"
                >
                  <Settings className="size-4" /> Book a Diagnostic
                </Link>
                <Link 
                  href="/buy-back" 
                  className="px-6 py-3 bg-slate-900 text-white rounded-full font-bold text-sm hover:bg-slate-800 transition-colors inline-flex justify-center items-center gap-2"
                >
                  <RefreshCw className="size-4" /> Trade-In Device
                </Link>
                <Link 
                  href="/contact" 
                  className="px-6 py-3 bg-transparent border border-white/30 text-white rounded-full font-bold text-sm hover:bg-white/10 transition-colors inline-flex justify-center items-center gap-2"
                >
                  <Phone className="size-4" /> Contact Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global marquee animation */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
          width: max-content;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}