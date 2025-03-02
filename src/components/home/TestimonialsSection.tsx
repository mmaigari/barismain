"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaQuoteLeft, FaHeart } from 'react-icons/fa';

const testimonials = [
  {
    text: "The water well project has transformed our village. Children no longer have to walk miles for clean water, and waterborne diseases have decreased significantly. We are eternally grateful to Baris Charity Foundation.",
    author: "Ahmed Hassan",
    title: "Community Leader",
    image: "/testimonial-1.jpg"
  },
  {
    text: "Baris Charity has been instrumental in providing educational resources and scholarships for underprivileged students in our region. Their commitment to empowering the youth is truly inspiring.",
    author: "Fatima Ali",
    title: "School Principal",
    image: "/testimonial-2.jpg"
  },
  {
    text: "Thanks to Baris Charity's humanitarian aid, our community was able to rebuild after a devastating earthquake. Their support and compassion helped us regain hope and start anew.",
    author: "Omar Khan",
    title: "Village Elder",
    image: "/testimonial-3.jpg"
  }
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section className="py-16 md:py-24 bg-[#17c5ce] text-white relative overflow-hidden">
      {/* Background pattern (optional) */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle fill="#ffffff" cx="3" cy="3" r="1.5"></circle>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)"></rect>
        </svg>
      </div>
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-montserrat text-4xl md:text-5xl font-bold mb-4">
            What People <span className="text-[#FA6418]">Say</span>
          </h2>
          <div className="w-24 h-1.5 bg-[#FA6418] mx-auto rounded-full mb-6"></div>

          <p className="max-w-3xl mx-auto text-lg md:text-xl opacity-85">
            Hear from the communities we serve, our donors, and partners about the impact of our work.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto mb-14">
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-10 text-gray-800 relative">
            <FaQuoteLeft className="text-[#17c5ce] text-4xl md:text-6xl absolute top-8 left-8 opacity-20" />
            
            <div className="carousel-container overflow-hidden relative">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`transition-opacity duration-700 absolute inset-0 flex flex-col ${
                    index === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
                >
                  <div className="pt-10">
                    <p className="text-lg md:text-xl mb-8 italic relative z-10 pl-8">
                      &quot;{testimonial.text}&quot;
                    </p>
                    
                    <div className="flex items-center">
                      <div className="mr-4 w-14 h-14 relative rounded-full overflow-hidden border-2 border-[#17c5ce]">
                        <Image 
                          src={testimonial.image} 
                          alt={testimonial.author} 
                          fill
                          className="object-cover"
                          onError={(e) => {
                            // Fallback for missing images
                            e.currentTarget.src = "https://via.placeholder.com/60?text=BCF";
                          }}
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">{testimonial.author}</h4>
                        <p className="text-gray-600">{testimonial.title}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Carousel navigation dots */}
            <div className="flex justify-center space-x-3 mt-10">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === activeIndex ? "bg-[#17c5ce]" : "bg-gray-300"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Donate Now Button */}
        <div className="text-center mt-10">
          <a 
            href="/donate" 
            className="inline-flex items-center bg-[#09869a] hover:bg-[#E32613] py-4 px-8 rounded-full font-bold text-lg transition-colors shadow-lg"
          >
            <FaHeart className="mr-2" />
            Donate Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;