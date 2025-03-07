"use client"

import React, { useState } from 'react';
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
  
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  
  // Calculate fees (approximately 2.9% + $0.30)
  const processingFee = coverFees ? (donationAmount * 0.029) + 0.30 : 0;
  
  // Calculate total donation amount
  const totalAmount = donationAmount + (coverFees ? processingFee : 0) + teamSupportAmount;

  // Update the handleConfirm function to adjust based on payment status
  const handleConfirm = () => {
    if (paymentStatus === 'success') {
      // Payment already processed (PayPal)
      alert('Thank you for your donation!');
      resetDonation();
    } else {
      // Process payment for other methods
      // This would integrate with your payment processor
      setPaymentStatus('processing');
      
      // Simulate payment processing
      setTimeout(() => {
        setPaymentStatus('success');
        alert('Donation processed successfully! Thank you for your contribution.');
        resetDonation();
      }, 2000);
    }
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
          {paymentStatus === 'processing' ? (
            <div className="flex justify-center items-center py-4">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#09869a]"></div>
              <span className="ml-3 text-gray-700">Processing your donation...</span>
            </div>
          ) : paymentStatus === 'success' ? (
            <div>
              <div className="bg-green-100 text-green-800 p-4 rounded-md flex items-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Payment Successful!
              </div>
              <button
                onClick={() => resetDonation()}
                className="w-full py-3 text-base font-semibold text-white bg-[#09869a] rounded-lg hover:bg-[#09869a]/90"
              >
                Done
              </button>
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
        
        <p className="mt-4 text-xs text-center text-gray-500">
          By confirming, you agree to our Terms of Service and Privacy Policy. All donations are final and non-refundable.
        </p>
      </div>
    </div>
  );
};

export default ConfirmationModal;