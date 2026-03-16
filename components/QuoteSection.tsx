"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const testimonials = [
  {
    name: "Developer Sujith",
    role: "FULL STACK DEVELOPER",
    quote:
      "Building meaningful digital experiences is not just about writing code — it’s about shaping how people interact with ideas.",
    image: "/images/IMG_0409-removebg-preview.png",
  },
  {
    name: "Anirudh",
    role: "UI DESIGNER",
    quote:
      "Design is not decoration. It is the language through which ideas become experiences.",
    image: "/images/IMG_0410-removebg-preview.png",
  },
  {
    name: "Kathink",
    role: "PRODUCT STRATEGIST",
    quote:
      "Every product should solve a real problem. Strategy connects ideas with impact.",
    image: "/images/IMG_0411-removebg-preview.png",
  },
  {
    name: "Sanath",
    role: "CREATIVE DEVELOPER",
    quote:
      "Motion and interaction turn static websites into living experiences.",
    image: "/images/IMG_0414-removebg-preview.png",
  },
  {
    name: "Akshay",
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
    <section className="w-full bg-black py-16">

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-12 items-center">

        {/* LEFT QUOTE */}
        <div key={index} className="md:col-span-3 quote-animate max-w-3xl">

          <blockquote
            className="font-light text-white leading-tight md:leading-snug break-words"
            style={{ fontSize: "clamp(1.3rem, 3.5vw, 2.8rem)" }}
          >
            “{item.quote}”
          </blockquote>

          <div className="mt-10">
            <p className="text-white font-semibold text-lg">{item.name}</p>
            <p className="text-gray-400 text-sm tracking-widest uppercase">
              {item.role}
            </p>
          </div>

        </div>

        {/* RIGHT IMAGE */}
        <div key={item.image} className="md:col-span-2 quote-animate flex justify-center">

          <Image
            src={item.image}
            alt={item.name}
            width={600}
            height={600}
            className="w-full max-w-[420px] md:max-w-none h-auto md:h-[500px] object-contain rounded-2xl"
          />

        </div>

      </div>

    </section>
  );
}