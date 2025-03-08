"use client"

import React from 'react';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { useDonation } from '@/contexts/DonationContext';

interface FlutterwaveButtonProps {
  amount: number;
  onSuccess: () => void;
  email?: string;
  name?: string;
  phone?: string;
}

const FlutterwaveButton: React.FC<FlutterwaveButtonProps> = ({ 
  amount, 
  onSuccess,
  email = "",
  name = "",
  phone = "",
}) => {
  const { programName, setPaymentStatus, setPaymentError } = useDonation();

  const config = {
    public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY || "",
    tx_ref: Date.now().toString(),
    amount: amount,
    currency: "USD",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: email || "donor@example.com",
      name: name || "Anonymous Donor",
      phonenumber: phone || "0000000000", // Changed from phone_number to phonenumber
    },
    customizations: {
      title: "Donate to " + programName,
      description: `Donation to ${programName}`,
      logo: "https://your-logo-url.png",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  const handlePayment = () => {
    setPaymentStatus('processing');
    
    handleFlutterPayment({
      callback: async (response) => {
        console.log(response);
        
        try {
          // Verify the transaction on your server
          const verifyResponse = await fetch('/api/payments/flutterwave/verify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              transactionId: response.transaction_id,
            }),
          });
          
          const verifyData = await verifyResponse.json();
          
          if (verifyData.success) {
            setPaymentStatus('success');
            onSuccess();
          } else {
            setPaymentStatus('error');
            setPaymentError('Payment verification failed. Please contact support.');
          }
        } catch (error) {
          console.error('Error verifying payment:', error);
          setPaymentStatus('error');
          setPaymentError('An error occurred during payment verification.');
        }
        
        closePaymentModal();
      },
      onClose: () => {
        setPaymentStatus('idle');
      },
    });
  };

  return (
    <button
      onClick={handlePayment}
      className="w-full py-3 text-base font-semibold text-white bg-[#F5A623] rounded-lg hover:bg-[#F5A623]/90"
    >
      Pay with Flutterwave
    </button>
  );
};

export default FlutterwaveButton;