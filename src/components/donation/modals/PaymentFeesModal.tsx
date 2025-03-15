"use client"

import React from 'react';
import { X } from 'lucide-react';
import { useDonation } from '@/contexts/DonationContext';

const PaymentFeesModal = () => {
  const { 
    setCurrentModal, 
    donationAmount, 
    currency, 
    formatAmount,  // Use this for proper currency formatting
    setCoverFees, 
    coverFees 
  } = useDonation();

  // Calculate payment processor fees based on currency
  const calculateFees = () => {
    if (currency === 'USD') {
      // PayPal charges 2.9% + $0.30 for USD transactions
      return (donationAmount * 0.029) + 0.30;
    } else if (currency === 'NGN') {
      // Paystack charges 1.5% + ₦100 for NGN transactions
      return (donationAmount * 0.015) + 100;
    }
    return 0;
  };

  const paymentFees = calculateFees();
  const totalWithFees = donationAmount + paymentFees;

  const handleCoverFees = (cover: boolean) => {
    setCoverFees(cover);
    setCurrentModal('teamSupport');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-xl p-6">
        <button
          onClick={() => setCurrentModal('donationOptions')}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <X size={20} />
        </button>
        
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Cover Payment Fees</h2>
          <p className="text-gray-600 mt-2">
            Payment processors charge a fee for every transaction. Would you like to cover these fees so we can receive your full donation amount?
          </p>
        </div>
        
        <div className="space-y-4 mb-8">
          <button
            onClick={() => handleCoverFees(true)}
            className={`w-full flex items-center justify-between p-4 border rounded-md ${
              coverFees
                ? 'border-[#09869a] bg-[#09869a]/5'
                : 'border-gray-200 hover:border-[#09869a]/30'
            }`}
          >
            <div>
              <p className="font-medium text-gray-900">
                Yes, cover the fees ({formatAmount(paymentFees)})
              </p>
              <p className="text-sm text-gray-500">
                Total: {formatAmount(totalWithFees)}
              </p>
            </div>
            <div className={`w-5 h-5 rounded-full border ${
              coverFees ? 'border-[#09869a] bg-[#09869a]' : 'border-gray-300'
            } flex items-center justify-center`}>
              {coverFees && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          </button>
          
          <button
            onClick={() => handleCoverFees(false)}
            className={`w-full flex items-center justify-between p-4 border rounded-md ${
              !coverFees
                ? 'border-[#09869a] bg-[#09869a]/5'
                : 'border-gray-200 hover:border-[#09869a]/30'
            }`}
          >
            <div>
              <p className="font-medium text-gray-900">No thanks</p>
              <p className="text-sm text-gray-500">
                Donation amount: {formatAmount(donationAmount)}
              </p>
            </div>
            <div className={`w-5 h-5 rounded-full border ${
              !coverFees ? 'border-[#09869a] bg-[#09869a]' : 'border-gray-300'
            } flex items-center justify-center`}>
              {!coverFees && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          </button>
        </div>
        
        <div className="flex justify-center">
          <button
            onClick={() => setCurrentModal('teamSupport')}
            className="px-5 py-2 text-base font-medium text-gray-600 hover:text-gray-800"
          >
            Skip this step
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentFeesModal;