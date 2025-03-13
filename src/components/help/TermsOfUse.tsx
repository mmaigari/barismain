import React from 'react';
import { FileText } from 'lucide-react';

const TermsOfUse = () => {
  return (
    <div>
      <div className="flex items-center mb-6">
        <div className="p-3 rounded-full bg-[#09869a]/10 mr-4">
          <FileText className="h-8 w-8 text-[#09869a]" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800">Terms of Use</h1>
      </div>
      
      <p className="text-gray-600 mb-6">
        Please read these terms carefully before using our website and services. By accessing or using Bariş Charity Foundation's website and services, you agree to be bound by these terms.
      </p>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">1. Introduction</h2>
          <p className="text-gray-600 mb-3">
            Welcome to Bariş Charity Foundation ("Bariş Charity Foundation", "we", "us", or "our"). These Terms of Use govern your access to and use of our website, mobile applications, and services.
          </p>
          <p className="text-gray-600">
            By accessing or using our services, you agree to be bound by these Terms of Use and our Privacy Policy. If you do not agree to these terms, please do not use our services.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">2. User Accounts</h2>
          <p className="text-gray-600 mb-3">
            When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.
          </p>
          <p className="text-gray-600 mb-3">
            You are responsible for safeguarding the password that you use to access our services and for any activities or actions under your password.
          </p>
          <p className="text-gray-600">
            You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">3. Donations and Payments</h2>
          <p className="text-gray-600 mb-3">
            All donations made through our platform are final and non-refundable. However, if you believe a transaction was made in error, please contact us immediately.
          </p>
          <p className="text-gray-600 mb-3">
            We use third-party payment processors to facilitate donations. Your use of these services is subject to the terms and conditions of those third-party providers.
          </p>
          <p className="text-gray-600">
            We will make every effort to ensure that donations are directed to the causes specified by donors, but reserve the right to redirect funds if necessary due to changing circumstances or needs in the field.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">4. Intellectual Property</h2>
          <p className="text-gray-600 mb-3">
            The content on our website, including text, graphics, logos, images, and software, is the property of Bariş Charity Foundation and is protected by copyright and other intellectual property laws.
          </p>
          <p className="text-gray-600">
            You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of our materials without our express written consent.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">5. Limitation of Liability</h2>
          <p className="text-gray-600 mb-3">
            Bariş Charity Foundation shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our services.
          </p>
          <p className="text-gray-600">
            We do not guarantee that our services will be error-free or uninterrupted, or that any defects will be corrected.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">6. Governing Law</h2>
          <p className="text-gray-600 mb-3">
            These Terms shall be governed by the laws of the jurisdiction in which Bariş Charity Foundation is registered, without regard to its conflict of law provisions.
          </p>
          <p className="text-gray-600">
            Any disputes arising under these Terms will be resolved in the courts of that jurisdiction.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">7. Changes to Terms</h2>
          <p className="text-gray-600 mb-3">
            We reserve the right to modify or replace these Terms at any time. It is your responsibility to review these Terms periodically for changes.
          </p>
          <p className="text-gray-600">
            Your continued use of our services following the posting of any changes constitutes acceptance of those changes.
          </p>
        </section>
      </div>
      
      <div className="mt-8 pt-6 border-t border-gray-200">
        <p className="text-gray-600 mb-2">Last updated: March 1, 2025</p>
        <p className="text-gray-600">
          If you have any questions about these Terms, please contact us at <a href="mailto:legal@barischarityfoundation.org" className="text-[#09869a] hover:underline">legal@barischarityfoundation.org</a>.
        </p>
      </div>
    </div>
  );
};

export default TermsOfUse;