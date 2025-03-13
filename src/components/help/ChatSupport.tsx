import React from 'react';
import { MessageSquareText, Clock, Users, Send } from 'lucide-react';

const ChatSupport = () => {
  return (
    <div>
      <div className="flex items-center mb-6">
        <div className="p-3 rounded-full bg-[#09869a]/10 mr-4">
          <MessageSquareText className="h-8 w-8 text-[#09869a]" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800">Chat Support</h1>
      </div>
      
      <p className="text-gray-600 mb-6">
        Connect with our team in real-time for immediate assistance with your questions or concerns.
        Our chat support is available during business hours to provide you with prompt and personalized help.
      </p>
      
      <div className="bg-[#09869a]/5 border border-[#09869a]/20 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Chat Hours</h2>
        <div className="flex items-center mb-3">
          <Clock className="w-5 h-5 text-[#09869a] mr-3" />
          <span className="font-medium">Available Monday - Friday: 9:00 AM - 6:00 PM (EST)</span>
        </div>
        <div className="flex items-center">
          <Users className="w-5 h-5 text-[#09869a] mr-3" />
          <span>Average response time: Under 5 minutes</span>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Start a Chat</h2>
        <p className="text-gray-600 mb-4">
          To begin chatting with our support team, please fill out the brief form below.
          A support representative will be with you shortly.
        </p>
        
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
            <input 
              type="text" 
              id="name" 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#09869a] focus:border-transparent"
              placeholder="Enter your name"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input 
              type="email" 
              id="email" 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#09869a] focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>
          
          <div>
            <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1">Topic</label>
            <select 
              id="topic" 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#09869a] focus:border-transparent"
            >
              <option value="">Select a topic</option>
              <option value="donation">Donation Issues</option>
              <option value="account">Account Management</option>
              <option value="technical">Technical Support</option>
              <option value="general">General Inquiry</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
            <textarea 
              id="message" 
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#09869a] focus:border-transparent"
              placeholder="How can we help you today?"
            ></textarea>
          </div>
          
          <div>
            <button 
              type="submit" 
              className="inline-flex items-center px-5 py-2.5 text-white bg-[#09869a] hover:bg-[#09869a]/90 rounded-md font-medium transition-colors"
            >
              Start Chat <Send className="ml-2 h-4 w-4" />
            </button>
          </div>
        </form>
      </div>
      
      <div className="border-t border-gray-200 pt-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
        
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-md p-4">
            <h3 className="font-medium text-gray-800 mb-2">What information should I have ready?</h3>
            <p className="text-gray-600">
              Having your account details, donation or transaction IDs, and a clear description of your issue will help our support team assist you more efficiently.
            </p>
          </div>
          
          <div className="border border-gray-200 rounded-md p-4">
            <h3 className="font-medium text-gray-800 mb-2">What if chat support is unavailable?</h3>
            <p className="text-gray-600">
              If our chat support is offline, you can leave a message and we'll respond via email as soon as possible. Alternatively, you can check our FAQ section for immediate answers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSupport;