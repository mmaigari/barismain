// Add this logic to your existing SignInModal

// When sign-in is successful
const handleSuccessfulSignIn = () => {
  // Check if we came from the donation flow
  if (previousModal && previousModal.includes('donation')) {
    // Continue with the donation flow by going to payment method
    setCurrentModal('paymentMethod');
  } else {
    // Just close the modal for normal sign-in
    onClose();
  }
};