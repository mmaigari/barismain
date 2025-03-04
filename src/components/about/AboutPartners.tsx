import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const AboutPartners = () => {
  const partners = [
    {
      name: "Hasene International",
      country: "Germany",
      logo: "/partners/Hasene.png"
    },
    {
      name: "Yardimeli Dernegi",
      country: "Turkey",
      logo: "/partners/Yardimeli.png"
    },
    {
      name: "Sekka World Su Hizmetleri",
      country: "Turkey",
      logo: "/partners/Sekka.png"
    },
    {
      name: "Insanizi Insani Yardim Dernegi",
      country: "Turkey",
      logo: "/partners/Insanizi.png"
    },
    {
      name: "Afrika Hayat Assosiation",
      country: "Turkey",
      logo: "/partners/ahad.png"
    },
    {
      name: "Humaniti",
      country: "Canada",
      logo: "/partners/Humaniti.png"
    }
  ];
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    
    // Auto-scrolling animation
    let scrollPos = 0;
    const totalWidth = scrollContainer.scrollWidth / 2;
    const scrollSpeed = 1; // Adjust speed here
    
    const animate = () => {
      if (isHovering || !scrollContainer) return;
      
      scrollPos += scrollSpeed;
      
      // Reset position when we've scrolled through half the content
      // (since we duplicated the content)
      if (scrollPos >= totalWidth) {
        scrollPos = 0;
        scrollContainer.style.transition = 'none';
        scrollContainer.style.transform = `translateX(0)`;
        // Force reflow
        void scrollContainer.offsetHeight; // Fixed expression statement
        scrollContainer.style.transition = 'transform 500ms linear';
      }
      
      scrollContainer.style.transform = `translateX(-${scrollPos}px)`;
      requestAnimationFrame(animate);
    };
    
    const animationFrame = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(animationFrame);
  }, [isHovering]);

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="font-montserrat text-4xl md:text-5xl font-bold text-[#09869a] mb-4">
            Partnerships & Collaborations
          </h2>
          <div className="w-24 h-1.5 bg-[#FA6418] mx-auto rounded-full mb-6"></div>
          <p className="text-gray-700 max-w-3xl mx-auto">
            We collaborate with renowned international organizations to maximize our impact and reach.
          </p>
        </div>
        
        {/* Partner carousel */}
        <div 
          className="overflow-hidden"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div 
            ref={scrollRef}
            className="flex transition-transform"
            style={{ transition: 'transform 500ms linear' }}
          >
            {/* Original partners */}
            {partners.map((partner, index) => (
              <div 
                key={`original-${index}`} 
                className="partner-item flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4"
              >
                <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center h-full">
                  <div className="relative w-32 h-20 mb-4">
                    <Image 
                      src={partner.logo} 
                      alt={partner.name} 
                      fill
                      className="object-contain"
                      onError={(e) => {
                        e.currentTarget.src = "https://via.placeholder.com/150x100?text=Logo";
                      }}
                    />
                  </div>
                  <h3 className="text-lg text-gray-500 mb-1">{partner.name}</h3>
                  <p className="text-gray-600 text-sm">{partner.country}</p>
                </div>
              </div>
            ))}
            
            {/* Duplicated partners for infinite scroll effect */}
            {partners.map((partner, index) => (
              <div 
                key={`duplicate-${index}`} 
                className="partner-item flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4"
              >
                <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center h-full">
                  <div className="relative w-32 h-20 mb-4">
                    <Image 
                      src={partner.logo} 
                      alt={partner.name} 
                      fill
                      className="object-contain"
                      onError={(e) => {
                        e.currentTarget.src = "https://via.placeholder.com/150x100?text=Logo";
                      }}
                    />
                  </div>
                  <h3 className="text-lg text-gray-500 mb-1">{partner.name}</h3>
                  <p className="text-gray-600 text-sm">{partner.country}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPartners;