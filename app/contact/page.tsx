"use client";

import Image from "next/image";
import { AuroraBackground } from "@/components/ui/aurora-background";

export default function Contact() {
  return (
    <AuroraBackground className="px-4">
      {/* Add z-10 here → brings content above aurora effect */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-md w-full">
        
        <Image
          src="/shootside.jpg"
          alt="Shootside Logo"
          width={120}
          height={120}
          className="rounded-full border border-white shadow-lg mb-4"
        />

        <h1 className="text-3xl font-bold">Shootside & Company</h1>
        <p className="text-purple-300 mt-1">
          Digital Agency | Web Dev + Content Creation
        </p>

        <div className="bg-white text-black w-full p-6 mt-8 rounded-3xl shadow-lg space-y-6">
          
          <div className="grid grid-cols-2 gap-4">
            <a href="tel:+917306166866" className="bg-black text-white py-3 rounded-xl font-medium">
              Call
            </a>

            <a href="mailto:connect.shootside@gmail.com" className="bg-black text-white py-3 rounded-xl font-medium">
              Email
            </a>

            {/* <a
              href="https://maps.app.goo.gl/xxxxxxxx"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black text-white py-3 rounded-xl font-medium"
            >
              Location
            </a> */}
          </div>

          <a
            href="https://instagram.com/shootside.in"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black w-full block text-white py-3 rounded-xl font-medium"
          >
            📸 Follow us on Instagram
          </a>

          <a
            href="https://wa.me/917306166866"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black underline"
          >
            💬 Chat on WhatsApp
          </a>

        </div>
      </div>
    </AuroraBackground>
  );
}
