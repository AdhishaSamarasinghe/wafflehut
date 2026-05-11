import type { Metadata } from "next";
import { Baloo_2, Fredoka } from "next/font/google";
import "./globals.css";

const display = Baloo_2({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"]
});

const rounded = Fredoka({
  subsets: ["latin"],
  variable: "--font-rounded",
  weight: ["300", "400", "500", "600", "700"]
});

export const metadata: Metadata = {
  title: "WaffleHut | Hot Sweet Crispy",
  description: "A playful cartoon waffle shop landing page with scroll-synced PNG animation, bright dessert visuals, and bouncy motion.",
  metadataBase: new URL("https://wafflehut.example"),
  openGraph: {
    title: "WaffleHut | Hot Sweet Crispy",
    description: "A playful cartoon waffle shop landing page with scroll-synced PNG animation and colorful dessert storytelling.",
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
      <body className={`${display.variable} ${rounded.variable} bg-waffle-night font-rounded text-waffle-cream antialiased`}>
        {children}
      </body>
    </html>
  );
}