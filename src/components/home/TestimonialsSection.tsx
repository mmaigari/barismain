"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaQuoteLeft, FaHeart } from 'react-icons/fa';

const testimonials = [
  {
    text: "The water well project has transformed our village. Children no longer have to walk miles for clean water, and waterborne diseases have decreased significantly. We are eternally grateful to Bariş Charity Foundation.",
    author: "Ahmed Hassan",
    title: "Community Leader",
    image: "/testimonial-1.jpg"
  },
  {
    text: "Bariş Charity has been instrumental in providing educational resources and scholarships for underprivileged students in our region. Their commitment to empowering the youth is truly inspiring.",
    author: "Fatima Ali",
    title: "School Principal",
    image: "/testimonial-2.jpg"
  },
  {
    text: "Thanks to Bariş Charity's humanitarian aid, our community was able to rebuild after a devastating earthquake. Their support and compassion helped us regain hope and start anew.",
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
      {/* Background pattern (dots) */}
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
      
      {/* Add SVG decoration to top right */}
      <div className="absolute top-0 right-0 pointer-events-none opacity-[0.07] z-0">
        <svg 
          viewBox="0 0 322.8 322.72" 
          className="w-72 md:w-96 lg:w-[450px]"
        >
          <g id="Layer_1-2" data-name="Layer 1">
            <g>
              <path className="fill-white" d="M283.58,261.59l-79.44-78.37,22.96-21.09,.39,.39,78.63,77.61-22.54,21.46Zm-77.76-78.35l77.78,76.74,20.86-19.86-77.39-76.39-21.25,19.52Z"/>
              <path className="fill-white" d="M105.83,187.73l-.55-.19L0,150.22l10.45-30.18,.55,.19,105.23,37.32-10.4,30.18ZM1.47,149.51l103.65,36.74,9.65-27.99L11.16,121.52,1.47,149.51Z"/>
              <path className="fill-white" d="M189.53,322.72l-31.48-3.43,12.96-112.35,31.49,3.4-12.97,112.37Zm-30.19-4.45l29.18,3.18,12.7-110.07-29.19-3.15-12.69,110.05Z"/>
              <path className="fill-white" d="M176.23,114.69l-26.94-16.81,12.13-19.43L208.94,2.31l26.94,16.79-.31,.49-59.35,95.09Zm-25.35-17.17l24.98,15.58L234.29,19.47l-24.97-15.57-58.44,93.61Z"/>
              <path className="fill-white" d="M106.13,132.4L69.25,25.62l29.78-10.69,36.88,106.77-29.78,10.7ZM70.71,26.32l36.13,104.59,27.6-9.92L98.32,16.41l-27.6,9.91Z"/>
              <path className="fill-white" d="M206.32,142.31l-3.64-31.69,111.58-12.71,3.73,31.52-111.68,12.88Zm-2.36-30.67l3.37,29.39,109.38-12.62-3.46-29.23-109.29,12.45Z"/>
              <path className="fill-white" d="M53.56,282.36l-16.87-26.94,95.23-59.92,16.9,26.92-.49,.31-94.77,59.63Zm-15.28-26.58l15.64,24.98,93.3-58.71-15.67-24.96-93.27,58.69Z"/>
              <path className="fill-white" d="M46.75,113.29c-.09,0-.17,0-.26,0h0c-6.46-.07-12.51-2.66-17.02-7.3-4.55-4.68-7-10.86-6.9-17.41,.11-6.6,2.81-12.78,7.61-17.39,4.67-4.48,10.69-6.88,16.99-6.72,13.28,.31,24.02,11.26,23.95,24.39-.03,6.66-2.63,12.87-7.31,17.47-4.57,4.49-10.62,6.96-17.07,6.96Zm-.25-1.16c6.23,.09,12.1-2.29,16.51-6.63,4.46-4.39,6.93-10.3,6.96-16.66,.07-12.51-10.17-22.92-22.82-23.22-5.98-.16-11.72,2.13-16.17,6.4-4.58,4.4-7.15,10.29-7.26,16.58-.1,6.24,2.23,12.13,6.57,16.59,4.3,4.41,10.05,6.88,16.2,6.95h0Z"/>
              <path className="fill-white" d="M119.53,314.53c-.15,0-.29,0-.44,0-6.34-.1-12.27-2.74-16.7-7.43-4.43-4.69-6.8-10.83-6.69-17.31h0c.12-6.64,2.81-12.82,7.58-17.4,4.63-4.44,10.63-6.81,16.97-6.67,13.63,.31,24.09,11.39,23.81,25.22-.27,13.31-11,23.59-24.53,23.59Zm-22.68-24.72c-.11,6.17,2.16,12.03,6.38,16.49,4.22,4.46,9.85,6.97,15.88,7.07,13.07,.17,23.54-9.65,23.79-22.46,.26-13.18-9.7-23.74-22.68-24.04-5.96-.15-11.74,2.11-16.14,6.34-4.55,4.37-7.11,10.26-7.22,16.59h0Z"/>
              <path className="fill-white" d="M237.44,299.53c-13.35,0-24.22-10.92-24.24-24.36h0c-.01-6.63,2.53-12.83,7.16-17.46,4.53-4.53,10.55-7.03,16.96-7.03h.05c13.24,.02,24.07,10.86,24.16,24.16,.04,6.63-2.51,12.87-7.17,17.57-4.54,4.58-10.53,7.1-16.86,7.12h-.04Zm-.13-47.7c-6.09,0-11.82,2.38-16.14,6.69-4.41,4.41-6.83,10.32-6.82,16.64h0c.02,12.81,10.38,23.21,23.09,23.21h.04c6.02-.01,11.72-2.42,16.04-6.77,4.45-4.48,6.88-10.43,6.84-16.75-.08-12.67-10.4-22.99-23-23.01h-.04Z"/>
              <path className="fill-white" d="M298.58,197.89c-.08,0-.15,0-.23,0-13.48-.12-23.99-10.93-23.92-24.61,.07-13.53,10.8-24.13,24.41-24.13h.02c6.27,0,12.22,2.54,16.77,7.14,4.62,4.67,7.23,11.08,7.17,17.58-.14,13.51-10.76,24.02-24.22,24.02Zm.27-47.58c-12.97,0-23.19,10.09-23.26,22.98h0c-.07,13.03,9.93,23.33,22.77,23.44,.07,0,.15,0,.22,0,12.82,0,22.93-10.01,23.06-22.87,.06-6.2-2.43-12.3-6.83-16.76-4.33-4.38-9.99-6.79-15.95-6.79h-.02Z"/>
              <path className="fill-white" d="M145.92,48.76c-6.36,0-12.3-2.42-16.76-6.83-4.63-4.58-7.19-10.83-7.22-17.58-.03-6.56,2.47-12.71,7.04-17.32C133.46,2.52,139.42,.02,145.75,0h.09c13.58,0,24.28,10.6,24.38,24.18,.05,6.48-2.47,12.63-7.1,17.32-4.59,4.65-10.65,7.23-17.05,7.27h-.15Zm-.08-47.61h-.08c-6.03,.02-11.69,2.39-15.95,6.69-4.35,4.39-6.73,10.24-6.71,16.5,.03,6.45,2.47,12.4,6.88,16.77,4.24,4.19,9.89,6.5,15.94,6.5h.14c6.1-.03,11.87-2.5,16.24-6.93,4.41-4.46,6.81-10.32,6.76-16.5-.09-12.93-10.29-23.03-23.22-23.03Z"/>
              <path className="fill-white" d="M35.48,231.65c-.08,0-.17,0-.26,0h0c-6.62-.07-12.74-2.66-17.22-7.3-4.49-4.64-6.91-10.87-6.84-17.56,.07-6.48,2.67-12.53,7.31-17.03,4.66-4.52,10.84-6.93,17.37-6.81,13.4,.26,23.81,11.01,23.7,24.46-.06,6.63-2.66,12.81-7.32,17.39-4.5,4.42-10.44,6.85-16.74,6.85Zm-.24-1.16c6.04,.06,11.83-2.25,16.18-6.52,4.45-4.36,6.92-10.25,6.98-16.57,.1-12.82-9.81-23.05-22.56-23.3-6.19-.12-12.1,2.18-16.55,6.49-4.42,4.28-6.89,10.04-6.96,16.21-.07,6.38,2.24,12.33,6.51,16.74,4.27,4.41,10.1,6.88,16.4,6.95h0Z"/>
              <path className="fill-white" d="M257.81,86.31h-.15c-6.33-.04-12.34-2.62-16.93-7.28-4.67-4.73-7.21-10.92-7.16-17.42,.1-13.31,10.95-24.16,24.17-24.19h.05c6.37,0,12.38,2.5,16.93,7.05,4.65,4.64,7.21,10.83,7.2,17.43,0,6.57-2.59,12.75-7.27,17.4-4.56,4.52-10.53,7.01-16.85,7.01Zm-.01-47.73h-.05c-12.6,.03-22.92,10.36-23.02,23.04-.05,6.19,2.38,12.09,6.83,16.6,4.37,4.43,10.1,6.9,16.12,6.93h.14c6.01,0,11.69-2.37,16.03-6.67,4.46-4.43,6.92-10.32,6.93-16.58,0-6.29-2.43-12.19-6.86-16.61-4.33-4.33-10.05-6.71-16.12-6.71Z"/>
            </g>
          </g>
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
                            e.currentTarget.src = "https://via.placeholder.com/60?text=Bariş Charity Foundation";
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