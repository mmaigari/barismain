"use client"

import React from 'react';
import { useDonation } from '@/contexts/DonationContext';
import DonationOptionsModal from './modals/DonationOptionsModal';
import PaymentFeesModal from './modals/PaymentFeesModal';
import TeamSupportModal from './modals/TeamSupportModal';
import PaymentMethodModal from './modals/PaymentMethodModal';
import GuestContinueModal from './modals/GuestContinueModal';
import ConfirmationModal from './modals/ConfirmationModal';
import AuthModal from '../auth/AuthModal';
import RecurringDonationModal from './modals/RecurringDonationModal';
import PaystackSubscriptionModal from './modals/PaystackSubscriptionModal';

const DonationModals: React.FC = () => {
  const { currentModal, setCurrentModal } = useDonation();

  // Handle successful authentication
  const handleAuthSuccess = () => {
    // Go directly to payment method when authenticated
    setCurrentModal('paymentMethod');
  };

  // Handle auth modal closing
  const handleAuthClose = () => {
    // When the auth modal is closed without authentication,
    // go to the guest continue modal
    setCurrentModal('guestContinue');
  };

  return (
    <>
      {currentModal === 'donationOptions' && <DonationOptionsModal />}
      {currentModal === 'recurringDonation' && <RecurringDonationModal />}
      {currentModal === 'paymentFees' && <PaymentFeesModal />}
      {currentModal === 'teamSupport' && <TeamSupportModal />}
      
      {currentModal === 'signIn' && (
        <AuthModal 
          isOpen={true} 
          onClose={handleAuthClose}
          onSuccessfulAuth={handleAuthSuccess} 
        />
      )}
      
      {currentModal === 'guestContinue' && <GuestContinueModal />}
      {currentModal === 'paymentMethod' && <PaymentMethodModal />}
      {currentModal === 'paystackSubscription' && <PaystackSubscriptionModal />}
      {currentModal === 'confirmation' && <ConfirmationModal />}
    </>
  );
};

export default DonationModals;