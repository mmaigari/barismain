import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

const FAQs = () => {
  // State to track which FAQ items are expanded
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    'faq-1': true, // First item expanded by default
  });

  const toggleItem = (id: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  return (
    <div>
      <div className="flex items-center mb-6">
        <div className="p-3 rounded-full bg-[#FA6418]/10 mr-4">
          <HelpCircle className="h-8 w-8 text-[#FA6418]" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800">Frequently Asked Questions</h1>
      </div>
      
      <p className="text-gray-600 mb-6">
        Find answers to the most common questions about our organization, donation process, and programs.
        If you can't find what you're looking for, feel free to contact our support team.
      </p>
      
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Donation FAQs</h2>
        
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-md overflow-hidden">
            <button 
              className="w-full flex items-center justify-between p-4 text-left focus:outline-none"
              onClick={() => toggleItem('faq-1')}
            >
              <h3 className="font-medium text-gray-800">How is my donation used?</h3>
              {expandedItems['faq-1'] ? 
                <ChevronUp className="h-5 w-5 text-[#FA6418]" /> : 
                <ChevronDown className="h-5 w-5 text-gray-400" />
              }
            </button>
            {expandedItems['faq-1'] && (
              <div className="p-4 pt-0 text-gray-600 bg-gray-50">
                <p>Your donation directly supports our humanitarian programs. We allocate funds based on program needs, with a minimum of 85% of all donations going directly to our field operations and beneficiaries. The remaining portion is used for essential administrative costs and fundraising to sustain our mission.</p>
              </div>
            )}
          </div>
          
          <div className="border border-gray-200 rounded-md overflow-hidden">
            <button 
              className="w-full flex items-center justify-between p-4 text-left focus:outline-none"
              onClick={() => toggleItem('faq-2')}
            >
              <h3 className="font-medium text-gray-800">Is my donation tax-deductible?</h3>
              {expandedItems['faq-2'] ? 
                <ChevronUp className="h-5 w-5 text-[#FA6418]" /> : 
                <ChevronDown className="h-5 w-5 text-gray-400" />
              }
            </button>
            {expandedItems['faq-2'] && (
              <div className="p-4 pt-0 text-gray-600 bg-gray-50">
                <p>Yes, Baris Charity Foundation is a registered 501(c)(3) nonprofit organization, and all donations are tax-deductible to the extent allowed by law. You will receive a receipt for your donation that you can use for tax purposes.</p>
              </div>
            )}
          </div>
          
          <div className="border border-gray-200 rounded-md overflow-hidden">
            <button 
              className="w-full flex items-center justify-between p-4 text-left focus:outline-none"
              onClick={() => toggleItem('faq-3')}
            >
              <h3 className="font-medium text-gray-800">Can I make a recurring donation?</h3>
              {expandedItems['faq-3'] ? 
                <ChevronUp className="h-5 w-5 text-[#FA6418]" /> : 
                <ChevronDown className="h-5 w-5 text-gray-400" />
              }
            </button>
            {expandedItems['faq-3'] && (
              <div className="p-4 pt-0 text-gray-600 bg-gray-50">
                <p>Absolutely! Monthly donations provide consistent support for our programs. When making a donation, simply select the "Make this a monthly donation" option. You can modify or cancel your recurring donation at any time through your account.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Program FAQs</h2>
        
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-md overflow-hidden">
            <button 
              className="w-full flex items-center justify-between p-4 text-left focus:outline-none"
              onClick={() => toggleItem('faq-4')}
            >
              <h3 className="font-medium text-gray-800">How do I know my donation reaches the intended beneficiaries?</h3>
              {expandedItems['faq-4'] ? 
                <ChevronUp className="h-5 w-5 text-[#FA6418]" /> : 
                <ChevronDown className="h-5 w-5 text-gray-400" />
              }
            </button>
            {expandedItems['faq-4'] && (
              <div className="p-4 pt-0 text-gray-600 bg-gray-50">
                <p>We maintain strict transparency in our operations. Our website provides regular updates on project progress, and we publish annual reports detailing our financial allocations. Additionally, donors receive updates about the programs they've supported, often including photos and stories from the field.</p>
              </div>
            )}
          </div>
          
          <div className="border border-gray-200 rounded-md overflow-hidden">
            <button 
              className="w-full flex items-center justify-between p-4 text-left focus:outline-none"
              onClick={() => toggleItem('faq-5')}
            >
              <h3 className="font-medium text-gray-800">Can I specify which program my donation supports?</h3>
              {expandedItems['faq-5'] ? 
                <ChevronUp className="h-5 w-5 text-[#FA6418]" /> : 
                <ChevronDown className="h-5 w-5 text-gray-400" />
              }
            </button>
            {expandedItems['faq-5'] && (
              <div className="p-4 pt-0 text-gray-600 bg-gray-50">
                <p>Yes, during the donation process, you can select which specific program or project you'd like to support. Whether it's water wells, orphan sponsorship, or emergency relief, you can direct your donation to the cause closest to your heart.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Account & Technical FAQs</h2>
        
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-md overflow-hidden">
            <button 
              className="w-full flex items-center justify-between p-4 text-left focus:outline-none"
              onClick={() => toggleItem('faq-6')}
            >
              <h3 className="font-medium text-gray-800">How do I reset my password?</h3>
              {expandedItems['faq-6'] ? 
                <ChevronUp className="h-5 w-5 text-[#FA6418]" /> : 
                <ChevronDown className="h-5 w-5 text-gray-400" />
              }
            </button>
            {expandedItems['faq-6'] && (
              <div className="p-4 pt-0 text-gray-600 bg-gray-50">
                <p>To reset your password, click on "Sign In" at the top of our website, then select "Forgot Password." Enter the email address associated with your account, and we'll send you a link to create a new password.</p>
              </div>
            )}
          </div>
          
          <div className="border border-gray-200 rounded-md overflow-hidden">
            <button 
              className="w-full flex items-center justify-between p-4 text-left focus:outline-none"
              onClick={() => toggleItem('faq-7')}
            >
              <h3 className="font-medium text-gray-800">What payment methods do you accept?</h3>
              {expandedItems['faq-7'] ? 
                <ChevronUp className="h-5 w-5 text-[#FA6418]" /> : 
                <ChevronDown className="h-5 w-5 text-gray-400" />
              }
            </button>
            {expandedItems['faq-7'] && (
              <div className="p-4 pt-0 text-gray-600 bg-gray-50">
                <p>We accept various payment methods including credit/debit cards (Visa, MasterCard, American Express), PayPal, bank transfers, and digital wallets like Apple Pay and Google Pay. All transactions are secured with industry-standard encryption.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="bg-[#FA6418]/5 border border-[#FA6418]/20 rounded-lg p-6">
        <h3 className="font-bold text-gray-800 mb-2">Still have questions?</h3>
        <p className="text-gray-600 mb-4">
          If you couldn't find the answer to your question, please reach out to our support team.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <a href="/help?section=chat-support" className="inline-block px-5 py-2.5 text-white bg-[#FA6418] hover:bg-[#FA6418]/90 rounded-md font-medium transition-colors">
            Chat with Support
          </a>
          <a href="/help?section=contact" className="inline-block px-5 py-2.5 text-[#FA6418] border border-[#FA6418] hover:bg-[#FA6418]/10 rounded-md font-medium transition-colors">
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQs;