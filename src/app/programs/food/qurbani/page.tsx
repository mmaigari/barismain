"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Home, Landmark } from 'lucide-react';
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

// Animal options data - same as other pages for consistency
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

// Add an interface for the Qurbani donation modal props
interface QurbaniDonationModalProps {
  selectedAnimal: AnimalOption;
  onClose: () => void;
}

// Qurbani donation modal component
const QurbaniDonationModal = ({ selectedAnimal, onClose }: QurbaniDonationModalProps) => {
  const { setCurrentModal, setProgramName, setDonationAmount } = useDonation();
  
  const handleDonate = () => {
    const animalDescription = selectedAnimal.weight 
      ? `${selectedAnimal.type} (${selectedAnimal.weight})`
      : selectedAnimal.type;
      
    setProgramName(`Qurbani - ${animalDescription}`);
    setDonationAmount(selectedAnimal.price);
    setCurrentModal('paymentFees');
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Qurbani Donation</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="text-lg font-semibold text-gray-800">
            {selectedAnimal.type} 
            {selectedAnimal.weight && <span> ({selectedAnimal.weight})</span>}
          </div>
          <div className="text-[#008080] font-bold text-xl mb-1">${selectedAnimal.price}</div>
          <div className="text-gray-600 text-sm">{selectedAnimal.description}</div>
        </div>
        <p className="text-gray-600 mb-6">
          Your Qurbani donation will be performed according to proper Islamic guidelines, and
          the meat will be distributed to those in need during Eid al-Adha.
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

const QurbaniPageContent = () => {
  const [authModal, setAuthModal] = useState(false);
  const [qurbaniModal, setQurbaniModal] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState<AnimalOption | null>(null);
  const { currentModal } = useDonation();
  
  const handleDonateClick = (animal: AnimalOption) => {
    setSelectedAnimal(animal);
    setQurbaniModal(true);
  };

  return (
    <>
      <Navbar onAuthModalOpen={() => setAuthModal(true)} />
      <AuthModal isOpen={authModal} onClose={() => setAuthModal(false)} />
      
      {qurbaniModal && selectedAnimal && (
        <QurbaniDonationModal 
          selectedAnimal={selectedAnimal} 
          onClose={() => setQurbaniModal(false)} 
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
              <span className="text-gray-900">Qurbani Services</span>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main content - 2 columns */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl overflow-hidden shadow-md">
                  <div className="relative h-56 md:h-64">
                    <Image 
                      src="/programs/qurbani.jpg" 
                      alt="Qurbani Services" 
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Qurbani Services</h1>
                    <p className="text-gray-600 mb-4">
                      Our Qurbani service helps you fulfill this important religious obligation during 
                      Eid al-Adha while providing meat to families in need. We ensure your sacrifice is performed 
                      according to proper Islamic guidelines and distributed to benefit those most vulnerable in our communities.
                    </p>
                    <p className="text-gray-600 mb-6">
                      When you donate for Qurbani through our program, the meat is distributed in three parts: 
                      one-third to the poor and needy, one-third to relatives and neighbors, and one-third to 
                      community members, following Sunnah tradition.
                    </p>
                    
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Qurbani Options</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      {/* Sheep Card */}
                      <div className="bg-gray-50 rounded-lg p-5">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Sheep</h3>
                        <div className="space-y-3 mb-4">
                          <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                            <div>
                              <div className="font-medium">Small (20-25 kg)</div>
                              <div className="text-sm text-gray-500">Standard Qurbani option</div>
                            </div>
                            <div className="text-xl font-bold text-[#008080]">$80</div>
                          </div>
                          <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                            <div>
                              <div className="font-medium">Large (40-50 kg)</div>
                              <div className="text-sm text-gray-500">Greater meat distribution</div>
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
                              <div className="text-sm text-gray-500">Traditional Qurbani option</div>
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
                          Donate Goat Qurbani
                        </button>
                      </div>
                      
                      {/* Cow Card */}
                      <div className="bg-gray-50 rounded-lg p-5 md:col-span-2">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Cow</h3>
                        <div className="space-y-3 mb-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="border-b md:border-b-0 md:border-r border-gray-200 pb-2 md:pb-0 md:pr-4">
                              <div className="font-medium">Small (80 kg)</div>
                              <div className="text-sm text-gray-500">Cow share option</div>
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
                              <div className="text-sm text-gray-500">Ideal for multiple shares</div>
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
                              <div className="text-sm text-gray-500">Maximum blessing</div>
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
                      <h2 className="text-xl font-semibold text-gray-800 mb-4">About Qurbani</h2>
                      <p className="text-gray-600 mb-4">
                        Qurbani (also known as Udhiyah) is the sacrifice of an animal during Eid al-Adha, 
                        commemorating Prophet Ibrahim's willingness to sacrifice his son in obedience to Allah. 
                        It is an obligation for every financially able Muslim adult and is performed during the 
                        days of Eid al-Adha.
                      </p>
                      <p className="text-gray-600 mb-4">
                        The purpose of Qurbani is not just the sacrifice itself, but to remember Allah's mercy and to 
                        share with those less fortunate. By distributing the meat among the poor and needy, we help ensure 
                        that everyone can join in the celebration of Eid.
                      </p>
                      
                      <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">Our Qurbani Process</h3>
                      <ol className="list-decimal list-inside text-gray-600 space-y-2">
                        <li>Select your preferred animal for Qurbani</li>
                        <li>Make your donation through our secure payment system</li>
                        <li>We arrange for the sacrifice during the designated days of Eid al-Adha</li>
                        <li>The sacrifice is performed according to Islamic guidelines</li>
                        <li>The meat is distributed to those in need in your specified community</li>
                        <li>You receive confirmation of your Qurbani being performed</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Sidebar - 1 column */}
              <div className="lg:col-span-1">
                {/* Quick Selection Card */}
                <div className="bg-white rounded-xl overflow-hidden shadow-md mb-6">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Qurbani Selection</h3>
                    <p className="text-gray-600 mb-6">
                      Choose from our most popular Qurbani options:
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
                
                {/* Calendar/Timing Card */}
                <div className="bg-white rounded-xl overflow-hidden shadow-md mb-6">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Important Dates</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="bg-[#008080]/10 rounded-lg p-2 mr-3">
                          <Landmark className="w-5 h-5 text-[#008080]" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">Qurbani Period</h4>
                          <p className="text-sm text-gray-600">Sacrifices are performed during the days of Eid al-Adha (10th-12th of Dhul Hijjah).</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-[#008080]/10 rounded-lg p-2 mr-3">
                          <Landmark className="w-5 h-5 text-[#008080]" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">Donation Deadline</h4>
                          <p className="text-sm text-gray-600">For guaranteed Qurbani performance, please donate at least 3 days before Eid al-Adha.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* FAQ Card */}
                <div className="bg-white rounded-xl overflow-hidden shadow-md mb-6">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Frequently Asked Questions</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-800">Can I specify who receives my Qurbani?</h4>
                        <p className="text-sm text-gray-600">You can select a general region, but specific recipients are determined based on need assessment.</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-800">Do you provide Qurbani certificates?</h4>
                        <p className="text-sm text-gray-600">Yes, we provide digital certificates for all Qurbani donations.</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-800">Can I make Qurbani on behalf of others?</h4>
                        <p className="text-sm text-gray-600">Yes, you can donate Qurbani on behalf of yourself and your family members.</p>
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
                        <Link href="/programs/food/aqeeqah" className="text-[#008080] hover:underline">
                          Aqeeqah Services
                        </Link>
                      </li>
                      <li>
                        <Link href="/programs/food/vows" className="text-[#008080] hover:underline">
                          Vows and Nazar Services
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
const QurbaniPage = () => {
  return (
    <PayPalProvider>
      <DonationProvider programId="qurbani">
        <QurbaniPageContent />
      </DonationProvider>
    </PayPalProvider>
  );
};

export default QurbaniPage;