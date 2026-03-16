import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Poppins, Barlow_Condensed, Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className={`${poppins.className} bg-black text-white`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}