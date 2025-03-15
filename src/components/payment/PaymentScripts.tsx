"use client"

import { useEffect } from 'react';
import { useDonation } from '@/contexts/DonationContext';
import Script from 'next/script';

const PaymentScripts: React.FC = () => {
  const { paymentProvider } = useDonation();

  return (
    <>
      {/* Load PayPal script conditionally */}
      {paymentProvider === 'paypal' && (
        <Script
          strategy="lazyOnload"
          src={`https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=USD`}
        />
      )}
      
      {/* Load Paystack script conditionally */}
      {paymentProvider === 'paystack' && (
        <Script
          strategy="lazyOnload"
          src="https://js.paystack.co/v1/inline.js"
        />
      )}
    </>
  );
};

export default PaymentScripts;