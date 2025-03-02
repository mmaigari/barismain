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
  Building
} from "lucide-react";
import AvatarMenu from "@/components/navigation/AvatarMenu";

interface NavbarProps {
  onAuthModalOpen: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onAuthModalOpen }) => {
  const [programsDropdownOpen, setProgramsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hideTopNav, setHideTopNav] = useState(false);
  
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
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

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
          style={{ height: `${topNavHeight}px` }}
        >
          <div className="container mx-auto px-8 h-full flex justify-between items-center">
            {/* Left side - Logo and links */}
            <div className="flex items-center gap-8">
              <div className="flex gap-6 text-sm font-medium">
                <Link href="/about" className="text-[#09869A] hover:text-[#09869A]/80 transition-colors duration-200" title="About Us">About</Link>
                <a href="#help" className="text-[#09869A] hover:text-[#09869A]/80 transition-colors duration-200" title="Help Center">Help</a>
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
            zIndex: 20
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
              
              {/* Programs with Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button 
                  className="flex items-center gap-2 group transition-all duration-200"
                  onClick={() => setProgramsDropdownOpen(!programsDropdownOpen)}
                  aria-expanded={programsDropdownOpen}
                  aria-haspopup="true"
                  title="Programs"
                >
                  <FolderKanban className="w-5 h-5 group-hover:text-white/80 transition-colors duration-200" />
                  <span className="text-sm font-medium group-hover:text-white/80 transition-colors duration-200">Programs</span>
                  <ChevronDown className="w-3 h-3 ml-1 group-hover:text-white/80 transition-colors duration-200" />
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
        <Link href="/signin" className="flex flex-col items-center text-gray-500">
          <User className="w-5 h-5" />
          <span className="text-xs">Sign In</span>
        </Link>
        <button className="flex flex-col items-center text-gray-500">
          <Menu className="w-5 h-5" />
          <span className="text-xs">Menu</span>
        </button>
      </nav>

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