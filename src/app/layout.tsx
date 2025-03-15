import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Montserrat } from 'next/font/google';
import "./globals.css";
import Footer from '@/components/layout/Footer';
import { AuthProvider } from '@/contexts/AuthContext';
import { DonationProvider } from '@/contexts/DonationContext';
import { CurrencyInitializer } from '@/components/CurrencyInitializer';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: "Welcome to Bariş Charity Foundation",
  description: "Developed by Cyber Fort",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable}`}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <DonationProvider>
            <CurrencyInitializer />
            {children}
          </DonationProvider>
        </AuthProvider>
        <Footer />
      </body>
    </html>
  );
}
