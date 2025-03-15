"use client"

import React, { useState } from 'react';
import { useDonation } from '@/contexts/DonationContext';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

const ConfirmationModal: React.FC = () => {
  const { 
    programName, 
    donationAmount, 
    formatAmount, 
    donationFrequency,
    setCurrentModal,
    resetDonation
  } = useDonation();

  const handleClose = () => {
    resetDonation();
    setCurrentModal('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-xl p-6 text-center">
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mt-4">Thank You for Your Support!</h2>
          
          <p className="text-gray-600 mt-2">
            {donationFrequency === 'one-time' ? (
              <>Your donation of {formatAmount(donationAmount)} to {programName} has been processed successfully.</>
            ) : (
              <>Your {donationFrequency} donation of {formatAmount(donationAmount)} to {programName} has been set up successfully.</>
            )}
          </p>
          
          {donationFrequency !== 'one-time' && (
            <div className="bg-[#09869a]/10 p-3 rounded-md mt-4 text-left">
              <p className="text-sm">
                <strong>What happens next:</strong>
              </p>
              <ul className="text-sm mt-2 list-disc list-inside space-y-1">
                <li>Your first payment has been processed</li>
                <li>Future payments will be automatically charged</li>
                <li>You'll receive email receipts for all donations</li>
                <li>You can cancel your recurring donation anytime</li>
              </ul>
            </div>
          )}
        </div>
        
        <div className="space-y-3">
          <button
            onClick={handleClose}
            className="w-full py-3 text-base font-semibold text-white bg-[#09869a] rounded-lg hover:bg-[#09869a]/90"
          >
            Close
          </button>
          
          <Link href="/account/donations" className="block">
            <button className="w-full py-3 text-base font-semibold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">
              View Your Donations
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;