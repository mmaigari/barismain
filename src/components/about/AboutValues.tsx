import React from 'react';
import { 
  FaHandHoldingHeart, FaBalanceScale, FaHandsHelping, 
  FaUsers, FaRecycle, FaHandshake, FaLightbulb, 
  FaPrayingHands, FaChartBar, FaSync 
} from 'react-icons/fa';

const AboutValues = () => {
  const values = [
    {
      icon: <FaHandHoldingHeart className="text-3xl" />,
      title: "Mission-Driven Service",
      description: "Every action aligns with the foundation's commitment to uplifting vulnerable communities, particularly orphans and underprivileged children."
    },
    {
      icon: <FaBalanceScale className="text-3xl" />,
      title: "Integrity & Transparency",
      description: "Upholding honesty, ethical standards, and financial accountability to build trust with donors, beneficiaries, and stakeholders."
    },
    {
      icon: <FaHandsHelping className="text-3xl" />,
      title: "Compassion & Human Dignity",
      description: "Ensuring that all initiatives are rooted in kindness, respect, and the preservation of human dignity."
    },
    {
      icon: <FaUsers className="text-3xl" />,
      title: "Equity & Inclusion",
      description: "Providing equal access to education, healthcare, and opportunities regardless of background, gender, or social status."
    },
    {
      icon: <FaRecycle className="text-3xl" />,
      title: "Sustainability & Impact",
      description: "Focusing on self-sustaining programs that empower individuals and communities for the future."
    },
    {
      icon: <FaHandshake className="text-3xl" />,
      title: "Collaboration",
      description: "Partnering with local and international organizations, governments, and community leaders to maximize impact."
    },
    {
      icon: <FaLightbulb className="text-3xl" />,
      title: "Education & Empowerment",
      description: "Promoting knowledge, skill-building, and personal development to break cycles of poverty."
    },
    {
      icon: <FaPrayingHands className="text-3xl" />,
      title: "Cultural & Religious Sensitivity",
      description: "Respecting and incorporating local values, traditions, and religious beliefs in program implementation."
    },
    {
      icon: <FaChartBar className="text-3xl" />,
      title: "Accountability & Assessment",
      description: "Regularly evaluating the effectiveness of programs to ensure they deliver meaningful change."
    },
    {
      icon: <FaSync className="text-3xl" />,
      title: "Resilience & Adaptability",
      description: "Continuously evolving to meet emerging challenges and the needs of the communities served."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-[#f9fafb]">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="font-montserrat text-4xl md:text-5xl font-bold text-[#09869a] mb-4">
            Core Values
          </h2>
          <div className="w-24 h-1.5 bg-[#FA6418] mx-auto rounded-full mb-6"></div>
          <p className="text-gray-700 max-w-3xl mx-auto">
            Our core values guide every decision and action we take as an organization.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#09869a]/10 flex items-center justify-center text-[#09869a] mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-[#09869a] mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutValues;