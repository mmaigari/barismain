"use client"

import React, { useState } from 'react';
import { useDonation } from '@/contexts/DonationContext';
import { X } from 'lucide-react';

export default function RecurringDonationModal() {
  const { setCurrentModal, donationAmount, setDonationAmount } = useDonation();
  const [selectedAmount, setSelectedAmount] = useState(donationAmount);
  
  // Get currency information
  const currencyCode = localStorage.getItem("currencyCode") || "USD";
  const exchangeRate = parseFloat(localStorage.getItem("exchangeRate") || "1700");
  const isNaira = currencyCode === "NGN";
  
  // Predefined amounts in USD
  const predefinedAmountsUSD = [10, 25, 50, 100];
  
  // Convert to Naira when needed
  const predefinedAmounts = isNaira 
    ? predefinedAmountsUSD.map(amount => amount * exchangeRate) 
    : predefinedAmountsUSD;
  
  const handleContinue = () => {
    setDonationAmount(selectedAmount);
    
    // Store both currency values
    const amountUSD = isNaira ? selectedAmount / exchangeRate : selectedAmount;
    const amountNaira = isNaira ? selectedAmount : selectedAmount * exchangeRate;
    
    localStorage.setItem("donationAmount", selectedAmount.toString());
    localStorage.setItem("donationAmountUSD", amountUSD.toString());
    localStorage.setItem("donationAmountNaira", amountNaira.toString());
    
    setCurrentModal('paymentFees');
  };
  
  const currencySymbol = isNaira ? "₦" : "$";
  
  const formatAmount = (amount: number) => {
    return isNaira 
      ? amount.toLocaleString(undefined, { maximumFractionDigits: 0 }) 
      : amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Monthly Support</h2>
          <button 
            onClick={() => setCurrentModal('')}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6">
          <p className="text-gray-600 mb-6">
            Your monthly donation provides sustained support to our programs, allowing us to plan and implement long-term solutions.
          </p>
          
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Select monthly amount:</h3>
            <div className="grid grid-cols-2 gap-3">
              {predefinedAmounts.map((amount) => (
                <button 
                  key={amount}
                  onClick={() => setSelectedAmount(amount)}
                  className={`py-3 rounded-lg transition-colors ${
                    selectedAmount === amount 
                      ? 'bg-[#09869a] text-white' 
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {currencySymbol}{formatAmount(amount)}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Custom Amount ({currencySymbol})
            </label>
            <input
              type="number"
              value={selectedAmount}
              onChange={(e) => setSelectedAmount(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-[#09869a] focus:border-[#09869a]"
              min={isNaira ? 1000 : 1}
              step={isNaira ? 100 : 0.01}
            />
          </div>
          
          <div className="flex justify-between">
            <button
              onClick={() => setCurrentModal('')}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleContinue}
              className="px-6 py-2 bg-[#09869a] hover:bg-[#09869a]/90 text-white rounded-lg"
              disabled={selectedAmount <= 0}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}