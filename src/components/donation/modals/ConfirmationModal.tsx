"use client"

import React from 'react';
import { useDonation } from '@/contexts/DonationContext';

const ConfirmationModal: React.FC = () => {
  const { 
    setCurrentModal, 
    donationAmount, 
    coverFees, 
    teamSupportAmount, 
    programName,
    resetDonation
  } = useDonation();
  
  // Calculate fees (approximately 2.9% + $0.30)
  const processingFee = coverFees ? (donationAmount * 0.029) + 0.30 : 0;
  
  // Calculate total donation amount
  const totalAmount = donationAmount + (coverFees ? processingFee : 0) + teamSupportAmount;

  const handleConfirm = () => {
    // This is where you would integrate with your payment processing API
    alert('Donation processed successfully! Thank you for your contribution.');
    resetDonation();
  };
  
  const handleBack = () => {
    setCurrentModal('paymentMethod');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-xl p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Confirm Your Donation</h2>
          <p className="text-gray-600 mt-2">
            Please review your donation details before proceeding
          </p>
        </div>
        
        <div className="border rounded-lg p-4 mb-6">
          <h3 className="font-semibold mb-4 text-lg">Donation Summary</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-700">Program:</span>
              <span className="font-medium">{programName}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-700">Donation Amount:</span>
              <span className="font-medium">${donationAmount.toFixed(2)}</span>
            </div>
            
            {coverFees && (
              <div className="flex justify-between">
                <span className="text-gray-700">Processing Fees:</span>
                <span className="font-medium">${processingFee.toFixed(2)}</span>
              </div>
            )}
            
            {teamSupportAmount > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-700">Team Support:</span>
                <span className="font-medium">${teamSupportAmount.toFixed(2)}</span>
              </div>
            )}
            
            <div className="pt-3 border-t border-gray-200">
              <div className="flex justify-between">
                <span className="font-semibold">Total:</span>
                <span className="font-bold text-[#09869a]">${totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 space-y-3">
          <button
            onClick={handleConfirm}
            className="w-full py-3 text-base font-semibold text-white bg-[#09869a] rounded-lg hover:bg-[#09869a]/90"
          >
            Confirm and Process Payment
          </button>
          <button
            onClick={handleBack}
            className="w-full py-3 text-base font-semibold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            Back
          </button>
        </div>
        
        <p className="mt-4 text-xs text-center text-gray-500">
          By confirming, you agree to our Terms of Service and Privacy Policy. All donations are final and non-refundable.
        </p>
      </div>
    </div>
  );
};

export default ConfirmationModal;