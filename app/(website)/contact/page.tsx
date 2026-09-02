"use client"

import React, { useState } from "react"
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Send, 
  CheckCircle2,
  ArrowRight,
  Headset,
  Cpu,
  Search
} from "lucide-react"

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  return (
    <div 
      className="min-h-screen bg-[#F8FAFC] text-slate-800 overflow-hidden font-sans pb-24" 
      style={{ fontFamily: "'Roboto', sans-serif" }}
    >
      {/* ================= HERO SECTION ================= */}
      <div className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 text-center space-y-8 max-w-5xl mx-auto group">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[150%] bg-gradient-to-r from-violet-200/40 via-fuchsia-200/40 to-violet-200/40 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-10" />
        
        <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-violet-100 text-violet-700 text-sm font-black rounded-full uppercase tracking-widest shadow-sm hover:scale-105 transition-transform cursor-default">
          <Headset className="size-4" /> Support & Inquiries
        </span>
        
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-slate-900 leading-[1.1]">
          Let's get your tech <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600">
            back on track.
          </span>
        </h1>
        
        <p className="text-lg md:text-2xl text-slate-600 leading-relaxed font-medium max-w-3xl mx-auto">
          Whether you need an urgent repair, want to check a trade-in valuation, or just have a technical question, our engineers are standing by to help.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pt-12">

        {/* ================= MAIN CONTACT GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LEFT: Contact Form (Spans 2 columns on large screens) */}
          <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-200 shadow-xl shadow-slate-200/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
            </div>
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">Send us a message</h2>
              <p className="text-slate-600 font-medium mb-10">Fill out the form below and we'll get back to you within 1 business day.</p>

              {isSubmitted ? (
                <div className="h-[400px] flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in zoom-in duration-500">
                  <div className="size-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="size-10" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">Message Received!</h3>
                  <p className="text-slate-600 font-medium max-w-md">
                    Thank you for reaching out. One of our lead technicians will review your request and contact you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="space-y-2">
      <label htmlFor="name" className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
      <input 
        type="text" 
        id="name" 
        required
        placeholder="John Doe" 
        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-600/50 focus:border-violet-600 transition-all font-medium"
      />
    </div>
    <div className="space-y-2">
      <label htmlFor="email" className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
      <input 
        type="email" 
        id="email" 
        required
        placeholder="john@example.com" 
        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-600/50 focus:border-violet-600 transition-all font-medium"
      />
    </div>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="space-y-2">
      <label htmlFor="phone" className="text-sm font-bold text-slate-700 ml-1">Phone Number</label>
      <input 
        type="tel" 
        id="phone" 
        required
        placeholder="+1 (555) 000-0000" 
        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-600/50 focus:border-violet-600 transition-all font-medium"
      />
    </div>
    <div className="space-y-2">
      <label htmlFor="device" className="text-sm font-bold text-slate-700 ml-1">Device & Issue / Subject</label>
      <input 
        type="text" 
        id="device" 
        required
        placeholder="e.g., Alienware m15 R6 - Overheating and random shutdowns" 
        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-600/50 focus:border-violet-600 transition-all font-medium"
      />
    </div>
  </div>

  <div className="space-y-2">
    <label htmlFor="message" className="text-sm font-bold text-slate-700 ml-1">Detailed Description</label>
    <textarea 
      id="message" 
      required
      rows={5}
      placeholder="Please describe the issue, any physical damage, or prior repairs..." 
      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-600/50 focus:border-violet-600 transition-all font-medium resize-none"
    ></textarea>
  </div>

  <button 
    type="submit" 
    className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-2xl py-5 font-black text-lg hover:shadow-xl hover:shadow-violet-500/30 hover:-translate-y-1 transition-all flex items-center justify-center gap-2 group"
  >
    Send Request <Send className="size-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
  </button>
</form>
              )}
            </div>
          </div>

          {/* RIGHT: Info Cards (Stack on mobile, 1 col on large screens) */}
          <div className="lg:col-span-1 space-y-6 flex flex-col">
            
            {/* Contact Details Card */}
            <div className="bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-[2.5rem] p-8 shadow-xl shadow-violet-500/20 text-white flex-1 hover:-translate-y-1 transition-transform duration-300">
              <h3 className="text-2xl font-black mb-6">Direct Contact</h3>
              
              <div className="space-y-6">
                <a href="tel:+971501234567" className="flex items-center gap-4 group">
                  <div className="size-12 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Phone className="size-5" />
                  </div>
                  <div>
                    <div className="text-violet-200 text-sm font-medium">Call Us</div>
                    <div className="font-bold text-lg">+971 50 123 4567</div>
                  </div>
                </a>

                <a href="mailto:support@aldana.com" className="flex items-center gap-4 group">
                  <div className="size-12 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mail className="size-5" />
                  </div>
                  <div>
                    <div className="text-violet-200 text-sm font-medium">Email Us</div>
                    <div className="font-bold text-lg">support@aldana.com</div>
                  </div>
                </a>
                
                <div className="flex items-start gap-4 group">
                  <div className="size-12 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                    <MapPin className="size-5" />
                  </div>
                  <div>
                    <div className="text-violet-200 text-sm font-medium">Service Center</div>
                    <div className="font-bold text-lg leading-snug">123 Tech Avenue, <br/>Industrial Area 1, Dubai, UAE</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours Card */}
            <div className="bg-slate-900 rounded-[2.5rem] p-8 shadow-xl shadow-slate-900/20 text-white hover:-translate-y-1 transition-transform duration-300">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="size-6 text-fuchsia-400" />
                <h3 className="text-2xl font-black">Business Hours</h3>
              </div>
              <ul className="space-y-3 font-medium text-slate-300">
                <li className="flex justify-between items-center border-b border-white/10 pb-3">
                  <span>Monday - Friday</span>
                  <span className="text-white font-bold">9:00 AM - 8:00 PM</span>
                </li>
                <li className="flex justify-between items-center border-b border-white/10 pb-3">
                  <span>Saturday</span>
                  <span className="text-white font-bold">10:00 AM - 6:00 PM</span>
                </li>
                <li className="flex justify-between items-center pt-1">
                  <span>Sunday</span>
                  <span className="text-fuchsia-400 font-bold">Closed</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* ================= WHAT HAPPENS NEXT SECTION ================= */}
        <section className="pt-12">
          <div className="text-center space-y-4 mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">What happens next?</h2>
            <p className="text-lg text-slate-600 font-medium">Our process is transparent, fast, and designed to get your hardware back in your hands as quickly as possible.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Step 1 */}
            <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-lg shadow-slate-200/50 relative overflow-hidden group">
              <div className="absolute top-0 right-0 text-9xl font-black text-slate-50 -mt-8 -mr-4 group-hover:scale-110 transition-transform duration-500 pointer-events-none">
                1
              </div>
              <div className="relative z-10">
                <div className="size-14 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center mb-6">
                  <MessageSquare className="size-6" />
                </div>
                <h4 className="text-xl font-black text-slate-900 mb-3">Reach Out</h4>
                <p className="text-slate-600 font-medium">Submit the form above or drop by our service center. Tell us the symptoms your device is experiencing.</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-lg shadow-slate-200/50 relative overflow-hidden group">
              <div className="absolute top-0 right-0 text-9xl font-black text-slate-50 -mt-8 -mr-4 group-hover:scale-110 transition-transform duration-500 pointer-events-none">
                2
              </div>
              <div className="relative z-10">
                <div className="size-14 rounded-xl bg-fuchsia-100 text-fuchsia-600 flex items-center justify-center mb-6">
                  <Search className="size-6" />
                </div>
                <h4 className="text-xl font-black text-slate-900 mb-3">Diagnostic & Quote</h4>
                <p className="text-slate-600 font-medium">We perform a standard 100 DHS diagnostic test to identify the exact fault and provide a clear, no-hidden-fees quote.</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-lg shadow-slate-200/50 relative overflow-hidden group">
              <div className="absolute top-0 right-0 text-9xl font-black text-slate-50 -mt-8 -mr-4 group-hover:scale-110 transition-transform duration-500 pointer-events-none">
                3
              </div>
              <div className="relative z-10">
                <div className="size-14 rounded-xl bg-slate-900 text-violet-400 flex items-center justify-center mb-6">
                  <Cpu className="size-6" />
                </div>
                <h4 className="text-xl font-black text-slate-900 mb-3">Repair & Return</h4>
                <p className="text-slate-600 font-medium">Upon your approval, we execute the repair using premium parts. Collect your revived device usually within 24-48 hours.</p>
              </div>
            </div>

          </div>
        </section>

        {/* ================= LOCATION IMAGE BENTO ================= */}
        <section className="relative h-[400px] md:h-[500px] rounded-[3rem] overflow-hidden shadow-2xl group border border-slate-200">
          <img 
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&auto=format&fit=crop" 
            alt="Map location" 
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 grayscale group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-14 flex flex-col md:flex-row items-end justify-between gap-6">
            <div className="space-y-4 max-w-lg">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-bold rounded-full uppercase tracking-wider">
                <MapPin className="size-4 text-fuchsia-400" /> Drop by today
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">Visit our Lab</h2>
              <p className="text-slate-300 font-medium text-lg">
                No appointment necessary. Bring your rig in for an immediate visual inspection by our counter technicians.
              </p>
            </div>
            
            <a 
              href="https://maps.google.com" 
              target="_blank" 
              rel="noreferrer"
              className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-slate-900 rounded-full font-black text-lg hover:bg-violet-600 hover:text-white transition-all shadow-xl shrink-0"
            >
              Get Directions <ArrowRight className="size-5" />
            </a>
          </div>
        </section>

      </div>
    </div>
  )
}