import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"]
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"]
});

export const metadata: Metadata = {
  title: "WaffleHut | Crafted For Sweet Cravings",
  description: "Luxury Belgian waffles with premium toppings and cinematic scroll-based storytelling.",
  metadataBase: new URL("https://wafflehut.example"),
  openGraph: {
    title: "WaffleHut | Crafted For Sweet Cravings",
    description: "Luxury Belgian waffles with premium toppings and cinematic scroll-based storytelling.",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${serif.variable} ${sans.variable} bg-brand-black text-brand-cream antialiased`}>
        {children}
      </body>
    </html>
  );
}