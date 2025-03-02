import Link from 'next/link';
import { FaHandHoldingHeart, FaUsers, FaDollarSign, FaHandshake } from 'react-icons/fa';

const involvementOptions = [
  {
    title: "Donate",
    icon: <FaHandHoldingHeart />,
    description: "Support our mission with a one-time or recurring donation to fund our programs and initiatives.",
    link: "/donate",
    color: "#E32613" // Changed to specified red color
  },
  {
    title: "Volunteer",
    icon: <FaUsers />,
    description: "Join our team of dedicated volunteers and contribute your time and skills to make a difference.",
    link: "/volunteer",
    color: "#09869a" // Teal to match the testimonials section
  },
  {
    title: "Fundraise",
    icon: <FaDollarSign />,
    description: "Start your own fundraising campaign to support a cause you care about and engage your network.",
    link: "/fundraise",
    color: "#17c5ce" // Teal to match the testimonials section
  },
  {
    title: "Partner With Us",
    icon: <FaHandshake />,
    description: "Collaborate with us as a corporate or organizational partner to create sustainable impact.",
    link: "/partner",
    color: "#FA6418" // Orange to match other CTAs
  }
];

const GetInvolvedSection = () => {
  return (
    <section className="py-16 md:py-24 bg-[#f9fafb]">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="font-montserrat text-4xl md:text-5xl font-bold text-[#333] mb-4">
            Get Involved
          </h2>
          <div className="w-24 h-1.5 bg-[#FA6418] mx-auto rounded-full mb-6"></div>
          <p className="max-w-3xl mx-auto text-lg text-[#555]">
            There are many ways you can contribute to our mission and help create positive change in the world.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {involvementOptions.map((option, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 flex flex-col transition-transform hover:translate-y-[-5px]">
              <div className="flex justify-center mb-6">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: option.color }}
                >
                  <span className="text-white text-2xl">
                    {option.icon}
                  </span>
                </div>
              </div>
              
              <h3 
                className="text-xl font-bold mb-3 text-center"
                style={{ color: option.color }}
              >
                {option.title}
              </h3>
              
              <p className="text-[#666] mb-8 text-center flex-grow">
                {option.description}
              </p>
              
              <Link 
                href={option.link} 
                className="mt-auto text-white py-3 rounded-md font-medium text-center transition-colors"
                style={{ 
                  backgroundColor: option.color,
                  boxShadow: `0 4px 6px -1px ${option.color}30, 0 2px 4px -1px ${option.color}20`
                }}
              >
                {option.title}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GetInvolvedSection;