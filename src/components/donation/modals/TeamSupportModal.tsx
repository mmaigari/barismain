"use client"

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useDonation } from '@/contexts/DonationContext';

export default function TeamSupportModal() {
  const { setCurrentModal, donationAmount } = useDonation();
  const [tipPercent, setTipPercent] = useState(10); // Default 10%
  
  // Get currency information from localStorage
  const exchangeRate = parseFloat(localStorage.getItem("exchangeRate") || "1");
  const currencyCode = localStorage.getItem("currencyCode") || "USD";
  const isNaira = exchangeRate > 1; // If exchange rate is significantly higher than 1, assume Naira
  
  // Calculate amounts
  const coverFees = localStorage.getItem("coverFees") === "true";
  const processingFee = parseFloat(localStorage.getItem("processingFee") || "0");
  const baseAmount = coverFees ? donationAmount + processingFee : donationAmount;
  const tipAmount = (tipPercent / 100) * baseAmount;
  const totalWithTip = baseAmount + tipAmount;
  
  // Convert to Naira if applicable
  const displayBaseAmount = isNaira ? baseAmount * exchangeRate : baseAmount;
  const displayTipAmount = isNaira ? tipAmount * exchangeRate : tipAmount;
  const displayTotal = isNaira ? totalWithTip * exchangeRate : totalWithTip;
  
  // Currency symbol
  const currencySymbol = isNaira ? "₦" : "$";
  
  const handleContinue = () => {
    // Store tip information
    localStorage.setItem("tipPercent", tipPercent.toString());
    localStorage.setItem("tipAmount", tipAmount.toString());
    localStorage.setItem("tipAmountNaira", (tipAmount * exchangeRate).toString());
    localStorage.setItem("totalWithTip", totalWithTip.toString());
    localStorage.setItem("totalWithTipNaira", (totalWithTip * exchangeRate).toString());
    
    // Move to next step
    setCurrentModal('signIn');
  };
  
  const handleSkip = () => {
    // Store zero tip
    localStorage.setItem("tipPercent", "0");
    localStorage.setItem("tipAmount", "0");
    localStorage.setItem("tipAmountNaira", "0");
    localStorage.setItem("totalWithTip", baseAmount.toString());
    localStorage.setItem("totalWithTipNaira", (baseAmount * exchangeRate).toString());
    
    // Move to next step
    setCurrentModal('signIn');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full">
        {/* Modal header */}
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Support our team</h2>
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
            Our team works tirelessly to make a difference. Would you like to add a small tip to support our operations?
          </p>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="flex justify-between gap-3 mb-4">
              {[5, 10, 15, 20].map((percent) => (
                <button 
                  key={percent}
                  onClick={() => setTipPercent(percent)}
                  className={`flex-1 py-2 rounded-md ${
                    tipPercent === percent 
                      ? 'bg-[#09869a] text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {percent}%
                </button>
              ))}
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Donation amount:</span>
                <span className="font-medium">{currencySymbol}{displayBaseAmount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Team support ({tipPercent}%):</span>
                <span className="font-medium">{currencySymbol}{displayTipAmount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
              </div>
              
              <div className="flex justify-between pt-2 border-t border-gray-200">
                <span className="font-medium">Total:</span>
                <span className="font-semibold text-[#09869a]">
                  {currencySymbol}{displayTotal.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between">
            <button
              onClick={handleSkip}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Skip
            </button>
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