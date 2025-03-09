"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Home, Heart, User, LifeBuoy, AlertCircle, Share2, ThumbsUp } from 'lucide-react';
import Navbar from '@/components/navigation/Navbar';
import AuthModal from '@/components/auth/AuthModal';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';

export default function CampaignsPage() {
  const [authModal, setAuthModal] = useState(false);

  // Define the campaigns
  const campaigns = [
    {
      id: "emergency",
      title: "Emergency Relief Response",
      description: "Rapid deployment of essential aid to communities affected by natural disasters, conflicts, and humanitarian crises.",
      image: "/campaigns/emergency.jpg",
      link: "/programs/campaigns/emergency",
      color: "#FF6F61"
    },
    {
      id: "cash-aid",
      title: "Cash Aid Distribution",
      description: "Direct financial assistance to vulnerable families, enabling them to meet their most pressing needs with dignity and choice.",
      image: "/campaigns/cash-aid.jpg",
      link: "/programs/campaigns/cash-aid",
      color: "#009688"
    },
    {
      id: "awareness",
      title: "Humanitarian Awareness Campaigns",
      description: "Education and advocacy initiatives to raise awareness about humanitarian issues and inspire community action.",
      image: "/campaigns/awareness.jpg",
      link: "/programs/campaigns/awareness",
      color: "#5D87FF"
    }
  ];

  // Handle share function
  const handleShare = async (campaignTitle: string) => {
    const shareData = {
      title: `${campaignTitle} - Baris Charity Foundation`,
      text: `Learn about ${campaignTitle} and how you can help those in need.`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  return (
    <>
      <Navbar onAuthModalOpen={() => setAuthModal(true)} />
      <AuthModal isOpen={authModal} onClose={() => setAuthModal(false)} />
      
      {/* Hero Section */}
      <section className="relative bg-gray-50 pt-16 pb-12 overflow-hidden">
        {/* Decorative SVG background */}
        <div className="absolute inset-0 opacity-[0.03] z-0">
          <svg className="h-full w-full" viewBox="0 0 800 800">
            <path d="M769.7 129.7c-39-39-102.2-39-141.2 0L447.3 310.9 305.7 169.3c-39-39-102.2-39-141.2 0-39 39-39 102.2 0 141.2l212.8 212.8c39 39 102.2 39 141.2 0l282.2-282.2c39-39 39-102.4 0-141.4z" fill="currentColor" />
          </svg>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-[#09869a] flex items-center">
              <Home className="w-3 h-3 mr-1" />
              Home
            </Link>
            <ChevronRight className="w-3 h-3 mx-1" />
            <Link href="/programs" className="hover:text-[#09869a]">
              Programs
            </Link>
            <ChevronRight className="w-3 h-3 mx-1" />
            <span className="text-[#09869a] font-medium">Campaigns</span>
          </div>
          
          <h1 className="font-montserrat text-3xl lg:text-4xl font-bold text-[#09869a] mb-4">
            Humanitarian Campaigns
          </h1>
          <div className="w-24 h-1.5 bg-[#FA6418] rounded-full mb-6"></div>
          
          <div className="max-w-3xl">
            <p className="text-gray-700 text-lg mb-6">
              Our campaigns address urgent humanitarian needs through targeted initiatives. 
              From emergency relief in crisis areas to awareness campaigns that drive action, 
              we focus on making an immediate and lasting impact.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link 
                href="#campaigns" 
                className="bg-[#09869a] text-white px-6 py-3 rounded-md font-medium hover:bg-[#09869a]/90 transition-colors flex items-center"
              >
                <Heart className="w-5 h-5 mr-2" />
                Browse Campaigns
              </Link>
              <Link 
                href="/donate" 
                className="bg-white border border-[#09869a] text-[#09869a] px-6 py-3 rounded-md font-medium hover:bg-gray-50 transition-colors"
              >
                Support Our Work
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Campaigns Section */}
      <section id="campaigns" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-montserrat text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Current Campaigns
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Your support enables us to respond quickly to humanitarian emergencies 
              and implement sustainable solutions for vulnerable communities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {campaigns.map((campaign) => (
              <div 
                key={campaign.id}
                className="bg-white rounded-xl overflow-hidden shadow-lg transition-all hover:shadow-xl"
              >
                {/* Campaign Image */}
                <div className="relative h-64">
                  <Image
                    src={campaign.image}
                    alt={campaign.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{campaign.title}</h3>
                  </div>
                </div>
                
                {/* Campaign Content */}
                <div className="p-6">
                  <p className="text-gray-600 mb-6">{campaign.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <Link 
                      href={campaign.link}
                      className="bg-[#09869a] text-white px-5 py-2 rounded-md font-medium hover:bg-[#09869a]/90 transition-colors flex items-center"
                    >
                      Help Now
                    </Link>
                    
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleShare(campaign.title)}
                        className="p-2 text-gray-500 hover:text-[#09869a] hover:bg-gray-100 rounded-full"
                        aria-label="Share"
                      >
                        <Share2 className="w-5 h-5" />
                      </button>
                      <button 
                        className="p-2 text-gray-500 hover:text-[#09869a] hover:bg-gray-100 rounded-full"
                        aria-label="Like"
                      >
                        <ThumbsUp className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Impact Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="font-montserrat text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Our Impact
            </h2>
            <p className="text-gray-600">
              Through our humanitarian campaigns, we've been able to reach thousands of people in crisis, 
              providing immediate relief and long-term support.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#FF6F61]/10 text-[#FF6F61] rounded-full mb-4">
                <LifeBuoy className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Emergency Response</h3>
              <p className="text-gray-600">
                Provided immediate relief to over 50,000 people affected by natural disasters and conflicts.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#009688]/10 text-[#009688] rounded-full mb-4">
                <User className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Cash Aid</h3>
              <p className="text-gray-600">
                Supported 15,000 families with direct financial assistance to meet basic needs.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#5D87FF]/10 text-[#5D87FF] rounded-full mb-4">
                <AlertCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Awareness</h3>
              <p className="text-gray-600">
                Reached over 1 million people through awareness campaigns and educational initiatives.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-[#09869a] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-montserrat text-2xl lg:text-3xl font-bold mb-4">
              Join Our Humanitarian Efforts
            </h2>
            <p className="text-white/80 mb-8">
              Whether through donations, volunteering, or spreading awareness, your support makes our work possible. 
              Together, we can make a difference in the lives of those facing humanitarian crises.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/donate" 
                className="bg-white text-[#09869a] px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors"
              >
                Donate Now
              </Link>
              <Link 
                href="/volunteer" 
                className="bg-transparent border border-white text-white px-8 py-3 rounded-md font-medium hover:bg-white/10 transition-colors"
              >
                Get Involved
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Toaster position="bottom-center" />
    </>
  );
}