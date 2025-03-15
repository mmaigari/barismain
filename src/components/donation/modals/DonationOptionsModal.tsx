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
    paymentProvider 
  } = useDonation();
  
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [email, setEmail] = useState('');
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  
  // Define base amounts in USD
  const baseAmounts = [25, 50, 100, 250, 500];
  
  // Get donation options based on current currency
  const getDonationOptions = () => {
    return baseAmounts.map(amount => {
      const value = currency === 'NGN' ? convertAmount(amount, 'NGN') : amount;
      return {
        amount: value,
        label: formatAmount(amount)
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
      setCurrentModal('recurringDonation'); // Change this line to go to recurring options first
    }
  };
  
  // Modify your Paystack handler to support recurring payments

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
    
    // One-time payment with Paystack (existing code)
    if (window.PaystackPop) {
      const handler = window.PaystackPop.setup({
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
        email: email,
        amount: amount * 100,
        currency: "NGN",
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
          setDonationAmount(amount);
          setCurrentModal('confirmation');
        },
        onClose: function() {
          console.log("Transaction was not completed, window closed.");
        }
      });
      handler.openIframe();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-xl p-6">
        <button
          onClick={handleCancel}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <X size={20} />
        </button>
        
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Donation Options</h2>
          <p className="text-gray-600 mt-2">Select an amount to donate to {programName}</p>
          <div className="mt-2 text-sm font-medium text-[#09869A]">
            Currently showing amounts in {currency}
          </div>
        </div>

        {paymentProvider === 'paystack' ? (
          <form ref={formRef} onSubmit={handlePaystackSubmit}>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                {donationOptions.map(({ amount, label }) => (
                  <button
                    type="button"
                    key={amount}
                    onClick={() => handleAmountSelect(amount)}
                    className={`py-3 px-4 rounded-md border ${
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
                  <span className="text-gray-500">₦</span>
                </div>
                <input
                  type="number"
                  name="amount"
                  placeholder="Custom amount"
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  className="block w-full pl-8 pr-3 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-[#09869a] focus:border-[#09869a]"
                />
              </div>
              
              <div className="mt-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-[#09869a] focus:border-[#09869a]"
                  required
                />
              </div>
            </div>
            
            <div className="mt-8 space-y-3">
              <button
                type="submit"
                disabled={(!selectedPreset && !customAmount) || !email}
                className="w-full py-3 text-base font-semibold text-white bg-[#0AB95F] rounded-lg hover:bg-[#0AB95F]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0AB95F] disabled:opacity-50 flex items-center justify-center gap-2"
              >
                Pay ₦{selectedPreset || customAmount} with Paystack
              </button>
              
              <button
                type="button"
                onClick={handleCancel}
                className="w-full py-3 text-base font-semibold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
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
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              {donationOptions.map(({ amount, label }) => (
                <button
                  key={amount}
                  onClick={() => handleAmountSelect(amount)}
                  className={`py-3 px-4 rounded-md border ${
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
                <span className="text-gray-500">$</span>
              </div>
              <input
                type="number"
                placeholder="Custom amount"
                value={customAmount}
                onChange={handleCustomAmountChange}
                className="block w-full pl-8 pr-3 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-[#09869a] focus:border-[#09869a]"
              />
            </div>
            
            <div className="mt-8 space-y-3">
              <button
                onClick={handleProceed}
                disabled={!selectedPreset && !customAmount}
                className="w-full py-3 text-base font-semibold text-white bg-[#09869a] rounded-lg hover:bg-[#09869a]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#09869a] disabled:opacity-50"
              >
                Proceed to Checkout
              </button>
              
              <button
                onClick={handleCancel}
                className="w-full py-3 text-base font-semibold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationOptionsModal;