"use client"

import React from 'react';
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useDonation } from '@/contexts/DonationContext';

interface PayPalButtonProps {
  amount: number;
  onSuccess: () => void;
}

const PayPalButton: React.FC<PayPalButtonProps> = ({ amount, onSuccess }) => {
  const { setPaymentStatus, setPaymentError, setPaymentOrderId, programName } = useDonation();

  const createOrder = async () => {
    try {
      setPaymentStatus('processing');
      
      const response = await fetch('/api/payments/paypal/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount.toString(),
          description: `Donation to ${programName}`,
        }),
      });

      const orderData = await response.json();
      
      if (orderData.id) {
        setPaymentOrderId(orderData.id);
        return orderData.id;
      } else {
        throw new Error('Failed to create order');
      }
    } catch (error) {
      console.error('Error creating PayPal order:', error);
      setPaymentStatus('error');
      setPaymentError('Failed to create payment. Please try again.');
      throw error;
    }
  };

  const onApprove = async (data: any) => {
    try {
      const { orderID } = data;
      
      const response = await fetch('/api/payments/paypal/capture', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderID,
        }),
      });

      const captureData = await response.json();
      
      if (captureData.success) {
        setPaymentStatus('success');
        onSuccess();
      } else {
        throw new Error('Failed to capture payment');
      }
    } catch (error) {
      console.error('Error capturing PayPal payment:', error);
      setPaymentStatus('error');
      setPaymentError('Failed to process payment. Please try again.');
    }
  };

  const onError = (error: any) => {
    console.error('PayPal error:', error);
    setPaymentStatus('error');
    setPaymentError('There was an error processing your payment with PayPal. Please try again.');
  };

  return (
    <PayPalButtons
      style={{ layout: "vertical", shape: "pill" }}
      createOrder={createOrder}
      onApprove={onApprove}
      onError={onError}
    />
  );
};

export default PayPalButton;