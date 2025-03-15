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
                alt="Bariş Charity Foundation" 
                width={140} 
                height={45}
                className="brightness-0 invert" 
              />
            </div>
      
           
          </div>
          
          {/* Quick Links - Spread across in multiple columns */}
          <div>
            <h3 className="text-white text-lg font-bold mb-6">Quick Links</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-3">
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
          </div>
        </div>
      </div>
      
      {/* Bottom Footer */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0 text-sm">
              © 2025 Bariş Charity Foundation. All rights reserved.
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;