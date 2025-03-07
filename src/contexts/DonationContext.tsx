"use client"

import React, { createContext, useContext, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

type GuestData = {
  name: string;
  email: string;
  phone?: string; // Add the phone field as optional
};

type DonationContextType = {
  currentModal: string;
  setCurrentModal: (modal: string) => void;
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
};

const DonationContext = createContext<DonationContextType | undefined>(undefined);

export const DonationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentModal, setCurrentModal] = useState('');
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

  return (
    <DonationContext.Provider
      value={{
        currentModal,
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
      }}
    >
      {children}
    </DonationContext.Provider>
  );
};

export const useDonation = () => {
  const context = useContext(DonationContext);
  if (context === undefined) {
    throw new Error('useDonation must be used within a DonationProvider');
  }
  return context;
};