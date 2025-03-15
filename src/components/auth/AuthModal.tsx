"use client"

import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext'; // Keep this import - we'll actually use it
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { X, Mail, Key, AlertTriangle } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessfulAuth?: () => void; // Make sure this prop exists
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccessfulAuth }) => {
  // Actually use the useAuth hook to check user state
  const { currentUser } = useAuth();
  
  const [activeTab, setActiveTab] = useState<'login' | 'signup' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null); // Keep this - we'll use it
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal when user logs in
  useEffect(() => {
    if (currentUser) {
      onClose();
    }
  }, [currentUser, onClose]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // No need to assign user to variable if not using it
      // Call onSuccessfulAuth if provided
      if (onSuccessfulAuth) {
        onSuccessfulAuth();
      } else {
        onClose();
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to login';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Set success message and use it to display feedback
      setSuccess('Account created successfully! You can now log in.');
      setActiveTab('login');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to sign up';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    setLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      // Call onSuccessfulAuth if provided
      if (onSuccessfulAuth) {
        onSuccessfulAuth();
      } else {
        onClose();
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to login with Google';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    if (!email) {
      setError('Please enter your email address');
      setLoading(false);
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess('Password reset email sent! Check your inbox.');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to send reset email';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div 
        ref={modalRef} 
        className="relative w-full max-w-md bg-white rounded-lg shadow-xl"
      >
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-500 focus:outline-none"
        >
          <X className="w-5 h-5" />
        </button>
        
        {/* Modal content */}
        <div className="p-6">
          {/* Tab navigation */}
          <div className="flex mb-6">
            <button
              onClick={() => {
                setActiveTab('login');
                setError(null);
                setSuccess(null);
              }}
              className={`flex-1 py-2 font-medium text-sm border-b-2 ${
                activeTab === 'login' 
                  ? 'border-[#09869a] text-[#09869a]' 
                  : 'border-gray-200 text-gray-500 hover:text-gray-700'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => {
                setActiveTab('signup');
                setError(null);
                setSuccess(null);
              }}
              className={`flex-1 py-2 font-medium text-sm border-b-2 ${
                activeTab === 'signup' 
                  ? 'border-[#09869a] text-[#09869a]' 
                  : 'border-gray-200 text-gray-500 hover:text-gray-700'
              }`}
            >
              Sign Up
            </button>
          </div>
          
          {/* Error display */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-md flex items-start">
              <AlertTriangle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Success message display */}
          {success && (
            <div className="mb-4 p-3 bg-green-50 text-green-700 text-sm rounded-md">
              {success}
            </div>
          )}
          
          {/* Login form */}
          {activeTab === 'login' && (
            <>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#09869a] focus:border-[#09869a]"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Key className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#09869a] focus:border-[#09869a]"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div></div>
                  <button
                    type="button"
                    onClick={() => setActiveTab('forgot')}
                    className="text-sm text-[#09869a] hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2 px-4 bg-[#09869a] text-white font-medium rounded-md hover:bg-[#09869a]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#09869a] disabled:opacity-50"
                >
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </form>
              
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#09869a]"
                  >
                    <div className="flex items-center justify-center">
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                        <path
                          fill="#EA4335"
                          d="M12 5.04c2.17 0 3.95.69 5.3 1.83l4.04-4.04C19.22 1.14 15.87 0 12 0 7.31 0 3.26 2.67 1.28 6.56l4.62 3.58c1.12-3.35 4.27-5.7 8-5.7z"
                        />
                        <path
                          fill="#34A853"
                          d="M23.54 12.27c0-.95-.08-1.86-.25-2.73H12v5.46h6.44a5.5 5.5 0 01-2.38 3.62l4.6 3.56c2.68-2.49 4.23-6.15 4.23-10.45z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.9 14.58l-4.62 3.58C2.25 21.16 6.3 24 12 24c3.87 0 7.22-1.29 9.61-3.49l-4.6-3.56a8.33 8.33 0 01-5.01 1.44c-3.73 0-6.88-2.35-8-5.7z"
                        />
                        <path
                          fill="#4285F4"
                          d="M12 5.04c2.17 0 3.95.69 5.3 1.83l4.04-4.04C19.22 1.14 15.87 0 12 0 7.31 0 3.26 2.67 1.28 6.56l4.62 3.58c1.12-3.35 4.27-5.7 8-5.7z"
                        />
                      </svg>
                      Continue with Google
                    </div>
                  </button>
                </div>
              </div>
            </>
          )}
          
          {/* Sign up form */}
          {activeTab === 'signup' && (
            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#09869a] focus:border-[#09869a]"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="signup-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#09869a] focus:border-[#09869a]"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Key className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="signup-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#09869a] focus:border-[#09869a]"
                    placeholder="••••••••"
                    minLength={6}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Key className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#09869a] focus:border-[#09869a]"
                    placeholder="••••••••"
                    minLength={6}
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 px-4 bg-[#09869a] text-white font-medium rounded-md hover:bg-[#09869a]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#09869a] disabled:opacity-50"
              >
                {loading ? 'Creating Account...' : 'Sign Up'}
              </button>
            </form>
          )}
          
          {/* Forgot password form */}
          {activeTab === 'forgot' && (
            <>
              <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-900">Reset Password</h3>
                <p className="text-sm text-gray-500">Enter your email address and we&apos;ll send you a password reset link.</p>
              </div>
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div>
                  <label htmlFor="reset-email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="reset-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#09869a] focus:border-[#09869a]"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setActiveTab('login')}
                    className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#09869a]"
                  >
                    Back to Login
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-2 px-4 bg-[#09869a] text-white font-medium rounded-md hover:bg-[#09869a]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#09869a] disabled:opacity-50"
                  >
                    {loading ? 'Sending...' : 'Reset Password'}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;