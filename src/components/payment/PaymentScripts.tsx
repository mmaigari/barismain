"use client"

import { useEffect } from 'react';
import Script from 'next/script';

const PaymentScripts: React.FC = () => {
  return (
    <Script
      strategy="lazyOnload"
      src="https://js.paystack.co/v1/inline.js"
    />
  );
};

export default PaymentScripts;