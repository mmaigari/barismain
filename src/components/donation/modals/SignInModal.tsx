"use client"

import React, { useState } from 'react';
import { useDonation } from '@/contexts/DonationContext';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaApple } from 'react-icons/fa';
import { X } from 'lucide-react';

const SignInModal: React.FC = () => {
  const { setCurrentModal } = useDonation();
  
  // Add states for email login form
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleGuestContinue = () => {
    setCurrentModal('guestContinue');
  };
  
  const handleEmailLogin = () => {
    if (showEmailForm) {
      // Process the login
      processEmailLogin();
    } else {
      // Show the email login form
      setShowEmailForm(true);
      setShowRegisterForm(false);
    }
  };
  
  const processEmailLogin = async () => {
    // Validate inputs
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      // Make API call to your authentication endpoint
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to sign in');
      }
      
      // Store authentication data
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('user_email', email);
      
      // Proceed with donation flow
      setCurrentModal('paymentMethod');
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleRegister = async () => {
    if (!showRegisterForm) {
      // Show registration form
      setShowRegisterForm(true);
      setShowEmailForm(false);
      return;
    }
    
    // Validate inputs
    if (!fullName || !email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      // Make API call to your registration endpoint
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: fullName, email, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      
      // Store authentication data
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('user_email', email);
      localStorage.setItem('user_name', fullName);
      
      // Proceed with donation flow
      setCurrentModal('paymentMethod');
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleSocialLogin = async (provider: string) => {
    setLoading(true);
    setError('');
    
    try {
      let authUrl;
      
      // Generate the correct OAuth URL based on provider
      switch (provider) {
        case 'Google':
          authUrl = `/api/auth/google`;
          break;
        case 'Facebook':
          authUrl = `/api/auth/facebook`;
          break;
        case 'Apple':
          authUrl = `/api/auth/apple`;
          break;
        default:
          throw new Error('Invalid provider');
      }
      
      // For social login, we'll use a popup window approach
      const width = 600;
      const height = 600;
      const left = window.screen.width / 2 - width / 2;
      const top = window.screen.height / 2 - height / 2;
      
      // Save current modal state to return to after auth
      localStorage.setItem('return_to_modal', 'paymentMethod');
      
      // Open the authentication popup
      window.open(
        authUrl,
        `${provider}Auth`,
        `width=${width},height=${height},left=${left},top=${top}`
      );
      
      // The popup will redirect back to your site and update localStorage
      // Then we need to listen for a custom event from the popup
      window.addEventListener('social-auth-complete', (e: any) => {
        if (e.detail.success) {
          setCurrentModal('paymentMethod');
        } else {
          setError(e.detail.error || 'Authentication failed');
          setLoading(false);
        }
      }, { once: true });
      
      // For demo purposes, let's simulate success after 2 seconds
      // Remove this in production and rely on the actual OAuth flow
      setTimeout(() => {
        // Simulate successful authentication
        localStorage.setItem('auth_token', 'demo-token');
        localStorage.setItem('user_email', `demo-user@${provider.toLowerCase()}.com`);
        setCurrentModal('paymentMethod');
        setLoading(false);
      }, 2000);
      
    } catch (error) {
      console.error('Social login error:', error);
      setError('Failed to authenticate. Please try another method.');
      setLoading(false);
    }
  };

  // Back button for forms
  const handleBackToOptions = () => {
    setShowEmailForm(false);
    setShowRegisterForm(false);
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-xl p-6">
        {/* Close button */}
        <button
          onClick={() => setCurrentModal('teamSupport')}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <X size={20} />
        </button>
        
        {/* Header */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            {showEmailForm ? 'Sign In' : showRegisterForm ? 'Create Account' : 'Confirmation'}
          </h2>
          <p className="text-gray-600 mt-2">
            Complete your donation....
          </p>
        </div>
        
        {/* Error message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-md mb-4 text-sm">
            {error}
          </div>
        )}

        {/* Authentication options */}
        {!showEmailForm && !showRegisterForm && (
          <>
          
            
            <div className="mt-6">
              <button
                onClick={handleGuestContinue}
                disabled={loading}
                className="w-full py-3 text-base font-semibold text-white bg-[#09869a] rounded-lg hover:bg-[#09869a]/90 disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Continue'}
              </button>
            </div>
            

          </>
        )}
        
        {/* Loading overlay */}
        {loading && !showEmailForm && !showRegisterForm && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center rounded-lg">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 border-4 border-[#09869a]/30 border-t-[#09869a] rounded-full animate-spin"></div>
              <p className="mt-2 text-[#09869a] font-medium">Authenticating...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignInModal;