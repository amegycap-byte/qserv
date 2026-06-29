"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Phone, Mail, MapPin, CheckCircle, Star, ShieldCheck, Sparkles } from "lucide-react";
import { fetchProvider } from "@/lib/api";
import { Provider } from "@/lib/utils";
import Avatar from "@/components/Avatar";
import RatingStars from "@/components/RatingStars";
import TrustedBadge from "@/components/TrustedBadge";
import Button from "@/components/Button";

export default function ProviderDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [provider, setProvider] = useState<Provider | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetchProvider(slug).then((p) => { setProvider(p); setLoading(false); }).catch(() => setLoading(false));
  }, [slug]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (loading) {
    return (
      <div className="pt-28 flex items-center justify-center min-h-[60vh] bg-cream">
        <div className="w-10 h-10 border-4 border-gold/30 border-t-gold rounded-full animate-spin" />
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="pt-28 flex flex-col items-center justify-center min-h-[60vh] bg-cream">
        <h2 className="text-2xl font-bold text-primary mb-4">Professional Not Found</h2>
        <Link href="/services"><Button variant="outline"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Services</Button></Link>
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-12 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <Link href="/services" className="inline-flex items-center gap-2 text-gray-400 hover:text-gold text-sm transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Services
          </Link>

          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="relative">
              <Avatar name={provider.name} size="xl" className="ring-4 ring-gold/30 shadow-xl" />
              <TrustedBadge rating={provider.rating} variant="badge" size="md" />
            </div>
            <div className="flex-1">
              {provider.rating >= 4.8 && (
                <div className="inline-flex items-center gap-1.5 bg-gold/10 border border-gold/20 px-3 py-1 rounded-full mb-3">
                  <Star className="w-3 h-3 text-gold" fill="#D4A843" />
                  <span className="text-gold text-xs font-semibold">Top Rated Professional</span>
                </div>
              )}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">{provider.name}</h1>
              <p className="text-gray-400 text-sm capitalize mb-3">{provider.category} Specialist</p>
              <RatingStars rating={provider.rating} reviewsCount={provider.reviews_count} size="md" />
              <div className="flex flex-wrap items-center gap-3 mt-3">
                {provider.price_range && (
                  <div className="bg-gold/10 text-gold text-xs font-bold px-3 py-1.5 rounded-full border border-gold/20">{provider.price_range}</div>
                )}
                <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold" /> Verified Professional
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main */}
            <div className="lg:col-span-2 space-y-8">
              {/* About */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-8 border border-sand-200">
                <h2 className="text-xl font-bold text-primary mb-4">About</h2>
                <p className="text-gray-600 leading-relaxed">{provider.description}</p>
              </motion.div>

              {/* Skills */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl p-8 border border-sand-200">
                <h2 className="text-xl font-bold text-primary mb-4">Skills & Expertise</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {provider.skills.map((skill) => (
                    <div key={skill} className="flex items-center gap-3 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-gold shrink-0" /> {skill}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Contact */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl p-8 border border-sand-200">
                <h2 className="text-xl font-bold text-primary mb-4">Contact Information</h2>
                <div className="space-y-4">
                  {provider.phone && (
                    <a href={`tel:${provider.phone}`} className="flex items-center gap-3 text-gray-600 hover:text-gold transition-colors">
                      <span className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center"><Phone className="w-5 h-5 text-gold" /></span>
                      <div><p className="text-xs text-gray-400">Phone</p><p className="font-medium">{provider.phone}</p></div>
                    </a>
                  )}
                  {provider.email && (
                    <a href={`mailto:${provider.email}`} className="flex items-center gap-3 text-gray-600 hover:text-gold transition-colors">
                      <span className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center"><Mail className="w-5 h-5 text-gold" /></span>
                      <div><p className="text-xs text-gray-400">Email</p><p className="font-medium">{provider.email}</p></div>
                    </a>
                  )}
                  <div className="flex items-center gap-3 text-gray-600">
                    <span className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center"><MapPin className="w-5 h-5 text-gold" /></span>
                    <div><p className="text-xs text-gray-400">Service Area</p><p className="font-medium">Doha, Qatar</p></div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <div className="bg-white rounded-2xl p-8 border border-sand-200 sticky top-28">
                <h3 className="text-lg font-bold text-primary mb-2">Book This Professional</h3>
                <p className="text-gray-400 text-sm mb-6">Fill in your details and we'll connect you.</p>

                {submitted ? (
                  <div className="text-center py-8">
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                    <p className="font-semibold text-primary mb-1">Request Sent!</p>
                    <p className="text-gray-400 text-sm">{provider.name} will contact you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Your Name *</label>
                      <input required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-sand-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all text-sm bg-cream" placeholder="Your full name" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Phone Number *</label>
                      <input required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-sand-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all text-sm bg-cream" placeholder="+974 5XXX XXXX" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Message</label>
                      <textarea rows={3} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-sand-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all text-sm bg-cream resize-none" placeholder="Describe what you need..." />
                    </div>
                    <Button type="submit" className="w-full">Send Request</Button>
                    <p className="text-[10px] text-gray-400 text-center">We'll connect you with {provider.name} within 24 hours.</p>
                  </form>
                )}

                <hr className="my-6 border-sand-200" />
                {provider.phone && (
                  <a href={`tel:${provider.phone}`} className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border-2 border-gold text-gold font-semibold text-sm hover:bg-gold hover:text-white transition-all duration-300">
                    <Phone className="w-4 h-4" /> Call Directly
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}