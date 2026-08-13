'use client'

import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGPathElement>(null)

  // Animated background circles
  useEffect(() => {
    if (!heroRef.current) return

    const circles = heroRef.current.querySelectorAll('.animated-circle')
    circles.forEach((circle, index) => {
      gsap.to(circle, {
        x: Math.sin(index) * 50,
        y: Math.cos(index) * 50,
        duration: 6 + index,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    })
  }, [])

  // Scroll to next section
  const scrollToSection = () => {
    window.scrollBy({
      top: window.innerHeight,
      behavior: 'smooth',
    })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen bg-gradient-to-br from-white via-secondary/10 to-white overflow-hidden flex items-center justify-center pt-20 pb-10"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="animated-circle absolute top-20 right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="animated-circle absolute -bottom-32 -left-32 w-80 h-80 bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
        />
        <motion.div
          className="animated-circle absolute top-1/2 left-1/4 w-48 h-48 bg-primary/5 rounded-full blur-3xl"
          animate={{
            y: [0, 30, 0],
            x: [0, -30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="section-shell relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <motion.div variants={itemVariants} className="space-y-4">
            <p className="eyebrow">Welcome to Al Dana Gaming</p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
              We Game.
              <br />
              <span className="text-primary">You Relax.</span>
            </h1>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-xl text-muted-foreground max-w-lg leading-relaxed"
          >
            Expert gaming PC repairs, premium systems, and performance upgrades. From diagnostics
            to custom builds, we deliver excellence in every service.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4 pt-4"
          >
            <Button
              render={<Link href="/services" />}
              className="px-8 py-6 text-lg font-semibold"
              size="lg"
            >
              Book a Repair
            </Button>
            <Button
              render={<Link href="/shop" />}
              variant="outline"
              className="px-8 py-6 text-lg font-semibold"
              size="lg"
            >
              Shop Products
            </Button>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-8 pt-8 border-t border-border"
          >
            <div>
              <p className="text-3xl font-bold text-primary">90 Days</p>
              <p className="text-sm text-muted-foreground">Money Back Guarantee</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">24-48hrs</p>
              <p className="text-sm text-muted-foreground">Quick Turnaround</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">100%</p>
              <p className="text-sm text-muted-foreground">Authentic Parts</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Right visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative h-96 lg:h-full flex items-center justify-center"
        >
          {/* Device showcase with SVG */}
          <svg
            className="w-full max-w-md drop-shadow-2xl"
            viewBox="0 0 400 600"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Gaming PC */}
            <motion.g
              animate={{
                y: [0, -20, 0],
                rotate: [0, 2, 0],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              {/* Main tower */}
              <rect
                x="50"
                y="100"
                width="300"
                height="350"
                rx="20"
                fill="#5a2c8a"
                opacity="0.1"
                stroke="#5a2c8a"
                strokeWidth="2"
              />

              {/* GPU lights */}
              <motion.circle
                cx="120"
                cy="200"
                r="20"
                fill="#5a2c8a"
                animate={{
                  r: [20, 25, 20],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.circle
                cx="120"
                cy="280"
                r="20"
                fill="#5a2c8a"
                animate={{
                  r: [20, 25, 20],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />

              {/* CPU indicator */}
              <rect
                x="200"
                y="150"
                width="120"
                height="100"
                rx="8"
                fill="none"
                stroke="#5a2c8a"
                strokeWidth="2"
              />
              <text
                x="260"
                y="210"
                textAnchor="middle"
                className="text-sm font-bold"
                fill="#5a2c8a"
              >
                RTX 4090
              </text>
            </motion.g>
          </svg>

          {/* Floating text badge */}
          <motion.div
            className="absolute top-10 right-10 bg-primary text-white px-6 py-3 rounded-full font-bold shadow-lg"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Gaming Power
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        onClick={scrollToSection}
      >
        <ChevronDown className="w-8 h-8 text-primary" />
      </motion.div>
    </section>
  )
}
