"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { blogPosts } from "@/lib/blogData";
import { ArrowRight, BookOpen, Clock, Calendar } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function BlogIndexPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen selection:bg-purple-600/30 selection:text-purple-200">
        
        {/* 1. HERO SECTION (Dark theme background) */}
        <section className="relative pt-36 pb-24 bg-[#030303] text-white overflow-hidden border-b border-white/5">
          {/* Decorative glowing ambient orb */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

          {/* Blueprint grid pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.05] pointer-events-none text-purple-500" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="blogGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#blogGrid)" />
          </svg>

          {/* Real Background Graphic Image Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-[0.32] mix-blend-screen pointer-events-none"
            style={{ backgroundImage: `url('/blog_banner_bg.png')` }} 
          />

          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <span className="block text-xs font-bold uppercase tracking-[4px] text-purple-500 mb-3">Insights & Analysis</span>
            <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight leading-none mb-6">
              Shootside <br /> <span className="text-transparent" style={{ WebkitTextStroke: "1.5px #ad46ff" }}>Journal</span>
            </h1>
            <p className="text-gray-300 text-lg sm:text-xl max-w-2xl leading-relaxed font-light">
              Workflow breakdowns, visual design studies, and enterprise cloud optimization guidelines from our product strategists.
            </p>
          </div>
        </section>

        {/* 2. BLOG LIST GRID (Light theme background) */}
        <section className="py-24 bg-white text-slate-900 relative">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-12 gap-12">
              
              {/* Main Blog Post Stream */}
              <div className="md:col-span-12 space-y-12">
                {blogPosts.map((post, i) => (
                  <motion.article
                    key={post.slug}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="group border border-slate-200/60 rounded-3xl bg-slate-50 hover:bg-slate-100/50 p-6 md:p-10 transition-all duration-300 grid md:grid-cols-12 gap-8 items-center"
                  >
                    {/* Image Block */}
                    <div className="md:col-span-4 relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/5 border border-slate-200">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 bg-purple-600 text-white text-[10px] font-bold px-3 py-1 rounded-md uppercase tracking-wider">
                        {post.category}
                      </div>
                    </div>

                    {/* Metadata Content */}
                    <div className="md:col-span-8 space-y-4">
                      <div className="flex flex-wrap gap-4 text-xs text-slate-500 font-medium items-center">
                        <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
                        <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
                      </div>

                      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
                        <Link href={`/blog/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h2>

                      <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                        {post.excerpt}
                      </p>

                      <div className="pt-2">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-600 hover:text-purple-700 transition-all"
                        >
                          Read Article <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>

            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
