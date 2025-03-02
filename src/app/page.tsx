"use client"

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link"; // Add this import for the Link component
import { FaPlay, FaArrowLeft, FaArrowRight, FaHeart, FaPhone, FaGlobe, FaDollarSign, FaSearch, FaChevronDown, FaUsers, FaHandshake, FaGraduationCap, FaCalculator, FaUtensils, FaTint, FaLeaf, FaSuitcase, FaLandmark } from "react-icons/fa";
import { 
  AiOutlineHome,
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiOutlineUser,
  AiOutlineMenu,
  AiFillProject,
  AiOutlineTeam,
  AiOutlineBook,
  AiOutlineMedicineBox,
  AiOutlineFieldTime,
  AiOutlineGift
} from "react-icons/ai";
import AuthModal from "@/components/auth/AuthModal";
import AvatarMenu from "@/components/navigation/AvatarMenu";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import ValuesSection from "@/components/home/ValuesSection";
import ProgramsSection from "@/components/home/ProgramsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import GetInvolvedSection from "@/components/home/GetInvolvedSection";
import ImpactSection from "@/components/home/ImpactSection";
import ContactSection from "@/components/home/ContactSection";

export default function Home() {
  const [programsDropdownOpen, setProgramsDropdownOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProgramsDropdownOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Desktop Navigation - Only visible on larger screens */}
      <nav className="hidden lg:flex justify-between items-center w-full py-1.5 px-8 border-b bg-[#f1f2f2]">
        {/* Left side - Logo and links */}
        <div className="flex items-center gap-8">
          <div className="flex gap-6 text-sm font-medium">
            <a href="#about" className="text-[#09869A] hover:text-[#09869A]/80 transition-colors duration-200" title="About Us">About</a>
            <a href="#help" className="text-[#09869A] hover:text-[#09869A]/80 transition-colors duration-200" title="Help Center">Help</a>
            <a href="#how-to-donate" className="text-[#09869A] hover:text-[#09869A]/80 transition-colors duration-200" title="Donation Information">How to donate?</a>
            <a href="#transparency" className="text-[#09869A] hover:text-[#09869A]/80 transition-colors duration-200" title="Transparency Reports">Transparency</a>
          </div>
        </div>
        
        {/* Right side - Contact, Language, Currency */}
        <div className="flex items-center gap-6 text-sm">
          <a href="/contact" className="flex items-center gap-1.5 text-[#09869A] hover:text-[#09869A]/80 transition-colors duration-200" title="Contact Us">
            <FaPhone className="text-sm" />
            <span>Contact</span>
          </a>
          <div className="flex items-center gap-1.5 cursor-pointer text-[#09869A] hover:text-[#09869A]/80 transition-colors duration-200 group" title="Change Language">
            <FaGlobe className="text-sm" />
            <span>English</span>
            <svg className="w-3 h-3 opacity-70 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </div>
          <div className="flex items-center gap-1.5 cursor-pointer text-[#09869A] hover:text-[#09869A]/80 transition-colors duration-200 group" title="Change Currency">
            <FaDollarSign className="text-sm" />
            <span>US Dollar</span>
            <svg className="w-3 h-3 opacity-70 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </div>
        </div>
      </nav>
      
      {/* Second Desktop Navigation Bar */}
      <nav className="hidden lg:flex justify-between items-center w-full py-3 px-8 border-b bg-[#09869A] text-white">
        {/* Logo */}
        <div className="flex items-center">
          <Image 
            src="/logo-main.svg" 
            alt="Baris Charity Foundation Logo" 
            width={120} 
            height={40} 
            className="h-auto"
            priority
          />
        </div>
        
        {/* Navigation Items */}
        <div className="flex gap-10">
          <a href="/" className="flex flex-col items-center group transition-all duration-200" title="Home">
            <AiOutlineHome className="text-2xl mb-1 group-hover:text-white/80 transition-colors duration-200" />
            <span className="text-sm font-medium group-hover:text-white/80 transition-colors duration-200">Home</span>
          </a>
          
          {/* Programs with Dropdown */}
          <div className="relative flex flex-col items-center" ref={dropdownRef}>
            <button 
              className="flex flex-col items-center group transition-all duration-200"
              onClick={() => setProgramsDropdownOpen(!programsDropdownOpen)}
              aria-expanded={programsDropdownOpen}
              aria-haspopup="true"
              title="Programs"
            >
              <div className="relative">
                <AiFillProject className="text-2xl mb-1 group-hover:text-white/80 transition-colors duration-200" />
                <FaChevronDown className="absolute -right-3 -bottom-1 text-xs group-hover:text-white/80 transition-colors duration-200" />
              </div>
              <span className="text-sm font-medium group-hover:text-white/80 transition-colors duration-200">Programs</span>
            </button>
            
            {/* Dropdown Menu */}
            {programsDropdownOpen && (
              <div 
                className="absolute top-full mt-2 w-[500px] -left-[200px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
                style={{
                  animation: "dropdown-appear 0.25s ease-out forwards",
                  transformOrigin: "top center"
                }}
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="programs-menu"
              >
                <div className="grid grid-cols-2 gap-x-4 p-4">
                  {/* Column 1 */}
                  <div>
                    <a
                      href="/programs/medical"
                      className="flex items-center px-3 py-3 text-sm text-[#006666] hover:bg-gray-100 rounded-md transition-colors duration-150 group"
                      role="menuitem"
                    >
                      <FaHeart className="mr-3 text-[#FF6F61] text-lg group-hover:text-[#FF6F61]/80 transition-colors" />
                      <span className="font-normal">Medical Program</span>
                    </a>
                    <a
                      href="/programs/campaigns"
                      className="flex items-center px-3 py-3 text-sm text-[#006666] hover:bg-gray-100 rounded-md transition-colors duration-150 group"
                      role="menuitem"
                    >
                      <FaUsers className="mr-3 text-[#008080] text-lg group-hover:text-[#008080]/80 transition-colors" />
                      <span className="font-normal">Campaigns</span>
                    </a>
                    <a
                      href="/programs/sponsorship"
                      className="flex items-center px-3 py-3 text-sm text-[#006666] hover:bg-gray-100 rounded-md transition-colors duration-150 group"
                      role="menuitem"
                    >
                      <FaHandshake className="mr-3 text-[#E1AD01] text-lg group-hover:text-[#E1AD01]/80 transition-colors" />
                      <span className="font-normal">Sponsorship</span>
                    </a>
                    <a
                      href="/programs/education"
                      className="flex items-center px-3 py-3 text-sm text-[#006666] hover:bg-gray-100 rounded-md transition-colors duration-150 group"
                      role="menuitem"
                    >
                      <FaGraduationCap className="mr-3 text-[#800000] text-lg group-hover:text-[#800000]/80 transition-colors" />
                      <span className="font-normal">Education</span>
                    </a>
                    <a
                      href="/programs/zakat"
                      className="flex items-center px-3 py-3 text-sm text-[#006666] hover:bg-gray-100 rounded-md transition-colors duration-150 group"
                      role="menuitem"
                    >
                      <FaCalculator className="mr-3 text-[#FFA500] text-lg group-hover:text-[#FFA500]/80 transition-colors" />
                      <span className="font-normal">Zakat</span>
                    </a>
                  </div>
                  
                  {/* Column 2 */}
                  <div>
                    <a
                      href="/programs/food"
                      className="flex items-center px-3 py-3 text-sm text-[#006666] hover:bg-gray-100 rounded-md transition-colors duration-150 group"
                      role="menuitem"
                    >
                      <FaUtensils className="mr-3 text-[#008080] text-lg group-hover:text-[#008080]/80 transition-colors" />
                      <span className="font-normal">Food Program</span>
                    </a>
                    <a
                      href="/programs/wash"
                      className="flex items-center px-3 py-3 text-sm text-[#006666] hover:bg-gray-100 rounded-md transition-colors duration-150 group"
                      role="menuitem"
                    >
                      <FaTint className="mr-3 text-[#FFDE59] text-lg group-hover:text-[#FFDE59]/80 transition-colors" />
                      <span className="font-normal">WASH Program</span>
                    </a>
                    <a
                      href="/programs/community"
                      className="flex items-center px-3 py-3 text-sm text-[#006666] hover:bg-gray-100 rounded-md transition-colors duration-150 group"
                      role="menuitem"
                    >
                      <FaLeaf className="mr-3 text-[#FF6F61] text-lg group-hover:text-[#FF6F61]/80 transition-colors" />
                      <span className="font-normal">Community Resilience</span>
                    </a>
                    <a
                      href="/programs/recovery"
                      className="flex items-center px-3 py-3 text-sm text-[#006666] hover:bg-gray-100 rounded-md transition-colors duration-150 group"
                      role="menuitem"
                    >
                      <FaSuitcase className="mr-3 text-[#FF6F61] text-lg group-hover:text-[#FF6F61]/80 transition-colors" />
                      <span className="font-normal">Early Recovery</span>
                    </a>
                    <a
                      href="/programs/sadaka"
                      className="flex items-center px-3 py-3 text-sm text-[#006666] hover:bg-gray-100 rounded-md transition-colors duration-150 group"
                      role="menuitem"
                    >
                      <FaLandmark className="mr-3 text-[#008080] text-lg group-hover:text-[#008080]/80 transition-colors" />
                      <span className="font-normal">Sadaka Jariya</span>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Rest of the navigation items remain unchanged */}
          <a href="/store" className="flex flex-col items-center group transition-all duration-200" title="Store">
            <AiOutlineShoppingCart className="text-2xl mb-1 group-hover:text-white/80 transition-colors duration-200" />
            <span className="text-sm font-medium group-hover:text-white/80 transition-colors duration-200">Store</span>
          </a>
          <a href="/volunteer" className="flex flex-col items-center group transition-all duration-200" title="Volunteer">
            <AiOutlineTeam className="text-2xl mb-1 group-hover:text-white/80 transition-colors duration-200" />
            <span className="text-sm font-medium group-hover:text-white/80 transition-colors duration-200">Volunteer</span>
          </a>
        </div>
        
        {/* Search and Profile */}
        <div className="flex items-center gap-5">
          <button className="text-2xl hover:text-white/80 transition-colors duration-200" aria-label="Search" title="Search">
            <FaSearch />
          </button>
          <AvatarMenu onAuthClick={() => setAuthModalOpen(true)} />
        </div>
      </nav>
      
      {/* Hero Section */}
      <HeroSection />
      <AboutSection />
      <ValuesSection />
      <ProgramsSection />
      <TestimonialsSection />
      <GetInvolvedSection />
      <ImpactSection />
      <ContactSection />
      
      {/* Bottom Mobile Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around items-center py-3 lg:hidden z-50">
        <Link href="/" className="flex flex-col items-center text-green-600">
          <AiOutlineHome className="text-2xl" />
          <span className="text-xs">Home</span>
        </Link>
        <Link href="/cart" className="flex flex-col items-center text-gray-500">
          <AiOutlineShoppingCart className="text-2xl" />
          <span className="text-xs">Cart</span>
        </Link>
        <Link href="/donate" className="flex flex-col items-center text-gray-500">
          <AiOutlineHeart className="text-2xl" />
          <span className="text-xs">Donate</span>
        </Link>
        <Link href="/signin" className="flex flex-col items-center text-gray-500">
          <AiOutlineUser className="text-2xl" />
          <span className="text-xs">Sign In</span>
        </Link>
        <button className="flex flex-col items-center text-gray-500">
          <AiOutlineMenu className="text-2xl" />
          <span className="text-xs">Menu</span>
        </button>
      </nav>
      
      {/* Add Auth Modal */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </div>
  );
}
