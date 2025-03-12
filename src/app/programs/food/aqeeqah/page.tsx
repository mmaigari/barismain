"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Home, Heart } from 'lucide-react';
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

interface AnimalOption {
  id: string;
  type: string;
  description: string;
  price: number;
  weight?: string;
}

// Animal options data
const animalOptions: AnimalOption[] = [
  {
    id: 'sheep-small',
    type: 'Sheep',
    description: 'Small size sheep',
    weight: '20-25 kg',
    price: 80,
  },
  {
    id: 'sheep-large',
    type: 'Sheep',
    description: 'Large size sheep',
    weight: '40-50 kg',
    price: 120,
  },
  {
    id: 'goat',
    type: 'Goat',
    description: 'Standard size goat',
    price: 60,
  },
  {
    id: 'cow-small',
    type: 'Cow',
    description: 'Small size cow',
    weight: '80 kg',
    price: 300,
  },
  {
    id: 'cow-medium',
    type: 'Cow',
    description: 'Medium size cow',
    weight: '100 kg',
    price: 330,
  },
  {
    id: 'cow-large',
    type: 'Cow',
    description: 'Large size cow',
    weight: '120 kg',
    price: 360,
  },
];

// Aqeeqah donation modal component
const AqeeqahDonationModal = ({ selectedAnimal, onClose }) => {
  const { setCurrentModal, setProgramName, setDonationAmount } = useDonation();
  
  const handleDonate = () => {
    const animalDescription = selectedAnimal.weight 
      ? `${selectedAnimal.type} (${selectedAnimal.weight})`
      : selectedAnimal.type;
      
    setProgramName(`Aqeeqah - ${animalDescription}`);
    setDonationAmount(selectedAnimal.price);
    setCurrentModal('paymentFees');
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Aqeeqah Donation</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="text-lg font-semibold text-gray-800">
            {selectedAnimal.type} 
            {selectedAnimal.weight && <span> ({selectedAnimal.weight})</span>}
          </div>
          <div className="text-[#008080] font-bold text-xl mb-1">${selectedAnimal.price}</div>
          <div className="text-gray-600 text-sm">{selectedAnimal.description}</div>
        </div>
        <p className="text-gray-600 mb-6">
          Your donation will support our Aqeeqah program, providing meat to families in need
          while fulfilling this important religious practice.
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
            Donate ${selectedAnimal.price}
          </button>
        </div>
      </div>
    </div>
  );
};

