"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";

const faqs = [
  {
    q: "How do I book a service?",
    a: "Browse our categories, select a professional, and fill in the inquiry form. We'll connect you within 24 hours.",
  },
  {
    q: "Are the professionals verified?",
    a: "Yes. Every professional on QServ undergoes a background check and skill assessment before joining our platform.",
  },
  {
    q: "What if I'm not satisfied with the service?",
    a: "We stand by our 100% Quality Assured guarantee. If you're not satisfied, we'll make it right or refund your money.",
  },
  {
    q: "How are prices determined?",
    a: "All prices are fixed and transparent — what you see is what you pay. No hidden charges or surprise fees.",
  },
  {
    q: "What areas do you serve?",
    a: "We currently serve all areas of Doha, Qatar, with plans to expand to other cities soon.",
  },
  {
    q: "Can I cancel or reschedule?",
    a: "Yes, you can cancel or reschedule up to 24 hours before the scheduled time at no charge.",
  },
  {
    q: "How do I pay for the service?",
    a: "Payment is made directly to the professional after the service is completed. We accept cash and bank transfer.",
  },
  {
    q: "What if I need emergency service?",
    a: "For emergency plumbing, electrical, or AC services, call us directly at +974 4400 1234 for priority dispatch.",
  },
];

export default function FaqContent() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <section className="pt-16 pb-12 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="text-gold font-semibold text-sm tracking-widest uppercase">FAQ</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-2 mb-3">Frequently Asked Questions</h1>
            <p className="text-gray-400 text-lg max-w-2xl">Everything you need to know about QServ.</p>
          </motion.div>
        </div>
      </section>
      <section className="py-16 bg-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-2xl border border-sand-200 overflow-hidden hover:border-gold/30 transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span className="font-semibold text-primary text-sm">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-gold transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""}`} />
                </button>
                {openIndex === i && (
                  <div className="px-6 pb-5">
                    <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
