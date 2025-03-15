"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { useDonation } from '@/contexts/DonationContext';

interface EyeSurgeryModalProps {
  fixedCost: number;
  onClose: () => void;
}

const EyeSurgeryModal: React.FC<EyeSurgeryModalProps> = ({ fixedCost, onClose }) => {
  const { setCurrentModal, setProgramName, setDonationAmount, currency, formatAmount, convertAmount } = useDonation();
  const [surgeryCount, setSurgeryCount] = useState(1);
  const [customAmount, setCustomAmount] = useState('');
  const [isCustom, setIsCustom] = useState(false);

  // Convert the fixed cost based on current currency
  const convertedFixedCost = currency === 'NGN' ? convertAmount(fixedCost, 'NGN') : fixedCost;
  
  // Calculate the total amount based on count or custom input
  const calculateAmount = () => {
    if (isCustom && customAmount) {
      return parseFloat(customAmount);
    } else {
      return surgeryCount * convertedFixedCost;
    }
  };

  const handleProceed = () => {
    const amount = calculateAmount();
    setProgramName("Eye Surgery Program");
    setDonationAmount(amount);
    setCurrentModal('paymentFees');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-xl p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <X size={20} />
        </button>
        
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Sponsor Eye Surgeries</h2>
          <p className="text-gray-600 mt-2">
            Each surgery costs {formatAmount(fixedCost)} and can restore a person's sight.
          </p>
        </div>
        
        {/* Surgery count selection or custom amount input */}
        <div className="space-y-4">
          {!isCustom ? (
            <div>
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 5].map((count) => (
                  <button
                    key={count}
                    onClick={() => setSurgeryCount(count)}
                    className={`py-3 px-4 rounded-md border ${
                      surgeryCount === count
                        ? 'border-[#09869a] bg-[#09869a]/10 text-[#09869a]'
                        : 'border-gray-300 hover:border-[#09869a]/50'
                    }`}
                  >
                    {count} {count === 1 ? 'Surgery' : 'Surgeries'}
                  </button>
                ))}
              </div>
              
              <div className="mt-4">
                <p className="text-gray-700 font-medium">
                  Total: {formatAmount(surgeryCount * fixedCost)}
                </p>
                <p className="text-sm text-gray-500">
                  This will help {surgeryCount} {surgeryCount === 1 ? 'person' : 'people'} see clearly again.
                </p>
              </div>
              
              <button
                onClick={() => setIsCustom(true)}
                className="mt-4 text-sm text-[#09869a] hover:underline"
              >
                Enter custom amount instead
              </button>
            </div>
          ) : (
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="text-gray-500">{currency === 'USD' ? '$' : '₦'}</span>
                </div>
                <input
                  type="number"
                  placeholder="Custom amount"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="block w-full pl-8 pr-3 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-[#09869a] focus:border-[#09869a]"
                />
              </div>
              
              <p className="mt-2 text-sm text-gray-500">
                {customAmount && !isNaN(parseFloat(customAmount)) && parseFloat(customAmount) >= convertedFixedCost ? (
                  `This will help approximately ${Math.floor(parseFloat(customAmount) / convertedFixedCost)} people see clearly again.`
                ) : (
                  `Minimum donation is ${formatAmount(fixedCost)} for one surgery.`
                )}
              </p>
              
              <button
                onClick={() => {
                  setIsCustom(false);
                  setCustomAmount('');
                }}
                className="mt-4 text-sm text-[#09869a] hover:underline"
              >
                Choose from preset options instead
              </button>
            </div>
          )}
        </div>
        
        <div className="mt-8 space-y-3">
          <button
            onClick={handleProceed}
            disabled={(isCustom && (!customAmount || parseFloat(customAmount) < convertedFixedCost))}
            className="w-full py-3 text-base font-semibold text-white bg-[#09869a] rounded-lg hover:bg-[#09869a]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#09869a] disabled:opacity-50"
          >
            Proceed to Checkout
          </button>
          
          <button
            onClick={onClose}
            className="w-full py-3 text-base font-semibold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EyeSurgeryModal;