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
    <footer className="bg-white border-t border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-[11px] font-black text-white">Q</div>
              <span className="text-slate-900 font-bold text-xl">QServ</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Qatar&apos;s most trusted marketplace for home services. Book verified professionals with confidence.
            </p>
          </div>
          <div>
            <h3 className="text-slate-900 font-semibold text-sm mb-4">Services</h3>
            <ul className="space-y-2">
              {serviceLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-slate-500 hover:text-blue-600 text-sm transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-slate-900 font-semibold text-sm mb-4">Company</h3>
            <ul className="space-y-2">
              {companyLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-slate-500 hover:text-blue-600 text-sm transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-6 border-t border-slate-200">
              <p className="text-slate-400 text-xs">Tornado Tower, West Bay, Doha, Qatar</p>
              <a href="tel:+97444001234" className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">+974 4400 1234</a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-slate-200 text-center">
          <p className="text-slate-400 text-xs">&copy; {new Date().getFullYear()} QServ. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
