"use client"

import { useState } from 'react';

export default function FeedbackPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('general');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would send the feedback to your backend
    setSubmitted(true);
  };

  return (
    <div>
      <h1 className="font-montserrat text-3xl font-bold text-[#09869a] mb-4">Send Feedback</h1>
      <div className="w-24 h-1.5 bg-[#FA6418] rounded-full mb-8"></div>
      
      <p className="text-gray-700 mb-6">
        Your feedback helps us improve our services and better meet the needs of the communities we serve. Please share your thoughts, suggestions, or concerns with us.
      </p>
      
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
            <label htmlFor="feedbackType" className="block text-gray-700 mb-2">Feedback Type</label>
            <select
              id="feedbackType"
              value={feedbackType}
              onChange={(e) => setFeedbackType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#09869a]"
            >
              <option value="general">General Feedback</option>
              <option value="website">Website Feedback</option>
              <option value="programs">Program Feedback</option>
              <option value="suggestion">Suggestion</option>
              <option value="complaint">Complaint</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="feedback" className="block text-gray-700 mb-2">Your Feedback</label>
            <textarea
              id="feedback"
              rows={5}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#09869a]"
              required
            />
          </div>
          
          <button 
            type="submit"
            className="px-6 py-3 bg-[#09869a] text-white font-medium rounded-md hover:bg-[#09869a]/90 transition-colors"
          >
            Submit Feedback
          </button>
        </form>
      ) : (
        <div className="text-center py-8">
          <div className="text-5xl text-green-500 mb-4">✓</div>
          <h2 className="text-2xl font-semibold mb-4">Thank You for Your Feedback</h2>
          <p className="text-gray-700 mb-6">We appreciate you taking the time to share your thoughts with us. Your feedback helps us improve our services.</p>
          <button 
            onClick={() => setSubmitted(false)}
            className="px-6 py-3 bg-[#09869a] text-white font-medium rounded-md hover:bg-[#09869a]/90 transition-colors"
          >
            Submit Another Response
          </button>
        </div>
      )}
    </div>
  );
}