"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, CheckCircle } from "lucide-react";
import Button from "@/components/Button";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <section className="pt-16 pb-12 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="text-gold font-semibold text-sm tracking-widest uppercase">Contact</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-2 mb-3">Get in Touch</h1>
            <p className="text-gray-400 text-lg max-w-2xl">
              Have a question? We&apos;d love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>
      <section className="py-16 bg-cream">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="bg-white rounded-2xl p-8 border border-sand-200">
                <h2 className="text-xl font-bold text-primary mb-6">Send Us a Message</h2>
                {submitted ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-primary mb-2">Thank You!</h3>
                    <p className="text-gray-500">We&apos;ll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                      <input required className="w-full px-4 py-3 rounded-xl border border-sand-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all bg-cream" placeholder="Your name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                      <input required type="email" className="w-full px-4 py-3 rounded-xl border border-sand-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all bg-cream" placeholder="your@email.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input className="w-full px-4 py-3 rounded-xl border border-sand-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all bg-cream" placeholder="+974 5XXX XXXX" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                      <textarea required rows={4} className="w-full px-4 py-3 rounded-xl border border-sand-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all bg-cream resize-none" placeholder="How can we help?" />
                    </div>
                    <Button type="submit" className="w-full">
                      <Send className="w-4 h-4 mr-2" /> Send Message
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div className="bg-white rounded-2xl p-8 border border-sand-200">
                <h2 className="text-xl font-bold text-primary mb-6">Contact Info</h2>
                <div className="space-y-5">
                  <a href="tel:+97444001234" className="flex items-center gap-4 text-gray-600 hover:text-gold transition-colors">
                    <span className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center"><Phone className="w-5 h-5 text-gold" /></span>
                    <div><p className="text-xs text-gray-400">Phone</p><p className="font-medium">+974 4400 1234</p></div>
                  </a>
                  <a href="mailto:info@qserv.qa" className="flex items-center gap-4 text-gray-600 hover:text-gold transition-colors">
                    <span className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center"><Mail className="w-5 h-5 text-gold" /></span>
                    <div><p className="text-xs text-gray-400">Email</p><p className="font-medium">info@qserv.qa</p></div>
                  </a>
                  <div className="flex items-center gap-4 text-gray-600">
                    <span className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center"><MapPin className="w-5 h-5 text-gold" /></span>
                    <div><p className="text-xs text-gray-400">Address</p><p className="font-medium">Tornado Tower, West Bay, Doha, Qatar</p></div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-8 border border-sand-200">
                <h2 className="text-xl font-bold text-primary mb-4">Working Hours</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-gray-500">Sunday - Thursday</span><span className="font-medium">8:00 AM - 8:00 PM</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Friday</span><span className="font-medium">Closed</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Saturday</span><span className="font-medium">9:00 AM - 6:00 PM</span></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
