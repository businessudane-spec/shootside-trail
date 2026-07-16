"use client";

import { Instagram, Linkedin, MessageCircle, Mail } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden text-white bg-black border-t border-white/5 w-full"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;900&display=swap');

        .footer-link {
          color: rgba(255,255,255,0.7);
          text-decoration: none;
          font-weight: 500;
          font-size: 14px;
          transition: color 0.2s;
        }

        .footer-link:hover {
          color: #ad46ff;
        }

        .social-icon {
          color: rgba(255,255,255,0.6);
          transition: transform 0.25s ease, color 0.25s ease;
        }

        .social-icon:hover {
          transform: translateY(-4px) scale(1.1);
          color: #ad46ff;
        }
      `}</style>

      {/* CONTENT CONTAINER */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Brand */}
        <div className="pt-16">
          <h1
            className="text-white bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
            style={{
              fontWeight: 900,
              fontSize: "clamp(48px, 9vw, 100px)",
              letterSpacing: "-0.02em",
              lineHeight: 1,
              margin: 0,
            }}
          >
            SHOOTSIDE
          </h1>
          <p className="text-gray-400 mt-2 text-sm max-w-sm">
            Technology That Powers Your Business.
          </p>
        </div>

        {/* Main Grid */}
        <div
          className="py-14 grid gap-12"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          }}
        >
          {/* Quick Links */}
          <div>
            <p className="text-white font-bold" style={{ fontSize: 16, marginBottom: 22 }}>
              Quick Links
            </p>
            <ul className="space-y-3">
              <li><Link href="#home" className="footer-link">Home</Link></li>
              <li><Link href="#about" className="footer-link">About</Link></li>
              <li><Link href="#services" className="footer-link">Services</Link></li>
              <li><Link href="#contact" className="footer-link">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <p className="text-white font-bold" style={{ fontSize: 16, marginBottom: 22 }}>
              Get in Touch
            </p>

            <p style={{ marginTop: 8 }}>
              Email: <a href="mailto:connect.shootside@gmail.com" className="footer-link">connect.shootside@gmail.com</a>
            </p>

            <p style={{ marginTop: 8 }}>
              Phone: <a href="tel:+917306166866" className="footer-link">+91 73061 66866</a>
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="flex flex-col items-center gap-6 pb-10 pt-6"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <div className="flex gap-8">
            <a
              href="https://www.instagram.com/shootside.in/"
              target="_blank"
              className="social-icon"
            >
              <Instagram size={22} />
            </a>

            <a
              href="https://www.linkedin.com/company/shootside-mediacorp"
              target="_blank"
              className="social-icon"
            >
              <Linkedin size={22} />
            </a>

            <a
              href="mailto:connect.shootside@gmail.com"
              className="social-icon"
            >
              <Mail size={22} />
            </a>

            <a
              href="https://wa.me/917306166866"
              target="_blank"
              className="social-icon"
            >
              <MessageCircle size={22} />
            </a>
          </div>


          <p className="text-slate-500" style={{ fontSize: 14 }}>
            © 2026 ShootSide. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}