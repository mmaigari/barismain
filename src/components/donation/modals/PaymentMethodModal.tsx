"use client"

import React, { useState } from 'react';
import { useDonation } from '@/contexts/DonationContext';
import { FaCreditCard, FaPaypal } from 'react-icons/fa';
import { MdPayments } from 'react-icons/md';

const PAYMENT_METHODS = [
  { id: 'card', name: 'Credit/Debit Card', icon: <FaCreditCard className="w-6 h-6" /> },
  { id: 'paypal', name: 'PayPal', icon: <FaPaypal className="w-6 h-6" /> },
  { id: 'ideal', name: 'iDeal', icon: <MdPayments className="w-6 h-6" /> },
  { id: 'giropay', name: 'Giropay', icon: <MdPayments className="w-6 h-6" /> }
];

const PaymentMethodModal: React.FC = () => {
  const { setCurrentModal } = useDonation();
  const [selectedMethod, setSelectedMethod] = useState('');

  const handleMethodSelect = (methodId: string) => {
    setSelectedMethod(methodId);
  };

  const handleContinue = () => {
    if (selectedMethod) {
      setCurrentModal('confirmation');
    }
  };
  
  const handleBack = () => {
    // If coming from guest flow, go back to guest form
    // Otherwise go back to sign in
    setCurrentModal('guestContinue');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-xl p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Payment Method</h2>
          <p className="text-gray-600 mt-2">
            Select your preferred payment method
          </p>
        </div>
        
        <div className="space-y-3">
          {PAYMENT_METHODS.map((method) => (
            <div
              key={method.id}
              onClick={() => handleMethodSelect(method.id)}
              className={`flex items-center p-4 border rounded-lg cursor-pointer ${
                selectedMethod === method.id
                  ? 'border-[#09869a] bg-[#09869a]/5'
                  : 'border-gray-300 hover:border-[#09869a]/50'
              }`}
            >
              <div className={`p-2 rounded-full ${
                selectedMethod === method.id ? 'text-[#09869a]' : 'text-gray-500'
              }`}>
                {method.icon}
              </div>
              <span className="ml-3 font-medium">{method.name}</span>
              {selectedMethod === method.id && (
                <div className="ml-auto">
                  <div className="w-6 h-6 bg-[#09869a] rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-6 space-y-3">
          <button
            onClick={handleContinue}
            disabled={!selectedMethod}
            className="w-full py-3 text-base font-semibold text-white bg-[#09869a] rounded-lg hover:bg-[#09869a]/90 disabled:opacity-50"
          >
            Continue
          </button>
          <button
            onClick={handleBack}
            className="w-full py-3 text-base font-semibold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodModal;