"use client"

import { useState } from 'react';
import Link from 'next/link';
import { 
  FaHeartbeat, FaHandHoldingMedical, FaHandHoldingHeart, 
  FaDonate, FaUtensils, FaUsers, FaBuilding, FaTimes
} from 'react-icons/fa';

// Impact breakdown data
const impactItems = [
  {
    amount: "$10",
    description: "Provides 5 meals for a child",
    percentage: 25
  },
  {
    amount: "$25",
    description: "Supplies clean water for a family for a month",
    percentage: 45
  },
  {
    amount: "$50",
    description: "Funds a child's education for a month",
    percentage: 70
  },
  {
    amount: "$100",
    description: "Provides emergency medical care for a family",
    percentage: 90
  }
];

// Full breakdown data for the modal
const programCategories = [
  {
    category: "Medical Program",
    icon: <FaHeartbeat />,
    buttonText: "Heal now",
    items: [
      { name: "Eye Surgery & General Surgeries", price: "$100", action: "Medical Cases Gateway" },
      { name: "Medical Bill Assistance", price: "$75", action: "Medical Cases Gateway" },
      { name: "Hygiene Packs Distribution", price: "$20", action: "Contact Us" },
      { name: "Health Facilities Support", price: "$500", action: "Contact Us" }
    ]
  },
  {
    category: "Humanitarian Campaigns",
    icon: <FaHandHoldingMedical />,
    buttonText: "Help now",
    items: [
      { name: "Emergency Relief Response", price: "$50", action: "Help Now" },
      { name: "Cash Aid Distribution", price: "$30", action: "Help Now" },
      { name: "Humanitarian Awareness Campaigns", price: "$25", action: "Help Now" }
    ]
  },
  {
    category: "Sponsorship Program",
    icon: <FaHandHoldingHeart />,
    buttonText: "Sponsor Now",
    items: [
      { name: "Orphan Sponsorship", price: "$40/month", action: "Payment Gateway" },
      { name: "Orphan Student Sponsorship Primary School", price: "$30/month", action: "Payment Gateway" },
      { name: "Orphan Student Sponsorship Secondary School", price: "$65/month", action: "Payment Gateway" }
    ]
  },
  {
    category: "Education Support",
    icon: <FaDonate />,
    buttonText: "Donate Now",
    items: [
      { name: "Labour kits Distribution", price: "$25", action: "Payment Gateway" },
      { name: "Quran Distribution (1 copy)", price: "$5", action: "Payment" },
      { name: "Quran Distribution (100 copies)", price: "$400", action: "Payment" }
    ]
  },
  {
    category: "Food Security Program",
    icon: <FaUtensils />,
    buttonText: "Feed now",
    items: [
      { name: "Hot Meals - Basic meal", price: "$2", action: "Payment Gateway" },
      { name: "Hot Meals - Jumbo meal", price: "$4", action: "Payment Gateway" },
      { name: "Food Parcels - Family of 10 (1 month)", price: "$150", action: "Payment Gateway" },
      { name: "Food Parcels - Family of 5 (1 month)", price: "$100", action: "Payment Gateway" },
      { name: "Food Parcels - Family of 3 (1 month)", price: "$80", action: "Payment Gateway" },
      { name: "Sheep 15-20 kg", price: "$80", action: "Payment Gateway" },
      { name: "Sheep 30-40 kg", price: "$120", action: "Payment Gateway" },
      { name: "Goat", price: "$60", action: "Drop Down List" },
      { name: "Cow 80kg", price: "$300", action: "Payment Gateway" },
      { name: "Cow 100 kg", price: "$330", action: "Payment Gateway" },
      { name: "Cow 120 kg", price: "$360", action: "Payment Gateway" }
    ]
  },
  {
    category: "WASH Program",
    icon: <FaDonate />,
    buttonText: "Donate now",
    items: [
      { name: "Bucket Well", price: "$300", action: "Payment Gateway" },
      { name: "Hand Pump Well", price: "$1700", action: "Payment Gateway" },
      { name: "Solar Well", price: "$3100", action: "Payment Gateway" },
      { name: "Artesian Well", price: "$5000", action: "Payment Gateway" },
      { name: "Sewage & Toilet Construction", price: "$500", action: "Payment Gateway" }
    ]
  },
  {
    category: "Community Resilience & Economic Empowerment",
    icon: <FaUsers />,
    buttonText: "Empower now",
    items: [
      { name: "Goat", price: "$60", action: "Payment Gateway" },
      { name: "Sheep", price: "$80", action: "Payment Gateway" },
      { name: "Cow", price: "$300", action: "Payment Gateway" },
      { name: "Building Young Capacity", price: "Various", action: "Contact Us" },
      { name: "Women Empowerment Initiatives", price: "Various", action: "Contact Us" }
    ]
  },
  {
    category: "Early Recovery & Livelihood Support",
    icon: <FaBuilding />,
    buttonText: "Build now",
    items: [
      { name: "Vocational Training & Skills Development", price: "$200", action: "Contact Us" },
      { name: "Social Services Assistance", price: "$100", action: "Contact Us" },
      { name: "Networking & Business Support", price: "$150", action: "Contact Us" },
      { name: "Cash for Work (CFW) Program", price: "$75/week", action: "Contact Us" }
    ]
  },
  {
    category: "Sadaqah Jariyah (Ongoing Charity)",
    icon: <FaBuilding />,
    buttonText: "Build now",
    items: [
      { name: "Building Masjids", price: "Various", action: "Contact us" },
      { name: "Establishing Orphanages", price: "Various", action: "Contact us" },
      { name: "Building School", price: "Various", action: "Contact us" }
    ]
  }
];

