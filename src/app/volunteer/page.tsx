"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Calendar, 
  Globe, 
  Heart, 
  Handshake, 
  GraduationCap,
  Users,
  MessageCircle,
  ArrowRight
} from 'lucide-react';
import Navbar from '@/components/navigation/Navbar';
import AuthModal from '@/components/auth/AuthModal';

const volunteerOpportunities = [
  {
    title: "Community Outreach",
    icon: <Users className="w-10 h-10 text-[#09869a]" />,
    description: "Engage directly with communities to assess needs, build relationships, and implement grassroots solutions.",
    commitment: "4-8 hours weekly",
    locations: ["Remote", "On-site"]
  },
  {
    title: "Educational Support",
    icon: <GraduationCap className="w-10 h-10 text-[#09869a]" />,
    description: "Tutor students, assist teachers, or help develop educational materials for our learning centers.",
    commitment: "3-6 hours weekly",
    locations: ["On-site"]
  },
  {
    title: "Fundraising & Events",
    icon: <Heart className="w-10 h-10 text-[#09869a]" />,
    description: "Help organize charity events, campaigns, and fundraising activities to support our programs.",
    commitment: "5-10 hours monthly",
    locations: ["Remote", "On-site"]
  },
  {
    title: "Administrative Support",
    icon: <Calendar className="w-10 h-10 text-[#09869a]" />,
    description: "Assist with office tasks, data entry, correspondence, and other behind-the-scenes work.",
    commitment: "2-10 hours weekly",
    locations: ["Remote", "On-site"]
  },
  {
    title: "Global Projects",
    icon: <Globe className="w-10 h-10 text-[#09869a]" />,
    description: "Join international missions delivering aid, building infrastructure, or providing medical assistance.",
    commitment: "1-4 weeks per project",
    locations: ["International"]
  },
  {
    title: "Partnership Development",
    icon: <Handshake className="w-10 h-10 text-[#09869a]" />,
    description: "Help build relationships with sponsors, donors, and partner organizations to expand our reach.",
    commitment: "5-8 hours weekly",
    locations: ["Remote", "On-site"]
  }
];

const testimonials = [
  {
    quote: "Volunteering with BCF has been the most rewarding experience of my life. I've seen firsthand how our work transforms communities.",
    name: "Sarah Johnson",
    role: "Community Outreach Volunteer",
    image: "/images/volunteers/volunteer-1.jpg"
  },
  {
    quote: "The team at BCF makes volunteering easy and meaningful. Every hour spent feels like it truly matters.",
    name: "Michael Chen",
    role: "Educational Support Volunteer",
    image: "/images/volunteers/volunteer-2.jpg"
  },
  {
    quote: "I started as a casual volunteer and found my calling. Five years later, I'm still here making a difference.",
    name: "Aisha Patel",
    role: "Global Projects Volunteer",
    image: "/images/volunteers/volunteer-3.jpg"
  }
];

export default function VolunteerPage() {
  const [authModal, setAuthModal] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <>
      <Navbar onAuthModalOpen={() => setAuthModal(true)} />
      <AuthModal isOpen={authModal} onClose={() => setAuthModal(false)} />
      
      {/* Hero Section */}
      <div className="relative min-h-[70vh] flex items-center pt-16 lg:pt-24 overflow-hidden bg-gradient-to-br from-[#09869a]/90 to-[#09869a]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/volunteers/hero-bg.jpg"
            alt="Volunteers working together"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="container mx-auto px-4 z-10 py-16">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="font-montserrat text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Make a <span className="text-[#FA6418]">Difference</span> <br className="hidden md:block" />
              Join Our Volunteer Team
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8 leading-relaxed">
              Together we can create lasting change in communities around the world. 
              Your time and skills can transform lives.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="#opportunities"
                className="bg-white text-[#09869a] px-8 py-3 rounded-md font-semibold hover:bg-opacity-95 transition duration-300"
              >
                Explore Opportunities
              </Link>
              <Link 
                href="#apply"
                className="bg-[#FA6418] text-white px-8 py-3 rounded-md font-semibold hover:bg-opacity-90 transition duration-300"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </div>
      
      {/* Why Volunteer Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-[#09869a] mb-4">Why Volunteer With Us</h2>
            <div className="w-24 h-1.5 bg-[#FA6418] rounded-full mx-auto mb-6"></div>
            <p className="text-gray-700 text-lg">
              When you volunteer with Baris Charity Foundation, you're not just donating your time – 
              you're becoming part of a global movement for positive change.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-gray-50 p-8 rounded-xl text-center hover:shadow-md transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#09869a]/10 mb-5">
                <Heart className="w-8 h-8 text-[#09869a]" />
              </div>
              <h3 className="font-montserrat text-xl font-bold text-gray-800 mb-3">Make an Impact</h3>
              <p className="text-gray-600">
                See the direct results of your contributions as you help transform lives and communities.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-xl text-center hover:shadow-md transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#09869a]/10 mb-5">
                <Users className="w-8 h-8 text-[#09869a]" />
              </div>
              <h3 className="font-montserrat text-xl font-bold text-gray-800 mb-3">Build Connections</h3>
              <p className="text-gray-600">
                Join a network of passionate individuals committed to creating a better world.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-xl text-center hover:shadow-md transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#09869a]/10 mb-5">
                <GraduationCap className="w-8 h-8 text-[#09869a]" />
              </div>
              <h3 className="font-montserrat text-xl font-bold text-gray-800 mb-3">Grow Personally</h3>
              <p className="text-gray-600">
                Develop new skills, gain valuable experience, and discover your potential.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Volunteer Opportunities */}
      <section id="opportunities" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-[#09869a] mb-4">Volunteer Opportunities</h2>
            <div className="w-24 h-1.5 bg-[#FA6418] rounded-full mx-auto mb-6"></div>
            <p className="text-gray-700 text-lg">
              We have diverse opportunities that match different skills, interests, and time commitments. 
              Find the perfect way to make your contribution.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {volunteerOpportunities.map((opportunity, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md hover:translate-y-[-4px]">
                <div className="p-8">
                  <div className="mb-5">
                    {opportunity.icon}
                  </div>
                  <h3 className="font-montserrat text-xl font-bold text-[#09869a] mb-3">{opportunity.title}</h3>
                  <p className="text-gray-600 mb-5">{opportunity.description}</p>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{opportunity.commitment}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    {opportunity.locations.map((location, idx) => (
                      <span 
                        key={idx} 
                        className={`text-xs px-3 py-1 rounded-full ${
                          location === 'Remote' ? 'bg-green-100 text-green-800' : 
                          location === 'On-site' ? 'bg-blue-100 text-blue-800' : 
                          'bg-purple-100 text-purple-800'
                        }`}
                      >
                        {location}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-[#09869a] mb-4">Volunteer Stories</h2>
            <div className="w-24 h-1.5 bg-[#FA6418] rounded-full mx-auto mb-6"></div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="overflow-hidden">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
                >
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="min-w-full px-4">
                      <div className="bg-gray-50 p-8 md:p-10 rounded-xl relative">
                        <MessageCircle className="w-12 h-12 text-[#09869a]/10 absolute top-6 left-6" />
                        <div className="md:flex items-center gap-8">
                          <div className="mb-6 md:mb-0 md:w-32 lg:w-40 mx-auto md:mx-0">
                            <div className="aspect-square rounded-full overflow-hidden border-4 border-white shadow-md relative">
                              <Image 
                                src={testimonial.image} 
                                alt={testimonial.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          </div>
                          <div className="flex-1">
                            <blockquote className="text-lg text-gray-700 mb-4 relative z-10">
                              &quot;{testimonial.quote}&quot;
                            </blockquote>
                            <div className="mt-6">
                              <p className="font-montserrat font-bold text-[#09869a]">{testimonial.name}</p>
                              <p className="text-sm text-gray-500">{testimonial.role}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Navigation Dots */}
              <div className="flex justify-center mt-8 gap-2">
                {testimonials.map((_, index) => (
                  <button 
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      activeTestimonial === index ? 'bg-[#09869a]' : 'bg-gray-300'
                    }`}
                    aria-label={`View testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* How to Apply */}
      <section id="apply" className="py-20 bg-gradient-to-br from-[#09869a] to-[#09869a]/90 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-montserrat text-3xl md:text-4xl font-bold mb-4">How to Become a Volunteer</h2>
              <div className="w-24 h-1.5 bg-[#FA6418] rounded-full mx-auto mb-6"></div>
              <p className="text-lg opacity-90">
                We've made the process simple. Follow these steps to join our volunteer team.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl text-center hover:bg-white/15 transition-colors duration-300">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white text-[#09869a] font-bold mb-4">1</div>
                <h3 className="font-montserrat text-xl font-bold mb-3">Apply Online</h3>
                <p className="opacity-90">
                  Complete our simple application form with your details and areas of interest.
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl text-center hover:bg-white/15 transition-colors duration-300">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white text-[#09869a] font-bold mb-4">2</div>
                <h3 className="font-montserrat text-xl font-bold mb-3">Orientation</h3>
                <p className="opacity-90">
                  Attend a brief orientation to learn about our work and how you can contribute.
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl text-center hover:bg-white/15 transition-colors duration-300">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white text-[#09869a] font-bold mb-4">3</div>
                <h3 className="font-montserrat text-xl font-bold mb-3">Get Started!</h3>
                <p className="opacity-90">
                  Begin your volunteer journey with guidance from our experienced team.
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <Link
                href="/volunteer/apply"
                className="inline-flex items-center bg-[#FA6418] hover:bg-[#FA6418]/90 transition-colors duration-300 text-white px-8 py-3 rounded-md font-semibold"
              >
                Apply Now <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-[#09869a] mb-4">Common Questions</h2>
            <div className="w-24 h-1.5 bg-[#FA6418] rounded-full mx-auto mb-6"></div>
            <p className="text-gray-700 text-lg">
              Find answers to frequently asked questions about volunteering with us.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-montserrat text-lg font-bold text-gray-800 mb-3">How much time do I need to commit?</h3>
                <p className="text-gray-600">
                  We have opportunities ranging from one-time events to regular weekly commitments. 
                  You can choose what works for your schedule, and we're always flexible to accommodate changes.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-montserrat text-lg font-bold text-gray-800 mb-3">Do I need specific qualifications?</h3>
                <p className="text-gray-600">
                  Most volunteer roles don&apos;t require specific qualifications – just enthusiasm and commitment. 
                  For specialized roles like medical missions or technical support, relevant experience may be needed.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-montserrat text-lg font-bold text-gray-800 mb-3">Can I volunteer remotely?</h3>
                <p className="text-gray-600">
                  Yes! Many of our volunteer opportunities can be done remotely, including administrative support, 
                  social media management, content creation, and fundraising activities.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-montserrat text-lg font-bold text-gray-800 mb-3">Is training provided?</h3>
                <p className="text-gray-600">
                  Absolutely. All volunteers receive orientation, and role-specific training is provided for each position. 
                  We ensure you have all the tools and knowledge you need to succeed.
                </p>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-gray-700 mb-4">Still have questions about volunteering?</p>
              <Link
                href="/help/contact" 
                className="inline-flex items-center text-[#09869a] font-semibold hover:text-[#09869a]/80 transition-colors duration-300"
              >
                Contact our volunteer coordinator <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-[#09869a] rounded-xl p-8 md:p-12 text-white text-center">
            <h2 className="font-montserrat text-2xl md:text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Join our community of passionate volunteers and help us create lasting change. 
              Together, we can build a better world.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/volunteer/apply"
                className="bg-white text-[#09869a] px-8 py-3 rounded-md font-semibold hover:bg-opacity-95 transition duration-300"
              >
                Apply as Volunteer
              </Link>
              <Link 
                href="/donate"
                className="bg-[#FA6418] text-white px-8 py-3 rounded-md font-semibold hover:bg-opacity-90 transition duration-300"
              >
                Donate Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}