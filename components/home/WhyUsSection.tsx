'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useStaggerAnimation } from '@/hooks/useAnimations'
import { CheckCircle2, Zap, Award, Shield } from 'lucide-react'

export function WhyUsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  useStaggerAnimation(containerRef, '.why-item', 0.15)

  const reasons = [
    {
      icon: CheckCircle2,
      title: 'Expert Technicians',
      description: 'Certified professionals with 10+ years experience',
    },
    {
      icon: Zap,
      title: '24-48hr Turnaround',
      description: 'Quick repairs without compromising quality',
    },
    {
      icon: Award,
      title: 'Quality Guarantee',
      description: '2-year warranty on all repairs and parts',
    },
    {
      icon: Shield,
      title: '100% Authentic Parts',
      description: 'Genuine components sourced directly',
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-white to-secondary/30">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <p className="eyebrow mb-4">Why Choose Us</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Why Al Dana Gaming?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We&apos;re committed to delivering the best gaming experience with expert service and
            premium products
          </p>
        </motion.div>

        <div
          ref={containerRef}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {reasons.map((reason, index) => {
            const Icon = reason.icon
            return (
              <motion.div
                key={index}
                className="why-item p-8 bg-white border-2 border-border rounded-xl hover:border-primary hover:shadow-lg transition-all duration-300"
                whileHover={{ y: -8 }}
              >
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {reason.title}
                </h3>
                <p className="text-muted-foreground">
                  {reason.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
