"use client"

import React from 'react';
import { useDonation } from '@/contexts/DonationContext';

const PaymentFeesModal: React.FC = () => {
  const { setCurrentModal, donationAmount, setCoverFees } = useDonation();
  
  // Calculate approximate processing fee (typically around 2.9% + $0.30)
  const processingFee = (donationAmount * 0.029) + 0.30;
  
  const handleYes = () => {
    setCoverFees(true);
    setCurrentModal('teamSupport');
  };
  
  const handleNo = () => {
    setCoverFees(false);
    setCurrentModal('teamSupport');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-xl p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Cover Payment Fees</h2>
          <p className="text-gray-600 mt-2">
            Would you like to cover the payment processing fees? This ensures your entire donation goes to the program.
          </p>
        </div>
        
        <div className="p-4 mb-6 bg-gray-100 rounded-lg">
          <div className="flex justify-between mb-2">
            <span className="text-gray-700">Donation amount:</span>
            <span className="font-medium">${donationAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700">Processing fee:</span>
            <span className="font-medium">${processingFee.toFixed(2)}</span>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-300 flex justify-between">
            <span className="font-medium">Total with fees:</span>
            <span className="font-bold">${(donationAmount + processingFee).toFixed(2)}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={handleNo}
            className="py-3 text-base font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            No
          </button>
          <button
            onClick={handleYes}
            className="py-3 text-base font-semibold text-white bg-[#09869a] rounded-lg hover:bg-[#09869a]/90"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentFeesModal;