"use client"

import React, { useState } from 'react';
import { useDonation } from '@/contexts/DonationContext';
import { useAuth } from '@/contexts/AuthContext'; // Add this import
import { FaPaypal, FaMoneyBillWave } from 'react-icons/fa';
import PayPalButton from '@/components/payment/PayPalButton';
import FlutterwaveButton from '@/components/payment/FlutterwaveButton';

const PAYMENT_METHODS = [
  { id: 'paypal', name: 'PayPal', icon: <FaPaypal className="w-6 h-6" /> },
  { id: 'flutterwave', name: 'Flutterwave', icon: <FaMoneyBillWave className="w-6 h-6" /> }
];

const PaymentMethodModal: React.FC = () => {
  const { 
    setCurrentModal, 
    donationAmount, 
    coverFees, 
    teamSupportAmount,
    paymentStatus,
    paymentError,
    guestData
  } = useDonation();
  
  const [selectedMethod, setSelectedMethod] = useState('');
  
  // Calculate total amount
  const processingFee = coverFees ? (donationAmount * 0.029) + 0.30 : 0;
  const totalAmount = donationAmount + processingFee + teamSupportAmount;

  const handleMethodSelect = (methodId: string) => {
    setSelectedMethod(methodId);
  };

  const handleContinue = () => {
    // For non-PayPal methods, proceed to confirmation
    if (selectedMethod && selectedMethod !== 'paypal' && selectedMethod !== 'flutterwave') {
      setCurrentModal('confirmation');
    }
  };
  
  const handleBack = () => {
    const { currentUser } = useAuth();  // Use destructuring and the correct property name
    
    // If user is logged in, go back to team support instead of sign in
    if (currentUser) {  
      setCurrentModal('teamSupport');
    } else {
      setCurrentModal('guestContinue');
    }
  };
  
  const handlePayPalSuccess = () => {
    setCurrentModal('confirmation');
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
        
        {paymentError && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {paymentError}
          </div>
        )}
        
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
        
        {selectedMethod === 'paypal' && (
          <div className="mt-6 border-t pt-6">
            <h3 className="text-lg font-medium mb-4">Pay with PayPal</h3>
            <PayPalButton 
              amount={totalAmount} 
              onSuccess={handlePayPalSuccess} 
            />
          </div>
        )}
        
        {selectedMethod === 'flutterwave' && (
          <div className="mt-6 border-t pt-6">
            <h3 className="text-lg font-medium mb-4">Pay with Flutterwave</h3>
            <FlutterwaveButton 
              amount={totalAmount} 
              onSuccess={handlePayPalSuccess} 
              email={guestData?.email}
              name={guestData?.name}
              phone={guestData?.phone || ""}
            />
          </div>
        )}
        
        {selectedMethod && selectedMethod !== 'paypal' && selectedMethod !== 'flutterwave' && (
          <div className="mt-6">
            <button
              onClick={handleContinue}
              className="w-full py-3 text-base font-semibold text-white bg-[#09869a] rounded-lg hover:bg-[#09869a]/90"
              disabled={paymentStatus === 'processing'}
            >
              {paymentStatus === 'processing' ? 'Processing...' : 'Continue'}
            </button>
          </div>
        )}
        
        <button
          onClick={handleBack}
          className="w-full mt-3 py-3 text-base font-semibold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
          disabled={paymentStatus === 'processing'}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default PaymentMethodModal;