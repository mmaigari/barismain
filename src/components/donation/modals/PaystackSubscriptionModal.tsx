"use client"

import React, { useState, useEffect } from 'react';
import { useDonation } from '@/contexts/DonationContext';
import { X, AlertCircle } from 'lucide-react';

const PaystackSubscriptionModal: React.FC = () => {
  const { 
    setCurrentModal, 
    donationFrequency, 
    donationAmount, 
    formatAmount,
    programName,
    currency
  } = useDonation();
  
  const [fullName, setFullName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Load email from storage if available
  useEffect(() => {
    try {
      const subscriptionData = JSON.parse(localStorage.getItem('subscription-details') || '{}');
      if (subscriptionData.email) {
        setEmail(subscriptionData.email);
      }
    } catch (e) {
      console.error('Failed to load subscription details', e);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // In production, this would call Paystack's API to set up a recurring billing plan
      // For now, we'll just simulate the API call and show a confirmation
      
      if (!window.PaystackPop) {
        throw new Error('Paystack not loaded');
      }
      
      // For demonstration purposes only - in production you would need to setup a subscription
      // through Paystack's subscription API endpoints
      const handler = window.PaystackPop.setup({
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
        email: email,
        amount: Math.round(donationAmount * 100), // Convert to smallest currency unit
        currency: currency, // Use the selected currency
        ref: `bcf_sub_${new Date().getTime()}_${Math.floor(Math.random() * 1000000)}`,
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
              value: donationFrequency
            },
            {
              display_name: "Subscription Type",
              variable_name: "subscription_type",
              value: "recurring"
            }
          ]
        },
        callback: function(response: any) {
          // In production, you'd create a subscription on your backend here
          console.log("Payment complete! Reference: ", response.reference);
          setCurrentModal('confirmation');
        },
        onClose: function() {
          setLoading(false);
          console.log("Transaction was not completed, window closed.");
        }
      });
      
      handler.openIframe();
    } catch (err) {
      console.error('Subscription error:', err);
      setError('Failed to set up recurring donation. Please try again.');
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setCurrentModal('donationOptions');
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
          <h2 className="text-2xl font-bold text-gray-900">Set Up Recurring Donation</h2>
          <p className="text-gray-600 mt-2">
            You're setting up a {donationFrequency} donation of {formatAmount(donationAmount)} to support {programName}.
          </p>
          
          <div className="flex items-center bg-amber-50 p-3 rounded-md mt-3 text-amber-700 border border-amber-200">
            <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
            <span className="text-sm">
              For demo purposes only. In production, this would use Paystack's secure payment form.
            </span>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#09869a] focus:border-[#09869a]"
              required
            />
          </div>
          
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#09869a] focus:border-[#09869a]"
              required
            />
          </div>
          
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">
              By clicking the button below, you'll complete the first payment and set up automatic {donationFrequency} donations 
              of {formatAmount(donationAmount)} using Paystack's secure payment system.
            </p>
          </div>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <div className="mt-6 space-y-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 text-base font-semibold text-white bg-[#0AB95F] rounded-lg hover:bg-[#0AB95F]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0AB95F] disabled:opacity-50 flex items-center justify-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                `Set Up ${donationFrequency.charAt(0).toUpperCase() + donationFrequency.slice(1)} Donation with Paystack`
              )}
            </button>
            
            <button
              type="button"
              onClick={handleCancel}
              className="w-full py-3 text-base font-semibold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaystackSubscriptionModal;