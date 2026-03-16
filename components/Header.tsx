"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {

  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-transparent">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* LOGO */}
          <Link href="/" className="flex items-center">
            <Image
              src="/shootside-logos.png"
              alt="Shootside Logo"
              width={220}
              height={80}
              className="h-14 w-auto"
              priority
            />
          </Link>

          {/* HAMBURGER */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col gap-[6px] z-50"
          >
            <span
              className={`block h-[2px] w-7 bg-white transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-[8px]" : ""
              }`}
            />
            <span
              className={`block h-[2px] w-7 bg-white transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-[2px] w-7 bg-white transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-[8px]" : ""
              }`}
            />
          </button>

        </div>
      </header>

      {/* FULLSCREEN MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40 flex items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-10">

              {menuItems.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                >
                  <Link
                    href={item.link}
                    onClick={() => setMenuOpen(false)}
                    className="text-4xl font-semibold text-white hover:text-purple-500 transition"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}

              <motion.a
                href="https://wa.me/917306166866"
                target="_blank"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-10 px-6 py-3 rounded-full bg-purple-600 text-white text-sm hover:bg-purple-700"
              >
                Contact
              </motion.a>

            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}