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
  title: "WaffleHut | Strawberry Syrup Waffles",
  description: "A playful cartoon waffle shop landing page with a dessert-bright palette, glossy syrup gradients, and bouncy motion.",
  metadataBase: new URL("https://wafflehut.example"),
  openGraph: {
    title: "WaffleHut | Strawberry Syrup Waffles",
    description: "A fun cartoon cafe landing page with candy-shop colors, honey drip accents, and scroll-synced dessert storytelling.",
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
      <body className={`${display.variable} ${rounded.variable} bg-waffle-frosting font-rounded text-waffle-night antialiased`}>
        {children}
      </body>
    </html>
  );
}