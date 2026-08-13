'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useStaggerAnimation } from '@/hooks/useAnimations'
import {
  Monitor,
  Smartphone,
  Headphones,
  Gamepad2,
  Cpu,
  Wifi,
} from 'lucide-react'

export function TopRepairsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  useStaggerAnimation(containerRef, '.repair-item', 0.12)

  const repairs = [
    {
      icon: Monitor,
      title: 'Screen Replacement',
      count: '2,500+',
      description: 'LCD, AMOLED & Gaming Monitors',
    },
    {
      icon: Smartphone,
      title: 'Battery Issues',
      count: '3,200+',
      description: 'Charge & Performance Fix',
    },
    {
      icon: Cpu,
      title: 'CPU/GPU Repair',
      count: '1,800+',
      description: 'Heating & Performance Issues',
    },
    {
      icon: Gamepad2,
      title: 'Gaming Controller',
      count: '900+',
      description: 'Joystick & Button Fixes',
    },
    {
      icon: Headphones,
      title: 'Audio Repair',
      count: '1,200+',
      description: 'Speakers & Microphone Fix',
    },
    {
      icon: Wifi,
      title: 'Network Issues',
      count: '1,500+',
      description: 'WiFi & Connectivity',
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <p className="eyebrow mb-4">Our Expertise</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Top Repairs We Perform
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Thousands of satisfied customers trust us with their gaming devices
          </p>
        </motion.div>

        <div
          ref={containerRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {repairs.map((repair, index) => {
            const Icon = repair.icon
            return (
              <motion.div
                key={index}
                className="repair-item"
                whileHover={{ scale: 1.02 }}
              >
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-12 rounded-2xl text-center hover:shadow-xl transition-all duration-300">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-2">
                    {repair.count}
                  </h3>
                  <h4 className="text-xl font-bold text-foreground mb-2">
                    {repair.title}
                  </h4>
                  <p className="text-muted-foreground">
                    {repair.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
