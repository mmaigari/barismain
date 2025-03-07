"use client"

import React, { useState } from 'react';
import { useDonation } from '@/contexts/DonationContext';

const PRESET_AMOUNTS = [25, 50, 100, 250, 500];

const DonationOptionsModal: React.FC = () => {
  const { setCurrentModal, setDonationAmount, programName } = useDonation();
  const [customAmount, setCustomAmount] = useState('');
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);

  const handleAmountSelect = (amount: number) => {
    setSelectedPreset(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    setSelectedPreset(null);
  };

  const handleProceed = () => {
    const amount = selectedPreset || Number(customAmount);
    if (amount > 0) {
      setDonationAmount(amount);
      setCurrentModal('paymentFees');
    }
  };

  const handleCancel = () => {
    setCurrentModal('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-xl p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Donation Options</h2>
          <p className="text-gray-600 mt-2">Select an amount to donate to {programName}</p>
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            {PRESET_AMOUNTS.map((amount) => (
              <button
                key={amount}
                onClick={() => handleAmountSelect(amount)}
                className={`py-3 px-4 rounded-md border ${
                  selectedPreset === amount
                    ? 'border-[#09869a] bg-[#09869a]/10 text-[#09869a]'
                    : 'border-gray-300 hover:border-[#09869a]/50'
                }`}
              >
                ${amount}
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
    </div>
  );
};

export default DonationOptionsModal;