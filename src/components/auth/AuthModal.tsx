"use client"

import { useState, useRef, useEffect } from 'react';
import { FaTimes, FaFacebook, FaGoogle } from 'react-icons/fa';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'signup'
  const modalRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Close modal with escape key
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    // Prevent scrolling when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
    }
    
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div 
        className="relative bg-white rounded-lg max-w-md w-full shadow-xl"
        ref={modalRef}
        style={{
          animation: "modal-appear 0.3s ease-out forwards"
        }}
      >
        {/* Close button */}
        <button 
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
          onClick={onClose}
          aria-label="Close"
        >
          <FaTimes className="text-xl" />
        </button>
        
        {/* Auth Tabs */}
        <div className="flex border-b">
          <button
            className={`flex-1 py-4 font-medium text-center transition-colors ${
              activeTab === 'login' 
                ? 'text-[#09869A] border-b-2 border-[#09869A]' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('login')}
          >
            Login
          </button>
          <button
            className={`flex-1 py-4 font-medium text-center transition-colors ${
              activeTab === 'signup' 
                ? 'text-[#09869A] border-b-2 border-[#09869A]' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('signup')}
          >
            Sign Up
          </button>
        </div>
        
        {/* Login Form */}
        {activeTab === 'login' && (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Welcome Back</h2>
            
            {/* Social Logins */}
            <div className="flex gap-3 mb-6">
              <button className="flex-1 bg-[#3b5998] text-white py-2 rounded-md flex items-center justify-center hover:bg-opacity-90 transition-all">
                <FaFacebook className="mr-2" /> Facebook
              </button>
              <button className="flex-1 bg-[#db4437] text-white py-2 rounded-md flex items-center justify-center hover:bg-opacity-90 transition-all">
                <FaGoogle className="mr-2" /> Google
              </button>
            </div>
            
            <div className="relative flex py-3 items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="flex-shrink mx-3 text-gray-500 text-sm">or login with email</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            
            <form className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#09869A] focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <a href="#" className="text-xs text-[#09869A] hover:underline">
                    Forgot Password?
                  </a>
                </div>
                <input
                  type="password"
                  id="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#09869A] focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#09869A] text-white py-2.5 rounded-md hover:bg-[#09869A]/90 transition-colors font-medium"
              >
                Login
              </button>
            </form>
          </div>
        )}
        
        {/* Sign Up Form */}
        {activeTab === 'signup' && (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Create Account</h2>
            
            {/* Social Signups */}
            <div className="flex gap-3 mb-6">
              <button className="flex-1 bg-[#3b5998] text-white py-2 rounded-md flex items-center justify-center hover:bg-opacity-90 transition-all">
                <FaFacebook className="mr-2" /> Facebook
              </button>
              <button className="flex-1 bg-[#db4437] text-white py-2 rounded-md flex items-center justify-center hover:bg-opacity-90 transition-all">
                <FaGoogle className="mr-2" /> Google
              </button>
            </div>
            
            <div className="relative flex py-3 items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="flex-shrink mx-3 text-gray-500 text-sm">or sign up with email</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="first-name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#09869A] focus:border-transparent"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="last-name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#09869A] focus:border-transparent"
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="signup-email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#09869A] focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="signup-password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#09869A] focus:border-transparent"
                  placeholder="••••••••"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Password must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number.
                </p>
              </div>
              <div className="flex items-center">
                <input
                  id="agree-terms"
                  type="checkbox"
                  className="h-4 w-4 text-[#09869A] focus:ring-[#09869A] border-gray-300 rounded"
                />
                <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-700">
                  I agree to the <a href="#" className="text-[#09869A] hover:underline">Terms of Service</a> and <a href="#" className="text-[#09869A] hover:underline">Privacy Policy</a>
                </label>
              </div>
              <button
                type="submit"
                className="w-full bg-[#09869A] text-white py-2.5 rounded-md hover:bg-[#09869A]/90 transition-colors font-medium"
              >
                Create Account
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}