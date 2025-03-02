import Image from 'next/image';
import Link from 'next/link';
import { 
  FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaLinkedinIn,
  FaHeart 
} from 'react-icons/fa';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Programs', path: '/programs' },
    { name: 'Campaigns', path: '/campaigns' },
    { name: 'Volunteer', path: '/volunteer' },
    { name: 'Store', path: '/store' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <footer className="bg-[#202630] text-gray-300">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Organization Info */}
          <div>
            <div className="mb-6">
              <Image 
                src="/logo-main.svg" 
                alt="Baris Charity Foundation" 
                width={140} 
                height={45}
                className="brightness-0 invert" // Make logo white
              />
            </div>
      
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="hover:text-white transition-colors" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com" className="hover:text-white transition-colors" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" className="hover:text-white transition-colors" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="https://youtube.com" className="hover:text-white transition-colors" aria-label="YouTube">
                <FaYoutube />
              </a>
              <a href="https://linkedin.com" className="hover:text-white transition-colors" aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
          
          {/* Quick Links - Spread across in multiple columns */}
          <div>
            <h3 className="text-white text-lg font-bold mb-6">Quick Links</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-3">
              {quickLinks.map((link) => (
                <div key={link.name}>
                  <Link 
                    href={link.path} 
                    className="text-sm hover:text-white hover:translate-x-1 transition-all flex items-center"
                  >
                    <span className="text-[#FA6418] mr-2">›</span> {link.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Footer */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0 text-sm">
              © 2025 Baris Charity Foundation. All rights reserved.
            </div>
            
            {/* Privacy Policy, Terms of Use, Donate Now */}        
            <div className="flex items-center space-x-4">
              <Link href="/privacy-policy" className="text-xs hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <span className="text-gray-500">|</span>
              <Link href="/terms" className="text-xs hover:text-white transition-colors">
                Terms of Use
              </Link>
              <Link 
                href="/donate" 
                className="ml-4 bg-[#FA6418] hover:bg-[#E45A16] text-white py-2 px-4 rounded-md font-medium transition-colors flex items-center"
              >
                <FaHeart className="mr-2" /> Donate Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;