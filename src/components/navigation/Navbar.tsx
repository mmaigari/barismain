"use client"

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import {
  Home,
  ShoppingCart,
  Heart,
  User,
  Menu,
  FolderKanban,
  Users,
  HelpCircle,
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
  X,
  MessageSquare,
  FileText,
  Check
} from "lucide-react";
import AvatarMenu from "@/components/navigation/AvatarMenu";
import { useDonation } from '@/contexts/DonationContext';
import DonationOptionsModal from '@/components/donation/modals/DonationOptionsModal';
import PaymentFeesModal from '@/components/donation/modals/PaymentFeesModal';
import TeamSupportModal from '@/components/donation/modals/TeamSupportModal';
import SignInModal from '@/components/donation/modals/SignInModal';
import GuestContinueModal from '@/components/donation/modals/GuestContinueModal';
import PaymentMethodModal from '@/components/donation/modals/PaymentMethodModal';
import ConfirmationModal from '@/components/donation/modals/ConfirmationModal';

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
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const currencyDropdownRef = useRef<HTMLDivElement>(null);
  const languageDropdownRef = useRef<HTMLDivElement>(null);
  const [logoAnimated, setLogoAnimated] = useState(false);
  const [showPageTitle, setShowPageTitle] = useState(false);
  const [helpSubmenuOpen, setHelpSubmenuOpen] = useState(false);
  const pathname = usePathname();
  const { currentModal, setCurrentModal, setProgramName, currency, setCurrency } = useDonation();
  
  const aboutDropdownTimeout = useRef<NodeJS.Timeout | null>(null);
  const helpDropdownTimeout = useRef<NodeJS.Timeout | null>(null);
  const currencyDropdownTimeout = useRef<NodeJS.Timeout | null>(null);
  const languageDropdownTimeout = useRef<NodeJS.Timeout | null>(null);
  const programsDropdownTimeout = useRef<NodeJS.Timeout | null>(null);
  
  const handleAboutDropdownEnter = () => {
    if (aboutDropdownTimeout.current) {
      clearTimeout(aboutDropdownTimeout.current);
      aboutDropdownTimeout.current = null;
    }
    setAboutDropdownOpen(true);
  };
  
  const handleAboutDropdownLeave = () => {
    aboutDropdownTimeout.current = setTimeout(() => {
      setAboutDropdownOpen(false);
    }, 300);
  };
  
  const handleHelpDropdownEnter = () => {
    if (helpDropdownTimeout.current) {
      clearTimeout(helpDropdownTimeout.current);
      helpDropdownTimeout.current = null;
    }
    setHelpDropdownOpen(true);
  };
  
  const handleHelpDropdownLeave = () => {
    helpDropdownTimeout.current = setTimeout(() => {
      setHelpDropdownOpen(false);
    }, 300);
  };
  
  const handleCurrencyDropdownEnter = () => {
    if (currencyDropdownTimeout.current) {
      clearTimeout(currencyDropdownTimeout.current);
      currencyDropdownTimeout.current = null;
    }
    setCurrencyDropdownOpen(true);
  };
  
  const handleCurrencyDropdownLeave = () => {
    currencyDropdownTimeout.current = setTimeout(() => {
      setCurrencyDropdownOpen(false);
    }, 300);
  };
  
  const handleLanguageDropdownEnter = () => {
    if (languageDropdownTimeout.current) {
      clearTimeout(languageDropdownTimeout.current);
      languageDropdownTimeout.current = null;
    }
    setLanguageDropdownOpen(true);
  };
  
  const handleLanguageDropdownLeave = () => {
    languageDropdownTimeout.current = setTimeout(() => {
      setLanguageDropdownOpen(false);
    }, 300);
  };
  
  const handleProgramsDropdownEnter = () => {
    if (programsDropdownTimeout.current) {
      clearTimeout(programsDropdownTimeout.current);
      programsDropdownTimeout.current = null;
    }
    setProgramsDropdownOpen(true);
  };
  
  const handleProgramsDropdownLeave = () => {
    programsDropdownTimeout.current = setTimeout(() => {
      setProgramsDropdownOpen(false);
    }, 300);
  };
  
  useEffect(() => {
    return () => {
      if (aboutDropdownTimeout.current) clearTimeout(aboutDropdownTimeout.current);
      if (helpDropdownTimeout.current) clearTimeout(helpDropdownTimeout.current);
      if (currencyDropdownTimeout.current) clearTimeout(currencyDropdownTimeout.current);
      if (languageDropdownTimeout.current) clearTimeout(languageDropdownTimeout.current);
      if (programsDropdownTimeout.current) clearTimeout(programsDropdownTimeout.current);
    };
  }, []);

  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY > 100) {
        if (window.scrollY > lastScrollY) {
          setHideTopNav(true);
        } else {
          setHideTopNav(false);
        }
        setShowPageTitle(true);
      } else {
        setHideTopNav(false);
        setShowPageTitle(false);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', controlNavbar);
    
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

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
      if (currencyDropdownRef.current && !currencyDropdownRef.current.contains(event.target as Node)) {
        setCurrencyDropdownOpen(false);
      }
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target as Node)) {
        setLanguageDropdownOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef, aboutDropdownRef, helpDropdownRef, mobileMenuRef, currencyDropdownRef, languageDropdownRef]);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setLogoAnimated(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const topNavHeight = 36;

  const currencies = [
    { code: "USD", name: "US Dollar", symbol: "$" },
    { code: "EUR", name: "Euro", symbol: "€" },
    { code: "GBP", name: "British Pound", symbol: "£" },
    { code: "SAR", name: "Saudi Riyal", symbol: "﷼" },
    { code: "NGN", name: "Nigerian Naira", symbol: "₦" }
  ];

  const languages = [
    { code: "en", name: "English" },
    { code: "ha", name: "Hausa" },
    { code: "ar", name: "العربية", nameEn: "Arabic" }
  ];

  const primaryCurrencies = [
    { code: "USD", name: "US Dollar", symbol: "$" },
    { code: "NGN", name: "Nigerian Naira", symbol: "₦" }
  ];

  const getPageTitle = (path: string) => {
    if (path === '/') return 'Home';
    if (path.startsWith('/programs')) return 'Our Programs';
    if (path.startsWith('/about')) return 'About Us';
    if (path.startsWith('/volunteer')) return 'Volunteer';
    if (path.startsWith('/store')) return 'Charity Store';
    if (path.startsWith('/donate')) return 'Donate';
    if (path.startsWith('/cart')) return 'Your Cart';
    if (path.startsWith('/help')) return 'Help & Support';
    
    return path.substring(1).charAt(0).toUpperCase() + path.substring(2);
  };

  const handleDonateClick = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setProgramName("General Donation");
    setCurrentModal('donationOptions');
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  const handleCurrencyChange = (newCurrency: 'USD' | 'NGN') => {
    console.log('Setting currency to:', newCurrency);
    setCurrency(newCurrency);
    setCurrencyDropdownOpen(false);
    localStorage.setItem('bcf-preferred-currency', newCurrency);
  };

  return (
    <>
      <div className={`fixed top-0 left-0 right-0 bg-white border-b shadow-sm h-16 flex items-center z-50 lg:hidden ${pathname === '/help' ? 'bg-transparent border-none shadow-none' : ''}`}>
        <div className="w-16 flex items-center justify-center">
        </div>
        
        <div className="flex-1 flex justify-center items-center">
          <Link href="/" className="inline-block">
            <div className={`overflow-hidden ${pathname === '/help' ? 'opacity-0' : ''}`}>
              <Image 
                src="/logo-main2.svg" 
                alt="Bariş Charity Foundation Logo" 
                width={120} 
                height={36} 
                priority
                className={`h-auto transform transition-all duration-700 ${
                  logoAnimated 
                    ? "translate-y-0 opacity-100" 
                    : "translate-y-5 opacity-0"
                }`}
              />
            </div>
          </Link>
        </div>
        
        <div className="w-16 flex items-center justify-center">
        </div>
      </div>

      <div className="h-16 lg:hidden"></div>

      <div className="fixed w-full top-0 z-50 hidden lg:block">
        <div 
          className={`bg-[#f1f2f2] border-b transition-all duration-300 ease-in-out ${
            hideTopNav ? '-translate-y-full' : 'translate-y-0'
          }`}
          style={{ 
            height: `${topNavHeight}px`, 
            position: 'relative',
            zIndex: 60
          }}
        >
          <div className="container mx-auto px-8 h-full flex justify-between items-center">
            <div className="flex items-center gap-8">
              <div className="flex gap-6 text-sm font-medium">
                <div 
                  className="relative" 
                  ref={aboutDropdownRef}
                  onMouseEnter={handleAboutDropdownEnter}
                  onMouseLeave={handleAboutDropdownLeave}
                >
                  <div className="flex items-center text-[#09869A] hover:text-[#09869A]/80 transition-colors duration-200">
                    <Link href="/about" className="hover:text-[#09869A]/80 transition-colors">
                      <span>About</span>
                    </Link>
                    
                    <button 
                      onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                      className="ml-1 focus:outline-none"
                    >
                      <ChevronDown className="w-3 h-3 opacity-70" />
                    </button>
                  </div>
                  
                  {aboutDropdownOpen && (
                    <div 
                      className="absolute top-full left-0 mt-0.5 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
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
                  onMouseEnter={handleHelpDropdownEnter}
                  onMouseLeave={handleHelpDropdownLeave}
                >
                  <div className="flex items-center text-[#09869A] hover:text-[#09869A]/80 transition-colors duration-200">
                    <Link href="/help" className="hover:text-[#09869A]/80 transition-colors">
                      <span>Help</span>
                    </Link>
                    
                    <button 
                      onClick={() => setHelpDropdownOpen(!helpDropdownOpen)}
                      className="ml-1 focus:outline-none"
                    >
                      <ChevronDown className="w-3 h-3 opacity-70" />
                    </button>
                  </div>
                  
                  {helpDropdownOpen && (
                    <div 
                      className="absolute top-full left-0 mt-0.5 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
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
                <a href="/help/donation-guide" className="text-[#09869A] hover:text-[#09869A]/80 transition-colors duration-200" title="Donation Information">How to donate?</a>
                <a href="/about/transparency" className="text-[#09869A] hover:text-[#09869A]/80 transition-colors duration-200" title="Transparency Reports">Transparency</a>
              </div>
            </div>
            
            <div className="flex items-center gap-6 text-sm">
              <a href="/help/contact" className="flex items-center gap-1.5 text-[#09869A] hover:text-[#09869A]/80 transition-colors duration-200" title="Contact Us">
                <Phone className="w-4 h-4" />
                <span>Contact</span>
              </a>

              <div 
                className="relative"
                ref={languageDropdownRef}
                onMouseEnter={handleLanguageDropdownEnter}
                onMouseLeave={handleLanguageDropdownLeave}
              >
                <div 
                  className="flex items-center gap-1.5 cursor-pointer text-[#09869A] hover:text-[#09869A]/80 transition-colors duration-200 group"
                  onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
                  title="Change Language"
                >
                  <Globe className="w-4 h-4" />
                  <span>English</span>
                  <ChevronDown className="w-3 h-3 opacity-70 group-hover:opacity-100 transition-opacity" />
                </div>
                
                {languageDropdownOpen && (
                  <div 
                    className="absolute top-full right-0 mt-0.5 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                    style={{ 
                      zIndex: 9999,
                      position: 'absolute',
                      animation: "dropdown-appear 0.25s ease-out forwards"
                    }}
                  >
                    <div className="py-2">
                      {languages.map(lang => (
                        <button
                          key={lang.code}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center justify-between"
                          onClick={() => {
                            setLanguageDropdownOpen(false);
                          }}
                        >
                          <span>{lang.name}</span>
                          {lang.nameEn && lang.code !== "en" && (
                            <span className="text-gray-400 text-xs">{lang.nameEn}</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div 
                className="relative"
                ref={currencyDropdownRef}
                onMouseEnter={handleCurrencyDropdownEnter}
                onMouseLeave={handleCurrencyDropdownLeave}
              >
                <div 
                  className="flex items-center gap-1.5 cursor-pointer text-[#09869A] hover:text-[#09869A]/80 transition-colors duration-200 group" 
                  onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                  title="Change Currency"
                >
                  <DollarSign className="w-4 h-4" />
                  <span>{currency === 'USD' ? 'US Dollar' : 'Nigerian Naira'}</span>
                  <ChevronDown className="w-3 h-3 opacity-70 group-hover:opacity-100 transition-opacity" />
                </div>
                
                {currencyDropdownOpen && (
                  <div 
                    className="absolute top-full right-0 mt-0.5 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                    style={{ 
                      zIndex: 9999,
                      position: 'absolute',
                      animation: "dropdown-appear 0.25s ease-out forwards"
                    }}
                  >
                    <div className="py-2">
                      {primaryCurrencies.map(curr => (
                        <button
                          key={curr.code}
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center ${
                            currency === curr.code ? 'bg-gray-50 text-[#09869A] font-medium' : 'text-gray-700'
                          }`}
                          onClick={() => handleCurrencyChange(curr.code as 'USD' | 'NGN')}
                        >
                          <span className="w-8">{curr.symbol}</span>
                          <span className="ml-2">{curr.name}</span>
                          <span className="ml-auto text-gray-400">{curr.code}</span>
                          {currency === curr.code && (
                            <Check className="w-4 h-4 ml-2 text-[#09869A]" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div 
          className={`bg-[#09869A] text-white transition-all duration-300 ease-in-out`}
          style={{ 
            transform: hideTopNav ? 'translateY(-' + topNavHeight + 'px)' : 'translateY(0)',
            zIndex: 20,
            position: 'relative'
          }}
        >
          <div className="container mx-auto px-8 py-3 flex justify-between items-center">
            <div className="flex items-center overflow-hidden">
              {!showPageTitle ? (
                <Link href="/" legacyBehavior>
                  <a className="transform transition-all duration-500">
                    <Image 
                      src="/logo-main.svg" 
                      alt="Bariş Charity Foundation Logo" 
                      width={130} 
                      height={40} 
                      className="h-auto"
                      priority
                    />
                  </a>
                </Link>
              ) : (
                <div className="text-white font-medium transform transition-all duration-500">
                  {getPageTitle(pathname ?? '/')}
                </div>
              )}
            </div>
            
            <div className="flex gap-10">
              <Link href="/" className="flex items-center gap-2 group transition-all duration-200" title="Home">
                <Home className="w-5 h-5 group-hover:text-white/80 transition-colors duration-200" />
                <span className="text-sm font-medium group-hover:text-white/80 transition-colors duration-200">Home</span>
              </Link>
              
              <div className="relative" 
                ref={programsDropdownRef}
                onMouseEnter={handleProgramsDropdownEnter}
                onMouseLeave={handleProgramsDropdownLeave}>
                <div className="flex items-center gap-2">
                  <Link href="/programs" className="flex items-center gap-2 hover:text-white/80 transition-colors duration-200">
                    <FolderKanban className="w-5 h-5" />
                    <span className="text-sm font-medium">Programs</span>
                  </Link>
                  
                  <div 
                    className="cursor-pointer"
                    onMouseEnter={() => setProgramsDropdownOpen(true)}
                    onMouseLeave={() => setProgramsDropdownOpen(false)}
                  >
                    <ChevronDown className="w-3 h-3 hover:text-white/80 transition-colors duration-200" />
                  </div>
                </div>
                
                {programsDropdownOpen && (
                  <div 
                    className="absolute top-full mt-2 w-[500px] -left-[200px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
                    style={{
                      animation: "dropdown-appear 0.25s ease-out forwards"
                    }}
                    onMouseEnter={() => setProgramsDropdownOpen(true)}
                    onMouseLeave={() => setProgramsDropdownOpen(false)}
                  >
                    <div className="grid grid-cols-2 gap-x-4 p-4">
                      <div>
                        <Link
                          href="/programs/medical"
                          className="flex items-center px-3 py-3 text-sm text-[#006666] hover:bg-gray-100 rounded-md transition-colors duration-150 group"
                          role="menuitem"
                        >
                          <Heart className="mr-3 text-[#FF6F61] w-5 h-5 group-hover:text-[#FF6F61]/80 transition-colors" />
                          <span className="font-normal">Medical Program</span>
                        </Link>
                        <Link
                          href="/programs/campaigns"
                          className="flex items-center px-3 py-3 text-sm text-[#006666] hover:bg-gray-100 rounded-md transition-colors duration-150 group"
                          role="menuitem"
                        >
                          <Users className="mr-3 text-[#008080] w-5 h-5 group-hover:text-[#008080]/80 transition-colors" />
                          <span className="font-normal">Campaigns</span>
                        </Link>
                        <Link
                          href="/programs/sponsorship"
                          className="flex items-center px-3 py-3 text-sm text-[#006666] hover:bg-gray-100 rounded-md transition-colors duration-150 group"
                          role="menuitem"
                        >
                          <Handshake className="mr-3 text-[#E1AD01] w-5 h-5 group-hover:text-[#E1AD01]/80 transition-colors" />
                          <span className="font-normal">Sponsorship</span>
                        </Link>
                        <Link
                          href="/programs/education"
                          className="flex items-center px-3 py-3 text-sm text-[#006666] hover:bg-gray-100 rounded-md transition-colors duration-150 group"
                          role="menuitem"
                        >
                          <GraduationCap className="mr-3 text-[#800000] w-5 h-5 group-hover:text-[#800000]/80 transition-colors" />
                          <span className="font-normal">Education</span>
                        </Link>
                        <Link
                          href="/programs/zakat"
                          className="flex items-center px-3 py-3 text-sm text-[#006666] hover:bg-gray-100 rounded-md transition-colors duration-150 group"
                          role="menuitem"
                        >
                          <Calculator className="mr-3 text-[#FFA500] w-5 h-5 group-hover:text-[#FFA500]/80 transition-colors" />
                          <span className="font-normal">Zakat</span>
                        </Link>
                      </div>
                      
                      <div>
                        <Link
                          href="/programs/food"
                          className="flex items-center px-3 py-3 text-sm text-[#006666] hover:bg-gray-100 rounded-md transition-colors duration-150 group"
                          role="menuitem"
                        >
                          <Utensils className="mr-3 text-[#008080] w-5 h-5 group-hover:text-[#008080]/80 transition-colors" />
                          <span className="font-normal">Food Program</span>
                        </Link>
                        <Link
                          href="/programs/wash"
                          className="flex items-center px-3 py-3 text-sm text-[#006666] hover:bg-gray-100 rounded-md transition-colors duration-150 group"
                          role="menuitem"
                        >
                          <Droplet className="mr-3 text-[#FFDE59] w-5 h-5 group-hover:text-[#FFDE59]/80 transition-colors" />
                          <span className="font-normal">WASH Program</span>
                        </Link>
                        <Link
                          href="/programs/community"
                          className="flex items-center px-3 py-3 text-sm text-[#006666] hover:bg-gray-100 rounded-md transition-colors duration-150 group"
                          role="menuitem"
                        >
                          <Leaf className="mr-3 text-[#FF6F61] w-5 h-5 group-hover:text-[#FF6F61]/80 transition-colors" />
                          <span className="font-normal">Community Resilience</span>
                        </Link>
                        <Link
                          href="/programs/recovery"
                          className="flex items-center px-3 py-3 text-sm text-[#006666] hover:bg-gray-100 rounded-md transition-colors duration-150 group"
                          role="menuitem"
                        >
                          <Briefcase className="mr-3 text-[#FF6F61] w-5 h-5 group-hover:text-[#FF6F61]/80 transition-colors" />
                          <span className="font-normal">Early Recovery</span>
                        </Link>
                        <Link
                          href="/programs/sadaka"
                          className="flex items-center px-3 py-3 text-sm text-[#006666] hover:bg-gray-100 rounded-md transition-colors duration-150 group"
                          role="menuitem"
                        >
                          <Building className="mr-3 text-[#008080] w-5 h-5 group-hover:text-[#008080]/80 transition-colors" />
                          <span className="font-normal">Sadaka Jariya</span>
                        </Link>
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
                <Handshake className="w-5 h-5 group-hover:text-white/80 transition-colors duration-200" />
                <span className="text-sm font-medium group-hover:text-white/80 transition-colors duration-200">Volunteer</span>
              </Link>
            </div>
            
            <div className="flex items-center gap-5">
              <button className="hover:text-white/80 transition-colors duration-200" aria-label="Search" title="Search">
                <Search className="w-5 h-5" />
              </button>
              <AvatarMenu onAuthClick={onAuthModalOpen} />
            </div>
          </div>
        </div>
      </div>
      
      <div className="h-[79px] hidden lg:block"></div>
      
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around items-center py-3 lg:hidden z-50">
        <Link href="/" className="flex flex-col items-center text-green-600">
          <Home className="w-5 h-5" />
          <span className="text-xs">Home</span>
        </Link>
        <Link href="/cart" className="flex flex-col items-center text-gray-500">
          <ShoppingCart className="w-5 h-5" />
          <span className="text-xs">Cart</span>
        </Link>
        <button 
          onClick={handleDonateClick}
          className="flex flex-col items-center text-gray-500 hover:text-[#FA6418] transition-colors"
        >
          <Heart className="w-5 h-5" />
          <span className="text-xs">Donate</span>
        </button>
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

      <div 
        className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out lg:hidden ${
          mobileMenuOpen ? 'opacity-50 z-[60]' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      <div 
        ref={mobileMenuRef}
        className={`fixed inset-y-0 left-0 w-[280px] bg-white z-[70] lg:hidden transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 border-b flex justify-between items-center">
            <div className="flex items-center gap-3">
            <div className="relative">
              <button 
              className="flex items-center gap-1 text-[#09869A] text-sm"
              onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
              >
              <Globe className="w-4 h-4" />
              <span>EN</span>
              <ChevronDown className="w-3 h-3" />
              </button>
              
              {languageDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                <div className="py-1">
                {languages.map(lang => (
                  <button
                  key={lang.code}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center justify-between"
                  onClick={() => {
                    setLanguageDropdownOpen(false);
                  }}
                  >
                  <span>{lang.name}</span>
                  {lang.nameEn && lang.code !== "en" && (
                    <span className="text-gray-400 text-xs">{lang.nameEn}</span>
                  )}
                  </button>
                ))}
                </div>
              </div>
              )}
            </div>
            
            <div className="relative">
              <button 
              className="flex items-center gap-1 text-[#09869A] text-sm"
              onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
              >
              <DollarSign className="w-4 h-4" />
              <span>USD</span>
              <ChevronDown className="w-3 h-3" />
              </button>
              
              {currencyDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 max-h-64 overflow-y-auto">
                <div className="py-1">
                {primaryCurrencies.map((curr) => (
                  <button
                    key={curr.code}
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 flex items-center ${
                      currency === curr.code ? 'text-[#09869A] font-medium' : 'text-gray-700'
                    }`}
                    onClick={() => {
                      // Update to call the same handler as desktop version
                      handleCurrencyChange(curr.code as 'USD' | 'NGN');
                      setCurrencyDropdownOpen(false);
                    }}
                  >
                    <span className="w-8">{curr.symbol}</span>
                    <span className="ml-2">{curr.name}</span>
                    {currency === curr.code && (
                      <Check className="w-4 h-4 ml-auto text-[#09869A]" />
                    )}
                  </button>
                ))}
                </div>
              </div>
              )}
            </div>
            </div>
            <button 
            onClick={() => setMobileMenuOpen(false)}
            className="p-1 rounded-full hover:bg-gray-100"
            >
            <X className="w-6 h-6 text-gray-500" />
            </button>
      
        </div>
        
        <div className="px-4 py-3">
          <p className="text-xs uppercase font-semibold text-gray-500 tracking-wider mb-2">Quick Access</p>
          <nav className="space-y-1">
            <Link 
              href="/how-to-donate" 
              className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              <DollarSign className="w-5 h-5 mr-3 text-[#FF6F61]" />
              <span>How to Donate</span>
            </Link>
            <Link 
              href="/help/contact" 
              className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              <MessageSquare className="w-5 h-5 mr-3 text-[#FF6F61]" />
              <span>Support</span>
            </Link>
            <Link 
              href="/about/transparency" 
              className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FileText className="w-5 h-5 mr-3 text-[#FF6F61]" />
              <span>Transparency</span>
            </Link>
          </nav>
        </div>

        <div className="border-t my-3"></div>

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
                href="/programs" 
                className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FolderKanban className="w-5 h-5 mr-3 text-[#09869A]" />
                <span>Programs</span>
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
           
            </nav>
          </div>
          
          <div className="border-t my-3"></div>
          
          <div className="px-4 py-3">
            <p className="text-xs uppercase font-semibold text-gray-500 tracking-wider mb-2">Help & Support</p>
            <nav className="space-y-1">
              <Link
                href="/about"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Users className="w-5 h-5 mr-3 text-[#09869A]" />
                <span>About Us</span> 
              </Link>
              <Link 
                href="/help" 
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                <HelpCircle className="w-5 h-5 mr-3 text-[#09869A]" />
                <span>Help Center</span>
              </Link>

         
            </nav>
          </div>
          
          <div className="border-t my-3"></div>
          
      
        </div>
      </div>

      {currentModal === 'donationOptions' && <DonationOptionsModal />}
      {currentModal === 'paymentFees' && <PaymentFeesModal />}
      {currentModal === 'teamSupport' && <TeamSupportModal />}
      {currentModal === 'signIn' && <SignInModal />}
      {currentModal === 'guestContinue' && <GuestContinueModal />}
      {currentModal === 'paymentMethod' && <PaymentMethodModal />}
      {currentModal === 'confirmation' && <ConfirmationModal />}

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
        
        @keyframes logo-pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideDown {
          animation: slideDown 0.2s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default Navbar;