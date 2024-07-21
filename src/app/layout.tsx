import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './global.css';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Phote',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} w-dvw h-dvh`}>{children}</body>
    </html>
  );
}
