"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Home, Utensils } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/navigation/Navbar';
import AuthModal from '@/components/auth/AuthModal';
import { DonationProvider, useDonation } from '@/contexts/DonationContext';
import PaymentFeesModal from '@/components/donation/modals/PaymentFeesModal';
import TeamSupportModal from '@/components/donation/modals/TeamSupportModal';
import SignInModal from '@/components/donation/modals/SignInModal';
import GuestContinueModal from '@/components/donation/modals/GuestContinueModal';
import PaymentMethodModal from '@/components/donation/modals/PaymentMethodModal';
import ConfirmationModal from '@/components/donation/modals/ConfirmationModal';
import PayPalProvider from '@/components/payment/PayPalProvider';

// Add this interface for the modal props
interface MealsDonationModalProps {
  fixedCost: number;
  onClose: () => void;
}

// Donation modal component
const MealsDonationModal = ({ fixedCost, onClose }: MealsDonationModalProps) => {
  const { setCurrentModal, setProgramName, setDonationAmount } = useDonation();
  
  const handleDonate = () => {
    setProgramName("Community Meals Program");
    setDonationAmount(fixedCost);
    setCurrentModal('paymentFees');
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Community Meals Donation</h3>
        <p className="text-gray-600 mb-6">
          Your donation of ${fixedCost} will help provide nutritious meals to those in need in our community.
          Each meal provides essential nutrition and hope to individuals and families facing food insecurity.
        </p>
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleDonate}
            className="px-6 py-2 bg-[#09869a] hover:bg-[#09869a]/90 text-white rounded-lg"
          >
            Donate ${fixedCost}
          </button>
        </div>
      </div>
    </div>
  );
};

