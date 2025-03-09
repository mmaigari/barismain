"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Home, Heart, Calendar, MapPin, Share2, ThumbsUp, Megaphone } from 'lucide-react';
import Navbar from '@/components/navigation/Navbar';
import AuthModal from '@/components/auth/AuthModal';
import { DonationProvider, useDonation } from '@/contexts/DonationContext';
import DonationOptionsModal from '@/components/donation/modals/DonationOptionsModal';
import PaymentFeesModal from '@/components/donation/modals/PaymentFeesModal';
import TeamSupportModal from '@/components/donation/modals/TeamSupportModal';
import SignInModal from '@/components/donation/modals/SignInModal';
import GuestContinueModal from '@/components/donation/modals/GuestContinueModal';
import PaymentMethodModal from '@/components/donation/modals/PaymentMethodModal';
import ConfirmationModal from '@/components/donation/modals/ConfirmationModal';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import { getProgramDonations, getProgramTotalDonations } from '@/lib/firebase';
import type { Donation } from '@/types/donation';

const AwarenessPageContent = () => {
  const [authModal, setAuthModal] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [isLiked, setIsLiked] = useState(false);
  
  // Donation states
  const [donations, setDonations] = useState<Donation[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [sortOption, setSortOption] = useState<'recent' | 'highest' | 'lowest'>('recent');
  const [isLoading, setIsLoading] = useState(true);
  
  const { currentModal, setCurrentModal, setProgramName } = useDonation();
  
  // Fetch donations using programId "awareness"
  useEffect(() => {
    const fetchDonations = async () => {
      setIsLoading(true);
      try {
        const donationsResponse = await getProgramDonations('awareness', sortOption);
        if (donationsResponse.success && donationsResponse.profile) {
          setDonations(donationsResponse.profile);
        }
        
        const totalResponse = await getProgramTotalDonations('awareness');
        if (totalResponse.success && totalResponse.profile !== undefined) {
          setTotalAmount(totalResponse.profile);
        }
      } catch (error) {
        console.error('Error fetching donations:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDonations();
  }, [sortOption]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value as 'recent' | 'highest' | 'lowest');
  };

  const handleDonateClick = () => {
    setProgramName("Humanitarian Awareness Campaigns");
    setCurrentModal('donationOptions');
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Humanitarian Awareness Campaigns - Baris Charity Foundation',
      text: 'Support our awareness campaigns to educate and advocate for humanitarian causes.',
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

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (!isLiked) {
      toast.success('Thank you for your support!', {
        icon: '❤️',
        duration: 3000,
      });
    }
  };

  return (
    <>
      <Navbar onAuthModalOpen={() => setAuthModal(true)} />
      <AuthModal isOpen={authModal} onClose={() => setAuthModal(false)} />
      
      {currentModal === 'donationOptions' && <DonationOptionsModal />}
      {currentModal === 'paymentFees' && <PaymentFeesModal />}
      {currentModal === 'teamSupport' && <TeamSupportModal />}
      {currentModal === 'signIn' && <SignInModal />}
      {currentModal === 'guestContinue' && <GuestContinueModal />}
      {currentModal === 'paymentMethod' && <PaymentMethodModal />}
      {currentModal === 'confirmation' && <ConfirmationModal />}
      
      <div className="relative bg-gray-50 pt-8">
        {/* Breadcrumb */}
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-[#5D87FF] flex items-center">
              <Home className="w-3 h-3 mr-1" />
              Home
            </Link>
            <ChevronRight className="w-3 h-3 mx-1" />
            <Link href="/programs" className="hover:text-[#5D87FF]">
              Programs
            </Link>
            <ChevronRight className="w-3 h-3 mx-1" />
            <Link href="/programs/campaigns" className="hover:text-[#5D87FF]">
              Campaigns
            </Link>
            <ChevronRight className="w-3 h-3 mx-1" />
            <span className="text-[#5D87FF] font-medium">Awareness</span>
          </div>
        </div>
        
        <section className="relative py-2">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl overflow-hidden shadow-md">
                  {/* Image Header */}
                  <div className="relative h-64">
                    <Image
                      src="/campaigns/awareness2.png"
                      alt="Humanitarian Awareness"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h1 className="text-2xl font-bold text-white">Humanitarian Awareness Campaigns</h1>
                    </div>
                  </div>
                  
                  {/* Tabs */}
                  <div className="border-b border-gray-200">
                    <nav className="flex -mb-px">
                      {['overview', 'donations', 'comments'].map((tab) => (
                        <button
                          key={tab}
                          className={`py-4 px-6 font-medium text-sm capitalize border-b-2 ${
                            activeTab === tab
                              ? 'border-[#5D87FF] text-[#5D87FF]'
                              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                          }`}
                          onClick={() => setActiveTab(tab)}
                        >
                          {tab}
                        </button>
                      ))}
                    </nav>
                  </div>
                  
                  {/* Tab Content */}
                  <div className="p-6">
                    {activeTab === 'overview' && (
                      <div className="prose prose-lg max-w-none">
                        <p className="text-gray-700 leading-relaxed">
                          Our Humanitarian Awareness Campaigns raise public consciousness about pressing 
                          humanitarian issues affecting vulnerable communities worldwide. Through education, 
                          advocacy, and community engagement, we work to inspire action and promote 
                          sustainable solutions to global challenges.
                        </p>
                        
                        <div className="my-6 p-5 bg-gray-50 rounded-lg border border-gray-100">
                          <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#5D87FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            Campaign Impact
                          </h2>
                          <ul className="space-y-2 pl-0">
                            {[
                              'Educates communities about humanitarian issues',
                              'Breaks down stigma and misconceptions',
                              'Inspires local and global action',
                              'Advocates for policy changes',
                              'Builds community solidarity and engagement'
                            ].map((item, index) => (
                              <li key={index} className="flex items-start">
                                <span className="inline-flex items-center justify-center min-w-6 h-6 rounded-full bg-[#5D87FF]/20 mr-2 text-[#5D87FF] font-bold text-sm">
                                  {index + 1}
                                </span>
                                <span className="text-gray-700">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Current Awareness Initiatives</h3>
                        
                        <div className="bg-white border border-gray-200 rounded-lg p-5 mb-6 shadow-sm">
                          <div className="flex items-start">
                            <div className="flex-shrink-0 bg-[#5D87FF]/10 p-3 rounded-lg">
                              <Megaphone className="w-6 h-6 text-[#5D87FF]" />
                            </div>
                            <div className="ml-4">
                              <h4 className="font-semibold text-gray-900">Clean Water Awareness</h4>
                              <p className="text-sm text-gray-500 mt-1">
                                Educational campaign about the global water crisis and sustainable solutions.
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-white border border-gray-200 rounded-lg p-5 mb-6 shadow-sm">
                          <div className="flex items-start">
                            <div className="flex-shrink-0 bg-[#5D87FF]/10 p-3 rounded-lg">
                              <Megaphone className="w-6 h-6 text-[#5D87FF]" />
                            </div>
                            <div className="ml-4">
                              <h4 className="font-semibold text-gray-900">Refugee Rights</h4>
                              <p className="text-sm text-gray-500 mt-1">
                                Advocacy for displaced people and raising awareness about their legal rights and needs.
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-white border border-gray-200 rounded-lg p-5 mb-6 shadow-sm">
                          <div className="flex items-start">
                            <div className="flex-shrink-0 bg-[#5D87FF]/10 p-3 rounded-lg">
                              <Megaphone className="w-6 h-6 text-[#5D87FF]" />
                            </div>
                            <div className="ml-4">
                              <h4 className="font-semibold text-gray-900">Climate Change & Humanitarian Impact</h4>
                              <p className="text-sm text-gray-500 mt-1">
                                Educational series on how climate change increases humanitarian needs globally.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {activeTab === 'comments' && (
                      <div>
                        <p className="text-gray-600">Share your thoughts about this program...</p>
                        <textarea 
                          className="w-full mt-4 p-3 border border-gray-300 rounded-lg focus:ring-[#5D87FF] focus:border-[#5D87FF]"
                          rows={4}
                          placeholder="Write a comment..."
                        />
                        <button className="mt-4 px-5 py-2 text-white bg-[#5D87FF] rounded-lg hover:bg-[#5D87FF]/90">
                          Post Comment
                        </button>
                      </div>
                    )}
                    
                    {activeTab === 'donations' && (
                      <div>
                        <div className="flex justify-between items-center mb-4">
                          <p className="text-gray-700 font-medium">Recent donations to this campaign</p>
                          <div className="bg-[#5D87FF]/10 px-3 py-1 rounded-full">
                            <p className="text-[#5D87FF] font-semibold">Total: {formatCurrency(totalAmount)}</p>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center mb-4">
                          <div className="flex items-center gap-2">
                            <div className="flex -space-x-2">
                              {donations.slice(0, 3).map((donation, i) => (
                                <div key={donation.id || i} className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center overflow-hidden">
                                  <span className="text-xs font-medium text-gray-500">
                                    {donation.anonymous ? 'A' : (donation.name?.substring(0, 1) || i + 1)}
                                  </span>
                                </div>
                              ))}
                            </div>
                            <p className="text-sm text-gray-500">{donations.length} supporters</p>
                          </div>
                          
                          <select 
                            className="text-sm border rounded-md p-1 text-gray-600"
                            value={sortOption}
                            onChange={handleSortChange}
                          >
                            <option value="recent">Most Recent</option>
                            <option value="highest">Highest Amount</option>
                            <option value="lowest">Lowest Amount</option>
                          </select>
                        </div>
                        
                        <div className="space-y-4">
                          {isLoading ? (
                            <div className="py-8 text-center">
                              <p className="text-gray-500">Loading donations...</p>
                            </div>
                          ) : donations.length > 0 ? (
                            donations.map((donation) => (
                              <div key={donation.id} className="flex justify-between p-4 border border-gray-200 rounded-lg bg-white hover:shadow-sm transition-shadow">
                                <div className="flex items-start gap-3">
                                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                    {donation.anonymous ? (
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                      </svg>
                                    ) : (
                                      <span className="font-semibold text-blue-600">
                                        {donation.name?.substring(0, 2).toUpperCase() || 'D'}
                                      </span>
                                    )}
                                  </div>
                                  <div>
                                    <p className="font-medium">
                                      {donation.anonymous ? 'Anonymous' : `Donor ${donation.name || ''}`}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                      {donation.createdAt 
                                        ? new Date(donation.createdAt.seconds * 1000).toLocaleDateString() 
                                        : 'Recently'}
                                    </p>
                                    {donation.message && (
                                      <p className="text-sm text-gray-600 mt-1">"{donation.message}"</p>
                                    )}
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="font-medium text-[#5D87FF]">{formatCurrency(donation.amount)}</p>
                                  <p className="text-xs text-gray-500">Supports {Math.floor(donation.amount / 30)} outreach efforts</p>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="py-8 text-center">
                              <p className="text-gray-500">No donations yet. Be the first to donate!</p>
                            </div>
                          )}
                        </div>
                        
                        {donations.length > 5 && (
                          <div className="mt-6 flex justify-center">
                            <button className="px-4 py-2 text-[#5D87FF] bg-[#5D87FF]/10 rounded-lg hover:bg-[#5D87FF]/20 transition-colors">
                              Load More Donations
                            </button>
                          </div>
                        )}
                        
                        <div className="mt-8 p-5 bg-gray-50 rounded-lg border border-gray-200 text-center">
                          <h3 className="text-lg font-medium text-gray-800 mb-2">Support our awareness efforts</h3>
                          <p className="text-gray-600 mb-4">Your donation helps raise awareness about critical humanitarian issues</p>
                          <button
                            onClick={handleDonateClick} 
                            className="px-6 py-2 text-white bg-[#5D87FF] rounded-lg hover:bg-[#5D87FF]/90 transition-colors"
                          >
                            Support Now
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Sidebar */}
              <div>
                <div className="bg-white rounded-xl overflow-hidden shadow-md mb-6">
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Program Details</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Heart className="w-5 h-5 text-[#5D87FF] mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Campaign Type</p>
                          <p className="font-medium">Education & Advocacy</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <MapPin className="w-5 h-5 text-[#5D87FF] mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Campaign Reach</p>
                          <p className="font-medium">Global</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <Calendar className="w-5 h-5 text-[#5D87FF] mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Campaign Status</p>
                          <p className="font-medium">Active campaigns</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 mt-6 pt-6">
                      <button
                        onClick={handleDonateClick}
                        className="w-full py-3 bg-[#5D87FF] text-white rounded-lg font-medium hover:bg-[#5D87FF]/90 transition-colors"
                      >
                        Support Our Work
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl overflow-hidden shadow-md">
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Share This Program</h3>
                    
                    <div className="flex justify-between items-center">
                      <button
                        onClick={handleShare}
                        className="flex items-center px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </button>
                      
                      <button
                        onClick={handleLike}
                        className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                          isLiked
                            ? 'bg-pink-100 text-pink-600'
                            : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                      >
                        <ThumbsUp className="w-4 h-4 mr-2" />
                        {isLiked ? 'Liked' : 'Like'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Toaster position="bottom-center" />
    </>
  );
};

const AwarenessPage = () => {
  return (
    <DonationProvider>
      <AwarenessPageContent />
    </DonationProvider>
  );
};

export default AwarenessPage;