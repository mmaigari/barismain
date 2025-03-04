import React from 'react';
import Head from 'next/head';
// Add the missing imports
import AboutHero from '@/components/about/AboutHero';

export default function TeamPage() {
  return (
    <div>
      <Head>
        <title>Our Team | BCF</title>
      </Head>
      <AboutHero />
        {/* Team content */}
    </div>
  );
}