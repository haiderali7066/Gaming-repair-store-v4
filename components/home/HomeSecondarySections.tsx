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

const brands = [
  "ASUS ROG",
  "Alienware",
  "MSI",
  "Razer",
  "Corsair",
  "Logitech G",
  "HyperX",
  "Gigabyte",
  "Intel",
  "AMD Ryzen",
  "NVIDIA",
];

const services = [
  {
    title: "Gaming PC Repair",
    desc: "Diagnostics, hardware faults, upgrades, overheating and performance issues.",
    icon: <Cpu className="w-7 h-7 text-violet-600" />,
  },
  {
    title: "Gaming Laptop",
    desc: "Screen, battery, charging, keyboard, cooling and hardware repairs.",
    icon: <MonitorSmartphone className="w-7 h-7 text-violet-600" />,
  },
  {
    title: "PC & Laptop",
    desc: "Hardware, software, Windows, storage, RAM and general troubleshooting.",
    icon: <Wrench className="w-7 h-7 text-violet-600" />,
  },
  {
    title: "GPU Repair",
    desc: "Graphics card diagnostics, cooling and performance-related issues.",
    icon: <Zap className="w-7 h-7 text-violet-600" />,
  },
  {
    title: "Ipad & Console",
    desc: "Gaming console diagnostics, hardware and software services.",
    icon: <Gamepad2 className="w-7 h-7 text-violet-600" />,
  },
  {
    title: "Maintenance",
    desc: "Deep cleaning, thermal paste replacement and performance maintenance.",
    icon: <CheckCircle2 className="w-7 h-7 text-violet-600" />,
  },
];

