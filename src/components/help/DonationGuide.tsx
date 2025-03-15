import React from 'react';
import { Book, CreditCard, Calendar, Briefcase, Gift, Heart, Users, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useDonation } from '@/contexts/DonationContext';

const DonationGuide: React.FC = () => {
  // Use the real donation context instead of local state
  const { 
    setCurrentModal, 
    setProgramName,
    setDonationAmount,
    setDonationFrequency
  } = useDonation();
  
  // Function to start a one-time donation
  const handleOneTimeDonation = () => {
    setProgramName('General Support');
    setDonationFrequency('one-time');
    setCurrentModal('donationOptions');
  };

  // Function to start a recurring donation
  const handleRecurringDonation = () => {
    setProgramName('Monthly Support');
    setDonationFrequency('monthly');
    setDonationAmount(25); // Default starting amount
    setCurrentModal('recurringDonation');
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
          <Link href="#regular-giving" className="text-[#09869a] hover:underline flex items-center">
            <Calendar className="h-4 w-4 mr-2" /> Regular Giving
          </Link>
          <Link href="#corporate-donations" className="text-[#09869a] hover:underline flex items-center">
            <Briefcase className="h-4 w-4 mr-2" /> Corporate Donations
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
              {/* Connect to real donation flow */}
              <button
                onClick={handleOneTimeDonation}
                className="mt-4 inline-flex items-center px-4 py-2 bg-[#FA6418] text-white rounded-md hover:bg-[#FA6418]/90 transition-colors"
              >
                Make a Donation
              </button>
            </div>
            
            {/* Rest of the existing sections */}
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
                  No. 22, Gidan Baba Dan masani, <br />
                  Unity Road, Kano, Kano State<br />
                  Nigeria
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
                +234 902 155 1584
              </p>
              <p className="text-gray-500 text-sm">
                Monday - Friday: 9:00 AM - 5:00 PM EST
              </p>
            </div>
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
            
            {/* Connect to real recurring donation flow */}
            <button
              onClick={handleRecurringDonation}
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
              href="/help/contact"
              className="inline-flex items-center px-4 py-2 bg-[#09869a] text-white rounded-md hover:bg-[#09869a]/90 transition-colors"
            >
              Corporate Partnership Inquiries
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
          {/* Connect these buttons to real donation flow */}
          <button 
            onClick={handleOneTimeDonation}
            className="inline-flex items-center px-5 py-2.5 bg-[#FA6418] text-white rounded-md hover:bg-[#FA6418]/90 transition-colors font-medium"
          >
            Donate Now
          </button>
          <button 
            onClick={handleRecurringDonation}
            className="inline-flex items-center px-5 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium"
          >
            Become a Monthly Donor
          </button>
        </div>
      </div>
      
      {/* Remove the dummy DonationModal entirely */}
    </div>
  );
};

export default DonationGuide;