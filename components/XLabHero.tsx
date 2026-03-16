"use client";

import { useEffect, useState } from "react";

export default function XLabHero() {

  const slides = [
  {
    number: "01",
    title: "Review",
    image: "/images/per1.png",
    text1: "",
    text2: "",
    testimonial:
      "Working with Shootside helped us elevate our digital storytelling. From content strategy to visual execution, the team delivered creative solutions that aligned perfectly with Hyundai's modern brand direction.",
    client: "HYUNDAI"
  },
  {
    number: "02",
    title: "Review",
    image: "/images/per2.png",
    text1: "",
    text2: "",
    testimonial:
      "Shootside transformed how we present our brand online. Their approach to website design and content production brought clarity, professionalism, and a strong digital presence to LawSqaure.",
    client: "LAWSQAURE"
  },
  {
    number: "03",
    title: "Review",
    image: "/images/per3.png",
    text1: "",
    text2: "",
    testimonial:
      "The Shootside team delivered high-quality visuals and strategic digital support that helped Zenato communicate its brand story more effectively across web and social platforms.",
    client: "ZENATO"
  }
];

  const [active, setActive] = useState(0);

  const nextSlide = () => {
    setActive((prev) => (prev + 1) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full bg-black font-[Inter] flex justify-center">

      <div className="relative w-full max-w-[1280px] h-screen overflow-hidden">

        {slides.map((slide, index) => {

          const isActive = index === active;

          return (

            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >

              {/* RIGHT PERSON IMAGE */}
              <div className="absolute right-0 bottom-0 h-full flex items-end">

                <div className="relative h-[95%] flex items-end">

                  <img
                    src={slide.image}
                    alt="model"
                    className="h-full object-contain"
                  />

                  {/* TESTIMONIAL */}
                  <div className="absolute left-[-200px] right-0 top-1/2 -translate-y-1/2 bg-purple-600/50 backdrop-blur-sm px-10 py-8">

                    <p className="text-white text-[14px] leading-relaxed max-w-[420px]">
                      {slide.testimonial}
                    </p>

                    <span className="block mt-3 text-white/80 text-[11px] uppercase tracking-widest">
— {slide.client}                    </span>

                  </div>

                </div>

              </div>


              {/* BIG LAB TEXT */}
              <div className="absolute left-[28px] top-[90px] select-none">

                <h1
                  className="leading-none tracking-[-0.04em] text-[#ad46ff]"
                  style={{
                    fontFamily: "Barlow Condensed",
                    fontWeight: 900,
                    fontSize: "clamp(130px,18vw,230px)"
                  }}
                >
                  {slide.title}
                </h1>

              </div>


              {/* VERTICAL NUMBER */}
              <div className="absolute left-[40px] top-[62%] select-none">

                <span
                  className="block text-white rotate-[-90deg]"
                  style={{
                    fontFamily: "Barlow Condensed",
                    fontWeight: 900,
                    fontSize: "150px",
                    letterSpacing: "-0.03em",
                    opacity: 0.9
                  }}
                >
                  {slide.number}
                </span>

              </div>


              {/* RIGHT VERTICAL TEXT */}
            <div
  className="absolute right-[18px] top-1/2 -translate-y-1/2 text-[9px] font-bold tracking-[0.18em] uppercase text-white"
  style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
>
  SHOOTSIDE CLIENT REVIEWS 2026
</div>

            </div>
          );

        })}


        {/* ARROW BUTTON */}
        <div
          onClick={nextSlide}
          className="absolute bottom-0 left-[calc(47%-52px)] w-[52px] h-[52px] bg-[#ad46ff] flex items-center justify-center cursor-pointer hover:bg-purple-600 z-20"
        >

          <svg
            viewBox="0 0 24 24"
            className="w-[18px] h-[18px] stroke-white"
            fill="none"
            strokeWidth="2"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>

        </div>

      </div>

    </section>
  );
}