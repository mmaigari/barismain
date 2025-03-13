import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Book, CreditCard, Calendar, Briefcase, Gift, Heart, Users, DollarSign, ChevronRight, X, Check } from 'lucide-react';
import Link from 'next/link';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  donationType: "one-time" | "monthly";
}

interface DonorInfoType {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
}

const DonationModal: React.FC<DonationModalProps> = ({ isOpen, onClose, donationType = "one-time" }) => {
  const [amount, setAmount] = useState<string>("50");
  const [customAmount, setCustomAmount] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal" | "bank">("card");
  const [donorInfo, setDonorInfo] = useState<DonorInfoType>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    postalCode: ""
  });
  const [processingDonation, setProcessingDonation] = useState<boolean>(false);
  const [donationComplete, setDonationComplete] = useState<boolean>(false);

  const handleAmountSelect = (value: string): void => {
    setAmount(value);
    setCustomAmount("");
  };

  const handleCustomAmount = (e: ChangeEvent<HTMLInputElement>): void => {
    setAmount("custom");
    setCustomAmount(e.target.value);
  };

  const handleInfoChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setDonorInfo({
      ...donorInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setProcessingDonation(true);
    
    // Simulate API call to payment processor
    setTimeout(() => {
      setProcessingDonation(false);
      setDonationComplete(true);
    }, 1500);
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">
            {donationType === "monthly" ? "Monthly Donation" : "Make a Donation"}
          </h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>
        
        {donationComplete ? (
          <div className="p-6 text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Thank You for Your Donation!</h3>
            <p className="text-gray-600 mb-6">
              Your {donationType === "monthly" ? "monthly" : "one-time"} donation of ${amount === "custom" ? customAmount : amount} has been processed successfully.
              A receipt has been sent to your email address.
            </p>
            <div className="space-y-3">
              <p className="text-gray-600">Your support helps us make a difference in communities worldwide.</p>
              <button
                onClick={onClose}
                className="px-5 py-2 bg-[#09869a] text-white rounded-md hover:bg-[#09869a]/90 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Donation Amount */}
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-3">Select Amount</h3>
              <div className="grid grid-cols-3 gap-2 mb-3">
                {["25", "50", "100", "250", "500", "1000"].map((value) => (
                  <button
                    type="button"
                    key={value}
                    onClick={() => handleAmountSelect(value)}
                    className={`py-2 border rounded-md ${
                      amount === value 
                        ? "border-[#09869a] bg-[#09869a]/5 text-[#09869a]" 
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    ${value}
                  </button>
                ))}
              </div>
              <div className="flex items-center border rounded-md p-2 focus-within:border-[#09869a]">
                <span className="text-gray-500 mr-2">$</span>
                <input
                  type="number"
                  min="1"
                  value={amount === "custom" ? customAmount : ""}
                  onChange={handleCustomAmount}
                  placeholder="Custom Amount"
                  className="flex-1 outline-none"
                />
              </div>
            </div>
            
            {/* Donation Type */}
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-3">Donation Type</h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className={`py-2 border rounded-md ${
                    donationType === "one-time" 
                      ? "border-[#09869a] bg-[#09869a]/5 text-[#09869a]" 
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  One-time
                </button>
                <button
                  type="button"
                  className={`py-2 border rounded-md ${
                    donationType === "monthly" 
                      ? "border-[#09869a] bg-[#09869a]/5 text-[#09869a]" 
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  Monthly
                </button>
              </div>
            </div>
            
            {/* Payment Method */}
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-3">Payment Method</h3>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`py-2 border rounded-md flex items-center justify-center ${
                    paymentMethod === "card" 
                      ? "border-[#09869a] bg-[#09869a]/5 text-[#09869a]" 
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <CreditCard className="h-4 w-4 mr-2" /> Card
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("paypal")}
                  className={`py-2 border rounded-md ${
                    paymentMethod === "paypal" 
                      ? "border-[#09869a] bg-[#09869a]/5 text-[#09869a]" 
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  PayPal
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("bank")}
                  className={`py-2 border rounded-md ${
                    paymentMethod === "bank" 
                      ? "border-[#09869a] bg-[#09869a]/5 text-[#09869a]" 
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  Bank Transfer
                </button>
              </div>
            </div>
            
            {/* Personal Info */}
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-3">Your Information</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={donorInfo.firstName}
                    onChange={handleInfoChange}
                    className="w-full border border-gray-300 rounded-md p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={donorInfo.lastName}
                    onChange={handleInfoChange}
                    className="w-full border border-gray-300 rounded-md p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={donorInfo.email}
                    onChange={handleInfoChange}
                    className="w-full border border-gray-300 rounded-md p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={donorInfo.phone}
                    onChange={handleInfoChange}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
              </div>
            </div>
            
            {/* Summary */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-800 mb-2">Donation Summary</h3>
              <div className="flex justify-between mb-1">
                <span className="text-gray-600">Amount:</span>
                <span className="font-medium">${amount === "custom" ? customAmount : amount}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-600">Frequency:</span>
                <span className="font-medium">{donationType === "monthly" ? "Monthly" : "One-time"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Method:</span>
                <span className="font-medium">
                  {paymentMethod === "card" ? "Credit/Debit Card" : 
                   paymentMethod === "paypal" ? "PayPal" : "Bank Transfer"}
                </span>
              </div>
            </div>
            
            <div className="pt-4 border-t flex flex-col-reverse sm:flex-row sm:justify-between gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={processingDonation}
                className="px-5 py-2.5 bg-[#FA6418] text-white rounded-md hover:bg-[#FA6418]/90 transition-colors disabled:opacity-70 flex items-center justify-center"
              >
                {processingDonation ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  `Complete ${amount === "custom" ? `$${customAmount}` : `$${amount}`} Donation`
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

const DonationGuide: React.FC = () => {
  // Add state for donation modal
  const [isDonationModalOpen, setIsDonationModalOpen] = useState<boolean>(false);
  const [donationType, setDonationType] = useState<"one-time" | "monthly">("one-time");
  
  // Function to open donation modal
  const openDonationModal = (type: "one-time" | "monthly" = "one-time"): void => {
    setDonationType(type);
    setIsDonationModalOpen(true);
  };

  return (
    <div>
      <div className="flex items-center mb-6">
        <div className="p-3 rounded-full bg-[#09869a]/10 mr-4">
          <Book className="h-8 w-8 text-[#09869a]" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800">Donation Guide</h1>
      </div>
      
      <p className="text-gray-600 mb-8">
        Your support enables us to make a meaningful difference in communities around the world. 
        This guide explains the different ways you can donate, the impact of your contribution, 
        and answers common questions about the donation process.
      </p>
      
      {/* Quick Links Section */}
      <div className="bg-gray-50 rounded-lg p-5 mb-10 border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Link href="#ways-to-donate" className="text-[#09869a] hover:underline flex items-center">
            <CreditCard className="h-4 w-4 mr-2" /> Ways to Donate
          </Link>
          <Link href="#tax-benefits" className="text-[#09869a] hover:underline flex items-center">
            <DollarSign className="h-4 w-4 mr-2" /> Tax Benefits
          </Link>
          <Link href="#regular-giving" className="text-[#09869a] hover:underline flex items-center">
            <Calendar className="h-4 w-4 mr-2" /> Regular Giving
          </Link>
          <Link href="#corporate-donations" className="text-[#09869a] hover:underline flex items-center">
            <Briefcase className="h-4 w-4 mr-2" /> Corporate Donations
          </Link>
          <Link href="#legacy-giving" className="text-[#09869a] hover:underline flex items-center">
            <Gift className="h-4 w-4 mr-2" /> Legacy Giving
          </Link>
          <Link href="#donation-impact" className="text-[#09869a] hover:underline flex items-center">
            <Heart className="h-4 w-4 mr-2" /> Your Impact
          </Link>
        </div>
      </div>
      
      <div className="space-y-10">
        {/* Ways to Donate Section */}
        <section id="ways-to-donate">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <CreditCard className="h-5 w-5 mr-2 text-[#09869a]" /> Ways to Donate
          </h2>
          
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-5 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Online Donations</h3>
              <p className="text-gray-600 mb-3">
                The quickest and easiest way to donate is through our secure online platform. 
                You can make a one-time donation or set up recurring contributions.
              </p>
              <ul className="list-disc ml-6 text-gray-600 space-y-1">
                <li>Credit/Debit Cards: We accept Visa, Mastercard, American Express, and Discover</li>
                <li>PayPal: Quick and secure transactions through your PayPal account</li>
                <li>Bank Transfer: Direct transfers from your bank account</li>
                <li>Digital Wallets: Apple Pay, Google Pay, and other popular digital wallets</li>
              </ul>
              <button
                onClick={() => openDonationModal("one-time")}
                className="mt-4 inline-flex items-center px-4 py-2 bg-[#FA6418] text-white rounded-md hover:bg-[#FA6418]/90 transition-colors"
              >
                Make a Donation
              </button>
            </div>
            
            <div className="bg-white rounded-lg p-5 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Mail/Check Donations</h3>
              <p className="text-gray-600 mb-3">
                If you prefer to donate by mail, you can send a check to our office address.
                Please make checks payable to "Bariş Charity Foundation".
              </p>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-gray-700">
                  <strong>Mailing Address:</strong><br />
                  Bariş Charity Foundation<br />
                  123 Charity Lane, Suite 100<br />
                  Philanthropy City, PC 12345<br />
                  United States
                </p>
              </div>
              <p className="text-gray-600 mt-3">
                Please include your contact information so we can provide you with a tax receipt.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-5 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Phone Donations</h3>
              <p className="text-gray-600 mb-3">
                You can make a donation by calling our donor services team during business hours:
              </p>
              <p className="text-[#09869a] text-lg font-medium">
                +1 (555) 123-4567
              </p>
              <p className="text-gray-500 text-sm">
                Monday - Friday: 9:00 AM - 5:00 PM EST
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-5 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Cryptocurrency</h3>
              <p className="text-gray-600 mb-3">
                We accept donations in major cryptocurrencies including Bitcoin, Ethereum, and others.
                Cryptocurrency donations may offer significant tax advantages.
              </p>
              <Link
                href="/donate/crypto"
                className="text-[#09869a] hover:underline"
              >
                View our cryptocurrency donation address →
              </Link>
            </div>
          </div>
        </section>
        
        {/* Tax Benefits Section */}
        <section id="tax-benefits">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <DollarSign className="h-5 w-5 mr-2 text-[#09869a]" /> Tax Benefits
          </h2>
          
          <div className="bg-white rounded-lg p-5 border border-gray-200">
            <p className="text-gray-600 mb-4">
              Bariş Charity Foundation is a registered 501(c)(3) nonprofit organization. Donations to Bariş Charity Foundation
              are tax-deductible to the fullest extent allowable by law in the United States and many other countries.
            </p>
            <div className="bg-yellow-50 p-4 rounded-md border border-yellow-100 mb-4">
              <h3 className="font-bold text-gray-800 mb-1">Important Tax Information:</h3>
              <ul className="list-disc ml-6 text-gray-700 space-y-1">
                <li>You'll receive a tax receipt for all donations over $10</li>
                <li>Tax receipts are sent via email immediately for online donations</li>
                <li>For check donations, receipts are mailed within 2-3 weeks</li>
                <li>Year-end tax summaries are provided in January for the previous year's donations</li>
              </ul>
            </div>
            <p className="text-gray-600">
              Please consult with your tax advisor regarding specific tax benefits available in your country or region.
              For questions about tax receipts, please contact our donor services team at 
              donations@barischarityfoundation.org.
            </p>
          </div>
        </section>
        
        {/* Regular Giving Section */}
        <section id="regular-giving">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-[#09869a]" /> Regular Giving
          </h2>
          
          <div className="bg-white rounded-lg p-5 border border-gray-200">
            <p className="text-gray-600 mb-4">
              Becoming a regular donor helps us plan more effectively and ensures sustainable funding for our programs.
              You can choose to give monthly, quarterly, or annually.
            </p>
            
            <h3 className="text-lg font-bold text-gray-800 mb-2">Benefits of Regular Giving:</h3>
            <ul className="list-disc ml-6 text-gray-600 space-y-2 mb-4">
              <li><strong>Convenience:</strong> Set up once and your donations are processed automatically</li>
              <li><strong>Budget-friendly:</strong> Spread your support throughout the year</li>
              <li><strong>Greater impact:</strong> Regular donations allow us to commit to long-term projects</li>
              <li><strong>Reduced costs:</strong> Lower administrative costs mean more of your donation goes directly to our programs</li>
              <li><strong>Exclusive updates:</strong> Regular donors receive special impact reports and project updates</li>
            </ul>
            
            <p className="text-gray-600 mb-4">
              You can cancel or modify your recurring donation at any time through your online account or by contacting our donor services team.
            </p>
            
            <button
              onClick={() => openDonationModal("monthly")}
              className="inline-flex items-center px-4 py-2 bg-[#09869a] text-white rounded-md hover:bg-[#09869a]/90 transition-colors"
            >
              Become a Monthly Donor
            </button>
          </div>
        </section>
        
        {/* Corporate Donations Section */}
        <section id="corporate-donations">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <Briefcase className="h-5 w-5 mr-2 text-[#09869a]" /> Corporate Donations
          </h2>
          
          <div className="bg-white rounded-lg p-5 border border-gray-200">
            <p className="text-gray-600 mb-4">
              We partner with businesses of all sizes to create meaningful corporate social responsibility programs
              that align with your company's values and objectives.
            </p>
            
            <h3 className="text-lg font-bold text-gray-800 mb-2">Corporate Partnership Options:</h3>
            <ul className="list-disc ml-6 text-gray-600 space-y-2 mb-4">
              <li><strong>Corporate Giving:</strong> Direct financial contributions to our general fund or specific programs</li>
              <li><strong>Matched Giving:</strong> Match your employees' donations to amplify their impact</li>
              <li><strong>Cause Marketing:</strong> Partner with us on campaigns where a portion of product sales supports our work</li>
              <li><strong>Event Sponsorship:</strong> Support our fundraising events and increase your brand visibility</li>
              <li><strong>In-kind Donations:</strong> Contribute products, services, or expertise</li>
            </ul>
            
            <p className="text-gray-600 mb-4">
              Our corporate partnership team will work with you to develop a customized approach that meets your
              company's specific goals and provides meaningful impact metrics.
            </p>
            
            <Link
              href="/partners/corporate"
              className="inline-flex items-center px-4 py-2 bg-[#09869a] text-white rounded-md hover:bg-[#09869a]/90 transition-colors"
            >
              Corporate Partnership Inquiries
            </Link>
          </div>
        </section>
        
        {/* Legacy Giving Section */}
        <section id="legacy-giving">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <Gift className="h-5 w-5 mr-2 text-[#09869a]" /> Legacy Giving
          </h2>
          
          <div className="bg-white rounded-lg p-5 border border-gray-200">
            <p className="text-gray-600 mb-4">
              Create a lasting legacy by including Bariş Charity Foundation in your will or estate plans.
              Your bequest will ensure that your commitment to our mission continues for generations to come.
            </p>
            
            <h3 className="text-lg font-bold text-gray-800 mb-2">Legacy Giving Options:</h3>
            <ul className="list-disc ml-6 text-gray-600 space-y-2 mb-4">
              <li><strong>Bequest:</strong> Include a gift to Bariş Charity Foundation in your will or living trust</li>
              <li><strong>Charitable Remainder Trust:</strong> Provide income for yourself or loved ones while supporting our work</li>
              <li><strong>Charitable Lead Trust:</strong> Support Bariş Charity Foundation now while passing assets to your heirs later</li>
              <li><strong>Life Insurance:</strong> Name Bariş Charity Foundation as a beneficiary of your life insurance policy</li>
              <li><strong>Retirement Plans:</strong> Designate Bariş Charity Foundation as a beneficiary of your retirement account</li>
            </ul>
            
            <div className="bg-gray-50 p-4 rounded-md mb-4">
              <p className="text-gray-700 italic">
                "I've included Bariş Charity Foundation in my estate planning because I want my life's work to continue making a difference
                long after I'm gone. It gives me peace of mind knowing that my legacy will help create a better future
                for communities in need." — Maria Johnson, Legacy Donor
              </p>
            </div>
            
            <p className="text-gray-600 mb-4">
              We recommend consulting with your financial advisor or estate planning attorney to determine the best
              legacy giving option for your situation. For confidential discussions about legacy giving, please contact
              our planned giving team.
            </p>
            
            <Link
              href="/donate/legacy"
              className="inline-flex items-center px-4 py-2 bg-[#09869a] text-white rounded-md hover:bg-[#09869a]/90 transition-colors"
            >
              Legacy Giving Information
            </Link>
          </div>
        </section>
        
        {/* Donation Impact Section */}
        <section id="donation-impact">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <Heart className="h-5 w-5 mr-2 text-[#09869a]" /> Your Impact
          </h2>
          
          <div className="bg-white rounded-lg p-5 border border-gray-200">
            <p className="text-gray-600 mb-4">
              Your generosity directly transforms lives and communities. Here's how your donations make a difference:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-[#09869a]/5 p-4 rounded-lg">
                <h3 className="font-bold text-[#09869a] text-lg mb-2">$25</h3>
                <p className="text-gray-700">Provides emergency food supplies for a family of four for one week</p>
              </div>
              <div className="bg-[#FA6418]/5 p-4 rounded-lg">
                <h3 className="font-bold text-[#FA6418] text-lg mb-2">$50</h3>
                <p className="text-gray-700">Supplies educational materials for 10 children for a school term</p>
              </div>
              <div className="bg-[#09869a]/5 p-4 rounded-lg">
                <h3 className="font-bold text-[#09869a] text-lg mb-2">$100</h3>
                <p className="text-gray-700">Provides clean water access for a community of 50 people for one month</p>
              </div>
              <div className="bg-[#FA6418]/5 p-4 rounded-lg">
                <h3 className="font-bold text-[#FA6418] text-lg mb-2">$250</h3>
                <p className="text-gray-700">Funds vocational training for one unemployed youth</p>
              </div>
              <div className="bg-[#09869a]/5 p-4 rounded-lg">
                <h3 className="font-bold text-[#09869a] text-lg mb-2">$500</h3>
                <p className="text-gray-700">Equips a rural health clinic with essential medical supplies</p>
              </div>
              <div className="bg-[#FA6418]/5 p-4 rounded-lg">
                <h3 className="font-bold text-[#FA6418] text-lg mb-2">$1,000</h3>
                <p className="text-gray-700">Builds sustainable farming infrastructure for a village</p>
              </div>
            </div>
            
            <p className="text-gray-600 mb-4">
              We're committed to transparency and accountability. Every donation is carefully managed to maximize impact
              while minimizing administrative costs. Detailed financial reports are available in our annual reports.
            </p>
            
            <Link
              href="/impact"
              className="inline-flex items-center px-4 py-2 bg-[#09869a] text-white rounded-md hover:bg-[#09869a]/90 transition-colors"
            >
              See Our Impact Stories
            </Link>
          </div>
        </section>
        
        {/* Additional Resources */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <Users className="h-5 w-5 mr-2 text-[#09869a]" /> Additional Resources
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-5 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Frequently Asked Questions</h3>
              <p className="text-gray-600 mb-3">
                Find answers to common questions about donations, tax receipts, and how your support is used.
              </p>
              <Link
                href="/help/faqs"
                className="text-[#09869a] hover:underline inline-flex items-center"
              >
                View FAQs <ChevronRight className="ml-1 w-4 h-4" />
              </Link>
            </div>
            
            <div className="bg-white rounded-lg p-5 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Contact Donor Services</h3>
              <p className="text-gray-600 mb-3">
                Our donor services team is available to answer any questions about donations and provide assistance.
              </p>
              <Link
                href="/help/contact"
                className="text-[#09869a] hover:underline inline-flex items-center"
              >
                Contact Us <ChevronRight className="ml-1 w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </div>
      
      {/* Call to Action */}
      <div className="mt-12 p-6 bg-[#09869a]/5 rounded-lg border border-[#09869a]/10">
        <h3 className="text-xl font-bold text-gray-800 mb-3">Ready to Make a Difference?</h3>
        <p className="text-gray-600 mb-4">
          Your support, no matter the size, helps us create lasting change in communities around the world.
          Together, we can build a more equitable and sustainable future.
        </p>
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={() => openDonationModal("one-time")}
            className="inline-flex items-center px-5 py-2.5 bg-[#FA6418] text-white rounded-md hover:bg-[#FA6418]/90 transition-colors font-medium"
          >
            Donate Now
          </button>
          <button 
            onClick={() => openDonationModal("monthly")}
            className="inline-flex items-center px-5 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium"
          >
            Become a Monthly Donor
          </button>
        </div>
      </div>
      
      {/* Add the Donation Modal */}
      <DonationModal 
        isOpen={isDonationModalOpen}
        onClose={() => setIsDonationModalOpen(false)}
        donationType={donationType}
      />
    </div>
  );
};

export default DonationGuide;