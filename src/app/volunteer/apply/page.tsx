"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/navigation/Navbar';
import AuthModal from '@/components/auth/AuthModal';
import BvnVerification, { BvnVerificationResult } from '@/components/volunteer/BvnVerification';
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
  bvnVerified: boolean;
  bvnData?: {
    bvn: string;
    firstName: string;
    lastName: string;
    middleName?: string;
    dateOfBirth: string;
    phoneNumber: string;
  };
}

export default function VolunteerApplicationPage() {
  const router = useRouter();
  const [authModal, setAuthModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<'bvn-verification' | 'application-form'>('bvn-verification');
  const [verifiedBvnData, setVerifiedBvnData] = useState<BvnVerificationResult | null>(null);
  
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
    bvnVerified: false,
  });

  // Handle BVN verification success
  const handleBvnVerificationSuccess = (bvnData: BvnVerificationResult) => {
    // Store the BVN verification data
    setVerifiedBvnData(bvnData);
    
    // Format the full name
    const fullName = `${bvnData.first_name} ${bvnData.middle_name ? bvnData.middle_name + ' ' : ''}${bvnData.last_name}`;
    
    // Pre-populate the form with data from BVN
    setFormData(prev => ({
      ...prev,
      fullName: fullName,
      phone: bvnData.mobile || '',
      dateOfBirth: formatDateForInput(bvnData.dob),
      signature: fullName, // Auto-populate signature with the full name
      bvnVerified: true,
      bvnData: {
        bvn: bvnData.bvn,
        firstName: bvnData.first_name,
        lastName: bvnData.last_name,
        middleName: bvnData.middle_name,
        dateOfBirth: bvnData.dob,
        phoneNumber: bvnData.mobile,
      }
    }));
    
    // Move to the next step
    setCurrentStep('application-form');
  };

  // Format date from API to input format
  const formatDateForInput = (dateString: string): string => {
    if (!dateString) return '';
    
    // Log the date format we received for debugging
    console.log('BVN API date format received:', dateString);
    
    // Check if the date is in DD-MM-YYYY format
    const ddmmyyyyPattern = /^(\d{1,2})-(\d{1,2})-(\d{4})$/;
    if (ddmmyyyyPattern.test(dateString)) {
      const parts = dateString.split('-');
      // Convert from DD-MM-YYYY to YYYY-MM-DD
      return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
    }
    
    // Check if the date is in YYYY-MM-DD format already
    const yyyymmddPattern = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;
    if (yyyymmddPattern.test(dateString)) {
      const parts = dateString.split('-');
      // Already in correct format, just ensure proper padding
      return `${parts[0]}-${parts[1].padStart(2, '0')}-${parts[2].padStart(2, '0')}`;
    }
    
    // Try to parse as a JavaScript Date if it's in another format
    try {
      const date = new Date(dateString);
      if (!isNaN(date.getTime())) {
        // Format as YYYY-MM-DD
        return date.toISOString().split('T')[0];
      }
    } catch (e) {
      console.error('Error parsing date:', e);
    }
    
    // If all else fails, return empty string
    console.warn('Could not parse date format:', dateString);
    return '';
  };

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
          
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="font-montserrat text-3xl md:text-4xl font-bold text-[#09869a] mb-2">VOLUNTEER APPLICATION</h1>
            <div className="w-24 h-1.5 bg-[#FA6418] rounded-full mx-auto mb-6"></div>
            <p className="text-gray-600 mb-2">
              Join our team of dedicated volunteers making a difference.
            </p>
            <p className="text-gray-500 text-sm mb-8">All information provided will be kept confidential.</p>
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
              {/* Multi-step form progress indicator */}
              <div className="flex items-center justify-center mb-8">
                <div className={`flex items-center ${currentStep === 'bvn-verification' ? 'text-[#09869a] font-semibold' : 'text-gray-500'}`}>
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep === 'bvn-verification' ? 'bg-[#09869a] text-white' : 'bg-gray-200 text-gray-700'}`}>
                    1
                  </div>
                  <span className="ml-2">Identity Verification</span>
                </div>
                <div className="w-12 h-1 mx-4 bg-gray-200">
                  {currentStep === 'application-form' && (
                    <div className="h-1 bg-[#09869a]" style={{ width: '100%' }}></div>
                  )}
                </div>
                <div className={`flex items-center ${currentStep === 'application-form' ? 'text-[#09869a] font-semibold' : 'text-gray-500'}`}>
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep === 'application-form' ? 'bg-[#09869a] text-white' : 'bg-gray-200 text-gray-700'}`}>
                    2
                  </div>
                  <span className="ml-2">Application Form</span>
                </div>
              </div>
              
              {/* Content for the current step */}
              {currentStep === 'bvn-verification' ? (
                <BvnVerification onVerificationSuccess={handleBvnVerificationSuccess} />
              ) : (
                <>
                  {submitError && (
                    <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md mb-6">
                      {submitError}
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 shadow-sm">
                    {/* BVN Verification Summary */}
                    <div className="mb-8 bg-green-50 p-4 rounded-lg border border-green-100">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-green-800">BVN Verification Successful</h3>
                          <div className="mt-2 text-sm text-green-700">
                            <p>Your identity has been verified with BVN: {verifiedBvnData?.bvn.slice(0, 3)}****{verifiedBvnData?.bvn.slice(-3)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
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
                </>
              )}
              
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