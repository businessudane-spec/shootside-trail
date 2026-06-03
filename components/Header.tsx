"use client";

import Image from "next/image";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-center">

        {/* LOGO — centered, no redirect */}
        <Image
          src="/shootside-logos.png"
          alt="Shootside Logo"
          width={220}
          height={80}
          className="h-14 w-auto"
          priority
        />

      </div>
    </header>
  );
}
