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
  Phone
} from "lucide-react"

export default function ServicesPage() {
  return (
    <div 
      className="min-h-screen bg-[#F8FAFC] text-slate-800 overflow-hidden font-sans pb-24" 
      style={{ fontFamily: "'Roboto', sans-serif" }}
    >
      {/* INJECTED CUSTOM CSS FOR MARQUEE */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee { 
          0% { transform: translateX(0%); } 
          100% { transform: translateX(-50%); } 
        }
        .animate-marquee { 
          animation: marquee 35s linear infinite; 
          display: flex;
          width: max-content;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}} />

      {/* ================= HERO SECTION ================= */}
      <div className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 text-center space-y-8  mx-auto group">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[150%] bg-gradient-to-r from-violet-200/40 via-fuchsia-200/40 to-violet-200/40 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-10" />
        
        <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-violet-100 text-violet-700 text-sm font-black rounded-full uppercase tracking-widest shadow-sm hover:scale-105 transition-transform cursor-default">
          <Settings className="size-4" /> Our Services
        </span>
        
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-slate-900 leading-[1.1]">
          Professional Tech Repair. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600">
            Reliable Solutions.
          </span>
        </h1>
        
        <p className="text-lg md:text-2xl text-slate-600 leading-relaxed font-medium max-w-3xl mx-auto">
          We understand how important your devices are to your everyday life. Whether you rely on a laptop for work, an iPad for entertainment, or a high-performance gaming PC for content creation, we provide professional, efficient repair solutions.
        </p>

        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <Link href="/repair" className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-full font-bold text-lg hover:bg-violet-600 transition-colors shadow-lg hover:shadow-violet-500/30">
            Book a Repair <ArrowRight className="size-5" />
          </Link>
          <Link href="/buy-back" className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-slate-200 text-slate-800 rounded-full font-bold text-lg hover:border-violet-600 hover:text-violet-600 transition-colors shadow-sm">
            Trade-In Offers <RefreshCw className="size-5" />
          </Link>
        </div>
      </div>

      {/* ================= BRANDS MARQUEE (ACTUAL LOGOS) ================= */}
      <div className="py-12 border-y border-slate-200/60 bg-white/50 backdrop-blur-sm overflow-hidden flex relative mt-8">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#F8FAFC] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#F8FAFC] to-transparent z-10 pointer-events-none" />
        
        <div className="animate-marquee items-center gap-20 px-8">
          {[1, 2].map((loop) => (
            <React.Fragment key={loop}>
              {[
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
              ].map((brand, i) => (
                <div key={`${loop}-${i}`} className="flex items-center justify-center shrink-0 opacity-40 hover:opacity-100 hover:scale-110 transition-all duration-300 cursor-pointer grayscale hover:grayscale-0" title={brand.name}>
                  <img 
                    src={`https://cdn.simpleicons.org/${brand.slug}/0F172A`} 
                    alt={`${brand.name} logo`} 
                    className="h-10 md:h-12 w-auto object-contain"
                  />
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32 pt-24">

        {/* ================= CORE REPAIR SERVICES (BENTO GRID) ================= */}
        <section id="core-services" className="space-y-12">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight">Expert Repair Services</h2>
            <p className="text-xl text-slate-600 font-medium">We specialize in complete hardware and software restoration. Discover our core technical solutions.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(340px,auto)]">
            
            {/* Gaming PC Card (Large) */}
            <div className="md:col-span-2 bg-slate-900 rounded-[2.5rem] p-10 shadow-xl shadow-slate-200/50 hover:-translate-y-2 transition-transform duration-500 group overflow-hidden relative">
              <img 
                src="https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=1200&auto=format&fit=crop" 
                alt="Gaming PC internals" 
                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent" />
              
              <div className="relative z-10 flex flex-col h-full text-white">
                <div className="size-16 rounded-2xl bg-white/10 backdrop-blur-md text-white flex items-center justify-center mb-6 group-hover:bg-violet-600 transition-colors border border-white/20">
                  <Monitor className="size-8"/>
                </div>
                <h3 className="text-3xl font-black mb-4">Gaming PC Repair & Upgrades</h3>
                <p className="text-lg text-slate-300 font-medium max-w-md mb-6">Gaming PCs require powerful hardware. Problems with graphics cards, cooling systems, or power supplies can ruin your experience. We fix it all.</p>
                <ul className="space-y-3 mt-auto">
                  {["Expert PC Diagnostics", "GPU & CPU Repair", "Overheating Solutions", "RAM & SSD Upgrades"].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-slate-200 font-medium">
                      <CheckCircle2 className="size-5 text-violet-400" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* iPad Repair (Small) */}
            <div className="md:col-span-1 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-[2.5rem] p-10 shadow-xl shadow-violet-500/20 hover:-translate-y-2 transition-transform duration-500 group text-white relative overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=800&auto=format&fit=crop" 
                alt="iPad Tablet" 
                className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:scale-110 transition-transform duration-700 mix-blend-overlay" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-violet-900/80 to-transparent" />

              <div className="relative z-10 flex flex-col h-full">
                <div className="size-16 rounded-2xl bg-white/20 backdrop-blur-sm text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Tablet className="size-8"/>
                </div>
                <h3 className="text-2xl font-black mb-4">iPad & Tablet Repair</h3>
                <p className="text-violet-100 font-medium mb-6">Designed to address common hardware and software problems with the utmost care.</p>
                <ul className="space-y-3 mt-auto text-violet-50">
                    {["Screen Replacement", "Battery Fixes", "Charging Ports"].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Zap className="size-4 text-fuchsia-300" /> {item}
                      </li>
                    ))}
                  </ul>
              </div>
            </div>

            {/* CPU Services (Small Dark) */}
            <div className="md:col-span-1 bg-slate-100 rounded-[2.5rem] p-10 shadow-xl shadow-slate-200/50 hover:-translate-y-2 transition-transform duration-500 group relative overflow-hidden border border-slate-200">
              <div className="absolute -bottom-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity">
                <Cpu className="size-64" />
              </div>
              <div className="relative z-10 flex flex-col h-full">
                <div className="size-16 rounded-2xl bg-slate-900 text-fuchsia-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <Cpu className="size-8"/>
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4">CPU & Processor</h3>
                <p className="text-slate-600 font-medium mb-6">We identify the real source of the problem before recommending an expensive replacement.</p>
                <ul className="space-y-3 mt-auto text-slate-700 font-medium">
                    {["CPU Diagnosis", "Overheating Fixes", "Processor Upgrades"].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Wrench className="size-4 text-slate-900" /> {item}
                      </li>
                    ))}
                  </ul>
              </div>
            </div>

            {/* Laptop Repair (Large) */}
            <div className="md:col-span-2 bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-xl shadow-slate-200/50 hover:-translate-y-2 transition-transform duration-500 group overflow-hidden relative">
              <img 
                src="https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=1200&auto=format&fit=crop" 
                alt="Laptop Repair" 
                className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-l from-white via-white/90 to-white/70" />

              <div className="relative z-10 flex flex-col h-full">
                <div className="size-16 rounded-2xl bg-fuchsia-100 text-fuchsia-600 flex items-center justify-center mb-6 group-hover:bg-fuchsia-600 group-hover:text-white transition-colors shadow-sm">
                  <Laptop className="size-8"/>
                </div>
                <h3 className="text-3xl font-black text-slate-900 mb-4">Laptop Repair Services</h3>
                <p className="text-lg text-slate-600 font-medium max-w-lg mb-6">When your laptop becomes slow, overheats, stops charging, or develops hardware faults, you need a service you can depend on completely.</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-auto">
                  {[
                    "Screen & Display Repair", 
                    "Battery & Charging", 
                    "Keyboard & Touchpad", 
                    "RAM & SSD Upgrades",
                    "Cooling Maintenance",
                    "Windows Support"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-slate-800 font-bold">
                      <CheckCircle2 className="size-5 text-fuchsia-500" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </section>

        {/* ================= DEEP CLEANING & MAINTENANCE ================= */}
        <section id="deep-cleaning" className="group">
          <div className="bg-white rounded-[3rem] p-8 md:p-14 shadow-2xl shadow-slate-200/50 border border-slate-100 transition-all duration-700 hover:shadow-violet-500/15 hover:-translate-y-2">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="inline-block p-4 rounded-2xl bg-violet-50 text-violet-600 mb-2">
                  <Wind className="size-10" />
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight">
                  Deep Cleaning & <span className="text-violet-600">Thermal Paste</span>
                </h2>
                <div className="space-y-6 text-lg md:text-xl text-slate-600 leading-relaxed font-medium">
                  <p>Dust buildup and old thermal paste drastically reduce cooling efficiency, causing higher temperatures, loud fan noise, and unexpected shutdowns.</p>
                  <p>Our maintenance service restores cooling performance. We meticulously remove old thermal compound and apply premium replacements using professional techniques to ensure your hardware runs flawlessly under load.</p>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-sm">
                        <h4 className="font-black text-slate-900 mb-2">Benefits</h4>
                        <p className="text-sm text-slate-600 font-medium">Better airflow, maximized cooling efficiency, and drastically lower operating temperatures.</p>
                    </div>
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-sm">
                        <h4 className="font-black text-slate-900 mb-2">Testing</h4>
                        <p className="text-sm text-slate-600 font-medium">Post-cleaning, we rigorously benchmark system operations to monitor and verify thermals.</p>
                    </div>
                </div>
              </div>
              
              <div className="relative h-[600px] w-full rounded-[2.5rem] overflow-hidden bg-slate-900 shadow-2xl group-hover:shadow-violet-500/30 transition-all duration-700 group-hover:scale-[1.02]">
                <img 
                  src="https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=1000&auto=format&fit=crop" 
                  alt="Motherboard CPU Socket" 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
                
                <div className="absolute bottom-0 left-0 right-0 p-10 text-center">
                  <div className="relative size-24 mx-auto mb-6">
                    <div className="absolute inset-0 bg-violet-500 rounded-full animate-ping opacity-20" />
                    <div className="relative size-full rounded-full bg-white/10 backdrop-blur-xl border border-white/30 flex items-center justify-center shadow-2xl">
                      <RefreshCw className="size-10 text-white" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-black text-white mb-3">Performance First</h3>
                  <p className="text-base text-slate-300 font-medium max-w-sm mx-auto">
                    Performance isn't just about speed. It means ensuring that every crucial component breathes easily and works together perfectly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= POLICIES & TRADE-INS (STAGGERED MASONRY GRID) ================= */}
        <section id="policies" className="bg-slate-900 rounded-[3rem] py-20 px-8 md:px-14 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-violet-600/20 blur-[150px] rounded-full pointer-events-none" />
          
          <div className="text-center space-y-4 mb-16 relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight">Trade In Today. Upgrade Tomorrow.</h2>
            <p className="text-xl text-slate-400 font-medium">Transparent policies and clear explanations before we ever start working on your machine.</p>
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            
            {/* Column 1 */}
            <div className="space-y-6 md:mt-12">
              
              {/* Diagnostic Fee Block */}
              <div className="bg-white/5 backdrop-blur-md rounded-[2rem] p-10 border border-violet-500/30 hover:bg-white/10 transition-colors relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform duration-500">
                    <Search className="size-24" />
                </div>
                <Search className="size-10 text-violet-400 mb-6" />
                <h3 className="font-black text-white text-2xl mb-4">Professional Diagnosis</h3>
                <p className="text-lg text-slate-300 font-medium leading-relaxed mb-6">
                  Every device is carefully inspected using professional testing methods to identify the root cause of the issue. We explain all available options clearly.
                </p>
                <div className="inline-flex items-center gap-3 bg-violet-600 text-white px-5 py-3 rounded-xl font-bold shadow-lg shadow-violet-900/50">
                    <CreditCard className="size-5" />
                    100 DHS Standard Diagnostic Fee
                </div>
                <p className="text-sm text-slate-400 mt-4 font-medium">
                  This charge covers the professional technical work required to assess the device and is non-refundable once the diagnostic process begins.
                </p>
              </div>

              {/* Refund Policy */}
              <div className="bg-white/5 backdrop-blur-md rounded-[2rem] p-10 border border-white/10 hover:bg-white/10 transition-colors">
                <ShieldCheck className="size-10 text-fuchsia-400 mb-6" />
                <h3 className="font-black text-white text-2xl mb-4">Refund and Return Policy</h3>
                <p className="text-base text-slate-300 font-medium leading-relaxed">
                  Once a repair has been approved and completed, refund requests are generally not accepted for change of mind. However, replacement parts supplied by us are eligible for exchange if they are found defective under the applicable warranty terms.
                </p>
              </div>

            </div>

            {/* Column 2 */}
            <div className="space-y-6">
              
              {/* Trade-In Block */}
              <div className="relative rounded-[2rem] p-10 border border-white/10 hover:border-fuchsia-500/50 transition-colors overflow-hidden group">
                <img 
                  src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop" 
                  alt="Retro Gaming / Trade In" 
                  className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900/90 to-fuchsia-900/80" />

                <div className="relative z-10">
                  <RefreshCw className="size-10 text-fuchsia-400 mb-6" />
                  <h3 className="font-black text-white text-2xl mb-6">Trade-In Policy</h3>
                  <ul className="space-y-4 text-slate-200 font-medium">
                    <li className="flex items-start gap-3">
                      <div className="mt-1.5 size-2 rounded-full bg-fuchsia-400 shrink-0" />
                      <p>Trade-in values are strictly based on model, specs, physical condition, and current market value.</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1.5 size-2 rounded-full bg-fuchsia-400 shrink-0" />
                      <p>Final trade-in offers are confirmed only after our technicians perform physical testing.</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1.5 size-2 rounded-full bg-fuchsia-400 shrink-0" />
                      <p>Customers must remove personal accounts, passwords, and wipe data before handover.</p>
                    </li>
                  </ul>
                  <div className="mt-8">
                    <Link href="/buy-back" className="inline-flex items-center gap-2 text-fuchsia-400 font-bold hover:text-white transition-colors">
                      Get a Valuation <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Data & Collection Block */}
              <div className="bg-white/5 backdrop-blur-md rounded-[2rem] p-10 border border-white/10 hover:bg-white/10 transition-colors">
                <ShieldCheck className="size-10 text-violet-400 mb-6" />
                <h3 className="font-black text-white text-2xl mb-4">Data & Device Collection</h3>
                <p className="text-base text-slate-300 font-medium leading-relaxed mb-6">
                  You are responsible for backing up important files, documents, and photos prior to service. We are not liable for data loss.
                </p>
                <div className="p-5 bg-slate-950/50 rounded-xl border border-white/5 border-l-4 border-l-violet-500">
                    <p className="text-sm text-slate-300 font-medium leading-relaxed">
                       Once notified of completion, please collect your device within <span className="text-white font-bold">7 days</span>. Devices left uncollected for over 30 days will no longer be the responsibility of Al Dana.
                    </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ================= CALL TO ACTION ================= */}
        <section className="relative rounded-[3rem] overflow-hidden bg-gradient-to-r from-violet-600 to-fuchsia-600 shadow-2xl shadow-violet-500/30">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay" />
          <div className="relative p-12 md:p-20 text-center space-y-8 max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">Experience Real Expertise.</h2>
            <p className="text-xl text-violet-100 font-medium max-w-2xl mx-auto">
              Our goal is to provide dependable solutions that help your gaming PCs, laptops, and iPads perform at absolute maximum efficiency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link href="/repair" className="px-8 py-4 bg-white text-violet-700 rounded-full font-black text-lg hover:bg-slate-100 hover:scale-105 transition-all shadow-xl inline-flex justify-center items-center gap-2">
                <Settings className="size-5" /> Book a Diagnostic
              </Link>
              <Link href="/buy-back" className="px-8 py-4 bg-slate-900 text-white rounded-full font-black text-lg hover:bg-slate-800 transition-all shadow-xl inline-flex justify-center items-center gap-2">
                <RefreshCw className="size-5" /> Trade-In Device
              </Link>
              <Link href="/contact" className="px-8 py-4 bg-transparent border-2 border-white/30 text-white rounded-full font-black text-lg hover:bg-white/10 transition-all inline-flex justify-center items-center gap-2">
                <Phone className="size-5" /> Contact Support
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}