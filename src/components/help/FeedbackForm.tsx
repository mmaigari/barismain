import React, { useState } from 'react';
import { Mail, Send, Star, AlertCircle, CheckCircle, Info } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  feedbackType: string;
  subject: string;
  message: string;
  satisfaction: number | null;
  allowContact: boolean;
}

const FeedbackForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    feedbackType: '',
    subject: '',
    message: '',
    satisfaction: null,
    allowContact: false,
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        [name]: checkbox.checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const handleSatisfactionSelect = (rating: number) => {
    setFormData(prev => ({
      ...prev,
      satisfaction: rating
    }));
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.feedbackType) {
      newErrors.feedbackType = 'Please select a feedback type';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Feedback message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Please provide more detailed feedback (at least 10 characters)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real application, you would make an actual API call here
      // const response = await fetch('/api/feedback', { 
      //   method: 'POST',
      //   body: JSON.stringify(formData),
      //   headers: { 'Content-Type': 'application/json' }
      // });
      
      setIsSubmitting(false);
      setSubmitted(true);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        feedbackType: '',
        subject: '',
        message: '',
        satisfaction: null,
        allowContact: false,
      });
      
    } catch (err) {
      setIsSubmitting(false);
      setSubmitError('Something went wrong. Please try again later.');
    }
  };
  
  return (
    <div>
      <div className="flex items-center mb-6">
        <div className="p-3 rounded-full bg-[#09869a]/10 mr-4">
          <Mail className="h-8 w-8 text-[#09869a]" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800">Send Feedback</h1>
      </div>
      
      <p className="text-gray-600 mb-8">
        Your feedback helps us improve our services and better serve our community. 
        Please share your thoughts, suggestions, concerns, or compliments with us.
      </p>
      
      {submitted ? (
        <div className="bg-green-50 border border-green-100 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <CheckCircle className="h-8 w-8 text-green-500 mr-3" />
            <h2 className="text-xl font-bold text-gray-800">Thank You for Your Feedback!</h2>
          </div>
          <p className="text-gray-700 mb-4">
            We appreciate you taking the time to share your thoughts with us. Your feedback is valuable
            and will help us improve our services and programs.
          </p>
          <p className="text-gray-700 mb-2">
            {formData.allowContact ? 
              'A member of our team may contact you soon to follow up on your feedback.' : 
              'If you would like us to follow up with you, please feel free to contact us directly.'}
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-4 px-4 py-2 bg-[#09869a] text-white rounded-md hover:bg-[#09869a]/90 transition-colors"
          >
            Submit Another Feedback
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Your Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full rounded-md border ${
                      errors.name ? 'border-red-300' : 'border-gray-300'
                    } px-4 py-2.5 focus:border-[#09869a] focus:ring-1 focus:ring-[#09869a] outline-none transition`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full rounded-md border ${
                      errors.email ? 'border-red-300' : 'border-gray-300'
                    } px-4 py-2.5 focus:border-[#09869a] focus:ring-1 focus:ring-[#09869a] outline-none transition`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Feedback Details</h2>
              
              <div className="mb-4">
                <label htmlFor="feedbackType" className="block text-sm font-medium text-gray-700 mb-1">
                  Feedback Type <span className="text-red-500">*</span>
                </label>
                <select
                  id="feedbackType"
                  name="feedbackType"
                  value={formData.feedbackType}
                  onChange={handleChange}
                  className={`w-full rounded-md border ${
                    errors.feedbackType ? 'border-red-300' : 'border-gray-300'
                  } px-4 py-2.5 focus:border-[#09869a] focus:ring-1 focus:ring-[#09869a] outline-none transition`}
                >
                  <option value="">Select a feedback type</option>
                  <option value="suggestion">Suggestion</option>
                  <option value="compliment">Compliment</option>
                  <option value="complaint">Complaint</option>
                  <option value="question">Question</option>
                  <option value="bug">Website Issue</option>
                  <option value="other">Other</option>
                </select>
                {errors.feedbackType && (
                  <p className="mt-1 text-sm text-red-600">{errors.feedbackType}</p>
                )}
              </div>
              
              <div className="mb-4">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Brief description of your feedback"
                  className={`w-full rounded-md border ${
                    errors.subject ? 'border-red-300' : 'border-gray-300'
                  } px-4 py-2.5 focus:border-[#09869a] focus:ring-1 focus:ring-[#09869a] outline-none transition`}
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
                )}
              </div>
              
              <div className="mb-4">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Feedback <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Please provide detailed feedback to help us better understand your thoughts"
                  rows={6}
                  className={`w-full rounded-md border ${
                    errors.message ? 'border-red-300' : 'border-gray-300'
                  } px-4 py-2.5 focus:border-[#09869a] focus:ring-1 focus:ring-[#09869a] outline-none transition`}
                ></textarea>
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                )}
              </div>
              
              <div className="mb-4">
                <p className="block text-sm font-medium text-gray-700 mb-2">
                  Your Overall Satisfaction
                </p>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => handleSatisfactionSelect(rating)}
                      className="mr-1 focus:outline-none"
                    >
                      <Star 
                        className={`h-8 w-8 ${
                          formData.satisfaction && rating <= formData.satisfaction
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`} 
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    {formData.satisfaction ? 
                      `${formData.satisfaction} ${formData.satisfaction === 1 ? 'Star' : 'Stars'}` : 
                      'Select a rating (optional)'}
                  </span>
                </div>
              </div>
              
              <div className="mt-6">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="allowContact"
                    name="allowContact"
                    checked={formData.allowContact}
                    onChange={handleChange}
                    className="mt-1 h-4 w-4 text-[#09869a] border-gray-300 rounded focus:ring-[#09869a]"
                  />
                  <label htmlFor="allowContact" className="ml-2 text-sm text-gray-700">
                    I would like to be contacted regarding my feedback if necessary
                  </label>
                </div>
              </div>
            </div>
            
            {submitError && (
              <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-3">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                  <p className="text-red-700 text-sm">{submitError}</p>
                </div>
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <div className="flex items-center text-xs text-gray-500">
                <Info className="h-3 w-3 mr-1" />
                <span>Fields marked with <span className="text-red-500">*</span> are required</span>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#FA6418] hover:bg-[#FA6418]/90 text-white font-medium py-2.5 px-6 rounded-md transition-colors flex items-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="inline-flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  <span className="inline-flex items-center">
                    <Send className="h-4 w-4 mr-2" /> Submit Feedback
                  </span>
                )}
              </button>
            </div>
          </div>
        </form>
      )}
      
      <div className="mt-8 bg-gray-50 rounded-lg border border-gray-200 p-4">
        <h3 className="font-medium text-gray-800 mb-2">Privacy Notice</h3>
        <p className="text-sm text-gray-600">
          Your feedback is important to us. Any personal information you provide will be handled in 
          accordance with our <Link href="/help/privacy" className="text-[#09869a] hover:underline">Privacy Policy</Link>. 
          Your feedback may be used to improve our services, but we will never share your personal 
          information with third parties without your consent.
        </p>
      </div>
    </div>
  );
};

export default FeedbackForm;