const AqeeqahPageContent = () => {
  const [authModal, setAuthModal] = useState(false);
  const [aqeeqahModal, setAqeeqahModal] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState<AnimalOption | null>(null);
  const { currentModal } = useDonation();
  
  const handleDonateClick = (animal: AnimalOption) => {
    setSelectedAnimal(animal);
    setAqeeqahModal(true);
  };

  return (
    <>
      <Navbar onAuthModalOpen={() => setAuthModal(true)} />
      <AuthModal isOpen={authModal} onClose={() => setAuthModal(false)} />
      
      {aqeeqahModal && selectedAnimal && (
        <AqeeqahDonationModal 
          selectedAnimal={selectedAnimal} 
          onClose={() => setAqeeqahModal(false)} 
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
              <span className="text-gray-900">Aqeeqah Services</span>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main content - 2 columns */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl overflow-hidden shadow-md">
                  <div className="relative h-56 md:h-64">
                    <Image 
                      src="/programs/aqeeqah.jpg" 
                      alt="Aqeeqah Services" 
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Aqeeqah Services</h1>
                    <p className="text-gray-600 mb-4">
                      Our Aqeeqah service allows you to fulfill this important religious tradition while 
                      helping provide nutritious meat to families in need. We ensure proper Islamic 
                      requirements are observed throughout the process.
                    </p>
                    <p className="text-gray-600 mb-6">
                      The meat from your Aqeeqah donation is distributed among vulnerable families, orphans, 
                      and individuals experiencing food insecurity. This allows you to combine an important 
                      religious obligation with charitable giving.
                    </p>
                    
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Available Aqeeqah Options</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      {/* Sheep Card */}
                      <div className="bg-gray-50 rounded-lg p-5">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Sheep</h3>
                        <div className="space-y-3 mb-4">
                          <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                            <div>
                              <div className="font-medium">Small (20-25 kg)</div>
                              <div className="text-sm text-gray-500">Suitable for small gatherings</div>
                            </div>
                            <div className="text-xl font-bold text-[#008080]">$80</div>
                          </div>
                          <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                            <div>
                              <div className="font-medium">Large (40-50 kg)</div>
                              <div className="text-sm text-gray-500">Perfect for larger gatherings</div>
                            </div>
                            <div className="text-xl font-bold text-[#008080]">$120</div>
                          </div>
                        </div>
                        <button 
                          onClick={() => handleDonateClick(animalOptions[0])}
                          className="w-full py-2 bg-[#008080] hover:bg-[#006666] text-white rounded-lg transition"
                        >
                          Select Sheep Option
                        </button>
                      </div>
                      
                      {/* Goat Card */}
                      <div className="bg-gray-50 rounded-lg p-5">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Goat</h3>
                        <div className="space-y-3 mb-4">
                          <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                            <div>
                              <div className="font-medium">Standard Size</div>
                              <div className="text-sm text-gray-500">Traditional option</div>
                            </div>
                            <div className="text-xl font-bold text-[#008080]">$60</div>
                          </div>
                          <div className="h-[52px]">
                            {/* Empty space to match height with sheep card */}
                          </div>
                        </div>
                        <button 
                          onClick={() => handleDonateClick(animalOptions[2])}
                          className="w-full py-2 bg-[#008080] hover:bg-[#006666] text-white rounded-lg transition"
                        >
                          Donate Goat Aqeeqah
                        </button>
                      </div>
                      
                      {/* Cow Card */}
                      <div className="bg-gray-50 rounded-lg p-5 md:col-span-2">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Cow</h3>
                        <div className="space-y-3 mb-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="border-b md:border-b-0 md:border-r border-gray-200 pb-2 md:pb-0 md:pr-4">
                              <div className="font-medium">Small (80 kg)</div>
                              <div className="text-sm text-gray-500">Suitable for sharing</div>
                              <div className="text-xl font-bold text-[#008080] mt-2">$300</div>
                              <button 
                                onClick={() => handleDonateClick(animalOptions[3])}
                                className="mt-3 w-full py-2 bg-[#008080] hover:bg-[#006666] text-white text-sm rounded-lg transition"
                              >
                                Select This Option
                              </button>
                            </div>
                            
                            <div className="border-b md:border-b-0 md:border-r border-gray-200 pb-2 md:pb-0 md:pr-4">
                              <div className="font-medium">Medium (100 kg)</div>
                              <div className="text-sm text-gray-500">Most popular size</div>
                              <div className="text-xl font-bold text-[#008080] mt-2">$330</div>
                              <button 
                                onClick={() => handleDonateClick(animalOptions[4])}
                                className="mt-3 w-full py-2 bg-[#008080] hover:bg-[#006666] text-white text-sm rounded-lg transition"
                              >
                                Select This Option
                              </button>
                            </div>
                            
                            <div>
                              <div className="font-medium">Large (120 kg)</div>
                              <div className="text-sm text-gray-500">For maximum benefit</div>
                              <div className="text-xl font-bold text-[#008080] mt-2">$360</div>
                              <button 
                                onClick={() => handleDonateClick(animalOptions[5])}
                                className="mt-3 w-full py-2 bg-[#008080] hover:bg-[#006666] text-white text-sm rounded-lg transition"
                              >
                                Select This Option
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-6 mt-6">
                      <h2 className="text-xl font-semibold text-gray-800 mb-4">About Aqeeqah</h2>
                      <p className="text-gray-600 mb-4">
                        Aqeeqah is the Islamic tradition of sacrificing an animal on the occasion of a child's birth.
                        It is a way of expressing gratitude to Allah for the blessing of a child. The meat from the 
                        sacrificed animal is traditionally distributed among family, friends and the poor.
                      </p>
                      <p className="text-gray-600 mb-4">
                        Our Aqeeqah service makes it easy to fulfill this tradition while helping those in need.
                        We handle all aspects of the process according to proper Islamic guidelines, from the selection
                        of healthy animals to the proper method of sacrifice and distribution.
                      </p>
                      
                      <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">How Our Process Works</h3>
                      <ol className="list-decimal list-inside text-gray-600 space-y-2">
                        <li>Select your preferred animal and size</li>
                        <li>Make your donation through our secure payment system</li>
                        <li>Our team performs the Aqeeqah according to Islamic requirements</li>
                        <li>The meat is distributed to those in need in your community</li>
                        <li>You receive confirmation and photos of the completed Aqeeqah (upon request)</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Sidebar - 1 column */}
              <div className="lg:col-span-1">
                {/* Quick Donation Card */}
                <div className="bg-white rounded-xl overflow-hidden shadow-md mb-6">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Aqeeqah Selection</h3>
                    <p className="text-gray-600 mb-6">
                      Choose from our most popular Aqeeqah options:
                    </p>
                    <div className="space-y-3">
                      <button 
                        onClick={() => handleDonateClick(animalOptions[0])}
                        className="w-full py-3 border border-[#008080] text-[#008080] hover:bg-[#008080] hover:text-white rounded-lg transition duration-200 flex justify-between items-center px-4"
                      >
                        <span>Sheep (Small)</span>
                        <span className="font-bold">$80</span>
                      </button>
                      
                      <button 
                        onClick={() => handleDonateClick(animalOptions[2])}
                        className="w-full py-3 border border-[#008080] text-[#008080] hover:bg-[#008080] hover:text-white rounded-lg transition duration-200 flex justify-between items-center px-4"
                      >
                        <span>Goat</span>
                        <span className="font-bold">$60</span>
                      </button>
                      
                      <button 
                        onClick={() => handleDonateClick(animalOptions[4])}
                        className="w-full py-3 border border-[#008080] text-[#008080] hover:bg-[#008080] hover:text-white rounded-lg transition duration-200 flex justify-between items-center px-4"
                      >
                        <span>Cow (Medium)</span>
                        <span className="font-bold">$330</span>
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* FAQ Card */}
                <div className="bg-white rounded-xl overflow-hidden shadow-md mb-6">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Frequently Asked Questions</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-800">When should Aqeeqah be performed?</h4>
                        <p className="text-sm text-gray-600">Traditionally, Aqeeqah is performed on the 7th, 14th, or 21st day after birth, but it can be done later if needed.</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-800">What information do I need to provide?</h4>
                        <p className="text-sm text-gray-600">The child's name and gender, if you wish to associate the Aqeeqah with a specific child.</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-800">Can I request a specific date for the Aqeeqah?</h4>
                        <p className="text-sm text-gray-600">Yes, you can request a specific date in the notes section during checkout.</p>
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
                        <Link href="/programs/food/packages" className="text-[#008080] hover:underline">
                          Food Parcels Distribution
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
const AqeeqahPage = () => {
  return (
    <PayPalProvider>
      <DonationProvider programId="aqeeqah">
        <AqeeqahPageContent />
      </DonationProvider>
    </PayPalProvider>
  );
};

export default AqeeqahPage;