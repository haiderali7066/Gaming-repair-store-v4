'use client'

import { motion } from 'framer-motion'
import { DollarSign, TrendingUp, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function BuyBackSection() {
  const steps = [
    {
      icon: TrendingUp,
      title: 'Fair Valuation',
      description: 'Get instant quotes for your gaming device',
    },
    {
      icon: Zap,
      title: 'Quick Process',
      description: 'Complete trade-in in under 30 minutes',
    },
    {
      icon: DollarSign,
      title: 'Best Prices',
      description: 'Top value guaranteed with no haggling',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-white overflow-hidden relative">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="section-shell relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <p className="opacity-90 mb-4 font-semibold">UPGRADE YOUR GAMING</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Trade-In Your Old Gaming Device
          </h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Get the best value for your gaming PC, laptop, or console. Upgrade to the latest
            technology with our trade-in program
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="opacity-90">{step.description}</p>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center"
        >
          <Button
            render={<Link href="/buy-back" />}
            className="bg-white text-primary hover:bg-secondary hover:text-primary px-8 py-3"
          >
            Get Trade-In Quote
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
