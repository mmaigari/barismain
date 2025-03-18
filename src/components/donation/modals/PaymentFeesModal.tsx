"use client"

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useDonation } from '@/contexts/DonationContext';

export default function PaymentFeesModal() {
  const { currentModal, setCurrentModal, donationAmount } = useDonation();
  const [coverFees, setCoverFees] = useState(true);
  
  // Get currency information from localStorage
  const exchangeRate = parseFloat(localStorage.getItem("exchangeRate") || "1");
  const currencyCode = localStorage.getItem("currencyCode") || "USD";
  const isNaira = exchangeRate > 1; // If exchange rate is significantly higher than 1, assume Naira
  
  // Calculate fees
  const processingFee = donationAmount * 0.029 + 0.30; // Standard payment processing fee
  const totalWithFees = donationAmount + processingFee;
  
  // Convert to Naira if applicable
  const displayAmount = isNaira ? donationAmount * exchangeRate : donationAmount;
  const displayFee = isNaira ? processingFee * exchangeRate : processingFee;
  const displayTotal = isNaira ? totalWithFees * exchangeRate : totalWithFees;
  
  // Currency symbol
  const currencySymbol = isNaira ? "₦" : "$";
  
  const handleContinue = () => {
    // Store fee information
    localStorage.setItem("coverFees", coverFees.toString());
    localStorage.setItem("processingFee", processingFee.toString());
    localStorage.setItem("processingFeeNaira", (processingFee * exchangeRate).toString());
    localStorage.setItem("totalWithFees", totalWithFees.toString());
    localStorage.setItem("totalWithFeesNaira", (totalWithFees * exchangeRate).toString());
    
    // Move to next step
    setCurrentModal('teamSupport');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full">
        {/* Modal header */}
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Cover payment processing fees?</h2>
          <button 
            onClick={() => setCurrentModal('')}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Modal body */}
        <div className="p-6">
          <p className="text-gray-600 mb-6">
            Payment processors charge a small fee for handling online transactions. 
            Would you like to cover these fees so 100% of your donation goes to the program?
          </p>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="coverFees"
                checked={coverFees}
                onChange={() => setCoverFees(!coverFees)}
                className="h-4 w-4 text-[#09869a] focus:ring-[#09869a] border-gray-300 rounded"
              />
              <label htmlFor="coverFees" className="ml-2 text-gray-700">
                Yes, I'll cover the {currencySymbol}{displayFee.toFixed(2)} processing fee
              </label>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Donation amount:</span>
                <span className="font-medium">{currencySymbol}{displayAmount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
              </div>
              
              {coverFees && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Processing fee:</span>
                  <span className="font-medium">{currencySymbol}{displayFee.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                </div>
              )}
              
              <div className="flex justify-between pt-2 border-t border-gray-200">
                <span className="font-medium">Total:</span>
                <span className="font-semibold text-[#09869a]">
                  {currencySymbol}{(coverFees ? displayTotal : displayAmount).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              onClick={handleContinue}
              className="px-6 py-2 bg-[#09869a] hover:bg-[#09869a]/90 text-white rounded-lg"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}