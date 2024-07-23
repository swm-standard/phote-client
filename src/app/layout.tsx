import './global.css';
import type { Metadata, Viewport } from 'next';
import localFont from "next/font/local";
import React from "react";
import AppContainer from "@/app/_components/app-container";

const pretendard = localFont({
  src: "../static/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: '포테',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${pretendard.variable} bg-outer-bg`}>
      <body className={`${pretendard.className} w-dvw h-dvh`}>
          <AppContainer>
              {children}
          </AppContainer>
      </body>
    </html>
  );
}
