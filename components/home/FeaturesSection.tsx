'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useStaggerAnimation } from '@/hooks/useAnimations'
import { Truck, Zap, Shield, Headphones } from 'lucide-react'

export function FeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  useStaggerAnimation(containerRef, '.feature-item', 0.1)

  const features = [
    {
      icon: Truck,
      title: 'Free Pickup & Delivery',
      description: 'Complimentary service across Abu Dhabi',
    },
    {
      icon: Zap,
      title: 'Quick Turnaround',
      description: 'Most repairs completed in 24-48 hours',
    },
    {
      icon: Shield,
      title: 'Expert Technicians',
      description: 'Certified professionals with 10+ years',
    },
    {
      icon: Headphones,
      title: '24/7 Customer Support',
      description: 'Always here to help with your queries',
    },
  ]

  return (
    <section className="py-12 bg-gradient-to-b from-secondary/30 to-white">
      <div className="section-shell">
        <div
          ref={containerRef}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                className="feature-item"
              >
                <div className="flex gap-4 items-start text-center lg:text-left lg:block">
                  <div className="w-12 h-12 lg:w-16 lg:h-16 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 lg:mx-auto lg:mb-4">
                    <Icon className="w-6 h-6 lg:w-8 lg:h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
