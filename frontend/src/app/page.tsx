"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import Button from "@/components/Button";
import Avatar from "@/components/Avatar";
import RatingStars from "@/components/RatingStars";
import { fetchCategories, fetchProviders } from "@/lib/api";
import AIChat from "@/components/AIChat";
import type { Category, Provider } from "@/lib/utils";

const fallbackProviders: Provider[] = [
  { id: 1, name: "Sparkle Clean Co.", slug: "sparkle-clean-co", category: "Cleaning", description: null, rating: 4.9, reviews_count: 342, price_range: "QAR 80 - 200", phone: null, email: null, image_url: null, skills: ["Home Cleaning", "Deep Cleaning", "Office Cleaning"] },
  { id: 2, name: "AquaFix Pro", slug: "aquafix-pro", category: "Plumbing", description: null, rating: 4.8, reviews_count: 289, price_range: "QAR 120 - 400", phone: null, email: null, image_url: null, skills: ["Pipe Repair", "Drain Cleaning", "Fixture Installation"] },
  { id: 3, name: "VoltCare Electrical", slug: "voltcare-electrical", category: "Electrical", description: null, rating: 4.8, reviews_count: 245, price_range: "QAR 100 - 350", phone: null, email: null, image_url: null, skills: ["Wiring", "Lighting", "Panel Upgrade"] },
  { id: 4, name: "ColorCraft Studio", slug: "colorcraft-studio", category: "Painting", description: null, rating: 4.7, reviews_count: 198, price_range: "QAR 200 - 800", phone: null, email: null, image_url: null, skills: ["Interior Painting", "Exterior Painting", "Wallpaper"] },
  { id: 5, name: "ArcticFlow Cooling", slug: "arcticflow-cooling", category: "AC & Cooling", description: null, rating: 4.9, reviews_count: 176, price_range: "QAR 150 - 500", phone: null, email: null, image_url: null, skills: ["AC Repair", "AC Installation", "Duct Cleaning"] },
  { id: 6, name: "Gourmet Home Chefs", slug: "gourmet-home-chefs", category: "Chefs", description: null, rating: 4.9, reviews_count: 54, price_range: "QAR 200 - 600", phone: null, email: null, image_url: null, skills: ["International Cuisine", "Meal Prep", "Private Dining"] },
  { id: 7, name: "Crystal Clean Maids", slug: "crystal-clean-maids", category: "Maid Service", description: null, rating: 4.8, reviews_count: 76, price_range: "QAR 80 - 220", phone: null, email: null, image_url: null, skills: ["Full House Cleaning", "Dusting", "Window Cleaning"] },
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
      {/* Hero — full-bleed image backdrop */}
      <section className="relative h-svh min-h-[600px] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-slate-900">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=80"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-slate-600 text-sm font-medium mb-1 tracking-wide">QServ — Home services, simplified.</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 max-w-xl">
              Find trusted professionals for your home
            </h1>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="max-w-lg">
            <AIChat />
          </motion.div>
        </div>
      </section>

      {/* Categories — horizontal circular image scroll */}
      <section className="pt-4 pb-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Services</span>
            <div className="flex-1 h-px bg-slate-100" />
          </div>
          <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden -mx-4 px-4">
            {categories.map((cat) => (
              <Link key={cat.id} href={`/services?category=${cat.slug}`} className="snap-start shrink-0 group">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden ring-2 ring-transparent group-hover:ring-blue-500 transition-all duration-300">
                    {cat.image_url ? (
                      <img src={cat.image_url} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-lg">{cat.name[0]}</div>
                    )}
                  </div>
                  <span className="text-xs font-semibold text-slate-700 group-hover:text-blue-600 transition-colors text-center leading-tight">{cat.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats ticker */}
      <div className="border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-sm text-slate-500 text-center sm:text-left tracking-wide">
            <span className="font-semibold text-slate-800">500+</span> services completed
            <span className="mx-2 text-slate-300">·</span>
            <span className="font-semibold text-slate-800">200+</span> pros
            <span className="mx-2 text-slate-300">·</span>
            <span className="font-semibold text-slate-800">4.9</span> avg rating
            <span className="mx-2 text-slate-300">·</span>
            <span className="font-semibold text-slate-800">98%</span> satisfaction
          </p>
        </div>
      </div>

      {/* Professionals — horizontal profile scroll */}
      {providers.length > 0 && (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Top Rated</span>
                <div className="w-8 h-px bg-slate-200" />
              </div>
              <Link href="/services" className="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors">
                View all <ArrowRight className="w-3 h-3 inline ml-0.5" />
              </Link>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden -mx-4 px-4">
              {providers.map((pro, i) => (
                <motion.div key={pro.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }} className="snap-start shrink-0 w-[260px]">
                  <Link href={`/services/${pro.slug}`} className="group block">
                    <div className="bg-white rounded-2xl p-5 border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all duration-300">
                      <div className="flex flex-col items-center text-center">
                        <Avatar name={pro.name} size="xl" className="mb-3" />
                        <h3 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">{pro.name}</h3>
                        <p className="text-xs text-slate-400 capitalize mb-2">{pro.category}</p>
                        <RatingStars rating={pro.rating} reviewsCount={pro.reviews_count} size="sm" />
                        {pro.price_range && (
                          <div className="mt-3 text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{pro.price_range}</div>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA band */}
      <section className="border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Ready to get started?</h2>
              <p className="text-slate-500 text-sm mt-1">Book a trusted professional in minutes.</p>
            </div>
            <Link href="/services">
              <Button>Browse Services <ArrowRight className="w-4 h-4 ml-2" /></Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
