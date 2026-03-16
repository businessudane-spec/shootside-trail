"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-black/50 border-b border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.4)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-wide text-purple-500"
        >
          SHOOTSIDE
        </Link>

        {/* DESKTOP MENU */}
        <nav className="hidden md:flex items-center gap-10 text-sm text-gray-300">
          <Link
            href="/"
            className="hover:text-white transition"
          >
            Home
          </Link>

          {/* <Link
            href="/about"
            className="hover:text-white transition"
          >
            About
          </Link>

          <Link
            href="/portfolio"
            className="hover:text-white transition"
          >
            Work
          </Link>

          <Link
            href="/services"
            className="hover:text-white transition"
          >
            Services
          </Link> */}
        </nav>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-6">

          {/* CONTACT BUTTON */}
         <a
  href="https://wa.me/917306166866"
  target="_blank"
  rel="noopener noreferrer"
  className="hidden md:inline-block px-5 py-2 rounded-full bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition"
>
  Contact
</a>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-[6px]"
          >
            <span
              className={`block h-[2px] w-6 bg-white transition-all ${
                menuOpen ? "rotate-45 translate-y-[8px]" : ""
              }`}
            />
            <span
              className={`block h-[2px] w-6 bg-white transition-all ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-[2px] w-6 bg-white transition-all ${
                menuOpen ? "-rotate-45 -translate-y-[8px]" : ""
              }`}
            />
          </button>

        </div>

      </div>
    </header>
  );
}