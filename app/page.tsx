"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

import SplineScene from "@/components/SplineScene";
import QuoteSection from "@/components/QuoteSection";
import XLabHero from "@/components/XLabHero";
import Orb from   "@/components/ui/orb";



export default function Home() {
  const titles = [
  [""],
  [""],
  [""],
  [""],
  [""] 
];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % titles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);
const statsRef = useRef(null);
const [startCount, setStartCount] = useState(false);
const [works, setWorks] = useState(0);
const [clients, setClients] = useState(0);

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setStartCount(true);
      }
    },
    { threshold: 0.4 }
  );

  if (statsRef.current) {
    observer.observe(statsRef.current);
  }

  return () => observer.disconnect();
}, []);

useEffect(() => {
  if (!startCount) return;

  let workInterval = setInterval(() => {
    setWorks((prev) => {
      if (prev >= 100) {
        clearInterval(workInterval);
        return 100;
      }
      return prev + 2;
    });
  }, 30);

  let clientInterval = setInterval(() => {
    setClients((prev) => {
      if (prev >= 10) {
        clearInterval(clientInterval);
        return 10;
      }
      return prev + 1;
    });
  }, 150);

  return () => {
    clearInterval(workInterval);
    clearInterval(clientInterval);
  };
}, [startCount]);
  return (
    <main className="bg-black text-white">

      {/* HERO SECTION */}
{/* HERO SECTION */}
<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <Orb
    hoverIntensity={2}
    rotateOnHover
    hue={0}
    forceHoverState={false}
    backgroundColor="#000000"
/>
</div>

      {/* TRUSTED BRANDS */}

      <section className="bg-[#121212] py-8  overflow-hidden">

  <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-[100px] flex flex-col md:flex-row items-center justify-between gap-6 gap-10">

    {/* LEFT TEXT */}
    <div className="text-gray-300 text-sm md:text-base font-medium w-[220px]">
      Trusted brands that <br /> We have helped
    </div>

    {/* RIGHT LOGO SLIDER */}
    <div className="flex-1 overflow-hidden">

  <div className="flex items-center gap-16 animate-brand-slide w-max">

    {/* logos */}
    <img src="/Wattle-White-Text-Logo.svg" className="h-[30px] opacity-90" />
    <img src="/CRIZPO.png" className="h-[30px] opacity-90" />
    <img src="/zenato.png" className="h-[35px] opacity-90" />
    <img src="https://www.myg.in/images/logos/1/site-Logo.png" className="h-[15px] opacity-90" />
    <img src="https://www.hyundai.com/content/dam/hyundai/ww/en/images/main/new/common/logo-wh.png" className="h-[15px] opacity-90" />
    <img src="/alf-removebg-preview.png" className="h-[35px] opacity-90" />
    <img src="/creamount-removebg-preview.png" className="h-[35px] opacity-90" />

    {/* duplicate once */}
    <img src="/Wattle-White-Text-Logo.svg" className="h-[30px] opacity-90" />
    <img src="/CRIZPO.png" className="h-[30px] opacity-90" />
    <img src="/zenato.png" className="h-[35px] opacity-90" />
    <img src="https://www.myg.in/images/logos/1/site-Logo.png" className="h-[15px] opacity-90" />
    <img src="https://www.hyundai.com/content/dam/hyundai/ww/en/images/main/new/common/logo-wh.png" className="h-[15px] opacity-90" />
<img src="/alf-removebg-preview.png" className="h-[35px] opacity-90" />
    <img src="/creamount-removebg-preview.png" className="h-[35px] opacity-90" />
  </div>

</div>

  </div>

</section>
{/* SERVICES TITLE */}
{/* SPLINE SECTION */}

<SplineScene />   
{/* IMAGE GRID */}

<section className="bg-black py-24">
<div className="max-w-[1200px] mx-auto px-8 md:px-16 xl:px-24">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 gap-4">

       <div className="h-[520px] bg-black overflow-hidden rounded-2xl border-2 border-gray-300 flex items-center justify-center">
  <img
    src="/zenato.png"
    alt="zenato Logo"
    className="h-[40%] w-auto object-contain"
  />
</div>

      <div className="h-[520px] overflow-hidden rounded-2xl border-2 border-gray-300">
  <video
  className="w-full h-full object-cover"
  autoPlay
  muted
  loop
  playsInline
>
  <source src="/amg.mp4" type="video/mp4" />
</video>
</div>

       <div className="h-[520px] bg-black overflow-hidden rounded-2xl border-2 border-gray-300 flex items-center justify-center">
  <img
    src="/crizpo.png"
    alt="crizpo Logo"
    className="h-[30%] w-auto object-contain"
  />
</div>

    </div>

  </div>
<div className="max-w-[1200px] mx-auto px-8 md:px-16 xl:px-24 py-[80px]">
  <div
  ref={statsRef}
  className="flex flex-col md:flex-row md:items-center gap-10"
>

  {/* Title */}
  <h3 className="text-5xl md:text-[83px] font-black uppercase leading-none tracking-tight text-white">
    OUR STATS
  </h3>

  {/* Stats */}
  <div className="flex flex-col sm:flex-row gap-10 md:gap-20 md:ml-auto">

    {/* Stat 1 */}
    <div className="flex flex-col items-center md:items-start">
      <span className="text-4xl md:text-6xl font-black text-[#ad46ff]">
        {works}+
      </span>
      <span className="text-gray-400 uppercase tracking-wider text-xs md:text-sm mt-2">
        Works Completed
      </span>
    </div>

    {/* Stat 2 */}
    <div className="flex flex-col items-center md:items-start">
      <span className="text-4xl md:text-6xl font-black text-[#ad46ff]">
        {clients}+
      </span>
      <span className="text-gray-400 uppercase tracking-wider text-xs md:text-sm mt-2">
        Happy Clients
      </span>
    </div>

  </div>

</div>

</div>
<div className="max-w-[1200px] mx-auto px-8 md:px-16 xl:px-24">
    <div className="grid md:grid-cols-3 gap-4">

      <div className="h-[520px] overflow-hidden rounded-2xl border-2 border-gray-300">
        <video
  className="w-full h-full object-cover"
  autoPlay
  muted
  loop
  playsInline
>
  <source src="/hyundai.mp4" type="video/mp4" />
</video>
      </div>
<div className="h-[520px] bg-black overflow-hidden rounded-2xl border-2 border-gray-300 flex items-center justify-center">
  <img
    src="/Wattle-White-Text-Logo.svg"
    alt="Wattlecorp Logo"
    className="h-[30%] w-auto object-contain"
  />
</div>

      <div className="h-[520px] overflow-hidden rounded-2xl border-2 border-gray-300">
        <video
  className="w-full h-full object-cover"
  autoPlay
  muted
  loop
  playsInline
>
  <source src="/myg.mp4" type="video/mp4" />
</video>
      </div>

    </div>

  </div>  
</section>
{/* OUR STATS */}
<section className="w-full bg-black py-[10px]">
<div className="w-full h-[260px] md:h-[400px] relative overflow-hidden border-y border-black">   <video
  className="w-full h-full object-cover"
  autoPlay
  muted
  loop
  playsInline
>
  <source src="/IMG_1418.mp4" type="video/mp4" />
</video>
  </div>
</section>




<QuoteSection /><section className="w-full bg-black py-10 overflow-hidden">

  <div className="marquee-wrapper space-y-6">

    {/* FIRST LINE */}
    <div className="marquee-track text-[36px] sm:text-[70px] md:text-[120px] lg:text-[160px] font-black uppercase leading-none whitespace-nowrap">

      <span className="mx-0 text-white">Discovery</span>
      <span className="mx-0 text-[#ad46ff]">Outreach</span>
      <span className="mx-0 text-white">Negotiation</span>
      <span className="mx-0 text-[#ad46ff]">Creation</span>
      <span className="mx-0 text-white">Management</span>
      <span className="mx-0 text-[#ad46ff]">Collaboration</span>

      {/* duplicate */}
      <span className="mx-0 text-white">Discovery</span>
      <span className="mx-0 text-[#ad46ff]">Outreach</span>
      <span className="mx-0 text-white">Negotiation</span>
      <span className="mx-0 text-[#ad46ff]">Creation</span>
      <span className="mx-0 text-white">Management</span>
      <span className="mx-0 text-[#ad46ff]">Collaboration</span>

    </div>


    {/* SECOND LINE */}
    <div className="marquee-track-reverse text-[36px] sm:text-[70px] md:text-[120px] lg:text-[160px] font-black uppercase leading-none whitespace-nowrap">

      <span className="mx-0 text-[#ad46ff]">Strategy</span>
      <span className="mx-0 text-white">Branding</span>
      <span className="mx-0 text-[#ad46ff]">Production</span>
      <span className="mx-0 text-white">Marketing</span>
      <span className="mx-0 text-[#ad46ff]">Design</span>
      <span className="mx-0 text-white">Innovation</span>

      {/* duplicate */}
      <span className="mx-0 text-[#ad46ff]">Strategy</span>
      <span className="mx-0 text-white">Branding</span>
      <span className="mx-0 text-[#ad46ff]">Production</span>
      <span className="mx-0 text-white">Marketing</span>
      <span className="mx-0 text-[#ad46ff]">Design</span>
      <span className="mx-0 text-white">Innovation</span>

    </div>

  </div>

</section>

<section>
  <XLabHero />
</section>
{/* EXPERIENCE SECTION */}


    </main>
  );
}