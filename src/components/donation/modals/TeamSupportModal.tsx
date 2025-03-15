"use client"

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useDonation } from '@/contexts/DonationContext';

const TeamSupportModal = () => {
  const { 
    setCurrentModal, 
    setTeamSupportAmount,
    currency,
    formatAmount,
    donationAmount
  } = useDonation();
  
  // State to track selected support amount
  const [supportAmount, setSupportAmount] = useState<number | null>(null);
  
  // Generate support amounts based on currency
  const getSupportSuggestions = () => {
    if (currency === 'USD') {
      return [5, 10, 15, 25];
    } else if (currency === 'NGN') {
      // Convert USD values to NGN (assuming exchange rate of around 1500)
      return [7500, 15000, 22500, 37500]; 
    }
    return [5, 10, 15, 25]; // Default to USD
  };
  
  const supportSuggestions = getSupportSuggestions();
  
  // Reset selected amount when currency changes
  useEffect(() => {
    setSupportAmount(null);
  }, [currency]);
  
  const handleNextStep = () => {
    setTeamSupportAmount(supportAmount || 0);
    
    // Check if user is already authenticated
    const token = localStorage.getItem('auth_token');
    const isLoggedIn = !!token;
    
    if (isLoggedIn) {
      // Skip sign-in for logged in users
      setCurrentModal('paymentMethod');
    } else {
      // Show sign-in options for guest users
      setCurrentModal('signIn');
    }
  };
  
  const handleCustomAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setSupportAmount(isNaN(value) ? 0 : value);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-xl p-6">
        <button
          onClick={() => setCurrentModal('paymentFees')}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <X size={20} />
        </button>
        
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Support Our Team</h2>
          <p className="text-gray-600 mt-2">
            Your additional contribution helps us maintain this platform and continue our mission. Would you like to add a tip to support our team?
          </p>
        </div>
        
        <div className="space-y-6 mb-6">
          <div className="grid grid-cols-2 gap-2">
            {supportSuggestions.map((amount) => (
              <button
                key={amount}
                onClick={() => setSupportAmount(amount)}
                className={`py-3 border rounded-md ${
                  supportAmount === amount
                    ? 'border-[#09869a] bg-[#09869a]/5 text-[#09869a]'
                    : 'border-gray-200 hover:border-[#09869a]/30 text-gray-700'
                }`}
              >
                {formatAmount(amount)}
              </button>
            ))}
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">{currency === 'USD' ? '$' : '₦'}</span>
            </div>
            <input
              type="number"
              className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#09869a] focus:border-[#09869a]"
              placeholder="Custom amount"
              onChange={handleCustomAmount}
              min="0"
              step={currency === 'USD' ? '1' : '100'}
            />
          </div>
          
          <button
            onClick={() => setSupportAmount(0)}
            className={`w-full py-3 border rounded-md ${
              supportAmount === 0
                ? 'border-[#09869a] bg-[#09869a]/5 text-[#09869a]'
                : 'border-gray-200 hover:border-[#09869a]/30 text-gray-700'
            }`}
          >
            No thanks
          </button>
        </div>
        
        <div className="flex justify-between">
          <button
            onClick={() => setCurrentModal('paymentFees')}
            className="px-5 py-2 text-base font-medium text-gray-600 hover:text-gray-800"
          >
            Back
          </button>
          
          <button
            onClick={handleNextStep}
            className="px-5 py-2 text-base font-medium text-white bg-[#09869a] rounded-md hover:bg-[#09869a]/90"
          >
            {supportAmount && supportAmount > 0 
              ? `Continue with ${formatAmount(supportAmount)} tip` 
              : 'Continue without tip'}
          </button>
        </div>
        
        {/* Show donation total if an amount is selected */}
        {supportAmount !== null && (
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Donation amount:</span>
              <span className="font-medium">{formatAmount(donationAmount)}</span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span className="text-gray-600">Team support:</span>
              <span className="font-medium">{formatAmount(supportAmount)}</span>
            </div>
            <div className="flex justify-between text-base font-medium mt-2">
              <span className="text-gray-800">Total:</span>
              <span className="text-[#09869a]">{formatAmount(donationAmount + supportAmount)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamSupportModal;