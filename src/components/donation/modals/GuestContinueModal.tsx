"use client"

import React, { useState } from 'react';
import { useDonation } from '@/contexts/DonationContext';

const GuestContinueModal: React.FC = () => {
  const { setCurrentModal } = useDonation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({ name: '', email: '' });

  const validateForm = () => {
    const newErrors = { name: '', email: '' };
    let isValid = true;
    
    if (!name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleContinue = () => {
    if (validateForm()) {
      // Store guest info if needed
      setCurrentModal('paymentMethod');
    }
  };
  
  const handleBack = () => {
    setCurrentModal('signIn');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-xl p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Continue as a Guest</h2>
          <p className="text-gray-600 mt-2">
            Please provide your details to complete your donation
          </p>
        </div>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="guest-name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              id="guest-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`block w-full px-3 py-2 border ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:ring-[#09869a] focus:border-[#09869a]`}
              placeholder="John Doe"
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>
          
          <div>
            <label htmlFor="guest-email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              id="guest-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`block w-full px-3 py-2 border ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:ring-[#09869a] focus:border-[#09869a]`}
              placeholder="your@email.com"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>
        </div>
        
        <div className="mt-6 space-y-3">
          <button
            onClick={handleContinue}
            className="w-full py-3 text-base font-semibold text-white bg-[#09869a] rounded-lg hover:bg-[#09869a]/90"
          >
            Continue
          </button>
          <button
            onClick={handleBack}
            className="w-full py-3 text-base font-semibold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuestContinueModal;