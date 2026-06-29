"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      <section className="pt-16 pb-12 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="text-gold font-semibold text-sm tracking-widest uppercase">About Us</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-2 mb-3">About QServ</h1>
            <p className="text-gray-400 text-lg max-w-2xl">
              Qatar&apos;s most trusted marketplace for home services.
            </p>
          </motion.div>
        </div>
      </section>
      <section className="py-16 bg-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 border border-sand-200">
            <h2 className="text-2xl font-bold text-primary mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              At QServ, we&apos;re on a mission to revolutionize home services in Qatar. 
              We connect you with verified, background-checked professionals who are 
              trained, equipped, and ready to deliver exceptional service.
            </p>
            <h2 className="text-2xl font-bold text-primary mb-4">Why We Exist</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Finding a reliable plumber, electrician, or cleaner in Doha shouldn&apos;t 
              be a gamble. We built QServ to give you transparency, trust, and 
              quality assurance — every single time.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              {[
                { value: "500+", label: "Services Completed" },
                { value: "200+", label: "Verified Pros" },
                { value: "4.9", label: "Avg Rating" },
              ].map((s) => (
                <div key={s.label} className="text-center p-6 bg-gold/5 rounded-2xl border border-gold/10">
                  <p className="text-3xl font-extrabold text-gold">{s.value}</p>
                  <p className="text-gray-500 text-sm mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
