import Image from 'next/image';
import Link from 'next/link';
import { 
  FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaLinkedinIn,
  FaMapMarkerAlt, FaPhone, FaEnvelope, FaIdCard, FaHeart 
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#202630] text-gray-300">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
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
            <p className="mb-6 text-sm leading-relaxed">
              Baris Charity Foundation is dedicated to providing humanitarian aid, education, and sustainable solutions to communities in need around the world.
            </p>
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
          
          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: 'Home', path: '/' },
                { name: 'About Us', path: '/about' },
                { name: 'Programs', path: '/programs' },
                { name: 'Campaigns', path: '/campaigns' },
                { name: 'Volunteer', path: '/volunteer' },
                { name: 'Store', path: '/store' },
                { name: 'Blog', path: '/blog' },
                { name: 'Contact', path: '/contact' }
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.path} 
                    className="text-sm hover:text-white hover:translate-x-1 transition-all flex items-center"
                  >
                    <span className="text-[#FA6418] mr-2">›</span> {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Our Programs */}
          <div>
            <h3 className="text-white text-lg font-bold mb-6">Our Programs</h3>
            <ul className="space-y-3">
              {[
                { name: 'Medical Program', path: '/programs/medical' },
                { name: 'WASH Program', path: '/programs/wash' },
                { name: 'Education', path: '/programs/education' },
                { name: 'Food Program', path: '/programs/food' },
                { name: 'Zakat', path: '/programs/zakat' },
                { name: 'Sponsorship', path: '/programs/sponsorship' },
                { name: 'Community Resilience', path: '/programs/community' },
                { name: 'Sadaka Jariya', path: '/programs/sadaka' }
              ].map((program) => (
                <li key={program.name}>
                  <Link 
                    href={program.path} 
                    className="text-sm hover:text-white hover:translate-x-1 transition-all flex items-center"
                  >
                    <span className="text-[#FA6418] mr-2">›</span> {program.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Us */}
          <div>
            <h3 className="text-white text-lg font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-3 text-[#FA6418]" />
                <span className="text-sm">No. 22, Gidan Baba Dan masani, Unity Road, Kano State</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-3 text-[#FA6418]" />
                <a href="tel:+2349021551584" className="text-sm hover:text-white transition-colors">
                  +234 902 155 1584
                </a>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-3 text-[#FA6418]" />
                <a href="mailto:info@barischarity.org" className="text-sm hover:text-white transition-colors">
                  info@barischarity.org
                </a>
              </li>
              <li className="flex items-center">
                <FaIdCard className="mr-3 text-[#FA6418]" />
                <span className="text-sm">Registration IT-155156</span>
              </li>
            </ul>
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
            
            <div className="flex items-center mb-4 md:mb-0 text-sm">
              <span className="mx-2">Made with</span>
              <FaHeart className="text-[#FA6418] mx-1" />
              <span className="mx-2">for those in need</span>
            </div>
            
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