"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Home, Package } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
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

interface PackageOption {
  id: string;
  name: string;
  description: string;
  price: number;
  serves: string;
  duration: string;
}

// Package options data
const packageOptions: PackageOption[] = [
  {
    id: 'family-10',
    name: 'Family of 10 Package',
    description: 'A comprehensive food package that feeds a large family for one month.',
    price: 150,
    serves: '10 people',
    duration: '1 month'
  },
  {
    id: 'family-5',
    name: 'Family of 5 Package',
    description: 'A complete food package that feeds a medium-sized family for one month.',
    price: 100,
    serves: '5 people',
    duration: '1 month'
  },
  {
    id: 'family-3',
    name: 'Family of 3 Package',
    description: 'A food package that feeds a small family for one month.',
    price: 70,
    serves: '3 people',
    duration: '1 month'
  }
];

// Add this interface for the package donation modal props
interface PackageDonationModalProps {
  selectedPackage: PackageOption;
  onClose: () => void;
}

// Package donation modal component
const PackageDonationModal = ({ selectedPackage, onClose }: PackageDonationModalProps) => {
  const { setCurrentModal, setProgramName, setDonationAmount } = useDonation();
  
  const handleDonate = () => {
    setProgramName(`Food Parcels - ${selectedPackage.name}`);
    setDonationAmount(selectedPackage.price);
    setCurrentModal('paymentFees');
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Donate a Food Package</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="text-lg font-semibold text-gray-800">{selectedPackage.name}</div>
          <div className="text-[#008080] font-bold text-xl mb-1">${selectedPackage.price}</div>
          <div className="text-gray-600 text-sm">Serves: {selectedPackage.serves}</div>
          <div className="text-gray-600 text-sm">Duration: {selectedPackage.duration}</div>
        </div>
        <p className="text-gray-600 mb-6">
          Your donation will provide essential groceries and staples to families in need,
          helping them maintain proper nutrition for an entire month.
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
            className="px-6 py-2 bg-[#008080] hover:bg-[#006666] text-white rounded-lg"
          >
            Donate ${selectedPackage.price}
          </button>
        </div>
      </div>
    </div>
  );
};

