'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Mail, Phone, MapPin } from 'lucide-react'

export function ContactFormSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  }

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
          <p className="eyebrow mb-4">Get In Touch</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Contact Us
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions? Our team is here to help. Reach out anytime!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="space-y-6"
          >
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-bold text-foreground mb-2">
                Full Name
              </label>
              <Input
                type="text"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-bold text-foreground mb-2">
                Email
              </label>
              <Input
                type="email"
                name="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-bold text-foreground mb-2">
                Phone
              </label>
              <Input
                type="tel"
                name="phone"
                placeholder="+971 50 123 4567"
                value={formData.phone}
                onChange={handleChange}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-bold text-foreground mb-2">
                Subject
              </label>
              <Input
                type="text"
                name="subject"
                placeholder="How can we help?"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-bold text-foreground mb-2">
                Message
              </label>
              <Textarea
                name="message"
                placeholder="Tell us more about your inquiry..."
                value={formData.message}
                onChange={handleChange}
                rows={6}
                required
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </motion.div>
          </motion.form>

          {/* Contact Info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="space-y-8"
          >
            <motion.div
              variants={itemVariants}
              className="flex gap-6 p-8 bg-secondary/50 rounded-xl"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  Phone
                </h3>
                <p className="text-muted-foreground">+971 50 123 4567</p>
                <p className="text-muted-foreground">+971 2 123 4567</p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex gap-6 p-8 bg-secondary/50 rounded-xl"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  Email
                </h3>
                <p className="text-muted-foreground">info@aldanagaming.ae</p>
                <p className="text-muted-foreground">support@aldanagaming.ae</p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex gap-6 p-8 bg-secondary/50 rounded-xl"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  Location
                </h3>
                <p className="text-muted-foreground">
                  Al Mina Street, Abu Dhabi
                </p>
                <p className="text-muted-foreground">United Arab Emirates</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
