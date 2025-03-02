import React from 'react';
import Image from 'next/image';
import { FaUserTie, FaLinkedinIn, FaTwitter, FaInstagram } from 'react-icons/fa';

const AboutStructure = () => {
  // Sample team data with social media links
  const directors = [
    {
      name: "Mus'ab Yusuf Abdullahi",
      title: "Chairman",
      image: "/images/team/musab.jpg", // Replace with actual image path
      linkedin: "https://linkedin.com/in/musab-yusuf",
      twitter: "https://twitter.com/musabyusuf",
      instagram: "https://instagram.com/musabyusuf"
    },
    {
      name: "Ahmad Hussaini Yusuf",
      title: "Fundraising & Development Lead",
      image: "/images/team/ahmad.jpg", // Replace with actual image path
      linkedin: "https://linkedin.com/in/ahmad-hussaini",
      twitter: "https://twitter.com/ahmadhussaini",
      instagram: "https://instagram.com/ahmadhussaini"
    },
    {
      name: "Mohammed Al-Rachid",
      title: "Strategic Planning Director",
      image: "/images/team/mohammed.jpg", // Replace with actual image path
      linkedin: "https://linkedin.com/in/mohammed-alrachid",
      twitter: "https://twitter.com/mohammedalrachid",
      instagram: "https://instagram.com/mohammedalrachid"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="font-montserrat text-4xl md:text-5xl font-bold text-[#09869a] mb-4">
            Our Structure
          </h2>
          <div className="w-24 h-1.5 bg-[#FA6418] mx-auto rounded-full"></div>
          <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
            Baris Charity Foundation operates with a clear organizational structure that ensures accountability, efficiency, and focused impact.
          </p>
        </div>
        
        {/* Organizational structure content goes here */}
        <div className="bg-white rounded-xl p-8 shadow-md border border-[#09869a]/10">
          {/* Structure details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              {/* Board of Directors */}
              <h3 className="text-2xl font-bold text-[#09869a] mb-4">Board of Directors</h3>
              <p className="text-gray-700 mb-6">
                Our board provides strategic oversight and ensures alignment with our mission and vision.
              </p>
              
              {/* Executive Team */}
              <h3 className="text-2xl font-bold text-[#09869a] mb-4">Executive Team</h3>
              <p className="text-gray-700 mb-6">
                Led by our Chief Executive Officer, this team manages daily operations and program implementation.
              </p>
            </div>
            
            <div>
              {/* Program Teams */}
              <h3 className="text-2xl font-bold text-[#09869a] mb-4">Program Teams</h3>
              <p className="text-gray-700 mb-6">
                Specialized teams focus on our key program areas, ensuring expert delivery and continuous improvement.
              </p>
              
              {/* Support Functions */}
              <h3 className="text-2xl font-bold text-[#09869a] mb-4">Support Functions</h3>
              <p className="text-gray-700">
                These include Finance, Human Resources, Communications, and Donor Relations teams that ensure smooth operations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutStructure;