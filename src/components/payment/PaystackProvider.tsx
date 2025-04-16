"use client"

import React from 'react';

interface PaystackProviderProps {
  children: React.ReactNode;
}

const PaystackProvider: React.FC<PaystackProviderProps> = ({ children }) => {
  return (
    <>
      {children}
    </>
  );
};

export default PaystackProvider;