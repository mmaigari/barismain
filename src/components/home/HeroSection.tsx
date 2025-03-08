"use client"

import Image from "next/image";
import { FaArrowLeft, FaArrowRight, FaHeart } from "react-icons/fa";
import { Montserrat } from "next/font/google";
import Link from "next/link";

// Initialize the Montserrat font
const montserrat = Montserrat({ 
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const HeroSection = () => {
  return (
    <div className="relative min-h-[600px] w-full flex flex-col items-center justify-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70 z-10"></div>
        <Image 
          src="/children.jpg" 
          alt="Children benefiting from charity programs" 
          fill
          className="object-cover object-center"
          priority
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8+utrPQAJUwNNbXzsfQAAAABJRU5ErkJggg=="
        />
      </div>
      
      {/* Content Container */}
      <div className={`relative z-20 w-full flex flex-col items-center px-4 ${montserrat.variable}`}>
        {/* Play Button */}

        
        {/* Main Text */}
        <h1 className="font-montserrat text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-4">
          Baris Charity Foundation
        </h1>
        <p className="font-montserrat text-xl md:text-2xl text-white text-center mb-12">
        Hope starts with you
        </p>
        
        {/* Statistics Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 mb-16 w-full max-w-4xl">
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-white mb-1">150+</p>
            <p className="text-sm uppercase tracking-wider text-white/80">Projects</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-white mb-1">25K</p>
            <p className="text-sm uppercase tracking-wider text-white/80">Volunteers</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-white mb-1">12M</p>
            <p className="text-sm uppercase tracking-wider text-white/80">Lives Impacted</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-white mb-1">45</p>
            <p className="text-sm uppercase tracking-wider text-white/80">Countries</p>
          </div>
        </div>
        
        {/* Call-to-action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full max-w-md sm:max-w-2xl">
          <button className="flex items-center justify-center bg-white/10 backdrop-blur-sm text-white rounded-full py-3 px-6 font-medium hover:bg-white/20 transition-colors w-full sm:w-auto">
            <FaArrowLeft className="mr-2" /> Ramadan Donation
          </button>
          
          <button className="flex items-center justify-center bg-white/10 backdrop-blur-sm text-white rounded-full py-3 px-6 font-medium hover:bg-white/20 transition-colors w-full sm:w-auto">
            <FaHeart className="mr-2" /> Quick Donation
          </button>
          
      
                <Link href="/programs" className="flex items-center justify-center bg-white/10 backdrop-blur-sm text-white rounded-full py-3 px-6 font-medium hover:bg-white/20 transition-colors w-full sm:w-auto">
                Programs <FaArrowRight className="ml-2" />
                </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;