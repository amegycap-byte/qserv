"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Star, ArrowRight, Sparkles, UserCheck, Briefcase, ThumbsUp } from "lucide-react";
import Button from "@/components/Button";
import WhyQServ from "@/components/WhyQServ";
import Avatar from "@/components/Avatar";
import RatingStars from "@/components/RatingStars";
import { fetchCategories, fetchProviders } from "@/lib/api";
import AIChat from "@/components/AIChat";
import HowItWorks from "@/components/HowItWorks";
import type { Category, Provider } from "@/lib/utils";

const stats = [
  { icon: Briefcase, value: "500+", label: "Services Completed" },
  { icon: UserCheck, value: "200+", label: "Verified Professionals" },
  { icon: Star, value: "4.9", label: "Average Rating" },
  { icon: ThumbsUp, value: "98%", label: "Satisfaction Rate" },
];

const fallbackProviders: Provider[] = [
  { id: 1, name: "Dania Maids", slug: "dania-maids", category: "Cleaning", description: null, rating: 4.9, reviews_count: 1381, price_range: "QAR 35 - 180/hr", phone: null, email: null, image_url: null, skills: ["Home Cleaning", "Deep Cleaning", "Eco-Friendly"] },
  { id: 2, name: "Almas Movers International", slug: "almas-movers", category: "Moving & Packing", description: null, rating: 4.9, reviews_count: 567, price_range: "QAR 600 - 4000", phone: null, email: null, image_url: null, skills: ["Home Relocation", "Office Moving", "Packing Service"] },
  { id: 3, name: "Layla Kitchen", slug: "layla-kitchen", category: "Chefs", description: null, rating: 4.9, reviews_count: 178, price_range: "QAR 200 - 800", phone: null, email: null, image_url: null, skills: ["Private Dining", "Corporate Catering", "Daily Meal Plan"] },
  { id: 4, name: "Enddi Beauty Salon & Makeup", slug: "enddi-beauty-salon", category: "Salon & Grooming", description: null, rating: 4.9, reviews_count: 234, price_range: "QAR 80 - 500", phone: null, email: null, image_url: null, skills: ["Hair Braiding", "Bridal Makeup", "Nail Art"] },
  { id: 5, name: "Home Service Qatar", slug: "home-service-qatar", category: "Plumbing", description: null, rating: 4.8, reviews_count: 312, price_range: "QAR 150 - 800", phone: null, email: null, image_url: null, skills: ["Leak Detection", "Pipe Repair", "Drain Cleaning"] },
  { id: 6, name: "Homefix Qatar", slug: "homefix-qatar-ac", category: "AC & Cooling", description: null, rating: 4.8, reviews_count: 245, price_range: "QAR 180 - 1500", phone: null, email: null, image_url: null, skills: ["AC Installation", "AC Repair", "Gas Refill"] },
  { id: 7, name: "Dania Maids", slug: "dania-maids-service", category: "Maid Service", description: null, rating: 4.9, reviews_count: 1381, price_range: "QAR 35 - 150/hr", phone: null, email: null, image_url: null, skills: ["House Cleaning", "Deep Cleaning", "Regular Cleaning"] },
].sort((a, b) => b.rating - a.rating).slice(0, 4);