const whyChooseUsItems = [
  {
    title: "Certified Experts",
    desc: "Our technicians are specialized and experienced in high-end gaming hardware and complex board-level repairs.",
    icon: <ShieldCheck className="w-7 h-7 text-violet-600" />,
  },
  {
    title: "Fast Turnaround",
    desc: "We value your gaming time. Most diagnostics and repairs are completed swiftly without compromising on quality.",
    icon: <Clock className="w-7 h-7 text-violet-600" />,
  },
  {
    title: "Genuine Parts",
    desc: "We use only high-grade, original, or premium manufacturer-approved replacement components for absolute reliability.",
    icon: <Award className="w-7 h-7 text-violet-600" />,
  },
  {
    title: "Transparent Pricing",
    desc: "No hidden costs or unexpected fees. We provide upfront quotes and only proceed after your complete approval.",
    icon: <ThumbsUp className="w-7 h-7 text-violet-600" />,
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
    desc: "We provide a  quote and proceed only with your approval.",
  },
  {
    step: "04",
    title: "Fix & Test",
    desc: "Professional repair followed by rigorous stress testing.",
  },
  {
    step: "05",
    title: "Collection",
    desc: "Pick up your fully functional device, backed by our warranty.",
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
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

export function HomeSecondarySections() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Auto-advance hero slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans overflow-x-hidden selection:bg-violet-600 selection:text-white">
      {/* 2. BRANDS MARQUEE */}
      <section id="brands-we-service" className="bg-slate-900 py-6 overflow-hidden border-y border-slate-800">
        <div className="flex w-[200%] md:w-max">
          <motion.div
            className="flex items-center gap-12 md:gap-24 px-6 md:px-12 w-1/2 justify-around"
            animate={{ x: [0, "-100%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
          >
            {[...brands, ...brands].map((brand: string, idx: number) => (
              <span
                key={idx}
                className="text-slate-400 font-black text-xl md:text-2xl uppercase tracking-widest whitespace-nowrap opacity-50 hover:opacity-100 hover:text-white transition-opacity cursor-default"
              >
                {brand}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      <TradeInBanner />

      

      {/* 4. OUR REPAIR SERVICES */}
      <section id="popular-repairs" className="py-24 md:py-32 container mx-auto px-6 lg:px-12 bg-slate-50">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-16 md:mb-20"
        >
          <span className="text-black font-extrabold tracking-widest text-sm uppercase bg-black/5 px-4 py-1.5 rounded-full border border-black/10">
            OUR SERVICES
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-black mt-6 mb-6">
            What We Repair
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg font-medium">
            Professional repair and upgrade services for gaming systems, laptops
            and electronics.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {services.map((service, idx) => (
            <Link href="/repair" key={idx} className="group block h-full">
              <motion.div
                variants={fadeUp}
                className="bg-violet-700 p-8 md:p-10 rounded-[2rem] shadow-xl border border-violet-600 hover:shadow-2xl hover:shadow-violet-600/40 transition-all duration-300 h-full flex flex-col items-start transform hover:-translate-y-2 relative overflow-hidden"
              >
                {/* Modern glass decorative element */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 backdrop-blur-2xl rounded-bl-full -z-10 group-hover:scale-125 transition-transform duration-700"></div>

                {/* High-contrast white/black icon container (Inverted) */}
                <div className="w-16 h-16 bg-white shadow-lg border border-white group-hover:border-black rounded-2xl flex items-center justify-center mb-8 group-hover:bg-black text-black group-hover:text-white transition-colors duration-300 z-10">
                  {React.cloneElement(service.icon, {
                    className: "w-8 h-8 transition-colors",
                  })}
                </div>

                <h3 className="text-2xl font-black text-white mb-4 tracking-tight">
                  {service.title}
                </h3>
                <p className="text-violet-100 leading-relaxed font-medium mb-8 flex-grow">
                  {service.desc}
                </p>

                {/* Upgraded white/black button inside the card (Inverted) */}
                <span className="bg-white text-black font-bold flex items-center gap-2 group-hover:gap-4 transition-all mt-auto px-6 py-3 rounded-full group-hover:bg-black group-hover:text-white border border-transparent">
                  Learn More <ArrowRight className="w-5 h-5" />
                </span>
              </motion.div>
            </Link>
          ))}
        </motion.div>

        <div className="text-center mt-16">
          <Link href="/repair">
            <button className="bg-black border-2 border-black text-white font-black px-10 py-4 rounded-full hover:bg-violet-700 hover:border-violet-700 transition-all inline-flex items-center gap-3 shadow-lg">
              View All Repair Services <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </section>

      {/*  WHY CHOOSE US */}
      <section id="why-choose-us" className="mt-10 container mx-auto px-6 lg:px-12 bg-slate-50">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-16 md:mb-20"
        >
          <span className="text-black font-extrabold tracking-widest text-sm uppercase bg-black/5 px-4 py-1.5 rounded-full border border-black/10">
            WHY CHOOSE US
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-black mt-6 mb-6">
            The Al Dana Advantage
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg font-medium">
            Discover why gamers across the region trust us with their high-performance equipment.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {whyChooseUsItems.map((item, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-200/80 hover:shadow-xl hover:border-violet-600/30 transition-all duration-300 flex flex-col items-start group"
            >
              <div className="w-14 h-14 bg-violet-50 border border-violet-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-violet-600 group-hover:text-white transition-colors duration-300">
                {React.cloneElement(item.icon, {
                  className: "w-7 h-7 text-violet-600 group-hover:text-white transition-colors",
                })}
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-3 tracking-tight">
                {item.title}
              </h3>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <RepairBanner />

      {/* 5. HOW OUR REPAIR PROCESS WORKS (Ultra Modern & Premium) */}
      <section id="how-it-works" className="py-24 md:py-32 bg-slate-950 text-white relative overflow-hidden">
        {/* Deep Ambient Glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-900/20 rounded-full mix-blend-screen filter blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-fuchsia-900/10 rounded-full mix-blend-screen filter blur-[120px] pointer-events-none"></div>

        {/* Subtle Tech Grid Background */}
        <div
          className="absolute inset-0 z-0 opacity-[0.15] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, #475569 1px, transparent 1px), linear-gradient(to bottom, #475569 1px, transparent 1px)",
            backgroundSize: "4rem 4rem",
            maskImage:
              "radial-gradient(ellipse 80% 80% at 50% 50%, #000 10%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 80% at 50% 50%, #000 10%, transparent 100%)",
          }}
        ></div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          {/* Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-24 md:mb-32"
          >
            <span className="inline-flex items-center gap-2 text-violet-400 font-bold tracking-widest text-xs sm:text-sm uppercase bg-violet-500/10 px-5 py-2 rounded-full border border-violet-500/20 mb-6 shadow-[0_0_15px_rgba(139,92,246,0.15)]">
              <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse"></span>
              How It Works
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 tracking-tight">
              Simple. Transparent. Reliable.
            </h2>
          </motion.div>

          <div className="relative max-w-7xl mx-auto">
            {/* Desktop Glowing Connecting Line (Centered perfectly behind the 5rem/20 circles at top-10) */}
            <div className="hidden lg:block absolute top-10 left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-transparent via-violet-600/50 to-transparent z-0"></div>

            <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-6 relative">
              {/* Mobile Glowing Vertical Line (Centered perfectly behind circles at left-10) */}
              <div className="lg:hidden absolute top-[10%] bottom-[10%] left-10 w-[2px] bg-gradient-to-b from-transparent via-violet-600/50 to-transparent z-0"></div>

              {processSteps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="relative z-10 flex lg:flex-col items-start lg:items-center text-left lg:text-center w-full lg:flex-1 group cursor-default"
                >
                  {/* Step Circle Indicator */}
                  <div className="w-20 h-20 bg-slate-900 border-2 border-slate-700/80 rounded-full flex items-center justify-center text-2xl font-black text-slate-400 group-hover:bg-violet-700 group-hover:border-violet-500 group-hover:text-white group-hover:scale-110 transition-all duration-500 flex-shrink-0 z-10 relative shadow-xl group-hover:shadow-[0_0_30px_rgba(139,92,246,0.6)]">
                    {step.step}
                    {/* Inner glowing ping on hover */}
                    <div className="absolute inset-0 rounded-full border-2 border-violet-400 opacity-0 group-hover:animate-ping z-[-1]"></div>
                  </div>

                  {/* Step Glassmorphism Card */}
                  <div className="ml-8 lg:ml-0 lg:mt-10 pt-2 lg:pt-0 w-full">
                    <div className="bg-white/[0.02] hover:bg-white/[0.04] backdrop-blur-md border border-white/5 group-hover:border-violet-500/30 rounded-3xl p-6 md:p-8 transition-all duration-500 h-full group-hover:-translate-y-2 group-hover:shadow-[0_10px_40px_-15px_rgba(139,92,246,0.3)]">
                      <h4 className="font-bold text-xl md:text-2xl mb-4 text-slate-100 group-hover:text-violet-300 transition-colors duration-300">
                        {step.title}
                      </h4>
                      <p className="text-slate-400 text-sm md:text-base font-medium leading-relaxed">
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

      

      {/*  GAMING SPECIALIST SECTION */}
      <section className="bg-white py-24 md:py-32">
        <div className="container mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative h-[400px] md:h-[650px] rounded-[3rem] overflow-hidden group shadow-2xl border-4 border-slate-50"
          >
            <img
              src="https://static.webx.pk/files/83855/Images/asus-rog-strix-g16-g614fm-ws94-gaming-laptop---16-inch-wuxga-83855-2449969-170925111622355.webp"
              alt="Specialist Setup"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <span className="text-violet-600 font-extrabold tracking-widest text-sm uppercase bg-violet-100 px-4 py-1.5 rounded-full">
              GAMING SPECIALISTS
            </span>
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mt-6 mb-6 leading-tight">
              We Keep Your Gaming Setup Running at Its Best.
            </h2>
            <p className="text-slate-600 text-lg mb-10 leading-relaxed font-medium">
              Whether your gaming PC is overheating, your laptop is slowing
              down, or you're looking for a massive performance upgrade, Al Dana
              Gaming provides professional solutions to get you back to the
              lobby, faster.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-6 mb-12">
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
                  className="flex items-center gap-3 text-slate-800 font-bold"
                >
                  <div className="bg-violet-100 p-1.5 rounded-full">
                    <CheckCircle2 className="w-5 h-5 text-violet-700 flex-shrink-0" />
                  </div>{" "}
                  {item}
                </div>
              ))}
            </div>
            <Link href="/about">
              <button className="bg-slate-900 hover:bg-violet-700 text-white px-10 py-4 rounded-full font-black transition-all shadow-xl hover:shadow-violet-700/30 inline-flex items-center gap-3 transform hover:-translate-y-1">
                Learn More About Us <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      

      <section className="relative w-full py-24 md:py-32 bg-slate-950 overflow-hidden border-y border-slate-900">
        {/* Full-width ambient glowing backgrounds */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute -top-[20%] -right-[10%] w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] bg-violet-600/20 rounded-full mix-blend-screen filter blur-[120px]"></div>
          <div className="absolute -bottom-[20%] -left-[10%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] bg-cyan-600/20 rounded-full mix-blend-screen filter blur-[120px]"></div>

          {/* Subtle Tech Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.15]"
            style={{
              backgroundImage:
                "linear-gradient(to right, #475569 1px, transparent 1px), linear-gradient(to bottom, #475569 1px, transparent 1px)",
              backgroundSize: "4rem 4rem",
              maskImage:
                "radial-gradient(ellipse 100% 100% at 50% 50%, #000 20%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 100% 100% at 50% 50%, #000 20%, transparent 100%)",
            }}
          ></div>
        </div>

        <div className="w-full max-w-[1536px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">
            {/* Left Content Column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/5 backdrop-blur-md text-cyan-400 font-extrabold tracking-widest text-xs uppercase mb-6 border border-white/10 shadow-[0_0_15px_rgba(34,211,238,0.15)]">
                <ShoppingCart className="w-4 h-4" />
                <span>Premium Hardware Store</span>
              </div>

              <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mt-2 mb-6 leading-[1.05] tracking-tight text-white drop-shadow-md">
                Upgrade Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400">
                  Reality.
                </span>
              </h2>

              <p className="text-slate-300 text-lg md:text-xl mb-10 font-medium max-w-xl leading-relaxed border-l-4 border-violet-500 pl-5">
                Explore our curated collection of ultimate performance gaming
                PCs, high-end components, and cutting-edge accessories. Built
                for gamers, by gamers.
              </p>

              <div className="flex flex-wrap gap-3 md:gap-4 mb-10">
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
                    className="bg-slate-900/50 backdrop-blur-md border border-slate-700/50 px-5 py-2.5 rounded-full text-sm font-bold shadow-sm text-slate-200 transition-all hover:bg-violet-600/20 hover:border-violet-500/50 hover:text-white hover:-translate-y-0.5 cursor-pointer"
                  >
                    {cat}
                  </span>
                ))}
              </div>

              <Link href="/shop">
                <button className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white px-8 md:px-10 py-4 md:py-5 rounded-xl font-black transition-all shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:shadow-[0_0_40px_rgba(139,92,246,0.6)] text-lg inline-flex items-center gap-3 transform hover:-translate-y-1 w-full sm:w-auto justify-center group/btn">
                  Shop The Collection
                  <ArrowRight className="w-6 h-6 text-white group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </Link>
            </motion.div>

            {/* Right Image Column */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 20 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
              className="relative w-full h-full flex justify-center items-center min-h-[400px] lg:min-h-[600px] mt-10 lg:mt-0"
            >
              {/* Core Image Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-violet-500/20 to-transparent rounded-full blur-3xl transform scale-75 z-0"></div>

              <img
                src="https://www.jouleperformance.com/media/.renditions/JoulePerformance/Categories/gamingpc/gamingpc-setup.png"
                alt="Premium Gaming Hardware Shop"
                className="relative z-10 max-w-full max-h-[110%] object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.6)] transform hover:scale-105 transition-transform duration-1000 ease-out"
              />

              {/* Floating Glassmorphism Badge 1: Top Right */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-10 right-4 lg:-right-4 z-20 bg-slate-900/80 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-violet-500/20 flex items-center justify-center">
                  <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                </div>
                <div>
                  <p className="text-white font-black text-lg leading-none">
                    4.9/5
                  </p>
                  <p className="text-slate-400 text-xs font-bold mt-1">
                    Customer Reviews
                  </p>
                </div>
              </motion.div>

              {/* Floating Glassmorphism Badge 2: Bottom Left */}
              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute bottom-10 left-4 lg:-left-4 z-20 bg-slate-900/80 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <p className="text-white font-black text-lg leading-none">
                    In Stock
                  </p>
                  <p className="text-slate-400 text-xs font-bold mt-1">
                    Ready to Ship
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/*  TESTIMONIALS (New) */}
      <section id="customer-reviews" className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-16 md:mb-20"
          >
            <span className="text-violet-600 font-extrabold tracking-widest text-sm uppercase bg-violet-100 px-4 py-1.5 rounded-full">
              TESTIMONIALS
            </span>
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mt-6 mb-6">
              Trusted by Gamers in UAE
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                name: "Ahmed K.",
                role: "Esports Player",
                text: "My liquid cooler leaked and ruined my motherboard. Al Dana fixed it in 2 days and saved my GPU. Legends.",
              },
              {
                name: "Sarah M.",
                role: "Content Creator",
                text: "Traded in my old MSI laptop for a custom build. The buy-back price was fair, and the new PC runs Premiere Pro and Warzone flawlessly.",
              },
              {
                name: "Tariq R.",
                role: "Casual Gamer",
                text: "Fast, transparent, and fairly priced. They even cleaned up my cable management for free. Highly recommended repair shop.",
              },
            ].map((review, idx) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-slate-50 p-8 md:p-10 rounded-[2rem] border border-slate-100 relative"
              >
                <Quote className="w-10 h-10 text-violet-200 absolute top-8 right-8 rotate-180" />
                <div className="flex text-amber-400 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-slate-700 font-medium mb-8 leading-relaxed">
                  "{review.text}"
                </p>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 bg-violet-200 rounded-full flex items-center justify-center text-violet-700 font-black text-lg">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{review.name}</h4>
                    <p className="text-sm text-slate-500 font-medium">
                      {review.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/*  FAQ SECTION (New) */}
      <section className="py-24 bg-slate-50 border-t border-slate-200/60">
        <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <span className="text-violet-600 font-extrabold tracking-widest text-sm uppercase bg-violet-100 px-4 py-1.5 rounded-full">
              FAQ
            </span>
            <h2 className="text-4xl font-black text-slate-900 mt-6">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm"
              >
                <button
                  onClick={() =>
                    setOpenFaqIndex(openFaqIndex === idx ? null : idx)
                  }
                  className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
                >
                  <span className="font-bold text-lg text-slate-900 pr-8">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-violet-600 transition-transform duration-300 flex-shrink-0 ${openFaqIndex === idx ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {openFaqIndex === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-5 text-slate-600 font-medium leading-relaxed"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/*  CONTACT / REPAIR REQUEST FORM */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="bg-white rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-slate-100 overflow-hidden flex flex-col lg:flex-row max-w-7xl mx-auto">
            {/* Left Info */}
            <div className="lg:w-2/5 bg-slate-900 text-white p-10 md:p-16 lg:p-20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/30 rounded-full filter blur-[80px]"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/20 rounded-full filter blur-[80px]"></div>

              <h3 className="text-3xl md:text-4xl text-white mb-6 relative z-10 leading-tight">
                Need Help With Your Device?
              </h3>
              <p className="text-slate-400 mb-12 md:mb-16 text-lg relative z-10 font-medium">
                Tell us what's wrong with your gaming PC, laptop or other device
                and our team will get back to you quickly.
              </p>

              <div className="space-y-8 relative z-10">
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm group-hover:bg-violet-600 transition-colors">
                    <MapPin className="w-6 h-6 text-violet-300 group-hover:text-white" />
                  </div>
                  <div>
                    <h5 className="font-bold text-lg">UAE Location</h5>
                    <p className="text-slate-400 font-medium">
                      Abu Dhabi, United Arab Emirates
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm group-hover:bg-violet-600 transition-colors">
                    <Phone className="w-6 h-6 text-violet-300 group-hover:text-white" />
                  </div>
                  <div>
                    <h5 className="font-bold text-lg">Phone</h5>
                    <p className="text-slate-400 font-medium">
                      +971 50 123 4567
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm group-hover:bg-violet-600 transition-colors">
                    <Mail className="w-6 h-6 text-violet-300 group-hover:text-white" />
                  </div>
                  <div>
                    <h5 className="font-bold text-lg">Email</h5>
                    <p className="text-slate-400 font-medium">
                      info@aldanagaming.ae
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form */}
            <div className="lg:w-3/5 p-10 md:p-16 lg:p-20 bg-slate-50/50">
              <h3 className="text-3xl font-black text-slate-900 mb-10">
                Request a Service
              </h3>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-900">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:border-violet-600 focus:ring-4 focus:ring-violet-600/10 transition-all font-medium shadow-sm"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-900">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:border-violet-600 focus:ring-4 focus:ring-violet-600/10 transition-all font-medium shadow-sm"
                    placeholder="+971 50 000 0000"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-900">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:border-violet-600 focus:ring-4 focus:ring-violet-600/10 transition-all font-medium shadow-sm"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-900">
                    Device Type
                  </label>
                  <select className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:border-violet-600 focus:ring-4 focus:ring-violet-600/10 transition-all font-medium appearance-none shadow-sm cursor-pointer">
                    <option>Gaming PC</option>
                    <option>Gaming Laptop</option>
                    <option>Console</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="space-y-3 md:col-span-2">
                  <label className="text-sm font-bold text-slate-900">
                    Brand / Model
                  </label>
                  <input
                    type="text"
                    className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:border-violet-600 focus:ring-4 focus:ring-violet-600/10 transition-all font-medium shadow-sm"
                    placeholder="e.g. ASUS ROG Strix G15"
                  />
                </div>
                <div className="space-y-3 md:col-span-2">
                  <label className="text-sm font-bold text-slate-900">
                    Describe the Problem
                  </label>
                  <textarea
                    rows={5}
                    className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:border-violet-600 focus:ring-4 focus:ring-violet-600/10 transition-all font-medium resize-none shadow-sm"
                    placeholder="Tell us exactly what's happening..."
                  ></textarea>
                </div>
                <div className="md:col-span-2 pt-4">
                  <button
                    type="submit"
                    className="w-full bg-violet-700 hover:bg-violet-800 text-white font-black py-5 rounded-2xl transition-all shadow-xl hover:shadow-violet-600/30 text-lg transform hover:-translate-y-1 flex items-center justify-center gap-3"
                  >
                    Submit Service Request <MessageSquare className="w-5 h-5" />
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