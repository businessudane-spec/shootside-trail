"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─────────────────────────────────────────────
// HELPER — extract reel ID from any IG URL
// e.g. https://www.instagram.com/reel/ABC123xyz/
// ─────────────────────────────────────────────
function getReelEmbedUrl(reelUrl: string): string {
  const match = reelUrl.match(/reel\/([A-Za-z0-9_-]+)/);
  const id = match ? match[1] : "";
  return `https://www.instagram.com/reel/${id}/embed/`;
}

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────
type WorkItem = {
  id: number;
  title: string;
  client: string;
  category: string;
  /** "video" = local/hosted file | "instagram" = IG reel link | "image" = image file */
  type: "video" | "instagram" | "image";
  src: string;          // file path OR full Instagram reel URL
  poster?: string;      // optional thumbnail image for instagram cards
  tag: string;
};

type BTSItem = {
  id: number;
  title: string;
  type: "video" | "instagram" | "image";
  src: string;
  poster?: string;
};

// ─────────────────────────────────────────────
// WORKS
// ─────────────────────────────────────────────
const works: WorkItem[] = [
  {
    id: 8,
    title: "When the debate ends, Football begins",
    client: "FIFA",
    category: "All",
    type: "video",
    src: "/football-debate.mp4",
    tag: "BRAND AD",
  },
  {
    id: 1,
    title: "MYG × Shootside — Brand Film Ad",
    client: "MYG",
    category: "All",
    type: "video",
    src: "/myg institute.mp4",
    tag: "BRAND FILM AD",
  },
  {
    id: 2,
    title: "MYG × Shootside",
    client: "MYG",
    category: "All",
    type: "video",
    src: "/myg 2.mp4",
    tag: "CAMPAIGN",
  },
  {
    id: 3,
    title: "MYG × Shootside — Power Packed",
    client: "MYG",
    category: "All",
    type: "video",
    src: "/myg powerpacked.mp4",
    tag: "POWER PACKED",
  },
  {
    id: 4,
    title: "AMG × Shootside",
    client: "Mercedes-AMG",
    category: "All",
    type: "video",
    src: "/amg x shootside.mp4",
    tag: "BRAND FILM",
  },
  {
    id: 5,
    title: "Hyundai × Shootside — KVR I",
    client: "Hyundai",
    category: "All",
    type: "video",
    src: "/kvr 1.mp4",
    tag: "KVR",
  },
  {
    id: 6,
    title: "Hyundai × Shootside — KVR II",
    client: "Hyundai",
    category: "All",
    type: "video",
    src: "/kvr 2.mp4",
    tag: "KVR",
  },
  {
    id: 7,
    title: "Hyundai × Shootside — KVR III",
    client: "Hyundai",
    category: "All",
    type: "video",
    src: "/kvr 3.mp4",
    tag: "KVR",
  },
];

// ─────────────────────────────────────────────
// BTS
// ─────────────────────────────────────────────
const btsItems: BTSItem[] = [
  {
    id: 6,
    title: "BTS — FIFA Fever Kozhikode",
    type: "video",
    src: "/fifa-fever-bts.mp4",
  },
  {
    id: 1,
    title: "BTS — MYG Campaign",
    type: "video",
    src: "/myg 2 bts.mp4",
  },
  {
    id: 2,
    title: "BTS — KVR I",
    type: "video",
    src: "/kvr bts.mp4",
  },
  {
    id: 3,
    title: "BTS — KVR II",
    type: "video",
    src: "/kvr bts 2.mp4",
  },
  {
    id: 4,
    title: "BTS — MYG Power Packed",
    type: "video",
    src: "/powerpacked mygbts.MP4",
  },
  {
    id: 5,
    title: "BTS — MYG Police",
    type: "video",
    src: "/myg-police.MOV",
  },
];

// ─────────────────────────────────────────────
// INSTAGRAM CARD THUMBNAIL
// ─────────────────────────────────────────────
function InstagramCardThumb({ item }: { item: WorkItem | BTSItem }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#1a0a2e] to-[#0d0d0d]">
      {item.poster ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={item.poster} alt={item.title} className="absolute inset-0 w-full h-full object-cover opacity-60" />
      ) : null}
      {/* Instagram gradient icon */}
      <div className="relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
        style={{
          background: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)"
        }}
      >
        <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
        </svg>
      </div>
      <p className="relative z-10 text-white/60 text-xs font-medium uppercase tracking-widest">Instagram Reel</p>
    </div>
  );
}

