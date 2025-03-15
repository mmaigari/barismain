"use client"

import { useEffect } from 'react';
import { useDonation } from '@/contexts/DonationContext';

export const CurrencyInitializer = () => {
  const { currency, setCurrency } = useDonation();
  
  // On mount, sync with localStorage
  useEffect(() => {
    const CURRENCY_STORAGE_KEY = 'bcf-preferred-currency';
    
    // Check localStorage for saved preference
    const savedCurrency = localStorage.getItem(CURRENCY_STORAGE_KEY);
    
    // If there's a valid saved preference different from current state, update it
    if ((savedCurrency === 'USD' || savedCurrency === 'NGN') && savedCurrency !== currency) {
      console.log('Restoring saved currency preference:', savedCurrency);
      setCurrency(savedCurrency as 'USD' | 'NGN');
    }
  }, []);
  
  // This component doesn't render anything
  return null;
};