"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import MentoringSection from "@/components/MentoringSection";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Cpu, Shield, Video, MessageSquare, Globe, Cloud, CheckCircle2 } from "lucide-react";

export default function AboutPage() {
  const images = [
    "/images/WhatsApp Image 2026-03-13 at 9.15.10 PM (1).jpeg",
    "/images/WhatsApp Image 2026-03-13 at 9.15.10 PM.jpeg",
    "/images/WhatsApp Image 2026-03-13 at 9.15.11 PM.jpeg",
    "/images/WhatsApp Image 2026-03-13 at 9.15.12 PM.jpeg",
    "/images/WhatsApp Image 2026-03-13 at 9.15.13 PM.jpeg",
    "/images/1.jpeg",
    "/images/2.jpeg",
    "/images/3.jpeg",
    "/images/4.jpeg",
    "/images/5.jpeg",
    "/images/6.jpeg",
    "/images/7.jpeg",
    "/images/8.jpeg",
    "/images/9.jpeg",
    "/images/10.jpeg",
    "/images/11.jpeg",
    "/images/12.jpeg",
  ];

  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  /* ---------- TIMELINE ---------- */
  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.25],
    [0, 1, 0]
  );
  
  const centerVisible = useTransform(
    scrollYProgress,
    [0.25, 0.35],
    [0, 1]
  );

  const spreadOpacity = useTransform(
    scrollYProgress,
    [0.45, 0.55],
    [0, 1]
  );

  // Scaled spread bounding limit to prevent mobile overflow
  const spread = useTransform(
    scrollYProgress,
    [0.5, 0.7],
    [0, 130] // Reduced from 200 to keep within bounds on smaller screens
  );

  const flip = useTransform(
    scrollYProgress,
    [0.65, 0.75],
    [0, 180]
  );

  const x1 = useTransform(spread, (v) => v * 1.1);
  const y1 = useTransform(spread, (v) => v * 0);

  const x2 = useTransform(spread, (v) => v * 0.55);
  const y2 = useTransform(spread, (v) => v * -0.9);

  const x3 = useTransform(spread, (v) => v * -0.55);
  const y3 = useTransform(spread, (v) => v * -0.9);

  const x4 = useTransform(spread, (v) => v * -1.1);
  const y4 = useTransform(spread, (v) => v * 0);

  const x5 = useTransform(spread, (v) => v * -0.55);
  const y5 = useTransform(spread, (v) => v * 0.9);

  const x6 = useTransform(spread, (v) => v * 0.55);
  const y6 = useTransform(spread, (v) => v * 0.9);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-black">
        
        {/* HERO */}
        <section className="relative w-full min-h-[600px] md:h-[600px] overflow-hidden flex items-center">
          <div className="relative w-full max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />

            {/* TEXT */}
            <div className="relative md:absolute md:left-0 top-1/2 md:-translate-y-1/2 max-w-sm md:max-w-md z-20">
              <p className="text-white tracking-widest text-sm mb-4">
                MEET
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-[#ad46ff]">
                SHOOTSIDE
              </h1>
              <p className="text-gray-300 mt-4 md:mt-6 text-sm md:text-base leading-relaxed">
                We deliver end-to-end technology solutions, advanced AI/ML automation,
                cinematic video products, and digital advisory for businesses across India and the GCC.
              </p>
            </div>

            {/* MOVING COLUMNS */}
            <div className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 gap-6 z-10">
              {/* COLUMN 1 */}
              <div className="flex flex-col gap-6 animate-scrollSlow">
                {[...images, ...images].map((src, i) => (
                  <img key={i} src={src} className="w-40 h-64 object-cover rounded-2xl" />
                ))}
              </div>

              {/* COLUMN 2 */}
              <div className="flex flex-col gap-6 animate-scrollMedium">
                {[...images, ...images].map((src, i) => (
                  <img key={i} src={src} className="w-32 md:w-40 h-48 md:h-64 object-cover rounded-2xl" />
                ))}
              </div>

              {/* COLUMN 3 */}
              <div className="flex flex-col gap-6 animate-scrollFast">
                {[...images, ...images].map((src, i) => (
                  <img key={i} src={src} className="w-40 h-64 object-cover rounded-2xl" />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* MOBILE IMAGE SECTION */}
        <section className="md:hidden bg-black py-6 overflow-hidden">
          <div className="marquee-wrapper overflow-x-auto no-scrollbar">
            <div className="flex gap-4 w-max animate-marquee px-4">
              {[...images, ...images].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  className="w-32 h-44 object-cover rounded-2xl flex-shrink-0"
                />
              ))}
            </div>
          </div>
        </section>

        <section className="w-full bg-white overflow-hidden py-4">
          <div className="whitespace-nowrap flex gap-8 md:gap-12 text-[#ad46ff] font-semibold text-xs md:text-sm animate-marquee px-4 md:px-6">
            <span>AI VIDEO</span>
            <span>WEB DEVELOPMENT</span>
            <span>APP DEVELOPMENT</span>
            <span>CONTENT MARKETING</span>
            <span>CONTENT CREATION</span>
            <span>POSTER DESIGN</span>
            <span>VIDEO EDITING</span>
            <span>AI VIDEO AUTOMATION</span>
            
            <span>AI VIDEO</span>
            <span>WEB DEVELOPMENT</span>
            <span>APP DEVELOPMENT</span>
            <span>CONTENT MARKETING</span>
            <span>CONTENT CREATION</span>
            <span>POSTER DESIGN</span>
            <span>VIDEO EDITING</span>
            <span>AI VIDEO AUTOMATION</span>
          </div>
        </section>

        {/* EXPERTS SECTION */}
        <section ref={ref} className="relative h-[260vh] bg-black text-white">
          <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden [perspective:1000px]">

            {/* FIRST TEXT */}
            <motion.div style={{ opacity: textOpacity }} className="text-center mb-16 z-20">
              <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-wider">GUIDED BY</h2>
              <h2 className="text-5xl sm:text-6xl font-extrabold text-[#ad46ff] my-1">CREATIVE</h2>
              <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-wider">EXPERTS</h2>
            </motion.div>

            {/* CENTER LOGO IMAGE */}
            <motion.img
              src="/images/shootside-center.jpeg"
              initial={{ opacity: 0 }}
              className="absolute w-24 h-24 md:w-40 md:h-40 rounded-2xl object-cover shadow-2xl border border-white/10 z-10"
              style={{ opacity: centerVisible }}
            />

            {/* Image 1: AI Automation (0 deg) */}
            <motion.div
              className="absolute w-20 h-20 md:w-32 md:h-32 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex flex-col items-center justify-center text-purple-400 p-2 shadow-xl backdrop-blur-md"
              style={{
                x: x1,
                y: y1,
                opacity: spreadOpacity,
              }}
            >
              <Cpu className="w-8 h-8 md:w-12 md:h-12 mb-1" />
              <span className="text-[9px] md:text-[11px] font-bold text-gray-300 text-center uppercase tracking-wider">AI Automation</span>
            </motion.div>

            {/* Image 2: Cyber Security (60 deg) */}
            <motion.div
              className="absolute w-20 h-20 md:w-32 md:h-32 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex flex-col items-center justify-center text-emerald-400 p-2 shadow-xl backdrop-blur-md"
              style={{
                x: x2,
                y: y2,
                opacity: spreadOpacity,
              }}
            >
              <Shield className="w-8 h-8 md:w-12 md:h-12 mb-1" />
              <span className="text-[9px] md:text-[11px] font-bold text-gray-300 text-center uppercase tracking-wider">Cyber Security</span>
            </motion.div>

            {/* Image 3: AI Video (120 deg) */}
            <motion.div
              className="absolute w-20 h-20 md:w-32 md:h-32 rounded-2xl bg-red-500/10 border border-red-500/30 flex flex-col items-center justify-center text-red-400 p-2 shadow-xl backdrop-blur-md"
              style={{
                x: x3,
                y: y3,
                opacity: spreadOpacity,
              }}
            >
              <Video className="w-8 h-8 md:w-12 md:h-12 mb-1" />
              <span className="text-[9px] md:text-[11px] font-bold text-gray-300 text-center uppercase tracking-wider">AI Video Ads</span>
            </motion.div>

            {/* Image 4: Web Development (180 deg) */}
            <motion.div
              className="absolute w-20 h-20 md:w-32 md:h-32 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex flex-col items-center justify-center text-blue-400 p-2 shadow-xl backdrop-blur-md"
              style={{
                x: x4,
                y: y4,
                opacity: spreadOpacity,
              }}
            >
              <Globe className="w-8 h-8 md:w-12 md:h-12 mb-1" />
              <span className="text-[9px] md:text-[11px] font-bold text-gray-300 text-center uppercase tracking-wider">Web Dev</span>
            </motion.div>

            {/* Image 5: Social Media (240 deg) */}
            <motion.div
              className="absolute w-20 h-20 md:w-32 md:h-32 rounded-2xl bg-pink-500/10 border border-pink-500/30 flex flex-col items-center justify-center text-pink-400 p-2 shadow-xl backdrop-blur-md"
              style={{
                x: x5,
                y: y5,
                opacity: spreadOpacity,
              }}
            >
              <MessageSquare className="w-8 h-8 md:w-12 md:h-12 mb-1" />
              <span className="text-[9px] md:text-[11px] font-bold text-gray-300 text-center uppercase tracking-wider">Social Growth</span>
            </motion.div>

            {/* Image 6: Cloud Services (300 deg) */}
            <motion.div
              className="absolute w-20 h-20 md:w-32 md:h-32 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex flex-col items-center justify-center text-cyan-400 p-2 shadow-xl backdrop-blur-md"
              style={{
                x: x6,
                y: y6,
                opacity: spreadOpacity,
              }}
            >
              <Cloud className="w-8 h-8 md:w-12 md:h-12 mb-1" />
              <span className="text-[9px] md:text-[11px] font-bold text-gray-300 text-center uppercase tracking-wider">Cloud Systems</span>
            </motion.div>

          </div>
        </section>
        <MentoringSection />
      </main>
      <Footer />
    </>
  );
}