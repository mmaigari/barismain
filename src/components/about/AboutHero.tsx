import React from 'react';
import Image from 'next/image';

const AboutHero = () => {
  return (
    <section className="relative bg-gradient-to-r from-[#09869a] to-[#064e5a] py-24 md:py-32">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <Image 
          src="/images/about-hero.jpg" 
          alt="Bariş Charity Foundation" 
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="container mx-auto px-4 relative z-10 text-white text-center">
        <h1 className="font-montserrat text-4xl md:text-6xl font-bold mb-6">About Bariş Charity Foundation</h1>
        <div className="w-24 h-1.5 bg-[#FA6418] mx-auto rounded-full mb-6"></div>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto">
          Empowering vulnerable groups to become productive members of society.
        </p>
      </div>
    </section>
  );
};

export default AboutHero;