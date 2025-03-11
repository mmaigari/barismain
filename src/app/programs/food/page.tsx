"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Home, Utensils } from 'lucide-react';
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
import PayPalProvider from '@/components/payment/PayPalProvider';
import AnimalOfferingCard from '@/components/donation/AnimalOfferingCard';

// Wrapper component to use the donation context
const FoodProgramContent = () => {
  const [authModal, setAuthModal] = useState(false);
  const { currentModal, setCurrentModal, startDonation, setProgramName } = useDonation();
  
  // Handle program donation using the medical page pattern
  const handleProgramDonation = (e: React.MouseEvent) => {
    e.preventDefault();
    setProgramName("Food Security Program");
    setCurrentModal('donationOptions');
  };

  // For specific meal donations
  const handleMealDonation = (mealType: string, amount: number) => {
    startDonation(mealType, amount);
  };

  return (
    <>
      <Navbar onAuthModalOpen={() => setAuthModal(true)} />
      <AuthModal isOpen={authModal} onClose={() => setAuthModal(false)} />
      
      {/* Donation Flow Modals */}
      {currentModal === 'donationOptions' && <DonationOptionsModal />}
      {currentModal === 'paymentFees' && <PaymentFeesModal />}
      {currentModal === 'teamSupport' && <TeamSupportModal />}
      {currentModal === 'signIn' && <SignInModal />}
      {currentModal === 'guestContinue' && <GuestContinueModal />}
      {currentModal === 'paymentMethod' && <PaymentMethodModal />}
      {currentModal === 'confirmation' && <ConfirmationModal />}
      
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-r from-[#008080] to-[#007070] text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image 
            src="/programs/food-pattern.jpg" 
            alt="Food Pattern Background" 
            fill
            className="object-cover object-center"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-white/80 mb-4">
            <Link href="/" className="hover:text-white flex items-center">
              <Home className="w-3 h-3 mr-1" />
              Home
            </Link>
            <ChevronRight className="w-3 h-3 mx-1" />
            <Link href="/programs" className="hover:text-white">
              Programs
            </Link>
            <ChevronRight className="w-3 h-3 mx-1" />
            <span className="text-white font-medium">Food Program</span>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-white/10 backdrop-blur-sm">
              <Utensils className="w-8 h-8" />
            </div>
            <div>
              <h1 className="font-montserrat text-3xl md:text-4xl font-bold mb-2">
                Food Security Program
              </h1>
              <div className="w-24 h-1 bg-white rounded-full mb-4"></div>
              <p className="text-lg max-w-2xl text-white/90 mb-6">
                Our Food Security Program provides essential nutrition to vulnerable 
                communities through hot meal distribution, food parcels, and specialized 
                services to combat hunger and malnutrition.
              </p>
              
              {/* Donation and volunteer buttons */}
              <div className="mt-6">
                <a
                  href="#"
                  onClick={handleProgramDonation}
                  className="px-8 py-4 text-base font-semibold text-[#008080] bg-white rounded-lg hover:bg-gray-100 transition-all mr-4"
                >
                  Donate to This Program
                </a>
                <Link
                  href="/volunteer?program=food"
                  className="px-8 py-4 text-base font-semibold text-white border-2 border-white rounded-lg hover:bg-white/10 transition-all"
                >
                  Volunteer with Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* For meal-specific donations */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Meal Card */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 relative">
                  <Image 
                    src="/programs/basic-meal.jpg" 
                    alt="Basic Meal" 
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Basic Meal</h3>
                  <p className="text-gray-600 mb-4">
                    A nutritionally balanced meal providing essential calories and nutrients for one person.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-[#008080]">$2</span>
                    <button 
                      className="bg-[#008080] hover:bg-[#006666] text-white py-2 px-4 rounded-md transition"
                      onClick={() => handleMealDonation('Basic Meal', 2)}
                    >
                      Feed Now
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Jumbo Meal Card */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 relative">
                  <Image 
                    src="/programs/jumbo-meal.jpg" 
                    alt="Jumbo Meal" 
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Jumbo Meal</h3>
                  <p className="text-gray-600 mb-4">
                    A larger, more substantial meal with additional protein and sides for those in greater need.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-[#008080]">$4</span>
                    <button 
                      className="bg-[#008080] hover:bg-[#006666] text-white py-2 px-4 rounded-md transition"
                      onClick={() => handleMealDonation('Jumbo Meal', 4)}
                    >
                      Feed Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Food Parcels Distribution */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Food Parcels Distribution</h2>
            <p className="text-gray-600 mb-8">Provide essential nutrition to families in need with our monthly food packages.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Family of 10 */}
              <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Family of 10 Package</h3>
                  <p className="text-gray-600 mb-4">
                    A comprehensive food package that feeds a large family for one month.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-[#008080]">$150</span>
                    <button 
                      className="bg-[#008080] hover:bg-[#006666] text-white py-2 px-4 rounded-md transition"
                      onClick={() => handleMealDonation('Family Package (10)', 150)}
                    >
                      Donate
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Family of 5 */}
              <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Family of 5 Package</h3>
                  <p className="text-gray-600 mb-4">
                    A complete food package that feeds a medium-sized family for one month.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-[#008080]">$100</span>
                    <button 
                      className="bg-[#008080] hover:bg-[#006666] text-white py-2 px-4 rounded-md transition"
                      onClick={() => handleMealDonation('Family Package (5)', 100)}
                    >
                      Donate
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Family of 3 */}
              <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Family of 3 Package</h3>
                  <p className="text-gray-600 mb-4">
                    A food package that feeds a small family for one month.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-[#008080]">$70</span>
                    <button 
                      className="bg-[#008080] hover:bg-[#006666] text-white py-2 px-4 rounded-md transition"
                      onClick={() => handleMealDonation('Family Package (3)', 70)}
                    >
                      Donate
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Aqeeqah Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Aqeeqah</h2>
            <p className="text-gray-600 mb-8">Support our charitable giving through traditional Aqeeqah offerings.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <AnimalOfferingCard
                type="Sheep"
                category="Aqeeqah"
                prices={[
                  { description: "20-25 kg", price: 80 },
                  { description: "40-50 kg", price: 120 }
                ]}
                onSelect={handleMealDonation}
              />
              
              <AnimalOfferingCard
                type="Goat"
                category="Aqeeqah"
                prices={[{ description: "Standard size", price: 60 }]}
                onSelect={handleMealDonation}
              />
              
              <AnimalOfferingCard
                type="Cow"
                category="Aqeeqah"
                prices={[
                  { description: "80 kg", price: 300 },
                  { description: "100 kg", price: 330 },
                  { description: "120 kg", price: 360 }
                ]}
                onSelect={handleMealDonation}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vows Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Vows</h2>
            <p className="text-gray-600 mb-8">Fulfill your vows through our charitable distribution program.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <AnimalOfferingCard
                type="Sheep"
                category="Vows"
                prices={[
                  { description: "20-25 kg", price: 80 },
                  { description: "40-50 kg", price: 120 }
                ]}
                onSelect={handleMealDonation}
              />
              
              <AnimalOfferingCard
                type="Goat"
                category="Vows"
                prices={[{ description: "Standard size", price: 60 }]}
                onSelect={handleMealDonation}
              />
              
              <AnimalOfferingCard
                type="Cow"
                category="Vows"
                prices={[
                  { description: "80 kg", price: 300 },
                  { description: "100 kg", price: 330 },
                  { description: "120 kg", price: 360 }
                ]}
                onSelect={handleMealDonation}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Qurbani Services */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Qurbani Services</h2>
            <p className="text-gray-600 mb-8">Participate in our Qurbani program to help feed those in need.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <AnimalOfferingCard
                type="Sheep"
                category="Qurbani"
                prices={[
                  { description: "20-25 kg", price: 80 },
                  { description: "40-50 kg", price: 120 }
                ]}
                onSelect={handleMealDonation}
              />
              
              <AnimalOfferingCard
                type="Goat"
                category="Qurbani"
                prices={[{ description: "Standard size", price: 60 }]}
                onSelect={handleMealDonation}
              />
              
              <AnimalOfferingCard
                type="Cow"
                category="Qurbani"
                prices={[
                  { description: "80 kg", price: 300 },
                  { description: "100 kg", price: 330 },
                  { description: "120 kg", price: 360 }
                ]}
                onSelect={handleMealDonation}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// Main component wrapped with DonationProvider
export default function FoodProgramPage() {
  return (
    <PayPalProvider>
      <DonationProvider programId="food">
        <FoodProgramContent />
      </DonationProvider>
    </PayPalProvider>
  );
}