const PackagesPageContent = () => {
  const [authModal, setAuthModal] = useState(false);
  const [packageModal, setPackageModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<PackageOption | null>(null);
  const { currentModal } = useDonation();
  
  const handleDonateClick = (packageOption: PackageOption) => {
    setSelectedPackage(packageOption);
    setPackageModal(true);
  };

  return (
    <>
      <Navbar onAuthModalOpen={() => setAuthModal(true)} />
      <AuthModal isOpen={authModal} onClose={() => setAuthModal(false)} />
      
      {packageModal && selectedPackage && (
        <PackageDonationModal 
          selectedPackage={selectedPackage} 
          onClose={() => setPackageModal(false)} 
        />
      )}
      
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
              <span className="text-gray-900">Food Parcels</span>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main content - 2 columns */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl overflow-hidden shadow-md">
                  <div className="relative h-56 md:h-64">
                    <Image 
                      src="/programs/food-parcels.jpg" 
                      alt="Food Parcels Distribution" 
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Food Parcels Distribution Program</h1>
                    <p className="text-gray-600 mb-4">
                      Our Food Parcels Distribution program provides essential groceries and staples to 
                      families facing food insecurity. Each package contains nutritionally balanced items 
                      that help sustain families for an entire month.
                    </p>
                    <p className="text-gray-600 mb-6">
                      We offer different package sizes to accommodate various family sizes, ensuring that 
                      households receive adequate nutrition according to their specific needs. All packages 
                      include grains, proteins, vegetables, cooking oil, and other essential food items.
                    </p>
                    
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Available Food Packages</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      {packageOptions.map(pkg => (
                        <div key={pkg.id} className="bg-gray-50 rounded-lg p-4">
                          <h3 className="font-semibold text-gray-800 mb-1">{pkg.name}</h3>
                          <div className="text-2xl font-bold text-[#008080] mb-2">${pkg.price}</div>
                          <p className="text-sm text-gray-600 mb-3">{pkg.description}</p>
                          <div className="flex justify-between text-sm text-gray-600 mb-4">
                            <span>Serves: {pkg.serves}</span>
                            <span>Duration: {pkg.duration}</span>
                          </div>
                          <button 
                            onClick={() => handleDonateClick(pkg)}
                            className="w-full py-2 bg-[#008080] hover:bg-[#006666] text-white text-sm rounded-lg transition"
                          >
                            Donate This Package
                          </button>
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t border-gray-200 pt-6 mt-6">
                      <h2 className="text-xl font-semibold text-gray-800 mb-4">What's Included in Our Food Packages</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="font-semibold text-gray-800 mb-2">Staple Foods</h3>
                          <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
                            <li>Rice and grains (5-15kg depending on family size)</li>
                            <li>Flour (2-5kg)</li>
                            <li>Pasta and noodles</li>
                            <li>Cooking oil (1-2 bottles)</li>
                          </ul>
                          
                          <h3 className="font-semibold text-gray-800 mb-2">Proteins</h3>
                          <ul className="list-disc list-inside text-gray-600 space-y-1">
                            <li>Beans and lentils</li>
                            <li>Canned fish/meat</li>
                            <li>Eggs</li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800 mb-2">Other Essentials</h3>
                          <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
                            <li>Salt, sugar, and basic spices</li>
                            <li>Tea/coffee</li>
                            <li>Powdered milk</li>
                          </ul>
                          
                          <h3 className="font-semibold text-gray-800 mb-2">When Possible</h3>
                          <ul className="list-disc list-inside text-gray-600 space-y-1">
                            <li>Fresh or canned vegetables</li>
                            <li>Fresh or dried fruit</li>
                            <li>Soap and basic hygiene items</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Sidebar - 1 column */}
              <div className="lg:col-span-1">
                {/* Donation Card */}
                <div className="bg-white rounded-xl overflow-hidden shadow-md mb-6">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Choose a Package</h3>
                    <p className="text-gray-600 mb-6">
                      Select the food package that best matches your donation capacity:
                    </p>
                    <div className="space-y-3">
                      {packageOptions.map(pkg => (
                        <button 
                          key={pkg.id}
                          onClick={() => handleDonateClick(pkg)}
                          className="w-full py-3 border border-[#008080] text-[#008080] hover:bg-[#008080] hover:text-white rounded-lg transition duration-200 flex justify-between items-center px-4"
                        >
                          <span>{pkg.name}</span>
                          <span className="font-bold">${pkg.price}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Statistics Card */}
                <div className="bg-white rounded-xl overflow-hidden shadow-md mb-6">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Program Impact</h3>
                    <div className="space-y-4">
                      <div className="border-b border-gray-100 pb-3">
                        <div className="text-3xl font-bold text-[#008080]">750+</div>
                        <div className="text-gray-600">Families supported monthly</div>
                      </div>
                      <div className="border-b border-gray-100 pb-3">
                        <div className="text-3xl font-bold text-[#008080]">8</div>
                        <div className="text-gray-600">Distribution centers</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-[#008080]">95%</div>
                        <div className="text-gray-600">Of donations directly fund packages</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Other Programs Card */}
                <div className="bg-white rounded-xl overflow-hidden shadow-md">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Other Food Programs</h3>
                    <ul className="space-y-3">
                      <li>
                        <Link href="/programs/food/meals" className="text-[#008080] hover:underline">
                          Hot Meal Distribution
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

// Main component wrapped with DonationProvider
const PackagesPage = () => {
  return (
    <PayPalProvider>
      <DonationProvider programId="food-packages">
        <PackagesPageContent />
      </DonationProvider>
    </PayPalProvider>
  );
};

export default PackagesPage;