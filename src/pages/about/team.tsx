import React from 'react';
import Head from 'next/head';
// Add the missing imports
import Layout from '@/components/layout/Layout';  // Adjust path if needed
import AboutHero from '@/components/about/AboutHero';
import AboutLayout from '@/components/about/AboutLayout'; // Adjust path if needed

export default function TeamPage() {
  return (
    <Layout>
      <Head>
        <title>Our Team | BCF</title>
      </Head>
      <AboutHero />
      <AboutLayout activeTab="team">
        {/* Team content */}
      </AboutLayout>
    </Layout>
  );
}