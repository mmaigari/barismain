"use client"

import React from 'react';
import { useDonation } from '@/contexts/DonationContext';
import { CheckCircle, Home, X, Download } from 'lucide-react';
import Link from 'next/link';

const ConfirmationModal: React.FC = () => {
  const { 
    setCurrentModal, 
    donationAmount, 
    programName,
    formatAmount
  } = useDonation();

  // Generate a receipt number
  const receiptNumber = `D${Math.floor(Math.random() * 10000)}${Date.now().toString().slice(-4)}`;
  
  // Format date for the receipt
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const handleClose = () => {
    setCurrentModal('');
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-2 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-xl p-4 sm:p-6 my-4">
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <X size={18} />
        </button>
        
        <div className="text-center mb-4 sm:mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-green-100 mb-3 sm:mb-4">
            <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Thank You!</h2>
          <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">
            Your donation has been received successfully
          </p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200 mb-4 sm:mb-6">
          <div className="space-y-2 sm:space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs sm:text-sm text-gray-500">Receipt Number:</span>
              <span className="text-xs sm:text-sm font-medium text-gray-900">{receiptNumber}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-xs sm:text-sm text-gray-500">Date:</span>
              <span className="text-xs sm:text-sm font-medium text-gray-900">{formattedDate}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-xs sm:text-sm text-gray-500">Program:</span>
              <span className="text-xs sm:text-sm font-medium text-gray-900">{programName}</span>
            </div>
            
            <div className="border-t border-dashed border-gray-300 my-2 sm:my-3"></div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm sm:text-base font-medium text-gray-700">Amount:</span>
              <span className="text-base sm:text-lg font-bold text-[#09869a]">{formatAmount(donationAmount)}</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
          <p className="text-xs sm:text-sm text-gray-600">
            A receipt has been sent to your email. Keep it safe for your tax records.
          </p>
          
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 text-sm">
            <button 
              className="inline-flex items-center justify-center text-xs sm:text-sm font-medium text-[#09869a] hover:text-[#09869a]/80 border border-[#09869a] hover:bg-[#09869a]/5 rounded-md py-2 px-3"
            >
              <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5" />
              Download Receipt
            </button>
            
            <button 
              className="inline-flex items-center justify-center text-xs sm:text-sm font-medium text-[#09869a] hover:text-[#09869a]/80"
            >
              Resend Email Receipt
            </button>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Link 
            href="/"
            className="flex-1 text-center py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
            onClick={handleClose}
          >
            <Home className="inline-block w-3 h-3 sm:w-4 sm:h-4 mr-1.5" />
            Go to Homepage
          </Link>
          
          <button
            onClick={handleClose}
            className="flex-1 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white bg-[#09869a] rounded-lg hover:bg-[#09869a]/90"
          >
            Donate Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;