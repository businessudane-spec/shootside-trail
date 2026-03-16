"use client";

import { Instagram, Linkedin, MessageCircle, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden text-white w-full"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      {/* Google Font + Animations */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;900&display=swap');

        // .animated-bg {
        //   background: radial-gradient(circle at 20% 30%, #a855f7 0%, #7B00FF 40%, #5f00cc 100%);
        // }

        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0.65;
          animation: float 22s ease-in-out infinite;
          mix-blend-mode: screen;
          pointer-events:none;
        }

        .blob2 { animation-delay: 8s; }
        .blob3 { animation-delay: 4s; }

        @keyframes float {
          0%   { transform: translate(0px, 0px) scale(1); }
          25%  { transform: translate(140px, -90px) scale(1.25); }
          50%  { transform: translate(-120px, 70px) scale(0.9); }
          75%  { transform: translate(80px, 120px) scale(1.15); }
          100% { transform: translate(0px, 0px) scale(1); }
        }

        .footer-link {
          color: white;
          text-decoration: none;
          font-weight: 500;
          font-size: 15px;
          transition: opacity 0.2s;
        }

        .footer-link:hover {
          opacity: 0.75;
        }

        .social-icon {
          color: white;
          transition: transform 0.25s ease, opacity 0.25s ease;
        }

        .social-icon:hover {
          transform: translateY(-4px) scale(1.1);
          opacity: 0.9;
        }
      `}</style>

      {/* Background */}
      <div className="animated-bg absolute inset-0 -z-20"></div>

      {/* Floating Blobs */}
      <div
        className="blob"
        style={{
          width: 550,
          height: 550,
          top: "-200px",
          left: "-200px",
        }}
      />

      <div
        className="blob blob2"
        style={{
          width: 450,
          height: 450,
          background: "#ff66ff",
          bottom: "-150px",
          right: "-150px",
        }}
      />

      <div
        className="blob blob3"
        style={{
          width: 380,
          height: 380,
          background: "#9d00ff",
          top: "40%",
          left: "55%",
        }}
      />

      {/* CONTENT */}
      <div className="relative z-10">

        {/* Brand */}
        <div className="pt-16 px-[clamp(30px,6vw,90px)]">
          <h1
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
        </div>

        {/* Main Grid */}
        <div
          className="py-14 grid gap-12"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            paddingLeft: "clamp(30px, 6vw, 90px)",
            paddingRight: "clamp(30px, 6vw, 90px)",
          }}
        >
          {/* Pages */}
          <div>
            <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 22 }}>
              Pages
            </p>
            <nav className="flex flex-col gap-3">
              <a href="/" className="footer-link">Home</a>
              <a href="/services" className="footer-link">Services</a>
              <a href="/portfolio" className="footer-link">Our Work</a>
              <a href="/contact" className="footer-link">Contact</a>
            </nav>
          </div>

          {/* Services */}
          <div>
            <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 22 }}>
              Our Works
            </p>
            <nav className="flex flex-col gap-3">
              <a href="#" className="footer-link">Branding</a>
              <a href="#" className="footer-link">Creative Posters</a>
              <a href="#" className="footer-link">Motion Creatives</a>
              <a href="#" className="footer-link">Web Design</a>
              <a href="#" className="footer-link">Marketing</a>
            </nav>
          </div>

          {/* Address */}
          <div>
            <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 22 }}>
              Office Address
            </p>

            <address style={{ fontStyle: "normal", lineHeight: 1.9 }}>
              Hilite Business Park,<br />
              Ground Floor,<br />
              Kozhikode, Kerala
            </address>

            <p style={{ marginTop: 18, fontWeight: 600 }}>
              Support: +91 73061 66866
            </p>

            <p style={{ marginTop: 8 }}>
              Email: connect.shootside@gmail.com
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="flex flex-col items-center gap-6 pb-10 pt-6"
          style={{ borderTop: "1px solid rgba(255,255,255,0.25)" }}
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

          <p style={{ fontSize: 14, opacity: 0.95 }}>
            © 2026 ShootSide. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}