const fallbackCategories: Category[] = [
  { id: 1, name: "Salon & Grooming", slug: "salon-grooming", description: "", icon: "Scissors", image_url: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80" },
  { id: 2, name: "Cleaning", slug: "cleaning", description: "", icon: "SprayCan", image_url: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80" },
  { id: 3, name: "Plumbing", slug: "plumbing", description: "", icon: "Wrench", image_url: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=600&q=80" },
  { id: 4, name: "Electrical", slug: "electrical", description: "", icon: "Zap", image_url: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&q=80" },
  { id: 5, name: "Painting", slug: "painting", description: "", icon: "Paintbrush", image_url: "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=600&q=80" },
  { id: 6, name: "Pest Control", slug: "pest-control", description: "", icon: "Bug", image_url: "https://images.unsplash.com/photo-1540366244940-9dce0a570312?w=600&q=80" },
  { id: 7, name: "Maid Service", slug: "maid-service", description: "", icon: "SprayCan", image_url: "https://images.unsplash.com/photo-1575467678930-c7acd65d6470?w=600&q=80" },
  { id: 8, name: "Chefs", slug: "chefs", description: "", icon: "ChefHat", image_url: "https://images.unsplash.com/photo-1681270543584-8e541a1bb056?w=600&q=80" },
  { id: 9, name: "AC & Cooling", slug: "ac-cooling", description: "", icon: "Snowflake", image_url: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80" },
  { id: 10, name: "Handyman", slug: "handyman", description: "", icon: "Hammer", image_url: "https://images.unsplash.com/photo-1574359411659-15573a27fd0c?w=600&q=80" },
  { id: 11, name: "Moving & Packing", slug: "moving-packing", description: "", icon: "Truck", image_url: "https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=600&q=80" },
];

export default function Home() {
  const [categories, setCategories] = useState<Category[]>(fallbackCategories);
  const [providers, setProviders] = useState<Provider[]>(fallbackProviders);

  useEffect(() => {
    fetchCategories().then(setCategories).catch(() => {});
    fetchProviders().then((all) => {
      const top = all.sort((a, b) => b.rating - a.rating).slice(0, 4);
      setProviders(top);
    }).catch(() => {});
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[500px] lg:min-h-[70vh] flex items-center overflow-hidden bg-primary pt-14">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-light to-sand-700" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold/15 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-sand-500/10 via-transparent to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 lg:py-24">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="inline-flex items-center gap-2 bg-white/10 border border-gold/30 px-4 py-1.5 rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                <span className="text-gold text-[11px] font-semibold tracking-[0.15em] uppercase">
                  Qatar&apos;s Trusted Home Services Marketplace
                </span>
              </div>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-4">
              Quality Home Services,<br />
              <span className="text-gradient">On Demand</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-gray-300 mb-8 max-w-xl leading-relaxed">
              Experienced, hand-picked professionals to serve you at your doorstep. Transparent pricing, quality guaranteed.
            </motion.p>

            {/* Trust badges */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center gap-4 text-xs mb-10">
              <div className="flex items-center gap-1 text-gray-400">
                <Star className="w-3.5 h-3.5 fill-gold text-gold" />
                <Star className="w-3.5 h-3.5 fill-gold text-gold" />
                <Star className="w-3.5 h-3.5 fill-gold text-gold" />
                <Star className="w-3.5 h-3.5 fill-gold text-gold" />
                <Star className="w-3.5 h-3.5 fill-gold text-gold" />
                <span className="ml-1 text-gold font-semibold">4.9</span>
                <span className="text-gray-500">(500+ reviews)</span>
              </div>
              <span className="text-gray-600">|</span>
              <span className="text-gray-400">200+ Pros</span>
              <span className="text-gray-600">|</span>
              <span className="text-gray-400">Quality Assured</span>
            </motion.div>
          </div>

          {/* Category Images (full width) */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {categories.map((cat) => (
                <Link key={cat.id} href={`/services?category=${cat.slug}`}>
                  <div className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-0.5">
                    {cat.image_url && (
                      <img src={cat.image_url} alt={cat.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-bold text-base group-hover:translate-x-1 transition-transform duration-300">{cat.name}</h3>
                    </div>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-8 h-8 rounded-full bg-gold/90 flex items-center justify-center">
                        <ArrowRight className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>

          <div className="max-w-3xl">
            <AIChat />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1C1816 0%, #2D2824 50%, #926544 100%)" }}>
        <div className="absolute inset-0 bg-[radial-gradient(rgba(212,168,67,0.08)_1px,transparent_1px)] bg-[length:32px_32px]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.15 }} className="text-center group">
                <div className="relative inline-flex mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform duration-500 border border-gold/20">
                    <stat.icon className="w-7 h-7 text-gold" />
                  </div>
                </div>
                <p className="text-3xl sm:text-4xl font-extrabold text-white mb-1">{stat.value}</p>
                <p className="text-gray-300 text-sm font-medium tracking-wide">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <HowItWorks />

      {/* Why QServ */}
      <WhyQServ />

      {/* Top Rated Professionals */}
      {providers.length > 0 && (
        <section className="py-20 relative overflow-hidden bg-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 px-4 py-2 rounded-full mb-4">
                <Sparkles className="w-4 h-4 text-gold" />
                <span className="text-gold text-xs font-semibold tracking-wider uppercase">Top Rated</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-primary">Our Top <span className="text-gradient">Professionals</span></h2>
              <p className="text-gray-500 mt-3 max-w-2xl mx-auto">Hand-picked experts with the highest ratings</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {providers.map((pro, i) => (
                <motion.div key={pro.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                  <Link href={`/services/${pro.slug}`} className="group block">
                    <div className="bg-white rounded-2xl p-6 border border-sand-200 hover:border-gold/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 relative overflow-hidden">
                      {pro.rating >= 4.5 && (
                        <div className="absolute top-3 left-0">
                          <div className="bg-gradient-to-r from-gold to-gold-600 text-white text-[10px] font-bold px-3 py-1 rounded-r-full flex items-center gap-1 shadow-lg shadow-gold/30">
                            <Star className="w-2.5 h-2.5" fill="white" /> Trusted
                          </div>
                        </div>
                      )}
                      <div className="flex flex-col items-center text-center pt-2">
                        <Avatar name={pro.name} size="lg" className="mb-3" />
                        <h3 className="font-bold text-primary text-sm group-hover:text-gold transition-colors">{pro.name}</h3>
                        <p className="text-xs text-gray-400 mb-2 capitalize">{pro.category}</p>
                        <RatingStars rating={pro.rating} reviewsCount={pro.reviews_count} size="sm" />
                        {pro.price_range && (
                          <div className="mt-3 bg-gold/10 text-gold-600 text-xs font-semibold px-3 py-1 rounded-full">{pro.price_range}</div>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-10">
              <Link href="/services">
                <Button variant="outline" size="lg">View All Professionals <ArrowRight className="w-4 h-4 ml-2" /></Button>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1C1816 0%, #2D2824 50%, #926544 100%)" }}>
        <div className="absolute inset-0 bg-[radial-gradient(rgba(212,168,67,0.08)_1px,transparent_1px)] bg-[length:32px_32px]" />
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gold/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-gold/10 rounded-full blur-3xl" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <motion.div animate={{ rotate: [0, 10, 0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex p-4 rounded-3xl bg-gold/10 border border-gold/20 mb-8">
              <Star className="w-10 h-10 text-gold" />
            </motion.div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">Ready to Book Your Service?</h2>
            <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">Join thousands of happy customers in Qatar. Book a trusted professional today.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/services">
                <Button variant="primary" size="lg" className="shadow-2xl shadow-gold/20 bg-white text-primary hover:bg-cream">
                  Get Started <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg">Contact Us</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}