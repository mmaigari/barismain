"use client"

import React, { useState } from 'react';
import { 
  XIcon, 
  Mail, 
  Lock, 
  User as UserIcon, 
  AlertCircle,
  Eye,
  EyeOff,
  CheckCircle
} from 'lucide-react';
import Image from 'next/image';
import { 
  registerUser, 
  loginUser, 
  resetPassword, 
  signInWithGoogle, 
  signInWithFacebook,
  checkEmailExists 
} from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

const AuthModal: React.FC<AuthModalProps> = ({ 
  isOpen, 
  onClose,
  initialMode = 'login'
}) => {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailExists, setEmailExists] = useState<boolean | null>(null);
  const [emailTouched, setEmailTouched] = useState(false);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      if (mode === 'register') {
        const { user, error } = await registerUser(email, password, displayName);
        if (error) {
          throw new Error(error.message || 'Failed to create account');
        }
        
        setSuccess('Account created successfully! Please check your email for verification.');
        setTimeout(() => {
          setMode('login');
          setSuccess('');
        }, 3000);
      } 
      else if (mode === 'login') {
        const { user, error } = await loginUser(email, password);
        if (error) {
          throw new Error(error.message || 'Failed to sign in');
        }
        onClose();
      }
      else if (mode === 'forgot') {
        const { success, error } = await resetPassword(email);
        if (error) {
          throw new Error(error.message || 'Failed to send password reset email');
        }
        setSuccess('Password reset email sent. Please check your inbox.');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const { user, error } = await signInWithGoogle();
      if (error) throw new Error(error.message || 'Failed to sign in with Google');
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFacebookSignIn = async () => {
    setIsLoading(true);
    try {
      const { user, error } = await signInWithFacebook();
      if (error) throw new Error(error.message || 'Failed to sign in with Facebook');
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Check if email is already in use when user finishes typing
  const handleEmailBlur = async () => {
    if (mode === 'register' && email && !emailTouched) {
      const exists = await checkEmailExists(email);
      setEmailExists(exists);
      setEmailTouched(true);
    }
  };

  // Reset form when mode changes
  const changeMode = (newMode: 'login' | 'register' | 'forgot') => {
    setMode(newMode);
    setError('');
    setSuccess('');
    setEmailExists(null);
    setEmailTouched(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-xl p-6 mx-4 overflow-hidden">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <XIcon className="w-5 h-5" />
        </button>
        
        {/* Header */}
        <div className="text-center mb-6">
          <Image 
            src="/logo-main2.svg" 
            alt="Baris Charity Foundation Logo" 
            width={120} 
            height={36} 
            className="mx-auto mb-4"
          />
          <h2 className="text-2xl font-semibold text-gray-800">
            {mode === 'login' ? 'Sign In' : mode === 'register' ? 'Create Account' : 'Reset Password'}
          </h2>
          <p className="text-gray-600 mt-1">
            {mode === 'login' ? 'Welcome back to Baris Charity Foundation' : 
             mode === 'register' ? 'Join us and make a difference' : 
             'Enter your email to reset your password'}
          </p>
        </div>
        
        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md flex items-center">
            <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}
        
        {/* Success message */}
        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-600 rounded-md flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
            <p className="text-sm">{success}</p>
          </div>
        )}
        
        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Display name field - only for register */}
          {mode === 'register' && (
            <div className="mb-4">
              <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                  <UserIcon className="w-5 h-5" />
                </div>
                <input 
                  id="displayName"
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>
          )}
          
          {/* Email field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                <Mail className="w-5 h-5" />
              </div>
              <input 
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailTouched) setEmailTouched(false);
                }}
                onBlur={handleEmailBlur}
                className={`block w-full pl-10 pr-3 py-2.5 border rounded-md shadow-sm 
                  ${emailExists === true && mode === 'register' 
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                    : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                  }`}
                placeholder="your.email@example.com"
                required
              />
            </div>
            {emailExists === true && mode === 'register' && (
              <p className="mt-1 text-sm text-red-600">
                This email is already in use. Please sign in instead.
              </p>
            )}
          </div>
          
          {/* Password field - not for forgot password */}
          {mode !== 'forgot' && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                {mode === 'login' && (
                  <button 
                    type="button" 
                    onClick={() => changeMode('forgot')}
                    className="text-sm text-[#09869A] hover:text-[#09869A]/80 transition-colors"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                  <Lock className="w-5 h-5" />
                </div>
                <input 
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder={mode === 'register' ? "Create a strong password" : "Enter your password"}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {mode === 'register' && (
                <p className="mt-1 text-xs text-gray-500">
                  Password must be at least 8 characters long with a mix of letters, numbers & symbols
                </p>
              )}
            </div>
          )}
          
          {/* Submit button */}
          <button
            type="submit"
            disabled={isLoading || (mode === 'register' && emailExists === true)}
            className={`w-full py-3 px-4 font-medium rounded-md text-white transition-all
              ${isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-[#09869A] hover:bg-[#09869A]/90 shadow-md hover:shadow-lg'
              }`}
          >
            {isLoading 
              ? 'Please wait...' 
              : mode === 'login' 
                ? 'Sign In' 
                : mode === 'register' 
                  ? 'Create Account' 
                  : 'Send Reset Link'
            }
          </button>
          
          {/* Switch between login and register */}
          {mode !== 'forgot' && (
            <p className="text-center mt-4 text-gray-600">
              {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={() => changeMode(mode === 'login' ? 'register' : 'login')}
                className="text-[#09869A] font-medium hover:text-[#09869A]/80 transition-colors"
              >
                {mode === 'login' ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          )}
          
          {/* Back to login from forgot password */}
          {mode === 'forgot' && (
            <p className="text-center mt-4 text-gray-600">
              <button
                type="button"
                onClick={() => changeMode('login')}
                className="text-[#09869A] font-medium hover:text-[#09869A]/80 transition-colors"
              >
                Back to Sign In
              </button>
            </p>
          )}
        </form>
        
        {/* Divider */}
        {mode !== 'forgot' && (
          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-300"></div>
            <div className="mx-4 text-gray-500 text-sm">or continue with</div>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>
        )}
        
        {/* Social Login Buttons */}
        {mode !== 'forgot' && (
          <div className="grid grid-cols-2 gap-4">
            <button 
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className={`flex items-center justify-center py-2.5 px-4 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-50 transition-colors
                ${isLoading ? 'cursor-not-allowed opacity-70' : ''}`}
            >
              <Image src="/icons/google.svg" alt="Google" width={18} height={18} className="mr-2" />
              <span className="text-gray-700 font-medium">Google</span>
            </button>
            <button 
              type="button"
              onClick={handleFacebookSignIn}
              disabled={isLoading}
              className={`flex items-center justify-center py-2.5 px-4 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-50 transition-colors
                ${isLoading ? 'cursor-not-allowed opacity-70' : ''}`}
            >
              <Image src="/icons/facebook.svg" alt="Facebook" width={18} height={18} className="mr-2" />
              <span className="text-gray-700 font-medium">Facebook</span>
            </button>
          </div>
        )}
        
        {/* Privacy notice */}
        <p className="text-xs text-gray-500 text-center mt-6">
          By signing up, you agree to our <a href="/terms" className="underline hover:text-gray-700">Terms of Service</a> and <a href="/privacy" className="underline hover:text-gray-700">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;