const MealsPageContent = () => {
  const [authModal, setAuthModal] = useState(false);
  const [mealsModal, setMealsModal] = useState(false);
  const { currentModal } = useDonation();
  
  const handleDonateClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setMealsModal(true);
  };

  return (
    <>
      <Navbar onAuthModalOpen={() => setAuthModal(true)} />
      <AuthModal isOpen={authModal} onClose={() => setAuthModal(false)} />
      
      {mealsModal && <MealsDonationModal fixedCost={2} onClose={() => setMealsModal(false)} />}
      
      {currentModal === 'paymentFees' && <PaymentFeesModal />}
      {currentModal === 'teamSupport' && <TeamSupportModal />}
      {currentModal === 'signIn' && <SignInModal />}
      {currentModal === 'guestContinue' && <GuestContinueModal />}
      {currentModal === 'paymentMethod' && <PaymentMethodModal />}
      {currentModal === 'confirmation' && <ConfirmationModal />}
      
      <div className="relative bg-gray-50 pt-8">
        <section className="relative py-2">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-gray-500 mb-6">
              <Link href="/" className="hover:text-[#008080]">Home</Link>
              <ChevronRight className="w-3 h-3 mx-1" />
              <Link href="/programs" className="hover:text-[#008080]">Programs</Link>
              <ChevronRight className="w-3 h-3 mx-1" />
              <Link href="/programs/food" className="hover:text-[#008080]">Food Security</Link>
              <ChevronRight className="w-3 h-3 mx-1" />
              <span className="text-gray-900">Hot Meals</span>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main content - 2 columns */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl overflow-hidden shadow-md">
                  <div className="relative h-56 md:h-64">
                    <Image 
                      src="/programs/hot-meal-hero.jpg" 
                      alt="Hot Meal Distribution" 
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Hot Meal Distribution Program</h1>
                    <p className="text-gray-600 mb-4">
                      Our Hot Meal Distribution program provides nutritious, freshly prepared meals to individuals 
                      and families experiencing food insecurity. These meals are distributed at community centers, 
                      shelters, and through our mobile outreach services.
                    </p>
                    <p className="text-gray-600 mb-4">
                      Each meal is carefully prepared to provide essential nutrients, including protein, 
                      vegetables, and carbohydrates. Our program serves hundreds of individuals daily, 
                      ensuring that vulnerable populations have access to at least one wholesome meal each day.
                    </p>
                    
                    <div className="border-t border-gray-200 pt-6 mt-6">
                      <h2 className="text-xl font-semibold text-gray-800 mb-4">Impact of Your Donation</h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                          <div className="text-3xl font-bold text-[#008080] mb-2">$2</div>
                          <div className="text-gray-600">Provides one nutritious meal</div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                          <div className="text-3xl font-bold text-[#008080] mb-2">$10</div>
                          <div className="text-gray-600">Feeds a person for 5 days</div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                          <div className="text-3xl font-bold text-[#008080] mb-2">$60</div>
                          <div className="text-gray-600">Feeds a family of 3 for a week</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl overflow-hidden shadow-md mt-8 p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">How Our Meal Program Works</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Preparation</h3>
                      <p className="text-gray-600 mb-4">
                        Our dedicated volunteers work with local chefs to prepare nutritionally balanced meals in our 
                        community kitchens. We focus on using fresh, locally sourced ingredients whenever possible.
                      </p>
                      
                      <h3 className="font-semibold text-gray-800 mb-2">Distribution</h3>
                      <p className="text-gray-600">
                        Meals are distributed through our community centers, partner shelters, and mobile food vans 
                        that reach underserved areas throughout the region.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Nutrition Focus</h3>
                      <p className="text-gray-600 mb-4">
                        Each meal is designed to provide a balanced combination of protein, vegetables, 
                        and carbohydrates to ensure recipients receive adequate nutrition.
                      </p>
                      
                      <h3 className="font-semibold text-gray-800 mb-2">Dignity First</h3>
                      <p className="text-gray-600">
                        We believe everyone deserves to be treated with respect. Our program is designed 
                        to preserve the dignity of recipients while providing essential food support.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Sidebar - 1 column */}
              <div className="lg:col-span-1">
                {/* Donation Card */}
                <div className="bg-white rounded-xl overflow-hidden shadow-md mb-6">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Donate a Meal</h3>
                    <p className="text-gray-600 mb-6">
                      Your contribution provides nutritious meals to those who need it most. 
                      Just $2 can feed one person for a day.
                    </p>
                    <button 
                      onClick={handleDonateClick}
                      className="w-full py-3 bg-[#008080] hover:bg-[#006666] text-white rounded-lg transition duration-200"
                    >
                      Provide a Meal - $2
                    </button>
                  </div>
                </div>
                
                {/* Statistics Card */}
                <div className="bg-white rounded-xl overflow-hidden shadow-md mb-6">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Program Impact</h3>
                    <div className="space-y-4">
                      <div className="border-b border-gray-100 pb-3">
                        <div className="text-3xl font-bold text-[#008080]">5,000+</div>
                        <div className="text-gray-600">Meals served monthly</div>
                      </div>
                      <div className="border-b border-gray-100 pb-3">
                        <div className="text-3xl font-bold text-[#008080]">12</div>
                        <div className="text-gray-600">Distribution locations</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-[#008080]">98%</div>
                        <div className="text-gray-600">Of donations directly fund meals</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl overflow-hidden shadow-md">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Other Food Programs</h3>
                    <ul className="space-y-3">
                      <li>
                        <Link href="/programs/food/packages" className="text-[#008080] hover:underline">
                          Food Parcels Distribution
                        </Link>
                      </li>
                      <li>
                        <Link href="/programs/food/aqeeqah" className="text-[#008080] hover:underline">
                          Aqeeqah Services
                        </Link>
                      </li>
                      <li>
                        <Link href="/programs/food/vows" className="text-[#008080] hover:underline">
                          Vows and Nazar Services
                        </Link>
                      </li>
                      <li>
                        <Link href="/programs/food/qurbani" className="text-[#008080] hover:underline">
                          Qurbani Services
                        </Link>
                      </li>
                    </ul>
                    
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <Link href="/programs/food" className="text-[#008080] font-medium hover:underline">
                        View all food programs →
                      </Link>
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

// Main component
const MealsPage = () => {
  return (
    <PayPalProvider>
      <DonationProvider programId="meals">
        <MealsPageContent />
      </DonationProvider>
    </PayPalProvider>
  );
};

export default MealsPage;