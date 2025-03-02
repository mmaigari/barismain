import React from 'react';
import Image from 'next/image';
import { FaUsers, FaUserTie, FaClipboardList, FaLinkedinIn, FaTwitter, FaInstagram } from 'react-icons/fa';

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
            Our Team
          </h2>
          <div className="w-24 h-1.5 bg-[#FA6418] mx-auto rounded-full mb-6"></div>
          <p className="text-gray-700 max-w-3xl mx-auto">
            Our organization is structured to ensure effective leadership, accountability, and impact-driven operations.
          </p>
        </div>
        
        {/* Leadership Section */}
        <div className="mb-16">
          <div className="flex items-center mb-8">
            <FaUserTie className="text-3xl text-[#09869a] mr-4" />
            <h3 className="text-2xl md:text-3xl font-bold text-[#09869a]">Leadership Team</h3>
          </div>
          
          {/* Board of Directors */}
          <div className="mb-12">
            <h4 className="text-xl font-bold text-gray-800 mb-6 border-l-4 border-[#FA6418] pl-4">Board of Directors</h4>
            <p className="text-gray-700 mb-8">
              The Board of Directors provides leadership, oversight, and strategic direction for Baris Charity Foundation. They ensure that the foundation stays true to its mission and operates effectively to maximize its impact.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
              {directors.map((director, index) => (
                <div key={index} className="bg-[#f8f9fa] rounded-lg shadow-md overflow-hidden w-full max-w-xs">
                  <div className="relative w-full pt-[100%]"> {/* Square aspect ratio */}
                    <Image 
                      src={director.image}
                      alt={`Image of ${director.name}`}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "https://via.placeholder.com/300?text=Team+Member";
                      }}
                    />
                  </div>
                  
                  <div className="p-5 text-center">
                    <h5 className="text-xl font-bold text-[#09869a] mb-1">{director.name}</h5>
                    <p className="text-gray-600 mb-4">{director.title}</p>
                    
                    <div className="flex justify-center space-x-4 mt-4">
                      <a href={director.linkedin} target="_blank" rel="noopener noreferrer" 
                         className="w-8 h-8 rounded-full bg-[#0077b5] flex items-center justify-center text-white hover:opacity-90 transition-opacity">
                        <FaLinkedinIn />
                      </a>
                      <a href={director.twitter} target="_blank" rel="noopener noreferrer"
                         className="w-8 h-8 rounded-full bg-[#1da1f2] flex items-center justify-center text-white hover:opacity-90 transition-opacity">
                        <FaTwitter />
                      </a>
                      <a href={director.instagram} target="_blank" rel="noopener noreferrer"
                         className="w-8 h-8 rounded-full bg-[#e4405f] flex items-center justify-center text-white hover:opacity-90 transition-opacity">
                        <FaInstagram />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
   
      </div>
    </section>
  );
};

export default AboutStructure;