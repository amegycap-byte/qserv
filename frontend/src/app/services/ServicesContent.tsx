"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, ArrowRight, Sparkles, SlidersHorizontal } from "lucide-react";
import { fetchCategories, fetchProviders } from "@/lib/api";
import { Category, Provider } from "@/lib/utils";
import Avatar from "@/components/Avatar";
import RatingStars from "@/components/RatingStars";
import TrustedBadge from "@/components/TrustedBadge";
import Button from "@/components/Button";

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

const fallbackProviders: Provider[] = [
  { id: 1, name: "Dania Maids", slug: "dania-maids", category: "Cleaning", description: null, rating: 4.9, reviews_count: 1381, price_range: "QAR 35 - 180/hr", phone: null, email: null, image_url: null, skills: ["Home Cleaning", "Deep Cleaning", "Eco-Friendly"] },
  { id: 2, name: "Almas Movers International", slug: "almas-movers", category: "Moving & Packing", description: null, rating: 4.9, reviews_count: 567, price_range: "QAR 600 - 4000", phone: null, email: null, image_url: null, skills: ["Home Relocation", "Office Moving", "Packing Service"] },
  { id: 3, name: "Layla Kitchen", slug: "layla-kitchen", category: "Chefs", description: null, rating: 4.9, reviews_count: 178, price_range: "QAR 200 - 800", phone: null, email: null, image_url: null, skills: ["Private Dining", "Corporate Catering", "Daily Meal Plan"] },
  { id: 4, name: "Enddi Beauty Salon & Makeup", slug: "enddi-beauty-salon", category: "Salon & Grooming", description: null, rating: 4.9, reviews_count: 234, price_range: "QAR 80 - 500", phone: null, email: null, image_url: null, skills: ["Hair Braiding", "Bridal Makeup", "Nail Art"] },
  { id: 5, name: "Handyman Doha", slug: "handyman-doha-main", category: "Handyman", description: null, rating: 4.8, reviews_count: 376, price_range: "QAR 100 - 500", phone: null, email: null, image_url: null, skills: ["Furniture Assembly", "TV Mounting", "General Repairs"] },
  { id: 6, name: "Home Service Qatar", slug: "home-service-qatar", category: "Plumbing", description: null, rating: 4.8, reviews_count: 312, price_range: "QAR 150 - 800", phone: null, email: null, image_url: null, skills: ["Leak Detection", "Pipe Repair", "Drain Cleaning"] },
  { id: 7, name: "Homefix Qatar", slug: "homefix-qatar-ac", category: "AC & Cooling", description: null, rating: 4.8, reviews_count: 245, price_range: "QAR 180 - 1500", phone: null, email: null, image_url: null, skills: ["AC Installation", "AC Repair", "Gas Refill"] },
  { id: 8, name: "Qatar Maid Service", slug: "qatar-maid-service", category: "Maid Service", description: null, rating: 4.7, reviews_count: 423, price_range: "QAR 80 - 250", phone: null, email: null, image_url: null, skills: ["Residential Cleaning", "Deep Cleaning", "Office Cleaning"] },
  { id: 9, name: "Roots Qatar", slug: "roots-qatar", category: "Salon & Grooming", description: null, rating: 4.8, reviews_count: 312, price_range: "QAR 150 - 600", phone: null, email: null, image_url: null, skills: ["Blonde Specialist", "Hair Coloring", "Haircut & Styling"] },
  { id: 10, name: "Al Allam Cleaning", slug: "al-allam-pest-control", category: "Pest Control", description: null, rating: 4.6, reviews_count: 178, price_range: "QAR 250 - 800", phone: null, email: null, image_url: null, skills: ["Cockroach Control", "Termite Treatment", "Rodent Control"] },
  { id: 11, name: "Homefix Qatar", slug: "homefix-qatar-painting", category: "Painting", description: null, rating: 4.7, reviews_count: 134, price_range: "QAR 200 - 1200", phone: null, email: null, image_url: null, skills: ["Interior Painting", "Exterior Painting", "Color Consultation"] },
  { id: 12, name: "Handyman Doha", slug: "handyman-doha", category: "Electrical", description: null, rating: 4.8, reviews_count: 276, price_range: "QAR 100 - 500", phone: null, email: null, image_url: null, skills: ["Lighting Install", "Switch Repair", "Wiring Work"] },
];

