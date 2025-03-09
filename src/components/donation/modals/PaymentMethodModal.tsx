"use client";

import React, { useEffect, useState } from 'react';
import { X, CreditCard, Check } from 'lucide-react';
import { useDonation } from '@/contexts/DonationContext';
import { PayPalButtons } from "@paypal/react-paypal-js";
import toast from 'react-hot-toast';

export default function PaymentMethodModal() {
  const { 
    setCurrentModal, 
    donationAmount, 
    programName, 
    setPaymentStatus,
    setPaymentError,
    setPaymentOrderId
  } = useDonation();

  const [loading, setLoading] = useState(false);
  
  // Get stored values
  const isRecurring = localStorage.getItem("isRecurring") === "true";
  const totalAmount = localStorage.getItem("totalAmount") || donationAmount.toString();
  const quantity = localStorage.getItem("quantity") || "1";
  const unitLabel = localStorage.getItem("unitLabel") || "items";
  
  const createOrder = async (data: any, actions: any) => {
    return actions.order.create({
      purchase_units: [
        {
          description: `Donation for ${programName}`,
          amount: {
            value: parseFloat(totalAmount).toFixed(2),
            currency_code: "USD"
          }
        }
      ],
      application_context: {
        shipping_preference: "NO_SHIPPING"
      }
    });
  };
  
  const onApprove = async (data: any, actions: any) => {
    setLoading(true);
    try {
      const details = await actions.order.capture();
      setPaymentStatus('success');
      setPaymentOrderId(details.id);
      
      // Here you would typically also save the transaction to your database
      
      toast.success('Payment successful!');
      setCurrentModal('confirmation');
    } catch (error) {
      console.error("Payment error:", error);
      setPaymentStatus('error');
      setPaymentError('There was an issue processing your payment. Please try again.');
      toast.error('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const onError = (err: any) => {
    console.error("PayPal error:", err);
    setPaymentStatus('error');
    setPaymentError('There was an issue connecting to PayPal. Please try again.');
    toast.error('Payment service error. Please try again later.');
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Payment Method</h2>
          <button 
            onClick={() => setCurrentModal('')}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Donation Summary</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Program:</span>
                <span className="font-medium text-gray-900">{programName}</span>
              </div>
              
              {quantity && parseInt(quantity) > 1 && (
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Quantity:</span>
                  <span className="font-medium text-gray-900">
                    {quantity} {parseInt(quantity) === 1 ? unitLabel.replace(/s$/, '') : unitLabel}
                  </span>
                </div>
              )}
              
              <div className="flex justify-between font-semibold text-lg mt-2 border-t border-gray-200 pt-2">
                <span className="text-gray-700">Total{isRecurring ? ' monthly' : ''} amount:</span>
                <span className="text-[#09869a]">${parseFloat(totalAmount).toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Select Payment Method</h3>
            
            {/* PayPal Payment Button */}
            <div className="mb-4">
              <PayPalButtons
                createOrder={createOrder}
                onApprove={onApprove}
                onError={onError}
                style={{ layout: "vertical", shape: "rect" }}
                disabled={loading}
              />
            </div>
            
            {/* Credit card payment option - for future implementation */}
            <div className="mt-4">
              <button
                onClick={() => {
                  // Placeholder for credit card implementation
                  // For now, let's just show a toast message
                  toast.success('Credit card payment will be available soon!');
                  // Eventually this would open a credit card form or go to another page
                  // setCurrentModal('cardDetails');
                }}
                className="w-full bg-gray-100 hover:bg-gray-200 p-4 rounded-md flex items-center justify-center transition-colors"
                disabled={loading}
              >
                <CreditCard className="w-5 h-5 mr-2" />
                <span className="font-medium">Pay with Credit Card</span>
              </button>
            </div>
          </div>
          
          <div className="text-sm text-gray-500">
            <p className="flex items-start">
              <Check className="w-4 h-4 mr-1 text-green-500 flex-shrink-0 mt-0.5" />
              Your payment information is processed securely
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}