"use client"

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaFileAlt, FaChartPie, FaHandshake, FaUsers, FaDownload } from 'react-icons/fa';
import Navbar from '@/components/navigation/Navbar';
import ImpactSection from '@/components/home/ImpactSection';

// Sample reports data
const reports = [
  { year: "2024", title: "Annual Financial Report 2024 Q1", url: "#" },
  { year: "2023", title: "Annual Financial Report 2023", url: "#" },
  { year: "2022", title: "Annual Financial Report 2022", url: "#" },
  { year: "2021", title: "Annual Financial Report 2021", url: "#" }
];

// Team implementation image
const transparencyMeasures = [
  {
    title: "Independent Auditing",
    description: "Our financial records are audited annually by independent certified accountants to ensure accuracy and compliance."
  },
  {
    title: "Real-time Reporting",
    description: "We provide regular updates on project progress, funds utilization, and outcomes achieved."
  },
  {
    title: "Operational Efficiency",
    description: "We maintain lean operations with minimal overhead costs to maximize the impact of your donations."
  },
  {
    title: "Community Involvement",
    description: "Local communities participate in planning and implementing projects, ensuring accountability at all levels."
  }
];

export default function TransparencyPage() {
  return (
    <main>
      <Navbar onAuthModalOpen={() => {}} />
      
      {/* Hero Section */}
      <div className="bg-[#f8f9fa] pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="font-montserrat text-4xl md:text-5xl font-bold text-[#333] mb-4">
              Our Commitment to Transparency
            </h1>
            <div className="w-24 h-1.5 bg-[#FA6418] mx-auto rounded-full mb-6"></div>
            <p className="text-[#555] max-w-3xl mx-auto text-lg">
              We believe in complete transparency in how we operate and use donor funds.
              Every dollar is tracked, every outcome is measured, and every report is shared.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <div className="bg-[#09869A]/10 p-4 rounded-full mb-4">
                <FaChartPie className="text-[#09869A] text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">100% Model</h3>
              <p className="text-gray-600">
                100% of your donation goes directly to our programs. All operational costs are covered separately.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <div className="bg-[#09869A]/10 p-4 rounded-full mb-4">
                <FaFileAlt className="text-[#09869A] text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Detailed Reporting</h3>
              <p className="text-gray-600">
                We publish comprehensive quarterly and annual reports detailing all financial activities.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <div className="bg-[#09869A]/10 p-4 rounded-full mb-4">
                <FaUsers className="text-[#09869A] text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Community Involvement</h3>
              <p className="text-gray-600">
                We involve local communities in our projects to ensure accountability and transparency at all levels.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Impact Section */}
      <ImpactSection />
      
      {/* Financial Reports Section */}
      <section className="py-16 bg-[#f8f9fa]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-[#333] mb-4">
              Financial Reports
            </h2>
            <div className="w-24 h-1.5 bg-[#FA6418] mx-auto rounded-full mb-6"></div>
            <p className="text-[#555] max-w-3xl mx-auto">
              Access our financial reports to see exactly how donations are utilized across our programs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reports.map((report, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-semibold bg-[#09869A]/10 text-[#09869A] px-3 py-1 rounded-full">
                    {report.year}
                  </span>
                  <FaFileAlt className="text-gray-400 text-lg" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">{report.title}</h3>
                <Link 
                  href={report.url}
                  className="flex items-center text-[#09869A] hover:text-[#076d7f] transition-colors"
                >
                  <FaDownload className="mr-2" /> Download PDF
                </Link>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link
              href="/about/reports"
              className="inline-flex items-center bg-[#09869A] hover:bg-[#076d7f] text-white px-6 py-3 rounded-md font-medium transition-colors duration-300"
            >
              View All Reports
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Transparency Measures Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-[#333] mb-4">
                Our Transparency Measures
              </h2>
              <div className="w-20 h-1.5 bg-[#FA6418] rounded-full mb-6"></div>
              <p className="text-[#555] mb-8">
                We implement robust measures to ensure full transparency and accountability in all our operations.
                Here's how we maintain the highest standards of transparency:
              </p>
              
              <div className="space-y-6">
                {transparencyMeasures.map((measure, index) => (
                  <div key={index} className="flex">
                    <div className="mr-4 mt-1">
                      <div className="bg-[#FA6418]/10 p-2 rounded-full">
                        <FaHandshake className="text-[#FA6418] text-lg" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 mb-1">{measure.title}</h3>
                      <p className="text-gray-600">{measure.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <Link
                  href="/about/governance"
                  className="inline-flex items-center bg-[#FA6418] hover:bg-[#E45A16] text-white px-6 py-3 rounded-md font-medium transition-colors duration-300"
                >
                  Learn About Our Governance
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
            
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/images/transparency-team.jpg"
                alt="Our team implementing transparency measures"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-[#09869A] text-white">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h2 className="font-montserrat text-3xl md:text-4xl font-bold mb-4">
            Have Questions About Our Transparency?
          </h2>
          <p className="max-w-3xl mx-auto mb-8 text-white/80">
            We're committed to answering any questions about our operations, finances, or programs.
            Reach out to us anytime.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="bg-white text-[#09869A] hover:bg-gray-100 px-6 py-3 rounded-md font-medium transition-colors duration-300"
            >
              Contact Us
            </Link>
            <Link
              href="/help/faqs"
              className="bg-transparent border border-white text-white hover:bg-white/10 px-6 py-3 rounded-md font-medium transition-colors duration-300"
            >
              View FAQs
            </Link>
          </div>
        </div>
      </section>
      
    </main>
  );
}