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

export default function ServicesContent() {
  const searchParams = useSearchParams();
  const categoryFilter = searchParams.get("category");

  const [categories, setCategories] = useState<Category[]>([]);
  const [providers, setProviders] = useState<Provider[]>([]);
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