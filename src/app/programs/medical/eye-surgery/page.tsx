"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import Navbar from '@/components/navigation/Navbar';
import AuthModal from '@/components/auth/AuthModal';
import EyeSurgeryModal from '@/components/donation/modals/EyeSurgeryModal';
import { DonationProvider, useDonation } from '@/contexts/DonationContext';
import PaymentFeesModal from '@/components/donation/modals/PaymentFeesModal';
import TeamSupportModal from '@/components/donation/modals/TeamSupportModal';
import SignInModal from '@/components/donation/modals/SignInModal';
import GuestContinueModal from '@/components/donation/modals/GuestContinueModal';
import PaymentMethodModal from '@/components/donation/modals/PaymentMethodModal';
import ConfirmationModal from '@/components/donation/modals/ConfirmationModal';
import PayPalProvider from '@/components/payment/PayPalProvider';
import { medicalPrograms } from '@/data/medicalPrograms';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast'; // You'll need to install this: npm install react-hot-toast
import { getProgramDonations, getProgramTotalDonations } from '@/lib/firebase';
import type { Donation } from '@/types/donation'; // You may need to create this type

const EyeSurgeryPageContent = () => {
  const [authModal, setAuthModal] = useState(false);
  const [eyeSurgeryModal, setEyeSurgeryModal] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [isLiked, setIsLiked] = useState(false);
  const [sortOption, setSortOption] = useState<'recent' | 'highest' | 'lowest'>('recent');
  const [donations, setDonations] = useState<Donation[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  // Use the context's currentModal state instead
  const { currentModal } = useDonation();
  
  const handleHealNowClick = () => {
    setEyeSurgeryModal(true);
  };

  // Add these functions for share and like functionality
  const handleShare = async () => {
    const shareData = {
      title: 'Eye Surgery & General Surgeries',
      text: 'Help fund eye surgeries for those in need. Each surgery costs $100.',
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback for browsers that don't support the Web Share API
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

  // Fetch donations when component mounts or sort option changes
  useEffect(() => {
    const fetchDonations = async () => {
      setIsLoading(true);
      try {
        // Get donations
        const donationsResponse = await getProgramDonations('eye-surgery', sortOption);
        if (donationsResponse.success && donationsResponse.profile) {
          setDonations(donationsResponse.profile);
        }
        
        // Get total donations
        const totalResponse = await getProgramTotalDonations('eye-surgery');
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

  // Function to handle sort change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value as 'recent' | 'highest' | 'lowest');
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <>
      <Navbar onAuthModalOpen={() => setAuthModal(true)} />
      <AuthModal isOpen={authModal} onClose={() => setAuthModal(false)} />
      
      {eyeSurgeryModal && <EyeSurgeryModal fixedCost={100} onClose={() => setEyeSurgeryModal(false)} />}
      
      {currentModal === 'paymentFees' && <PaymentFeesModal />}
      {currentModal === 'teamSupport' && <TeamSupportModal />}
      {currentModal === 'signIn' && <SignInModal />}
      {currentModal === 'guestContinue' && <GuestContinueModal />}
      {currentModal === 'paymentMethod' && <PaymentMethodModal />}
      {currentModal === 'confirmation' && <ConfirmationModal />}
      
      <div className="relative bg-gray-50 pt-8">
        <section className="relative py-2">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <Link href="/" className="hover:text-[#09869a] flex items-center">
                <Home className="w-3 h-3 mr-1" />
                Home
              </Link>
              <ChevronRight className="w-3 h-3 mx-1" />
              <Link href="/programs" className="hover:text-[#09869a]">Programs</Link>
              <ChevronRight className="w-3 h-3 mx-1" />
              <Link href="/programs/medical" className="hover:text-[#09869a]">Medical</Link>
              <ChevronRight className="w-3 h-3 mx-1" />
              <span className="text-[#09869a] font-medium">Eye Surgery</span>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl overflow-hidden shadow-md mb-4">
                  <div className="relative h-56 md:h-72">
                    <Image 
                      src="/programs/eye-surgery-hero.png"
                      alt="Eye Surgery Program"
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                        Eye Surgery & General Surgeries
                      </h1>
                      <div className="bg-[#09869a]/10 px-3 py-2 rounded-lg">
                        <p className="text-xs text-gray-500">Fixed Cost</p>
                        <p className="text-lg font-bold text-[#09869a]">$100<span className="text-xs font-normal">/surgery</span></p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <button
                        onClick={handleHealNowClick}
                        className="flex-grow md:flex-grow-0 px-6 py-3 text-base font-semibold text-white bg-[#09869a] rounded-lg hover:bg-[#09869a]/90 transition-all"
                      >
                        Heal Now
                      </button>
                      <button 
                        onClick={handleShare}
                        className="p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                      </button>
                      <button 
                        onClick={handleLike}
                        className="p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all"
                      >
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className={`h-5 w-5 ${isLiked ? 'text-red-500 fill-red-500' : 'text-gray-600'}`} 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl overflow-hidden shadow-md">
                  <div className="border-b">
                    <div className="flex">
                      <button 
                        onClick={() => setActiveTab('overview')}
                        className={`px-6 py-4 font-medium ${
                          activeTab === 'overview' 
                            ? 'text-[#09869a] border-b-2 border-[#09869a]' 
                            : 'text-gray-500 hover:text-gray-800'
                        }`}
                      >
                        Overview
                      </button>
                      <button 
                        onClick={() => setActiveTab('comments')}
                        className={`px-6 py-4 font-medium ${
                          activeTab === 'comments' 
                            ? 'text-[#09869a] border-b-2 border-[#09869a]' 
                            : 'text-gray-500 hover:text-gray-800'
                        }`}
                      >
                        Comments
                      </button>
                      <button 
                        onClick={() => setActiveTab('donations')}
                        className={`px-6 py-4 font-medium ${
                          activeTab === 'donations' 
                            ? 'text-[#09869a] border-b-2 border-[#09869a]' 
                            : 'text-gray-500 hover:text-gray-800'
                        }`}
                      >
                        Donations
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    {activeTab === 'overview' && (
                      <div className="prose prose-lg max-w-none">
                        <p className="text-gray-700 leading-relaxed">
                          Our <span className="text-[#09869a] font-medium">Eye Surgery & General Surgeries program</span> provides 
                          critical surgical interventions for those unable to afford these life-changing procedures. 
                          Each surgery costs just <span className="font-semibold">$100</span> and can restore a person's 
                          sight or address other critical medical needs.
                        </p>
                        
                        <div className="my-6 p-5 bg-gray-50 rounded-lg border border-gray-100">
                          <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#09869a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            What Your Donation Provides
                          </h2>
                          <ul className="space-y-2 pl-0">
                            {[
                              'Full cataract surgery',
                              'Pre and post-operative care',
                              'Essential medicines',
                              'Follow-up visits'
                            ].map((item, index) => (
                              <li key={index} className="flex items-start">
                                <span className="inline-flex items-center justify-center min-w-6 h-6 rounded-full bg-[#09869a]/20 mr-2 text-[#09869a] font-bold text-sm">
                                  {index + 1}
                                </span>
                                <span className="text-gray-700">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <p className="text-gray-700 leading-relaxed">
                          When you sponsor a surgery, you're not just funding a medical procedure – you're 
                          <span className="font-semibold text-[#09869a]"> giving someone the gift of sight and independence</span>.
                        </p>
       
                        
                        <p className="text-sm text-gray-500 italic mt-6">
                          Note: All donations go directly toward providing eye surgeries and related care. 
                          Administrative costs are covered separately.
                        </p>
                      </div>
                    )}
                    
                    {activeTab === 'comments' && (
                      <div>
                        <p className="text-gray-600">Share your thoughts about this program...</p>
                        <textarea 
                          className="w-full mt-4 p-3 border border-gray-300 rounded-lg focus:ring-[#09869a] focus:border-[#09869a]"
                          rows={4}
                          placeholder="Write a comment..."
                        />
                        <button className="mt-4 px-5 py-2 text-white bg-[#09869a] rounded-lg hover:bg-[#09869a]/90">
                          Post Comment
                        </button>
                      </div>
                    )}
                    
                    {activeTab === 'donations' && (
                      <div>
                        <div className="flex justify-between items-center mb-4">
                          <p className="text-gray-700 font-medium">Recent donations to this program</p>
                          <div className="bg-[#09869a]/10 px-3 py-1 rounded-full">
                            <p className="text-[#09869a] font-semibold">Total: {formatCurrency(totalAmount)}</p>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center mb-4">
                          <div className="flex items-center gap-2">
                            <div className="flex -space-x-2">
                              {donations.slice(0, 3).map((donation, i) => (
                                <div key={donation.id} className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center overflow-hidden">
                                  <span className="text-xs font-medium text-blue-600">
                                    {donation.anonymous ? 'A' : (donation.name?.substring(0, 2) || 'D')}
                                  </span>
                                </div>
                              ))}
                            </div>
                            <p className="text-sm text-gray-500">{donations.length} generous donors</p>
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
                                    <span className="font-semibold text-blue-600">
                                      {donation.anonymous 
                                        ? 'A'
                                        : donation.name
                                          ? donation.name.substring(0, 2).toUpperCase()
                                          : 'D'
                                      }
                                    </span>
                                  </div>
                                  <div>
                                    <p className="font-medium">
                                      {donation.anonymous 
                                        ? 'Anonymous' 
                                        : donation.name 
                                          ? `Donor ${donation.name}` 
                                          : 'Donor'
                                      }
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
                                  <p className="font-medium text-[#09869a]">{formatCurrency(donation.amount)}</p>
                                  {donation.surgeries && (
                                    <p className="text-xs text-gray-500">{donation.surgeries} surgeries</p>
                                  )}
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="py-8 text-center">
                              <p className="text-gray-500">No donations yet. Be the first to donate!</p>
                            </div>
                          )}
                        </div>
                        
                        <div className="mt-6 flex justify-center">
                          <button className="px-4 py-2 text-[#09869a] bg-[#09869a]/10 rounded-lg hover:bg-[#09869a]/20 transition-colors">
                            Load More Donations
                          </button>
                        </div>
                        
                        <div className="mt-8 p-5 bg-gray-50 rounded-lg border border-gray-200 text-center">
                          <h3 className="text-lg font-medium text-gray-800 mb-2">Join our generous donors</h3>
                          <p className="text-gray-600 mb-4">Your donation can restore someone's sight today</p>
                          <button
                            onClick={handleHealNowClick} 
                            className="px-6 py-2 text-white bg-[#09869a] rounded-lg hover:bg-[#09869a]/90 transition-colors"
                          >
                            Donate Now
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl overflow-hidden shadow-md p-6 mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Other Medical Programs</h3>
                  
                  <div className="space-y-4">
                    {medicalPrograms
                      .filter(program => program.id !== 'eye-surgery')
                      .map(program => (
                        <Link key={program.id} href={program.href} className="flex items-center gap-4 group">
                          <div className="relative w-16 h-16 rounded-md overflow-hidden">
                            <Image
                              src={program.imageSrc}
                              alt={program.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 group-hover:text-[#09869a] transition-colors">
                              {program.title}
                            </h4>
                          </div>
                        </Link>
                      ))}
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <Link href="/programs/medical" className="text-[#09869a] font-medium hover:underline">
                      View all medical programs →
                    </Link>
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

const EyeSurgeryPage = () => {
  return (
    <PayPalProvider>
      <DonationProvider>
        <EyeSurgeryPageContent />
      </DonationProvider>
    </PayPalProvider>
  );
};

export default EyeSurgeryPage;