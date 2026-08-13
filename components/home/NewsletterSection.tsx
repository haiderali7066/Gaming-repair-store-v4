'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send } from 'lucide-react'

export function NewsletterSection() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter signup
    console.log('Newsletter signup:', email)
    setEmail('')
  }

  return (
    <section className="py-20 bg-gradient-to-r from-primary via-primary/90 to-primary/80 text-white overflow-hidden relative">
      {/* Animated background elements */}
      <motion.div
        className="absolute top-10 right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
      />
      <motion.div
        className="absolute bottom-10 left-10 w-32 h-32 bg-white/5 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          delay: 1,
        }}
      />

      <div className="section-shell relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Stay Updated
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Get exclusive gaming tips, new product launches, repair tutorials, and special
            offers delivered to your inbox
          </p>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, margin: '-100px' }}
            className="flex gap-3 max-w-md mx-auto"
          >
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
              required
            />
            <Button
              type="submit"
              className="bg-white text-primary hover:bg-secondary whitespace-nowrap"
              size="lg"
            >
              <Send className="w-4 h-4" />
            </Button>
          </motion.form>

          <p className="text-sm opacity-75 mt-4">
            No spam, just gaming goodness. Unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
