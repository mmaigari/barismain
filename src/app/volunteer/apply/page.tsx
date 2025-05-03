"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/navigation/Navbar';
import AuthModal from '@/components/auth/AuthModal';
import { ArrowLeft } from 'lucide-react';

// Service for application management
import { saveApplication, getApplicationById } from '@/services/applicationService';

// Type for the application data
interface ApplicationData {
  id?: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  educationLevel: string;
  availableHours: string;
  interests: {
    communityOutreach: boolean;
    educationalSupport: boolean;
    fundraising: boolean;
    administrativeSupport: boolean;
    globalProjects: boolean;
    partnershipDevelopment: boolean;
  };
  experience: string;
  declaration: boolean;
  signature: string;
  submittedAt?: Date;
  status: 'pending' | 'under-review' | 'accepted' | 'rejected';
  adminNotes?: string;
  assignedPosition?: string;
}

export default function VolunteerApplicationPage() {
  const router = useRouter();
  const [authModal, setAuthModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [applicationId, setApplicationId] = useState<string | null>(null);
  
  // Form state
  const [formData, setFormData] = useState<ApplicationData>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    educationLevel: '',
    availableHours: '',
    interests: {
      communityOutreach: false,
      educationalSupport: false,
      fundraising: false,
      administrativeSupport: false,
      globalProjects: false,
      partnershipDevelopment: false,
    },
    experience: '',
    declaration: false,
    signature: '',
    status: 'pending',
  });

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    
    if (name.startsWith('interests.')) {
      const interestName = name.split('.')[1];
      setFormData({
        ...formData,
        interests: {
          ...formData.interests,
          [interestName]: checked,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: checked,
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.declaration) {
      setSubmitError('You must agree to the declaration to submit your application.');
      return;
    }
    
    try {
      setIsSubmitting(true);
      setSubmitError('');
      
      // Add submission date
      const submissionData = {
        ...formData,
        submittedAt: new Date(),
      };
      
      // Save to database
      const id = await saveApplication(submissionData);
      
      setApplicationId(id);
      setSubmitSuccess(true);
      
      // Optionally reset form
      // setFormData({ ... }); // Reset form if needed
      
      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
    } catch (error) {
      console.error('Error submitting application:', error);
      setSubmitError('There was an error submitting your application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar onAuthModalOpen={() => setAuthModal(true)} />
      <AuthModal isOpen={authModal} onClose={() => setAuthModal(false)} />
      
      <div className="pt-16 lg:pt-20 pb-16 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back button */}
          <div className="mt-6 mb-4">
            <Link href="/volunteer" className="inline-flex items-center text-[#09869a] hover:text-[#09869a]/80 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Volunteer Page
            </Link>
          </div>
          
          {submitSuccess ? (
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="font-montserrat text-2xl md:text-3xl font-bold text-gray-800 mb-4">Application Submitted Successfully!</h2>
                <p className="text-gray-600 mb-6">
                  Thank you for applying to volunteer with Bariş Charity Foundation. 
                  Your application has been received and is being reviewed by our team.
                </p>
                <p className="text-gray-600 mb-8">
                  Your application reference: <span className="font-semibold">{applicationId}</span>
                </p>
                <p className="text-gray-600 mb-4">
                  We will contact you soon regarding the next steps.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    href="/volunteer" 
                    className="bg-[#09869a] text-white px-6 py-2 rounded-md hover:bg-[#09869a]/90 transition-colors"
                  >
                    Return to Volunteer Page
                  </Link>
                  <Link 
                    href="/" 
                    className="border border-[#09869a] text-[#09869a] px-6 py-2 rounded-md hover:bg-[#09869a]/10 transition-colors"
                  >
                    Go to Homepage
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="text-center mb-10">
                <h1 className="font-montserrat text-3xl md:text-4xl font-bold text-[#09869a] mb-2">APPLICATION FORM</h1>
                <div className="w-24 h-1.5 bg-[#FA6418] rounded-full mx-auto mb-6"></div>
                <p className="text-gray-600 mb-2">
                  Please complete all sections of this form to apply as a volunteer.
                </p>
                <p className="text-gray-500 text-sm mb-8">All information provided will be kept confidential.</p>
              </div>
              
              {submitError && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md mb-6">
                  {submitError}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 shadow-sm">
                {/* Section A: Personal Data */}
                <div className="mb-8">
                  <h2 className="font-montserrat text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                    Section A: Personal Data
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="col-span-2 md:col-span-1">
                      <label htmlFor="fullName" className="block text-gray-700 font-medium mb-2">Full Name <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#09869a] focus:border-transparent"
                        placeholder="Enter your full name"
                      />
                    </div>
                    
                    <div className="col-span-2 md:col-span-1">
                      <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address <span className="text-red-500">*</span></label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#09869a] focus:border-transparent"
                        placeholder="your.email@example.com"
                      />
                    </div>
                    
                    <div className="col-span-2 md:col-span-1">
                      <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone Number <span className="text-red-500">*</span></label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#09869a] focus:border-transparent"
                        placeholder="e.g., +1 123 456 7890"
                      />
                    </div>
                    
                    <div className="col-span-2 md:col-span-1">
                      <label htmlFor="dateOfBirth" className="block text-gray-700 font-medium mb-2">Date of Birth <span className="text-red-500">*</span></label>
                      <input
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#09869a] focus:border-transparent"
                      />
                    </div>
                    
                    <div className="col-span-2">
                      <label htmlFor="address" className="block text-gray-700 font-medium mb-2">Address <span className="text-red-500">*</span></label>
                      <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#09869a] focus:border-transparent"
                        placeholder="Enter your complete address"
                      ></textarea>
                    </div>
                    
                    <div className="col-span-2 md:col-span-1">
                      <label htmlFor="educationLevel" className="block text-gray-700 font-medium mb-2">Education Level <span className="text-red-500">*</span></label>
                      <select
                        id="educationLevel"
                        name="educationLevel"
                        value={formData.educationLevel}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#09869a] focus:border-transparent"
                      >
                        <option value="">Select your education level</option>
                        <option value="highSchool">High School</option>
                        <option value="associate">Associate Degree</option>
                        <option value="bachelor">Bachelor's Degree</option>
                        <option value="master">Master's Degree</option>
                        <option value="doctorate">Doctorate</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div className="col-span-2 md:col-span-1">
                      <label htmlFor="availableHours" className="block text-gray-700 font-medium mb-2">Available Hours per Week <span className="text-red-500">*</span></label>
                      <select
                        id="availableHours"
                        name="availableHours"
                        value={formData.availableHours}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#09869a] focus:border-transparent"
                      >
                        <option value="">Select available hours</option>
                        <option value="1-5">1-5 hours</option>
                        <option value="6-10">6-10 hours</option>
                        <option value="11-20">11-20 hours</option>
                        <option value="20+">More than 20 hours</option>
                      </select>
                    </div>
                    
                    <div className="col-span-2">
                      <label className="block text-gray-700 font-medium mb-3">Areas of Interest <span className="text-red-500">*</span></label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="communityOutreach"
                            name="interests.communityOutreach"
                            checked={formData.interests.communityOutreach}
                            onChange={handleCheckboxChange}
                            className="w-4 h-4 text-[#09869a] focus:ring-[#09869a] border-gray-300 rounded"
                          />
                          <label htmlFor="communityOutreach" className="ml-2 block text-sm text-gray-700">Community Outreach</label>
                        </div>
                        
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="educationalSupport"
                            name="interests.educationalSupport"
                            checked={formData.interests.educationalSupport}
                            onChange={handleCheckboxChange}
                            className="w-4 h-4 text-[#09869a] focus:ring-[#09869a] border-gray-300 rounded"
                          />
                          <label htmlFor="educationalSupport" className="ml-2 block text-sm text-gray-700">Educational Support</label>
                        </div>
                        
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="fundraising"
                            name="interests.fundraising"
                            checked={formData.interests.fundraising}
                            onChange={handleCheckboxChange}
                            className="w-4 h-4 text-[#09869a] focus:ring-[#09869a] border-gray-300 rounded"
                          />
                          <label htmlFor="fundraising" className="ml-2 block text-sm text-gray-700">Fundraising & Events</label>
                        </div>
                        
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="administrativeSupport"
                            name="interests.administrativeSupport"
                            checked={formData.interests.administrativeSupport}
                            onChange={handleCheckboxChange}
                            className="w-4 h-4 text-[#09869a] focus:ring-[#09869a] border-gray-300 rounded"
                          />
                          <label htmlFor="administrativeSupport" className="ml-2 block text-sm text-gray-700">Administrative Support</label>
                        </div>
                        
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="globalProjects"
                            name="interests.globalProjects"
                            checked={formData.interests.globalProjects}
                            onChange={handleCheckboxChange}
                            className="w-4 h-4 text-[#09869a] focus:ring-[#09869a] border-gray-300 rounded"
                          />
                          <label htmlFor="globalProjects" className="ml-2 block text-sm text-gray-700">Global Projects</label>
                        </div>
                        
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="partnershipDevelopment"
                            name="interests.partnershipDevelopment"
                            checked={formData.interests.partnershipDevelopment}
                            onChange={handleCheckboxChange}
                            className="w-4 h-4 text-[#09869a] focus:ring-[#09869a] border-gray-300 rounded"
                          />
                          <label htmlFor="partnershipDevelopment" className="ml-2 block text-sm text-gray-700">Partnership Development</label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-span-2">
                      <label htmlFor="experience" className="block text-gray-700 font-medium mb-2">Experience & Skills</label>
                      <textarea
                        id="experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#09869a] focus:border-transparent"
                        placeholder="Please describe any relevant experience, skills, or qualifications you have."
                      ></textarea>
                    </div>
                  </div>
                </div>
                
                {/* Section B: Declaration and Signature */}
                <div className="mb-8">
                  <h2 className="font-montserrat text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                    Section B: Declaration
                  </h2>
                  
                  <div className="mb-6">
                    <div className="bg-gray-100 p-4 rounded-md mb-4">
                      <p className="text-gray-700 text-sm">
                        I hereby declare that the information provided in this application is true and correct to the best of my knowledge.
                        I understand that any false statement may result in rejection of my application or termination of my volunteer service.
                        I agree to abide by the rules, regulations, and policies of Bariş Charity Foundation.
                      </p>
                    </div>
                    
                    <div className="flex items-center mb-6">
                      <input
                        type="checkbox"
                        id="declaration"
                        name="declaration"
                        checked={formData.declaration}
                        onChange={handleCheckboxChange}
                        required
                        className="w-4 h-4 text-[#09869a] focus:ring-[#09869a] border-gray-300 rounded"
                      />
                      <label htmlFor="declaration" className="ml-2 block text-sm text-gray-700">
                        I agree to the above declaration <span className="text-red-500">*</span>
                      </label>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="signature" className="block text-gray-700 font-medium mb-2">Signature (Type your full name) <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        id="signature"
                        name="signature"
                        value={formData.signature}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#09869a] focus:border-transparent"
                        placeholder="Type your full name as your signature"
                      />
                    </div>
                    
                    <div className="text-sm text-gray-500 mb-4">
                      Date: {new Date().toLocaleDateString()}
                    </div>
                  </div>
                </div>
                
                {/* Submit Button */}
                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#09869a] hover:bg-[#09869a]/90 transition-colors duration-300 text-white px-8 py-3 rounded-md font-semibold disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                </div>
              </form>
              
              {/* Form Footer */}
              <div className="mt-8 text-center text-gray-500 text-sm">
                <p>Thank you for your interest in volunteering with Bariş Charity Foundation.</p>
                <p>If you have any questions, please contact our volunteer coordinator at <a href="mailto:volunteer@barischarity.org" className="text-[#09869a] hover:underline">volunteer@barischarity.org</a></p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}