"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import MentoringSection from "@/components/MentoringSection";

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
/* ---------- TIMELINE ---------- */

const textOpacity = useTransform(
  scrollYProgress,
  [0,0.15,0.25],
  [0,1,0]
);
const centerVisible = useTransform(
  scrollYProgress,
  [0.25,0.35],
  [0,1]
);

const spreadOpacity = useTransform(
  scrollYProgress,
  [0.45,0.55],
  [0,1]
);

const spread = useTransform(
  scrollYProgress,
  [0.5,0.7],
  [0,200]
);

const flip = useTransform(
  scrollYProgress,
  [0.65,0.75],
  [0,180]
);

const fadeImages = useTransform(
  scrollYProgress,
  [0.8,0.9],
  [1,0]
);

const finalText = useTransform(
  scrollYProgress,
  [0.9,1],
  [0,1]
);
const x1 = useTransform(spread, v => v * -1)
const y1 = useTransform(spread, v => v * -1)

const x2 = useTransform(spread, v => v * 1)
const y2 = useTransform(spread, v => v * -1)

const x3 = useTransform(spread, v => v * -1)
const y3 = useTransform(spread, v => v * 1)

const x4 = useTransform(spread, v => v * 1)
const y4 = useTransform(spread, v => v * 1)
  return (
<main className="min-h-screen bg-black">

{/* HERO */}<section className="relative w-full min-h-[600px] md:h-[600px] overflow-hidden flex items-center">

  {/* CONTAINER */}
  <div className="relative w-full max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">

    {/* GRADIENT */}
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none"></div>

    {/* TEXT */}
    <div className="relative md:absolute md:left-0 top-1/2 md:-translate-y-1/2 max-w-sm md:max-w-md z-20">

      <p className="text-white tracking-widest text-sm mb-4">
        MEET
      </p>

      <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-[#ad46ff]">
        SHOOTSIDE
      </h1>

      <p className="text-gray-300 mt-4 md:mt-6 text-sm md:text-base leading-relaxed">
        We empower creative talent through cinematic storytelling,
        digital production and modern visual technology.
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
{/* EXPERTS SECTION */}
<section ref={ref} className="relative h-[260vh] bg-black text-white">
    <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden [perspective:1000px]">

    {/* FIRST TEXT */}
    <motion.div style={{ opacity: textOpacity }} className="text-center mb-16">
     <h2 className="text-5xl font-bold text-white">GUIDED BY</h2>
<h2 className="text-6xl font-extrabold text-white">CREATIVE</h2>
<h2 className="text-5xl font-bold text-white">EXPERTS</h2>
    </motion.div>

    {/* CENTER IMAGE */}
    <motion.img
      src="/images/shootside-center.jpeg"
      initial={{ opacity: 0 }}
      className="absolute w-44 h-44 rounded-xl object-cover"
      style={{ opacity: centerVisible }}
    />

    {/* ANI */}
    <motion.div
      className="absolute w-36 h-36"
      style={{
        rotateY: flip,
        x: x1,
        y: y1,
        opacity: spreadOpacity,
        transformStyle: "preserve-3d"
      }}
    >
      <img
        src="/images/ani.jpeg"
        className="absolute inset-0 w-full h-full object-cover rounded-xl"
        style={{ backfaceVisibility: "hidden" }}
      />
      <img
        src="/images/ani-a.jpeg"
        className="absolute inset-0 w-full h-full object-cover rounded-xl"
        style={{
          transform: "rotateY(180deg)",
          backfaceVisibility: "hidden"
        }}
      />
    </motion.div>

    {/* KAR */}
    <motion.div
      className="absolute w-36 h-36"
      style={{
        rotateY: flip,
        x: x2,
        y: y2,
        opacity: spreadOpacity,
        transformStyle: "preserve-3d"
      }}
    >
      <img
        src="/images/kar.jpeg"
        className="absolute inset-0 w-full h-full object-cover rounded-xl"
        style={{ backfaceVisibility: "hidden" }}
      />
      <img
        src="/images/kar-a.jpeg"
        className="absolute inset-0 w-full h-full object-cover rounded-xl"
        style={{
          transform: "rotateY(180deg)",
          backfaceVisibility: "hidden"
        }}
      />
    </motion.div>

    {/* SAN */}
    <motion.div
      className="absolute w-36 h-36"
      style={{
        rotateY: flip,
        x: x3,
        y: y3,
        opacity: spreadOpacity,
        transformStyle: "preserve-3d"
      }}
    >
      <img
        src="/images/san.jpeg"
        className="absolute inset-0 w-full h-full object-cover rounded-xl"
        style={{ backfaceVisibility: "hidden" }}
      />
      <img
        src="/images/san-a.jpeg"
        className="absolute inset-0 w-full h-full object-cover rounded-xl"
        style={{
          transform: "rotateY(180deg)",
          backfaceVisibility: "hidden"
        }}
      />
    </motion.div>

    {/* SUJ */}
    <motion.div
      className="absolute w-36 h-36"
      style={{
        rotateY: flip,
        x: x4,
        y: y4,
        opacity: spreadOpacity,
        transformStyle: "preserve-3d"
      }}
    >
      <img
        src="/images/suj.jpeg"
        className="absolute inset-0 w-full h-full object-cover rounded-xl"
        style={{ backfaceVisibility: "hidden" }}
      />
      <img
        src="/images/suj-a.jpeg"
        className="absolute inset-0 w-full h-full object-cover rounded-xl"
        style={{
          transform: "rotateY(180deg)",
          backfaceVisibility: "hidden"
        }}
      />
    </motion.div>

    {/* FINAL TEXT (optional placeholder) */}
    <motion.div
      style={{ opacity: finalText }}
      className="absolute text-center"
    />

  </div>
</section>
<MentoringSection />
</main>
);
}