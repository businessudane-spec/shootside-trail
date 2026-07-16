"use client";

import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { servicesData } from "@/lib/servicesData";
import { ArrowRight, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Dynamic SVG blueprint pattern background matching the service domain
function SubcategoryHeroBg({ subcategory }: { subcategory: string }) {
  switch (subcategory) {
    case "web-development":
      return (
        <svg className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none text-purple-500" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          <text x="40" y="120" fill="currentColor" fontSize="11" fontFamily="monospace" className="opacity-50">&lt;div className="portfolio-grid"&gt;</text>
          <text x="70" y="150" fill="currentColor" fontSize="11" fontFamily="monospace" className="opacity-50">const clientCount = 45;</text>
          <text x="70" y="180" fill="currentColor" fontSize="11" fontFamily="monospace" className="opacity-50">return &lt;NextjsPage /&gt;</text>
          <text x="40" y="210" fill="currentColor" fontSize="11" fontFamily="monospace" className="opacity-50">&lt;/div&gt;</text>
        </svg>
      );
    case "ai-automation":
      return (
        <svg className="absolute inset-0 w-full h-full opacity-[0.07] pointer-events-none text-purple-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400">
          <circle cx="200" cy="180" r="8" fill="currentColor" />
          <circle cx="380" cy="100" r="12" fill="currentColor" />
          <circle cx="380" cy="260" r="10" fill="currentColor" />
          <circle cx="560" cy="180" r="8" fill="currentColor" />
          <line x1="200" y1="180" x2="380" y2="100" stroke="currentColor" strokeWidth="1.5" />
          <line x1="200" y1="180" x2="380" y2="260" stroke="currentColor" strokeWidth="1.5" />
          <line x1="380" y1="100" x2="560" y2="180" stroke="currentColor" strokeWidth="1.5" />
          <line x1="380" y1="260" x2="560" y2="180" stroke="currentColor" strokeWidth="1.5" />
          <line x1="380" y1="100" x2="380" y2="260" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="290" cy="140" r="3" fill="currentColor" />
          <circle cx="470" cy="220" r="3" fill="currentColor" />
        </svg>
      );
    case "cloud-services":
      return (
        <svg className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400">
          <path d="M150,220 C170,190 200,190 220,220 C240,200 270,200 290,220 L290,260 L150,260 Z" fill="none" stroke="currentColor" strokeWidth="2" />
          <rect x="520" y="80" width="160" height="240" rx="8" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <line x1="540" y1="130" x2="660" y2="130" stroke="currentColor" strokeWidth="1.5" />
          <line x1="540" y1="180" x2="660" y2="180" stroke="currentColor" strokeWidth="1.5" />
          <line x1="540" y1="230" x2="660" y2="230" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="640" cy="130" r="3" fill="currentColor" />
          <circle cx="640" cy="180" r="3" fill="currentColor" />
          <circle cx="640" cy="230" r="3" fill="currentColor" />
        </svg>
      );
    case "video-generation":
      return (
        <svg className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400">
          <rect x="80" y="60" width="640" height="280" rx="8" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="400" cy="200" r="45" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <line x1="320" y1="200" x2="480" y2="200" stroke="currentColor" strokeWidth="1" />
          <line x1="400" y1="120" x2="400" y2="280" stroke="currentColor" strokeWidth="1" />
          <path d="M 370,160 L 370,240 L 450,200 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "growth-marketing":
      return (
        <svg className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none text-emerald-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400">
          <path d="M 100,280 L 220,180 L 360,230 L 500,120 L 640,160 L 720,70" fill="none" stroke="currentColor" strokeWidth="3" />
          <polygon points="100,280 220,180 360,230 500,120 640,160 720,70 720,330 100,330" fill="currentColor" fillOpacity="0.1" />
        </svg>
      );
    case "social-media":
      return (
        <svg className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none text-pink-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400">
          <circle cx="180" cy="140" r="35" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="280" cy="240" r="25" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="520" cy="160" r="50" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="660" cy="220" r="30" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <line x1="215" y1="140" x2="280" y2="215" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="520" y1="210" x2="660" y2="220" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
        </svg>
      );
    case "seo-performance":
      return (
        <svg className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none text-cyan-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400">
          <path d="M 260,260 A 90,90 0 1,1 540,260" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="8 4" />
          <line x1="400" y1="260" x2="470" y2="190" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
          <circle cx="400" cy="260" r="8" fill="currentColor" />
        </svg>
      );
    default:
      return null;
  }
}

export default function SubcategoryPage() {
  const params = useParams();
  const category = params.category as string;
  const subcategory = params.subcategory as string;

  // Retrieve data from catalog
  const data = servicesData[subcategory];

  // Validate path segments
  if (!data || data.parent !== category) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="min-h-screen selection:bg-purple-600/30 selection:text-purple-200">
        
        {/* 1. HERO SECTION (Dark theme background with topic SVG overlay) */}
        <section className="relative pt-36 pb-24 bg-[#030303] text-white overflow-hidden border-b border-white/5">
          {/* Decorative glowing ambient orb */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

          {/* Dynamic matching background SVG */}
          <SubcategoryHeroBg subcategory={subcategory} />

          {/* Real Background Graphic Image Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-[0.32] mix-blend-screen pointer-events-none"
            style={{ 
              backgroundImage: `url(${data.parent === "solutions" ? "/solutions_bg.png" : "/digital_bg.png"})` 
            }} 
          />

          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-400 hover:text-purple-300 transition-colors mb-8 group"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" /> Back to Home
            </Link>

            <span className="block text-xs font-bold uppercase tracking-[4px] text-purple-500 mb-3">
              {data.parent === "solutions" ? "Enterprise Solution" : "Digital Strategy"}
            </span>
            
            <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight leading-none mb-6">
              {data.title}
            </h1>
            
            <p className="text-gray-300 text-lg sm:text-xl max-w-3xl leading-relaxed mb-8 font-light">
              {data.tagline}
            </p>

            <p className="text-gray-400 text-sm sm:text-base max-w-4xl leading-relaxed">
              {data.description}
            </p>
          </div>
        </section>

        {/* 2. SERVICES CATALOG GRID (Light theme background) */}
        <section className="py-24 bg-white text-slate-900 relative border-b border-slate-200/40">
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-14">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-600">A-Z Catalog</span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase mt-2 mb-4 text-slate-950">
                Detailed Solutions Matrix
              </h2>
              <p className="text-slate-500 text-sm max-w-2xl">
                Explore our full spectrum of specialized capabilities. We deliver end-to-end coverage with no hidden dependencies.
              </p>
            </div>

            {/* Matrix Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.services.map((svc, i) => (
                <div
                  key={svc.id}
                  className="group relative rounded-2xl border border-slate-200/60 bg-slate-50 hover:bg-slate-100/80 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/5 overflow-hidden"
                >
                  {/* Subtle hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-600 font-mono text-xs font-bold">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 mb-2 group-hover:text-purple-600 transition-colors">
                        {svc.name}
                      </h3>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                        {svc.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. CALL-TO-ACTION STRIP (Dark theme background) */}
        <section className="py-24 bg-[#050505] text-white border-t border-white/5 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <span className="text-xs font-bold uppercase tracking-[4px] text-purple-400 mb-4 block">Get Started Today</span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase mb-6 leading-tight">
              Ready to deploy <br /> this solution?
            </h2>
            <p className="text-gray-400 max-w-lg mx-auto mb-8 text-sm sm:text-base">
              Connect directly with our India & GCC remote solutions coordinators for custom pricing estimates and scoping logs.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-sm uppercase tracking-wider hover:from-blue-500 hover:to-purple-500 transition-all duration-300 active:scale-95 shadow-lg shadow-purple-500/20"
              >
                Request Scoping Session <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
              <a
                href="https://wa.me/917306166866"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold text-sm uppercase tracking-wider transition-all duration-300"
              >
                WhatsApp Chat
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
