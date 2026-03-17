"use client";

import { useState } from "react";

type LogoItem = {
  name: string;
  src: string;
  height: number;
};

const logos: LogoItem[] = [
  { name: "1", src: "/images/1.jpeg", height: 40 },
  { name: "2", src: "/images/2.jpeg", height: 40 },
  { name: "3", src: "/images/3.jpeg", height: 40 },
  { name: "4", src: "/images/4.jpeg", height: 40 },
  { name: "5", src: "/images/5.jpeg", height: 40 },
  { name: "6", src: "/images/6.jpeg", height: 40 },
  { name: "7", src: "/images/7.jpeg", height: 40 },
  { name: "8", src: "/images/8.jpeg", height: 40 },
];

function ComingSoonModal({
  item,
  onClose,
}: {
  item: LogoItem;
  onClose: () => void;
}) {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#111] p-8 rounded-2xl text-center"
      >
        <h2 className="text-white text-xl">{item.name}</h2>
        <p className="text-gray-400 mt-2">Coming Soon ✨</p>
      </div>
    </div>
  );
}

function LogoCard({ item }: { item: LogoItem }) {
  return (
    <div className="text-center">
      <img
        src={item.src}
        alt={item.name}
        className="h-[40px] object-contain mx-auto"
      />
      <p className="text-[10px] text-gray-400 mt-1">{item.name}</p>
    </div>
  );
}

export default function Page() {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [selected, setSelected] = useState<LogoItem | null>(null);

  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMouse({ x, y });
  };

  const toggle = () => {
    if (open) {
      setClosing(true);
      setTimeout(() => {
        setOpen(false);
        setMounted(false);
        setClosing(false);
      }, 400);
    } else {
      setOpen(true);
      setTimeout(() => setMounted(true), 20);
    }
  };

  return (
    <main className="bg-black text-white min-h-screen">

      {/* OUR WORKS */}
      <section
        onMouseMove={handleMouseMove}
        className="relative py-24 px-6 md:px-12 overflow-hidden"
      >
        {/* BACKGROUND */}
        <div className="absolute inset-0 z-0 pointer-events-none">

          {/* GRID */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(173,70,255,0.08) 1px, transparent 1px),
                linear-gradient(90deg, rgba(173,70,255,0.08) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
              transform: `translate(${mouse.x * 10 - 5}px, ${
                mouse.y * 10 - 5
              }px)`,
              transition: "transform 0.2s ease",
            }}
          />

          {/* RIPPLE */}
          <div
            className="absolute w-[600px] h-[600px] bg-[#ad46ff]/20 rounded-full blur-[120px] transition-all duration-200"
            style={{
              left: `${mouse.x * 100}%`,
              top: `${mouse.y * 100}%`,
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>

        {/* CONTENT */}
        <div className="relative z-10">

          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-5xl md:text-7xl font-black uppercase">
              OUR WORKS
            </h2>

            <p className="text-gray-400 mt-4 max-w-xl mx-auto">
              A selection of brands and projects we’ve worked with.
            </p>
          </div>

          {/* FOLDER */}
          <div className="mt-20 flex justify-center">
            <div className="relative w-[320px] h-[320px]">

              {(open || closing) &&
                logos.map((logo, i) => {
                  const angle = (i / logos.length) * 360;
                  const rad = (angle * Math.PI) / 180;
                  const x = Math.cos(rad) * 120;
                  const y = Math.sin(rad) * 120;

                  return (
                    <div
                      key={i}
                      onClick={() => !closing && setSelected(logo)}
                      style={{
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        transform: `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${
                          closing ? 0 : mounted ? 1 : 0
                        })`,
                        opacity: closing ? 0 : mounted ? 1 : 0,
                        transition:
                          "transform 0.5s cubic-bezier(0.34,1.56,0.64,1), opacity 0.4s ease",
                        transitionDelay: `${i * 70}ms`,
                      }}
                    >
                      <LogoCard item={logo} />
                    </div>
                  );
                })}

              {/* FOLDER ICON */}
              <div
                onClick={toggle}
                className="absolute left-1/2 top-1/2 cursor-pointer"
                style={{
                  transform: open
                    ? "translate(-50%, -50%) scale(1.08)"
                    : "translate(-50%, -50%) scale(1)",
                  transition: "all 0.3s ease",
                }}
              >
                <div className="w-[40px] h-[14px] bg-purple-400 rounded-t-md" />
                <div className="w-[100px] h-[60px] bg-gradient-to-br from-[#ad46ff] to-purple-700 rounded-b-xl rounded-tr-xl shadow-lg" />
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="bg-black py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

          <div>
            <h2 className="text-4xl md:text-6xl font-black">
              LET’S BUILD <br />
              <span className="text-[#ad46ff]">SOMETHING</span>
            </h2>
            <p className="text-gray-400 mt-6">
              Drop your details and we’ll reach out.
            </p>
          </div>

          <form className="bg-[#111] p-8 rounded-2xl space-y-6">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 bg-black border border-gray-700 rounded-lg"
            />
            <input
              type="tel"
              placeholder="Phone"
              className="w-full p-3 bg-black border border-gray-700 rounded-lg"
            />
            <button className="w-full bg-[#ad46ff] py-3 rounded-lg">
              GET IN TOUCH
            </button>
          </form>

        </div>
      </section>

      {/* MODAL */}
      {selected && (
        <ComingSoonModal
          item={selected}
          onClose={() => setSelected(null)}
        />
      )}

    </main>
  );
}