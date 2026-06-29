"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import Logo from "@/components/Logo";
import Button from "@/components/Button";

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const proLink = { label: "Become a Pro", href: "/become-a-professional", badge: true };

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled ? "glass-dark shadow-lg shadow-black/20" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <Logo variant={scrolled ? "dark" : "light"} />
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}
                className="px-4 py-2.5 text-gray-300 hover:text-gold text-sm font-medium transition-all duration-300 rounded-xl hover:bg-white/5 relative group/link">
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gold rounded-full group-hover/link:w-4/5 transition-all duration-300" />
              </Link>
            ))}
            <Link href={proLink.href}
              className="px-4 py-2.5 text-gold hover:text-white text-sm font-semibold transition-all duration-300 rounded-xl hover:bg-gold/15 relative group/link">
              {proLink.label}
              <span className="ml-1.5 inline-flex items-center px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-gold text-primary rounded-full">New</span>
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gold rounded-full group-hover/link:w-4/5 transition-all duration-300" />
            </Link>
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <a href="tel:+97444001234" className="flex items-center gap-2 text-gray-300 hover:text-gold text-sm transition-all duration-300 px-3 py-2 rounded-xl hover:bg-white/5">
              <Phone className="w-4 h-4" />
              <span>+974 4400 1234</span>
            </a>
            <div className="h-6 w-px bg-white/10" />
            <Link href="/contact">
              <Button size="sm">Book a Service</Button>
            </Link>
          </div>

          <button onClick={() => setOpen(!open)} className="lg:hidden text-white p-2.5 hover:bg-white/10 rounded-xl transition-all duration-300" aria-label="Toggle menu">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="lg:hidden glass-dark border-t border-white/5">
            <div className="px-4 py-6 space-y-1">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setOpen(false)}
                  className="block px-4 py-3.5 text-gray-300 hover:text-gold hover:bg-white/5 rounded-xl transition-all duration-300 text-sm font-medium">
                  {link.label}
                </Link>
              ))}
              <Link href={proLink.href} onClick={() => setOpen(false)}
                className="flex items-center gap-2 px-4 py-3.5 text-gold hover:text-white hover:bg-gold/15 rounded-xl transition-all duration-300 text-sm font-semibold">
                {proLink.label}
                <span className="inline-flex items-center px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-gold text-primary rounded-full">New</span>
              </Link>
              <hr className="border-white/5 my-4" />
              <a href="tel:+97444001234" className="flex items-center gap-2 px-4 py-3 text-gray-300 hover:text-gold rounded-xl text-sm">
                <Phone className="w-4 h-4" /> +974 4400 1234
              </a>
              <Link href="/contact" onClick={() => setOpen(false)} className="block pt-2">
                <Button className="w-full">Book a Service</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}