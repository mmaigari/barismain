import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Montserrat } from 'next/font/google';
import "./globals.css";
import Footer from '@/components/layout/Footer';
import { AuthProvider } from '@/contexts/AuthContext';
import { DonationProvider } from '@/contexts/DonationContext';
import { CurrencyInitializer } from '@/components/CurrencyInitializer';
import OrganizationSchema from '@/components/seo/OrganizationSchema';

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
  title: {
    template: '%s | Bariş Charity Foundation',
    default: 'Bariş Charity Foundation - Hope Starts With You',
  },
  description: "Bariş Charity Foundation is committed to alleviating suffering through comprehensive and sustainable development with programs in education, medical care, food security, and community resilience.",
  keywords: ["charity", "nonprofit", "donation", "humanitarian aid", "education", "medical aid", "food security", "community development", "WASH program", "sadaka jariya"],
  authors: [{ name: "Bariş Charity Foundation" }],
  creator: "Bariş Charity Foundation",
  publisher: "Bariş Charity Foundation",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Bariş Charity Foundation - Hope Starts With You",
    description: "Join us in making a difference through sustainable development and community support programs.",
    url: "https://barischarityfoundation.org",
    siteName: "Bariş Charity Foundation",
    images: [
      {
        url: "/logo-main2.svg",
        width: 1200,
        height: 630,
        alt: "Bariş Charity Foundation",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bariş Charity Foundation - Hope Starts With You",
    description: "Join us in making a difference through sustainable development and community support programs.",
    images: ["/logo-main2.svg"],
  },
  verification: {
    // Add verification tokens when available, like Google Search Console
    // google: "verification_token",
  },
  category: "Nonprofit Organization",
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
        <OrganizationSchema />
      </body>
    </html>
  );
}
