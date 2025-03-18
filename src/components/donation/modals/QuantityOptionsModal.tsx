"use client";

import React, { useState } from 'react';
import { X, Minus, Plus, ChevronRight } from 'lucide-react';
import { useDonation } from '@/contexts/DonationContext';

export default function QuantityOptionsModal() {
  const { setCurrentModal, setDonationAmount } = useDonation();
  const [quantity, setQuantity] = useState(1);
  
  const unitAmount = Number(localStorage.getItem("fixedAmount") || "0");
  const programTitle = localStorage.getItem("programTitle") || "";
  const programDescription = localStorage.getItem("programDescription") || "";
  const isRecurring = localStorage.getItem("isRecurring") === "true";
  const unitLabel = localStorage.getItem("unitLabel") || "items";
  
  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };
  
  const handleContinue = () => {
    const totalAmount = unitAmount * quantity;
    setDonationAmount(totalAmount);
    localStorage.setItem("quantity", quantity.toString());
    localStorage.setItem("totalAmount", totalAmount.toString());
    
    // Move to the next step in the donation flow
    setCurrentModal('paymentFees');
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-4 border-b border-gray-100 flex justify-end">
          <button 
            onClick={() => setCurrentModal('')}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">{programTitle}</h3>
            <p className="text-gray-600">{programDescription}</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="flex justify-between items-center mb-3">
              <span className="font-medium text-gray-700">
                {programTitle === "Zakat al-Fitr" 
                  ? `How many ${unitLabel} would you like to give for?`
                  : `How many ${unitLabel} would you like to sponsor?`}
              </span>
            </div>
            
            <div className="flex items-center justify-center space-x-6">
              <button 
                onClick={() => handleQuantityChange(-1)} 
                disabled={quantity <= 1}
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  quantity > 1 ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' : 'bg-gray-100 text-gray-400'
                }`}
              >
                <Minus className="w-5 h-5" />
              </button>
              
              <span className="text-2xl font-bold text-gray-900">{quantity}</span>
              
              <button 
                onClick={() => handleQuantityChange(1)} 
                disabled={quantity >= 10}
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  quantity < 10 ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' : 'bg-gray-100 text-gray-400'
                }`}
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">
                {programTitle === "Zakat al-Fitr" 
                  ? `${programTitle} per ${unitLabel}: $${unitAmount}`
                  : unitLabel === "students" 
                    ? `Sponsorship per student: $${unitAmount}${isRecurring ? '/month' : ''}`
                    : `${programTitle} per ${unitLabel}: $${unitAmount}${isRecurring ? '/month' : ''}`}
              </span>
            </div>
            <div className="flex justify-between font-semibold text-lg">
              <span className="text-gray-700">
                {isRecurring ? "Total monthly amount:" : "Total amount:"}
              </span>
              <span className="text-[#09869a]">${(unitAmount * quantity).toFixed(2)}</span>
            </div>
          </div>
          
          <button
            onClick={handleContinue}
            className="bg-[#09869a] text-white w-full py-3 rounded-md font-medium hover:bg-[#09869a]/90 transition-colors flex items-center justify-center"
          >
            Continue
            <ChevronRight className="w-5 h-5 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
}