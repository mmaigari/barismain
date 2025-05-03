"use client"

import React, { useState } from 'react';
import { Loader } from 'lucide-react';

interface BvnVerificationProps {
  onVerificationSuccess: (bvnData: BvnVerificationResult) => void;
}

export interface BvnVerificationResult {
  first_name: string;
  last_name: string;
  middle_name: string;
  dob: string;
  mobile: string;
  bvn: string;
}

const BvnVerification: React.FC<BvnVerificationProps> = ({ onVerificationSuccess }) => {
  const [bvn, setBvn] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleBvnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers and limit to 11 digits
    const value = e.target.value.replace(/\D/g, '').slice(0, 11);
    setBvn(value);
    if (error) setError(null);
  };
  
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!bvn || bvn.length !== 11) {
      setError('Please enter a valid 11-digit BVN number');
      return;
    }
    
    try {
      setIsVerifying(true);
      setError(null);
      
      console.log('Submitting BVN for verification:', bvn);
      
      // Call the Paystack BVN verification API via our backend proxy
      const response = await fetch('/api/volunteer/verify-bvn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bvn }),
      });
      
      const data = await response.json();
      console.log('BVN verification response:', data);
      
      if (!response.ok) {
        throw new Error(data.message || 'BVN verification failed');
      }
      
      // Handle different response structures
      let verificationData = data;
      
      // If response has a nested data property, use that
      if (data.data) {
        verificationData = data.data;
      }
      
      // Ensure we have a bvn field, which is the minimum requirement
      if (!verificationData.bvn) {
        // If missing the original BVN, add it from our input
        verificationData.bvn = bvn;
      }
      
      // Normalize the verification data to match our expected structure
      const normalizedData: BvnVerificationResult = {
        first_name: verificationData.first_name || verificationData.firstName || '',
        last_name: verificationData.last_name || verificationData.lastName || '',
        middle_name: verificationData.middle_name || verificationData.middleName || '',
        dob: verificationData.dob || verificationData.dateOfBirth || '',
        mobile: verificationData.mobile || verificationData.phone || verificationData.phoneNumber || '',
        bvn: verificationData.bvn || bvn
      };
      
      console.log('Normalized BVN data:', normalizedData);
      
      // Pass the normalized data to the parent component
      onVerificationSuccess(normalizedData);
      
    } catch (err: any) {
      console.error('BVN verification error:', err);
      setError(err.message || 'Failed to verify BVN. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };
  
  return (
    <div className="bg-white rounded-xl p-8 shadow-sm">
      <div className="mb-6">
        <h2 className="font-montserrat text-2xl font-bold text-gray-800 mb-2">Verify Your Identity</h2>
        <p className="text-gray-600">
          To begin your volunteer application, we need to verify your identity using your Bank Verification Number (BVN).
          This helps us ensure the security and integrity of our volunteer program.
        </p>
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md mb-6">
          {error}
        </div>
      )}
      
      <form onSubmit={handleVerify} className="space-y-6">
        <div>
          <label htmlFor="bvn" className="block text-gray-700 font-medium mb-2">
            Bank Verification Number (BVN) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="bvn"
            value={bvn}
            onChange={handleBvnChange}
            placeholder="Enter your 11-digit BVN"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#09869a] focus:border-transparent"
            disabled={isVerifying}
            required
          />
          <p className="mt-2 text-sm text-gray-500">
            Your BVN is a unique 11-digit number issued by the Central Bank of Nigeria.
          </p>
        </div>
        
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="privacy"
              type="checkbox"
              required
              className="w-4 h-4 text-[#09869a] focus:ring-[#09869a] border-gray-300 rounded"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="privacy" className="font-medium text-gray-700">
              I consent to the verification of my BVN
            </label>
            <p className="text-gray-500">
              I understand and agree that Barış Charity Foundation will verify my BVN through Paystack's secure API.
              My information will be kept confidential and only used for verification purposes.
            </p>
          </div>
        </div>
        
        <div className="text-center">
          <button
            type="submit"
            disabled={isVerifying || bvn.length !== 11}
            className="bg-[#09869a] hover:bg-[#09869a]/90 transition-colors duration-300 text-white px-8 py-3 rounded-md font-semibold disabled:opacity-70 disabled:cursor-not-allowed inline-flex items-center"
          >
            {isVerifying ? (
              <>
                <Loader className="animate-spin -ml-1 mr-3 h-5 w-5" />
                Verifying...
              </>
            ) : (
              'Verify & Continue'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BvnVerification;