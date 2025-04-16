"use client"

import React, { useState, useEffect } from 'react';
import { useDonation } from '@/contexts/DonationContext';
import { X, CreditCard } from 'lucide-react';
import Script from 'next/script';

const PaymentMethodModal = () => {
  const { 
    setCurrentModal, 
    donationAmount, 
    coverFees,
    teamSupportAmount,
    programName,
    donationFrequency,
    currency,
    formatAmount
  } = useDonation();
  
  const NAIRA_USD_EXCHANGE_RATE = 1600;
  const [paystackLoaded, setPaystackLoaded] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  
  // Calculate total amount
  const calculateTotal = () => {
    let total = donationAmount;
    
    if (coverFees) {
      // Add payment processor fees
      if (currency === 'USD') {
        total += (donationAmount * 0.029) + 0.30;
      } else {
        total += (donationAmount * 0.015) + 100;
      }
    }
    
    if (teamSupportAmount) {
      total += teamSupportAmount;
    }
    
    return total;
  };
  
  const totalAmount = calculateTotal();
  
  // Handle form submission and Paystack payment
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!window.PaystackPop) {
      setPaymentError('Payment provider not available. Please try again later.');
      return;
    }
    
    setProcessingPayment(true);
    setPaymentError('');
    
    try {
      // Get user info from localStorage or your auth context
      const userEmail = localStorage.getItem('user_email') || 'guest@example.com';
      const userName = localStorage.getItem('user_name') || 'Guest User';
      
      // For recurring donations
      if (donationFrequency !== 'one-time') {
        // Save donation details for the subscription setup
        localStorage.setItem('subscription-details', JSON.stringify({
          email: userEmail,
          name: userName,
          amount: totalAmount,
          programName,
          frequency: donationFrequency
        }));
        
        // Redirect to subscription setup
        setCurrentModal('paystackSubscription');
        return;
      }
      
      // For one-time donations
      const handler = window.PaystackPop.setup({
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
        email: userEmail,
        amount: Math.round(totalAmount * 100), // Paystack uses kobo/cents
        currency: currency, // Use the selected currency (USD or NGN)
        ref: `bcf_${new Date().getTime()}_${Math.floor(Math.random() * 1000000)}`,
        metadata: {
          custom_fields: [
            {
              display_name: "Program",
              variable_name: "program",
              value: programName
            },
            {
              display_name: "Fee Coverage",
              variable_name: "cover_fees",
              value: coverFees ? "Yes" : "No"
            },
            {
              display_name: "Team Support",
              variable_name: "team_support",
              value: teamSupportAmount ? `${formatAmount(teamSupportAmount)}` : "None"
            }
          ]
        },
        callback: function(response: any) {
          // Save donation to database via API call
          saveDonationToDatabase({
            reference: response.reference,
            amount: totalAmount,
            programName,
            coverFees,
            teamSupportAmount,
            frequency: 'one-time',
            currency
          }).then(() => {
            setCurrentModal('confirmation');
          }).catch(err => {
            console.error("Failed to save donation", err);
            // Still show confirmation as payment was successful
            setCurrentModal('confirmation');
          });
        },
        onClose: function() {
          setProcessingPayment(false);
        }
      });
      
      handler.openIframe();
    } catch (error) {
      console.error("Paystack payment error:", error);
      setPaymentError('An error occurred while processing your payment. Please try again.');
      setProcessingPayment(false);
    }
  };
  
  // Function to save donation to your database
  const saveDonationToDatabase = async (donationData: any) => {
    try {
      const response = await fetch('/api/donations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(donationData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to save donation');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error saving donation:', error);
      throw error;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-xl p-6">
        <button
          onClick={() => setCurrentModal('guestContinue')}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close"
          disabled={processingPayment}
        >
          <X size={20} />
        </button>
        
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Payment Method</h2>
          <p className="text-gray-600 mt-2">
            Choose how you'd like to donate {formatAmount(totalAmount)}
            {donationFrequency !== 'one-time' && ` ${donationFrequency}`} to {programName}.
          </p>
        </div>
        
        {paymentError && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-md mb-4 text-sm">
            {paymentError}
          </div>
        )}
        
        {/* Wrap payment buttons in a form as required by Paystack */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 mb-4">
            <button
              type="submit"
              disabled={processingPayment || !paystackLoaded}
              className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center">
                <CreditCard className="w-5 h-5 mr-3 text-[#0AB95F]" />
                <div>
                  <p className="font-medium text-gray-900">Pay with Paystack</p>
                  <p className="text-sm text-gray-500">Card, Bank Transfer, USSD {currency === 'USD' && '- Multi-Currency'}</p>
                </div>
              </div>
              <img src="/paystack-logo.png" alt="Paystack" className="h-6" />
            </button>
          </div>
        </form>
        
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Donation amount:</span>
            <span className="font-medium">{formatAmount(donationAmount)}</span>
          </div>
          
          {coverFees && (
            <div className="flex justify-between text-sm mt-1">
              <span className="text-gray-600">Processing fees:</span>
              <span className="font-medium">
                {formatAmount(currency === 'USD' ? (donationAmount * 0.029) + 0.30 : (donationAmount * 0.015) + 100)}
              </span>
            </div>
          )}
          
          {teamSupportAmount > 0 && (
            <div className="flex justify-between text-sm mt-1">
              <span className="text-gray-600">Team support:</span>
              <span className="font-medium">{formatAmount(teamSupportAmount)}</span>
            </div>
          )}
          
          <div className="flex justify-between text-base font-medium mt-2">
            <span className="text-gray-800">Total:</span>
            <span className="text-[#09869a]">{formatAmount(totalAmount)}</span>
          </div>
        </div>
        
        {/* Place Paystack script inside the form component */}
        <Script
          src="https://js.paystack.co/v1/inline.js"
          onLoad={() => setPaystackLoaded(true)}
          onError={() => {
            console.error("Failed to load Paystack script");
            setPaymentError('Payment provider not available. Please try again later.');
          }}
          strategy="afterInteractive"
        />
      </div>
    </div>
  );
};

export default PaymentMethodModal;