'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useStaggerAnimation } from '@/hooks/useAnimations'
import { Star } from 'lucide-react'

export function TestimonialsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  useStaggerAnimation(containerRef, '.testimonial', 0.15)

  const testimonials = [
    {
      name: 'Ahmed Al Mazrouei',
      role: 'Professional Gamer',
      text: 'Fixed my RTX 4090 issue in 24 hours! The team is incredibly knowledgeable and friendly.',
      rating: 5,
    },
    {
      name: 'Fatima Mohammed',
      role: 'Business Owner',
      text: 'Best service in Abu Dhabi! They saved my laptop with important data. Highly recommended.',
      rating: 5,
    },
    {
      name: 'Hassan Al Mansoori',
      role: 'University Student',
      text: 'Affordable pricing and excellent quality. My gaming PC runs better than before!',
      rating: 5,
    },
    {
      name: 'Layla Al Kaabi',
      role: 'Content Creator',
      text: 'Professional diagnostics and transparent pricing. No hidden charges, just quality work.',
      rating: 5,
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-white via-secondary/20 to-white">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <p className="eyebrow mb-4">Customer Reviews</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Thousands of happy gaming enthusiasts trust Al Dana Gaming
          </p>
        </motion.div>

        <div
          ref={containerRef}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="testimonial bg-white border-2 border-border rounded-xl p-8 hover:border-primary hover:shadow-lg transition-all duration-300"
              whileHover={{ y: -4 }}
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-foreground mb-6 text-sm leading-relaxed">
                &quot;{testimonial.text}&quot;
              </p>
              <div className="border-t border-border pt-4">
                <p className="font-bold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
