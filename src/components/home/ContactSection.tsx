import Link from 'next/link';
import { FaPhone, FaEnvelope } from 'react-icons/fa';

const ContactSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Contact Us Card */}
          <div className="rounded-xl overflow-hidden relative bg-[#17c5ce] shadow-lg">
            {/* Decorative leaf overlay */}
            <div className="absolute inset-0 opacity-20">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path fill="white" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,88.5,-0.9C87,14.6,81.4,29.2,72.6,41C63.9,52.8,52.2,61.9,39.1,67.4C26,72.8,13,74.7,-0.4,75.3C-13.7,76,-27.4,75.3,-39.9,70.1C-52.4,64.9,-63.6,55,-70.3,42.6C-77,30.3,-79.1,15.1,-78.3,0.5C-77.4,-14.1,-73.6,-28.1,-66.6,-41C-59.7,-53.8,-49.7,-65.5,-37.5,-73.3C-25.3,-81.1,-12.6,-85.1,1,-86.8C14.7,-88.5,29.4,-85.8,44.7,-76.4Z" transform="translate(100 100)" />
              </svg>
            </div>
            
            <div className="px-8 py-12 relative z-10 flex flex-col items-center text-center">
              <div className="bg-white/20 rounded-full p-6 mb-6">
                <FaPhone className="text-white text-3xl" />
              </div>
              
              <h3 className="text-white font-bold text-2xl md:text-3xl mb-4">
                Contact Us
              </h3>
              
              <p className="text-white/90 mb-8 max-w-sm">
                All available methods of communication with the Baris Charity Foundation.
              </p>
              
              <Link 
                href="/contact"
                className="bg-white hover:bg-white/90 text-[#09869A] font-medium py-3 px-6 rounded-full transition-colors shadow-md inline-block"
              >
                See Contact Options
              </Link>
            </div>
          </div>
          
          {/* Subscribe Card */}
          <div className="rounded-xl overflow-hidden relative bg-[#09869A] shadow-lg">
            <div className="px-8 py-12 relative z-10 flex flex-col items-center text-center">
              <div className="bg-white/20 rounded-full p-6 mb-6">
                <FaEnvelope className="text-white text-3xl" />
              </div>
              
              <h3 className="text-white font-bold text-2xl md:text-3xl mb-4">
                Subscribe To Our Newsletter
              </h3>
              
              <p className="text-white/90 mb-8 max-w-sm">
                Subscribe to Baris Charity Foundation's newsletter for updates on our projects, success stories, and ways to get involved!
              </p>
              
              <Link 
                href="/subscribe"
                className="bg-[#17c5ce] hover:bg-[#267A4D] text-white font-medium py-3 px-6 rounded-full transition-colors shadow-md inline-block"
              >
                Subscribe
              </Link>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default ContactSection;