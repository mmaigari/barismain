"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

type GuestData = {
  name: string;
  email: string;
  phone?: string; // Add the phone field as optional
};

type ModalType = null | 'donationOptions' | 'quantityOptions' | 'paymentFees' | 'teamSupport' | 'signIn' | 'guestContinue' | 'paymentMethod' | 'confirmation';

interface DonationContextType {
  programId: string;
  amount: number;
  currentModal: string | null;  // Keeping only one declaration with the more flexible type
  startDonation: (type: string, amount: number) => void;
  setCurrentModal: (modal: string | null) => void;  // Keeping only one declaration with the more flexible type
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
}

// Create context with default values
const DonationContext = createContext<DonationContextType>({
  programId: '',
  amount: 0,
  currentModal: null,
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
  setGuestData: () => {}
});

// Hook for consuming the context
export const useDonation = () => useContext(DonationContext);

interface DonationProviderProps {
  children: ReactNode;
  programId: string;
}

// Provider component
export const DonationProvider = ({ children, programId }: DonationProviderProps) => {
  const [amount, setAmount] = useState(0);
  const [donationType, setDonationType] = useState('');
  const [currentModal, setCurrentModal] = useState<string | null>(null);
  const [donationAmount, setDonationAmount] = useState(0);
  const [coverFees, setCoverFees] = useState(false);
  const [teamSupportAmount, setTeamSupportAmount] = useState(0);
  const [programName, setProgramName] = useState('');
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [paymentOrderId, setPaymentOrderId] = useState<string | null>(null);
  const [guestData, setGuestData] = useState<GuestData | null>(null);

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
    setGuestData
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