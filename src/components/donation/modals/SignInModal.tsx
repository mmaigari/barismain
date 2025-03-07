"use client"

import React from 'react';
import { useDonation } from '@/contexts/DonationContext';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaApple } from 'react-icons/fa';

const SignInModal: React.FC = () => {
  const { setCurrentModal } = useDonation();
  
  const handleGuestContinue = () => {
    setCurrentModal('guestContinue');
  };
  
  const handleEmailLogin = () => {
    // You can integrate this with your existing AuthModal logic
    setCurrentModal('confirmation'); // For now, proceed directly
  };
  
  const handleSocialLogin = (provider: string) => {
    // Integrate with your existing social login logic
    console.log(`Login with ${provider}`);
    setCurrentModal('confirmation');
  };
  
  const handleSignUp = () => {
    // Integrate with your existing signup flow
    setCurrentModal('confirmation'); // For now, proceed directly
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-xl p-6">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Sign In</h2>
          <p className="text-gray-600 mt-2">
            Complete your donation by signing in or continuing as a guest
          </p>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={() => handleSocialLogin('Google')}
            className="w-full py-3 px-4 flex items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-50"
          >
            <FcGoogle className="w-5 h-5 mr-3" />
            <span className="font-medium">Continue with Google</span>
          </button>
          
          <button
            onClick={() => handleSocialLogin('Facebook')}
            className="w-full py-3 px-4 flex items-center justify-center rounded-lg border border-blue-600 bg-blue-600 text-white hover:bg-blue-700"
          >
            <FaFacebook className="w-5 h-5 mr-3" />
            <span className="font-medium">Continue with Facebook</span>
          </button>
          
          <button
            onClick={() => handleSocialLogin('Apple')}
            className="w-full py-3 px-4 flex items-center justify-center rounded-lg border border-gray-800 bg-gray-800 text-white hover:bg-black"
          >
            <FaApple className="w-5 h-5 mr-3" />
            <span className="font-medium">Continue with Apple</span>
          </button>
          
          <button
            onClick={handleEmailLogin}
            className="w-full py-3 px-4 rounded-lg border border-gray-300 font-medium hover:bg-gray-50"
          >
            Log in with Email Address
          </button>
        </div>
        
        <div className="mt-6">
          <button
            onClick={handleGuestContinue}
            className="w-full py-3 text-base font-semibold text-white bg-[#09869a] rounded-lg hover:bg-[#09869a]/90"
          >
            Continue as a Guest
          </button>
        </div>
        
        <p className="mt-4 text-sm text-center text-gray-600">
          Don&apos;t have an account? <button onClick={handleSignUp} className="text-[#09869a] font-medium">Sign up</button>
        </p>
      </div>
    </div>
  );
};

export default SignInModal;