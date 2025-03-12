"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Home, Droplet } from 'lucide-react';
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
import { washPrograms } from '@/data/washPrograms';

// Add interface for the modal props
interface BucketWellDonationModalProps {
  fixedCost: number;
  onClose: () => void;
}

// Donation modal component with proper type annotations
const BucketWellDonationModal = ({ fixedCost, onClose }: BucketWellDonationModalProps) => {
  const { setCurrentModal, setProgramName, setDonationAmount } = useDonation();
  
  const handleDonate = () => {
    setProgramName("Bucket Well");
    setDonationAmount(fixedCost);
    setCurrentModal('paymentFees');
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Donate a Bucket Well</h3>
        <p className="text-gray-600 mb-6">
          Your donation of ${fixedCost} will fund the construction of a bucket well, providing 
          basic water access to a community in need. Each well can serve 50-100 people with 
          essential water for drinking, cooking, and washing.
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
            className="px-6 py-2 bg-[#0088cc] hover:bg-[#006699] text-white rounded-lg"
          >
            Donate ${fixedCost}
          </button>
        </div>
      </div>
    </div>
  );
};

const BucketWellPageContent = () => {
  const [authModal, setAuthModal] = useState(false);
  const [wellModal, setWellModal] = useState(false);
  const { currentModal } = useDonation();
  
  // Add type annotation to the event parameter
  const handleDonateClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setWellModal(true);
  };

  return (
    <>
      <Navbar onAuthModalOpen={() => setAuthModal(true)} />
      <AuthModal isOpen={authModal} onClose={() => setAuthModal(false)} />
      
      {wellModal && <BucketWellDonationModal fixedCost={300} onClose={() => setWellModal(false)} />}
      
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
              <Link href="/" className="hover:text-[#0088cc]">Home</Link>
              <ChevronRight className="w-3 h-3 mx-1" />
              <Link href="/programs" className="hover:text-[#0088cc]">Programs</Link>
              <ChevronRight className="w-3 h-3 mx-1" />
              <Link href="/programs/wash" className="hover:text-[#0088cc]">WASH</Link>
              <ChevronRight className="w-3 h-3 mx-1" />
              <span className="text-gray-900">Bucket Well</span>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main content - 2 columns */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl overflow-hidden shadow-md">
                  <div className="relative h-56 md:h-64">
                    <Image 
                      src="/programs/bucket-well.jpg" 
                      alt="Bucket Well" 
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Bucket Well Program</h1>
                    <p className="text-gray-600 mb-4">
                      Our Bucket Well program provides a simple but effective water access solution for 
                      communities without clean drinking water. These wells are cost-effective, easy to 
                      maintain, and can be constructed quickly to provide immediate relief to water-scarce areas.
                    </p>
                    <p className="text-gray-600 mb-6">
                      Each bucket well can serve a small community of 50-100 people, providing essential water 
                      for drinking, cooking, and basic hygiene. While more basic than our other well solutions, 
                      bucket wells can be life-changing for communities that previously had to walk miles to 
                      collect unsafe water.
                    </p>
                    
                    <div className="bg-[#0088cc]/10 p-5 rounded-lg mb-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <h2 className="text-xl font-semibold text-gray-800">Bucket Well Construction</h2>
                          <p className="text-gray-600">Full sponsorship of one community well</p>
                        </div>
                        <div className="text-3xl font-bold text-[#0088cc]">$300</div>
                      </div>
                      <button 
                        onClick={handleDonateClick}
                        className="mt-4 w-full py-3 bg-[#0088cc] hover:bg-[#006699] text-white rounded-lg transition"
                      >
                        Sponsor a Bucket Well
                      </button>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-6 mt-6">
                      <h2 className="text-xl font-semibold text-gray-800 mb-4">How Bucket Wells Work</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="font-semibold text-gray-800 mb-2">Construction Process</h3>
                          <p className="text-gray-600 mb-4">
                            A bucket well is hand-dug to a depth of 10-15 meters to reach groundwater. 
                            The walls are reinforced with concrete rings or bricks to prevent collapse.
                            The top is sealed with a concrete platform to prevent contamination from surface water.
                          </p>
                          
                          <h3 className="font-semibold text-gray-800 mb-2">Water Collection</h3>
                          <p className="text-gray-600">
                            Users draw water using a rope and bucket system, hence the name "bucket well." 
                            This simple mechanism requires no electricity or complex parts, making it ideal 
                            for remote areas.
                          </p>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800 mb-2">Community Ownership</h3>
                          <p className="text-gray-600 mb-4">
                            Local community members are trained in the maintenance of the well and form 
                            a water committee to oversee its operation. This ensures long-term sustainability 
                            and community investment in the water source.
                          </p>
                          
                          <h3 className="font-semibold text-gray-800 mb-2">Advantages</h3>
                          <ul className="list-disc list-inside text-gray-600 space-y-1">
                            <li>Low cost compared to other well types</li>
                            <li>Can be constructed quickly (2-3 weeks)</li>
                            <li>Simple maintenance requirements</li>
                            <li>No electricity needed for operation</li>
                            <li>Uses locally available materials</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-6 mt-6">
                      <h2 className="text-xl font-semibold text-gray-800 mb-4">Impact of Your Donation</h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                          <div className="text-3xl font-bold text-[#0088cc] mb-2">50-100</div>
                          <div className="text-gray-600">People served per well</div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                          <div className="text-3xl font-bold text-[#0088cc] mb-2">60%</div>
                          <div className="text-gray-600">Reduction in water-related illness</div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                          <div className="text-3xl font-bold text-[#0088cc] mb-2">3 hrs</div>
                          <div className="text-gray-600">Daily time saved collecting water</div>
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
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Sponsor a Bucket Well</h3>
                    <p className="text-gray-600 mb-6">
                      Your contribution of $300 will provide a complete bucket well for a community in need, 
                      giving them access to clean water for drinking, cooking, and hygiene.
                    </p>
                    <button 
                      onClick={handleDonateClick}
                      className="w-full py-3 bg-[#0088cc] hover:bg-[#006699] text-white rounded-lg transition duration-200"
                    >
                      Donate $300
                    </button>
                  </div>
                </div>
                
                {/* Benefits Card */}
                <div className="bg-white rounded-xl overflow-hidden shadow-md mb-6">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Benefits of Bucket Wells</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="bg-[#0088cc]/10 p-1 rounded-full mr-2 mt-1">
                          <Droplet className="w-4 h-4 text-[#0088cc]" />
                        </span>
                        <span className="text-gray-600">Immediate access to cleaner water</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-[#0088cc]/10 p-1 rounded-full mr-2 mt-1">
                          <Droplet className="w-4 h-4 text-[#0088cc]" />
                        </span>
                        <span className="text-gray-600">Reduced waterborne diseases</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-[#0088cc]/10 p-1 rounded-full mr-2 mt-1">
                          <Droplet className="w-4 h-4 text-[#0088cc]" />
                        </span>
                        <span className="text-gray-600">Less time spent collecting water</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-[#0088cc]/10 p-1 rounded-full mr-2 mt-1">
                          <Droplet className="w-4 h-4 text-[#0088cc]" />
                        </span>
                        <span className="text-gray-600">Improved school attendance, especially for girls</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-[#0088cc]/10 p-1 rounded-full mr-2 mt-1">
                          <Droplet className="w-4 h-4 text-[#0088cc]" />
                        </span>
                        <span className="text-gray-600">Increased community self-sufficiency</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                {/* Other Programs Card */}
                <div className="bg-white rounded-xl overflow-hidden shadow-md">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Other WASH Programs</h3>
                    <ul className="space-y-3">
                      {washPrograms.filter(program => program.id !== 'bucket-well').map(program => (
                        <li key={program.id}>
                          <Link href={program.href} className="text-[#0088cc] hover:underline">
                            {program.title}
                            {program.price && <span className="text-gray-600"> (${program.price})</span>}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <Link href="/programs/wash" className="text-[#0088cc] font-medium hover:underline">
                        View all WASH programs →
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
const BucketWellPage = () => {
  return (
    <PayPalProvider>
      <DonationProvider programId="bucket-well">
        <BucketWellPageContent />
      </DonationProvider>
    </PayPalProvider>
  );
};

export default BucketWellPage;