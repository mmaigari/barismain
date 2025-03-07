"use client"

import React, { createContext, useContext, useState } from 'react';

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
};

const DonationContext = createContext<DonationContextType | undefined>(undefined);

export const DonationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentModal, setCurrentModal] = useState('');
  const [donationAmount, setDonationAmount] = useState(0);
  const [coverFees, setCoverFees] = useState(false);
  const [teamSupportAmount, setTeamSupportAmount] = useState(0);
  const [programName, setProgramName] = useState('');

  const resetDonation = () => {
    setCurrentModal('');
    setDonationAmount(0);
    setCoverFees(false);
    setTeamSupportAmount(0);
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