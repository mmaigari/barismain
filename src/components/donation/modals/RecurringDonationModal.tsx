"use client"

import React from 'react';
import { useDonation } from '@/contexts/DonationContext';
import { X, Calendar, CheckCircle2 } from 'lucide-react';

const RecurringDonationModal: React.FC = () => {
  const { 
    setCurrentModal, 
    donationAmount,
    setDonationAmount,
    currency, 
    formatAmount, 
    donationFrequency, 
    setDonationFrequency 
  } = useDonation();

  const frequencies = [
    { value: 'one-time', label: 'One-time Donation', description: 'Make a single donation today' },
    { value: 'monthly', label: 'Monthly', description: 'Support us every month' },
    { value: 'quarterly', label: 'Quarterly', description: 'Support us every three months' },
    { value: 'annually', label: 'Annually', description: 'Support us once a year' },
  ];

  const handleFrequencySelect = (frequency: 'one-time' | 'monthly' | 'quarterly' | 'annually') => {
    setDonationFrequency(frequency);
  };

  const handleProceed = () => {
    setCurrentModal('paymentFees');
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
          <h2 className="text-2xl font-bold text-gray-900">Choose Donation Frequency</h2>
          <p className="text-gray-600 mt-2">
            Would you like to make this a recurring donation?
          </p>
          <div className="bg-[#09869a]/10 p-3 rounded-md mt-3 flex items-center">
            <Calendar className="w-5 h-5 text-[#09869a] mr-2" />
            <span className="text-sm">
              Recurring donations help us plan for the future and create sustainable impact.
            </span>
          </div>
        </div>
        
        <div className="space-y-3">
          {frequencies.map((freq) => (
            <div
              key={freq.value}
              onClick={() => handleFrequencySelect(freq.value as any)}
              className={`flex items-center p-4 border rounded-md cursor-pointer transition-all ${
                donationFrequency === freq.value
                  ? 'border-[#09869a] bg-[#09869a]/5'
                  : 'border-gray-200 hover:border-[#09869a]/50'
              }`}
            >
              <div className="flex-1">
                <h3 className="font-medium text-gray-800">{freq.label}</h3>
                <p className="text-sm text-gray-500 mt-0.5">{freq.description}</p>
              </div>
              
              {donationFrequency === freq.value && (
                <CheckCircle2 className="w-5 h-5 text-[#09869a]" />
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-8 space-y-3">
          <button
            onClick={handleProceed}
            className="w-full py-3 text-base font-semibold text-white bg-[#09869a] rounded-lg hover:bg-[#09869a]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#09869a]"
          >
            {donationFrequency === 'one-time' 
              ? `Proceed with One-Time ${formatAmount(donationAmount)}` 
              : `Proceed with ${formatAmount(donationAmount)} ${donationFrequency.charAt(0).toUpperCase() + donationFrequency.slice(1)}`
            }
          </button>
          
          <button
            onClick={handleCancel}
            className="w-full py-3 text-base font-semibold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecurringDonationModal;