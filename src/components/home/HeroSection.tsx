"use client"

import Image from "next/image";
import { FaArrowLeft, FaArrowRight, FaHeart } from "react-icons/fa";
import { Montserrat } from "next/font/google";
import Link from "next/link";
import { DonationProvider, useDonation } from "@/contexts/DonationContext";
import { useState } from "react";
import DonationOptionsModal from "@/components/donation/modals/DonationOptionsModal";
import PaymentFeesModal from "@/components/donation/modals/PaymentFeesModal";
import TeamSupportModal from "@/components/donation/modals/TeamSupportModal";
import SignInModal from "@/components/donation/modals/SignInModal";
import GuestContinueModal from "@/components/donation/modals/GuestContinueModal";
import PaymentMethodModal from "@/components/donation/modals/PaymentMethodModal";
import ConfirmationModal from "@/components/donation/modals/ConfirmationModal";

// Initialize the Montserrat font
const montserrat = Montserrat({ 
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

// Inner component that uses donation context
const HeroSectionContent = () => {
  const { currentModal, setCurrentModal, setProgramName } = useDonation();
  
  const handleQuickDonate = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setProgramName("General Donation");
    setCurrentModal('donationOptions');
  };

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
      
      {/* Render donation modals */}
      {currentModal === 'donationOptions' && <DonationOptionsModal />}
      {currentModal === 'paymentFees' && <PaymentFeesModal />}
      {currentModal === 'teamSupport' && <TeamSupportModal />}
      {currentModal === 'signIn' && <SignInModal />}
      {currentModal === 'guestContinue' && <GuestContinueModal />}
      {currentModal === 'paymentMethod' && <PaymentMethodModal />}
      {currentModal === 'confirmation' && <ConfirmationModal />}
      
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
        <div className="grid grid-cols-3 gap-2 sm:gap-6 md:gap-10 mb-16 w-full max-w-4xl">
          <div className="text-center">
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-0 sm:mb-1">1523</p>
            <p className="text-xs sm:text-sm uppercase tracking-wider text-[#09869A]">Projects</p>
          </div>

          <div className="text-center">
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-0 sm:mb-1">1.33 M</p>
            <p className="text-xs sm:text-sm uppercase tracking-wider text-[#17C5CE]">Beneficiaries</p>
          </div>
          <div className="text-center">
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-0 sm:mb-1">1122</p>
            <p className="text-xs sm:text-sm uppercase tracking-wider text-[#FA6418]">Wells</p>
          </div>
        </div>
        
        {/* Call-to-action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full max-w-md sm:max-w-2xl">
          <Link href="/programs/ramadan" className="flex items-center justify-center bg-white/10 backdrop-blur-sm text-[#E32613] rounded-full py-3 px-6 font-medium hover:bg-white/20 transition-colors w-full sm:w-auto">
            <FaArrowLeft className="mr-2" /> Ramadan Donation
          </Link>
          
          <a 
            href="#"
            onClick={handleQuickDonate}
            className="flex items-center justify-center bg-white/10 backdrop-blur-sm text-[#F1F2F2] rounded-full py-3 px-6 font-medium hover:bg-white/20 transition-colors w-full sm:w-auto"
          >
            <FaHeart className="mr-2" /> Quick Donation
          </a>
          
          <Link href="/programs" className="flex items-center justify-center bg-white/10 backdrop-blur-sm text-[#EFCC3C] rounded-full py-3 px-6 font-medium hover:bg-white/20 transition-colors w-full sm:w-auto">
            Programs <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
};

// Main wrapper component that provides the donation context
const HeroSection = () => {
  return (
    <DonationProvider programId="general">
      <HeroSectionContent />
    </DonationProvider>
  );
};

export default HeroSection;