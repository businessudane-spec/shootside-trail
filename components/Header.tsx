"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* LOGO — Left */}
        <Link href="/#home" className="flex items-center">
          <Image
            src="/shootside-logos.png"
            alt="Shootside Logo"
            width={160}
            height={50}
            className="h-9 w-auto"
            priority
          />
        </Link>

        {/* NAVIGATION MENU — Center */}
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
        </nav>

        {/* GET CONSULTATION BUTTON — Right */}
        <div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold uppercase tracking-wider hover:from-blue-500 hover:to-purple-500 transition-all duration-300 shadow-lg shadow-purple-500/25 active:scale-95"
          >
            Get Consultation
          </Link>
        </div>

      </div>
    </header>
  );
}



