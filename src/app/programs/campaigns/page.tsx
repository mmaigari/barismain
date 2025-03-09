"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Home, Heart, User, LifeBuoy, AlertCircle, Share2, ThumbsUp } from 'lucide-react';
import Navbar from '@/components/navigation/Navbar';
import AuthModal from '@/components/auth/AuthModal';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
// Add these imports
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

  // Define the campaigns 
  const campaigns = [
    {
      id: "emergency",
      title: "Emergency Relief Response",
      description: "Rapid deployment of essential aid to communities affected by natural disasters, conflicts, and humanitarian crises.",
      image: "/campaigns/emergency.png",
      link: "/programs/campaigns/emergency",
      color: "#FF6F61"
    },
    {
      id: "cash-aid",
      title: "Cash Aid Distribution",
      description: "Direct financial assistance to vulnerable families, enabling them to meet their most pressing needs with dignity and choice.",
      image: "/campaigns/cash-aid.png",
      link: "/programs/campaigns/cash-aid",
      color: "#009688"
    },
    {
      id: "awareness",
      title: "Humanitarian Awareness Campaigns",
      description: "Education and advocacy initiatives to raise awareness about humanitarian issues and inspire community action.",
      image: "/campaigns/awareness.png",
      link: "/programs/campaigns/awareness",
      color: "#5D87FF"
    }
  ];

  // Handle share function
  const handleShare = async (campaignTitle: string) => {
    const shareData = {
      title: `${campaignTitle} - Baris Charity Foundation`,
      text: `Learn about ${campaignTitle} and how you can help those in need.`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
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
      
      {/* Hero Section */}
      <section className="relative bg-gray-50 pt-16 pb-12 overflow-hidden">
        {/* Decorative SVG background */}
        <div className="absolute inset-0 opacity-[0.1] z-0">
          <svg xmlns="http://www.w3.org/2000/svg" id="Layer_2" data-name="Layer 2" viewBox="0 0 448.52 179.48" className="h-full w-full">
            <defs>
              <style>
                {`.cls-1 {
                  fill: #fa6418;
                }
                .cls-2 {
                  fill: #e32613;
                }
                .cls-3, .cls-4 {
                  fill: #09869a;
                }
                .cls-5 {
                  fill: #17c5ce;
                }
                .cls-4 {
                  font-family: Exotic350BT-Bold, 'Exotc350 Bd BT';
                  font-size: 25.18px;
                  font-weight: 700;
                }`}
              </style>
            </defs>
            <g id="Layer_1-2" data-name="Layer 1">
              <g>
                <g>
                  <path className="cls-2" d="M126.36,90.63c14.19,14.01,28.87,28.5,43.66,43.09-4.19,3.99-8.26,7.86-12.11,11.53-14.35-14.16-29.03-28.64-43.88-43.29,4.26-3.91,8.38-7.7,12.34-11.33Z"/>
                  <path className="cls-5" d="M0,83.34c1.9-5.49,3.73-10.79,5.62-16.24,19.51,6.92,38.85,13.78,58.44,20.73-1.88,5.46-3.7,10.74-5.6,16.23-19.53-6.92-38.88-13.78-58.47-20.72Z"/>
                  <path className="cls-1" d="M95.34,115.56c5.64,.61,11.13,1.2,16.94,1.83-2.39,20.68-4.76,41.26-7.17,62.09-5.65-.62-11.19-1.22-16.93-1.84,2.39-20.73,4.76-41.26,7.16-62.07Z"/>
                  <path className="cls-3" d="M97.86,63.26c-4.92-3.07-9.62-6-14.49-9.04,10.98-17.59,21.89-35.07,32.96-52.8,4.85,3.02,9.58,5.97,14.49,9.03-11,17.62-21.9,35.1-32.96,52.81Z"/>
                  <path className="cls-2" d="M38.66,14.18c5.43-1.95,10.58-3.8,16.02-5.75,6.78,19.64,13.53,39.16,20.38,58.99-5.37,1.93-10.61,3.81-16.01,5.76-6.81-19.7-13.55-39.24-20.38-59Z"/>
                  <path className="cls-5" d="M174.74,54.69c.68,5.74,1.33,11.23,2.01,16.96-20.63,2.38-41.02,4.73-61.7,7.12-.66-5.72-1.29-11.26-1.96-17.05,20.58-2.34,40.98-4.67,61.65-7.02Z"/>
                  <path className="cls-3" d="M29.59,156.85c-3.06-4.89-5.97-9.54-9.08-14.49,17.51-11.02,34.95-21.99,52.61-33.11,3.03,4.82,6,9.56,9.09,14.48-17.52,11.03-34.97,22-52.63,33.11Z"/>
                  <path className="cls-3" d="M25.55,62.6c-7.31-.08-13.15-6.11-13.03-13.46,.12-7.34,6.22-13.32,13.41-13.15,7.27,.17,13.09,6.1,13.06,13.29-.04,7.47-6.01,13.4-13.43,13.32Z"/>
                  <path className="cls-5" d="M53.33,161.45c.13-7.38,6.15-13.29,13.37-13.12,7.37,.17,13.13,6.27,12.98,13.75-.15,7.29-6.17,12.98-13.61,12.85-7.13-.12-12.87-6.19-12.74-13.48Z"/>
                  <path className="cls-3" d="M118.93,153.28c-.01-7.4,5.86-13.36,13.16-13.35,7.2,.01,13.12,5.94,13.16,13.17,.05,7.37-5.86,13.44-13.09,13.46-7.33,.01-13.22-5.9-13.24-13.28Z"/>
                  <path className="cls-1" d="M153.11,96.41c.04-7.34,5.93-13.15,13.32-13.15,7.17,0,13.12,6.15,13.04,13.47-.08,7.42-5.92,13.15-13.32,13.09-7.3-.07-13.07-6-13.03-13.41Z"/>
                  <path className="cls-5" d="M94.29,13.18c.05,7.28-5.92,13.36-13.16,13.4-7.33,.04-13.11-5.81-13.14-13.31C67.95,5.95,73.74,.02,80.96,0c7.39-.03,13.28,5.8,13.33,13.18Z"/>
                  <path className="cls-2" d="M19.26,128.67c-7.46-.08-13.2-6.01-13.11-13.55,.08-7.32,6.1-13.13,13.45-12.99,7.26,.14,12.97,6.03,12.91,13.33-.06,7.4-5.97,13.29-13.25,13.21Z"/>
                  <path className="cls-2" d="M156.65,34.23c0,7.34-5.98,13.35-13.22,13.31-7.18-.04-13.18-6.2-13.13-13.46,.06-7.2,6.02-13.17,13.17-13.18,7.27-.02,13.18,5.97,13.18,13.34Z"/>
                </g>
                <g>
                  <g>
                    <path className="cls-3" d="M219.34,126.27c.53-.52,1.16-.93,1.88-1.21,.72-.29,1.52-.43,2.39-.43s1.68,.16,2.42,.49,1.42,.81,2.02,1.46l2-1.88c-.78-.92-1.73-1.61-2.85-2.08-1.13-.47-2.37-.7-3.73-.7-1.28,0-2.46,.21-3.54,.63-1.08,.42-2.02,1.01-2.83,1.78-.81,.77-1.43,1.68-1.88,2.72-.44,1.05-.67,2.19-.67,3.42s.22,2.38,.67,3.42c.44,1.05,1.07,1.95,1.87,2.72,.8,.77,1.74,1.36,2.83,1.78,1.09,.42,2.26,.63,3.53,.63,1.38,0,2.63-.24,3.76-.71,1.13-.47,2.08-1.16,2.85-2.07l-2-1.9c-.6,.67-1.28,1.16-2.02,1.49-.75,.33-1.55,.49-2.42,.49s-1.67-.14-2.39-.43c-.72-.29-1.35-.69-1.88-1.21-.53-.52-.94-1.14-1.24-1.85-.29-.71-.44-1.5-.44-2.35s.15-1.64,.44-2.35c.29-.71,.7-1.33,1.24-1.85Z"/>
                    <path className="cls-3" d="M242.67,126.56c-.8-.4-1.71-.59-2.72-.59-1.11,0-2.09,.22-2.94,.65-.51,.26-.93,.6-1.3,.99v-6.45h-2.97v17.64h2.97v-6.42c0-.86,.15-1.57,.44-2.13,.29-.56,.71-.99,1.25-1.27,.54-.29,1.16-.43,1.85-.43,.95,0,1.69,.28,2.22,.83,.53,.55,.8,1.39,.8,2.52v6.9h2.97v-7.27c0-1.28-.23-2.33-.69-3.15-.46-.82-1.09-1.42-1.89-1.82Z"/>
                    <path className="cls-3" d="M253.88,125.96c-1.01,0-1.99,.13-2.94,.39-.94,.26-1.76,.65-2.44,1.18l1.16,2.16c.48-.4,1.06-.7,1.75-.93,.69-.22,1.39-.33,2.1-.33,1.06,0,1.85,.24,2.38,.72,.52,.48,.78,1.16,.78,2.03v.19h-3.28c-1.28,0-2.31,.17-3.09,.5-.78,.33-1.34,.78-1.68,1.36-.34,.57-.51,1.21-.51,1.93s.19,1.38,.58,1.96c.39,.58,.94,1.03,1.65,1.36,.71,.33,1.55,.49,2.5,.49,1.13,0,2.06-.21,2.79-.62,.51-.29,.91-.66,1.2-1.1v1.56h2.81v-7.44c0-1.84-.5-3.2-1.51-4.08-1.01-.88-2.43-1.32-4.27-1.32Zm1.56,10.34c-.58,.33-1.23,.5-1.96,.5s-1.35-.16-1.78-.48-.64-.75-.64-1.28c0-.48,.17-.88,.52-1.2,.35-.33,1.03-.49,2.04-.49h3.07v1.47c-.25,.65-.67,1.14-1.25,1.47Z"/>
                    <path className="cls-3" d="M266.29,127.97v-1.86h-2.83v12.7h2.97v-6.16c0-1.3,.33-2.28,1-2.94,.67-.66,1.56-.99,2.69-.99,.11,0,.22,0,.33,.01,.11,0,.23,.03,.36,.06v-2.83c-1.22,0-2.24,.22-3.05,.67-.61,.33-1.1,.78-1.46,1.34Z"/>
                    <path className="cls-3" d="M274.82,120.45c-.56,0-1.01,.17-1.37,.51-.36,.34-.54,.77-.54,1.27s.18,.91,.54,1.26c.36,.35,.81,.52,1.37,.52s1.03-.18,1.38-.54c.35-.36,.52-.8,.52-1.32,0-.49-.18-.9-.53-1.22-.36-.33-.81-.49-1.37-.49Z"/>
                    <rect className="cls-3" x="273.33" y="126.11" width="2.97" height="12.7"/>
                    <path className="cls-3" d="M286.99,136c-.44,.35-1,.52-1.66,.52-.56,0-.99-.17-1.3-.5-.31-.33-.46-.8-.46-1.4v-6.04h3.4v-2.38h-3.4v-2.9h-2.97v2.9h-2.09v2.38h2.09v6.11c0,1.41,.38,2.48,1.14,3.2,.76,.72,1.84,1.08,3.23,1.08,.54,0,1.06-.07,1.57-.21,.51-.14,.93-.36,1.28-.64l-.83-2.12Z"/>
                    <path className="cls-3" d="M295.05,135.5l-3.99-9.39h-3.09l5.55,12.74-.22,.51c-.29,.63-.59,1.09-.93,1.36-.33,.27-.77,.4-1.31,.4-.4,0-.78-.08-1.16-.24-.38-.16-.72-.37-1.02-.64l-1.19,2.19c.41,.36,.93,.65,1.55,.86,.62,.21,1.24,.31,1.85,.31,.71,0,1.37-.11,1.96-.33,.59-.22,1.13-.61,1.62-1.16,.48-.56,.92-1.31,1.32-2.26l5.94-13.72h-2.85l-4.02,9.39Z"/>
                    <polygon className="cls-3" points="310.63 138.8 313.72 138.8 313.72 132.43 321.75 132.43 321.75 129.81 313.72 129.81 313.72 124.75 322.78 124.75 322.78 122.16 310.63 122.16 310.63 138.8"/>
                    <path className="cls-3" d="M334.34,126.79c-1.02-.55-2.19-.83-3.51-.83s-2.46,.28-3.47,.83c-1.01,.56-1.81,1.32-2.4,2.29-.59,.98-.88,2.1-.88,3.36s.29,2.37,.88,3.35c.59,.98,1.39,1.76,2.4,2.32s2.17,.84,3.47,.84,2.49-.28,3.51-.84c1.02-.56,1.82-1.34,2.4-2.32,.58-.98,.87-2.1,.87-3.35s-.29-2.41-.87-3.38-1.38-1.73-2.4-2.28Zm-.21,7.77c-.32,.6-.77,1.06-1.34,1.38s-1.22,.48-1.95,.48-1.35-.16-1.91-.48c-.56-.32-1.01-.78-1.34-1.38s-.5-1.31-.5-2.12,.17-1.53,.5-2.13c.33-.59,.78-1.05,1.34-1.37,.56-.32,1.21-.48,1.94-.48s1.36,.16,1.93,.48,1.02,.77,1.34,1.37c.33,.59,.49,1.3,.49,2.13s-.16,1.51-.49,2.12Z"/>
                    <path className="cls-3" d="M349.78,132.53c0,.84-.15,1.55-.44,2.12-.29,.57-.7,1-1.21,1.28-.52,.29-1.12,.43-1.82,.43-.95,0-1.68-.28-2.2-.84-.52-.56-.77-1.41-.77-2.56v-6.85h-2.97v7.25c0,1.27,.23,2.32,.69,3.15s1.1,1.45,1.93,1.85c.82,.4,1.78,.61,2.85,.61,.98,0,1.89-.22,2.71-.65,.55-.29,1-.68,1.38-1.14v1.63h2.83v-12.7h-2.97v6.42Z"/>
                    <path className="cls-3" d="M366.58,126.56c-.8-.4-1.71-.59-2.72-.59-1.11,0-2.09,.22-2.94,.65-.57,.3-1.05,.68-1.44,1.15v-1.66h-2.83v12.7h2.97v-6.42c0-.86,.15-1.57,.44-2.13,.29-.56,.71-.99,1.25-1.27,.54-.29,1.16-.43,1.85-.43,.95,0,1.69,.28,2.22,.83,.53,.55,.8,1.39,.8,2.52v6.9h2.97v-7.27c0-1.28-.23-2.33-.69-3.15-.46-.82-1.09-1.42-1.89-1.82Z"/>
                    <path className="cls-3" d="M382.43,127.68c-.36-.41-.77-.75-1.24-1.02-.84-.47-1.79-.7-2.85-.7-1.22,0-2.32,.27-3.29,.81-.97,.54-1.74,1.29-2.29,2.26-.56,.97-.83,2.11-.83,3.42s.28,2.46,.83,3.42c.55,.97,1.32,1.72,2.29,2.27,.98,.55,2.07,.82,3.29,.82,1.09,0,2.06-.24,2.9-.71,.5-.29,.93-.67,1.31-1.13v1.68h2.83v-17.64h-2.95v6.52Zm-.46,6.89c-.34,.6-.79,1.06-1.35,1.38-.56,.32-1.2,.48-1.91,.48s-1.35-.16-1.91-.48-1.01-.78-1.35-1.38c-.34-.6-.51-1.31-.51-2.12s.17-1.53,.51-2.13c.34-.59,.79-1.05,1.35-1.37s1.2-.48,1.91-.48,1.35,.16,1.91,.48c.56,.32,1.01,.77,1.35,1.37,.34,.59,.51,1.3,.51,2.13s-.17,1.51-.51,2.12Z"/>
                    <path className="cls-3" d="M394.15,125.96c-1.01,0-1.99,.13-2.94,.39-.94,.26-1.76,.65-2.44,1.18l1.16,2.16c.48-.4,1.06-.7,1.75-.93,.69-.22,1.39-.33,2.1-.33,1.06,0,1.85,.24,2.38,.72,.52,.48,.78,1.16,.78,2.03v.19h-3.28c-1.28,0-2.31,.17-3.09,.5-.78,.33-1.34,.78-1.68,1.36-.34,.57-.51,1.21-.51,1.93s.19,1.38,.58,1.96c.39,.58,.94,1.03,1.65,1.36,.71,.33,1.55,.49,2.5,.49,1.13,0,2.06-.21,2.79-.62,.51-.29,.91-.66,1.2-1.1v1.56h2.81v-7.44c0-1.84-.5-3.2-1.51-4.08-1.01-.88-2.43-1.32-4.27-1.32Zm1.56,10.34c-.58,.33-1.23,.5-1.96,.5s-1.35-.16-1.78-.48-.64-.75-.64-1.28c0-.48,.17-.88,.52-1.2,.35-.33,1.03-.49,2.04-.49h3.07v1.47c-.25,.65-.67,1.14-1.25,1.47Z"/>
                    <path className="cls-3" d="M408.86,136.52c-.56,0-.99-.17-1.3-.5-.31-.33-.46-.8-.46-1.4v-6.04h3.4v-2.38h-3.4v-2.9h-2.97v2.9h-2.09v2.38h2.09v6.11c0,1.41,.38,2.48,1.14,3.2,.76,.72,1.84,1.08,3.23,1.08,.54,0,1.06-.07,1.57-.21,.51-.14,.93-.36,1.28-.64l-.83-2.12c-.44,.35-1,.52-1.66,.52Z"/>
                    <path className="cls-3" d="M415.31,120.45c-.56,0-1.01,.17-1.37,.51-.36,.34-.54,.77-.54,1.27s.18,.91,.54,1.26c.36,.35,.81,.52,1.37,.52s1.03-.18,1.38-.54c.35-.36,.52-.8,.52-1.32,0-.49-.18-.9-.53-1.22-.36-.33-.81-.49-1.37-.49Z"/>
                    <rect className="cls-3" x="413.81" y="126.11" width="2.97" height="12.7"/>
                    <path className="cls-3" d="M429.89,126.79c-1.02-.55-2.19-.83-3.51-.83s-2.46,.28-3.47,.83c-1.01,.56-1.81,1.32-2.4,2.29-.59,.98-.88,2.1-.88,3.36s.29,2.37,.88,3.35c.59,.98,1.39,1.76,2.4,2.32s2.17,.84,3.47,.84,2.49-.28,3.51-.84c1.02-.56,1.82-1.34,2.4-2.32,.58-.98,.87-2.1,.87-3.35s-.29-2.41-.87-3.38-1.38-1.73-2.4-2.28Zm-.21,7.77c-.32,.6-.77,1.06-1.34,1.38s-1.22,.48-1.95,.48-1.35-.16-1.91-.48c-.56-.32-1.01-.78-1.34-1.38s-.5-1.31-.5-2.12,.17-1.53,.5-2.13c.33-.59,.78-1.05,1.34-1.37,.56-.32,1.21-.48,1.94-.48s1.36,.16,1.93,.48,1.02,.77,1.34,1.37c.33,.59,.49,1.3,.49,2.13s-.16,1.51-.49,2.12Z"/>
                    <path className="cls-3" d="M447.83,128.38c-.46-.82-1.09-1.42-1.89-1.82s-1.71-.59-2.72-.59c-1.11,0-2.09,.22-2.94,.65-.57,.3-1.05,.68-1.44,1.15v-1.66h-2.83v12.7h2.97v-6.42c0-.86,.15-1.57,.44-2.13,.29-.56,.71-.99,1.25-1.27,.54-.29,1.16-.43,1.85-.43,.95,0,1.69,.28,2.22,.83,.53,.55,.8,1.39,.8,2.52v6.9h2.97v-7.27c0-1.28-.23-2.33-.69-3.15Z"/>
                  </g>
                  <g>
                    <path className="cls-3" d="M214.55,107.24V36.4h13.87v31.58h.37c3.19-8.81,10.03-11.71,16.49-11.71,13.96,0,22.3,12.65,22.3,26.7s-8.34,25.3-22.02,25.3c-6.18,0-14.15-3.37-16.87-11.71h-.37v10.68h-13.77Zm26.14-40.57c-5.72,0-11.24,3.94-12.09,8.53v14.9c1.03,4.59,6.75,7.87,12.18,7.87,7.96,0,12.74-7.21,12.74-15.55s-4.69-15.74-12.84-15.74Z"/>
                    <path className="cls-3" d="M309.66,107.42l-.37-11.62h-.28c-3.18,8.62-10.87,12.65-18.46,12.56-8.9-.09-17.33-5.25-17.33-14.24,0-11.62,8.25-15.93,21.46-15.93h14.9l-.09-3.84c-.09-6.37-4.97-8.25-8.81-8.25-4.78,0-9.84,1.78-9.84,8.62h-13.4c0-13.59,11.15-18.46,22.86-18.46s22.11,4.78,22.11,17.15v34.01h-12.74Zm-.19-22.21h-14.06c-4.69,0-8.53,1.97-8.53,6.84s4.5,6.28,9,6.28c6.37-.09,13.59-3.75,13.59-8.34v-4.78Z"/>
                    <path className="cls-3" d="M332.61,107.24V57.2h14.06v11.62h.28c2.16-6.28,5.34-12.65,11.81-12.65,13.87,0,15.46,11.53,14.8,20.24h-12.74c0-7.03-1.41-9.28-6.28-9.28-5.72,0-7.96,6-7.96,12.27v27.83h-13.96Z"/>
                    <path className="cls-3" d="M379.84,49.61v-13.4h14.24v13.4h-14.24Zm.09,57.63V57.2h13.96v50.04h-13.96Z"/>
                    <path className="cls-3" d="M416,92.06c.94,5.43,4.97,7.12,9.93,7.12,3.56,0,8.43-1.03,8.43-5.53,0-10.31-31.02-4.22-31.02-22.21,0-11.81,12.56-15.18,22.21-15.18,10.78,0,22.3,3.94,22.58,16.59h-13.21c-.47-5.34-4.12-7.5-9.09-7.5-3.66,0-8.34,1.31-8.34,5.81,0,9.18,31.01,4.59,31.01,21.93,0,11.62-13.4,15.18-22.96,15.18s-22.49-4.03-22.58-16.21h13.02Z"/>
                  </g>
                </g>
                <text className="cls-4" transform="translate(419.45 121.29) rotate(3.34)">5</text>
              </g>
            </g>
          </svg>
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
      
      {/* Campaigns Section */}
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
                className="bg-white rounded-xl overflow-hidden shadow-lg transition-all hover:shadow-xl"
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
                        onClick={() => handleShare(campaign.title)}
                        className="p-2 text-gray-500 hover:text-[#09869a] hover:bg-gray-100 rounded-full"
                        aria-label="Share"
                      >
                        <Share2 className="w-5 h-5" />
                      </button>
                      <button 
                        className="p-2 text-gray-500 hover:text-[#09869a] hover:bg-gray-100 rounded-full"
                        aria-label="Like"
                      >
                        <ThumbsUp className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
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
                Provided immediate relief to over 50,000 people affected by natural disasters and conflicts.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#009688]/10 text-[#009688] rounded-full mb-4">
                <User className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Cash Aid</h3>
              <p className="text-gray-600">
                Supported 15,000 families with direct financial assistance to meet basic needs.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#5D87FF]/10 text-[#5D87FF] rounded-full mb-4">
                <AlertCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Awareness</h3>
              <p className="text-gray-600">
                Reached over 1 million people through awareness campaigns and educational initiatives.
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