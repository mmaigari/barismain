"use client"

import React, { useState, useEffect, useRef } from 'react';
import { useDonation } from '@/contexts/DonationContext';
import Script from 'next/script';
import { X } from 'lucide-react';

declare global {
  interface Window {
    PaystackPop?: {
      setup: (config: any) => {
        openIframe: () => void;
      };
    };
  }
}

const DonationOptionsModal: React.FC = () => {
  const { 
    setCurrentModal, 
    setDonationAmount, 
    programName, 
    currency, 
    formatAmount, 
    convertAmount,
    donationFrequency,
    setDonationFrequency
  } = useDonation();
  
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [email, setEmail] = useState('');
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  
  // Define base amounts in USD
  const baseAmounts = [25, 50, 100, 250, 500];
  
  // Get donation options based on current currency
  const getDonationOptions = () => {
    return baseAmounts.map(amount => {
      const value = currency === 'NGN' ? convertAmount(amount, 'NGN') : amount;
      return {
        amount: value,
        label: formatAmount(value)
      };
    });
  };

  const donationOptions = getDonationOptions();
  
  // Reset when currency changes
  useEffect(() => {
    setSelectedPreset(null);
    setCustomAmount('');
  }, [currency]);
  
  const handleAmountSelect = (amount: number) => {
    setSelectedPreset(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    setSelectedPreset(null);
  };
  
  const handleCancel = () => {
    setCurrentModal('');
  };
  
  const handleProceed = () => {
    const amount = selectedPreset || Number(customAmount);
    if (amount > 0) {
      setDonationAmount(amount);
      setCurrentModal('recurringDonation'); // First go to recurring options
    }
  };

  const handleFrequencySelect = (frequency: string) => {
    setDonationFrequency(frequency as any);
  };

  const handlePaystackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const amount = selectedPreset || Number(customAmount);
    
    // Validation
    if (!amount || amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      alert("Please enter a valid email address");
      return;
    }
    
    // Store the amount for later
    setDonationAmount(amount);
    
    // For recurring donations with Paystack
    if (donationFrequency !== 'one-time') {
      // Store subscription info and redirect to subscription setup page
      localStorage.setItem('subscription-details', JSON.stringify({
        email,
        amount,
        programName,
        frequency: donationFrequency
      }));
      
      // Redirect to subscription setup page
      setCurrentModal('paystackSubscription');
      return;
    }
    
    // One-time payment with Paystack
    if (window.PaystackPop) {
      const handler = window.PaystackPop.setup({
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
        email: email,
        amount: amount * 100,
        currency: currency, // Use current currency
        ref: `bcf_${new Date().getTime()}_${Math.floor(Math.random() * 1000000)}`,
        metadata: {
          custom_fields: [
            {
              display_name: "Program",
              variable_name: "program",
              value: programName
            },
            {
              display_name: "Frequency",
              variable_name: "frequency",
              value: "one-time"
            }
          ]
        },
        callback: function(response: any) {
          console.log("Payment complete! Reference: ", response.reference);
          setCurrentModal('confirmation');
        },
        onClose: function() {
          console.log("Transaction was not completed, window closed.");
        }
      });
      handler.openIframe();
    }
  };

  // Check authentication status when component mounts
  useEffect(() => {
    // Check if user is logged in (could be from localStorage, cookies, or your auth context)
    const checkAuthStatus = async () => {
      // This is a simplified example - replace with your actual auth check logic
      const token = localStorage.getItem('auth_token');
      const userId = localStorage.getItem('user_id');
      setIsAuthenticated(!!token && !!userId);
    };
    
    checkAuthStatus();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-2 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-xl p-4 sm:p-6 my-4">
        <button
          onClick={handleCancel}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <X size={18} />
        </button>
        
        <div className="mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Donation Options</h2>
          <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">Select an amount to donate to {programName}</p>
          <div className="mt-1 sm:mt-2 text-xs sm:text-sm font-medium text-[#09869A]">
            Currently showing amounts in {currency}
          </div>
        </div>

        <form ref={formRef} onSubmit={handlePaystackSubmit}>
          <div className="space-y-3 sm:space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
              {donationOptions.map(({ amount, label }) => (
                <button
                  type="button"
                  key={amount}
                  onClick={() => handleAmountSelect(amount)}
                  className={`py-2 sm:py-3 px-2 sm:px-4 text-sm sm:text-base rounded-md border ${
                    selectedPreset === amount
                      ? 'border-[#09869a] bg-[#09869a]/10 text-[#09869a]'
                      : 'border-gray-300 hover:border-[#09869a]/50'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span className="text-gray-500 text-sm sm:text-base">{currency === 'USD' ? '$' : '₦'}</span>
              </div>
              <input
                type="number"
                name="amount"
                placeholder="Custom amount"
                value={customAmount}
                onChange={handleCustomAmountChange}
                className="text-sm sm:text-base block w-full pl-7 sm:pl-8 pr-3 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:ring-[#09869a] focus:border-[#09869a]"
              />
            </div>
            
            <div className="mt-3 sm:mt-4">
              <p className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                Donation Frequency
              </p>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => handleFrequencySelect('one-time')}
                  className={`py-2 px-3 sm:px-4 text-xs sm:text-sm rounded-md border ${
                    donationFrequency === 'one-time'
                      ? 'border-[#09869a] bg-[#09869a]/10 text-[#09869a]'
                      : 'border-gray-300 hover:border-[#09869a]/50'
                  }`}
                >
                  One-time
                </button>
                <button
                  type="button"
                  onClick={() => handleFrequencySelect('monthly')}
                  className={`py-2 px-3 sm:px-4 text-xs sm:text-sm rounded-md border ${
                    donationFrequency === 'monthly'
                      ? 'border-[#09869a] bg-[#09869a]/10 text-[#09869a]'
                      : 'border-gray-300 hover:border-[#09869a]/50'
                  }`}
                >
                  Monthly
                </button>
              </div>
            </div>
            
            <div className="mt-3 sm:mt-4">
              <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-sm sm:text-base block w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:ring-[#09869a] focus:border-[#09869a]"
                required
              />
            </div>
          </div>
          
          <div className="mt-6 sm:mt-8 space-y-2 sm:space-y-3">
            <button
              type="submit"
              disabled={(!selectedPreset && !customAmount) || !email}
              className="w-full py-2 sm:py-3 text-sm sm:text-base font-semibold text-white bg-[#0AB95F] rounded-lg hover:bg-[#0AB95F]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0AB95F] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              Pay {selectedPreset || customAmount ? formatAmount(selectedPreset || Number(customAmount)) : ''} with Paystack
            </button>
            
            <button
              type="button"
              onClick={handleCancel}
              className="w-full py-2 sm:py-3 text-sm sm:text-base font-semibold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
          </div>
          
          <Script
            src="https://js.paystack.co/v1/inline.js"
            onLoad={() => setScriptLoaded(true)}
            onError={(e) => {
              console.error("Failed to load Paystack script", e);
            }}
          />
        </form>
      </div>
    </div>
  );
};

export default DonationOptionsModal;