"use client"

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

// Add this constant at the top of your file
const NAIRA_USD_EXCHANGE_RATE = 1700;
const CURRENCY_STORAGE_KEY = 'bcf-preferred-currency';

type GuestData = {
  name: string;
  email: string;
  phone?: string; // Add the phone field as optional
};

type ModalType = null | 'donationOptions' | 'quantityOptions' | 'paymentFees' | 'teamSupport' | 'signIn' | 'guestContinue' | 'paymentMethod' | 'confirmation';

type CurrencyType = 'USD' | 'NGN';
type PaymentProviderType = 'paypal' | 'paystack';
type DonationFrequency = 'one-time' | 'monthly' | 'quarterly' | 'annually';

interface DonationContextType {
  programId: string;
  amount: number;
  currentModal: string;  // Updated type
  startDonation: (type: string, amount: number) => void;
  setCurrentModal: (modal: string) => void;  // Updated type
  donationAmount: number;
  setDonationAmount: (amount: number) => void;
  coverFees: boolean;
  setCoverFees: (cover: boolean) => void;
  teamSupportAmount: number;
  setTeamSupportAmount: (amount: number) => void;
  programName: string;
  setProgramName: (name: string) => void;
  resetDonation: () => void;
  paymentStatus: 'idle' | 'processing' | 'success' | 'error';
  setPaymentStatus: (status: 'idle' | 'processing' | 'success' | 'error') => void;
  paymentError: string | null;
  setPaymentError: (error: string | null) => void;
  paymentOrderId: string | null;
  setPaymentOrderId: (orderId: string | null) => void;
  goToNextStep: (current: string, next: string) => void;
  guestData: GuestData | null;
  setGuestData: (data: GuestData | null) => void;
  currency: CurrencyType;
  setCurrency: (currency: CurrencyType) => void;
  paymentProvider: PaymentProviderType;
  formatAmount: (amount: number) => string;
  convertAmount: (amount: number, targetCurrency: CurrencyType) => number; // Add this new function to the context
  donationFrequency: DonationFrequency;
  setDonationFrequency: (frequency: DonationFrequency) => void;
}

// Create context with default values
const DonationContext = createContext<DonationContextType>({
  programId: '',
  amount: 0,
  currentModal: '',
  startDonation: () => {}, // Empty function as placeholder
  setCurrentModal: () => {},
  donationAmount: 0,
  setDonationAmount: () => {},
  coverFees: false,
  setCoverFees: () => {},
  teamSupportAmount: 0,
  setTeamSupportAmount: () => {},
  programName: '',
  setProgramName: () => {},
  resetDonation: () => {},
  paymentStatus: 'idle',
  setPaymentStatus: () => {},
  paymentError: null,
  setPaymentError: () => {},
  paymentOrderId: null,
  setPaymentOrderId: () => {},
  goToNextStep: () => {},
  guestData: null,
  setGuestData: () => {},
  currency: 'USD',
  setCurrency: () => {},
  paymentProvider: 'paypal',
  formatAmount: () => '',
  convertAmount: () => 0, // Add this new function to the context
  donationFrequency: 'one-time',
  setDonationFrequency: () => {}
});

// Hook for consuming the context
export const useDonation = () => {
  const context = useContext(DonationContext);
  if (context === undefined) {
    throw new Error('useDonation must be used within a DonationProvider');
  }
  return context;
};

interface DonationProviderProps {
  children: ReactNode;
  programId: string;
}

