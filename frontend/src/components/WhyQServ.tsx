"use client";

import { motion } from "framer-motion";
import { DollarSign, ShieldCheck, Wrench, BadgeCheck, Sparkles } from "lucide-react";

const pillars = [
  {
    icon: DollarSign,
    title: "Transparent Pricing",
    description: "See fixed prices before you book. No hidden charges, ever.",
  },
  {
    icon: BadgeCheck,
    title: "Verified Professionals",
    description: "Background checked, trained, and hand-picked for quality.",
  },
  {
    icon: Wrench,
    title: "Fully Equipped",
    description: "We bring everything needed to get the job done right.",
  },
  {
    icon: ShieldCheck,
    title: "100% Quality Assured",
    description: "Not satisfied? We'll make it right or your money back.",
  },
];

export default function WhyQServ() {
  return (
    <section className="py-20 relative overflow-hidden bg-white">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold/[0.04] via-transparent to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="text-gold text-xs font-semibold tracking-wider uppercase">Why QServ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-primary">Why Choose <span className="text-gradient">QServ</span>?</h2>
          <p className="text-gray-500 mt-3 max-w-2xl mx-auto">We're committed to delivering the best service experience in Qatar.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, i) => (
            <motion.div key={pillar.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group p-6 rounded-2xl bg-cream border border-sand-200 hover:border-gold/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 text-center">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <pillar.icon className="w-7 h-7 text-gold" />
              </div>
              <h3 className="text-base font-bold text-primary mb-2">{pillar.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{pillar.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}