const ImpactSection = () => {
  const [modalOpen, setModalOpen] = useState(false);
  
  // Donut chart data calculation
  const programs = 100;
  const overhead = 0;
  const dashArray = `${programs} ${overhead}`;
  const circumference = 2 * Math.PI * 40; // 40 is the radius
  const dashOffset = circumference * (overhead / 100);
  
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Column - Impact Breakdown */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-[#333] mb-4">Impact Breakdown</h2>
            <p className="text-gray-600 mb-8">
              Your support directly translates into tangible impact. Here's how your donation can make a difference:
            </p>
            
            <div className="space-y-6 mb-8">
              {impactItems.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg text-[#09869a]">{item.amount}</span>
                    <span className="text-gray-500 text-sm">{item.description}</span>
                  </div>
                  <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#FA6418]" 
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            
            <button
              onClick={() => setModalOpen(true)}
              className="bg-[#FA6418] hover:bg-[#E45A16] text-white px-6 py-3 rounded-md font-medium transition-colors duration-300 inline-flex items-center"
            >
              View Full Breakdowns 
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          {/* Right Column - Transparency Promise */}
          <div className="bg-white rounded-lg shadow-md p-8 flex flex-col items-center">
            <h2 className="text-3xl font-bold text-[#333] mb-4">Transparency Promise</h2>
            <p className="text-gray-600 mb-8 text-center">
              We are committed to full transparency in how we use your donations. 100% of all funds go directly to our programs and beneficiaries.
            </p>
            
            {/* Donut Chart */}
            <div className="relative w-52 h-52 mb-6">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle 
                  cx="50" cy="50" r="42" 
                  fill="none" 
                  stroke="#f0f0f0" 
                  strokeWidth="8" 
                />
                {/* Progress circle with gradient */}
                <defs>
                  <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0eb0ba" />
                    <stop offset="100%" stopColor="#09869a" />
                  </linearGradient>
                </defs>
                <circle 
                  cx="50" cy="50" r="42" 
                  fill="none" 
                  stroke="url(#progressGradient)" 
                  strokeWidth="8" 
                  strokeDasharray={dashArray} 
                  strokeDashoffset={dashOffset}
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)" 
                  style={{ transition: "stroke-dashoffset 1.5s ease-in-out" }}
                />
                
                {/* Center content - combined to better center */}
                <g>
                  <text 
                    x="50" y="47" 
                    textAnchor="middle" 
                    dominantBaseline="middle"
                    className="text-2xl font-bold"
                    fill="#333333"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    100%
                  </text>
                  <text 
                    x="50" y="62" 
                    textAnchor="middle" 
                    dominantBaseline="middle"
                    className=""
                    fill="#666666"
                    style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.7rem' }}
                  >
                    to programs
                  </text>
                </g>
              </svg>
            </div>

            {/* Simplified explanation under chart */}
            <p className="text-sm text-gray-500 text-center">
              Every dollar donated goes directly to our programs
            </p>
            
            <Link
              href="/financial-reports"
              className="bg-[#09869a] hover:bg-[#076d7f] text-white px-6 py-3 rounded-md font-medium transition-colors duration-300 inline-flex items-center"
            >
              View Financial Reports
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Full Breakdown Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 z-10 flex justify-between items-center p-5 border-b bg-white">
              <h2 className="text-2xl font-bold text-[#333]">Full Impact Breakdown</h2>
              <button 
                onClick={() => setModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>
            
            <div className="p-5">
              <div className="space-y-8">
                {programCategories.map((category, categoryIndex) => {
                  // Map program categories to their respective colors
                  const buttonColors = {
                    "Medical Program": "#FF6F61",
                    "Humanitarian Campaigns": "#008080",
                    "Sponsorship Program": "#E1AD01",
                    "Education Support": "#800000",
                    "Zakat & Financial Assistance": "#FFA500",
                    "Food Security Program": "#008080",
                    "WASH Program": "#FFDE59",
                    "Community Resilience & Economic Empowerment": "#FF6F61",
                    "Early Recovery & Livelihood Support": "#FF6F61",
                    "Sadaqah Jariyah (Ongoing Charity)": "#008080"
                  };
                  
                  const buttonColor = buttonColors[category.category as keyof typeof buttonColors] || "#09869A";
                  
                  return (
                    <div key={categoryIndex} className="border-b pb-6 last:border-b-0 last:pb-0">
                      <h3 className="text-xl font-bold mb-4" style={{ color: buttonColor }}>{category.category}</h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {category.items.map((item, itemIndex) => (
                              <tr key={itemIndex} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.price}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <button 
                                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
                                    style={{ 
                                      backgroundColor: buttonColor,
                                      boxShadow: `0 1px 3px 0 ${buttonColor}30`,
                                      transition: "all 0.2s ease-in-out"
                                    }}
                                    onMouseOver={(e) => {
                                      e.currentTarget.style.backgroundColor = 
                                        buttonColor === "#FF6F61" ? "#E05A52" : 
                                        buttonColor === "#008080" ? "#006666" :
                                        buttonColor === "#E1AD01" ? "#C19800" :
                                        buttonColor === "#800000" ? "#6A0000" :
                                        buttonColor === "#FFA500" ? "#E69500" :
                                        buttonColor === "#FFDE59" ? "#E6C84F" :
                                        "#077D8F";
                                    }}
                                    onMouseOut={(e) => {
                                      e.currentTarget.style.backgroundColor = buttonColor;
                                    }}
                                  >
                                    <span className="mr-1">{category.icon}</span>
                                    {category.buttonText}
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="border-t p-5 flex justify-end">
              <button
                onClick={() => setModalOpen(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ImpactSection;