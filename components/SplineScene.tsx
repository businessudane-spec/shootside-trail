"use client";

export default function SplineScene() {
  return (
    <section id="services" className="relative w-full py-24 bg-white overflow-hidden border-t border-gray-100">

      {/* Overlay content */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-8 md:px-16 xl:px-24 h-full flex items-center pointer-events-auto">
        {/* Desktop = grid | Mobile = stacked */}
        <div className="flex flex-col md:grid md:grid-cols-2 w-full items-center gap-16 md:gap-24">

          {/* LEFT SERVICES */}
          <div className="space-y-16 md:space-y-24 text-left text-slate-950">

            <div className="max-w-[420px] group cursor-pointer transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-3xl md:text-5xl xl:text-6xl font-black uppercase leading-none tracking-tight transition-colors duration-300 group-hover:text-[#ad46ff]">
                WEB EXPERIENCE
              </h3>
              <p className="text-sm text-slate-500 mt-3 transition-colors duration-300 group-hover:text-slate-800">
                We design and develop modern websites and digital platforms that combine
                performance, storytelling, and immersive user experience.
              </p>
            </div>

            <div className="max-w-[420px] group cursor-pointer transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-3xl md:text-5xl xl:text-6xl font-black uppercase leading-none tracking-tight transition-colors duration-300 group-hover:text-[#ad46ff]">
                AI CONTENT
              </h3>
              <p className="text-sm text-slate-500 mt-3 transition-colors duration-300 group-hover:text-slate-800">
                From AI-assisted writing to automated content pipelines, we help brands
                produce scalable and intelligent digital content.
              </p>
            </div>

            <div className="max-w-[420px] group cursor-pointer transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-3xl md:text-5xl xl:text-6xl font-black uppercase leading-none tracking-tight transition-colors duration-300 group-hover:text-[#ad46ff]">
                VIDEO PRODUCTION
              </h3>
              <p className="text-sm text-slate-500 mt-3 transition-colors duration-300 group-hover:text-slate-800">
                Cinematic videos, promotional reels, and AI-enhanced storytelling designed
                to capture attention across modern digital platforms.
              </p>
            </div>

          </div>

          {/* RIGHT SERVICES */}
          <div className="space-y-16 md:space-y-24 text-left text-slate-950">

            <div className="max-w-[420px] group cursor-pointer transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-3xl md:text-5xl xl:text-6xl font-black uppercase leading-none tracking-tight transition-colors duration-300 group-hover:text-[#ad46ff]">
                SOCIAL MEDIA
              </h3>
              <p className="text-sm text-slate-500 mt-3 transition-colors duration-300 group-hover:text-slate-800">
                Strategy, content creation, and performance campaigns built to grow
                audiences and build meaningful engagement online.
              </p>
            </div>

            <div className="max-w-[420px] group cursor-pointer transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-3xl md:text-5xl xl:text-6xl font-black uppercase leading-none tracking-tight transition-colors duration-300 group-hover:text-[#ad46ff]">
                WORKFLOW
              </h3>
              <p className="text-sm text-slate-500 mt-3 transition-colors duration-300 group-hover:text-slate-800">
                Smart automation systems that streamline marketing, content publishing,
                and digital workflows for modern businesses.
              </p>
            </div>

            <div className="max-w-[420px] group cursor-pointer transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-3xl md:text-5xl xl:text-6xl font-black uppercase leading-none tracking-tight transition-colors duration-300 group-hover:text-[#ad46ff]">
                DIGITAL STRATEGY
              </h3>
              <p className="text-sm text-slate-500 mt-3 transition-colors duration-300 group-hover:text-slate-800">
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