// Provider component
export const DonationProvider = ({ children, programId }: DonationProviderProps) => {
  const [amount, setAmount] = useState(0);
  const [donationType, setDonationType] = useState('');
  const [currentModal, setCurrentModal] = useState<string>('');
  const [donationAmount, setDonationAmount] = useState(0);
  const [coverFees, setCoverFees] = useState(false);
  const [teamSupportAmount, setTeamSupportAmount] = useState(0);
  const [programName, setProgramName] = useState('');
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [paymentOrderId, setPaymentOrderId] = useState<string | null>(null);
  const [guestData, setGuestData] = useState<GuestData | null>(null);
  const [currency, setCurrency] = useState<CurrencyType>(() => {
    // Check if we're in the browser environment
    if (typeof window !== 'undefined') {
      const savedCurrency = localStorage.getItem(CURRENCY_STORAGE_KEY);
      // Only accept valid values
      if (savedCurrency === 'USD' || savedCurrency === 'NGN') {
        return savedCurrency as CurrencyType;
      }
    }
    // Default to USD if no valid saved preference
    return 'USD';
  });
  
  const [paymentProvider, setPaymentProvider] = useState<PaymentProviderType>(() => {
    // Initialize payment provider based on the initial currency
    if (typeof window !== 'undefined') {
      const savedCurrency = localStorage.getItem(CURRENCY_STORAGE_KEY);
      if (savedCurrency === 'NGN') return 'paystack';
    }
    return 'paypal';
  });

  const [donationFrequency, setDonationFrequency] = useState<DonationFrequency>('one-time');

  // First, let's check what properties are actually available in your auth context
  const auth = useAuth();
  console.log("Auth context values:", auth); // This will help identify the correct property name

  // Then, use the correct property name
  // For example, if your auth context uses 'currentUser' instead of 'user':
  const { currentUser } = useAuth();

  const resetDonation = () => {
    setCurrentModal('');
    setDonationAmount(0);
    setCoverFees(false);
    setTeamSupportAmount(0);
    setPaymentStatus('idle');
    setPaymentError(null);
    setPaymentOrderId(null);
    setGuestData(null);
  };

  const goToNextStep = (current: string, next: string) => {
    if (next === 'signIn' && currentUser) { // Use the correct property
      setCurrentModal('paymentMethod');
    } else {
      setCurrentModal(next);
    }
  };

  // Implementation of startDonation
  const startDonation = (type: string, initialAmount: number) => {
    setDonationType(type);
    setAmount(initialAmount);
    setCurrentModal('donationOptions'); // Start the donation flow with the first modal
  };

  // Update payment provider whenever currency changes
  useEffect(() => {
    setPaymentProvider(currency === 'USD' ? 'paypal' : 'paystack');
    
    // Store currency preference in localStorage to persist across sessions
    localStorage.setItem('preferred-currency', currency);
  }, [currency]);
  
  // Load user's preferred currency from localStorage on initial load
  useEffect(() => {
    const savedCurrency = localStorage.getItem('preferred-currency');
    if (savedCurrency === 'USD' || savedCurrency === 'NGN') {
      setCurrency(savedCurrency);
    }
  }, []);
  
  // Helper function to convert amounts between currencies
  const convertAmount = (amount: number, targetCurrency: CurrencyType): number => {
    if (targetCurrency === 'NGN') {
      return Math.round(amount * NAIRA_USD_EXCHANGE_RATE);
    } else {
      return amount; // Base currency is USD
    }
  };

  // Helper function to format currency amounts
  const formatAmount = (amount: number): string => {
    if (currency === 'USD') {
      return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    } else {
      // Convert USD amount to Naira before formatting
      const nairaAmount = convertAmount(amount, 'NGN');
      return `₦${nairaAmount.toLocaleString('en-NG')}`;
    }
  };

  // Value to be provided to consumers
  const value = {
    programId,
    amount,
    donationType,
    currentModal,
    startDonation,
    setCurrentModal,
    donationAmount,
    setDonationAmount,
    coverFees,
    setCoverFees,
    teamSupportAmount,
    setTeamSupportAmount,
    programName,
    setProgramName,
    resetDonation,
    paymentStatus,
    setPaymentStatus,
    paymentError,
    setPaymentError,
    paymentOrderId,
    setPaymentOrderId,
    goToNextStep,
    guestData,
    setGuestData,
    currency,
    setCurrency,
    paymentProvider,
    formatAmount,
    convertAmount, // Add this new function to the context
    donationFrequency,
    setDonationFrequency
  };

  return (
    <DonationContext.Provider value={value}>
      <PayPalScriptProvider options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "your_sandbox_client_id",
        currency: "USD",
        intent: "capture",
      }}>
        {children}
      </PayPalScriptProvider>
    </DonationContext.Provider>
  );
};