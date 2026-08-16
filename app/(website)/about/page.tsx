"use client"

import React from "react"
import { 
  Star, 
  Quote, 
  ShieldCheck, 
  Wrench, 
  Cpu, 
  Zap, 
  Award, 
  Monitor, 
  Laptop, 
  CheckCircle2, 
  ArrowRight,
  HeartHandshake,
  Clock,
  Sparkles
} from "lucide-react"

export default function AboutPage() {
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
      <div className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 text-center space-y-8 max-w-5xl mx-auto group">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[150%] bg-gradient-to-r from-violet-200/40 via-fuchsia-200/40 to-violet-200/40 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-10" />
        
        <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-violet-100 text-violet-700 text-sm font-black rounded-full uppercase tracking-widest shadow-sm hover:scale-105 transition-transform cursor-default">
          <Zap className="size-4" /> About Al Dana Gaming
        </span>
        
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-slate-900 leading-[1.1]">
          Professional Tech Repair. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600">
            Reliable Solutions.
          </span>
        </h1>
        
        <p className="text-lg md:text-2xl text-slate-600 leading-relaxed font-medium max-w-3xl mx-auto">
          We understand how important your devices are to your everyday life. From high-performance gaming rigs to essential work laptops, we deliver precision repairs that get you back in the game.
        </p>
      </div>

      {/* ================= BRANDS MARQUEE (ACTUAL LOGOS) ================= */}
      <div className="py-12 border-y border-slate-200/60 bg-white/50 backdrop-blur-sm overflow-hidden flex relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#F8FAFC] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#F8FAFC] to-transparent z-10 pointer-events-none" />
        
        <div className="animate-marquee items-center gap-20 px-8">
          {/* Duplicated for seamless infinite loop */}
          {[1, 2].map((loop) => (
            <React.Fragment key={loop}>
              {[
                { name: "ASUS", slug: "asus" },
                { name: "NVIDIA", slug: "nvidia" },
                { name: "Intel", slug: "intel" },
                { name: "AMD", slug: "amd" },
                { name: "Razer", slug: "razer" },
                { name: "Corsair", slug: "corsair" },
                { name: "Apple", slug: "apple" },
                { name: "Dell", slug: "dell" },
                { name: "HP", slug: "hp" },
              ].map((brand, i) => (
                <div key={`${loop}-${i}`} className="flex items-center justify-center shrink-0 opacity-40 hover:opacity-100 hover:scale-110 transition-all duration-300 cursor-pointer grayscale hover:grayscale-0">
                  {/* Standard img tag used to avoid Next.js external domain config issues */}
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

        {/* ================= OUR STORY ================= */}
        <section id="our-story" className="group">
          <div className="bg-white rounded-[3rem] p-8 md:p-14 shadow-2xl shadow-slate-200/50 border border-slate-100 transition-all duration-700 hover:shadow-violet-500/15 hover:-translate-y-2">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="inline-block p-4 rounded-2xl bg-violet-50 text-violet-600 mb-2">
                  <Award className="size-10" />
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight">
                  Our <span className="text-violet-600">Story</span>
                </h2>
                <div className="space-y-6 text-lg md:text-xl text-slate-600 leading-relaxed font-medium">
                  <p>Our journey began with a simple mission: to make premium technology repair accessible, honest, and incredibly fast.</p>
                  <p>Starting out by fixing custom gaming PCs and high-end laptops, our dedication to uncompromising quality quickly turned us into a trusted repair hub for the UAE's tech and gaming community.</p>
                  <p>Today, whether it's a burnt GPU, a shattered iPad, or a massive system upgrade, we handle every job with the exact same passion that started it all.</p>
                </div>
              </div>
              
              <div className="relative h-[500px] w-full rounded-[2.5rem] overflow-hidden bg-slate-900 shadow-2xl group-hover:shadow-violet-500/30 transition-all duration-700 group-hover:scale-[1.02]">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-tr from-violet-700/90 via-indigo-900/90 to-slate-900/90" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center">
                  <div className="relative size-32 mb-8">
                    <div className="absolute inset-0 bg-violet-500 rounded-full animate-ping opacity-20" />
                    <div className="relative size-full rounded-full bg-white/10 backdrop-blur-xl border-2 border-white/20 flex items-center justify-center shadow-2xl">
                      <Cpu className="size-14 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-4">Precision Engineering</h3>
                  <p className="text-base text-violet-200 font-medium max-w-sm">
                    Utilizing state-of-the-art diagnostic tools and genuine replacement components for absolute perfection.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= WHY CHOOSE US (BENTO GRID) ================= */}
        <section id="why-choose-us" className="space-y-12">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight">Why Choose Us?</h2>
            <p className="text-xl text-slate-600 font-medium">We don't just fix devices; we engineer peace of mind. Here is why gamers and professionals trust us with their hardware.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(280px,auto)]">
            
            {/* Card 1: Large (Spans 2 cols) */}
            <div className="md:col-span-2 bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-xl shadow-slate-200/50 hover:-translate-y-2 transition-transform duration-300 group overflow-hidden relative">
              <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                <Monitor className="size-64 -mt-10 -mr-10" />
              </div>
              <div className="relative z-10 flex flex-col h-full">
                <div className="size-16 rounded-2xl bg-violet-100 text-violet-600 flex items-center justify-center mb-6 group-hover:bg-violet-600 group-hover:text-white transition-colors">
                  <Monitor className="size-8"/>
                </div>
                <h3 className="text-3xl font-black text-slate-900 mb-4">Expert Diagnostics</h3>
                <p className="text-lg text-slate-600 font-medium max-w-md mt-auto">We pinpoint the exact component failure before recommending a fix, saving you money by avoiding unnecessary parts.</p>
              </div>
            </div>

            {/* Card 2: Small Accent */}
            <div className="md:col-span-1 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-[2.5rem] p-10 shadow-xl shadow-violet-500/20 hover:-translate-y-2 transition-transform duration-300 group text-white">
              <div className="size-16 rounded-2xl bg-white/20 text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck className="size-8"/>
              </div>
              <h3 className="text-2xl font-black mb-4">Genuine Parts</h3>
              <p className="text-violet-100 font-medium mt-auto">Only OEM or high-tier certified replacements are used to ensure maximum longevity.</p>
            </div>

            {/* Card 3: Small Dark */}
            <div className="md:col-span-1 bg-slate-900 rounded-[2.5rem] p-10 shadow-xl shadow-slate-900/20 hover:-translate-y-2 transition-transform duration-300 group text-white">
              <div className="size-16 rounded-2xl bg-slate-800 border border-slate-700 text-fuchsia-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Clock className="size-8"/>
              </div>
              <h3 className="text-2xl font-black mb-4">Rapid Turnaround</h3>
              <p className="text-slate-400 font-medium mt-auto">We know you hate downtime. Standard repairs are completed within 24-48 hours.</p>
            </div>

            {/* Card 4: Large (Spans 2 cols) */}
            <div className="md:col-span-2 bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-xl shadow-slate-200/50 hover:-translate-y-2 transition-transform duration-300 group overflow-hidden relative">
              <div className="absolute bottom-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                <CheckCircle2 className="size-64 -mb-10 -mr-10" />
              </div>
              <div className="relative z-10 flex flex-col h-full">
                <div className="size-16 rounded-2xl bg-fuchsia-100 text-fuchsia-600 flex items-center justify-center mb-6 group-hover:bg-fuchsia-600 group-hover:text-white transition-colors">
                  <CheckCircle2 className="size-8"/>
                </div>
                <h3 className="text-3xl font-black text-slate-900 mb-4">Transparent Pricing</h3>
                <p className="text-lg text-slate-600 font-medium max-w-md mt-auto">No hidden fees, no surprises. You get a clear, honest quote before we ever touch a screwdriver on your device.</p>
              </div>
            </div>

          </div>
        </section>

        {/* ================= TESTIMONIALS (STAGGERED MASONRY GRID) ================= */}
        <section id="testimonials" className="bg-slate-900 rounded-[3rem] py-20 px-8 md:px-14 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-violet-600/20 blur-[150px] rounded-full pointer-events-none" />
          
          <div className="text-center space-y-4 mb-16 relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight">Gamer Approved</h2>
            <p className="text-xl text-slate-400 font-medium">Don't just take our word for it. See what our community has to say.</p>
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {/* Column 1 (Pushed down slightly on desktop for Masonry effect) */}
            <div className="space-y-6 md:mt-12">
              {[
                { name: "Ahmed K.", device: "Custom RTX 4090 Build", text: "My system was constantly crashing during heavy loads. They diagnosed a faulty PSU cable, replaced it, and re-pasted my CPU. Temps dropped by 15°C! Absolute legends." },
                { name: "Tariq R.", device: "Alienware m15", text: "The deep cleaning and liquid metal application completely revived my laptop. It runs whisper quiet now even while playing Cyberpunk." },
              ].map((review, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-md rounded-[2rem] p-10 border border-white/10 hover:bg-white/10 transition-colors">
                  <Quote className="size-10 text-violet-400 mb-6 opacity-60" />
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="size-5 fill-fuchsia-500 text-fuchsia-500" />
                    ))}
                  </div>
                  <p className="text-lg md:text-xl text-slate-200 font-medium leading-relaxed mb-8">"{review.text}"</p>
                  <div>
                    <div className="font-black text-white text-xl">{review.name}</div>
                    <div className="text-violet-400 font-bold text-sm uppercase tracking-wider mt-1">{review.device}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Column 2 */}
            <div className="space-y-6">
              {[
                { name: "Sarah M.", device: "MacBook Pro M2", text: "Apple told me I needed a completely new logic board for thousands of dirhams. Al Dana fixed the specific short on the board for a fraction of the price. Absolute lifesavers." },
                { name: "Omar F.", device: "iPad Pro 12.9", text: "Shattered my screen dropping it on tile. They replaced it same-day, and the touch response is completely flawless. Looks and feels brand new." },
              ].map((review, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-md rounded-[2rem] p-10 border border-white/10 hover:bg-white/10 transition-colors">
                  <Quote className="size-10 text-violet-400 mb-6 opacity-60" />
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="size-5 fill-fuchsia-500 text-fuchsia-500" />
                    ))}
                  </div>
                  <p className="text-lg md:text-xl text-slate-200 font-medium leading-relaxed mb-8">"{review.text}"</p>
                  <div>
                    <div className="font-black text-white text-xl">{review.name}</div>
                    <div className="text-violet-400 font-bold text-sm uppercase tracking-wider mt-1">{review.device}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= OUR CORE VALUES ================= */}
        <section id="our-values" className="relative group">
          <div className="absolute inset-0 bg-violet-900 rounded-[3rem] shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-fuchsia-600/40 via-transparent to-transparent opacity-60" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-violet-500/40 via-transparent to-transparent opacity-60" />
          </div>
          
          <div className="relative py-20 px-8 md:px-14">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight">Our Core Values</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Quality First", desc: "Uncompromising standards in every solder, screw, and thermal paste application." },
                { title: "Absolute Trust", desc: "Your data is safe, your hardware is respected, and our advice is always honest." },
                { title: "Master Craftsmanship", desc: "Driven by technical expertise and years of hands-on electronic engineering." },
                { title: "Continuous Learning", desc: "As tech evolves, so do we. We stay ahead of the curve on the latest hardware." },
                { title: "Fair Pricing", desc: "Premium service shouldn't mean predatory pricing. We believe in total fairness." },
                { title: "Customer Centric", desc: "We don't just fix machines; we empower the people who use them." }
              ].map((val, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-md p-8 rounded-[2rem] border border-white/20 transition-all duration-500 hover:scale-[1.03] hover:bg-white/20 hover:border-violet-300">
                  <h4 className="font-black text-white text-2xl mb-3 flex items-center gap-3">
                    <Sparkles className="size-5 text-fuchsia-400" />
                    {val.title}
                  </h4>
                  <p className="text-base text-violet-100 font-medium leading-relaxed">{val.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= MEET OUR TEAM ================= */}
        <section id="meet-our-team" className="group">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Team Image Grid Placeholder */}
            <div className="grid grid-cols-2 gap-4 h-[500px]">
              <div className="space-y-4 h-full">
                <div className="h-[60%] rounded-[2rem] bg-gradient-to-br from-violet-400 to-violet-600 shadow-xl overflow-hidden relative group-hover:-translate-y-2 transition-transform duration-500">
                   <div className="absolute inset-0 flex items-center justify-center">
                      <Wrench className="size-12 text-white/50" />
                   </div>
                </div>
                <div className="h-[40%] rounded-[2rem] bg-slate-800 shadow-xl overflow-hidden relative group-hover:-translate-y-1 transition-transform duration-500 delay-100">
                   <div className="absolute inset-0 flex items-center justify-center">
                      <Laptop className="size-10 text-white/20" />
                   </div>
                </div>
              </div>
              <div className="space-y-4 h-full pt-12">
                <div className="h-[40%] rounded-[2rem] bg-fuchsia-100 shadow-xl overflow-hidden relative group-hover:translate-y-1 transition-transform duration-500 delay-75">
                   <div className="absolute inset-0 flex items-center justify-center">
                      <Monitor className="size-10 text-fuchsia-300" />
                   </div>
                </div>
                <div className="h-[60%] rounded-[2rem] bg-gradient-to-tr from-fuchsia-500 to-purple-600 shadow-xl overflow-hidden relative group-hover:translate-y-2 transition-transform duration-500 delay-150">
                   <div className="absolute inset-0 flex items-center justify-center">
                      <Cpu className="size-12 text-white/50" />
                   </div>
                </div>
              </div>
            </div>

            <div className="space-y-8 lg:pl-8">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight">
                Meet The <span className="text-violet-600">Experts</span>
              </h2>
              <div className="space-y-6 text-lg md:text-xl text-slate-600 leading-relaxed font-medium">
                <p>Behind every successful repair is a technician who treats your device like their own. Our roster consists of certified engineers, custom PC builders, and micro-soldering specialists.</p>
                <p>We combine decades of shared experience with a relentless passion for hardware. When you hand over your rig, you're placing it in the hands of absolute professionals who thrive on solving the impossible.</p>
              </div>
              <button className="mt-4 inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-full font-bold text-lg hover:bg-violet-600 transition-colors shadow-lg hover:shadow-violet-500/30">
                Join Our Team <ArrowRight className="size-5" />
              </button>
            </div>
          </div>
        </section>

        {/* ================= OUR ACHIEVEMENTS ================= */}
        <section id="our-achievements" className="py-12 border-y-2 border-slate-200 border-dashed">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 text-center">
            {[
              { label: "Devices Repaired", val: "15,000+", icon: Wrench },
              { label: "Custom Builds", val: "2,500+", icon: Cpu },
              { label: "Customer Satisfaction", val: "99%", icon: Star },
              { label: "Years Experience", val: "10+", icon: Clock }
            ].map((stat, i) => (
              <div key={i} className="space-y-4 group">
                <div className="mx-auto size-16 rounded-full bg-violet-100 flex items-center justify-center group-hover:scale-110 group-hover:bg-violet-600 transition-all duration-300">
                  <stat.icon className="size-8 text-violet-600 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-black text-slate-900 mb-2">{stat.val}</div>
                  <div className="text-sm font-bold uppercase tracking-widest text-slate-500">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= CALL TO ACTION ================= */}
        <section className="relative rounded-[3rem] overflow-hidden bg-gradient-to-r from-violet-600 to-fuchsia-600 shadow-2xl shadow-violet-500/30">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay" />
          <div className="relative p-12 md:p-20 text-center space-y-8 max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">Ready to revive your device?</h2>
            <p className="text-xl text-violet-100 font-medium max-w-2xl mx-auto">
              Book your diagnostic session today or drop by our service center. Let's get your hardware running at absolute peak performance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <button className="px-8 py-4 bg-white text-violet-700 rounded-full font-black text-lg hover:bg-slate-100 hover:scale-105 transition-all shadow-xl">
                Book a Repair
              </button>
              <button className="px-8 py-4 bg-transparent border-2 border-white/30 text-white rounded-full font-black text-lg hover:bg-white/10 transition-all">
                Contact Support
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}