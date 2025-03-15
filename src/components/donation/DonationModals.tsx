"use client"

import React from 'react';
import { useDonation } from '@/contexts/DonationContext';
import DonationOptionsModal from './modals/DonationOptionsModal';
import PaymentFeesModal from './modals/PaymentFeesModal';
import TeamSupportModal from './modals/TeamSupportModal';
import PaymentMethodModal from './modals/PaymentMethodModal';
import GuestContinueModal from './modals/GuestContinueModal';
import ConfirmationModal from './modals/ConfirmationModal';
// Change this import
import AuthModal from '../auth/AuthModal';
import RecurringDonationModal from './modals/RecurringDonationModal';
import PaystackSubscriptionModal from './modals/PaystackSubscriptionModal';

const DonationModals: React.FC = () => {
  const { currentModal, setCurrentModal } = useDonation();

  return (
    <>
      {currentModal === 'donationOptions' && <DonationOptionsModal />}
      {currentModal === 'recurringDonation' && <RecurringDonationModal />}
      {currentModal === 'paymentFees' && <PaymentFeesModal />}
      {currentModal === 'teamSupport' && <TeamSupportModal />}
      {/* Change this line to use AuthModal with required props */}
      {currentModal === 'signIn' && <AuthModal isOpen={true} onClose={() => setCurrentModal('')} />}
      {currentModal === 'guestContinue' && <GuestContinueModal />}
      {currentModal === 'paymentMethod' && <PaymentMethodModal />}
      {currentModal === 'paystackSubscription' && <PaystackSubscriptionModal />}
      {currentModal === 'confirmation' && <ConfirmationModal />}
    </>
  );
};

export default DonationModals;