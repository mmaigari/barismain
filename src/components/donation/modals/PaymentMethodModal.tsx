"use client"

import React, { useState } from 'react';
import { useDonation } from '@/contexts/DonationContext';
import { X, CreditCard, Check } from 'lucide-react';

const PaymentMethodModal: React.FC = () => {
  const { 
    setCurrentModal, 
    donationAmount, 
    programName, 
    formatAmount,
    paymentMethod,
    setPaymentMethod 
  } = useDonation();
  
  const handleBack = () => {
    setCurrentModal('teamSupport');
  };
  
  const handleProceed = () => {
    // Proceed to next step based on selected payment method
    if (paymentMethod === 'paystack') {
      setCurrentModal('paystackPayment');
    } else if (paymentMethod === 'paypal') {
      setCurrentModal('paypalPayment');
    } else {
      // Default payment method
      setCurrentModal('confirmation');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-2 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-xl p-4 sm:p-6 my-4">
        <button
          onClick={handleBack}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <X size={18} />
        </button>
        
        <div className="mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Payment Method</h2>
          <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">
            Choose how you'd like to pay your {formatAmount(donationAmount)} donation to {programName}
          </p>
        </div>
        
        <div className="space-y-3 sm:space-y-4">
          <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900 text-base sm:text-lg">Amount</h3>
                <p className="text-gray-600 text-sm sm:text-base">{formatAmount(donationAmount)}</p>
              </div>
              <button
                onClick={() => setCurrentModal('donationOptions')}
                className="text-sm sm:text-base text-[#09869a] font-medium hover:underline"
              >
                Change
              </button>
            </div>
          </div>
          
          <div>
            <p className="text-sm sm:text-base font-medium text-gray-700 mb-2 sm:mb-3">Select Payment Method</p>
            
            <div className="space-y-2 sm:space-y-3">
              <button
                onClick={() => setPaymentMethod('paystack')}
                className={`w-full flex items-center justify-between p-3 sm:p-4 rounded-lg border ${
                  paymentMethod === 'paystack' 
                    ? 'border-[#09869a] bg-[#09869a]/5' 
                    : 'border-gray-200 hover:border-[#09869a]/30'
                }`}
              >
                <div className="flex items-center">
                  <div className="bg-[#0AB95F] p-1.5 sm:p-2 rounded text-white mr-3">
                    <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-sm sm:text-base text-gray-900">Paystack</p>
                    <p className="text-xs sm:text-sm text-gray-500">Card payments & bank transfers</p>
                  </div>
                </div>
                {paymentMethod === 'paystack' && (
                  <div className="bg-[#09869a] rounded-full p-1 text-white">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                )}
              </button>
              
              <button
                onClick={() => setPaymentMethod('paypal')}
                className={`w-full flex items-center justify-between p-3 sm:p-4 rounded-lg border ${
                  paymentMethod === 'paypal' 
                    ? 'border-[#09869a] bg-[#09869a]/5' 
                    : 'border-gray-200 hover:border-[#09869a]/30'
                }`}
              >
                <div className="flex items-center">
                  <div className="bg-[#0079C1] p-1.5 sm:p-2 rounded text-white mr-3">
                    <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-sm sm:text-base text-gray-900">PayPal</p>
                    <p className="text-xs sm:text-sm text-gray-500">International cards & PayPal balance</p>
                  </div>
                </div>
                {paymentMethod === 'paypal' && (
                  <div className="bg-[#09869a] rounded-full p-1 text-white">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-6 sm:mt-8 space-y-2 sm:space-y-3">
          <button
            onClick={handleProceed}
            disabled={!paymentMethod}
            className="w-full py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-white bg-[#09869a] rounded-lg hover:bg-[#09869a]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#09869a] disabled:opacity-50"
          >
            Continue to Payment
          </button>
          
          <button
            onClick={handleBack}
            className="w-full py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodModal;