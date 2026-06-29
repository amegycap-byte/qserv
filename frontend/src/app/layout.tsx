import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "QServ | Qatar's Trusted Home Services Marketplace",
  description:
    "Book verified professionals for cleaning, plumbing, electrical, painting, and more in Doha, Qatar. Transparent pricing, quality assured.",
  keywords: [
    "Qatar home services",
    "Doha cleaning service",
    "plumber Doha",
    "electrician Qatar",
    "home maintenance Doha",
    "QServ Qatar",
  ],
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "QServ | Qatar's Trusted Home Services Marketplace",
    description:
      "Book verified professionals for cleaning, plumbing, electrical, painting, and more.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${openSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-gray-800 font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
