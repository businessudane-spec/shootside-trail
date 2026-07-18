"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (menu: string) => {
    if (activeSubmenu === menu) {
      setActiveSubmenu(null);
    } else {
      setActiveSubmenu(menu);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* LOGO — Left */}
        <Link href="/#home" className="flex items-center" onClick={() => setMobileMenuOpen(false)}>
          <Image
            src="/shootside-logos.png"
            alt="Shootside Logo"
            width={160}
            height={50}
            className="h-9 w-auto"
            priority
          />
        </Link>

        {/* NAVIGATION MENU — Center (Desktop Only) */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link href="/#home" className="text-xs font-semibold uppercase tracking-wider text-white/70 hover:text-white transition-colors">
            Home
          </Link>

          {/* SOLUTIONS DROPDOWN */}
          <div className="relative group">
            <button className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-white/70 hover:text-white transition-colors py-2 cursor-pointer focus:outline-none">
              Solutions
              <ChevronDown className="w-3 h-3" />
            </button>
            <div className="absolute left-0 mt-0 w-60 rounded-xl border border-white/5 bg-[#090909]/95 backdrop-blur-md p-2 shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50">
              <Link href="/solutions/web-development" className="block px-4 py-2.5 rounded-lg text-xs font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                Website Development
              </Link>
              <Link href="/solutions/ai-automation" className="block px-4 py-2.5 rounded-lg text-xs font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                AI Automation & Chatbots
              </Link>
              <Link href="/solutions/cloud-services" className="block px-4 py-2.5 rounded-lg text-xs font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                Cloud Services & Microsoft 365
              </Link>
              <Link href="/solutions/video-generation" className="block px-4 py-2.5 rounded-lg text-xs font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                AI Video Generation
              </Link>
            </div>
          </div>

          {/* DIGITAL DROPDOWN */}
          <div className="relative group">
            <button className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-white/70 hover:text-white transition-colors py-2 cursor-pointer focus:outline-none">
              Digital
              <ChevronDown className="w-3 h-3" />
            </button>
            <div className="absolute left-0 mt-0 w-60 rounded-xl border border-white/5 bg-[#090909]/95 backdrop-blur-md p-2 shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50">
              <Link href="/digital/growth-marketing" className="block px-4 py-2.5 rounded-lg text-xs font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                A-Z Growth Marketing
              </Link>
              <Link href="/digital/social-media" className="block px-4 py-2.5 rounded-lg text-xs font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                Social Media Management
              </Link>
              <Link href="/digital/seo-performance" className="block px-4 py-2.5 rounded-lg text-xs font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                SEO & Performance Advisory
              </Link>
            </div>
          </div>

          <Link href="/#emergency" className="text-xs font-semibold uppercase tracking-wider text-[#ff4a4a] hover:text-[#ff6b6b] transition-colors">
            Emergency
          </Link>

          {/* COMPANY DROPDOWN */}
          <div className="relative group">
            <button className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-white/70 hover:text-white transition-colors py-2 cursor-pointer focus:outline-none">
              Company
              <ChevronDown className="w-3 h-3" />
            </button>
            <div className="absolute left-0 mt-0 w-48 rounded-xl border border-white/5 bg-[#090909]/95 backdrop-blur-md p-2 shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50">
              <Link href="/about" className="block px-4 py-2.5 rounded-lg text-xs font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                About Us
              </Link>
            </div>
          </div>

          <Link href="/ads" className="text-xs font-semibold uppercase tracking-wider text-white/70 hover:text-white transition-colors">
            Ads
          </Link>
          <Link href="/blog" className="text-xs font-semibold uppercase tracking-wider text-white/70 hover:text-white transition-colors">
            Blog
          </Link>
        </nav>

        {/* RIGHT CTA BUTTON & HAMBURGER TOGGLE */}
        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold uppercase tracking-wider hover:from-blue-500 hover:to-purple-500 transition-all duration-300 shadow-lg shadow-purple-500/25 active:scale-95"
          >
            Get Consultation
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white/80 hover:text-white focus:outline-none p-1"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE NAVIGATION DRAWER */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[#090909]/98 backdrop-blur-lg border-b border-white/10 py-6 px-6 max-h-[85vh] overflow-y-auto space-y-6 z-50 shadow-2xl transition-all duration-300">
          <div className="flex flex-col gap-4">
            
            <Link
              href="/#home"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold uppercase tracking-wider text-white/80 hover:text-white py-2 border-b border-white/5"
            >
              Home
            </Link>

            {/* SOLUTIONS COLLAPSIBLE */}
            <div className="border-b border-white/5 py-2">
              <button
                onClick={() => toggleSubmenu("solutions")}
                className="w-full flex items-center justify-between text-sm font-semibold uppercase tracking-wider text-white/80 hover:text-white text-left focus:outline-none"
              >
                Solutions
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeSubmenu === "solutions" ? "rotate-180" : ""}`} />
              </button>
              {activeSubmenu === "solutions" && (
                <div className="pl-4 mt-2 flex flex-col gap-3.5 py-2">
                  <Link href="/solutions/web-development" onClick={() => setMobileMenuOpen(false)} className="text-xs font-medium text-gray-400 hover:text-white">
                    Website Development
                  </Link>
                  <Link href="/solutions/ai-automation" onClick={() => setMobileMenuOpen(false)} className="text-xs font-medium text-gray-400 hover:text-white">
                    AI Automation & Chatbots
                  </Link>
                  <Link href="/solutions/cloud-services" onClick={() => setMobileMenuOpen(false)} className="text-xs font-medium text-gray-400 hover:text-white">
                    Cloud Services & Microsoft 365
                  </Link>
                  <Link href="/solutions/video-generation" onClick={() => setMobileMenuOpen(false)} className="text-xs font-medium text-gray-400 hover:text-white">
                    AI Video Generation
                  </Link>
                </div>
              )}
            </div>

            {/* DIGITAL COLLAPSIBLE */}
            <div className="border-b border-white/5 py-2">
              <button
                onClick={() => toggleSubmenu("digital")}
                className="w-full flex items-center justify-between text-sm font-semibold uppercase tracking-wider text-white/80 hover:text-white text-left focus:outline-none"
              >
                Digital
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeSubmenu === "digital" ? "rotate-180" : ""}`} />
              </button>
              {activeSubmenu === "digital" && (
                <div className="pl-4 mt-2 flex flex-col gap-3.5 py-2">
                  <Link href="/digital/growth-marketing" onClick={() => setMobileMenuOpen(false)} className="text-xs font-medium text-gray-400 hover:text-white">
                    A-Z Growth Marketing
                  </Link>
                  <Link href="/digital/social-media" onClick={() => setMobileMenuOpen(false)} className="text-xs font-medium text-gray-400 hover:text-white">
                    Social Media Management
                  </Link>
                  <Link href="/digital/seo-performance" onClick={() => setMobileMenuOpen(false)} className="text-xs font-medium text-gray-400 hover:text-white">
                    SEO & Performance Advisory
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/#emergency"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold uppercase tracking-wider text-[#ff4a4a] hover:text-[#ff6b6b] py-2 border-b border-white/5"
            >
              Emergency
            </Link>

            {/* COMPANY COLLAPSIBLE */}
            <div className="border-b border-white/5 py-2">
              <button
                onClick={() => toggleSubmenu("company")}
                className="w-full flex items-center justify-between text-sm font-semibold uppercase tracking-wider text-white/80 hover:text-white text-left focus:outline-none"
              >
                Company
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeSubmenu === "company" ? "rotate-180" : ""}`} />
              </button>
              {activeSubmenu === "company" && (
                <div className="pl-4 mt-2 flex flex-col gap-3.5 py-2">
                  <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="text-xs font-medium text-gray-400 hover:text-white">
                    About Us
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/ads"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold uppercase tracking-wider text-white/80 hover:text-white py-2 border-b border-white/5"
            >
              Ads
            </Link>
            <Link
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold uppercase tracking-wider text-white/80 hover:text-white py-2 border-b border-white/5"
            >
              Blog
            </Link>
          </div>

          <div className="pt-4">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center w-full py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold uppercase tracking-wider hover:from-blue-500 hover:to-purple-500 transition-all duration-300 shadow-lg shadow-purple-500/25"
            >
              Get Consultation
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
