'use client'

import React from 'react'
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Headphones,
  Globe
} from 'lucide-react'

import { motion } from 'framer-motion'

const supportCards = [
  {
    icon: Phone,
    title: 'Call Support',
    desc: '+1 (555) 987-1234',
    color: 'from-cyan-500 to-blue-500'
  },
  {
    icon: Mail,
    title: 'Email Us',
    desc: 'support@wanderlust.com',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: MapPin,
    title: 'Visit Office',
    desc: 'Manhattan, New York',
    color: 'from-orange-500 to-red-500'
  },
]

const faqs = [
  {
    q: 'How do I book a destination?',
    a: 'You can book your desired destination directly from our destinations page by selecting your preferred package.'
  },
  {
    q: 'Can I cancel my booking?',
    a: 'Yes. We provide flexible cancellation policies depending on the selected travel package.'
  },
  {
    q: 'Do you offer group tours?',
    a: 'Absolutely! We offer customized group tours for families, friends, and corporate teams.'
  },
  {
    q: 'Is customer support available 24/7?',
    a: 'Yes, our support team is available around the clock to assist travelers worldwide.'
  },
]

const ContactPage = () => {

  return (

    <div className="bg-[#f8fafc] overflow-hidden mt-20">

      {/* HERO SECTION */}
      <section className="relative min-h-[65vh] flex items-center justify-center overflow-hidden">

        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070&auto=format&fit=crop')"
          }}
        />

        <div className="absolute inset-0 bg-black/60" />

        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 blur-[120px] rounded-full" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 max-w-4xl mx-auto px-4 text-center"
        >

          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-5 py-2 rounded-full text-sm mb-6">
            <Headphones size={16} />
            24/7 Customer Support
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-6">
            We’re Here To
            <span className="block text-cyan-300">
              Help You Travel
            </span>
          </h1>

          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Have questions, travel concerns, or need booking assistance?
            Our dedicated Wanderlust support team is always ready to help.
          </p>

        </motion.div>

      </section>

      {/* CONTACT CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {supportCards.map((card, i) => {

            const Icon = card.icon

            return (

              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
              >

                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${card.color} flex items-center justify-center text-white mb-6`}>
                  <Icon size={26} />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {card.title}
                </h3>

                <p className="text-gray-500 leading-relaxed">
                  {card.desc}
                </p>

              </motion.div>

            )
          })}

        </div>

      </section>

      {/* CONTACT FORM + INFO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* FORM */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-[32px] p-6 sm:p-10 border border-gray-100 shadow-sm"
          >

            <div className="mb-8">

              <h2 className="text-4xl font-black text-gray-900 mb-4">
                Send Us A Message
              </h2>

              <p className="text-gray-500 leading-relaxed">
                Fill out the form below and our support team will contact you shortly.
              </p>

            </div>

            <form className="space-y-6">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-cyan-500 transition-all"
                />

                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-cyan-500 transition-all"
                />

              </div>

              <input
                type="text"
                placeholder="Subject"
                className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-cyan-500 transition-all"
              />

              <textarea
                rows={6}
                placeholder="Write your message..."
                className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-cyan-500 transition-all resize-none"
              />

              <button
                type="submit"
                className="bg-cyan-500 hover:bg-cyan-400 text-white font-bold px-8 py-4 rounded-2xl flex items-center gap-3 transition-all duration-300 hover:scale-[1.02]"
              >

                Send Message

                <Send size={18} />

              </button>

            </form>

          </motion.div>

          {/* INFO */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >

            <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-[32px] p-10 text-white overflow-hidden relative">

              <div className="absolute top-0 right-0 w-52 h-52 bg-white/10 rounded-full blur-3xl" />

              <div className="relative z-10">

                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                  <MessageCircle size={30} />
                </div>

                <h3 className="text-4xl font-black mb-5">
                  Premium Support Experience
                </h3>

                <p className="text-cyan-100 leading-relaxed mb-8">
                  Our dedicated travel experts are available anytime to guide you through bookings, travel plans, and destination assistance.
                </p>

                <div className="space-y-5">

                  <div className="flex items-center gap-4">
                    <Clock />
                    <span>24/7 Worldwide Support</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <Globe />
                    <span>Support In 20+ Countries</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <Headphones />
                    <span>Priority Assistance For Members</span>
                  </div>

                </div>

              </div>

            </div>

            {/* OFFICE INFO */}
            <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm">

              <h3 className="text-3xl font-black text-gray-900 mb-6">
                Office Hours
              </h3>

              <div className="space-y-4 text-gray-600">

                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>08:00 AM - 10:00 PM</span>
                </div>

                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>09:00 AM - 08:00 PM</span>
                </div>

                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Emergency Support Only</span>
                </div>

              </div>

            </div>

          </motion.div>

        </div>

      </section>

      {/* FAQ */}
      <section className="bg-white py-24">

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-16">

            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-5">
              Frequently Asked Questions
            </h2>

            <p className="text-gray-500 max-w-2xl mx-auto">
              Everything you need to know about bookings, cancellations, support, and travel assistance.
            </p>

          </div>

          <div className="space-y-5">

            {faqs.map((faq, i) => (

              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#f8fafc] rounded-3xl p-7 border border-gray-100"
              >

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {faq.q}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {faq.a}
                </p>

              </motion.div>

            ))}

          </div>

        </div>

      </section>

    </div>
  )
}

export default ContactPage