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
          <a
  href="/shootside.vcf"
  download="Shootside.vcf"
  className="fixed bottom-6 right-6 bg-white text-black w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:shadow-xl hover:scale-105 transition"
  title="Add to Contacts"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-7 h-7"
  >
    <path d="M15 14c2.67 0 8 1.34 8 4v2h-8v-2c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v2H0v-2c0-2.66 5.33-4 8-4h7zm-3-2c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4zm7-5h-2V5h-2V3h2V1h2v2h2v2h-2v2z"/>
  </svg>
</a>


        </div>
      </div>
    </AuroraBackground>
  );
}
