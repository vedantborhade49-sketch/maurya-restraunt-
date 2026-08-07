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
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-cormorant",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-manrope",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-instrument",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mauryaveg.in"),
  title: {
    default: "Maurya | Pure Vegetarian Restaurant in Kondhwa, Pune",
    template: "%s | Maurya Pure Veg Pune",
  },
  description: "Experience Pune's finest pure vegetarian culinary sanctuary. Authentic North Indian curries, Maharashtrian specialties, Mysore dosas, and Chinese delicacies near ISKCON Temple, Kondhwa, Pune. Book a table or order directly.",
  keywords: [
    "pure veg restaurant in Kondhwa",
    "veg restaurant Kondhwa Pune",
    "pure vegetarian restaurant Pune",
    "family restaurant Kondhwa",
    "best veg thali Pune",
    "Maurya Veg Kondhwa",
    "Maurya Restaurant Pune",
    "satvik restaurant Pune",
    "veg dinner Kondhwa Khurd"
  ],
  authors: [{ name: "Maurya Pure Veg Restaurant" }],
  creator: "Maurya Pure Veg",
  publisher: "Maurya Pure Veg",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Maurya | Pure Vegetarian Restaurant in Kondhwa, Pune",
    description: "Experience Pune's finest pure vegetarian culinary sanctuary in Kondhwa. Authentic curries, dosas, thalis, and family dining.",
    url: "https://mauryaveg.in",
    siteName: "Maurya Pure Veg Restaurant",
    images: [
      {
        url: "/outside.webp",
        width: 1200,
        height: 630,
        alt: "Maurya Pure Veg Restaurant Exterior Kondhwa Pune",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maurya | Pure Vegetarian Restaurant in Kondhwa, Pune",
    description: "Experience Pune's finest pure vegetarian dining near ISKCON Temple, Kondhwa.",
    images: ["/outside.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const restaurantStructuredData = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "Maurya Pure Veg Restaurant",
  "image": [
    "https://mauryaveg.in/outside.webp",
    "https://mauryaveg.in/editorial-table-feast.webp",
    "https://mauryaveg.in/inside-1.webp"
  ],
  "@id": "https://mauryaveg.in/#restaurant",
  "url": "https://mauryaveg.in",
  "telephone": "+918329895846",
  "email": "mauryaveg@gmail.com",
  "priceRange": "₹₹",
  "menu": "https://mauryaveg.in/menu",
  "servesCuisine": [
    "Pure Vegetarian",
    "North Indian",
    "South Indian",
    "Maharashtrian",
    "Chinese"
  ],
  "acceptsReservations": "True",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Shop 5,6 Sun Radiant Commercial Society, Khadi Machine Chowk, Kondhwa",
    "addressLocality": "Pune",
    "addressRegion": "Maharashtra",
    "postalCode": "411048",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 18.4682,
    "longitude": 73.8907
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "08:00",
      "closes": "23:30"
    }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.5",
    "reviewCount": "933",
    "bestRating": "5",
    "worstRating": "1"
  },
  "potentialAction": [
    {
      "@type": "ReserveAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://mauryaveg.in/visit#reserve",
        "inLanguage": "en-US",
        "actionPlatform": [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform"
        ]
      },
      "result": {
        "@type": "FoodEstablishmentReservation",
        "name": "Table Reservation at Maurya Pure Veg"
      }
    },
    {
      "@type": "OrderAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://mauryaveg.in/order",
        "inLanguage": "en-US",
        "actionPlatform": [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform"
        ]
      }
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable} ${instrument.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantStructuredData) }}
        />
      </head>
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
