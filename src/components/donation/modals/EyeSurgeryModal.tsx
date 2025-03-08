"use client"

import React, { useState } from 'react';
import { useDonation } from '@/contexts/DonationContext';

interface EyeSurgeryModalProps {
  fixedCost: number;
  onClose: () => void;
}

const EyeSurgeryModal: React.FC<EyeSurgeryModalProps> = ({ fixedCost, onClose }) => {
  const [surgeryCount, setSurgeryCount] = useState(1);
  const { setDonationAmount, setCurrentModal, setProgramName } = useDonation();
  
  const totalAmount = surgeryCount * fixedCost;

  const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = parseInt(e.target.value);
    if (!isNaN(count) && count > 0) {
      setSurgeryCount(count);
    }
  };

  // Make sure your handleProceed function properly sets up the donation
  const handleProceed = () => {
    setDonationAmount(totalAmount);
    setProgramName("Eye Surgery & General Surgeries");
    setCurrentModal('paymentFees'); // This should trigger the next modal in the flow
    onClose(); // This closes the eye surgery modal
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-xl p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Sponsor Eye Surgery</h2>
          <p className="text-gray-600 mt-2">
            Each surgery costs ${fixedCost}. Select how many surgeries you would like to sponsor.
          </p>
        </div>
        
        <div className="mb-6">
          <label htmlFor="surgery-count" className="block text-sm font-medium text-gray-700 mb-2">
            Number of Surgeries
          </label>
          <input
            type="number"
            id="surgery-count"
            min="1"
            value={surgeryCount}
            onChange={handleCountChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#09869a] focus:border-[#09869a]"
          />
        </div>
        
        <div className="p-4 mb-6 bg-gray-100 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Total Amount:</span>
            <span className="text-xl font-bold text-[#09869a]">${totalAmount.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 text-base font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={handleProceed}
            className="flex-1 py-3 text-base font-semibold text-white bg-[#09869a] rounded-lg hover:bg-[#09869a]/90"
          >
            Heal Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default EyeSurgeryModal;