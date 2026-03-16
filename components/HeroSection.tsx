"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ---------------- CURSOR TRAIL ---------------- */

function CursorTrail({ containerRef }: any) {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    let id = 0;

    const move = (e: MouseEvent) => {
      const rect = containerRef.current.getBoundingClientRect();

      const particle = {
        id: id++,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        color: ["#22d3ee", "#8b5cf6", "#f472b6"][Math.floor(Math.random() * 3)]
      };

      setParticles((prev) => [...prev.slice(-15), particle]);
    };

    const el = containerRef.current;
    if (!el) return;

    el.addEventListener("mousemove", move);
    return () => el.removeEventListener("mousemove", move);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-40">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute w-2 h-2 rounded-full"
            style={{ left: p.x, top: p.y, backgroundColor: p.color }}
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

/* ---------------- CLICK STARS ---------------- */

function ClickStars({ containerRef }: any) {
  const [stars, setStars] = useState<any[]>([]);

  useEffect(() => {
    let id = 0;

    const click = (e: MouseEvent) => {
      const rect = containerRef.current.getBoundingClientRect();

      const newStars = Array.from({ length: 5 }, (_, i) => ({
        id: id++,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        angle: (i / 5) * 360
      }));

      setStars((prev) => [...prev, ...newStars]);

      setTimeout(() => {
        setStars((prev) => prev.filter((s) => !newStars.includes(s)));
      }, 900);
    };

    const el = containerRef.current;
    if (!el) return;

    el.addEventListener("click", click);
    return () => el.removeEventListener("click", click);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-40">
      <AnimatePresence>
        {stars.map((star) => {
          const rad = (star.angle * Math.PI) / 180;

          return (
            <motion.div
              key={star.id}
              className="absolute text-yellow-300"
              style={{ left: star.x, top: star.y }}
              initial={{ scale: 0 }}
              animate={{
                x: Math.cos(rad) * 60,
                y: Math.sin(rad) * 60,
                opacity: 0
              }}
              transition={{ duration: 0.8 }}
            >
              ✨
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

/* ---------------- METEOR ---------------- */

function Meteor({ x, y, color }: any) {
  return (
    <div
      className="absolute"
      style={{
        left: "50%",
        top: "50%",
        transform: `translate(${x}px, ${y}px)`
      }}
    >
      <motion.div
        className="w-3 h-3 rounded-full"
        style={{
          backgroundColor: color,
          boxShadow: `0 0 20px ${color}`
        }}
        animate={{ scale: [1, 1.4, 1] }}
        transition={{
          repeat: Infinity,
          duration: 2.5
        }}
      />
    </div>
  );
}

/* ---------------- METEOR RING ---------------- */

function MeteorRing() {
  const meteorCount = 8;
  const radius = 320;

  const meteors = Array.from({ length: meteorCount }, (_, i) => {
    const angle = (i / meteorCount) * 360;
    const rad = (angle * Math.PI) / 180;

    return {
      id: i,
      x: Math.cos(rad) * radius,
      y: Math.sin(rad) * radius,
      color: i % 3 === 0 ? "#22d3ee" : i % 3 === 1 ? "#8b5cf6" : "#f472b6"
    };
  });

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      animate={{
        rotate: 360,
        scale: [1, 1.05, 1]
      }}
      transition={{
        rotate: {
          repeat: Infinity,
          duration: 26,
          ease: "linear"
        },
        scale: {
          repeat: Infinity,
          duration: 6,
          ease: "easeInOut"
        }
      }}
    >
      <div
        className="relative"
        style={{ width: radius * 2, height: radius * 2 }}
      >
        {meteors.map((m) => (
          <Meteor key={m.id} {...m} />
        ))}
      </div>
    </motion.div>
  );
}

/* ---------------- INTERACTIVE TEXT ---------------- */

function InteractiveText({ text }: any) {
  const letters = text.split("");

  return (
    <div>
      {letters.map((letter: string, i: number) => (
        <motion.span
          key={i}
          className="inline-block text-6xl md:text-8xl lg:text-[10rem] font-bold"
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: i * 0.06,
            duration: 0.7,
            ease: "easeOut"
          }}
          whileHover={{ y: -10 }}
        >
          {letter}
        </motion.span>
      ))}
    </div>
  );
}

/* ---------------- HERO SECTION ---------------- */

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement | null>(null);

  const sentences = [
    "Crafting modern websites that blend design, performance, and storytelling.",
    "Creating AI-powered content, video workflows, and smart automation systems.",
    "Helping brands grow through powerful social media and digital experiences.",
    "Turning ideas into scalable products using web technology, AI, and creativity."
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % sentences.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      <CursorTrail containerRef={heroRef} />
      <ClickStars containerRef={heroRef} />
      <MeteorRing />

      <div className="relative z-20 text-center px-8 max-w-6xl">
        <InteractiveText text="SHOOTSIDE" />

        <div className="h-[70px] mt-6 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              className="text-lg md:text-xl text-zinc-400 max-w-2xl text-center"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              transition={{ duration: 0.6 }}
            >
              {sentences[index]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}