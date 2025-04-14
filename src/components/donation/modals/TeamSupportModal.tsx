"use client"

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useDonation } from '@/contexts/DonationContext';

export default function TeamSupportModal() {
  const { setCurrentModal, donationAmount, currency } = useDonation();
  const [tipAmount, setTipAmount] = useState(5); // Default $5 tip
  const [customTip, setCustomTip] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  
  // Hard-code the exchange rate
  const NAIRA_USD_EXCHANGE_RATE = 1600;
  
  // Determine if currency is Naira based on the currency from context
  const isNaira = currency === 'NGN';
  
  // Calculate amounts
  const coverFees = localStorage.getItem("coverFees") === "true";
  const processingFee = parseFloat(localStorage.getItem("processingFee") || "0");
  const baseAmount = coverFees ? donationAmount + processingFee : donationAmount;
  
  // Preset dollar amounts that will be shown
  const presetAmounts = [2, 5, 10, 20];
  
  // Convert preset amounts to Naira when in Naira mode
  const displayPresetAmounts = isNaira 
    ? presetAmounts.map(amount => amount * NAIRA_USD_EXCHANGE_RATE) 
    : presetAmounts;
    
  // Determine the actual tip amount (either preset or custom)
  const actualTipAmount = isCustom ? (parseFloat(customTip) || 0) : tipAmount;
  const totalWithTip = baseAmount + actualTipAmount;
  
  // Display values with proper currency conversion
  const displayBaseAmount = isNaira ? baseAmount : baseAmount;
  const displayTipAmount = isNaira ? actualTipAmount : actualTipAmount;
  const displayTotal = isNaira ? totalWithTip : totalWithTip;
  
  // Currency symbol
  const currencySymbol = isNaira ? "₦" : "$";

  // Handle custom tip input change
  const handleCustomTipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only numbers and decimal point
    const value = e.target.value.replace(/[^0-9.]/g, '');
    setCustomTip(value);
  };
  
  const handleContinue = () => {
    // Calculate the final tip amount
    const finalTipAmount = isCustom ? (parseFloat(customTip) || 0) : tipAmount;
    
    // Store tip information - make sure to store both USD and Naira values
    const tipAmountUSD = isNaira ? finalTipAmount / NAIRA_USD_EXCHANGE_RATE : finalTipAmount;
    const tipAmountNaira = isNaira ? finalTipAmount : finalTipAmount * NAIRA_USD_EXCHANGE_RATE;
    
    localStorage.setItem("tipAmount", tipAmountUSD.toString());
    localStorage.setItem("tipAmountNaira", tipAmountNaira.toString());
    
    const totalWithTipUSD = isNaira 
      ? (baseAmount / NAIRA_USD_EXCHANGE_RATE) + (finalTipAmount / NAIRA_USD_EXCHANGE_RATE) 
      : baseAmount + finalTipAmount;
    const totalWithTipNaira = isNaira 
      ? baseAmount + finalTipAmount 
      : (baseAmount + finalTipAmount) * NAIRA_USD_EXCHANGE_RATE;
    
    localStorage.setItem("totalWithTip", totalWithTipUSD.toString());
    localStorage.setItem("totalWithTipNaira", totalWithTipNaira.toString());
    localStorage.setItem("exchangeRate", NAIRA_USD_EXCHANGE_RATE.toString());
    localStorage.setItem("currencyCode", currency);
    
    // Move to next step
    setCurrentModal('signIn');
  };
  
  const handleSkip = () => {
    // Store zero tip
    localStorage.setItem("tipAmount", "0");
    localStorage.setItem("tipAmountNaira", "0");
    
    const totalWithTipUSD = isNaira ? baseAmount / NAIRA_USD_EXCHANGE_RATE : baseAmount;
    const totalWithTipNaira = isNaira ? baseAmount : baseAmount * NAIRA_USD_EXCHANGE_RATE;
    
    localStorage.setItem("totalWithTip", totalWithTipUSD.toString());
    localStorage.setItem("totalWithTipNaira", totalWithTipNaira.toString());
    localStorage.setItem("exchangeRate", NAIRA_USD_EXCHANGE_RATE.toString());
    localStorage.setItem("currencyCode", currency);
    
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
            Our team works tirelessly to make a difference. Would you like to add a tip to support our operations?
          </p>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="flex justify-between gap-3 mb-4">
              {displayPresetAmounts.map((amount, index) => (
                <button 
                  key={index}
                  onClick={() => {
                    setTipAmount(amount);
                    setIsCustom(false);
                  }}
                  className={`flex-1 py-2 rounded-md ${
                    !isCustom && tipAmount === amount 
                      ? 'bg-[#09869a] text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {currencySymbol}{isNaira ? amount.toLocaleString() : amount}
                </button>
              ))}
            </div>

            {/* Custom tip amount input */}
            <div className="mb-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="customTip"
                  checked={isCustom}
                  onChange={() => setIsCustom(!isCustom)}
                  className="h-4 w-4 text-[#09869a] focus:ring-[#09869a] border-gray-300 rounded mr-2"
                />
                <label htmlFor="customTip" className="text-gray-600">Custom amount</label>
              </div>
              
              {isCustom && (
                <div className="mt-2 relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    {currencySymbol}
                  </span>
                  <input
                    type="text"
                    value={customTip}
                    onChange={handleCustomTipChange}
                    placeholder="Enter amount"
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#09869a]"
                    autoFocus={isCustom}
                  />
                </div>
              )}
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Donation amount:</span>
                <span className="font-medium">{currencySymbol}{displayBaseAmount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Team support:</span>
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