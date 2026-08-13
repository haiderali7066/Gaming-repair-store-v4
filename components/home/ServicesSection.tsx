'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useStaggerAnimation } from '@/hooks/useAnimations'
import { Wrench, Zap, Cpu, Shield, Settings, Headphones } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  useStaggerAnimation(containerRef, '.service-item', 0.12)

  const services = [
    {
      icon: Wrench,
      title: 'Device Repairs',
      description:
        'Expert repair services for all gaming devices including laptops, PCs, and consoles',
    },
    {
      icon: Cpu,
      title: 'Upgrades & Mods',
      description:
        'Performance upgrades, RAM installation, SSD upgrades, and custom configurations',
    },
    {
      icon: Zap,
      title: 'Battery Services',
      description:
        'Battery replacement, power management optimization, and charging solutions',
    },
    {
      icon: Shield,
      title: 'Data Recovery',
      description:
        'Safe data recovery from damaged drives, malware removal, and backup solutions',
    },
    {
      icon: Settings,
      title: 'Maintenance Plans',
      description:
        'Regular maintenance, cleaning, thermal paste replacement, and diagnostics',
    },
    {
      icon: Headphones,
      title: 'Peripherals Support',
      description:
        'Repair and setup for gaming mice, keyboards, headsets, and controllers',
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-secondary/30 to-white">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <p className="eyebrow mb-4">Our Services</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            What We Offer
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive gaming solutions from repairs to upgrades
          </p>
        </motion.div>

        <div
          ref={containerRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={index}
                className="service-item group"
              >
                <div className="bg-white border-2 border-border rounded-2xl p-8 hover:border-primary hover:shadow-xl transition-all duration-300 h-full">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {service.description}
                  </p>
                  <Button
                    variant="outline"
                    className="w-full group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300"
                    render={<Link href="/services" />}
                  >
                    Learn More
                  </Button>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mt-16"
        >
          <Button
            render={<Link href="/services" />}
            className="px-8 py-3"
          >
            View All Services
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
