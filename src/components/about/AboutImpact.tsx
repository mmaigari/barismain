import React, { useState, useEffect, useRef } from 'react';
import { 
  FaHeartbeat, FaBook, FaUtensils, FaTint 
} from 'react-icons/fa';

const AboutImpact = () => {
  // Statistics targets
  const stats = [
    { value: 1330000, label: "Lives Impacted", sublabel: "Across multiple communities", icon: <FaHeartbeat className="text-4xl text-[#FF6F61]" />, suffix: " M", formatted: "1.33 M" },
    { value: 1122, label: "Water Wells", sublabel: "Providing clean water access", icon: <FaTint className="text-4xl text-[#008080]" />, suffix: "+", formatted: "1,122+" },
    { value: 199800, label: "People Fed", sublabel: "To families in need", icon: <FaUtensils className="text-4xl text-[#E1AD01]" />, suffix: "+", formatted: "199,800+" }
  ];
  
  // Animation states
  const [counters, setCounters] = useState(stats.map(() => 0));
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  
  // Animate when in viewport
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
      }
    }, { threshold: 0.1 });
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  // Handle counting animation
  useEffect(() => {
    if (!isVisible) return;
    
    const duration = 2000; // Animation duration in ms
    const frameRate = 30; // Frames per second
    const totalFrames = duration / (1000 / frameRate);
    
    let frame = 0;
    
    const timer = setInterval(() => {
      frame++;
      
      const progress = frame / totalFrames;
      const easeOutQuad = 1 - (1 - progress) * (1 - progress); // Easing function
      
      setCounters(stats.map((stat, i) => {
        // For large numbers like 1.33M, use special formatting
        if (stat.value >= 1000000) {
          const target = stat.value / 1000000;
          return Math.min(parseFloat((target * easeOutQuad).toFixed(2)), target);
        }
        return Math.floor(stat.value * easeOutQuad);
      }));
      
      if (frame >= totalFrames) {
        clearInterval(timer);
      }
    }, 1000 / frameRate);
    
    return () => clearInterval(timer);
  }, [isVisible, stats]);
  
  // Format numbers with commas
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  const impacts = [
    {
      category: "Medical Program",
      icon: <FaHeartbeat className="text-3xl" />,
      achievements: [
        "Eye surgeries for individuals with cataracts",
        "General surgeries for critical conditions",
        "Medical bill payments for those in need",
        "Sanitary pack distribution for women and girls",
        "Support for healthcare facilities in underserved areas"
      ]
    },
    {
      category: "WASH Program",
      icon: <FaTint className="text-3xl" />,
      achievements: [
        "Over 1000 water wells constructed across Northern Nigeria",
        "Bucket wells for small communities",
        "Solar wells providing sustainable water solutions",
        "Hand pump wells in rural areas",
        "Artesian wells delivering high-quality groundwater",
        "Improved sanitation facilities in public and private spaces"
      ]
    },
    {
      category: "Food Security",
      icon: <FaUtensils className="text-3xl" />,
      achievements: [
        "Regular hot meals distribution",
        "Food parcels to struggling families",
        "Akika and vows distributions",
        "Annual Qurbani during Eid-ul-Adha"
      ]
    },
    {
      category: "Education Support",
      icon: <FaBook className="text-3xl" />,
      achievements: [
        "School supplies distribution",
        "Quran distribution to students and institutions",
        "Solar lighting installations in schools",
        "School renovation projects"
      ]
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="font-montserrat text-4xl md:text-5xl font-bold text-[#09869a] mb-4">
            Our Impact
          </h2>
          <div className="w-24 h-1.5 bg-[#FA6418] mx-auto rounded-full"></div>
          <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
            Through dedication, collaboration, and your support, we have achieved significant milestones in our mission to uplift communities in need.
          </p>
        </div>

        {/* Impact statistics with animation */}
        <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-8 shadow-md text-center border border-[#09869a]/10 hover:shadow-lg transition-all duration-300">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-[#f9fafb] rounded-full mb-6 shadow-inner">
                {stat.icon}
              </div>
              <h3 className="text-5xl font-bold text-[#09869a] mb-2">
                {stat.value >= 1000000 ? (
                  <>{counters[index]}{stat.suffix}</>
                ) : (
                  <>{formatNumber(counters[index])}{stat.suffix}</>
                )}
              </h3>
              <p className="text-lg font-semibold text-gray-700 mb-1">{stat.label}</p>
              <p className="text-sm text-gray-600">{stat.sublabel}</p>
            </div>
          ))}
        </div>
        
        {/* Program achievements - Now using the impacts array */}
        <div className="mt-16">
          <h3 className="text-3xl font-bold text-[#09869a] mb-8 text-center">Program Achievements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
            {impacts.map((impact, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-md border border-[#09869a]/10">
                <div className="flex items-center mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-[#f9fafb] rounded-full mr-4 shadow-inner">
                    {React.cloneElement(impact.icon, { className: "text-2xl text-[#09869a]" })}
                  </div>
                  <h4 className="text-xl font-bold text-[#09869a]">{impact.category}</h4>
                </div>
                <ul className="ml-4">
                  {impact.achievements.map((achievement, idx) => (
                    <li key={idx} className="text-gray-700 mb-2 flex items-start">
                      <span className="text-[#FA6418] mr-2">•</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutImpact;