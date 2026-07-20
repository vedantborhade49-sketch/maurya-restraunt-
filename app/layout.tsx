import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import SmoothScroll from "../components/SmoothScroll";
import YourTableDrawer from "../components/cart/YourTableDrawer";
import { PreloaderProvider } from "../components/preloader";
import Footer from "../components/Footer";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument",
});

export const metadata: Metadata = {
  title: "Maurya | Pure Veg, Pure Indulgence",
  description: "Experience premium vegetarian dining at Maurya in Kondhwa, Pune. Explore North Indian, South Indian, Maharashtrian and Chinese favourites. Order directly for home delivery.",
  keywords: ["pure veg restaurant in Kondhwa", "veg restaurant Kondhwa Pune", "family restaurant Kondhwa", "pure vegetarian restaurant Pune", "Maurya Veg", "Maurya Pune"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable} ${instrument.variable}`}>
      <body className="antialiased bg-midnight text-soft-ivory font-sans">
        <PreloaderProvider>
          <SmoothScroll>
            <Navbar />
            <YourTableDrawer />
            <div className="noise-bg" />
            <main>{children}</main>
            <Footer />
          </SmoothScroll>
        </PreloaderProvider>
      </body>
    </html>
  );
}
