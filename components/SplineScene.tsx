// components/SplineScene.tsx
"use client";

import Script from "next/script";

export default function SplineScene() {
  return (
    <section className="relative w-full h-[800px] bg-[#0f0f0f] overflow-hidden">

      {/* Load Spline viewer */}
      <Script
        type="module"
        src="https://unpkg.com/@splinetool/viewer@1.12.67/build/spline-viewer.js"
        strategy="afterInteractive"
      />

      {/* Spline background */}
      <div className="absolute inset-0 flex items-center justify-center">
     <div
  className="w-full h-full"
  dangerouslySetInnerHTML={{
    __html: `<spline-viewer url="https://prod.spline.design/gOLQUW9hesA801rg/scene.splinecode" style="width:100%;height:100%;"></spline-viewer>`
  }}
/>
      </div>

      {/* Overlay content */}
      <div className="relative z-10 max-w-7xl mx-auto h-full px-6 flex items-start pt-24 pointer-events-auto">
        <div className="grid grid-cols-3 w-full items-center">
{/* LEFT SERVICES */}
<div className="space-y-24 text-right text-white">

  <div className="max-w-[420px] ml-auto group cursor-pointer transition-all duration-300 hover:-translate-y-1">
    <h3 className="text-4xl md:text-5xl xl:text-6xl font-black uppercase leading-none tracking-tight transition-colors duration-300 group-hover:text-[#ad46ff]">
      WEB EXPERIENCE
    </h3>
    <p className="text-sm text-gray-400 mt-3 transition-colors duration-300 group-hover:text-gray-200">
      We design and develop modern websites and digital platforms that combine
      performance, storytelling, and immersive user experience.
    </p>
  </div>

  <div className="max-w-[420px] ml-auto group cursor-pointer transition-all duration-300 hover:-translate-y-1">
    <h3 className="text-4xl md:text-5xl xl:text-6xl font-black uppercase leading-none tracking-tight transition-colors duration-300 group-hover:text-[#ad46ff]">
      AI CONTENT
    </h3>
    <p className="text-sm text-gray-400 mt-3 transition-colors duration-300 group-hover:text-gray-200">
      From AI-assisted writing to automated content pipelines, we help brands
      produce scalable and intelligent digital content.
    </p>
  </div>

  <div className="max-w-[420px] ml-auto group cursor-pointer transition-all duration-300 hover:-translate-y-1">
    <h3 className="text-4xl md:text-5xl xl:text-6xl font-black uppercase leading-none tracking-tight transition-colors duration-300 group-hover:text-[#ad46ff]">
      VIDEO PRODUCTION
    </h3>
    <p className="text-sm text-gray-400 mt-3 transition-colors duration-300 group-hover:text-gray-200">
      Cinematic videos, promotional reels, and AI-enhanced storytelling designed
      to capture attention across modern digital platforms.
    </p>
  </div>

</div>

          {/* CENTER SPACE */}
          <div></div>
{/* RIGHT SERVICES */}
<div className="space-y-24 text-left text-white">

  <div className="max-w-[420px] group cursor-pointer transition-all duration-300 hover:-translate-y-1">
    <h3 className="text-4xl md:text-5xl xl:text-6xl font-black uppercase leading-none tracking-tight transition-colors duration-300 group-hover:text-[#ad46ff]">
      SOCIAL MEDIA
    </h3>
    <p className="text-sm text-gray-400 mt-3 transition-colors duration-300 group-hover:text-gray-200">
      Strategy, content creation, and performance campaigns built to grow
      audiences and build meaningful engagement online.
    </p>
  </div>

  <div className="max-w-[420px] group cursor-pointer transition-all duration-300 hover:-translate-y-1">
    <h3 className="text-4xl md:text-5xl xl:text-6xl font-black uppercase leading-none tracking-tight transition-colors duration-300 group-hover:text-[#ad46ff]">
      AUTOMATION
    </h3>
    <p className="text-sm text-gray-400 mt-3 transition-colors duration-300 group-hover:text-gray-200">
      Smart automation systems that streamline marketing, content publishing,
      and digital workflows for modern businesses.
    </p>
  </div>

  <div className="max-w-[420px] group cursor-pointer transition-all duration-300 hover:-translate-y-1">
    <h3 className="text-4xl md:text-5xl xl:text-6xl font-black uppercase leading-none tracking-tight transition-colors duration-300 group-hover:text-[#ad46ff]">
      DIGITAL STRATEGY
    </h3>
    <p className="text-sm text-gray-400 mt-3 transition-colors duration-300 group-hover:text-gray-200">
      We combine technology, design, and data to shape long-term digital growth
      strategies for modern brands.
    </p>
  </div>

</div>

        </div>
      </div>

    </section>
  );
}