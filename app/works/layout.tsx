import "../globals.css";
import { Poppins, Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const metadata = {
  title: "Works — Shootside",
  description: "Every frame crafted with intention.",
};

export default function WorksLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className={`${poppins.className} bg-black text-white`}>
        {children}
      </body>
    </html>
  );
}
