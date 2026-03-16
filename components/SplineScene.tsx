"use client";

import Script from "next/script";
import { useState } from "react";

export default function SplineScene() {
  const [loaded, setLoaded] = useState(false);

  return (
    <section className="relative w-full min-h-[800px] bg-[#0f0f0f] overflow-hidden">

      {/* Load Spline viewer */}
      <Script
        type="module"
        src="https://unpkg.com/@splinetool/viewer@1.12.67/build/spline-viewer.js"
        strategy="afterInteractive"
        onLoad={() => setLoaded(true)}
      />

      {/* Spline background (desktop only) */}
      <div className="absolute inset-0 hidden md:flex items-center justify-center">
        {loaded && (
          // @ts-ignore
          <spline-viewer
            url="https://prod.spline.design/gOLQUW9hesA801rg/scene.splinecode"
            style={{ width: "100%", height: "100%" }}
          />
        )}
      </div>

      {/* Overlay content */}
<div className="relative z-10 max-w-[1200px] mx-auto px-8 md:px-16 xl:px-24 h-full flex items-start pt-24 pointer-events-auto">
        {/* Desktop = grid | Mobile = stacked */}
        <div className="flex flex-col md:grid md:grid-cols-3 w-full items-center gap-16">

          {/* LEFT SERVICES */}
          <div className="space-y-16 md:space-y-24 text-left md:text-right text-white">

            <div className="max-w-[420px] ml-0 md:ml-auto group cursor-pointer transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-3xl md:text-5xl xl:text-6xl font-black uppercase leading-none tracking-tight transition-colors duration-300 group-hover:text-[#ad46ff]">
                WEB EXPERIENCE
              </h3>
              <p className="text-sm text-gray-400 mt-3 transition-colors duration-300 group-hover:text-gray-200">
                We design and develop modern websites and digital platforms that combine
                performance, storytelling, and immersive user experience.
              </p>
            </div>

            <div className="max-w-[420px] ml-0 md:ml-auto group cursor-pointer transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-3xl md:text-5xl xl:text-6xl font-black uppercase leading-none tracking-tight transition-colors duration-300 group-hover:text-[#ad46ff]">
                AI CONTENT
              </h3>
              <p className="text-sm text-gray-400 mt-3 transition-colors duration-300 group-hover:text-gray-200">
                From AI-assisted writing to automated content pipelines, we help brands
                produce scalable and intelligent digital content.
              </p>
            </div>

            <div className="max-w-[420px] ml-0 md:ml-auto group cursor-pointer transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-3xl md:text-5xl xl:text-6xl font-black uppercase leading-none tracking-tight transition-colors duration-300 group-hover:text-[#ad46ff]">
                VIDEO PRODUCTION
              </h3>
              <p className="text-sm text-gray-400 mt-3 transition-colors duration-300 group-hover:text-gray-200">
                Cinematic videos, promotional reels, and AI-enhanced storytelling designed
                to capture attention across modern digital platforms.
              </p>
            </div>

          </div>

          {/* CENTER SPACE (keeps spline centered on desktop) */}
          <div className="hidden md:block"></div>

          {/* RIGHT SERVICES */}
          <div className="space-y-16 md:space-y-24 text-left text-white">

            <div className="max-w-[420px] group cursor-pointer transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-3xl md:text-5xl xl:text-6xl font-black uppercase leading-none tracking-tight transition-colors duration-300 group-hover:text-[#ad46ff]">
                SOCIAL MEDIA
              </h3>
              <p className="text-sm text-gray-400 mt-3 transition-colors duration-300 group-hover:text-gray-200">
                Strategy, content creation, and performance campaigns built to grow
                audiences and build meaningful engagement online.
              </p>
            </div>

            <div className="max-w-[420px] group cursor-pointer transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-3xl md:text-5xl xl:text-6xl font-black uppercase leading-none tracking-tight transition-colors duration-300 group-hover:text-[#ad46ff]">
                WORKFLOW
              </h3>
              <p className="text-sm text-gray-400 mt-3 transition-colors duration-300 group-hover:text-gray-200">
                Smart automation systems that streamline marketing, content publishing,
                and digital workflows for modern businesses.
              </p>
            </div>

            <div className="max-w-[420px] group cursor-pointer transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-3xl md:text-5xl xl:text-6xl font-black uppercase leading-none tracking-tight transition-colors duration-300 group-hover:text-[#ad46ff]">
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