"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Home, Heart, User, LifeBuoy, AlertCircle, Share2, ThumbsUp, Award, Calendar, Users } from 'lucide-react';
import Navbar from '@/components/navigation/Navbar';
import AuthModal from '@/components/auth/AuthModal';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import { DonationProvider, useDonation } from '@/contexts/DonationContext';
import DonationOptionsModal from '@/components/donation/modals/DonationOptionsModal';
import PaymentFeesModal from '@/components/donation/modals/PaymentFeesModal';
import TeamSupportModal from '@/components/donation/modals/TeamSupportModal';
import SignInModal from '@/components/donation/modals/SignInModal';
import GuestContinueModal from '@/components/donation/modals/GuestContinueModal';
import PaymentMethodModal from '@/components/donation/modals/PaymentMethodModal';
import ConfirmationModal from '@/components/donation/modals/ConfirmationModal';

// Create content component to use the donation context
function CampaignsPageContent() {
  const [authModal, setAuthModal] = useState(false);
  const { currentModal, setCurrentModal, setProgramName } = useDonation();
  
  // Campaign likes state
  const [campaignLikes, setCampaignLikes] = useState({
    "emergency": 342,
    "cash-aid": 219,
    "awareness": 187
  });
  
  // User liked campaigns - could be persisted to localStorage
  const [userLikes, setUserLikes] = useState<{[key: string]: boolean}>({});
  
  // Load user likes from localStorage
  useEffect(() => {
    const savedLikes = localStorage.getItem('campaign-likes');
    if (savedLikes) {
      setUserLikes(JSON.parse(savedLikes));
    }
  }, []);

  // Define the campaigns with added statistics 
  const campaigns = [
    {
      id: "emergency",
      title: "Emergency Relief Response",
      description: "Rapid deployment of essential aid to communities affected by natural disasters, conflicts, and humanitarian crises.",
      image: "/campaigns/emergency.png",
      link: "/programs/campaigns/emergency",
      color: "#FF6F61",
      stats: {
        peopleHelped: "2640+"
      }
    },
    {
      id: "cash-aid",
      title: "Cash Aid Distribution",
      description: "Direct financial assistance to vulnerable families, enabling them to meet their most pressing needs with dignity and choice.",
      image: "/campaigns/cash-aid.png",
      link: "/programs/campaigns/cash-aid",
      color: "#009688",
      stats: {
        peopleHelped: "1,500+",
        countriesServed: 8,
        completionPercent: 62,
        daysLeft: 18
      }
    },
    {
      id: "awareness",
      title: "Humanitarian Awareness Campaigns",
      description: "Education and advocacy initiatives to raise awareness about humanitarian issues and inspire community action.",
      image: "/campaigns/awareness.png",
      link: "/programs/campaigns/awareness",
      color: "#5D87FF",
      stats: {
        peopleHelped: "10,000+",
        countriesServed: 22,
        completionPercent: 89,
        daysLeft: 5
      }
    }
  ];

  // Handle share function with improved social media options
  const handleShare = async (campaignTitle: string, campaignId: string) => {
    // Create share URL with campaign ID for proper deep linking
    const shareUrl = `${window.location.origin}/programs/campaigns/${campaignId}`;
    
    const shareData = {
      title: `${campaignTitle} - Bariş Charity Foundation`,
      text: `Learn about ${campaignTitle} and how you can help those in need.`,
      url: shareUrl,
    };

    // Show sharing modal with options
    const showShareOptions = () => {
      // Render a custom sharing dialog
      const modalDiv = document.createElement('div');
      modalDiv.className = 'fixed inset-0 bg-black/70 flex items-center justify-center z-50';
      modalDiv.innerHTML = `
        <div class="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
          <h3 class="text-lg font-bold mb-4">Share this campaign</h3>
          <div class="grid grid-cols-4 gap-4">
            <button id="share-twitter" class="flex flex-col items-center justify-center p-3 rounded-md bg-[#1DA1F2]/10 text-[#1DA1F2] hover:bg-[#1DA1F2]/20">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
              </svg>
              <span class="text-xs mt-2">Twitter</span>
            </button>
            <button id="share-facebook" class="flex flex-col items-center justify-center p-3 rounded-md bg-[#4267B2]/10 text-[#4267B2] hover:bg-[#4267B2]/20">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
              <span class="text-xs mt-2">Facebook</span>
            </button>
            <button id="share-whatsapp" class="flex flex-col items-center justify-center p-3 rounded-md bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"></path>
                <path d="M20.636 3.364C18.336 1.064 15.276 0 12.036 0 5.486 0 .136 5.35.136 11.9c0 2.1.546 4.148 1.586 5.95L0 24l6.3-1.652c1.734.947 3.687 1.444 5.734 1.446h.004c6.55 0 11.899-5.35 11.899-11.9 0-3.176-1.236-6.165-3.501-8.453l.2.323zM12.036 21.785h-.003c-1.77 0-3.508-.477-5.023-1.376l-.36-.214-3.73.978.998-3.648-.235-.374c-.998-1.59-1.526-3.428-1.526-5.326 0-5.518 4.491-10.009 10.01-10.009 2.67 0 5.183 1.04 7.074 2.933 1.889 1.893 2.931 4.405 2.93 7.076-.002 5.518-4.492 10.009-10.01 10.01l.005-.05z"></path>
              </svg>
              <span class="text-xs mt-2">WhatsApp</span>
            </button>
            <button id="share-email" class="flex flex-col items-center justify-center p-3 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <span class="text-xs mt-2">Email</span>
            </button>
          </div>
          <div class="mt-4 border-t pt-4">
            <p class="text-sm text-gray-600 mb-2">Or copy link:</p>
            <div class="flex gap-2">
              <input type="text" value="${shareUrl}" class="border rounded px-3 py-2 text-sm flex-1 focus:outline-none focus:border-[#09869a]" readonly />
              <button id="copy-link" class="bg-[#09869a] text-white px-4 py-2 rounded text-sm">Copy</button>
            </div>
          </div>
          <div class="mt-4 text-right">
            <button id="close-share" class="text-gray-500 hover:text-gray-700 text-sm">Close</button>
          </div>
        </div>
      `;
      
      document.body.appendChild(modalDiv);
      
      // Add event listeners
      document.getElementById('share-twitter')?.addEventListener('click', () => {
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareData.text)}`, '_blank');
        document.body.removeChild(modalDiv);
      });
      
      document.getElementById('share-facebook')?.addEventListener('click', () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
        document.body.removeChild(modalDiv);
      });
      
      document.getElementById('share-whatsapp')?.addEventListener('click', () => {
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareData.text + ' ' + shareUrl)}`, '_blank');
        document.body.removeChild(modalDiv);
      });
      
      document.getElementById('share-email')?.addEventListener('click', () => {
        window.location.href = `mailto:?subject=${encodeURIComponent(shareData.title)}&body=${encodeURIComponent(shareData.text + ' ' + shareUrl)}`;
        document.body.removeChild(modalDiv);
      });
      
      document.getElementById('copy-link')?.addEventListener('click', () => {
        navigator.clipboard.writeText(shareUrl);
        toast.success('Link copied to clipboard!');
        document.body.removeChild(modalDiv);
      });
      
      document.getElementById('close-share')?.addEventListener('click', () => {
        document.body.removeChild(modalDiv);
      });
    };

    try {
      // Try native sharing if available
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fall back to our custom sharing dialog
        showShareOptions();
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };
  
  // Handle like function
  const handleLike = (campaignId: string) => {
    // Toggle user's like for this campaign
    const newUserLikes = { ...userLikes };
    const currentlyLiked = !!newUserLikes[campaignId];
    
    // Update UI state
    setCampaignLikes(prev => ({
      ...prev,
      [campaignId]: prev[campaignId] + (currentlyLiked ? -1 : 1)
    }));
    
    // Update user preferences
    newUserLikes[campaignId] = !currentlyLiked;
    setUserLikes(newUserLikes);
    
    // Save to localStorage
    localStorage.setItem('campaign-likes', JSON.stringify(newUserLikes));
    
    // Show toast message
    toast.success(currentlyLiked ? 'Removed from your liked campaigns' : 'Added to your liked campaigns');
    
    // In a real app, you would also send this to your backend
    // fetch('/api/campaigns/like', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ campaignId, action: currentlyLiked ? 'unlike' : 'like' })
    // });
  };

  // Add donation handlers
  const handleDonate = (programName: string) => {
    setProgramName(programName);
    setCurrentModal('donationOptions');
  };

  const handleGeneralDonate = () => {
    setProgramName("Humanitarian Campaigns");
    setCurrentModal('donationOptions');
  };

  return (
    <>
      <Navbar onAuthModalOpen={() => setAuthModal(true)} />
      <AuthModal isOpen={authModal} onClose={() => setAuthModal(false)} />
      
      {/* Add donation modals */}
      {currentModal === 'donationOptions' && <DonationOptionsModal />}
      {currentModal === 'paymentFees' && <PaymentFeesModal />}
      {currentModal === 'teamSupport' && <TeamSupportModal />}
      {currentModal === 'signIn' && <SignInModal />}
      {currentModal === 'guestContinue' && <GuestContinueModal />}
      {currentModal === 'paymentMethod' && <PaymentMethodModal />}
      {currentModal === 'confirmation' && <ConfirmationModal />}
      
      {/* Hero Section with Added Statistics Banner */}
      <section className="relative bg-gray-50 pt-16 pb-12 overflow-hidden">
        {/* Decorative SVG background */}
        <div className="absolute inset-0 opacity-[0.1] z-0">
          {/* Your existing SVG code */}
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-[#09869a] flex items-center">
              <Home className="w-3 h-3 mr-1" />
              Home
            </Link>
            <ChevronRight className="w-3 h-3 mx-1" />
            <Link href="/programs" className="hover:text-[#09869a]">
              Programs
            </Link>
            <ChevronRight className="w-3 h-3 mx-1" />
            <span className="text-[#09869a] font-medium">Campaigns</span>
          </div>
          
          <h1 className="font-montserrat text-3xl lg:text-4xl font-bold text-[#09869a] mb-4">
            Humanitarian Campaigns
          </h1>
          <div className="w-24 h-1.5 bg-[#FA6418] rounded-full mb-6"></div>
          
          <div className="max-w-3xl">
            <p className="text-gray-700 text-lg mb-6">
              Our campaigns address urgent humanitarian needs through targeted initiatives. 
              From emergency relief in crisis areas to awareness campaigns that drive action, 
              we focus on making an immediate and lasting impact.
            </p>
            
            {/* New Stats Banner */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Campaign Impact at a Glance</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#FF6F61]">4,140+</div>
                  <div className="text-sm text-gray-500">People Helped</div>
                </div>
            
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#5D87FF]">11</div>
                  <div className="text-sm text-gray-500">Campaigns</div>
                </div>
            
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Link 
                href="#campaigns" 
                className="bg-[#09869a] text-white px-6 py-3 rounded-md font-medium hover:bg-[#09869a]/90 transition-colors flex items-center"
              >
                <Heart className="w-5 h-5 mr-2" />
                Browse Campaigns
              </Link>
              {/* Update Support button to use the handleGeneralDonate function */}
              <button 
                onClick={handleGeneralDonate} 
                className="bg-white border border-[#09869a] text-[#09869a] px-6 py-3 rounded-md font-medium hover:bg-gray-50 transition-colors"
              >
                Support Our Work
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Campaigns Section with Enhanced Cards */}
      <section id="campaigns" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-montserrat text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Current Campaigns
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Your support enables us to respond quickly to humanitarian emergencies 
              and implement sustainable solutions for vulnerable communities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {campaigns.map((campaign) => (
              <div 
                key={campaign.id}
                className="bg-white rounded-xl overflow-hidden shadow-lg transition-all hover:shadow-xl border border-gray-100"
              >
                {/* Make the image clickable to navigate to campaign page */}
                <Link href={campaign.link}>
                  <div className="relative h-64">
                    <Image
                      src={campaign.image}
                      alt={campaign.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-xl font-bold text-white mb-2">{campaign.title}</h3>
                    </div>
                  </div>
                </Link>
                
                {/* Campaign Content */}
                <div className="p-6">
                  <p className="text-gray-600 mb-6">{campaign.description}</p>
                  
                  {/* Campaign Statistics */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                   
                  
                    
                    <div className="grid grid-cols-3 mt-4 gap-2 text-center">
                      <div>
                        <div className="flex items-center justify-center mb-1">
                          <Users className="w-4 h-4 text-gray-500 mr-1" />
                        </div>
                        <div className="font-medium">{campaign.stats.peopleHelped}</div>
                        <div className="text-xs text-gray-500">People Helped</div>
                      </div>
                      
                    
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    {/* Add a "View Details" link to campaign page */}
                    <div className="flex gap-2">
                      <Link 
                        href={campaign.link}
                        className="text-[#09869a] hover:underline font-medium"
                      >
                        View Details
                      </Link>
                      <button 
                        onClick={() => handleDonate(campaign.title)}
                        className="bg-[#09869a] text-white px-5 py-2 rounded-md font-medium hover:bg-[#09869a]/90 transition-colors flex items-center"
                      >
                        Help Now
                      </button>
                    </div>
                    
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleShare(campaign.title, campaign.id)}
                        className="p-2 text-gray-500 hover:text-[#09869a] hover:bg-gray-100 rounded-full flex items-center"
                        aria-label="Share"
                      >
                        <Share2 className="w-5 h-5" />
                        <span className="sr-only">Share</span>
                      </button>
                      <button 
                        onClick={() => handleLike(campaign.id)}
                        className={`p-2 rounded-full flex items-center ${
                          userLikes[campaign.id] 
                            ? 'text-[#E32613] bg-[#E32613]/10' 
                            : 'text-gray-500 hover:text-[#E32613] hover:bg-gray-100'
                        }`}
                        aria-label="Like"
                      >
                        <ThumbsUp className="w-5 h-5" />
                        <span className="ml-1 text-xs font-medium">{campaignLikes[campaign.id]}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Keep the rest of your component the same */}
      {/* Impact Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="font-montserrat text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Our Impact
            </h2>
            <p className="text-gray-600">
              Through our humanitarian campaigns, we've been able to reach thousands of people in crisis, 
              providing immediate relief and long-term support.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#FF6F61]/10 text-[#FF6F61] rounded-full mb-4">
                <LifeBuoy className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Emergency Response</h3>
              <p className="text-gray-600">
                Provided immediate relief to over 5,000 people affected by natural disasters and conflicts.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#009688]/10 text-[#009688] rounded-full mb-4">
                <User className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Cash Aid</h3>
              <p className="text-gray-600">
                Supported 1,500 families with direct financial assistance to meet basic needs.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#5D87FF]/10 text-[#5D87FF] rounded-full mb-4">
                <AlertCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Awareness</h3>
              <p className="text-gray-600">
                Reached over 10,000 people through awareness campaigns and educational initiatives.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-[#09869a] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-montserrat text-2xl lg:text-3xl font-bold mb-4">
              Join Our Humanitarian Efforts
            </h2>
            <p className="text-white/80 mb-8">
              Whether through donations, volunteering, or spreading awareness, your support makes our work possible. 
              Together, we can make a difference in the lives of those facing humanitarian crises.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* Update the Donate Now button to use the donation handler */}
              <button 
                onClick={handleGeneralDonate}
                className="bg-white text-[#09869a] px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors"
              >
                Donate Now
              </button>
              <Link 
                href="/volunteer" 
                className="bg-transparent border border-white text-white px-8 py-3 rounded-md font-medium hover:bg-white/10 transition-colors"
              >
                Get Involved
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Toaster position="bottom-center" />
    </>
  );
}

// Wrap the component with the donation provider
export default function CampaignsPage() {
  return (
    <DonationProvider>
      <CampaignsPageContent />
    </DonationProvider>
  );
}