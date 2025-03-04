"use client"

import { useState } from 'react';

export default function ChatSupportPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    setSubmitted(true);
  };

  return (
    <div>
      <h1 className="font-montserrat text-3xl font-bold text-[#09869a] mb-4">Chat with Support Team</h1>
      <div className="w-24 h-1.5 bg-[#FA6418] rounded-full mb-8"></div>
      
      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-gray-700 mb-2">Your Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#09869a]"
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#09869a]"
              required
            />
          </div>
          
          <div>
            <label htmlFor="message" className="block text-gray-700 mb-2">How can we help?</label>
            <textarea
              id="message"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#09869a]"
              required
            />
          </div>
          
          <button 
            type="submit"
            className="px-6 py-3 bg-[#09869a] text-white font-medium rounded-md hover:bg-[#09869a]/90 transition-colors"
          >
            Submit Request
          </button>
        </form>
      ) : (
        <div className="text-center py-8">
          <div className="text-5xl text-green-500 mb-4">✓</div>
          <h2 className="text-2xl font-semibold mb-4">Request Submitted</h2>
          <p className="text-gray-700 mb-6">Thank you for reaching out! Our support team will contact you shortly.</p>
          <button 
            onClick={() => setSubmitted(false)}
            className="px-6 py-3 bg-[#09869a] text-white font-medium rounded-md hover:bg-[#09869a]/90 transition-colors"
          >
            Submit Another Request
          </button>
        </div>
      )}
    </div>
  );
}