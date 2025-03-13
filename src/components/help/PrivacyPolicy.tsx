import React from 'react';
import { Shield } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div>
      <div className="flex items-center mb-6">
        <div className="p-3 rounded-full bg-[#FA6418]/10 mr-4">
          <Shield className="h-8 w-8 text-[#FA6418]" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800">Privacy Policy</h1>
      </div>
      
      <p className="text-gray-600 mb-6">
        Your privacy is important to us. This Privacy Policy explains how Bariş Charity Foundation collects, uses, and protects your personal information when you use our website and services.
      </p>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">1. Information We Collect</h2>
          <p className="text-gray-600 mb-3">
            We collect information that you provide directly to us, such as when you create an account, make a donation, sign up for our newsletter, or contact us for support.
          </p>
          <p className="text-gray-600 mb-3">
            This may include:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li>Personal information (name, email address, phone number, postal address)</li>
            <li>Payment information (credit card details, billing address)</li>
            <li>Donation history and preferences</li>
            <li>Communications with our team</li>
            <li>Survey responses and feedback</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">2. How We Use Your Information</h2>
          <p className="text-gray-600 mb-3">
            We use the information we collect to:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li>Process donations and complete transactions</li>
            <li>Send receipts and acknowledgments for donations</li>
            <li>Communicate with you about our programs, events, and campaigns</li>
            <li>Respond to your inquiries and provide customer support</li>
            <li>Personalize your experience on our website</li>
            <li>Analyze website usage to improve our services</li>
            <li>Comply with legal obligations and enforce our terms</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">3. Information Sharing and Disclosure</h2>
          <p className="text-gray-600 mb-3">
            We take your privacy seriously and do not sell or rent your personal information to third parties for marketing purposes.
          </p>
          <p className="text-gray-600 mb-3">
            We may share your information with:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li>Service providers who assist us with website operations, payment processing, and email communications</li>
            <li>Partners and other organizations with whom we collaborate on joint programs (with your consent)</li>
            <li>Legal authorities when required by law or to protect our rights and safety</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">4. Data Security</h2>
          <p className="text-gray-600 mb-3">
            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
          </p>
          <p className="text-gray-600 mb-3">
            These security measures include:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li>Encryption of sensitive information during transmission</li>
            <li>Secure storage of personal data</li>
            <li>Regular security assessments and updates</li>
            <li>Limited access to personal information by authorized personnel only</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">5. Your Rights and Choices</h2>
          <p className="text-gray-600 mb-3">
            Depending on your location, you may have certain rights regarding your personal information, including:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li>Accessing, updating, or deleting your personal information</li>
            <li>Objecting to our use of your information</li>
            <li>Withdrawing consent for future processing</li>
            <li>Requesting a copy of your data</li>
            <li>Opting out of marketing communications</li>
          </ul>
          <p className="text-gray-600 mt-3">
            To exercise these rights, please contact us using the information provided at the end of this policy.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">6. Cookies and Tracking Technologies</h2>
          <p className="text-gray-600 mb-3">
            We use cookies and similar technologies to enhance your experience on our website, analyze usage patterns, and personalize content.
          </p>
          <p className="text-gray-600 mb-3">
            You can control cookies through your browser settings, although disabling certain cookies may limit your ability to use some features of our website.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">7. Changes to This Policy</h2>
          <p className="text-gray-600 mb-3">
            We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any significant changes by posting a prominent notice on our website or sending you an email.
          </p>
        </section>
      </div>
      
      <div className="mt-8 pt-6 border-t border-gray-200">
        <p className="text-gray-600 mb-2">Last updated: March 1, 2025</p>
        <p className="text-gray-600 mb-4">
          If you have any questions about this Privacy Policy, please contact our Privacy Officer at:
        </p>
        <p className="text-gray-600">
          Email: <a href="mailto:privacy@barischarityfoundation.org" className="text-[#FA6418] hover:underline">privacy@barischarityfoundation.org</a><br />
          Phone: +1 (555) 123-4567<br />
          Address: 123 Charity Lane, Suite 456, San Francisco, CA 94103
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;