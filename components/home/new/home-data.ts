import {
  Cpu,
  Gamepad2,
  MonitorSmartphone,
  ShieldCheck,
  Wrench,
  Zap,
} from "lucide-react"

export const heroSlides = [
  {
    eyebrow: "GAMING PC SPECIALISTS",
    heading: "Keep Your Gaming Setup Performing at Its Best.",
    content:
      "From overheating and hardware faults to upgrades and performance issues, our technicians diagnose, repair, test, and get your gaming system back in action.",
    primary: {
      text: "Book a Repair",
      link: "/repairs",
    },
    secondary: {
      text: "Explore Services",
      link: "/services",
    },
    image:
      "https://res.cloudinary.com/dvu9vmcqd/image/upload/v1786215929/pc1_uax7vw.png",
  },
  {
    eyebrow: "GAMING LAPTOP SPECIALISTS",
    heading: "Get Your Gaming Laptop Back in the Game.",
    content:
      "Professional laptop repair for screens, batteries, keyboards, charging issues, cooling, motherboards, and performance problems.",
    primary: {
      text: "Repair My Laptop",
      link: "/repairs",
    },
    secondary: {
      text: "Track Repair",
      link: "/repair/track",
    },
    image:
      "https://res.cloudinary.com/dvu9vmcqd/image/upload/v1786215936/lp1_zen7mw.png",
  },
  {
    eyebrow: "UPGRADE YOUR GAMING SETUP",
    heading: "Build Better. Play Faster.",
    content:
      "Discover gaming PCs, laptops, components, peripherals, and accessories for your next upgrade or complete gaming setup.",
    primary: {
      text: "Shop Products",
      link: "/products",
    },
    secondary: {
      text: "Explore Gaming",
      link: "/products",
    },
    image:
      "https://res.cloudinary.com/dvu9vmcqd/image/upload/v1786215923/key-m_zhfofl.png",
  },
]

export const services = [
  {
    title: "Gaming PC Repair",
    description:
      "Diagnostics, hardware faults, upgrades, overheating, crashes, and performance problems.",
    icon: Cpu,
  },
  {
    title: "Gaming Laptop Repair",
    description:
      "Screen, battery, charging, keyboard, cooling, motherboard, and hardware repairs.",
    icon: MonitorSmartphone,
  },
  {
    title: "PC & Laptop Support",
    description:
      "Windows, storage, RAM, software setup, optimization, troubleshooting, and maintenance.",
    icon: Wrench,
  },
  {
    title: "GPU Repair",
    description:
      "Graphics card diagnostics, cooling problems, artifacts, instability, and performance issues.",
    icon: Zap,
  },
  {
    title: "Console Repair",
    description:
      "Gaming console diagnostics, hardware repairs, cleaning, and software services.",
    icon: Gamepad2,
  },
  {
    title: "Deep Maintenance",
    description:
      "Internal cleaning, thermal paste replacement, cooling optimization, and system health checks.",
    icon: ShieldCheck,
  },
]

export const processSteps = [
  {
    number: "01",
    title: "Book",
    description:
      "Tell us about your device and the issue online or bring it to our store.",
  },
  {
    number: "02",
    title: "Diagnose",
    description:
      "Our technicians perform detailed diagnostics to identify the actual problem.",
  },
  {
    number: "03",
    title: "Approve",
    description:
      "You receive a clear quote before any repair or replacement work begins.",
  },
  {
    number: "04",
    title: "Repair",
    description:
      "We repair, upgrade, clean, and stress-test your device before collection.",
  },
  {
    number: "05",
    title: "Collect",
    description:
      "Pick up your tested device with the reassurance of our repair support.",
  },
]

export const benefits = [
  {
    title: "Experienced Technicians",
    description:
      "Specialists focused on gaming hardware and performance.",
    icon: Wrench,
  },
  {
    title: "Transparent Service",
    description:
      "Clear diagnosis and communication before major repair work.",
    icon: ShieldCheck,
  },
  {
    title: "Gaming Focused",
    description:
      "Built around the needs of gamers, creators, and enthusiasts.",
    icon: Gamepad2,
  },
  {
    title: "Fast Turnaround",
    description:
      "Efficient diagnostics and repair workflows whenever possible.",
    icon: Zap,
  },
]

export const testimonials = [
  {
    name: "Ahmed K.",
    role: "Esports Player",
    quote:
      "My gaming PC had overheating and random shutdown issues. The team diagnosed it properly, fixed the cooling problem, and had me back gaming quickly.",
  },
  {
    name: "Sarah M.",
    role: "Content Creator",
    quote:
      "I traded in my old laptop and used the value toward a new setup. The process was simple, clear, and much easier than I expected.",
  },
  {
    name: "Tariq R.",
    role: "Gamer",
    quote:
      "Fast service, clear communication, and they actually explained what was wrong with my machine instead of just giving me a bill.",
  },
]

export const faqs = [
  {
    question: "How long does a gaming PC repair usually take?",
    answer:
      "Most standard diagnostics, repairs, and upgrades are completed within 24–48 hours. More complex repairs can take longer depending on the fault and parts availability.",
  },
  {
    question: "Do you provide a repair warranty?",
    answer:
      "Yes. Eligible repairs and replacement work are covered according to the warranty terms associated with the service and parts used.",
  },
  {
    question: "How does the Trade In program work?",
    answer:
      "Submit your device details online or bring the device to us. We evaluate the hardware, condition, and specifications and provide a trade-in offer.",
  },
  {
    question: "Can I buy a product and get it upgraded before delivery?",
    answer:
      "For supported products and configurations, our team can help with upgrades, storage, memory, cooling, and other compatible components.",
  },
]