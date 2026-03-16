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
    "/images/WhatsApp Image 2026-03-13 at 9.15.14 PM.jpeg",
  ];

  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  /* ---------- TIMELINE ---------- */

  const textOpacity = useTransform(scrollYProgress,[0,0.15],[0,1]);

const centerVisible = useTransform(
  scrollYProgress,
  [0.18,0.28,0.7,0.82],
  [0,1,1,0]
);
  const spreadOpacity = useTransform(scrollYProgress,[0.32,0.45],[0,1]);

  const spread = useTransform(scrollYProgress,[0.35,0.55],[0,220]);

  const flip = useTransform(scrollYProgress,[0.55,0.65],[0,180]);

  const fadeImages = useTransform(scrollYProgress,[0.7,0.82],[1,0]);

  const finalText = useTransform(scrollYProgress,[0.82,0.92],[0,1]);
  const centerFade = useTransform(scrollYProgress,[0.7,0.82],[1,0]);

  return (
<main className="min-h-screen bg-black">

{/* HERO */}
<section className="relative w-full h-[600px] overflow-hidden flex items-center">

<div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none"></div>
<div className="absolute left-20 top-1/2 -translate-y-1/2 max-w-md z-20">

<p className="text-white tracking-widest text-sm mb-4">
MEET
</p>

<h1 className="text-7xl font-bold text-[#ad46ff]">
SHOOTSIDE
</h1>

<p className="text-gray-300 mt-6 text-sm leading-relaxed">
We empower creative talent through cinematic storytelling,
digital production and modern visual technology.
</p>

</div>

{/* MOVING COLUMNS */}
<div className="absolute right-20 top-1/2 -translate-y-1/2 flex gap-6 z-10">

<div className="flex flex-col gap-6 animate-scrollUp">
{[...images,...images].map((src,i)=>(
<img key={i} src={src} className="w-40 h-64 object-cover rounded-2xl" />
))}
</div>

<div className="flex flex-col gap-6 animate-scrollDown">
{[...images,...images].map((src,i)=>(
<img key={i} src={src} className="w-40 h-64 object-cover rounded-2xl" />
))}
</div>

<div className="flex flex-col gap-6 animate-scrollUp">
{[...images,...images].map((src,i)=>(
<img key={i} src={src} className="w-40 h-64 object-cover rounded-2xl" />
))}
</div>

</div>

</section>


{/* CATEGORY STRIP */}
<section className="w-full bg-[#ad46ff] overflow-hidden py-4">

<div className="whitespace-nowrap flex gap-12 text-black font-semibold text-sm animate-marquee px-6">

<span>VIDEO CREATION</span>
<span>VIDEO GAMES</span>
<span>CINEMA</span>
<span>ART</span>
<span>VFX</span>
<span>ANIMATION</span>
<span>AI VIDEO</span>
<span>CONTENT CREATION</span>

<span>VIDEO CREATION</span>
<span>VIDEO GAMES</span>
<span>CINEMA</span>
<span>ART</span>
<span>VFX</span>
<span>ANIMATION</span>
<span>AI VIDEO</span>
<span>CONTENT CREATION</span>

</div>

</section>


{/* EXPERTS SECTION */}
<section ref={ref} className="relative h-[260vh] bg-[#2b0000] text-white">

<div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden [perspective:1000px]">

{/* FIRST TEXT */}
<motion.div style={{opacity:textOpacity}} className="text-center mb-16">

<h2 className="text-5xl font-bold text-orange-400">
GUIDED BY
</h2>

<h2 className="text-6xl font-extrabold text-orange-500">
CREATIVE
</h2>

<h2 className="text-5xl font-bold text-orange-400">
EXPERTS
</h2>

</motion.div>


{/* CENTER IMAGE */}
<motion.img
src="/expert-center.jpg"
className="absolute w-44 h-44 rounded-xl object-cover"
style={{opacity:centerVisible}}
/>


{/* SPREAD IMAGES */}
{[
{src:"/expert1.jpg",dx:-1,dy:-1},
{src:"/expert2.jpg",dx:1,dy:-1},
{src:"/expert3.jpg",dx:-1,dy:1},
{src:"/expert4.jpg",dx:1,dy:1},
].map((img,i)=>(

<motion.img
key={i}
src={img.src}
className="absolute w-36 h-36 rounded-xl object-cover"
style={{
opacity:spreadOpacity,
rotateY:flip,
x:useTransform(spread,v=>v*img.dx),
y:useTransform(spread,v=>v*img.dy),
opacity:fadeImages
}}
/>

))}


{/* FINAL TEXT */}
<motion.div
style={{opacity:finalText}}
className="absolute text-center"
>

<h2 className="text-5xl font-bold text-orange-400">
</h2>

<h2 className="text-6xl font-extrabold text-orange-500">

</h2>

</motion.div>

</div>

</section>

<MentoringSection />
</main>
);
}