// ─────────────────────────────────────────────
// LIGHTBOX
// ─────────────────────────────────────────────
function Lightbox({
  item,
  onClose,
}: {
  item: WorkItem | BTSItem;
  onClose: () => void;
}) {
  const isInstagram = item.type === "instagram";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[100] bg-black/92 backdrop-blur-sm flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.88, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.88, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          onClick={(e) => e.stopPropagation()}
          className={`relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0d0d0d] ${
            isInstagram
              ? "w-full max-w-sm"          // portrait for IG reels
              : "w-full max-w-5xl"         // landscape for videos
          }`}
        >
          {/* close */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-black/70 text-white border border-white/20 hover:bg-[#ad46ff] transition"
          >
            ✕
          </button>

          {/* CONTENT */}
          {isInstagram ? (
            // ── Instagram reel iframe ──
            <div className="w-full" style={{ paddingBottom: "177.78%" /* 9:16 */ , position: "relative" }}>
              <iframe
                src={getReelEmbedUrl(item.src)}
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
                scrolling="no"
                allowTransparency
                allowFullScreen
              />
            </div>
          ) : item.type === "video" ? (
            <video
              src={item.src}
              autoPlay
              controls
              loop
              playsInline
              className="w-full aspect-video object-cover bg-black"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={item.src} alt={item.title} className="w-full aspect-video object-cover" />
          )}

          {/* info bar */}
          <div className="px-5 py-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-white font-bold">{item.title}</p>
              {"client" in item && (
                <p className="text-gray-400 text-sm">{item.client}</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              {"tag" in item && (
                <span className="text-[11px] px-3 py-1 rounded-full border border-[#ad46ff]/50 text-[#ad46ff] whitespace-nowrap">
                  {item.tag}
                </span>
              )}
              {/* open in Instagram button */}
              {isInstagram && (
                <a
                  href={item.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] px-3 py-1 rounded-full flex items-center gap-1 text-white whitespace-nowrap"
                  style={{
                    background: "linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)"
                  }}
                >
                  Open in Instagram ↗
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────
// WORK CARD
// ─────────────────────────────────────────────
function WorkCard({ item, onClick }: { item: WorkItem; onClick: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInstagram = item.type === "instagram";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.4 }}
      onClick={onClick}
      onMouseEnter={() => !isInstagram && videoRef.current?.play()}
      onMouseLeave={() => {
        if (!isInstagram && videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
      }}
      className="group relative cursor-pointer rounded-2xl overflow-hidden border border-white/10 bg-[#0d0d0d] hover:border-[#ad46ff]/60 transition-all duration-300"
    >
      {/* media */}
      <div className="aspect-video overflow-hidden relative">
        {isInstagram ? (
          <InstagramCardThumb item={item} />
        ) : item.type === "video" ? (
          <video
            ref={videoRef}
            src={item.src.includes("#") ? item.src : `${item.src}#t=0.1`}
            preload="metadata"
            muted
            loop
            playsInline
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.src} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        )}
      </div>

      {/* play overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg ${isInstagram ? "" : "bg-[#ad46ff]/90 shadow-[#ad46ff]/30"}`}
          style={isInstagram ? {
            background: "linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)"
          } : {}}
        >
          <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>

      {/* tag */}
      <div className="absolute top-3 left-3">
        <span
          className="text-[10px] font-bold px-2 py-1 rounded-md text-white tracking-wider"
          style={isInstagram
            ? { background: "linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)" }
            : { background: "#ad46ff" }
          }
        >
          {item.tag}
        </span>
      </div>

      {/* info */}
      <div className="p-4">
        <p className="text-white font-semibold text-base">{item.title}</p>
        <p className="text-gray-500 text-xs mt-1 uppercase tracking-wider">{item.client} · {item.category}</p>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// BTS CARD
// ─────────────────────────────────────────────
function BTSCard({ item, onClick }: { item: BTSItem; onClick: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInstagram = item.type === "instagram";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onClick={onClick}
      onMouseEnter={() => !isInstagram && videoRef.current?.play()}
      onMouseLeave={() => {
        if (!isInstagram && videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
      }}
      className="group relative cursor-pointer rounded-xl overflow-hidden border border-white/10 bg-[#0d0d0d] hover:border-[#ad46ff]/50 transition-all duration-300"
    >
      <div className="aspect-[9/16] overflow-hidden relative">
        {isInstagram ? (
          <InstagramCardThumb item={item} />
        ) : item.type === "video" ? (
          <video
            ref={videoRef}
            src={item.src.includes("#") ? item.src : `${item.src}#t=0.1`}
            preload="metadata"
            muted
            loop
            playsInline
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.src} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        )}
      </div>

      {/* overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <span className="text-[10px] font-bold text-[#ad46ff] uppercase tracking-widest mb-1">BTS</span>
        <p className="text-white font-semibold text-sm">{item.title}</p>
      </div>

      <div className="p-3 border-t border-white/5">
        <p className="text-white/80 text-sm font-medium truncate">{item.title}</p>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────
export default function WorksPage() {
  const [lightboxItem, setLightboxItem] = useState<WorkItem | BTSItem | null>(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouse({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  return (
    <main className="bg-black text-white min-h-screen">

      {/* ── HERO ── */}
      <section
        onMouseMove={handleMouseMove}
        className="relative pt-20 pb-24 px-6 md:px-12 overflow-hidden"
      >
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(173,70,255,0.07) 1px, transparent 1px),
                linear-gradient(90deg, rgba(173,70,255,0.07) 1px, transparent 1px)
              `,
              backgroundSize: "48px 48px",
              transform: `translate(${mouse.x * 12 - 6}px, ${mouse.y * 12 - 6}px)`,
              transition: "transform 0.2s ease",
            }}
          />
          <div
            className="absolute w-[700px] h-[700px] bg-[#ad46ff]/15 rounded-full blur-[140px] transition-all duration-300"
            style={{
              left: `${mouse.x * 100}%`,
              top: `${mouse.y * 100}%`,
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[#ad46ff] text-xs font-bold uppercase tracking-[6px] mb-6"
          >
            Portfolio
          </motion.p>

          <div className="overflow-hidden mb-6">
            <motion.h1
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(3rem,10vw,8rem)] font-black uppercase leading-none tracking-tighter"
            >
              Our{" "}
              <span className="text-transparent" style={{ WebkitTextStroke: "2px #ad46ff" }}>
                Works
              </span>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-400 max-w-lg text-base md:text-lg"
          >
            Every frame crafted with intention. Browse our brand films,
            commercials, and behind-the-scenes stories.
          </motion.p>
        </div>
      </section>

      {/* ── WORKS GRID ── */}
      <section className="px-6 md:px-12 pb-32">
        <div className="max-w-7xl mx-auto">
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {works.map((item) => (
              <WorkCard key={item.id} item={item} onClick={() => setLightboxItem(item)} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div className="px-6 md:px-12">
        <div className="max-w-7xl mx-auto border-t border-white/10" />
      </div>

      {/* ── BTS SECTION ── */}
      <section className="px-6 md:px-12 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[#ad46ff] text-xs font-bold uppercase tracking-[6px] mb-4"
            >
              Behind The Scenes
            </motion.p>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: 80, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-[clamp(2.5rem,6vw,5rem)] font-black uppercase leading-none tracking-tighter"
              >
                Raw{" "}
                <span className="text-transparent" style={{ WebkitTextStroke: "2px #ad46ff" }}>
                  Moments
                </span>
              </motion.h2>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-gray-400 mt-4 max-w-md"
            >
              A peek into our creative process — lights, cameras, and everything in between.
            </motion.p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {btsItems.map((item) => (
              <BTSCard key={item.id} item={item} onClick={() => setLightboxItem(item)} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ── */}
      <section className="px-6 md:px-12 pb-32">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden border border-[#ad46ff]/30 bg-[#0d0d0d] p-12 md:p-20 text-center"
          >
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#ad46ff]/10 rounded-full blur-[80px]" />
            </div>
            <p className="text-[#ad46ff] text-xs font-bold uppercase tracking-[6px] mb-4 relative z-10">Ready to create?</p>
            <h2 className="relative z-10 text-[clamp(2rem,5vw,4.5rem)] font-black uppercase leading-none tracking-tighter mb-6">
              Let&apos;s Build Your{" "}
              <span className="text-transparent" style={{ WebkitTextStroke: "2px #ad46ff" }}>Story</span>
            </h2>
            <p className="relative z-10 text-gray-400 max-w-md mx-auto mb-10">
              We turn ideas into visual experiences. Get in touch and let&apos;s start crafting something iconic.
            </p>
            <a
              href="https://wa.me/917306166866"
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 inline-block px-10 py-4 rounded-full bg-[#ad46ff] text-white font-bold text-sm hover:bg-purple-500 transition-all duration-200 shadow-lg shadow-[#ad46ff]/30 hover:shadow-[#ad46ff]/60 hover:scale-105"
            >
              START A PROJECT →
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── LIGHTBOX ── */}
      {lightboxItem && (
        <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
      )}
    </main>
  );
}