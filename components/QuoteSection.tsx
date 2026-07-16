"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const testimonials = [
  {
    role: "FULL STACK DEVELOPER",
    quote:
      "Building meaningful digital experiences is not just about writing code — it’s about shaping how people interact with ideas.",
    image: "/images/IMG_0409-removebg-preview.png",
  },
  {
    role: "UI DESIGNER",
    quote:
      "Design is not decoration. It is the language through which ideas become experiences.",
    image: "/images/IMG_0410-removebg-preview.png",
  },
  {
    role: "PRODUCT STRATEGIST",
    quote:
      "Every product should solve a real problem. Strategy connects ideas with impact.",
    image: "/images/IMG_0411-removebg-preview.png",
  },
  {
    role: "CREATIVE DEVELOPER",
    quote:
      "Motion and interaction turn static websites into living experiences.",
    image: "/images/IMG_0414-removebg-preview.png",
  },
  {
    role: "PROJECT MANAGER",
    quote:
      "Great teams don’t just deliver projects — they build clarity and trust.",
    image: "/images/IMG_0413-removebg-preview.png",
  },
];

export default function QuoteSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const item = testimonials[index];

  return (
    <section className="w-full bg-[#050505] py-20 border-t border-white/5">

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-12 items-center">

        {/* LEFT QUOTE */}
        <div key={index} className="md:col-span-3 quote-animate max-w-xl mx-auto md:mx-0">

          <blockquote
            className="font-light text-white leading-tight md:leading-snug break-words"
            style={{ fontSize: "clamp(1.2rem, 3vw, 2.2rem)" }}
          >
            “{item.quote}”
          </blockquote>

          <div className="mt-8">
            <p className="text-purple-400 font-semibold text-lg tracking-wider uppercase">{item.role}</p>
          </div>

        </div>

        {/* RIGHT IMAGE */}
        <div key={item.image} className="md:col-span-2 quote-animate flex justify-center">

          <Image
            src={item.image}
            alt={item.role}
            width={600}
            height={600}
            className="w-full max-w-[320px] md:max-w-[380px] h-auto object-contain rounded-2xl opacity-80"
          />

        </div>

      </div>

    </section>
  );
}