"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ChevronRight, ChevronLeft, Check, Sparkles, User, Briefcase, Award,
  FileText, Send, Plus, Trash2, Star
} from "lucide-react";
import Button from "@/components/Button";
import { fetchCategories, submitApplication } from "@/lib/api";
import type { Category, Credential } from "@/lib/utils";

const steps = [
  { num: 1, label: "Basic Info", icon: User },
  { num: 2, label: "Service Details", icon: Briefcase },
  { num: 3, label: "Credentials", icon: Award },
  { num: 4, label: "Experience", icon: FileText },
  { num: 5, label: "Review & Submit", icon: Send },
];

export default function BecomeAProfessional() {
  const [step, setStep] = useState(1);
  const [categories, setCategories] = useState<Category[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [credTitle, setCredTitle] = useState("");
  const [credIssuer, setCredIssuer] = useState("");
  const [credYear, setCredYear] = useState(new Date().getFullYear());
  const [experience, setExperience] = useState("");

  useEffect(() => {
    fetchCategories().then(setCategories).catch(() => {});
  }, []);

  const addSkill = () => {
    const s = skillInput.trim();
    if (s && !skills.includes(s)) {
      setSkills([...skills, s]);
      setSkillInput("");
    }
  };

  const removeSkill = (idx: number) => {
    setSkills(skills.filter((_, i) => i !== idx));
  };

  const addCredential = () => {
    if (credTitle.trim() && credIssuer.trim() && credYear > 1900) {
      setCredentials([...credentials, { title: credTitle.trim(), issuer: credIssuer.trim(), year: credYear }]);
      setCredTitle("");
      setCredIssuer("");
      setCredYear(new Date().getFullYear());
    }
  };

  const removeCredential = (idx: number) => {
    setCredentials(credentials.filter((_, i) => i !== idx));
  };

  const canNext = () => {
    switch (step) {
      case 1: return name.trim() && phone.trim() && email.trim();
      case 2: return category && skills.length > 0 && priceRange.trim();
      case 3: return true;
      case 4: return experience.trim().length >= 20;
      case 5: return true;
      default: return false;
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError("");
    const result = await submitApplication({
      name, phone, email, category, skills, price_range: priceRange, credentials, experience,
    });
    if (result.success) {
      setSubmitted(true);
    } else {
      setError(result.message);
    }
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-cream pt-16 pb-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }}>
            <div className="w-24 h-24 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6 border-2 border-gold">
              <Check className="w-12 h-12 text-gold" />
            </div>
          </motion.div>
          <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-4">Application Submitted!</h1>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Thank you, {name}! We&apos;ll review your application and get back to you within 2-3 business days.
          </p>
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cream pt-16 pb-20">
      <div className="max-w-3xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="text-gold text-xs font-semibold tracking-wider uppercase">Join QServ</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-primary">
            Become a <span className="text-gradient">Professional</span>
          </h1>
          <p className="text-gray-500 mt-3 max-w-lg mx-auto">
            Join Qatar&apos;s fastest-growing home services marketplace. Set your own rates, choose your hours.
          </p>
        </motion.div>

        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-10">
          {steps.map((s) => (
            <div key={s.num} className="flex items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all duration-500 ${
                  step > s.num ? "bg-gold text-white" : step === s.num ? "bg-primary text-gold border-2 border-gold" : "bg-sand-200 text-sand-600"
                }`}>
                  {step > s.num ? <Check className="w-4 h-4" /> : s.num}
                </div>
                <span className={`hidden sm:block text-xs font-medium ${
                  step >= s.num ? "text-primary" : "text-sand-500"
                }`}>{s.label}</span>
              </div>
              {s.num < 5 && <div className={`w-6 sm:w-12 h-0.5 transition-all duration-500 ${
                step > s.num ? "bg-gold" : "bg-sand-200"
              }`} />}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg border border-sand-200">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-primary">Basic Information</h2>
                    <p className="text-xs text-gray-400">Tell us about yourself</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-primary mb-1.5">Full Name *</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Ahmed Al Thani"
                      className="w-full bg-sand-50 border border-sand-200 rounded-xl px-4 py-3.5 text-sm text-primary focus:outline-none focus:border-gold transition-colors placeholder:text-sand-400" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary mb-1.5">Phone Number *</label>
                    <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="e.g. +974 3312 4567"
                      className="w-full bg-sand-50 border border-sand-200 rounded-xl px-4 py-3.5 text-sm text-primary focus:outline-none focus:border-gold transition-colors placeholder:text-sand-400" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary mb-1.5">Email Address *</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="e.g. ahmed@example.com"
                      className="w-full bg-sand-50 border border-sand-200 rounded-xl px-4 py-3.5 text-sm text-primary focus:outline-none focus:border-gold transition-colors placeholder:text-sand-400" />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-primary">Service Details</h2>
                    <p className="text-xs text-gray-400">What services do you offer?</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-primary mb-1.5">Category *</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-sand-50 border border-sand-200 rounded-xl px-4 py-3.5 text-sm text-primary focus:outline-none focus:border-gold transition-colors appearance-none cursor-pointer">
                      <option value="">Select a category</option>
                      {categories.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary mb-1.5">Skills *</label>
                    <div className="flex gap-2 mb-2">
                      <input type="text" value={skillInput} onChange={(e) => setSkillInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())} placeholder="e.g. Deep Cleaning"
                        className="flex-1 bg-sand-50 border border-sand-200 rounded-xl px-4 py-3.5 text-sm text-primary focus:outline-none focus:border-gold transition-colors placeholder:text-sand-400" />
                      <button onClick={addSkill} className="px-4 py-3.5 bg-gold text-white rounded-xl hover:bg-gold-600 transition-colors text-sm font-semibold">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    {skills.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {skills.map((s, i) => (
                          <span key={i} className="inline-flex items-center gap-1.5 bg-gold/10 text-gold-600 text-xs font-medium px-3 py-1.5 rounded-full border border-gold/20">
                            {s}
                            <button onClick={() => removeSkill(i)} className="hover:text-red-500 transition-colors"><Trash2 className="w-3 h-3" /></button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary mb-1.5">Price Range *</label>
                    <input type="text" value={priceRange} onChange={(e) => setPriceRange(e.target.value)} placeholder="e.g. QAR 150 - 400"
                      className="w-full bg-sand-50 border border-sand-200 rounded-xl px-4 py-3.5 text-sm text-primary focus:outline-none focus:border-gold transition-colors placeholder:text-sand-400" />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
                    <Award className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-primary">Credentials & Certifications</h2>
                    <p className="text-xs text-gray-400">Add your professional qualifications</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-primary mb-1.5">Certification Title</label>
                      <input type="text" value={credTitle} onChange={(e) => setCredTitle(e.target.value)} placeholder="e.g. Licensed Electrician"
                        className="w-full bg-sand-50 border border-sand-200 rounded-xl px-4 py-3.5 text-sm text-primary focus:outline-none focus:border-gold transition-colors placeholder:text-sand-400" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary mb-1.5">Issuing Body</label>
                      <input type="text" value={credIssuer} onChange={(e) => setCredIssuer(e.target.value)} placeholder="e.g. MME Qatar"
                        className="w-full bg-sand-50 border border-sand-200 rounded-xl px-4 py-3.5 text-sm text-primary focus:outline-none focus:border-gold transition-colors placeholder:text-sand-400" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary mb-1.5">Year</label>
                      <input type="number" value={credYear} onChange={(e) => setCredYear(parseInt(e.target.value) || new Date().getFullYear())} min={1900} max={new Date().getFullYear()}
                        className="w-full bg-sand-50 border border-sand-200 rounded-xl px-4 py-3.5 text-sm text-primary focus:outline-none focus:border-gold transition-colors" />
                    </div>
                  </div>
                  <button onClick={addCredential} disabled={!credTitle.trim() || !credIssuer.trim()}
                    className="flex items-center gap-2 text-gold hover:text-gold-600 text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    <Plus className="w-4 h-4" /> Add Credential
                  </button>
                  {credentials.length > 0 && (
                    <div className="space-y-2 mt-2">
                      {credentials.map((c, i) => (
                        <div key={i} className="flex items-center justify-between bg-sand-50 rounded-xl px-4 py-3 border border-sand-200">
                          <div className="flex items-center gap-3">
                            <Award className="w-4 h-4 text-gold" />
                            <div>
                              <p className="text-sm font-medium text-primary">{c.title}</p>
                              <p className="text-xs text-gray-400">{c.issuer} &middot; {c.year}</p>
                            </div>
                          </div>
                          <button onClick={() => removeCredential(i)} className="text-sand-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-primary">Experience</h2>
                    <p className="text-xs text-gray-400">Tell us about your professional background</p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary mb-1.5">Describe your experience *</label>
                  <textarea value={experience} onChange={(e) => setExperience(e.target.value)} rows={6} placeholder="Describe your years of experience, types of projects you've handled, specialized skills, etc. Minimum 20 characters..."
                    className="w-full bg-sand-50 border border-sand-200 rounded-xl px-4 py-3.5 text-sm text-primary focus:outline-none focus:border-gold transition-colors placeholder:text-sand-400 resize-none" />
                  <p className="text-xs text-sand-500 mt-1">{experience.length} characters {experience.length < 20 && "(minimum 20)"}</p>
                </div>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div key="step5" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
                    <Send className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-primary">Review & Submit</h2>
                    <p className="text-xs text-gray-400">Please review your information before submitting</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-sand-50 rounded-2xl p-5 border border-sand-200">
                    <h3 className="text-sm font-semibold text-primary mb-3 flex items-center gap-2"><User className="w-4 h-4 text-gold" /> Basic Info</h3>
                    <div className="grid grid-cols-3 gap-3 text-sm">
                      <div><span className="text-gray-400">Name:</span> <span className="text-primary font-medium">{name}</span></div>
                      <div><span className="text-gray-400">Phone:</span> <span className="text-primary font-medium">{phone}</span></div>
                      <div><span className="text-gray-400">Email:</span> <span className="text-primary font-medium">{email}</span></div>
                    </div>
                  </div>
                  <div className="bg-sand-50 rounded-2xl p-5 border border-sand-200">
                    <h3 className="text-sm font-semibold text-primary mb-3 flex items-center gap-2"><Briefcase className="w-4 h-4 text-gold" /> Service Details</h3>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div><span className="text-gray-400">Category:</span> <span className="text-primary font-medium">{category}</span></div>
                      <div><span className="text-gray-400">Price Range:</span> <span className="text-primary font-medium">{priceRange}</span></div>
                    </div>
                    <div className="mt-2"><span className="text-gray-400 text-sm">Skills:</span>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {skills.map((s, i) => <span key={i} className="text-xs bg-gold/10 text-gold-600 px-2 py-1 rounded-full">{s}</span>)}
                      </div>
                    </div>
                  </div>
                  {credentials.length > 0 && (
                    <div className="bg-sand-50 rounded-2xl p-5 border border-sand-200">
                      <h3 className="text-sm font-semibold text-primary mb-3 flex items-center gap-2"><Award className="w-4 h-4 text-gold" /> Credentials</h3>
                      <div className="space-y-2">
                        {credentials.map((c, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm">
                            <Star className="w-3 h-3 text-gold" />
                            <span className="text-primary font-medium">{c.title}</span>
                            <span className="text-gray-400">- {c.issuer} ({c.year})</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="bg-sand-50 rounded-2xl p-5 border border-sand-200">
                    <h3 className="text-sm font-semibold text-primary mb-3 flex items-center gap-2"><FileText className="w-4 h-4 text-gold" /> Experience</h3>
                    <p className="text-sm text-primary leading-relaxed">{experience}</p>
                  </div>
                </div>
                {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-between mt-8 pt-6 border-t border-sand-200">
            <div>
              {step > 1 && (
                <Button variant="outline" size="sm" onClick={() => setStep(step - 1)}>
                  <ChevronLeft className="w-4 h-4" /> Back
                </Button>
              )}
            </div>
            <div>
              {step < 5 ? (
                <Button size="sm" onClick={() => setStep(step + 1)} disabled={!canNext()}>
                  Next <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button size="sm" onClick={handleSubmit} disabled={submitting}>
                  {submitting ? "Submitting..." : "Submit Application"} {!submitting && <Send className="w-4 h-4" />}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}