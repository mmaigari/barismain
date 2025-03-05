"use client"

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  MessageSquareText, 
  HelpCircle, 
  FileText, 
  Mail, 
  Phone, 
  Shield, 
  Book, 
  UserCheck, 
  ArrowRight 
} from 'lucide-react';

const helpCategories = [
  {
    title: 'Chat Support',
    description: 'Connect with our team in real-time for immediate assistance with your questions.',
    icon: <MessageSquareText className="w-12 h-12 text-[#09869a]" />,
    link: '/help/chat-support',
    color: 'bg-[#09869a]/5 border-[#09869a]/20'
  },
  {
    title: 'FAQs',
    description: 'Find answers to the most common questions about our services and programs.',
    icon: <HelpCircle className="w-12 h-12 text-[#FA6418]" />,
    link: '/help/faqs',
    color: 'bg-[#FA6418]/5 border-[#FA6418]/20'
  },
  {
    title: 'Terms of Use',
    description: 'Review our terms and conditions for using our website and services.',
    icon: <FileText className="w-12 h-12 text-[#09869a]" />,
    link: '/help/terms',
    color: 'bg-[#09869a]/5 border-[#09869a]/20'
  },
  {
    title: 'Send Feedback',
    description: 'Share your thoughts, suggestions, or report issues to help us improve.',
    icon: <Mail className="w-12 h-12 text-[#FA6418]" />,
    link: '/help/feedback',
    color: 'bg-[#FA6418]/5 border-[#FA6418]/20'
  },
  {
    title: 'Contact Us',
    description: 'Find our contact information and different ways to reach our team.',
    icon: <Phone className="w-12 h-12 text-[#09869a]" />,
    link: '/contact',
    color: 'bg-[#09869a]/5 border-[#09869a]/20'
  },
  {
    title: 'Privacy Policy',
    description: 'Learn how we collect, use, and protect your personal information.',
    icon: <Shield className="w-12 h-12 text-[#FA6418]" />,
    link: '/help/privacy',
    color: 'bg-[#FA6418]/5 border-[#FA6418]/20'
  },
  {
    title: 'Donation Guide',
    description: 'Step-by-step instructions on how to make donations and track your contributions.',
    icon: <Book className="w-12 h-12 text-[#09869a]" />,
    link: '/help/donation-guide',
    color: 'bg-[#09869a]/5 border-[#09869a]/20'
  },
  {
    title: 'Volunteer Information',
    description: 'Learn how you can get involved and volunteer with our organization.',
    icon: <UserCheck className="w-12 h-12 text-[#FA6418]" />,
    link: '/help/volunteer-info',
    color: 'bg-[#FA6418]/5 border-[#FA6418]/20'
  }
];

export default function HelpPage() {
  const [authModalOpen, setAuthModalOpen] = React.useState(false);

  return (
    <>
      
      <main className="min-h-screen bg-gray-50 pt-24 lg:pt-[120px] pb-16">
        {/* Remove the custom breadcrumb section that was here */}
        
        <div className="container mx-auto px-4 max-w-6xl">

          
          {/* Featured Help Box */}
          <div className="bg-[#09869a] text-white p-6 md:p-8 rounded-xl shadow-lg mb-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
              <svg viewBox="0 0 322.8 322.72" className="w-full h-full">
                <g>
                  <path d="M283.58,261.59l-79.44-78.37,22.96-21.09,.39,.39,78.63,77.61-22.54,21.46Zm-77.76-78.35l77.78,76.74,20.86-19.86-77.39-76.39-21.25,19.52Z"/>
                  <path d="M105.83,187.73l-.55-.19L0,150.22l10.45-30.18,.55,.19,105.23,37.32-10.4,30.18ZM1.47,149.51l103.65,36.74,9.65-27.99L11.16,121.52,1.47,149.51Z"/>
                </g>
              </svg>
            </div>
            
            <div className="relative z-10 md:max-w-2xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Need Immediate Assistance?</h2>
              <p className="mb-6 text-white/90">
                Our support team is available to help you with any questions or issues you may have. 
                Connect with us for real-time assistance through live chat or schedule a call back.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/help/chat-support" className="inline-flex items-center justify-center bg-white text-[#09869a] py-3 px-6 rounded-md font-medium transition-colors hover:bg-gray-100">
                  <MessageSquareText className="mr-2 w-5 h-5" />
                  Start Live Chat
                </Link>
                <Link href="/contact" className="inline-flex items-center justify-center bg-white/10 text-white border border-white/20 py-3 px-6 rounded-md font-medium transition-colors hover:bg-white/20">
                  <Phone className="mr-2 w-5 h-5" />
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
          
          {/* Help Categories Grid */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
            Browse Help Topics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {helpCategories.map((category, index) => (
              <Link 
                key={index} 
                href={category.link}
                className={`block p-6 rounded-xl shadow-sm border ${category.color} transition-all duration-300 hover:shadow-md hover:-translate-y-1`}
              >
                <div className="mb-4">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {category.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {category.description}
                </p>
                <div className="flex items-center text-[#09869a] font-medium">
                  Learn more <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
          
          {/* Help Search Box */}
          <div className="bg-white rounded-xl p-6 md:p-8 shadow-md border border-gray-100 text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Can't find what you're looking for?
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Try searching our knowledge base or contact our support team for personalized assistance.
            </p>
            <div className="max-w-xl mx-auto">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search help articles..." 
                  className="w-full py-3 px-5 pl-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#09869a] focus:border-transparent"
                />
                <HelpCircle className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </main>
      
    </>
  );
}