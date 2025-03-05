"use client"

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Home,
  ShoppingCart,
  Heart,
  User,
  Menu,
  FolderKanban,
  Users,
  Phone,
  Globe,
  DollarSign,
  Search,
  ChevronDown,
  Handshake,
  GraduationCap,
  Calculator,
  Utensils,
  Droplet,
  Leaf,
  Briefcase,
  Building,
  X
} from "lucide-react"; // eslint-disable-line @typescript-eslint/no-unused-vars
import AvatarMenu from "@/components/navigation/AvatarMenu";

interface NavbarProps {
  onAuthModalOpen: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onAuthModalOpen }) => {
  const [programsDropdownOpen, setProgramsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hideTopNav, setHideTopNav] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const aboutDropdownRef = useRef<HTMLDivElement>(null);
  const programsDropdownRef = useRef<HTMLDivElement>(null);
  const [helpDropdownOpen, setHelpDropdownOpen] = useState(false);
  const helpDropdownRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY > 100) {
        if (window.scrollY > lastScrollY) {
          // Scrolling down
          setHideTopNav(true);
        } else {
          // Scrolling up
          setHideTopNav(false);
        }
      } else {
        setHideTopNav(false);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', controlNavbar);
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProgramsDropdownOpen(false);
      }
      if (aboutDropdownRef.current && !aboutDropdownRef.current.contains(event.target as Node)) {
        setAboutDropdownOpen(false);
      }
      if (helpDropdownRef.current && !helpDropdownRef.current.contains(event.target as Node)) {
        setHelpDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef, aboutDropdownRef, helpDropdownRef, mobileMenuRef]);

  // Add this to prevent body scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobileMenuOpen]);

  // Calculate the height of the top navbar for proper spacing
  const topNavHeight = 36; // Adjust this value based on your actual top navbar height

  return (
    <>
      {/* Navigation wrapper with fixed positioning */}
      <div className="fixed w-full top-0 z-50 hidden lg:block">
        {/* First Navigation Bar */}
        <div 
          className={`bg-[#f1f2f2] border-b transition-all duration-300 ease-in-out ${
            hideTopNav ? '-translate-y-full' : 'translate-y-0'
          }`}
          style={{ 
            height: `${topNavHeight}px`, 
            position: 'relative',  // Add this line
            zIndex: 60            // Update this line
          }}
        >
          <div className="container mx-auto px-8 h-full flex justify-between items-center">
            {/* Left side - Logo and links */}
            <div className="flex items-center gap-8">
              <div className="flex gap-6 text-sm font-medium">
                {/* About with Dropdown - FIXED VERSION */}
                <div 
                  className="relative" 
                  ref={aboutDropdownRef}
                >
                  <div className="flex items-center text-[#09869A] hover:text-[#09869A]/80 transition-colors duration-200">
                    {/* Link to About page */}
                    <Link href="/about" className="hover:text-[#09869A]/80 transition-colors">
                      <span>About</span>
                    </Link>
                    
                    {/* Dropdown toggle button */}
                    <button 
                      onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                      className="ml-1 focus:outline-none"
                    >
                      <ChevronDown className="w-3 h-3 opacity-70" />
                    </button>
                  </div>
                  
                  {/* About Dropdown Menu - remains unchanged */}
                  {aboutDropdownOpen && (
                    <div 
                      className="absolute top-full left-0 mt-1 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                      style={{ 
                        zIndex: 9999,
                        position: 'absolute',
                        animation: "dropdown-appear 0.25s ease-out forwards"
                      }}
                    >
                      <div className="py-2">
                        <Link
                          href="/about?section=overview"
                          className="block px-4 py-2 text-sm text-[#09869A] hover:bg-gray-100 transition-colors duration-150"
                          onClick={() => setAboutDropdownOpen(false)}
                        >
                          Overview
                        </Link>
                        <Link
                          href="/about?section=vision-mission"
                          className="block px-4 py-2 text-sm text-[#09869A] hover:bg-gray-100 transition-colors duration-150"
                          onClick={() => setAboutDropdownOpen(false)}
                        >
                          Vision & Mission
                        </Link>
                        <Link
                          href="/about?section=values"
                          className="block px-4 py-2 text-sm text-[#09869A] hover:bg-gray-100 transition-colors duration-150"
                          onClick={() => setAboutDropdownOpen(false)}
                        >
                          Our Values
                        </Link>
                        <Link
                          href="/about?section=structure"
                          className="block px-4 py-2 text-sm text-[#09869A] hover:bg-gray-100 transition-colors duration-150"
                          onClick={() => setAboutDropdownOpen(false)}
                        >
                          Our Structure
                        </Link>
                        <Link
                          href="/about?section=programs"
                          className="block px-4 py-2 text-sm text-[#09869A] hover:bg-gray-100 transition-colors duration-150"
                          onClick={() => setAboutDropdownOpen(false)}
                        >
                          Our Programs
                        </Link>
                        <Link
                          href="/about?section=impact"
                          className="block px-4 py-2 text-sm text-[#09869A] hover:bg-gray-100 transition-colors duration-150"
                          onClick={() => setAboutDropdownOpen(false)}
                        >
                          Our Impact
                        </Link>
                        <Link
                          href="/about?section=partners"
                          className="block px-4 py-2 text-sm text-[#09869A] hover:bg-gray-100 transition-colors duration-150"
                          onClick={() => setAboutDropdownOpen(false)}
                        >
                          Partners
                        </Link>
                        <Link
                          href="/about?section=reports"
                          className="block px-4 py-2 text-sm text-[#09869A] hover:bg-gray-100 transition-colors duration-150"
                          onClick={() => setAboutDropdownOpen(false)}
                        >
                          Annual Reports
                        </Link>
                      
                      </div>
                    </div>
                  )}
                </div>
                <div 
                  className="relative" 
                  ref={helpDropdownRef}
                  onMouseEnter={() => setHelpDropdownOpen(true)}
                  onMouseLeave={() => setHelpDropdownOpen(false)}
                >
                  <div className="flex items-center text-[#09869A] hover:text-[#09869A]/80 transition-colors duration-200 cursor-pointer">
                    <span>Help</span>
                    <ChevronDown className="ml-1 w-3 h-3 opacity-70" />
                  </div>
                  
                  {helpDropdownOpen && (
                    <div 
                      className="absolute top-full left-0 mt-1 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                      style={{ 
                        zIndex: 9999,
                        position: 'absolute',
                        animation: "dropdown-appear 0.25s ease-out forwards"
                      }}
                    >
                      <div className="py-2">
                        <Link
                          href="/help/chat-support"
                          className="block px-4 py-2 text-sm text-[#09869A] hover:bg-gray-100 transition-colors duration-150"
                          onClick={() => setHelpDropdownOpen(false)}
                        >
                          Chat with Support Team
                        </Link>
                        <Link
                          href="/help/faqs"
                          className="block px-4 py-2 text-sm text-[#09869A] hover:bg-gray-100 transition-colors duration-150"
                          onClick={() => setHelpDropdownOpen(false)}
                        >
                          FAQs (Frequently Asked Questions)
                        </Link>
                        <Link
                          href="/help/terms"
                          className="block px-4 py-2 text-sm text-[#09869A] hover:bg-gray-100 transition-colors duration-150"
                          onClick={() => setHelpDropdownOpen(false)}
                        >
                          Terms of Use
                        </Link>
                        <Link
                          href="/help/privacy"
                          className="block px-4 py-2 text-sm text-[#09869A] hover:bg-gray-100 transition-colors duration-150"
                          onClick={() => setHelpDropdownOpen(false)}
                        >
                          Privacy Policy
                        </Link>
                        <Link
                          href="/help/contact"
                          className="block px-4 py-2 text-sm text-[#09869A] hover:bg-gray-100 transition-colors duration-150"
                          onClick={() => setHelpDropdownOpen(false)}
                        >
                          Contact Us
                        </Link>
                        <Link
                          href="/help/feedback"
                          className="block px-4 py-2 text-sm text-[#09869A] hover:bg-gray-100 transition-colors duration-150"
                          onClick={() => setHelpDropdownOpen(false)}
                        >
                          Send Feedback
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
                <a href="#how-to-donate" className="text-[#09869A] hover:text-[#09869A]/80 transition-colors duration-200" title="Donation Information">How to donate?</a>
                <a href="#transparency" className="text-[#09869A] hover:text-[#09869A]/80 transition-colors duration-200" title="Transparency Reports">Transparency</a>
              </div>
            </div>
            
            {/* Right side - Contact, Language, Currency */}
            <div className="flex items-center gap-6 text-sm">
              <a href="/contact" className="flex items-center gap-1.5 text-[#09869A] hover:text-[#09869A]/80 transition-colors duration-200" title="Contact Us">
                <Phone className="w-4 h-4" />
                <span>Contact</span>
              </a>
              <div className="flex items-center gap-1.5 cursor-pointer text-[#09869A] hover:text-[#09869A]/80 transition-colors duration-200 group" title="Change Language">
                <Globe className="w-4 h-4" />
                <span>English</span>
                <ChevronDown className="w-3 h-3 opacity-70 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex items-center gap-1.5 cursor-pointer text-[#09869A] hover:text-[#09869A]/80 transition-colors duration-200 group" title="Change Currency">
                <DollarSign className="w-4 h-4" />
                <span>US Dollar</span>
                <ChevronDown className="w-3 h-3 opacity-70 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Navigation Bar */}
        <div 
          className={`bg-[#09869A] text-white transition-all duration-300 ease-in-out`}
          style={{ 
            transform: hideTopNav ? 'translateY(-' + topNavHeight + 'px)' : 'translateY(0)',
            zIndex: 20,   // Keep this lower than the top nav's z-index
            position: 'relative'  // Add this line
          }}
        >
          <div className="container mx-auto px-8 py-3 flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/">
                <Image 
                  src="/logo-main.svg" 
                  alt="Baris Charity Foundation Logo" 
                  width={130} 
                  height={40} 
                  className="h-auto"
                  priority
                />
              </Link>
            </div>
            
            {/* Navigation Items */}
            <div className="flex gap-10">
              <Link href="/" className="flex items-center gap-2 group transition-all duration-200" title="Home">
                <Home className="w-5 h-5 group-hover:text-white/80 transition-colors duration-200" />
                <span className="text-sm font-medium group-hover:text-white/80 transition-colors duration-200">Home</span>
              </Link>
              
              {/* Programs with Split Functionality */}
              <div className="relative" ref={programsDropdownRef}>
                <div className="flex items-center gap-2">
                  {/* The text and icon link to the programs page */}
                  <Link href="/programs" className="flex items-center gap-2 hover:text-white/80 transition-colors duration-200">
                    <FolderKanban className="w-5 h-5" />
                    <span className="text-sm font-medium">Programs</span>
                  </Link>
                  
                  {/* The dropdown arrow shows the dropdown menu */}
                  <div 
                    className="cursor-pointer"
                    onMouseEnter={() => setProgramsDropdownOpen(true)}
                    onMouseLeave={() => setProgramsDropdownOpen(false)}
                  >
                    <ChevronDown className="w-3 h-3 hover:text-white/80 transition-colors duration-200" />
                  </div>
                </div>
                
                {/* Dropdown Menu */}
                {programsDropdownOpen && (
                  <div 
                    className="absolute top-full mt-2 w-[500px] -left-[200px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
                    style={{
                      animation: "dropdown-appear 0.25s ease-out forwards"
                    }}
                    onMouseEnter={() => setProgramsDropdownOpen(true)}
                    onMouseLeave={() => setProgramsDropdownOpen(false)}
                  >
                    {/* Menu content remains the same */}
                    <div className="grid grid-cols-2 gap-x-4 p-4">
                      {/* Column content remains unchanged */}
                      <div>
                        <a
                          href="/programs/medical"
                          className="flex items-center px-3 py-3 text-sm text-[#006666] hover:bg-gray-100 rounded-md transition-colors duration-150 group"
                          role="menuitem"
                        >
                          <Heart className="mr-3 text-[#FF6F61] w-5 h-5 group-hover:text-[#FF6F61]/80 transition-colors" />
                          <span className="font-normal">Medical Program</span>
                        </a>
                        <a
                          href="/programs/campaigns"
                          className="flex items-center px-3 py-3 text-sm text-[#006666] hover:bg-gray-100 rounded-md transition-colors duration-150 group"
                          role="menuitem"
                        >
                          <Users className="mr-3 text-[#008080] w-5 h-5 group-hover:text-[#008080]/80 transition-colors" />
                          <span className="font-normal">Campaigns</span>
                        </a>
                        <a
                          href="/programs/sponsorship"
                          className="flex items-center px-3 py-3 text-sm text-[#006666] hover:bg-gray-100 rounded-md transition-colors duration-150 group"
                          role="menuitem"
                        >
                          <Handshake className="mr-3 text-[#E1AD01] w-5 h-5 group-hover:text-[#E1AD01]/80 transition-colors" />
                          <span className="font-normal">Sponsorship</span>
                        </a>
                        <a
                          href="/programs/education"
                          className="flex items-center px-3 py-3 text-sm text-[#006666] hover:bg-gray-100 rounded-md transition-colors duration-150 group"
                          role="menuitem"
                        >
                          <GraduationCap className="mr-3 text-[#800000] w-5 h-5 group-hover:text-[#800000]/80 transition-colors" />
                          <span className="font-normal">Education</span>
                        </a>
                        <a
                          href="/programs/zakat"
                          className="flex items-center px-3 py-3 text-sm text-[#006666] hover:bg-gray-100 rounded-md transition-colors duration-150 group"
                          role="menuitem"
                        >
                          <Calculator className="mr-3 text-[#FFA500] w-5 h-5 group-hover:text-[#FFA500]/80 transition-colors" />
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
                          <Utensils className="mr-3 text-[#008080] w-5 h-5 group-hover:text-[#008080]/80 transition-colors" />
                          <span className="font-normal">Food Program</span>
                        </a>
                        <a
                          href="/programs/wash"
                          className="flex items-center px-3 py-3 text-sm text-[#006666] hover:bg-gray-100 rounded-md transition-colors duration-150 group"
                          role="menuitem"
                        >
                          <Droplet className="mr-3 text-[#FFDE59] w-5 h-5 group-hover:text-[#FFDE59]/80 transition-colors" />
                          <span className="font-normal">WASH Program</span>
                        </a>
                        <a
                          href="/programs/community"
                          className="flex items-center px-3 py-3 text-sm text-[#006666] hover:bg-gray-100 rounded-md transition-colors duration-150 group"
                          role="menuitem"
                        >
                          <Leaf className="mr-3 text-[#FF6F61] w-5 h-5 group-hover:text-[#FF6F61]/80 transition-colors" />
                          <span className="font-normal">Community Resilience</span>
                        </a>
                        <a
                          href="/programs/recovery"
                          className="flex items-center px-3 py-3 text-sm text-[#006666] hover:bg-gray-100 rounded-md transition-colors duration-150 group"
                          role="menuitem"
                        >
                          <Briefcase className="mr-3 text-[#FF6F61] w-5 h-5 group-hover:text-[#FF6F61]/80 transition-colors" />
                          <span className="font-normal">Early Recovery</span>
                        </a>
                        <a
                          href="/programs/sadaka"
                          className="flex items-center px-3 py-3 text-sm text-[#006666] hover:bg-gray-100 rounded-md transition-colors duration-150 group"
                          role="menuitem"
                        >
                          <Building className="mr-3 text-[#008080] w-5 h-5 group-hover:text-[#008080]/80 transition-colors" />
                          <span className="font-normal">Sadaka Jariya</span>
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <Link href="/store" className="flex items-center gap-2 group transition-all duration-200" title="Store">
                <ShoppingCart className="w-5 h-5 group-hover:text-white/80 transition-colors duration-200" />
                <span className="text-sm font-medium group-hover:text-white/80 transition-colors duration-200">Store</span>
              </Link>
              
              <Link href="/volunteer" className="flex items-center gap-2 group transition-all duration-200" title="Volunteer">
                <Users className="w-5 h-5 group-hover:text-white/80 transition-colors duration-200" />
                <span className="text-sm font-medium group-hover:text-white/80 transition-colors duration-200">Volunteer</span>
              </Link>
            </div>
            
            {/* Search and Profile */}
            <div className="flex items-center gap-5">
              <button className="hover:text-white/80 transition-colors duration-200" aria-label="Search" title="Search">
                <Search className="w-5 h-5" />
              </button>
              <AvatarMenu onAuthClick={onAuthModalOpen} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Spacer for desktop to prevent content from being hidden */}
      <div className="h-[79px] hidden lg:block"></div>
      
      {/* Bottom Mobile Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around items-center py-3 lg:hidden z-50">
        <Link href="/" className="flex flex-col items-center text-green-600">
          <Home className="w-5 h-5" />
          <span className="text-xs">Home</span>
        </Link>
        <Link href="/cart" className="flex flex-col items-center text-gray-500">
          <ShoppingCart className="w-5 h-5" />
          <span className="text-xs">Cart</span>
        </Link>
        <Link href="/donate" className="flex flex-col items-center text-gray-500">
          <Heart className="w-5 h-5" />
          <span className="text-xs">Donate</span>
        </Link>
        <button 
          onClick={onAuthModalOpen}
          className="flex flex-col items-center text-gray-500 hover:text-[#09869A]"
        >
          <User className="w-5 h-5" />
          <span className="text-xs">Account</span>
        </button>
        <button 
          onClick={() => setMobileMenuOpen(true)}
          className="flex flex-col items-center text-gray-500"
        >
          <Menu className="w-5 h-5" />
          <span className="text-xs">Menu</span>
        </button>
      </nav>

      {/* Mobile Sidebar Menu */}
      {mobileMenuOpen && (
        <>
          {/* Overlay */}
          <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] lg:hidden" />
          
          {/* Sidebar */}
          <div 
            ref={mobileMenuRef}
            className="fixed inset-y-0 left-0 w-[280px] bg-white z-[70] lg:hidden transform transition-transform duration-300 ease-in-out overflow-y-auto"
          >
            <div className="p-4 border-b flex justify-between items-center">
              <Link href="/">
                <Image 
                  src="/logo-main.svg" 
                  alt="Baris Charity Foundation Logo" 
                  width={120} 
                  height={36} 
                  priority
                />
              </Link>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            
            <div className="py-2">
              <div className="px-4 py-3">
                <p className="text-xs uppercase font-semibold text-gray-500 tracking-wider mb-2">Main Navigation</p>
                <nav className="space-y-1">
                  <Link 
                    href="/" 
                    className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Home className="w-5 h-5 mr-3 text-[#09869A]" />
                    <span>Home</span>
                  </Link>
                  <Link 
                    href="/about" 
                    className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Users className="w-5 h-5 mr-3 text-[#09869A]" />
                    <span>About Us</span>
                  </Link>
                  <Link 
                    href="/programs" 
                    className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FolderKanban className="w-5 h-5 mr-3 text-[#09869A]" />
                    <span>Our Programs</span>
                  </Link>
                  <Link 
                    href="/store" 
                    className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <ShoppingCart className="w-5 h-5 mr-3 text-[#09869A]" />
                    <span>Store</span>
                  </Link>
                  <Link 
                    href="/volunteer" 
                    className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Handshake className="w-5 h-5 mr-3 text-[#09869A]" />
                    <span>Volunteer</span>
                  </Link>
                  <Link 
                    href="/cart" 
                    className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <ShoppingCart className="w-5 h-5 mr-3 text-[#09869A]" />
                    <span>Cart</span>
                  </Link>
                </nav>
              </div>
              
              <div className="border-t my-3"></div>
              
              <div className="px-4 py-3">
                <p className="text-xs uppercase font-semibold text-gray-500 tracking-wider mb-2">Help & Support</p>
                <nav className="space-y-1">
                  <Link 
                    href="/help/faqs" 
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>FAQs</span>
                  </Link>
                  <Link 
                    href="/help/contact" 
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>Contact Us</span>
                  </Link>
                  <Link 
                    href="/help/chat-support" 
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>Chat with Support</span>
                  </Link>
                </nav>
              </div>
              
              <div className="border-t my-3"></div>
              
              <div className="px-4 py-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onAuthModalOpen();
                  }}
                  className="w-full bg-[#09869A] text-white py-2.5 px-4 rounded-md text-center font-medium"
                >
                  Sign In / Register
                </button>
                
                <Link
                  href="/donate"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-3 block w-full bg-[#FA6418] text-white py-2.5 px-4 rounded-md text-center font-medium"
                >
                  Donate Now
                </Link>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Add CSS animation for dropdown */}
      <style jsx global>{`
        @keyframes dropdown-appear {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;