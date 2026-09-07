"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wrench,
  ShieldCheck,
  Zap,
  MonitorSmartphone,
  Cpu,
  Clock,
  CheckCircle2,
  ArrowRight,
  Star,
  MapPin,
  Phone,
  Mail,
  Clock4,
  ShoppingCart,
  Gamepad2,
  ChevronDown,
  MessageSquare,
  Quote,
  Award,
  ThumbsUp,
  Settings,
} from "lucide-react";
import TradeInBanner from "./new/banner";
import RepairBanner from "./new/banner2";
import BrandsMarquee from "./BrandsMarquee";

// --- DATA STRUCTURES ---
const heroSlides = [
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



const services = [
  {
    title: "Gaming PC Repair",
    desc: "Diagnostics, hardware faults, upgrades, overheating and performance issues.",
    icon: <Cpu className="w-6 h-6 sm:w-7 sm:h-7 text-violet-600" />,
  },
  {
    title: "Gaming Laptop",
    desc: "Screen, battery, charging, keyboard, cooling and hardware repairs.",
    icon: <MonitorSmartphone className="w-6 h-6 sm:w-7 sm:h-7 text-violet-600" />,
  },
  {
    title: "PC & Laptop",
    desc: "Hardware, software, Windows, storage, RAM and general troubleshooting.",
    icon: <Wrench className="w-6 h-6 sm:w-7 sm:h-7 text-violet-600" />,
  },
  {
    title: "GPU Repair",
    desc: "Graphics card diagnostics, cooling and performance-related issues.",
    icon: <Zap className="w-6 h-6 sm:w-7 sm:h-7 text-violet-600" />,
  },
  {
    title: "iPad & Console",
    desc: "Gaming console diagnostics, hardware and software services.",
    icon: <Gamepad2 className="w-6 h-6 sm:w-7 sm:h-7 text-violet-600" />,
  },
  {
    title: "Maintenance",
    desc: "Deep cleaning, thermal paste replacement and performance maintenance.",
    icon: <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7 text-violet-600" />,
  },
];

const whyChooseUsItems = [
  {
    title: "Certified Experts",
    desc: "Our technicians are specialized and experienced in high-end gaming hardware and complex board-level repairs.",
    icon: <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7 text-violet-600" />,
  },
  {
    title: "Fast Turnaround",
    desc: "We value your gaming time. Most diagnostics and repairs are completed swiftly without compromising quality.",
    icon: <Clock className="w-6 h-6 sm:w-7 sm:h-7 text-violet-600" />,
  },
  {
    title: "Genuine Parts",
    desc: "We use only high-grade, original, or premium manufacturer-approved replacement components.",
    icon: <Award className="w-6 h-6 sm:w-7 sm:h-7 text-violet-600" />,
  },
  {
    title: "Transparent Pricing",
    desc: "No hidden costs. Upfront quotes provided and only proceed after your complete approval.",
    icon: <ThumbsUp className="w-6 h-6 sm:w-7 sm:h-7 text-violet-600" />,
  },
];

const processSteps = [
  {
    step: "01",
    title: "Book Repair",
    desc: "Tell us about your device and the issue online or in-store.",
  },
  {
    step: "02",
    title: "Diagnosis",
    desc: "Our technicians run deep diagnostics to pinpoint the exact fault.",
  },
  {
    step: "03",
    title: "Approval",
    desc: "We provide a clear quote and proceed only with your approval.",
  },
  {
    step: "04",
    title: "Fix & Test",
    desc: "Professional repair followed by rigorous stress testing.",
  },
  {
    step: "05",
    title: "Collection",
    desc: "Pick up your functional device, backed by our warranty.",
  },
];

const faqs = [
  {
    q: "How long does a typical gaming PC repair take?",
    a: "Most standard repairs and upgrades are completed within 24-48 hours. Complex motherboard or GPU component repairs might take 3-5 days depending on parts availability.",
  },
  {
    q: "Do you offer a warranty on your repairs?",
    a: "Yes, we offer a 90-day warranty on all repairs and replacement parts. If the same issue occurs within this period, we fix it free of charge.",
  },
  {
    q: "How does the Buy-Back program work?",
    a: "Simply bring your old device to our store or fill out the form online. We'll evaluate its condition and specifications, and offer you instant store credit or cash.",
  },
  {
    q: "Do you use original replacement parts?",
    a: "Absolutely. We source high-quality, original (OEM) or premium aftermarket parts designed specifically for high-performance gaming hardware.",
  },
];

// --- ANIMATION VARIANTS ---
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export function HomeSecondarySections() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans overflow-x-hidden selection:bg-violet-600 selection:text-white">
      

      <BrandsMarquee/>
      <TradeInBanner />

      {/* 4. OUR REPAIR SERVICES - COMPACT & MOBILE FIRST */}
      <section id="popular-repairs" className="py-8 sm:py-12 md:py-5 container mx-auto px-4 sm:px-6 lg:px-12 bg-slate-50">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-6 sm:mb-8 md:mb-12"
        >
          
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-black mt-3 mb-2 sm:mb-4">
            What We Repair
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto text-sm sm:text-base md:text-lg font-medium">
            Professional repair and upgrade services for gaming systems, laptops, and electronics.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {services.map((service, idx) => (
            <Link href="/repair" key={idx} className="group block h-full">
              <motion.div
                variants={fadeUp}
                className="bg-violet-700 p-5 sm:p-6 md:p-8 rounded-2xl md:rounded-[2rem] shadow-md border border-violet-600 hover:shadow-xl hover:shadow-violet-600/30 transition-all duration-300 h-full flex flex-col items-start transform hover:-translate-y-1 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 backdrop-blur-2xl rounded-bl-full -z-10 group-hover:scale-125 transition-transform duration-500"></div>

                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white shadow-md border border-white group-hover:border-black rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 group-hover:bg-black text-black group-hover:text-white transition-colors duration-300 z-10">
                  {React.cloneElement(service.icon, {
                    className: "w-6 h-6 sm:w-7 sm:h-7 transition-colors",
                  })}
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white mb-2 tracking-tight">
                  {service.title}
                </h3>
                <p className="text-violet-100 text-xs sm:text-sm md:text-base leading-relaxed font-medium mb-6 flex-grow">
                  {service.desc}
                </p>

                <span className="bg-white text-black text-xs sm:text-sm font-bold flex items-center gap-2 group-hover:gap-3 transition-all mt-auto px-4 py-2 sm:px-5 sm:py-2.5 rounded-full group-hover:bg-black group-hover:text-white border border-transparent">
                  Learn More <ArrowRight className="w-4 h-4" />
                </span>
              </motion.div>
            </Link>
          ))}
        </motion.div>

        <div className="text-center mt-6 sm:mt-8 md:mt-12">
          <Link href="/repair">
            <button className="bg-black border-2 border-black text-white font-black px-6 py-3 sm:px-8 sm:py-3.5 rounded-full hover:bg-violet-700 hover:border-violet-700 transition-all text-xs sm:text-sm md:text-base inline-flex items-center gap-2 shadow-md">
              View All Repair Services <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </Link>
        </div>
      </section>

      <RepairBanner />

      {/* WHY CHOOSE US - COMPACT SEAMLESS FLOW */}
      <section id="why-choose-us" className="py-8 sm:py-12 md:py-10 container mx-auto px-4 sm:px-6 lg:px-12 bg-slate-50">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-6 sm:mb-8 md:mb-12"
        >
          <span className="text-black font-extrabold tracking-wider text-xs sm:text-sm uppercase bg-black/5 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full border border-black/10">
            WHY CHOOSE US
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-black mt-3 mb-2 sm:mb-4">
            The Al Dana Advantage
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto text-sm sm:text-base md:text-lg font-medium">
            Discover why gamers across the region trust us with their high-performance equipment.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {whyChooseUsItems.map((item, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              className="bg-white p-5 sm:p-6 rounded-2xl md:rounded-[2rem] shadow-sm border border-slate-200/80 hover:shadow-lg hover:border-violet-600/30 transition-all duration-300 flex flex-col items-start group"
            >
              <div className="w-12 h-12 bg-violet-50 border border-violet-100 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 group-hover:bg-violet-600 group-hover:text-white transition-colors duration-300">
                {React.cloneElement(item.icon, {
                  className: "w-6 h-6 text-violet-600 group-hover:text-white transition-colors",
                })}
              </div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-2 tracking-tight">
                {item.title}
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 5. HOW OUR REPAIR PROCESS WORKS - MOBILE OPTIMIZED FLOW */}
      <section id="how-it-works" className="py-10 sm:py-14 md:py-20 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-72 md:w-96 h-72 md:h-96 bg-violet-900/20 rounded-full mix-blend-screen filter blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-72 md:w-96 h-72 md:h-96 bg-fuchsia-900/10 rounded-full mix-blend-screen filter blur-[100px] pointer-events-none"></div>

        <div
          className="absolute inset-0 z-0 opacity-[0.12] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, #475569 1px, transparent 1px), linear-gradient(to bottom, #475569 1px, transparent 1px)",
            backgroundSize: "3rem 3rem",
          }}
        ></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-8 sm:mb-12 md:mb-16"
          >
            <span className="inline-flex items-center gap-1.5 text-violet-400 font-bold tracking-wider text-xs uppercase bg-violet-500/10 px-3.5 py-1.5 rounded-full border border-violet-500/20 mb-3 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse"></span>
              How It Works
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 tracking-tight">
              Simple. Transparent. Reliable.
            </h2>
          </motion.div>

          <div className="relative max-w-7xl mx-auto">
            <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-transparent via-violet-600/50 to-transparent z-0"></div>

            <div className="flex flex-col lg:flex-row justify-between gap-4 sm:gap-6 lg:gap-4 relative">
              <div className="lg:hidden absolute top-6 bottom-6 left-6 w-[2px] bg-gradient-to-b from-transparent via-violet-600/50 to-transparent z-0"></div>

              {processSteps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="relative z-10 flex lg:flex-col items-start lg:items-center text-left lg:text-center w-full lg:flex-1 group"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-slate-900 border-2 border-slate-700 rounded-full flex items-center justify-center text-base sm:text-lg font-black text-slate-300 group-hover:bg-violet-700 group-hover:border-violet-500 group-hover:text-white transition-all duration-300 flex-shrink-0 z-10 relative shadow-md">
                    {step.step}
                  </div>

                  <div className="ml-4 sm:ml-6 lg:ml-0 lg:mt-6 w-full">
                    <div className="bg-white/[0.03] backdrop-blur-md border border-white/5 group-hover:border-violet-500/30 rounded-xl sm:rounded-2xl p-4 sm:p-5 transition-all duration-300 h-full">
                      <h4 className="font-bold text-base sm:text-lg mb-1 sm:mb-2 text-slate-100 group-hover:text-violet-300 transition-colors">
                        {step.title}
                      </h4>
                      <p className="text-slate-400 text-xs sm:text-sm font-medium leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GAMING SPECIALIST SECTION - TIGHT & COMPACT */}
      <section className="bg-white py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative h-64 sm:h-80 md:h-[450px] rounded-2xl md:rounded-[2.5rem] overflow-hidden group shadow-xl border-2 sm:border-4 border-slate-50"
          >
            <img
              src="https://static.webx.pk/files/83855/Images/asus-rog-strix-g16-g614fm-ws94-gaming-laptop---16-inch-wuxga-83855-2449969-170925111622355.webp"
              alt="Specialist Setup"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <span className="text-violet-600 font-extrabold tracking-wider text-xs sm:text-sm uppercase bg-violet-100 px-3 py-1 rounded-full">
              GAMING SPECIALISTS
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 mt-3 mb-3 sm:mb-4 leading-snug">
              We Keep Your Gaming Setup Running at Its Best.
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm md:text-base mb-6 leading-relaxed font-medium">
              Whether your gaming PC is overheating, your laptop is slowing down, or you're looking for a massive performance upgrade, Al Dana Gaming provides fast, professional solutions.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 mb-6 sm:mb-8">
              {[
                "Performance upgrades",
                "Thermal paste replacement",
                "RAM & SSD upgrades",
                "Cooling solutions",
                "GPU upgrades",
                "Windows & software setup",
                "CPU upgrades",
                "Gaming PC maintenance",
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 sm:gap-3 text-slate-800 text-xs sm:text-sm font-bold"
                >
                  <div className="bg-violet-100 p-1 rounded-full flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-violet-700" />
                  </div>
                  {item}
                </div>
              ))}
            </div>

            <Link href="/about">
              <button className="bg-slate-900 hover:bg-violet-700 text-white px-6 py-3 sm:px-8 sm:py-3.5 rounded-full text-xs sm:text-sm md:text-base font-black transition-all shadow-md inline-flex items-center gap-2">
                Learn More About Us <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* HARDWARE STORE PROMO - TIGHT FLOW */}
      <section className="relative w-full py-10 sm:py-14 md:py-20 bg-slate-950 overflow-hidden border-y border-slate-900">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute -top-[10%] -right-[10%] w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] bg-violet-600/20 rounded-full mix-blend-screen filter blur-[100px]"></div>
          <div className="absolute -bottom-[10%] -left-[10%] w-[40vw] h-[40vw] max-w-[400px] max-h-[400px] bg-cyan-600/20 rounded-full mix-blend-screen filter blur-[100px]"></div>
        </div>

        <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-xl"
            >
              <div className="inline-flex items-center gap-1.5 py-1 px-3 sm:px-4 rounded-full bg-white/5 text-cyan-400 font-extrabold tracking-wider text-xs uppercase mb-3 border border-white/10">
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Premium Hardware Store</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mt-1 mb-4 leading-tight tracking-tight text-white">
                Upgrade Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400">
                  Reality.
                </span>
              </h2>

              <p className="text-slate-300 text-xs sm:text-sm md:text-base mb-6 font-medium leading-relaxed border-l-2 sm:border-l-4 border-violet-500 pl-3 sm:pl-4">
                Explore our curated collection of ultimate performance gaming PCs, high-end components, and cutting-edge accessories.
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {[
                  "Pre-Built Rigs",
                  "Custom Builds",
                  "Graphics Cards",
                  "Processors",
                  "Gaming Laptops",
                  "Peripherals",
                ].map((cat, idx) => (
                  <span
                    key={idx}
                    className="bg-slate-900/60 border border-slate-700/50 px-3 py-1.5 rounded-full text-xs font-bold text-slate-200 transition-all hover:bg-violet-600/20 hover:border-violet-500/50 hover:text-white cursor-pointer"
                  >
                    {cat}
                  </span>
                ))}
              </div>

              <Link href="/shop">
                <button className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-black transition-all shadow-md text-xs sm:text-sm md:text-base inline-flex items-center justify-center gap-2 w-full sm:w-auto">
                  Shop The Collection <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative w-full flex justify-center items-center min-h-[260px] sm:min-h-[350px]"
            >
              <img
                src="https://www.jouleperformance.com/media/.renditions/JoulePerformance/Categories/gamingpc/gamingpc-setup.png"
                alt="Premium Gaming Hardware Shop"
                className="relative z-10 max-w-full max-h-[350px] sm:max-h-[450px] object-contain drop-shadow-2xl"
              />

              <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-20 bg-slate-900/90 backdrop-blur-md border border-white/10 p-2.5 sm:p-3 rounded-xl shadow-lg flex items-center gap-2.5">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-violet-500/20 flex items-center justify-center">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-yellow-400" />
                </div>
                <div>
                  <p className="text-white font-black text-xs sm:text-sm leading-none">4.9/5</p>
                  <p className="text-slate-400 text-[10px] sm:text-xs font-bold mt-0.5">Reviews</p>
                </div>
              </div>

              <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 z-20 bg-slate-900/90 backdrop-blur-md border border-white/10 p-2.5 sm:p-3 rounded-xl shadow-lg flex items-center gap-2.5">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                </div>
                <div>
                  <p className="text-white font-black text-xs sm:text-sm leading-none">In Stock</p>
                  <p className="text-slate-400 text-[10px] sm:text-xs font-bold mt-0.5">Ready to Ship</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS - COMPACT */}
      <section id="customer-reviews" className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-6 sm:mb-8 md:mb-12"
          >
            <span className="text-violet-600 font-extrabold tracking-wider text-xs sm:text-sm uppercase bg-violet-100 px-3 py-1 rounded-full">
              TESTIMONIALS
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 mt-3">
              Trusted by Gamers in UAE
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                name: "Ahmed K.",
                role: "Esports Player",
                text: "My liquid cooler leaked and ruined my motherboard. Al Dana fixed it in 2 days and saved my GPU. Legends.",
              },
              {
                name: "Sarah M.",
                role: "Content Creator",
                text: "Traded in my old MSI laptop for a custom build. The buy-back price was fair, and the new PC runs Warzone flawlessly.",
              },
              {
                name: "Tariq R.",
                role: "Casual Gamer",
                text: "Fast, transparent, and fairly priced. They even cleaned up my cable management for free. Highly recommended shop.",
              },
            ].map((review, idx) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-slate-50 p-5 sm:p-6 md:p-8 rounded-2xl border border-slate-100 relative flex flex-col justify-between"
              >
                <Quote className="w-8 h-8 text-violet-200 absolute top-5 right-5 rotate-180" />
                <div>
                  <div className="flex text-amber-400 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-700 font-medium text-xs sm:text-sm leading-relaxed mb-6">
                    "{review.text}"
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-violet-200 rounded-full flex items-center justify-center text-violet-700 font-black text-sm">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{review.name}</h4>
                    <p className="text-[11px] sm:text-xs text-slate-500 font-medium">{review.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
<section className="py-10 sm:py-14 md:py-20 bg-violet-800 border-t border-violet-700/50">
  <div className="container mx-auto px-4 sm:px-6 lg:px-10 max-w-5xl">
    
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      className="text-center mb-8 sm:mb-10 md:mb-12"
    >
      <span className="inline-flex items-center text-violet-700 font-extrabold tracking-wider text-xs sm:text-sm uppercase bg-white px-4 py-1.5 rounded-full shadow-sm">
        FAQ
      </span>

      <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mt-4 tracking-tight">
        Frequently Asked Questions
      </h2>

      <p className="text-violet-100 text-sm sm:text-base max-w-2xl mx-auto mt-3 leading-relaxed">
        Find answers to the most common questions about our services,
        process, pricing, and support.
      </p>
    </motion.div>

    <div className="space-y-3 sm:space-y-4">
      {faqs.map((faq, idx) => (
        <motion.div
          key={idx}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${
            openFaqIndex === idx
              ? "border-violet-300 shadow-lg shadow-violet-950/10"
              : "border-slate-200 shadow-sm hover:border-violet-200 hover:shadow-md"
          }`}
        >
          <button
            onClick={() =>
              setOpenFaqIndex(openFaqIndex === idx ? null : idx)
            }
            aria-expanded={openFaqIndex === idx}
            className="w-full px-5 sm:px-7 md:px-8 py-5 sm:py-6 text-left flex justify-between items-center gap-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-inset"
          >
            <span className="font-bold text-sm sm:text-base md:text-lg text-slate-900 leading-snug">
              {faq.q}
            </span>

            <span
              className={`flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full flex-shrink-0 transition-all duration-300 ${
                openFaqIndex === idx
                  ? "bg-violet-600 text-white"
                  : "bg-violet-50 text-violet-600"
              }`}
            >
              <ChevronDown
                className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${
                  openFaqIndex === idx ? "rotate-180" : ""
                }`}
              />
            </span>
          </button>

          <AnimatePresence initial={false}>
            {openFaqIndex === idx && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-5 sm:px-7 md:px-8 pb-5 sm:pb-6 md:pb-7">
                  <div className="h-px bg-slate-100 mb-4 sm:mb-5" />

                  <p className="text-slate-600 text-sm sm:text-base font-medium leading-7 max-w-4xl">
                    {faq.a}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>

  </div>
</section>
      {/* CONTACT / REPAIR REQUEST FORM - COMPACT & RESPONSIVE */}
      <section className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="bg-white rounded-2xl md:rounded-[3rem] shadow-xl border border-slate-100 overflow-hidden flex flex-col lg:flex-row max-w-6xl mx-auto">
            {/* Left Info */}
            <div className="lg:w-2/5 bg-slate-900 text-white p-6 sm:p-10 lg:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-violet-600/30 rounded-full filter blur-[60px]"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-600/20 rounded-full filter blur-[60px]"></div>

              <h3 className="text-2xl sm:text-3xl text-white mb-3 sm:mb-4 relative z-10 leading-tight font-black">
                Need Help With Your Device?
              </h3>
              <p className="text-slate-400 mb-6 sm:mb-8 text-xs sm:text-sm relative z-10 font-medium leading-relaxed">
                Tell us what's wrong with your gaming PC, laptop or console and our team will get back to you quickly.
              </p>

              <div className="space-y-4 sm:space-y-6 relative z-10">
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm group-hover:bg-violet-600 transition-colors flex-shrink-0">
                    <MapPin className="w-5 h-5 text-violet-300 group-hover:text-white" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs sm:text-sm">UAE Location</h5>
                    <p className="text-slate-400 text-xs font-medium">Abu Dhabi, United Arab Emirates</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm group-hover:bg-violet-600 transition-colors flex-shrink-0">
                    <Phone className="w-5 h-5 text-violet-300 group-hover:text-white" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs sm:text-sm">Phone</h5>
                    <p className="text-slate-400 text-xs font-medium">+971 50 123 4567</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm group-hover:bg-violet-600 transition-colors flex-shrink-0">
                    <Mail className="w-5 h-5 text-violet-300 group-hover:text-white" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs sm:text-sm">Email</h5>
                    <p className="text-slate-400 text-xs font-medium">info@aldanagaming.ae</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form */}
            <div className="lg:w-3/5 p-6 sm:p-10 lg:p-12 bg-slate-50/50">
              <h3 className="text-2xl font-black text-slate-900 mb-6">
                Request a Service
              </h3>
              <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-900">Full Name</label>
                  <input
                    type="text"
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-600/10 transition-all font-medium shadow-sm"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-900">Phone Number</label>
                  <input
                    type="tel"
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-600/10 transition-all font-medium shadow-sm"
                    placeholder="+971 50 000 0000"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-900">Email</label>
                  <input
                    type="email"
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-600/10 transition-all font-medium shadow-sm"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-900">Device Type</label>
                  <select className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-600/10 transition-all font-medium appearance-none shadow-sm cursor-pointer">
                    <option>Gaming PC</option>
                    <option>Gaming Laptop</option>
                    <option>Console</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-bold text-slate-900">Brand / Model</label>
                  <input
                    type="text"
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-600/10 transition-all font-medium shadow-sm"
                    placeholder="e.g. ASUS ROG Strix G15"
                  />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-bold text-slate-900">Describe the Problem</label>
                  <textarea
                    rows={3}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-600/10 transition-all font-medium resize-none shadow-sm"
                    placeholder="Tell us exactly what's happening..."
                  ></textarea>
                </div>
                <div className="sm:col-span-2 pt-2">
                  <button
                    type="submit"
                    className="w-full bg-violet-700 hover:bg-violet-800 text-white font-black py-3.5 rounded-xl transition-all shadow-md text-xs sm:text-sm flex items-center justify-center gap-2"
                  >
                    Submit Service Request <MessageSquare className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}