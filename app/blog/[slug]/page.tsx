"use client";

import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { blogPosts } from "@/lib/blogData";
import { ArrowLeft, Calendar, Clock, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function getInstagramEmbedUrl(url: string): string {
  const match = url.match(/reel\/([A-Za-z0-9_-]+)/);
  const id = match ? match[1] : "";
  return `https://www.instagram.com/reel/${id}/embed/`;
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;

  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="min-h-screen selection:bg-purple-600/30 selection:text-purple-200">
        
        {/* 1. HERO HEADER (Dark theme background) */}
        <section className="relative pt-36 pb-24 bg-[#030303] text-white overflow-hidden border-b border-white/5">
          {/* Decorative glowing ambient orb */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

          <div className="max-w-4xl mx-auto px-6 relative z-10">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-400 hover:text-purple-300 transition-colors mb-8 group"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" /> Back to Journal
            </Link>

            <span className="block text-xs font-bold uppercase tracking-wider text-purple-500 mb-3">
              {post.category}
            </span>

            <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight leading-tight mb-6">
              {post.title}
            </h1>

            <div className="flex gap-6 text-xs text-gray-400 font-medium items-center mb-6">
              <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
            </div>

            <p className="text-gray-300 text-lg leading-relaxed font-light">
              {post.excerpt}
            </p>
          </div>
        </section>

        {/* 2. ARTICLE CONTENT (Light theme background) */}
        <section className="py-24 bg-white text-slate-900 relative">
          <div className="max-w-3xl mx-auto px-6">
            
            <div className="prose prose-slate max-w-none space-y-6 text-slate-700 text-base sm:text-lg leading-relaxed">
              {post.content.split("\n\n").map((para, i) => {
                if (para.startsWith("# ")) {
                  return <h2 key={i} className="text-3xl font-black uppercase text-slate-950 mt-10 mb-4">{para.replace("# ", "")}</h2>;
                }
                if (para.startsWith("## ")) {
                  return <h3 key={i} className="text-xl font-bold text-slate-950 mt-8 mb-3">{para.replace("## ", "")}</h3>;
                }
                if (para.startsWith("- ")) {
                  return (
                    <ul key={i} className="list-disc pl-6 space-y-2 text-sm sm:text-base">
                      {para.split("\n").map((li, idx) => (
                        <li key={idx}>{li.replace("- ", "")}</li>
                      ))}
                    </ul>
                  );
                }
                return <p key={i} className="text-sm sm:text-base">{para}</p>;
              })}
            </div>

            {/* Render Instagram Embed IF present */}
            {post.instagramEmbed && (
              <div className="mt-14 space-y-4">
                <h3 className="text-lg font-bold text-slate-950">Visual Breakdown Reel</h3>
                <div className="w-full max-w-sm mx-auto border border-slate-200 rounded-2xl overflow-hidden shadow-xl bg-slate-50">
                  <div className="relative w-full" style={{ paddingBottom: "177.78%" /* 9:16 aspect */ }}>
                    <iframe
                      src={getInstagramEmbedUrl(post.instagramEmbed)}
                      className="absolute inset-0 w-full h-full"
                      frameBorder="0"
                      scrolling="no"
                      allowTransparency
                      allowFullScreen
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Tag Badges */}
            <div className="flex flex-wrap gap-2 mt-14 pt-8 border-t border-slate-200">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-semibold px-3 py-1 rounded-md bg-slate-100 text-slate-600 uppercase tracking-wider"
                >
                  #{tag}
                </span>
              ))}
            </div>

          </div>
        </section>

        {/* 3. CALL-TO-ACTION STRIP (Dark theme background) */}
        <section className="py-20 bg-[#050505] text-white border-t border-white/5">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h3 className="text-2xl sm:text-3xl font-black uppercase mb-4">Want to implement these workflows?</h3>
            <p className="text-gray-400 text-sm max-w-lg mx-auto mb-8">
              Work with our visual effects, custom AI engineers, and web development experts in India & the GCC.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-sm uppercase tracking-wider hover:from-blue-500 hover:to-purple-500 transition-all duration-300"
            >
              Book a Scoping Call <ArrowRight className="w-4 h-4 ml-1.5" />
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
