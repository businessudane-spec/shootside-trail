import Script from "next/script";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
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
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-R3S895T3XF"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-R3S895T3XF');
          `}
        </Script>
      </head>
      <body className={`${poppins.className} bg-black text-white`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}