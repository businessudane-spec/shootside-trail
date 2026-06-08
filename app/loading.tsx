"use client";
import React from "react";
import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white">
      {/* Decorative Background Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse"></div>
      </div>

      <div className="relative flex flex-col items-center gap-6">
        {/* Animated Brand Logo/Text */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: [0.4, 1, 0.4], scale: [0.95, 1, 0.95] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-4xl md:text-5xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-300 to-white"
        >
          SHOOTSIDE
        </motion.h1>

        {/* Custom Premium Loader */}
        <div className="relative w-16 h-16">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
            className="w-full h-full rounded-full border-t-2 border-r-2 border-purple-500 border-l-transparent border-b-transparent"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-2 rounded-full border-b-2 border-l-2 border-white border-t-transparent border-r-transparent opacity-80"
          />
        </div>

        {/* Loading text with animated dots */}
        <div className="flex items-center gap-1 text-sm font-medium text-purple-300/80 tracking-wide mt-2">
          <span>Loading</span>
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
          >
            .
          </motion.span>
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
          >
            .
          </motion.span>
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
          >
            .
          </motion.span>
        </div>
      </div>
    </div>
  );
}
