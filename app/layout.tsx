import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'WaffleHut | Premium Cartoon Waffle Shop',
  description: 'A playful scrollytelling landing page for WaffleHut, a cartoon-style waffle brand with buttery scroll-linked frame animation.',
  icons: {
    icon: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}