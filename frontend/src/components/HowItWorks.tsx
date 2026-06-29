"use client";

import { motion } from "framer-motion";
import { Search, UserCheck, CalendarCheck, ThumbsUp, Sparkles } from "lucide-react";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Browse Services",
    description: "Explore our wide range of home services — from cleaning and plumbing to salon and moving. Filter by category to find exactly what you need.",
  },
  {
    icon: UserCheck,
    step: "02",
    title: "Pick a Professional",
    description: "Compare top-rated, background-checked professionals. Read reviews, check ratings, and choose the right expert for your job.",
  },
  {
    icon: CalendarCheck,
    step: "03",
    title: "Book Instantly",
    description: "Schedule your service at a time that works for you. Transparent upfront pricing — no hidden fees, no surprises.",
  },
  {
    icon: ThumbsUp,
    step: "04",
    title: "Relax & Enjoy",
    description: "Your pro arrives on time, fully equipped. Quality guaranteed — if you're not happy, we'll make it right.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 relative overflow-hidden bg-cream">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-gold/[0.04] via-transparent to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="text-gold text-xs font-semibold tracking-wider uppercase">How It Works</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-primary">Get Started in <span className="text-gradient">4 Easy Steps</span></h2>
          <p className="text-gray-500 mt-3 max-w-2xl mx-auto">From browsing to booking — we make it simple.</p>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute top-24 left-[calc(12.5%+24px)] right-[calc(12.5%+24px)] h-0.5 bg-gradient-to-r from-gold/60 via-gold/30 to-gold/60" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {steps.map((step, i) => (
              <motion.div key={step.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative group">
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-sand-200 hover:border-gold/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 text-center h-full flex flex-col items-center">
                  <div className="relative mb-5">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                      <step.icon className="w-7 h-7 text-gold" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gold text-white text-xs font-bold flex items-center justify-center shadow-lg shadow-gold/30">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-primary mb-2">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
