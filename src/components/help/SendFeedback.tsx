import React, { useState } from 'react';
import { Mail, Send, Star, Phone } from 'lucide-react';

const SendFeedback = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedbackType: '',
    message: '',
    rating: 0
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleRatingClick = (rating: number) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, you would send the feedback to your server here
    console.log('Feedback submitted:', formData);
    setIsSubmitted(true);
    
    // Reset form after submission (in a real app, you might want to do this after a successful API call)
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        feedbackType: '',
        message: '',
        rating: 0
      });
      setIsSubmitted(false);
    }, 5000);
  };
  
  return (
    <div>
      <div className="flex items-center mb-6">
        <div className="p-3 rounded-full bg-[#FA6418]/10 mr-4">
          <Mail className="h-8 w-8 text-[#FA6418]" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800">Send Feedback</h1>
      </div>
      
      <p className="text-gray-600 mb-6">
        We value your input! Please share your thoughts, suggestions, or concerns about our website, services, or programs. Your feedback helps us improve our work and better serve our communities.
      </p>
      
      {isSubmitted ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8 text-center">
          <h2 className="text-xl font-bold text-green-800 mb-2">Thank You!</h2>
          <p className="text-green-700">
            Your feedback has been submitted successfully. We appreciate you taking the time to help us improve.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
              <input 
                type="text" 
                id="name" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FA6418] focus:border-transparent"
                placeholder="Enter your name"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input 
                type="email" 
                id="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FA6418] focus:border-transparent"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="feedbackType" className="block text-sm font-medium text-gray-700 mb-1">Feedback Type</label>
            <select 
              id="feedbackType" 
              name="feedbackType"
              value={formData.feedbackType}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FA6418] focus:border-transparent"
              required
            >
              <option value="">Select a feedback type</option>
              <option value="suggestion">Suggestion</option>
              <option value="complaint">Complaint</option>
              <option value="question">Question</option>
              <option value="praise">Praise</option>
              <option value="bug">Website Bug</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Feedback</label>
            <textarea 
              id="message" 
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FA6418] focus:border-transparent"
              placeholder="Please share your feedback in detail"
              required
            ></textarea>
          </div>
          
          <div>
            <p className="block text-sm font-medium text-gray-700 mb-2">How would you rate your experience with us?</p>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => handleRatingClick(rating)}
                  className="focus:outline-none"
                >
                  <Star 
                    className={`h-8 w-8 ${
                      rating <= formData.rating 
                        ? "text-yellow-400 fill-yellow-400" 
                        : "text-gray-300"
                    }`} 
                  />
                </button>
              ))}
              <span className="ml-2 text-sm text-gray-600">
                {formData.rating > 0 ? `${formData.rating}/5` : "Select a rating"}
              </span>
            </div>
          </div>
          
          <div className="pt-2">
            <button 
              type="submit" 
              className="inline-flex items-center px-6 py-3 text-white bg-[#FA6418] hover:bg-[#FA6418]/90 rounded-md font-medium transition-colors"
            >
              Submit Feedback <Send className="ml-2 h-4 w-4" />
            </button>
          </div>
        </form>
      )}
      
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-3">Other Ways to Connect</h2>
        <p className="text-gray-600 mb-4">
          In addition to this feedback form, you can reach out to us through the following channels:
        </p>
        <ul className="space-y-3 text-gray-600">
          <li className="flex items-start">
            <Mail className="h-5 w-5 mr-2 text-[#FA6418] mt-0.5" />
            <span>Email: <a href="mailto:feedback@barischarityfoundation.org" className="text-[#FA6418] hover:underline">feedback@barischarityfoundation.org</a></span>
          </li>
          <li className="flex items-center">
            <Phone className="h-5 w-5 mr-2 text-[#FA6418]" />
            <span>Phone: +1 (555) 123-4567</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SendFeedback;