import Link from "next/link";

const serviceLinks = [
  { label: "Cleaning", href: "/services?category=cleaning" },
  { label: "Plumbing", href: "/services?category=plumbing" },
  { label: "Electrical", href: "/services?category=electrical" },
  { label: "Painting", href: "/services?category=painting" },
  { label: "Pest Control", href: "/services?category=pest-control" },
  { label: "AC & Cooling", href: "/services?category=ac-cooling" },
  { label: "Handyman", href: "/services?category=handyman" },
  { label: "Moving & Packing", href: "/services?category=moving-packing" },
  { label: "Salon & Grooming", href: "/services?category=salon-grooming" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
  { label: "Become a Pro", href: "/become-a-professional" },
];

export default function Footer() {
  return (
    <footer className="bg-primary border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gold flex items-center justify-center text-[11px] font-black text-primary">Q</div>
              <span className="text-white font-bold text-xl">QServ</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Qatar&apos;s most trusted marketplace for home services. Book verified professionals with confidence.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Services</h3>
            <ul className="space-y-2">
              {serviceLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-gray-400 hover:text-gold text-sm transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Company</h3>
            <ul className="space-y-2">
              {companyLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-gray-400 hover:text-gold text-sm transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-6 border-t border-white/5">
              <p className="text-gray-500 text-xs">Tornado Tower, West Bay, Doha, Qatar</p>
              <a href="tel:+97444001234" className="text-gold hover:text-gold-600 text-sm font-medium transition-colors">+974 4400 1234</a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-gray-500 text-xs">&copy; {new Date().getFullYear()} QServ. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}