export default function ServicesContent() {
  const searchParams = useSearchParams();
  const categoryFilter = searchParams.get("category");

  const [categories, setCategories] = useState<Category[]>(fallbackCategories);
  const [providers, setProviders] = useState<Provider[]>(fallbackProviders);
  const [selectedCategory, setSelectedCategory] = useState(categoryFilter || "");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchCategories().then(setCategories).catch(() => {});
  }, []);

  useEffect(() => {
    fetchProviders(selectedCategory || undefined).then(setProviders).catch(() => {});
  }, [selectedCategory]);

  const filteredProviders = providers.filter(
    (p) =>
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <>
      <section className="pt-28 pb-12 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="text-gold font-semibold text-sm tracking-widest uppercase">Our Services</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-2 mb-3">Find Your Perfect Professional</h1>
            <p className="text-gray-400 text-lg max-w-2xl">Browse trusted, verified professionals across all categories.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search professionals or skills..."
                className="w-full bg-white/10 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white text-sm focus:outline-none focus:border-gold transition-colors placeholder:text-gray-500" />
            </div>
            <div className="relative w-full sm:w-64">
              <SlidersHorizontal className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-gold transition-colors appearance-none cursor-pointer">
                <option value="" className="bg-primary">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.slug} className="bg-primary">{cat.name}</option>
                ))}
              </select>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {!selectedCategory && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-primary mb-6">Browse by Category</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {categories.map((cat, i) => (
                  <motion.button key={cat.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className="group relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
                    {cat.image_url && (
                      <img src={cat.image_url} alt={cat.name} className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-110" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <h3 className="text-white font-bold text-sm group-hover:text-gold transition-colors">{cat.name}</h3>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-primary">
                {selectedCategory ? categories.find((c) => c.slug === selectedCategory)?.name || "Professionals" : "All Professionals"}
              </h2>
              <span className="text-gray-400 text-sm">{filteredProviders.length} found</span>
            </div>

            {filteredProviders.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-400 text-lg">No professionals found matching your criteria.</p>
                <button onClick={() => { setSelectedCategory(""); setSearchQuery(""); }} className="mt-4 text-gold font-semibold hover:underline">Clear filters</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProviders.map((pro, i) => (
                  <motion.div key={pro.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }}>
                    <Link href={`/services/${pro.slug}`} className="group block">
                      <div className="bg-white rounded-2xl p-6 border border-sand-200 hover:border-gold/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 relative overflow-hidden">
                        <TrustedBadge rating={pro.rating} variant="ribbon" />
                        <div className="flex flex-col items-center text-center pt-3">
                          <Avatar name={pro.name} size="lg" className="mb-3 ring-2 ring-gold/20" />
                          <h3 className="font-bold text-primary text-base group-hover:text-gold transition-colors">{pro.name}</h3>
                          <p className="text-xs text-gray-400 mb-2 capitalize">{pro.category}</p>
                          <RatingStars rating={pro.rating} reviewsCount={pro.reviews_count} size="sm" />
                          {pro.skills.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-3 justify-center">
                              {pro.skills.slice(0, 3).map((skill) => (
                                <span key={skill} className="bg-sand-100 text-sand-700 text-[10px] font-medium px-2 py-0.5 rounded-full">{skill}</span>
                              ))}
                              {pro.skills.length > 3 && <span className="text-[10px] text-gray-400">+{pro.skills.length - 3}</span>}
                            </div>
                          )}
                          {pro.price_range && (
                            <div className="mt-3 bg-gold/10 text-gold-600 text-xs font-semibold px-3 py-1 rounded-full">{pro.price_range}</div>
                          )}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}