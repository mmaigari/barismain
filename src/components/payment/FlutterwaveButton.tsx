"use client"

import React from 'react';
import { useFlutterwave } from 'flutterwave-react-v3';
import { useDonation } from '@/contexts/DonationContext';

// Update your props interface to include phone
interface FlutterwaveButtonProps {
  amount: number;
  onSuccess: () => void;
  email?: string;
  name?: string;
  phone?: string;  // Add this new prop
}

const FlutterwaveButton: React.FC<FlutterwaveButtonProps> = ({ 
  amount, 
  onSuccess,
  email = "",
  name = "",
  phone = "",  // Add default value
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
      phone_number: phone || "0000000000",  // Add this required field
    },
    customizations: {
      title: "Donate to " + programName,
      description: `Donation to ${programName}`,
      logo: "https://your-logo-url.png", // Add your logo URL here
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
        
        handleFlutterPayment.close(); // Use the close method from handleFlutterPayment
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